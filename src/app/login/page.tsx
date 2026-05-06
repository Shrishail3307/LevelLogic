"use client"

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema, type LoginFormData } from "@/lib/validators";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, Shield, User, ArrowRight, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function UnifiedLoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [role, setRole] = useState<'student' | 'admin'>('student');
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    // Basic auto-detection if email contains 'admin'
    const detectedRole = data.email.includes('admin') ? 'admin' : role;
    const success = login(data.email, detectedRole);
    
    if (success) {
      router.push(detectedRole === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    } else {
      alert(`Invalid credentials. For admin try 'admin@aptitude.in'. For student try any valid email.`);
    }
  };

  return (
    <div className="flex min-h-screen bg-canvas font-sans selection:bg-stone">
      {/* Visual Panel */}
      <div className="hidden lg:flex w-[40%] bg-near-black flex-col justify-between p-16 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-24">
            <div className="w-8 h-8 bg-action-blue rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xs">LL</span>
            </div>
            <span className="text-xl font-display tracking-tight">LevelLogic</span>
          </div>
          
          <p className="label-mono text-action-blue mb-6">Cognitive Command</p>
          <h1 className="text-[56px] font-display leading-[1.0] mb-8 tracking-tight">
            The standard <br />for logical <br />benchmarking.
          </h1>
          <p className="text-[18px] text-white/50 max-w-sm leading-relaxed">
            Unified access portal for candidates and administrators. Enterprise-grade assessment infrastructure.
          </p>
        </div>

        <div className="relative z-10">
           <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-action-blue flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/40">System Status</p>
                <p className="text-sm font-medium">All Nodes Operational</p>
              </div>
           </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-24 bg-canvas">
        <div className="w-full max-w-[400px] mx-auto my-auto">
          <div className="mb-12">
            <h2 className="text-[32px] font-display text-ink mb-2">Portal Access</h2>
            <p className="text-slate leading-relaxed">Select your access level and enter credentials.</p>
          </div>

          {/* Role Selector */}
          <div className="flex p-1 bg-stone rounded-2xl mb-10">
            <button 
              onClick={() => setRole('student')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
                role === 'student' ? "bg-white text-ink shadow-sm" : "text-muted-slate hover:text-ink"
              )}
            >
              <User className="w-4 h-4" />
              Candidate
            </button>
            <button 
              onClick={() => setRole('admin')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
                role === 'admin' ? "bg-near-black text-white shadow-sm" : "text-muted-slate hover:text-ink"
              )}
            >
              <Shield className="w-4 h-4" />
              Administrator
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="label-mono text-[11px] text-muted-slate uppercase tracking-wider">Identification</Label>
              <Input
                id="email"
                type="email"
                className="h-14 bg-stone/30 border-hairline rounded-xl focus:ring-1 focus:ring-action-blue/20"
                placeholder="email@example.com"
                {...register("email")}
              />
              {errors.email && <p className="text-[11px] font-medium text-coral mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="label-mono text-[11px] text-muted-slate uppercase tracking-wider">Access Key</Label>
              </div>
              <Input
                id="password"
                type="password"
                className="h-14 bg-stone/30 border-hairline rounded-xl focus:ring-1 focus:ring-action-blue/20"
                placeholder="••••••••"
                {...register("password")}
              />
            </div>

            <Button type="submit" size="lg" className={cn(
              "w-full h-14 rounded-xl font-bold flex items-center justify-between px-8 group transition-all",
              role === 'admin' ? "bg-near-black text-white hover:bg-cohere-black" : "bg-action-blue text-white hover:bg-action-blue/90"
            )}>
              Authorize Session
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-hairline text-center">
            <p className="text-sm text-slate">
              New to LevelLogic?{" "}
              <Link href="/register" className="text-action-blue font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
