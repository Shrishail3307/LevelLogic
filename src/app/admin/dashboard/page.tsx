"use client";

import { useDataStore } from "@/lib/store";
import { 
  Users, 
  FileText, 
  Activity, 
  CheckCircle, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal, 
  ChevronRight, 
  Layers, 
  Trash2, 
  Edit3,
  Plus
} from "lucide-react";
import { ScorePill } from "@/components/ui/score-pill";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminDashboardPage() {
  const { tests, results, students } = useDataStore();
  const recentActivity = results.slice(0, 10);

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 selection:bg-stone">
      {/* Editorial Header */}
      <div className="border-b border-hairline pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="label-mono text-enterprise-green mb-4">Command Center</p>
            <h1 className="text-[48px] font-display text-ink leading-tight">System Authority</h1>
            <p className="text-slate text-[18px] max-w-2xl mt-4">
              Real-time monitoring of global inference throughput and candidate cognition cycles.
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="pill" className="h-10">Export Logs</Button>
            <Button asChild size="pill" className="h-10 bg-near-black text-white hover:bg-cohere-black">
              <Link href="/admin/create-test" className="gap-2">
                <Plus className="w-4 h-4" /> Create Test
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-hairline border border-hairline rounded-lg overflow-hidden">
        <div className="bg-canvas p-8 transition-colors hover:bg-stone/30 group">
          <div className="flex justify-between items-start mb-8">
            <p className="label-mono text-muted-slate">Total Candidates</p>
            <Users className="w-5 h-5 text-ink/20 group-hover:text-action-blue transition-colors" />
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-4xl font-display text-ink tracking-tight">{students.length}</h3>
            <span className="text-[10px] font-medium text-enterprise-green mb-1.5 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> 4%
            </span>
          </div>
        </div>

        <div className="bg-canvas p-8 transition-colors hover:bg-stone/30 group">
          <div className="flex justify-between items-start mb-8">
            <p className="label-mono text-muted-slate">Tests Active</p>
            <Layers className="w-5 h-5 text-ink/20 group-hover:text-action-blue transition-colors" />
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-4xl font-display text-ink tracking-tight">{tests.length}</h3>
            <span className="text-[10px] font-medium text-muted-slate mb-1.5 uppercase tracking-widest">Stable</span>
          </div>
        </div>

        <div className="bg-canvas p-8 transition-colors hover:bg-stone/30 group">
          <div className="flex justify-between items-start mb-8">
            <p className="label-mono text-muted-slate">Avg. Performance</p>
            <Activity className="w-5 h-5 text-ink/20 group-hover:text-action-blue transition-colors" />
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-4xl font-display text-ink tracking-tight">72<span className="text-xl text-muted-slate">%</span></h3>
            <span className="text-[10px] font-medium text-enterprise-green mb-1.5 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> 1.2%
            </span>
          </div>
        </div>

        <div className="bg-canvas p-8 transition-colors hover:bg-stone/30 group">
          <div className="flex justify-between items-start mb-8">
            <p className="label-mono text-muted-slate">Total Results</p>
            <CheckCircle className="w-5 h-5 text-ink/20 group-hover:text-action-blue transition-colors" />
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-4xl font-display text-ink tracking-tight">{results.length}</h3>
            <span className="text-[10px] font-medium text-muted-slate mb-1.5 flex items-center uppercase tracking-widest">Records</span>
          </div>
        </div>
      </div>

      {/* Assessment Stream */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-hairline pb-8">
          <h2 className="text-[24px] font-display text-ink">Assessment Stream</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-5 h-11 bg-stone/50 border border-hairline rounded-full text-muted-slate focus-within:border-action-blue focus-within:bg-white transition-all group">
              <Search className="w-4 h-4 group-focus-within:text-action-blue" />
              <input type="text" placeholder="Search audit trail..." className="bg-transparent border-none outline-none text-sm font-medium w-full md:w-64 placeholder:text-muted-slate" />
            </div>
          </div>
        </div>

        <div className="space-y-px">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="bg-canvas p-8 flex items-center justify-between group hover:bg-stone/50 transition-colors cursor-pointer border-t border-hairline last:border-b">
              <div className="flex items-center gap-6 flex-1">
                <div className="w-12 h-12 rounded-full bg-stone border border-hairline flex items-center justify-center font-display text-ink text-sm">
                  {activity.studentName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="label-mono text-[9px] text-action-blue px-1.5 py-0.5 bg-action-blue/5 rounded-sm">
                      VERIFIED
                    </span>
                    <span className="text-[11px] text-muted-slate uppercase tracking-wider">
                      {new Date(activity.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-[20px] font-display text-ink group-hover:text-action-blue transition-colors">
                    {activity.studentName}
                  </h4>
                  <p className="text-[13px] text-slate">{activity.testTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-right hidden md:block">
                  <p className="label-mono text-[9px] text-muted-slate mb-1">Score</p>
                  <p className="text-[20px] font-display text-ink">{activity.percentage}%</p>
                </div>
                <ChevronRight className="w-5 h-5 text-hairline group-hover:text-action-blue transition-colors" />
              </div>
            </div>
          ))}
          {recentActivity.length === 0 && (
            <div className="py-20 text-center bg-stone/20 rounded-xl border border-dashed border-hairline">
              <p className="text-slate">No recent assessment activity found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
