import React, { useState } from "react";
import { useListHistory, useGetStats, useClearHistory, useDeleteSession, getListHistoryQueryKey, getGetStatsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Terminal, ChevronLeft, ChevronRight, BarChart3, Database } from "lucide-react";
import { AnalyzeRequestLanguage } from "@workspace/api-client-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SELECTED_SESSION_STORAGE_KEY = "selectedDebugSessionId";

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

export default function History() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  
  const { data: stats, isLoading: isStatsLoading } = useGetStats();
  
  const { data: historyData, isLoading: isHistoryLoading } = useListHistory({ 
    page, 
    limit: 10, 
    ...(languageFilter !== "all" ? { language: languageFilter } : {}) 
  });

  const clearHistoryMutation = useClearHistory();
  const deleteSessionMutation = useDeleteSession();

  const handleClearHistory = () => {
    clearHistoryMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListHistoryQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
        setPage(1);
      }
    });
  };

  const handleDeleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteSessionMutation.mutate({ sessionId: id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListHistoryQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
      }
    });
  };

  const handleRowClick = (id: string) => {
    window.sessionStorage.setItem(SELECTED_SESSION_STORAGE_KEY, id);
    setLocation("/");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-muted/10 p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Debug History</h1>
            <p className="text-muted-foreground mt-1">Review your past debugging sessions and insights.</p>
          </div>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={!historyData || historyData.total === 0 || clearHistoryMutation.isPending}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear History
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all your debug sessions.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleClearHistory} 
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {clearHistoryMutation.isPending ? "Deleting..." : "Delete All"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Database className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isStatsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{stats?.totalSessions || 0}</div>
              )}
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">By Severity</CardTitle>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isStatsLoading ? (
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {stats?.bySeverity?.map((s) => (
                    <Badge key={s.severity} variant="outline" className={`${getSeverityColor(s.severity)}`}>
                      {getSeverityLabel(s.severity)}: {s.count}
                    </Badge>
                  ))}
                  {(!stats?.bySeverity || stats.bySeverity.length === 0) && (
                    <span className="text-sm text-muted-foreground">No data available</span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Filters and List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Recent Sessions</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filter:</span>
              <Select value={languageFilter} onValueChange={(val) => { setLanguageFilter(val); setPage(1); }}>
                <SelectTrigger className="w-[140px] h-8">
                  <SelectValue placeholder="All Languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {Object.values(AnalyzeRequestLanguage).map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {getLanguageLabel(lang)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border bg-card overflow-hidden">
            {isHistoryLoading ? (
              <div className="divide-y">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-4 flex items-center justify-between">
                    <div className="space-y-2 w-full">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-24" />
                      </div>
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : historyData?.sessions.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
                <Terminal className="w-12 h-12 mb-4 opacity-20" />
                <p>No debug sessions found.</p>
                {languageFilter !== "all" && (
                  <Button variant="link" onClick={() => setLanguageFilter("all")} className="mt-2">
                    Clear filter
                  </Button>
                )}
              </div>
            ) : (
              <div className="divide-y">
                {historyData?.sessions.map((session) => (
                  <div 
                    key={session.id} 
                    className="p-4 hover:bg-muted/50 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    onClick={() => handleRowClick(session.id)}
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Badge variant="outline" className="font-medium bg-background text-xs">
                          {getLanguageLabel(session.language)}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getSeverityColor(session.severity)}`}>
                          {getSeverityLabel(session.severity)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(session.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium truncate text-foreground/90">
                        {session.rootCause}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={(e) => handleDeleteSession(e, session.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {historyData && historyData.total > 0 && (
              <div className="p-4 border-t flex items-center justify-between bg-muted/20">
                <div className="text-sm text-muted-foreground">
                  Showing {((page - 1) * historyData.limit) + 1} to {Math.min(page * historyData.limit, historyData.total)} of {historyData.total} entries
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPage(p => p + 1)}
                    disabled={!historyData.hasNext}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
