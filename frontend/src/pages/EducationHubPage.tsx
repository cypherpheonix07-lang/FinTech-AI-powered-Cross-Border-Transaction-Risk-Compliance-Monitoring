import React, { useState } from 'react';
import { 
  BookOpen, 
  PlayCircle, 
  Trophy, 
  Search, 
  ChevronRight, 
  Star, 
  Clock, 
  TrendingUp, 
  GraduationCap,
  Sparkles,
  ArrowRight,
  BookMarked,
  Lightbulb,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  lessons: number;
  progress: number;
  image: string;
}

export default function EducationHubPage() {
  const courses: Course[] = [
    { id: '1', title: 'Mastering Compound Interest', category: 'Investing', duration: '45m', lessons: 8, progress: 100, image: 'bg-blue-600' },
    { id: '2', title: 'Crypto Fundamentals', category: 'Web3', duration: '1h 20m', lessons: 12, progress: 45, image: 'bg-indigo-600' },
    { id: '3', title: 'Corporate Tax Optimization', category: 'Finance', duration: '2h', lessons: 15, progress: 12, image: 'bg-emerald-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">PathGuard Academy</h1>
          <p className="text-slate-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-xl">Master your money with interactive courses and expert insights.</p>
        </div>
        <div className="relative w-full md:w-72">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
           <input 
             type="text" 
             placeholder="Search courses, terms..." 
             className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm font-bold"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Featured Course Hero */}
        <div className="lg:col-span-8 bg-blue-950 rounded-[4rem] text-white overflow-hidden relative group shadow-2xl shadow-blue-900/40">
           <div className="absolute inset-0 bg-blue-600/20 blur-[100px]" />
           <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1 space-y-6">
                 <span className="bg-blue-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Featured Course</span>
                 <h2 className="text-3xl md:text-5xl font-black leading-tight">Advanced Wealth <br /> Management v2.0</h2>
                 <p className="text-blue-200/60 font-medium text-lg max-w-md">Learn the strategies used by the top 1% to mitigate risk and maximize cross-border returns.</p>
                 <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                       <PlayCircle className="w-5 h-5 text-blue-400" />
                       <span className="text-sm font-bold">14 Video Lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Clock className="w-5 h-5 text-blue-400" />
                       <span className="text-sm font-bold">4.5 Hours</span>
                    </div>
                 </div>
                 <Button className="bg-white text-blue-950 hover:bg-blue-50 font-black rounded-2xl px-10 py-8 uppercase text-xs tracking-widest active:scale-95 transition-all">
                    Start Learning
                 </Button>
              </div>
              <div className="w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-700">
                 <GraduationCap className="w-24 h-24 text-blue-400 opacity-60" />
                 <div className="absolute -bottom-4 -right-4 bg-emerald-500 p-4 rounded-2xl shadow-xl shadow-emerald-500/20">
                    <Star className="w-6 h-6 text-white" />
                 </div>
              </div>
           </div>
        </div>

        {/* Learning Stats / Gamification Peek */}
        <div className="lg:col-span-4 bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm space-y-8">
           <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-amber-500" /> Your Progress
           </h3>
           
           <div className="space-y-6">
              {[
                { label: 'Courses Completed', val: '12', icon: BookMarked, color: 'text-blue-600' },
                { label: 'Achievements', val: '24', icon: Award, color: 'text-emerald-500' },
                { label: 'Knowledge XP', val: '12,400', icon: Sparkles, color: 'text-indigo-500' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                      <stat.icon className={cn("w-6 h-6", stat.color)} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
                      <p className="text-xl font-black text-slate-900 mt-1">{stat.val}</p>
                   </div>
                </div>
              ))}
           </div>

           <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Daily Goal</p>
              <div className="flex justify-between items-end mb-2">
                 <span className="text-xs font-bold text-blue-900">45 / 60 min</span>
                 <span className="text-[10px] font-black text-blue-400">75%</span>
              </div>
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-600 w-3/4 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
              </div>
           </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {courses.map((course) => (
           <div key={course.id} className="bg-white rounded-[3rem] border border-slate-200 shadow-sm hover:border-blue-200 transition-all group cursor-pointer overflow-hidden flex flex-col">
              <div className={cn("h-48 w-full relative flex items-center justify-center", course.image)}>
                 <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <PlayCircle className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 z-10" />
                 <BookOpen className="w-16 h-16 text-white/20 group-hover:scale-125 transition-transform duration-700" />
              </div>
              <div className="p-8 flex-1 space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[8px] font-black bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-widest text-slate-500">{course.category}</span>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                       <Clock className="w-3 h-3" /> {course.duration}
                    </div>
                 </div>
                 <h4 className="text-lg font-black text-slate-900 leading-snug">{course.title}</h4>
                 <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 pt-2">
                    <span>{course.lessons} Lessons</span>
                    <span className={cn(course.progress === 100 ? "text-emerald-500" : "text-blue-600")}>
                       {course.progress === 100 ? 'COMPLETED' : `${course.progress}% PROGRESS`}
                    </span>
                 </div>
                 <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className={cn("h-full transition-all duration-1000", course.progress === 100 ? "bg-emerald-500" : "bg-blue-600")} style={{ width: `${course.progress}%` }} />
                 </div>
              </div>
           </div>
         ))}
      </div>

      {/* Financial Glossary Search */}
      <div className="p-8 md:p-12 rounded-[4rem] bg-slate-50 border border-slate-200 shadow-inner flex flex-col md:flex-row gap-8 items-center">
         <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center shrink-0">
            <Lightbulb className="w-8 h-8 text-amber-500" />
         </div>
         <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-black text-slate-900 mb-1">Financial Glossary</h3>
            <p className="text-sm font-medium text-slate-500">Unsure about a term? Search our database of 5,000+ financial definitions.</p>
         </div>
         <Button variant="ghost" className="text-blue-600 font-black uppercase text-xs tracking-widest group">
            Open Glossary <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
         </Button>
      </div>
    </div>
  );
}
