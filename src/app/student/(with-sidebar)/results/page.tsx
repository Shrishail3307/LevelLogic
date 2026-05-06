"use client";

import { useDataStore } from "@/lib/store";
import { ArrowRight, FileText, Calendar, Target, Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ScorePill } from "@/components/ui/score-pill";

export default function StudentResultsPage() {
  const { results } = useDataStore();

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 selection:bg-stone">
      {/* Editorial Header */}
      <div className="border-b border-hairline pb-12">
        <p className="label-mono text-coral mb-4">Milestone Tracker</p>
        <h1 className="text-[48px] font-display text-ink leading-tight">Achievement History</h1>
        <p className="text-slate text-[18px] max-w-2xl mt-4">
          Detailed breakdown of your historical performance. Analyze cognitive patterns and identify areas for accelerated learning.
        </p>
      </div>
      
      {/* Results Table - Research Table Style */}
      <div className="bg-canvas border border-hairline rounded-[24px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone/30 border-b border-hairline">
                <th className="px-8 py-6 text-[11px] font-semibold uppercase tracking-widest text-muted-slate">Module Information</th>
                <th className="px-8 py-6 text-[11px] font-semibold uppercase tracking-widest text-muted-slate">Session Identity</th>
                <th className="px-8 py-6 text-[11px] font-semibold uppercase tracking-widest text-muted-slate text-center">Outcome</th>
                <th className="px-8 py-6 text-[11px] font-semibold uppercase tracking-widest text-muted-slate text-right">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {results.map((result) => (
                <tr key={result.id} className="group hover:bg-stone/10 transition-colors">
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-xl bg-canvas border border-hairline flex items-center justify-center group-hover:bg-action-blue group-hover:text-white transition-all duration-300">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[20px] font-display text-ink group-hover:text-action-blue transition-colors">
                          {result.testTitle}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-3.5 h-3.5 text-muted-slate" />
                          <span className="text-[13px] text-muted-slate">
                            {new Date(result.date).toLocaleDateString(undefined, { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-mono text-ink">ID: {result.id.toUpperCase()}</span>
                      <span className="text-[12px] text-muted-slate mt-1 uppercase tracking-wider">Verified Result</span>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-[24px] font-display text-ink leading-none">{result.score}<span className="text-sm text-muted-slate ml-1">/ {result.total}</span></span>
                      <div className={cn(
                        "mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                        result.status === 'Pass' 
                          ? "bg-enterprise-green/5 text-enterprise-green border-enterprise-green/20" 
                          : "bg-coral/5 text-coral border-coral/20"
                      )}>
                        {result.status}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8 text-right">
                    <Link 
                      href={`/student/results/${result.id}`} 
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-hairline group-hover:bg-ink group-hover:text-white group-hover:border-ink transition-all duration-300"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
              
              {results.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-24 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-stone mb-6">
                      <Award className="w-10 h-10 text-muted-slate" />
                    </div>
                    <h3 className="text-[24px] font-display text-ink">No achievements yet</h3>
                    <p className="text-slate max-w-sm mx-auto mt-2">Initialize your first training session to begin generating performance records.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");
