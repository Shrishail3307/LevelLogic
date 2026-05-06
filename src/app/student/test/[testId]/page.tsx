"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTestStore, useDataStore, useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronLeft, ChevronRight, Clock, Flag, Layout, Activity, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TestSessionPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.testId as string;
  const { tests, questions: allQuestions, addResult } = useDataStore();
  const { user } = useAuthStore();
  
  const test = useMemo(() => tests.find((t) => t.id === testId) || tests[0], [tests, testId]);
  const questions = useMemo(() => allQuestions.filter(q => q.testId === testId), [allQuestions, testId]);
  
  const { 
    startTest, 
    answers, 
    selectAnswer, 
    currentQuestionIndex, 
    setQuestionIndex, 
    timeRemainingSeconds, 
    decrementTime,
    endTest 
  } = useTestStore();

  const [mounted, setMounted] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
    if (test) {
      startTest(test.id, test.durationMinutes);
    }
  }, [test, startTest]);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      decrementTime();
    }, 1000);
    return () => clearInterval(timer);
  }, [decrementTime, mounted]);

  if (!mounted || !test) return null;

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-coral mx-auto mb-4" />
          <h2 className="text-2xl font-display mb-2">Configuration Error</h2>
          <p className="text-slate mb-6">No nodes found for this assessment module.</p>
          <Button onClick={() => router.push('/student/practice')}>Return to Library</Button>
        </div>
      </div>
    );
  }

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const isWarning = timeRemainingSeconds !== null && timeRemainingSeconds < 300; // 5 mins

  const handleNext = () => {
    if (!isLastQuestion) setQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrev = () => {
    if (!isFirstQuestion) setQuestionIndex(currentQuestionIndex - 1);
  };

  const toggleFlag = (id: string) => {
    setFlaggedQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmitTest = () => {
    if (!confirm("Are you sure you want to finalize this session?")) return;

    // Correct Scoring Logic
    let correctCount = 0;
    questions.forEach(q => {
      const userAnswer = answers[q.id];
      // Ensure strict comparison of numbers
      if (typeof userAnswer === 'number' && userAnswer === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const resultId = "res_" + Math.random().toString(36).substr(2, 6);
    
    const newResult = {
      id: resultId,
      studentId: user?.id || 'anon',
      studentName: user?.name || 'Anonymous',
      studentEmail: user?.email || 'anon@example.com',
      testId: test.id,
      testTitle: test.title,
      score: correctCount,
      total: questions.length,
      percentage: percentage,
      date: new Date().toISOString(),
      status: percentage >= test.passPercentage ? 'Pass' : 'Fail' as any,
    };

    addResult(newResult);
    endTest();
    router.push(`/student/results/${resultId}`);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col h-screen bg-canvas font-sans selection:bg-stone overflow-hidden">
      {/* Editorial Header Bar */}
      <header className="flex items-center justify-between h-20 px-8 bg-white border-b border-hairline z-30 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-near-black rounded-lg flex items-center justify-center">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-[18px] font-display text-ink leading-tight">{test.title}</h1>
            <p className="label-mono text-[9px] text-muted-slate uppercase tracking-widest mt-0.5">Session ID: {testId.slice(0, 8)}</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6 pr-8 border-r border-hairline">
             <div className="text-right">
                <p className="label-mono text-[9px] text-muted-slate mb-0.5">Latency</p>
                <div className={cn(
                  "font-mono text-[16px] font-bold tracking-tighter",
                  isWarning ? "text-coral animate-pulse" : "text-ink"
                )}>
                  {formatTime(timeRemainingSeconds)}
                </div>
             </div>
             <div className="text-right">
                <p className="label-mono text-[9px] text-muted-slate mb-0.5">Throughput</p>
                <div className="font-mono text-[16px] font-bold tracking-tighter text-ink">
                  {currentQuestionIndex + 1}/{questions.length}
                </div>
             </div>
          </div>
          <Button 
            onClick={handleSubmitTest}
            className="bg-near-black text-white hover:bg-cohere-black rounded-full px-8 h-10 font-bold"
          >
            Finalize Session
          </Button>
        </div>
      </header>

      {/* Progress Strip */}
      <div className="h-0.5 w-full bg-hairline relative z-20">
        <div 
          className="h-full bg-action-blue transition-all duration-500 ease-out" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Question Palette Sidebar */}
        <aside className="w-72 bg-white border-r border-hairline overflow-y-auto hidden xl:block p-8">
          <h3 className="label-mono text-[11px] text-muted-slate uppercase tracking-widest mb-8">Node Navigation</h3>
          <div className="grid grid-cols-4 gap-3">
            {questions.map((q, idx) => {
              const isAttempted = answers[q.id] !== undefined;
              const isCurrent = idx === currentQuestionIndex;
              const isFlagged = flaggedQuestions[q.id];
              return (
                <button
                  key={q.id}
                  onClick={() => setQuestionIndex(idx)}
                  className={cn(
                    "relative h-10 w-10 rounded-xl text-[13px] font-bold flex items-center justify-center transition-all border",
                    isCurrent ? "bg-near-black text-white border-near-black shadow-lg shadow-near-black/20" :
                    isAttempted ? "bg-action-blue/10 text-action-blue border-action-blue/20" :
                    "bg-canvas text-muted-slate border-hairline hover:border-ink hover:text-ink"
                  )}
                >
                  {idx + 1}
                  {isFlagged && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-coral rounded-full border-2 border-white" />
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="mt-12 p-6 bg-stone/30 rounded-2xl border border-hairline">
             <h4 className="label-mono text-[9px] text-muted-slate uppercase mb-4">Legend</h4>
             <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-ink font-medium">
                   <div className="w-3 h-3 rounded-sm bg-near-black" /> Active Node
                </div>
                <div className="flex items-center gap-3 text-xs text-ink font-medium">
                   <div className="w-3 h-3 rounded-sm bg-action-blue" /> Processed
                </div>
                <div className="flex items-center gap-3 text-xs text-ink font-medium">
                   <div className="w-3 h-3 rounded-sm bg-coral" /> Flagged
                </div>
             </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-stone/20 p-8 md:p-12 lg:p-16 flex justify-center">
          <div className="w-full max-w-4xl">
            {/* Question Card */}
            <div className="bg-white border border-hairline rounded-[32px] p-10 md:p-16 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-near-black/5" />
               
               <div className="flex items-start justify-between mb-12">
                  <span className="label-mono text-[10px] text-action-blue px-3 py-1 bg-action-blue/5 border border-action-blue/20 rounded-full">
                    INFERENCE NODE {currentQuestionIndex + 1}
                  </span>
                  <button 
                    onClick={() => toggleFlag(currentQuestion.id)}
                    className={cn(
                      "flex items-center gap-2 text-xs font-bold transition-colors",
                      flaggedQuestions[currentQuestion.id] ? "text-coral" : "text-muted-slate hover:text-ink"
                    )}
                  >
                    <Flag className={cn("w-4 h-4", flaggedQuestions[currentQuestion.id] && "fill-coral")} />
                    {flaggedQuestions[currentQuestion.id] ? "Flagged for Audit" : "Flag Node"}
                  </button>
               </div>

               <h2 className="text-[28px] md:text-[34px] font-display text-ink leading-tight mb-16 max-w-3xl">
                  {currentQuestion.text}
               </h2>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = answers[currentQuestion.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => selectAnswer(currentQuestion.id, idx)}
                        className={cn(
                          "flex items-center justify-between px-8 h-20 rounded-2xl border-2 transition-all duration-200 text-left group",
                          isSelected 
                            ? "bg-near-black border-near-black text-white shadow-xl shadow-near-black/10 scale-[1.02]" 
                            : "bg-white border-hairline text-ink hover:border-action-blue hover:bg-action-blue/5"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <span className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors",
                            isSelected ? "bg-white/20 border-white/20 text-white" : "bg-stone border-hairline text-muted-slate group-hover:border-action-blue/30 group-hover:text-action-blue"
                          )}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-[16px] font-medium">{option}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
                      </button>
                    );
                  })}
               </div>
            </div>

            {/* Navigation Controls */}
            <div className="mt-12 flex items-center justify-between">
               <Button 
                variant="outline" 
                size="pill"
                onClick={handlePrev} 
                disabled={isFirstQuestion}
                className="gap-3 h-14 px-10 border-hairline bg-white hover:bg-stone text-ink font-bold"
              >
                <ChevronLeft className="w-5 h-5" /> Previous Node
              </Button>

              <div className="flex items-center gap-4">
                {isLastQuestion ? (
                  <Button 
                    onClick={handleSubmitTest}
                    className="gap-3 h-14 px-12 bg-enterprise-green text-white hover:bg-enterprise-green/90 rounded-full font-bold shadow-lg shadow-enterprise-green/20"
                  >
                    Finalize Assessment <CheckCircle2 className="w-5 h-5" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNext} 
                    className="gap-3 h-14 px-12 bg-near-black text-white hover:bg-cohere-black rounded-full font-bold"
                  >
                    Next Node <ChevronRight className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
