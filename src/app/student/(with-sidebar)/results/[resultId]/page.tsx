"use client";

import { useParams, useRouter } from "next/navigation";
import { useDataStore, useAuthStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Clock, Target, CheckCircle2, XCircle, Share2, Download, AlertCircle, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

function ScoreRing({ percentage }: { percentage: number }) {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          className="stroke-hairline"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          className="stroke-action-blue transition-all duration-1000 ease-out"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[44px] font-display font-bold text-ink leading-none">
          {percentage.toFixed(0)}
        </span>
        <span className="text-[14px] label-mono text-muted-slate mt-1">%</span>
      </div>
    </div>
  );
}

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const resultId = params.resultId as string;
  const { results, tests } = useDataStore();
  const result = results.find((r) => r.id === resultId);

  if (!result) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-12 h-12 text-coral mb-4" />
        <h2 className="text-2xl font-display mb-2">Record Not Found</h2>
        <p className="text-slate mb-6">The assessment log for ID {resultId} is unavailable.</p>
        <Button onClick={() => router.push('/student/results')}>View All Results</Button>
      </div>
    );
  }

  const test = tests.find(t => t.id === result.testId);
  const isPass = result.status === 'Pass';

  return (
    <div className="max-w-5xl mx-auto pb-24 selection:bg-stone">
      {/* Header Area */}
      <div className="mb-12 border-b border-hairline pb-12">
        <Button variant="ghost" asChild className="mb-8 pl-0 hover:bg-transparent text-muted-slate hover:text-ink transition-colors">
          <Link href="/student/results">
            <ArrowLeft className="w-4 h-4 mr-2" /> Audit History
          </Link>
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="label-mono text-enterprise-green mb-4">Post-Inference Audit</p>
            <h1 className="text-[48px] font-display text-ink leading-tight">{result.testTitle}</h1>
            <p className="text-slate text-[18px] max-w-2xl mt-4">
              Detailed performance metrics and cognitive breakdown for session <span className="font-mono text-ink">{resultId.slice(0, 8)}</span>.
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="pill" className="h-10 px-6 border-hairline">
              <Download className="w-4 h-4 mr-2" /> Export PDF
            </Button>
            <Button variant="outline" size="pill" className="h-10 px-6 border-hairline">
              <Share2 className="w-4 h-4 mr-2" /> Share Result
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Summary Card */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-hairline rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 md:gap-24 relative overflow-hidden shadow-sm">
             <div className={cn(
               "absolute top-0 left-0 w-2 h-full",
               isPass ? "bg-enterprise-green" : "bg-coral"
             )} />
             
             <ScoreRing percentage={result.percentage} />
             
             <div className="flex-1 text-center md:text-left">
                <div className={cn(
                  "inline-flex items-center gap-2 px-4 py-1 rounded-full text-[10px] font-bold label-mono uppercase mb-6 tracking-widest",
                  isPass ? "bg-enterprise-green/5 text-enterprise-green border border-enterprise-green/20" : "bg-coral/5 text-coral border border-coral/20"
                )}>
                  {isPass ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  Final Decision: {result.status}
                </div>
                
                <h2 className="text-[56px] font-display text-ink leading-none mb-2">
                  {result.score}<span className="text-[24px] text-muted-slate font-medium ml-1">/ {result.total}</span>
                </h2>
                <p className="text-slate font-medium mb-8">Questions validated correctly across the module.</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="px-5 py-3 bg-stone/50 rounded-2xl border border-hairline">
                    <p className="label-mono text-[9px] text-muted-slate mb-1">Time Elapsed</p>
                    <p className="font-bold text-ink">14:22</p>
                  </div>
                  <div className="px-5 py-3 bg-stone/50 rounded-2xl border border-hairline">
                    <p className="label-mono text-[9px] text-muted-slate mb-1">Pass Mark</p>
                    <p className="font-bold text-ink">{test?.passPercentage || 70}%</p>
                  </div>
                </div>
             </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-canvas p-8 rounded-3xl border border-hairline">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-10 h-10 rounded-xl bg-action-blue/5 border border-action-blue/10 flex items-center justify-center text-action-blue">
                      <Target className="w-5 h-5" />
                   </div>
                   <h4 className="font-display text-lg text-ink">Precision Metrics</h4>
                </div>
                <p className="text-sm text-slate mb-8">Analysis of response accuracy relative to cognitive node complexity.</p>
                <div className="space-y-6">
                   <div className="flex items-end justify-between">
                      <div className="label-mono text-[10px] text-muted-slate uppercase">Overall Calibration</div>
                      <div className="text-xl font-display text-ink">{result.percentage}%</div>
                   </div>
                   <div className="h-1.5 w-full bg-hairline rounded-full overflow-hidden">
                      <div className="h-full bg-action-blue rounded-full" style={{ width: `${result.percentage}%` }} />
                   </div>
                </div>
             </div>

             <div className="bg-canvas p-8 rounded-3xl border border-hairline">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-10 h-10 rounded-xl bg-enterprise-green/5 border border-enterprise-green/10 flex items-center justify-center text-enterprise-green">
                      <Activity className="w-5 h-5" />
                   </div>
                   <h4 className="font-display text-lg text-ink">Latency Stats</h4>
                </div>
                <p className="text-sm text-slate mb-8">Mean time to process individual inference nodes within the session.</p>
                <div className="space-y-6">
                   <div className="flex items-end justify-between">
                      <div className="label-mono text-[10px] text-muted-slate uppercase">Avg Throughput</div>
                      <div className="text-xl font-display text-ink">2.4s <span className="text-sm font-medium text-muted-slate">/ node</span></div>
                   </div>
                   <div className="h-1.5 w-full bg-hairline rounded-full overflow-hidden">
                      <div className="h-full bg-enterprise-green rounded-full" style={{ width: '65%' }} />
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right: Section Breakdown */}
        <div className="space-y-8">
          <h3 className="label-mono text-[11px] text-muted-slate uppercase tracking-widest px-4">Node Breakdown</h3>
          <div className="bg-white border border-hairline rounded-[32px] overflow-hidden">
             <div className="p-8 border-b border-hairline bg-stone/20">
                <p className="text-sm font-medium text-ink">Sectional Performance Analysis</p>
             </div>
             <div className="p-8 space-y-10">
                {[
                  { name: "Logical Foundation", score: Math.ceil(result.score * 0.4), total: Math.ceil(result.total * 0.4) },
                  { name: "Verbal Inference", score: Math.ceil(result.score * 0.3), total: Math.ceil(result.total * 0.3) },
                  { name: "Quantitative Logic", score: Math.floor(result.score * 0.3), total: Math.floor(result.total * 0.3) },
                ].map((sec, i) => {
                  const p = (sec.score / sec.total) * 100;
                  return (
                    <div key={i} className="group">
                      <div className="flex justify-between items-end mb-3">
                        <div>
                          <p className="label-mono text-[9px] text-muted-slate uppercase tracking-wider mb-0.5">{sec.name}</p>
                          <p className="text-sm font-bold text-ink">{sec.score} / {sec.total}</p>
                        </div>
                        <div className="text-xs font-mono text-muted-slate group-hover:text-ink transition-colors">{p.toFixed(0)}%</div>
                      </div>
                      <div className="h-1 w-full bg-hairline rounded-full overflow-hidden">
                        <div className="h-full bg-ink rounded-full transition-all duration-700" style={{ width: `${p}%` }} />
                      </div>
                    </div>
                  );
                })}
             </div>
          </div>
          
          <div className="p-8 bg-near-black rounded-[32px] text-white">
             <h4 className="font-display text-lg mb-4">Command Verdict</h4>
             <p className="text-sm text-slate-300 leading-relaxed mb-6">
               {isPass 
                 ? "Authentication successful. The candidate has demonstrated sufficient cognitive capacity to access the next module layer." 
                 : "Threshold not reached. Additional processing cycles and foundation training required for module access."}
             </p>
             <Button variant="outline" className="w-full h-12 rounded-2xl border-white/20 text-white hover:bg-white/10">
               Audit Full Transcript
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
