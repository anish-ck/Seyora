"use client";
import React from "react";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "@/mock/mockComponent";
import { Area, AreaChart, Cell, LabelList, Pie, PieChart } from "recharts";
import {
  actualContryData,
  actualStateData,
  chartConfig,
  growthData,
  kpiData,
  StaetConfigData,
  touristConfigData,
} from "@/mock/mockData";
import { CheckCircle, Globe, TrendingUp, Users, Zap } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GrowthChartSkeleton } from "@/lib/suspenses";
const page = () => {
  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#3B82F6", "#EF4444"];
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-violet-950 to-black
">
        <div className="container mx-auto px-6 py-8 space-y-10">
          <div className="grid grid-cols-4 gap-6">
            <KPICard
              title="Active Tourists"
              value={kpiData.activeTourists.value}
              change={kpiData.activeTourists.change}
              trend={kpiData.activeTourists.trend}
              icon={Users}
            />
            <KPICard
              title="Total Joined"
              value={kpiData.totalTourists.value}
              change={kpiData.totalTourists.change}
              trend={kpiData.totalTourists.trend}
              icon={Globe}
            />
            <KPICard
              title="NFT Verifications"
              value={kpiData.nftVerifications.value}
              change={kpiData.nftVerifications.change}
              trend={kpiData.nftVerifications.trend}
              icon={CheckCircle}
            />
            <KPICard
              title="AI Alerts Sent"
              value={kpiData.aiAlerts.value}
              change={kpiData.aiAlerts.change}
              trend={kpiData.aiAlerts.trend}
              icon={Zap}
            />
          </div>
          <Suspense fallback={<GrowthChartSkeleton />}>
            <Card className="col-span-full border-border/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-web3-purple" />
                  <span>Platform Growth Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[330px] w-full"
                >
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="tourists" x1="0" y1="1" x2="0" y2="0">
                        <stop
                          offset="5%"
                          stopColor="#00FFFF"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#00FFFF"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="tourists"
                      stroke="#00FF00"
                      fillOpacity={1}
                      fill="url(#tourists)"
                      strokeWidth={2}
                    />
                    <Area dataKey="month" />
                    <Area
                      dataKey="nfts"
                      fill="none"
                      stroke="red"
                      strokeOpacity={0}
                      activeDot={false}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </Suspense>
          <div className="flex justify-between gap-5">
            <Suspense fallback={<GrowthChartSkeleton />}>
              <Card className="col-span-full w-1/2 border-border/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-web3-purple" />

                    <span>Foreign Tourist data</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={touristConfigData}
                    className="h-[230px] w-full"
                  >
                    <PieChart>
                      <ChartTooltip
                        content={<ChartTooltipContent nameKey="tourists" />}
                      />
                      <Pie data={actualContryData} dataKey="tourists">
                        {actualContryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                        <LabelList
                          dataKey="country"
                          className="font-normal"
                          fontSize={12}
                          fill="#fff"
                        />
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </Suspense>
            <Suspense fallback={<GrowthChartSkeleton />}>
              <Card className="col-span-full w-1/2 flex-1 border-border/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-web3-purple" />
                    <span>Tourist tour Data</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="">
                  <ChartContainer
                    config={StaetConfigData}
                    className="h-[230px] w-full"
                  >
                    <PieChart>
                      <ChartTooltip
                        content={<ChartTooltipContent nameKey="tourists" />}
                      />
                      <Pie data={actualStateData} dataKey="tourists">
                        {actualStateData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                        <LabelList
                          dataKey="state"
                          className="font-normal"
                          fontSize={12}
                          fill="#fff"
                        />
                      </Pie>
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
