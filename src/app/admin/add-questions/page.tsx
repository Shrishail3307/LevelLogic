"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDataStore } from "@/lib/store";
import { CheckCircle2, FileQuestion, Plus, Trash2, ArrowRight, Save, Layout, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function AdminAddQuestionsPage() {
  const { tests, questions, addQuestion, deleteQuestion } = useDataStore();
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState<number>(0);
  const [testId, setTestId] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedTestQuestions = questions.filter(q => q.testId === testId);

  const updateOption = (idx: number, value: string) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testId) {
      alert("Please select a test first.");
      return;
    }

    const newQuestion = {
      id: "q_" + Math.random().toString(36).substr(2, 5),
      testId,
      text: questionText,
      options,
      correctOptionIndex: correctOption,
    };

    addQuestion(newQuestion);
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectOption(0);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="space-y-12 max-w-[1400px] mx-auto pb-24 selection:bg-stone">
      {/* Editorial Header */}
      <div className="border-b border-hairline pb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-stone flex items-center justify-center">
            <FileQuestion className="w-5 h-5 text-ink" />
          </div>
          <p className="label-mono text-coral uppercase tracking-widest text-[10px]">Logic Repository</p>
        </div>
        <h1 className="text-[40px] font-display text-ink leading-tight tracking-tight">Question Bank Management</h1>
        <p className="text-slate text-[16px] max-w-2xl mt-2">
          Interface for injecting new logical challenges into existing assessment modules. Maintain cognitive consistency across all nodes.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Form */}
        <div className="flex-1 lg:max-w-[50%] space-y-8">
          <section className="space-y-6">
            <h2 className="label-mono text-[11px] text-muted-slate uppercase tracking-[0.2em] border-b border-hairline pb-4">01 — Configure Question</h2>
            
            <form onSubmit={handleAddQuestion} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="test" className="text-xs font-bold text-ink uppercase tracking-wider">Target Module</Label>
                <Select value={testId} onValueChange={setTestId} required>
                  <SelectTrigger id="test" className="h-14 bg-canvas border-hairline rounded-xl">
                    <SelectValue placeholder="Select target test module..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-hairline shadow-lg">
                    {tests.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="question" className="text-xs font-bold text-ink uppercase tracking-wider">Challenge Text</Label>
                <Textarea
                  id="question"
                  rows={4}
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Formulate the logical proposition..."
                  className="bg-canvas border-hairline rounded-xl focus:ring-1 focus:ring-coral/20 resize-none p-4 min-h-[120px]"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-xs font-bold text-ink uppercase tracking-wider">Response Matrix (Select Correct)</Label>
                <div className="grid grid-cols-1 gap-3">
                  {options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-4 group">
                      <button
                        type="button"
                        onClick={() => setCorrectOption(idx)}
                        className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                          correctOption === idx 
                            ? "bg-enterprise-green border-enterprise-green text-white" 
                            : "border-hairline hover:border-muted-slate"
                        )}
                      >
                        {correctOption === idx && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                      <Input
                        placeholder={`Potential response ${String.fromCharCode(65 + idx)}...`}
                        value={opt}
                        onChange={(e) => updateOption(idx, e.target.value)}
                        required
                        className="h-12 bg-canvas border-hairline rounded-xl focus:ring-1 focus:ring-enterprise-green/20"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full h-16 rounded-xl bg-near-black text-white hover:bg-cohere-black font-bold flex items-center justify-between px-8 group transition-all">
                <span className="flex items-center gap-3">
                  <Plus className="w-5 h-5 text-coral" />
                  Inject Challenge
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </form>
          </section>
        </div>

        {/* Right Preview & Existing */}
        <div className="flex-1 lg:max-w-[50%] space-y-12">
          <section className="space-y-6">
            <h2 className="label-mono text-[11px] text-muted-slate uppercase tracking-[0.2em] border-b border-hairline pb-4">02 — Deployment Preview</h2>
            
            <div className="bg-canvas border border-hairline rounded-[24px] p-8 shadow-sm relative overflow-hidden">
               <div className="flex items-center gap-2 mb-8">
                 <div className="w-2 h-2 rounded-full bg-enterprise-green animate-pulse" />
                 <span className="label-mono text-[10px] text-muted-slate tracking-widest uppercase">Live Vector Preview</span>
               </div>

               <h3 className="text-[22px] font-display text-ink mb-8 leading-tight">
                 {questionText || "Proposition preview will manifest here..."}
               </h3>

               <div className="grid grid-cols-1 gap-3">
                 {options.map((option, idx) => (
                   <div
                     key={idx}
                     className={cn(
                       "flex items-center justify-between px-6 h-14 rounded-xl border transition-all duration-300",
                       correctOption === idx
                         ? "bg-enterprise-green/5 border-enterprise-green/40 text-ink"
                         : "bg-stone/20 border-hairline text-muted-slate"
                     )}
                   >
                     <span className="text-sm font-medium">
                       {option || `Response Node ${String.fromCharCode(65 + idx)}`}
                     </span>
                     {correctOption === idx && (
                       <CheckCircle2 className="w-5 h-5 text-enterprise-green" />
                     )}
                   </div>
                 ))}
               </div>
            </div>
          </section>

          {testId && (
            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="label-mono text-[11px] text-muted-slate uppercase tracking-[0.2em] border-b border-hairline pb-4">03 — Existing Nodes ({selectedTestQuestions.length})</h2>
              
              <div className="space-y-3">
                {selectedTestQuestions.map((q, idx) => (
                  <div key={q.id} className="p-6 bg-canvas border border-hairline rounded-xl flex items-start justify-between group hover:bg-stone/30 transition-colors">
                    <div className="flex-1 mr-8">
                      <p className="text-[14px] text-ink font-medium leading-relaxed">
                        <span className="text-muted-slate mr-2">{idx + 1}.</span>
                        {q.text}
                      </p>
                    </div>
                    <button 
                      onClick={() => deleteQuestion(q.id)}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-muted-slate hover:text-error-red hover:bg-error-red/5 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
