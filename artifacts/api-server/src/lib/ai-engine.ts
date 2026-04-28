import { openai } from "@workspace/integrations-openai-ai-server";
import { logger } from "./logger";

export type Severity =
  | "syntax_error"
  | "runtime_error"
  | "logic_error"
  | "warning";

export interface DebugReport {
  root_cause: string;
  severity: Severity;
  fix: string;
  explanation: string;
  corrected_code: string;
  pro_tip: string;
}

const SYSTEM_PROMPT_STANDARD = `You are a world-class programming mentor embedded in a debugging tool.
You combine the precision of a compiler with the clarity of a great teacher.

Your only job is to analyze broken code and return a structured debug report.

STRICT RULES:
- Never be vague. Every statement must be specific and actionable.
- Never say "it depends" without immediately explaining what it depends on.
- Never skip the corrected_code — always provide working, complete code.
- Never add pleasantries ("Great question!", "Sure!", "Of course!").
- If the error is genuinely ambiguous, state exactly WHY and list possibilities.
- Always detect the severity: syntax_error | runtime_error | logic_error | warning

RESPONSE FORMAT — return ONLY valid JSON, no markdown, no extra text:
{
  "root_cause": "One precise sentence naming the exact error and why it occurs",
  "severity": "syntax_error | runtime_error | logic_error | warning",
  "fix": "Step-by-step fix instructions. Number each step. Be specific.",
  "explanation": "Plain English explanation. No jargon. Imagine the reader is smart but new to programming.",
  "corrected_code": "Full corrected code. No truncation. No '...' placeholders. Complete and runnable.",
  "pro_tip": "One advanced insight a senior dev would add — a pattern, a best practice, or a warning about similar future errors"
}`;

const ELI5_ADDENDUM = `

IMPORTANT: For the 'explanation' field only — explain as if talking to a 10-year-old who has never seen code. Use a real-world analogy. Example: "Think of a variable like a labeled box — your code tried to open a box that doesn't exist yet." Keep it fun, warm, and confidence-building. Make them feel smart, not dumb.`;

function buildSystemPrompt(mode: "standard" | "eli5"): string {
  if (mode === "eli5") {
    return SYSTEM_PROMPT_STANDARD + ELI5_ADDENDUM;
  }
  return SYSTEM_PROMPT_STANDARD;
}

function buildUserPrompt(
  language: string,
  error: string,
  code: string,
): string {
  return `Language: ${language}
Error/Stack Trace:
${error}

Code:
${code}

Analyze this and return the JSON debug report.`;
}

const SEVERITY_VALUES: Severity[] = [
  "syntax_error",
  "runtime_error",
  "logic_error",
  "warning",
];

function isValidSeverity(s: unknown): s is Severity {
  return typeof s === "string" && SEVERITY_VALUES.includes(s as Severity);
}

function extractJsonObject(text: string): string {
  const fenced = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  if (fenced.startsWith("{") && fenced.endsWith("}")) {
    return fenced;
  }

  const start = fenced.indexOf("{");
  const end = fenced.lastIndexOf("}");

  if (start !== -1 && end !== -1 && end > start) {
    return fenced.slice(start, end + 1).trim();
  }

  return fenced;
}

function parseDebugReport(text: string): DebugReport {
  const candidate = extractJsonObject(text);

  let parsed: unknown;
  try {
    parsed = JSON.parse(candidate);
  } catch {
    throw new Error(`AI returned invalid JSON: ${candidate.slice(0, 200)}`);
  }

  return validateDebugReport(parsed);
}

function validateDebugReport(parsed: unknown): DebugReport {
  if (!parsed || typeof parsed !== "object") {
    throw new Error("AI response is not an object");
  }
  const obj = parsed as Record<string, unknown>;
  const required = [
    "root_cause",
    "severity",
    "fix",
    "explanation",
    "corrected_code",
    "pro_tip",
  ];
  for (const field of required) {
    if (typeof obj[field] !== "string" || !obj[field]) {
      throw new Error(`AI response missing or invalid field: ${field}`);
    }
  }
  if (!isValidSeverity(obj.severity)) {
    obj.severity = "runtime_error";
  }
  return {
    root_cause: obj.root_cause as string,
    severity: obj.severity as Severity,
    fix: obj.fix as string,
    explanation: obj.explanation as string,
    corrected_code: obj.corrected_code as string,
    pro_tip: obj.pro_tip as string,
  };
}

function getCandidateModels(): string[] {
  return ["qwen/qwen3-32b"];
}

function isModelAvailabilityError(err: unknown): boolean {
  if (!err || typeof err !== "object") {
    return false;
  }

  const maybeErr = err as {
    status?: number;
    message?: string;
    error?: { message?: string; code?: string };
    code?: string;
  };

  const message = [
    maybeErr.message,
    maybeErr.error?.message,
    maybeErr.error?.code,
    maybeErr.code,
  ]
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLowerCase();

  return maybeErr.status === 404 || message.includes("does not exist");
}

function clampSection(
  label: string,
  value: string,
  maxChars: number,
): string {
  if (value.length <= maxChars) {
    return value;
  }

  const headChars = Math.floor(maxChars * 0.65);
  const tailChars = Math.floor(maxChars * 0.25);
  const omittedChars = value.length - headChars - tailChars;

  return [
    value.slice(0, headChars),
    `\n\n[${label.toUpperCase()} TRUNCATED: omitted ${omittedChars} characters to fit model limits]\n\n`,
    value.slice(-tailChars),
  ].join("");
}

function buildBoundedUserPrompt(
  language: string,
  error: string,
  code: string,
): string {
  const boundedError = clampSection("error", error, 1_500);
  const boundedCode = clampSection("code", code, 8_000);

  return buildUserPrompt(language, boundedError, boundedCode);
}

export async function analyzeCode(
  code: string,
  error: string,
  language: string,
  mode: "standard" | "eli5",
): Promise<{ report: DebugReport; tokensUsed: number }> {
  const systemPrompt = buildSystemPrompt(mode);
  const userPrompt = buildBoundedUserPrompt(language, error, code);
  const candidateModels = getCandidateModels();
  const maxCompletionTokens = 1200;

  let lastError: Error | null = null;
  const maxRetries = 3;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    for (const model of candidateModels) {
      try {
        const response = await openai.chat.completions.create({
          model,
          max_tokens: maxCompletionTokens,
          temperature: 0.2,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        });

        const content = response.choices[0]?.message?.content;
        if (!content) {
          throw new Error("Empty response from AI");
        }

        const report = parseDebugReport(content);
        const tokensUsed = response.usage?.total_tokens ?? 0;

        return { report, tokensUsed };
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        const unavailable = isModelAvailabilityError(err);

        logger.warn(
          { attempt, model, err: lastError.message, unavailable },
          "AI analysis attempt failed",
        );

        if (unavailable) {
          continue;
        }

        if (attempt < maxRetries - 1) {
          const backoffMs = Math.pow(2, attempt) * 500;
          await new Promise((resolve) => setTimeout(resolve, backoffMs));
        }

        break;
      }
    }
  }

  throw lastError ?? new Error("AI analysis failed after all retries");
}
