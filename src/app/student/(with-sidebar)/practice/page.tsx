"use client";

import { useDataStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Puzzle, Code2, BookOpen, Clock, Target, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

const iconMap: Record<string, any> = {
  "Quantitative Aptitude": Calculator,
  "Logical Reasoning": Puzzle,
  "Technical Skills": Code2,
  "Verbal English": BookOpen,
};

export default function StudentPracticePage() {
  const { tests } = useDataStore();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects = Array.from(new Set(tests.map(t => t.subject)));
  const filteredTests = selectedSubject 
    ? tests.filter(t => t.subject === selectedSubject)
    : tests;

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 selection:bg-stone">
      {/* Editorial Header */}
      <div className="border-b border-hairline pb-12">
        <p className="label-mono text-action-blue mb-4">Training Grounds</p>
        <h1 className="text-[48px] font-display text-ink leading-tight">Available Assessments</h1>
        <p className="text-slate text-[18px] max-w-2xl mt-4">
          Select a specialized module to begin your cognitive evaluation. Each test is designed to measure specific logical vectors.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={() => setSelectedSubject(null)}
          className={cn(
            "px-6 h-10 rounded-full text-sm font-medium transition-all border",
            !selectedSubject 
              ? "bg-near-black text-white border-near-black" 
              : "bg-white text-ink border-hairline hover:border-ink"
          )}
        >
          All Modules
        </button>
        {subjects.map(subject => (
          <button 
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={cn(
              "px-6 h-10 rounded-full text-sm font-medium transition-all border",
              selectedSubject === subject 
                ? "bg-near-black text-white border-near-black" 
                : "bg-white text-ink border-hairline hover:border-ink"
            )}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* Test Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTests.map((test) => {
          const Icon = iconMap[test.subject] || BookOpen;
          return (
            <Card
              key={test.id}
              className="group p-0 border-hairline rounded-[24px] overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 bg-canvas flex flex-col"
            >
              <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-stone flex items-center justify-center group-hover:bg-action-blue group-hover:text-white transition-colors duration-500">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="label-mono text-[10px] text-muted-slate uppercase tracking-widest mb-1">Difficulty</span>
                    <span className={cn(
                      "text-[12px] font-bold",
                      test.difficulty === 'Easy' ? 'text-enterprise-green' : 
                      test.difficulty === 'Medium' ? 'text-action-blue' : 'text-coral'
                    )}>
                      {test.difficulty.toUpperCase()}
                    </span>
                  </div>
                </div>

                <h3 className="text-[22px] font-display text-ink mb-3 leading-tight group-hover:text-action-blue transition-colors">
                  {test.title}
                </h3>
                <p className="text-slate text-sm leading-relaxed mb-8 line-clamp-3">
                  {test.description}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-hairline">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-slate" />
                    <span className="text-[13px] font-medium text-ink">{test.durationMinutes} mins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-muted-slate" />
                    <span className="text-[13px] font-medium text-ink">{test.totalQuestions} Questions</span>
                  </div>
                </div>
              </div>

              <Link 
                href={`/student/test/${test.id}`}
                className="w-full py-5 bg-stone/30 group-hover:bg-near-black group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm"
              >
                Initialize Session
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
