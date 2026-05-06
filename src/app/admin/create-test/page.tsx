"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTestSchema, type CreateTestFormData } from "@/lib/validators";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CheckCircle2, Layout, ArrowRight, Zap, Globe, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDataStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function AdminCreateTestPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { addTest } = useDataStore();
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.input<typeof createTestSchema>, any, CreateTestFormData>({
    resolver: zodResolver(createTestSchema),
    defaultValues: {
      difficulty: "Medium",
      durationMinutes: 30,
      totalQuestions: 20,
      passPercentage: 60,
    },
  });

  const onSubmit = (data: CreateTestFormData) => {
    const newTest = {
      id: "test_" + Math.random().toString(36).substr(2, 5),
      ...data,
      durationMinutes: Number(data.durationMinutes),
      totalQuestions: Number(data.totalQuestions),
      passPercentage: Number(data.passPercentage),
    };
    
    addTest(newTest as any);
    setIsSuccess(true);
    reset();
    setTimeout(() => {
      setIsSuccess(false);
      router.push("/admin/dashboard");
    }, 2000);
  };

  return (
    <div className="space-y-12 max-w-3xl mx-auto pb-24">
      {/* Editorial Header */}
      <div className="border-b border-hairline pb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-stone flex items-center justify-center">
            <Layout className="w-5 h-5 text-ink" />
          </div>
          <p className="label-mono text-enterprise-green uppercase tracking-widest text-[10px]">Module Architect</p>
        </div>
        <h1 className="text-[40px] font-display text-ink leading-tight tracking-tight">Deploy New Assessment</h1>
        <p className="text-slate text-[16px] max-w-2xl mt-2">
          Configure the structural parameters for a new logical evaluation module. Ensure difficulty vectors align with candidate profiles.
        </p>
      </div>

      {isSuccess && (
        <div className="flex items-center gap-4 p-6 bg-enterprise-green/5 border border-enterprise-green/20 rounded-2xl text-enterprise-green animate-in fade-in slide-in-from-top-4 duration-500">
          <CheckCircle2 className="w-6 h-6" />
          <div className="flex-1">
            <p className="font-bold text-sm">Deployment Successful</p>
            <p className="text-[13px] opacity-80">Test module has been integrated into the global repository.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <div className="grid grid-cols-1 gap-8">
          {/* Identity Section */}
          <section className="space-y-6">
            <h2 className="label-mono text-[11px] text-muted-slate uppercase tracking-[0.2em] border-b border-hairline pb-4">01 — Identity</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-bold text-ink uppercase tracking-wider">Module Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. ADVANCED QUANTUM LOGIC"
                  className="h-14 bg-canvas border-hairline rounded-xl focus:ring-1 focus:ring-enterprise-green/20"
                  {...register("title")}
                />
                {errors.title && <p className="text-[11px] font-medium text-coral mt-1">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-xs font-bold text-ink uppercase tracking-wider">Operational Subject</Label>
                <Controller
                  control={control}
                  name="subject"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger id="subject" className="h-14 bg-canvas border-hairline rounded-xl">
                        <SelectValue placeholder="Select vector" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-hairline shadow-lg">
                        <SelectItem value="Quantitative Aptitude">Quantitative Aptitude</SelectItem>
                        <SelectItem value="Logical Reasoning">Logical Reasoning</SelectItem>
                        <SelectItem value="Technical Skills">Technical Skills</SelectItem>
                        <SelectItem value="Verbal English">Verbal English</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </section>

          {/* Configuration Section */}
          <section className="space-y-6">
            <h2 className="label-mono text-[11px] text-muted-slate uppercase tracking-[0.2em] border-b border-hairline pb-4">02 — Parameters</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="durationMinutes" className="text-xs font-bold text-ink uppercase tracking-wider">Duration (MINS)</Label>
                <Input
                  id="durationMinutes"
                  type="number"
                  className="h-14 bg-canvas border-hairline rounded-xl"
                  {...register("durationMinutes")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalQuestions" className="text-xs font-bold text-ink uppercase tracking-wider">Questions</Label>
                <Input
                  id="totalQuestions"
                  type="number"
                  className="h-14 bg-canvas border-hairline rounded-xl"
                  {...register("totalQuestions")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passPercentage" className="text-xs font-bold text-ink uppercase tracking-wider">Threshold (%)</Label>
                <Input
                  id="passPercentage"
                  type="number"
                  className="h-14 bg-canvas border-hairline rounded-xl"
                  {...register("passPercentage")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty" className="text-xs font-bold text-ink uppercase tracking-wider">Complexity</Label>
                <Controller
                  control={control}
                  name="difficulty"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger id="difficulty" className="h-14 bg-canvas border-hairline rounded-xl">
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-hairline shadow-lg">
                        <SelectItem value="Easy">Standard</SelectItem>
                        <SelectItem value="Medium">Advanced</SelectItem>
                        <SelectItem value="Hard">Elite</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </section>

          {/* Context Section */}
          <section className="space-y-6">
            <h2 className="label-mono text-[11px] text-muted-slate uppercase tracking-[0.2em] border-b border-hairline pb-4">03 — Context</h2>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-xs font-bold text-ink uppercase tracking-wider">Operational Overview</Label>
              <Textarea
                id="description"
                rows={4}
                className="bg-canvas border-hairline rounded-xl focus:ring-1 focus:ring-enterprise-green/20 resize-none p-4"
                placeholder="Detail the cognitive objectives for this module..."
                {...register("description")}
              />
              {errors.description && <p className="text-[11px] font-medium text-coral mt-1">{errors.description.message}</p>}
            </div>
          </section>
        </div>

        <Button type="submit" size="lg" className="w-full h-16 rounded-xl bg-near-black text-white hover:bg-cohere-black font-bold flex items-center justify-between px-8 group transition-all">
          <span className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-enterprise-green" />
            Initialize Deployment
          </span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </Button>
      </form>
    </div>
  );
}
