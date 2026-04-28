import React, { useState, useEffect } from "react";
import { useAnalyzeCode, useListHistory, useGetSession, ApiError, getListHistoryQueryKey, getGetStatsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Play, Copy, CheckCircle2, History, AlertCircle, Download, Wand2, Lightbulb, ChevronRight, ChevronDown, Terminal, SquarePen } from "lucide-react";
import { AnalyzeRequestLanguage, AnalyzeRequestMode, DebugSessionSeverity } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";
import { OutOfCreditsModal } from "@/components/credits-modal";
import { getRandomSampleError } from "@/lib/sample-errors";

const SELECTED_SESSION_STORAGE_KEY = "selectedDebugSessionId";
const OPTIMISTIC_SESSION_ID_PREFIX = "optimistic-debug-session-";

function getSeverityColor(severity: string) {
  switch (severity) {
    case "syntax_error": return "bg-red-500/10 text-red-500 border-red-500/20";
    case "runtime_error": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "logic_error": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "warning": return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
}

function getSeverityLabel(severity: string) {
  return severity.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getLanguageLabel(language: string) {
  switch (language) {
    case "cpp":
      return "C++";
    case "php":
      return "PHP";
    case "csharp":
      return "C#";
    default:
      return language.charAt(0).toUpperCase() + language.slice(1);
  }
}

function getAnalysisErrorMessage(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "error" in error.data &&
    error.data.error &&
    typeof error.data.error === "object" &&
    "message" in error.data.error &&
    typeof error.data.error.message === "string"
  ) {
    return error.data.error.message;
  }

  if (
    error &&
    typeof error === "object" &&
    "error" in error &&
    error.error &&
    typeof error.error === "object" &&
    "message" in error.error &&
    typeof error.error.message === "string"
  ) {
    return error.error.message;
  }

  if (error instanceof ApiError) {
    const apiMessage = (error.data as { error?: { message?: string } } | null)?.error?.message;
    return apiMessage || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "There was an error communicating with the AI. Please try again.";
}

export default function Home() {
  const [location, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { user, setUser } = useAuth();
  const [code, setCode] = useState("");
  const [errorText, setErrorText] = useState("");
  const [language, setLanguage] = useState<AnalyzeRequestLanguage>(AnalyzeRequestLanguage.python);
  const [mode, setMode] = useState<AnalyzeRequestMode>(AnalyzeRequestMode.standard);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [proTipOpen, setProTipOpen] = useState(false);
  const [showOutOfCredits, setShowOutOfCredits] = useState(false);
  const [sampleLoadMessage, setSampleLoadMessage] = useState<string | null>(null);
  const [lastSampleKey, setLastSampleKey] = useState<string | null>(null);
  const [pendingHistorySessionId, setPendingHistorySessionId] = useState<string | null>(null);

  const removeOptimisticSessionFromCache = (sessionId: string) => {
    queryClient.setQueriesData({ queryKey: getListHistoryQueryKey() }, (current) => {
      if (!current || typeof current !== "object" || !("sessions" in current) || !Array.isArray(current.sessions)) {
        return current;
      }

      const nextSessions = current.sessions.filter((session: { id: string }) => session.id !== sessionId);
      const nextTotal = typeof current.total === "number"
        ? Math.max(0, current.total - (nextSessions.length === current.sessions.length ? 0 : 1))
        : current.total;

      return {
        ...current,
        sessions: nextSessions,
        total: nextTotal,
      };
    });
  };

  const addOptimisticSessionToCache = (sessionId: string) => {
    const optimisticSession = {
      id: sessionId,
      language,
      severity: DebugSessionSeverity.runtime_error,
      rootCause: errorText.split("\n")[0] || "Debugging in progress...",
      createdAt: new Date().toISOString(),
      rawCode: code,
      rawError: errorText,
      mode,
    };

    queryClient.setQueriesData({ queryKey: getListHistoryQueryKey() }, (current) => {
      if (!current || typeof current !== "object" || !("sessions" in current) || !Array.isArray(current.sessions)) {
        return current;
      }

      const filteredSessions = current.sessions.filter((session: { id: string }) => session.id !== sessionId);
      const nextLimit = typeof current.limit === "number" ? current.limit : filteredSessions.length + 1;

      return {
        ...current,
        sessions: [optimisticSession, ...filteredSessions].slice(0, nextLimit),
        total: typeof current.total === "number" ? current.total + 1 : current.total,
      };
    });
  };

  const analyzeMutation = useAnalyzeCode({
    mutation: {
      onSuccess: (result) => {
        const remaining = (result as { creditsRemaining?: number | null }).creditsRemaining;
        if (typeof remaining === "number" && user) {
          setUser({ ...user, credits: remaining });
        }

        if (pendingHistorySessionId) {
          removeOptimisticSessionFromCache(pendingHistorySessionId);
          setPendingHistorySessionId(null);
        }

        queryClient.invalidateQueries({ queryKey: getListHistoryQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
      },
      onError: (err) => {
        if (pendingHistorySessionId) {
          removeOptimisticSessionFromCache(pendingHistorySessionId);
          setPendingHistorySessionId(null);
        }

        if (err instanceof ApiError && err.status === 402) {
          setShowOutOfCredits(true);
          if (user && user.credits > 0) setUser({ ...user, credits: 0 });
        }
      },
    },
  });
  const { data: historyData } = useListHistory({ limit: 10 });
  const { data: sessionData, isFetching: isSessionFetching } = useGetSession(activeSessionId || "", { query: { enabled: !!activeSessionId } });

  const activeResult = analyzeMutation.data ?? sessionData;
  const isAnalyzing = analyzeMutation.isPending || isSessionFetching;
  const outOfCredits = (user?.credits ?? 0) <= 0;

  useEffect(() => {
    const sessionIdFromQuery = new URLSearchParams(window.location.search).get("session");
    const sessionIdFromStorage = window.sessionStorage.getItem(SELECTED_SESSION_STORAGE_KEY);
    const sessionId = sessionIdFromQuery || sessionIdFromStorage;

    if (sessionId && sessionId !== activeSessionId) {
      setActiveSessionId(sessionId);
      setSampleLoadMessage(null);
      analyzeMutation.reset();
      setProTipOpen(false);
      if (sessionIdFromStorage) {
        window.sessionStorage.removeItem(SELECTED_SESSION_STORAGE_KEY);
      }
    }
  }, [location]);

  const handleOpenSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
    setLastSampleKey(null);
    setSampleLoadMessage(null);
    setProTipOpen(false);
    analyzeMutation.reset();
  };

  // Sync state when session data loads
  useEffect(() => {
    if (sessionData) {
      if (sessionData.rawCode) setCode(sessionData.rawCode);
      if (sessionData.rawError) setErrorText(sessionData.rawError);
      if (sessionData.language) setLanguage(sessionData.language as AnalyzeRequestLanguage);
      if (sessionData.mode) setMode(sessionData.mode as AnalyzeRequestMode);
    }
  }, [sessionData]);

  const handleNewChat = () => {
    window.sessionStorage.removeItem(SELECTED_SESSION_STORAGE_KEY);
    setLocation("/");
    setCode("");
    setErrorText("");
    setActiveSessionId(null);
    setLastSampleKey(null);
    setSampleLoadMessage(null);
    setProTipOpen(false);
    analyzeMutation.reset();
  };

  const handleAnalyze = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!code || !errorText) return;
    if (outOfCredits) {
      setShowOutOfCredits(true);
      return;
    }
    console.log("Debug triggered");
    console.log("Session ID:", activeSessionId);
    setLastSampleKey(null);
    setSampleLoadMessage(null);
    const optimisticSessionId = `${OPTIMISTIC_SESSION_ID_PREFIX}${Date.now()}`;
    setPendingHistorySessionId(optimisticSessionId);
    addOptimisticSessionToCache(optimisticSessionId);
    analyzeMutation.mutate({ data: { code, error: errorText, language, mode } });
  };

  const handleLoadSample = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.sessionStorage.removeItem(SELECTED_SESSION_STORAGE_KEY);
    setActiveSessionId(null);
    setSampleLoadMessage(null);
    setProTipOpen(false);
    analyzeMutation.reset();

    console.log("Clicked Load Sample");
    console.log("Selected Language:", language);

    const sample = getRandomSampleError(language, lastSampleKey ?? undefined);
    if (!sample) {
      setSampleLoadMessage(`No sample errors available for ${getLanguageLabel(language)}.`);
      console.warn("No sample errors available for language:", language);
      return;
    }

    const nextSampleKey = `${sample.code}:::${sample.error}`;
    console.log("Pool Type:", sample.poolType === "complex" ? "Complex" : "Simple");
    console.log("Selected Index:", sample.index);

    setCode(() => `${sample.code}`);
    setErrorText(() => `${sample.error}`);
    setLastSampleKey(nextSampleKey);
  };

  const handleCopyCode = () => {
    if (activeResult?.correctedCode) {
      navigator.clipboard.writeText(activeResult.correctedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (activeResult?.correctedCode) {
      const blob = new Blob([activeResult.correctedCode], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `fixed_${language}_code.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <OutOfCreditsModal open={showOutOfCredits} onOpenChange={setShowOutOfCredits} />
      {/* Sidebar History */}
      <div className="w-64 hidden lg:flex flex-col border-r bg-muted/30">
        <div className="p-4 border-b space-y-3">
          <Button variant="outline" className="w-full justify-start" onClick={handleNewChat}>
            <SquarePen className="w-4 h-4" />
            New Chat
          </Button>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm flex items-center gap-2">
              <History className="w-4 h-4" /> Recent
            </h2>
            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setLocation("/history")}>
              View all
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {historyData?.sessions?.map((session) => (
            <button
              key={session.id}
              onClick={() => handleOpenSession(session.id)}
              className={`w-full text-left p-3 rounded-md text-sm transition-colors border ${activeSessionId === session.id ? 'bg-primary/10 border-primary/20' : 'bg-card hover:bg-muted border-border/50'}`}
            >
              <div className="flex justify-between items-center mb-1">
                <Badge variant="outline" className="text-[10px] h-4 px-1">{getLanguageLabel(session.language)}</Badge>
                <span className="text-[10px] text-muted-foreground">{new Date(session.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="line-clamp-2 text-xs text-foreground/80 leading-tight">
                {session.rootCause}
              </p>
            </button>
          ))}
          {historyData?.sessions?.length === 0 && (
            <p className="text-xs text-muted-foreground text-center p-4">No recent sessions.</p>
          )}
        </div>
      </div>

      {/* Input Panel */}
      <div className="flex-1 flex flex-col border-r w-full max-w-[50%] bg-background">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight">
              {activeSessionId ? "Resume Debug Session" : "New Debug Session"}
            </h1>
            <Button type="button" variant="outline" size="sm" onClick={handleLoadSample}>
              Load Sample Error
            </Button>
          </div>

          {sampleLoadMessage && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{sampleLoadMessage}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={(v) => setLanguage(v as AnalyzeRequestLanguage)}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(AnalyzeRequestLanguage).map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {getLanguageLabel(lang)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center justify-between">
                  <span>Explanation Mode</span>
                </Label>
                <div className="flex items-center space-x-2 border rounded-md p-1 h-9 bg-muted/50">
                  <Button
                    variant={mode === AnalyzeRequestMode.standard ? "secondary" : "ghost"}
                    size="sm"
                    className="w-1/2 h-7 text-xs"
                    onClick={() => setMode(AnalyzeRequestMode.standard)}
                  >
                    Standard
                  </Button>
                  <Button
                    variant={mode === AnalyzeRequestMode.eli5 ? "secondary" : "ghost"}
                    size="sm"
                    className="w-1/2 h-7 text-xs"
                    onClick={() => setMode(AnalyzeRequestMode.eli5)}
                  >
                    ELI5
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="code">Code</Label>
                <span className="text-xs text-muted-foreground">{code.length}/10000</span>
              </div>
              <Textarea
                id="code"
                placeholder="Paste your broken code here..."
                className="font-mono text-sm h-[300px] resize-none bg-muted/20"
                value={code}
                onChange={(e) => setCode(e.target.value.slice(0, 10000))}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="error">Error Message / Stack Trace</Label>
                <span className="text-xs text-muted-foreground">{errorText.length}/5000</span>
              </div>
              <Textarea
                id="error"
                placeholder="Paste the error message or describe the unexpected behavior..."
                className="font-mono text-sm h-[150px] resize-none border-red-500/20 focus-visible:ring-red-500/30 bg-red-500/5"
                value={errorText}
                onChange={(e) => setErrorText(e.target.value.slice(0, 5000))}
              />
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-background/95 backdrop-blur">
          <Button
            type="button"
            className="w-full font-semibold"
            size="lg"
            onClick={handleAnalyze}
            disabled={!code || !errorText || isAnalyzing}
            data-testid="button-analyze"
          >
            {isAnalyzing ? (
              <>
                <Wand2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Code...
              </>
            ) : outOfCredits ? (
              <>
                <AlertCircle className="mr-2 h-4 w-4" />
                Out of Credits
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Debug Now
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Output Panel */}
      <div className="flex-1 bg-muted/10 overflow-y-auto">
        {isAnalyzing ? (
          <div className="p-6 max-w-3xl mx-auto space-y-6">
            <Skeleton className="h-8 w-1/3 mb-8" />
            <Card>
              <CardHeader><Skeleton className="h-6 w-1/4" /></CardHeader>
              <CardContent><Skeleton className="h-20 w-full" /></CardContent>
            </Card>
            <Card>
              <CardHeader><Skeleton className="h-6 w-1/4" /></CardHeader>
              <CardContent><Skeleton className="h-32 w-full" /></CardContent>
            </Card>
            <Card>
              <CardHeader><Skeleton className="h-6 w-1/4" /></CardHeader>
              <CardContent><Skeleton className="h-40 w-full" /></CardContent>
            </Card>
          </div>
        ) : analyzeMutation.error ? (
          <div className="p-6 max-w-3xl mx-auto flex items-center justify-center h-full">
            <Alert variant="destructive" className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Analysis Failed</AlertTitle>
              <AlertDescription>
                {getAnalysisErrorMessage(analyzeMutation.error)}
              </AlertDescription>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => analyzeMutation.reset()}>
                Try Again
              </Button>
            </Alert>
          </div>
        ) : activeResult ? (
          <div className="p-6 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                Debug Report
              </h2>
              <div className="flex gap-2 text-xs text-muted-foreground items-center bg-card px-3 py-1.5 rounded-full border shadow-sm">
                {activeResult.cached && <Badge variant="secondary" className="h-5 text-[10px]">Cached</Badge>}
                {activeResult.tokensUsed && <span>Tokens: {activeResult.tokensUsed}</span>}
                {activeResult.durationMs && <span>{activeResult.durationMs}ms</span>}
              </div>
            </div>

            <Card className="border-l-4" style={{ borderLeftColor: `var(--${getSeverityColor(activeResult.severity).split(' ')[1].split('-')[1]}-500)` }}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Root Cause</CardTitle>
                  <Badge variant="outline" className={`${getSeverityColor(activeResult.severity)} font-medium`}>
                    {getSeverityLabel(activeResult.severity)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{activeResult.rootCause}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">How to Fix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {activeResult.fix.split('\n').map((line, i) => (
                    <p key={i} className="mb-2 last:mb-0">{line}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Explanation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                  <p>{activeResult.explanation}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-primary/20">
              <CardHeader className="pb-0 pt-4 px-4 flex flex-row items-center justify-between border-b bg-muted/30">
                <CardTitle className="text-sm font-mono text-primary flex items-center gap-2 mb-4">
                  <Terminal className="w-4 h-4" /> Corrected Code
                </CardTitle>
                <div className="flex gap-2 mb-4">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopyCode} title="Copy code">
                    {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleDownload} title="Download file">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <div className="bg-zinc-950 p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-zinc-50 leading-relaxed">
                  <code>{activeResult.correctedCode}</code>
                </pre>
              </div>
            </Card>

            <div className="border rounded-lg overflow-hidden bg-card">
              <button
                className="w-full px-4 py-3 flex items-center justify-between bg-primary/5 hover:bg-primary/10 transition-colors"
                onClick={() => setProTipOpen(!proTipOpen)}
              >
                <span className="font-medium text-sm flex items-center gap-2 text-primary">
                  <Lightbulb className="w-4 h-4" /> Senior Engineer Pro Tip
                </span>
                {proTipOpen ? <ChevronDown className="w-4 h-4 text-primary" /> : <ChevronRight className="w-4 h-4 text-primary" />}
              </button>
              {proTipOpen && (
                <div className="p-4 text-sm text-muted-foreground border-t bg-card/50">
                  {activeResult.proTip}
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground flex-col gap-4 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Terminal className="w-8 h-8 opacity-50" />
            </div>
            <div>
              <p className="font-medium text-foreground">Awaiting Input</p>
              <p className="text-sm max-w-sm mt-1">Paste your code and error message on the left, then click Debug Now to get an expert analysis.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
