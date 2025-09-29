"use client";
import { Skeleton } from "@/components/ui/skeleton";
export const HeroImageSkeleton = () => (
  <div className="w-full max-w-[550px] h-[400px] bg-gradient-to-br from-purple-900/20 to-slate-800/20 rounded-xl animate-pulse border border-purple-500/20" />
);

  export function GrowthChartSkeleton(){
    return (
        <Skeleton className="col-span-full w-1/2" />
    )
  }
  export function SidebarButtonSkeleton(){
    return (
     <Skeleton className="w-full h-12 rounded-xl fill-none" />
    )
  }

