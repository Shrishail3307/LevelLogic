"use client";

import { useDataStore } from "@/lib/store";
import { 
  Search, 
  MoreHorizontal, 
  Layers, 
  Trash2, 
  Edit3,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminTestsPage() {
  const { tests, deleteTest } = useDataStore();

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 selection:bg-stone">
      {/* Editorial Header */}
      <div className="border-b border-hairline pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="label-mono text-coral mb-4">Module Management</p>
            <h1 className="text-[48px] font-display text-ink leading-tight">Test Repository</h1>
            <p className="text-slate text-[18px] max-w-2xl mt-4">
              Deploy, audit, and optimize logical assessment modules within the global infrastructure.
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild size="pill" className="h-12 bg-near-black text-white hover:bg-cohere-black px-8">
              <Link href="/admin/create-test" className="gap-2">
                <Plus className="w-4 h-4" /> Create Test
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3 px-5 h-12 bg-stone/50 border border-hairline rounded-full text-muted-slate focus-within:border-action-blue focus-within:bg-white transition-all group w-full md:w-96">
          <Search className="w-4 h-4 group-focus-within:text-action-blue" />
          <input type="text" placeholder="Search tests by title or subject..." className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-muted-slate" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden shadow-sm">
        {tests.map((test) => (
          <div key={test.id} className="bg-canvas p-8 flex flex-col justify-between group hover:bg-stone/30 transition-colors border-b last:border-b-0 border-hairline">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="label-mono text-[10px] text-action-blue px-3 py-1 bg-action-blue/5 border border-action-blue/20 rounded-full">
                  {test.subject}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-stone">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-xl border-hairline shadow-lg">
                    <DropdownMenuItem className="gap-2 p-3">
                      <Edit3 className="w-4 h-4" /> Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="gap-2 p-3 text-error-red focus:text-error-red focus:bg-error-red/5"
                      onClick={() => deleteTest(test.id)}
                    >
                      <Trash2 className="w-4 h-4" /> Delete Test
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h3 className="text-[24px] font-display text-ink mb-3 group-hover:text-action-blue transition-colors">
                {test.title}
              </h3>
              <p className="text-sm text-slate mb-10 line-clamp-2 leading-relaxed">
                {test.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between border-t border-hairline pt-8 mt-auto">
              <div className="flex gap-8">
                <div>
                  <p className="label-mono text-[9px] text-muted-slate mb-1 uppercase tracking-widest">Duration</p>
                  <p className="text-sm font-semibold">{test.durationMinutes}m</p>
                </div>
                <div>
                  <p className="label-mono text-[9px] text-muted-slate mb-1 uppercase tracking-widest">Nodes</p>
                  <p className="text-sm font-semibold">{test.totalQuestions}</p>
                </div>
                <div>
                  <p className="label-mono text-[9px] text-muted-slate mb-1 uppercase tracking-widest">Level</p>
                  <p className={`text-sm font-semibold ${
                    test.difficulty === 'Easy' ? 'text-enterprise-green' : 
                    test.difficulty === 'Medium' ? 'text-action-blue' : 'text-coral'
                  }`}>{test.difficulty}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" asChild className="rounded-full text-action-blue hover:text-action-blue hover:bg-action-blue/5">
                <Link href={`/admin/add-questions?testId=${test.id}`} className="gap-2">
                  Edit Bank <Plus className="w-3 h-3" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
