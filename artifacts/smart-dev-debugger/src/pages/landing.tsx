import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import {
  Terminal,
  Search,
  Wrench,
  BookOpen,
  ArrowRight,
  Moon,
  Sun,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Search,
    title: "Root Cause Detection",
    description: "AI pinpoints exactly what broke and why — no more guessing through stack traces.",
  },
  {
    icon: Wrench,
    title: "Instant Fix Suggestions",
    description: "Step-by-step instructions plus the fully corrected code, ready to paste back.",
  },
  {
    icon: BookOpen,
    title: "Explained Like You're Human",
    description: "Toggle between standard explanations and ELI5 mode with real-world analogies.",
  },
];

export default function Landing() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-md px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          <span className="font-bold text-lg tracking-tight">Smart Dev Debugger</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8"
            data-testid="button-toggle-theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Link href="/login">
            <Button variant="ghost" size="sm" data-testid="link-header-login">Login</Button>
          </Link>
          <Link href="/register">
            <Button size="sm" data-testid="link-header-register">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <section className="px-4 md:px-8 py-16 md:py-28 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Code Debugging
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl text-balance leading-[1.05]">
              Paste broken code. <br />
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Get expert answers.
              </span>{" "}
              In seconds.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance leading-relaxed">
              Smart Dev Debugger is an AI-powered tool that instantly analyzes your
              code errors, identifies the root cause, and gives you a plain-English
              explanation plus corrected code. Built for developers who hate
              reading cryptic stack traces alone.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <Link href="/register">
                <Button size="lg" className="gap-2 px-7" data-testid="button-cta-register">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <span className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium" data-testid="link-cta-login">
                  Login
                </Link>
              </span>
            </div>
          </motion.div>
        </section>

        <section className="px-4 md:px-8 pb-16 md:pb-24 max-w-5xl mx-auto w-full">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.1 }}
                  className="rounded-2xl border bg-card/50 backdrop-blur p-6 hover:border-primary/40 hover:bg-card transition-colors"
                  data-testid={`card-feature-${idx}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="px-4 md:px-8 pb-20 max-w-3xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl border bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent p-8 md:p-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Ready to stop fighting bugs alone?
            </h2>
            <p className="text-muted-foreground mb-6">
              100 free credits on sign up. No credit card required.
            </p>
            <Link href="/register">
              <Button size="lg" className="gap-2" data-testid="button-bottom-cta">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-border/50 px-4 md:px-8 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Smart Dev Debugger
      </footer>
    </div>
  );
}
