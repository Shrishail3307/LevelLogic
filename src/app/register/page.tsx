"use client"

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerSchema, type RegisterFormData } from "@/lib/validators";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, UserPlus, Zap } from "lucide-react";

export default function UnifiedRegisterPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    // Mock registration - just login as student
    login(data.email, 'student');
    router.push('/student/dashboard');
  };

  return (
    <div className="flex min-h-screen bg-canvas font-sans selection:bg-stone">
      {/* Visual Panel */}
      <div className="hidden lg:flex w-[40%] bg-action-blue flex-col justify-between p-16 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-24">
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-xs">LL</span>
            </div>
            <span className="text-xl font-display tracking-tight text-white">LevelLogic</span>
          </div>
          
          <p className="label-mono text-white/60 mb-6">Join the Network</p>
          <h1 className="text-[56px] font-display leading-[1.0] mb-8 tracking-tight text-white">
            Begin your <br />cognitive <br />journey today.
          </h1>
          <p className="text-[18px] text-white/60 max-w-sm leading-relaxed">
            Create your profile to access high-fidelity logic assessments and track your mastery.
          </p>
        </div>

        <div className="relative z-10">
           <div className="flex items-center gap-4 p-4 bg-black/10 border border-white/20 rounded-xl backdrop-blur-md">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <Zap className="w-5 h-5 text-action-blue" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/60">Candidate Enrolment</p>
                <p className="text-sm font-medium">Global Registration Open</p>
              </div>
           </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-24 bg-canvas">
        <div className="w-full max-w-[400px] mx-auto my-auto">
          <div className="mb-12">
            <h2 className="text-[32px] font-display text-ink mb-2">Create Account</h2>
            <p className="text-slate leading-relaxed">Enter your details to register as a candidate.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="label-mono text-[11px] text-muted-slate uppercase tracking-wider">Full Name</Label>
              <Input
                id="name"
                className="h-14 bg-stone/30 border-hairline rounded-xl focus:ring-1 focus:ring-action-blue/20"
                placeholder="John Doe"
                {...register("name")}
              />
              {errors.name && <p className="text-[11px] font-medium text-coral mt-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="label-mono text-[11px] text-muted-slate uppercase tracking-wider">Email Address</Label>
              <Input
                id="email"
                type="email"
                className="h-14 bg-stone/30 border-hairline rounded-xl focus:ring-1 focus:ring-action-blue/20"
                placeholder="john@example.com"
                {...register("email")}
              />
              {errors.email && <p className="text-[11px] font-medium text-coral mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="label-mono text-[11px] text-muted-slate uppercase tracking-wider">Access Key (Password)</Label>
              <Input
                id="password"
                type="password"
                className="h-14 bg-stone/30 border-hairline rounded-xl focus:ring-1 focus:ring-action-blue/20"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && <p className="text-[11px] font-medium text-coral mt-1">{errors.password.message}</p>}
            </div>

            <Button type="submit" size="lg" className="w-full h-14 bg-near-black text-white hover:bg-cohere-black rounded-xl font-bold flex items-center justify-between px-8 group transition-all">
              Initialize Profile
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-hairline text-center">
            <p className="text-sm text-slate">
              Already have an account?{" "}
              <Link href="/login" className="text-action-blue font-bold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
