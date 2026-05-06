"use client";

import { ArrowUpRight, ArrowRight, PlayCircle, Trophy, Target, Zap, Clock, TrendingUp, ChevronRight, Activity } from "lucide-react";
import Link from "next/link";
import { ScorePill } from "@/components/ui/score-pill";
import { useDataStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export default function StudentDashboardPage() {
  const { results, tests } = useDataStore();
  const recentResults = results.slice(0, 5);
  
  const totalTests = results.length;
  const avgScore = totalTests > 0 
    ? Math.round(results.reduce((acc, curr) => acc + curr.percentage, 0) / totalTests)
    : 0;
  
  const passCount = results.filter(r => r.status === 'Pass').length;
  const passRate = totalTests > 0 ? Math.round((passCount / totalTests) * 100) : 0;

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 selection:bg-stone">
      {/* Editorial Header */}
      <div className="border-b border-hairline pb-12">
        <p className="label-mono text-action-blue mb-4">Command Center</p>
        <h1 className="text-[48px] font-display text-ink leading-tight">Performance Overview</h1>
        <p className="text-slate text-[18px] max-w-2xl mt-4">
          Real-time metrics and historical analysis of your technical progression. 
          Focus on areas with high latency in cognitive processing.
        </p>
      </div>

      {/* Stats - Surface Alternation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline border border-hairline rounded-lg overflow-hidden">
        <div className="bg-canvas p-8 transition-colors hover:bg-stone/30 group">
          <div className="flex justify-between items-start mb-8">
            <p className="label-mono text-muted-slate">Assessments Completed</p>
            <Zap className="w-5 h-5 text-ink/20 group-hover:text-action-blue transition-colors" />
          </div>
          <div className="flex items-end gap-4">
            <h3 className="text-5xl font-display text-ink">{totalTests}</h3>
            <span className="text-[12px] font-medium text-enterprise-green mb-2">Active session</span>
          </div>
        </div>

        <div className="bg-canvas p-8 transition-colors hover:bg-stone/30 group">
          <div className="flex justify-between items-start mb-8">
            <p className="label-mono text-muted-slate">Aggregate Score</p>
            <TrendingUp className="w-5 h-5 text-ink/20 group-hover:text-action-blue transition-colors" />
          </div>
          <div className="flex items-end gap-4">
            <h3 className="text-5xl font-display text-ink">{avgScore}<span className="text-2xl text-muted-slate">%</span></h3>
            <span className="text-[12px] font-medium text-action-blue mb-2">Mean accuracy</span>
          </div>
        </div>

        <div className="bg-canvas p-8 transition-colors hover:bg-stone/30 group">
          <div className="flex justify-between items-start mb-8">
            <p className="label-mono text-muted-slate">Success Rate</p>
            <Target className="w-5 h-5 text-ink/20 group-hover:text-action-blue transition-colors" />
          </div>
          <div className="flex items-end gap-4">
            <h3 className="text-5xl font-display text-ink">{passRate}<span className="text-2xl text-muted-slate">%</span></h3>
            <span className="text-[12px] font-medium text-coral mb-2">Pass ratio</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Recent Activity */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[24px] font-display text-ink">Session Log</h2>
            <Link href="/student/results" className="text-sm font-medium text-action-blue hover:underline">
              View all records
            </Link>
          </div>
          
          <div className="space-y-px border-t border-hairline">
            {recentResults.map((result) => (
              <Link key={result.id} href={`/student/results/${result.id}`} className="bg-canvas p-8 flex items-center justify-between group hover:bg-stone transition-colors border-b border-hairline">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={cn(
                      "label-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border rounded-full",
                      result.status === 'Pass' ? 'border-enterprise-green/30 text-enterprise-green' : 'border-coral/30 text-coral'
                    )}>
                      {result.status}
                    </span>
                    <span className="text-[12px] text-muted-slate">
                      {new Date(result.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-[20px] font-display text-ink group-hover:text-action-blue transition-colors">
                    {result.testTitle}
                  </h4>
                </div>
                <div className="flex items-center gap-12">
                  <div className="text-right hidden sm:block">
                    <p className="label-mono text-[10px] text-muted-slate mb-1">Score</p>
                    <p className="text-[20px] font-display text-ink">{result.percentage}%</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-hairline group-hover:text-action-blue transition-colors translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}

            {recentResults.length === 0 && (
              <div className="py-24 text-center bg-stone/20 rounded-b-lg">
                <Activity className="w-12 h-12 text-muted-slate mx-auto mb-4 opacity-20" />
                <p className="text-slate">No recent activity detected.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="lg:col-span-4 space-y-12">
          <div>
            <h2 className="text-[24px] font-display text-ink mb-8">Directives</h2>
            <div className="space-y-4">
              <Link href="/student/practice" className="block p-8 bg-near-black text-white rounded-xl hover:bg-cohere-black transition-all group overflow-hidden relative">
                <div className="relative z-10">
                  <p className="label-mono text-action-blue mb-2">Initialize</p>
                  <h3 className="text-[24px] font-display mb-8">Start Assessment</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Next suggested: {tests[0]?.title || 'Practice'}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-action-blue/20 blur-[60px] pointer-events-none" />
              </Link>

              <div className="p-6 border border-hairline rounded-xl flex items-center justify-between hover:bg-stone cursor-pointer transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone flex items-center justify-center">
                    <Target className="w-5 h-5 text-ink" />
                  </div>
                  <p className="font-medium text-ink">Logic Roadmap</p>
                </div>
                <ArrowRight className="w-4 h-4 text-hairline group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="p-6 border border-hairline rounded-xl flex items-center justify-between hover:bg-stone cursor-pointer transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone flex items-center justify-center">
                    <Clock className="w-5 h-5 text-ink" />
                  </div>
                  <p className="font-medium text-ink">Schedule Analysis</p>
                </div>
                <ArrowRight className="w-4 h-4 text-hairline group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          <div className="p-8 bg-white border border-hairline rounded-[24px] shadow-sm relative overflow-hidden">
            <p className="label-mono text-enterprise-green mb-8 text-center text-[11px] tracking-widest uppercase">Performance Index</p>
            <div className="flex flex-col items-center">
               <div className="text-[64px] font-display text-ink leading-none mb-2">{avgScore}</div>
               <p className="text-slate text-sm font-medium">Cognitive Score</p>
               
               <div className="w-full h-1 bg-stone rounded-full mt-10 overflow-hidden">
                  <div 
                    className="h-full bg-enterprise-green transition-all duration-1000" 
                    style={{ width: `${avgScore}%` }}
                  />
               </div>
               <p className="text-[11px] text-muted-slate mt-4 uppercase tracking-tighter">System Baseline: 65%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");
