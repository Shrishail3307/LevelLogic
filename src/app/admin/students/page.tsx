"use client";

import { useDataStore } from "@/lib/store";
import { User } from "@/lib/mock-data";
import { 
  Users, 
  Mail, 
  Calendar, 
  Trash2, 
  Search,
  MoreVertical,
  Filter
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

export default function AdminStudentsPage() {
  const { students, deleteStudent } = useDataStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="border-b border-hairline pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-stone flex items-center justify-center">
            <Users className="w-5 h-5 text-ink" />
          </div>
          <p className="label-mono text-action-blue uppercase tracking-widest text-[10px]">User Management</p>
        </div>
        <h1 className="text-[40px] font-display text-ink leading-tight tracking-tight">Active Students</h1>
        <p className="text-slate text-[16px] max-w-2xl mt-2">
          Monitor student engagement, manage access permissions, and analyze individual performance metrics across the platform.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-slate" />
          <Input 
            placeholder="Search by name or email..." 
            className="pl-10 h-11 bg-canvas border-hairline rounded-xl focus:ring-1 focus:ring-action-blue/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="gap-2 h-11 border-hairline bg-canvas">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button className="h-11 bg-near-black text-white hover:bg-cohere-black px-6">
            Export Records
          </Button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-canvas border border-hairline rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone/30 border-b border-hairline">
                <th className="px-8 py-5 text-[11px] font-semibold uppercase tracking-widest text-muted-slate">Student Profile</th>
                <th className="px-8 py-5 text-[11px] font-semibold uppercase tracking-widest text-muted-slate">Status</th>
                <th className="px-8 py-5 text-[11px] font-semibold uppercase tracking-widest text-muted-slate">Registration Date</th>
                <th className="px-8 py-5 text-[11px] font-semibold uppercase tracking-widest text-muted-slate text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {filteredStudents.map((student) => {
                const initials = student.name.split(" ").map(n => n[0]).join("").toUpperCase();
                return (
                  <tr key={student.id} className="group hover:bg-stone/10 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border border-hairline">
                          <AvatarFallback className="bg-stone text-ink text-xs font-bold">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold text-ink leading-tight group-hover:text-action-blue transition-colors">{student.name}</span>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Mail className="w-3 h-3 text-muted-slate" />
                            <span className="text-[13px] text-muted-slate">{student.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-enterprise-green/10 text-enterprise-green border border-enterprise-green/20">
                        Active
                      </span>
                    </td>
                    <td className="px-8 py-6 text-[14px] text-slate font-mono">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-slate" />
                        May 01, 2024
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-stone">
                            <MoreVertical className="w-4 h-4 text-muted-slate" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-xl border-hairline shadow-lg">
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                             View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                             Edit Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="gap-2 cursor-pointer text-error-red focus:bg-error-red/5"
                            onClick={() => deleteStudent(student.id)}
                          >
                            <Trash2 className="w-4 h-4" /> Remove Student
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <p className="text-muted-slate">No students found matching your criteria.</p>
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
