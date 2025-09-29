import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Users } from "lucide-react";

export const KPICard = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  prefix = "",
  suffix = "",
}: any) => (
    <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/90 via-purple-600/70 to-black/90 border border-[#FFFDD0]/40 backdrop-blur-sm hover:shadow-[0_0_18px_rgba(168,85,247,0.6)] transition-all duration-300">
    <CardHeader className="flex items-center justify-between p-2 bg-[#FFFDD0]/25 rounded-none">
      <CardTitle className="text-sm font-bold items-center text-[#FFFDD0]">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-white" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-extrabold text-white drop-shadow-[0_1px_2px_rgba(255,253,208,0.5)]">
        {prefix}
        {typeof value === "number" && value > 1000
          ? value.toLocaleString()
          : value}
        {suffix}
      </div>
      <div className="flex items-center space-x-2 text-xs text-[#FFFDD0]/80">
        <Badge
          variant={trend === "up" ? "default" : "destructive"}
          className={trend === "up" ? "px-1 bg-green-600/80 text-white" : "px-1 bg-red-600/80 text-white"}
        >
          {change > 0 ? "+" : ""}
          {change}%
        </Badge>
        <span>vs last month</span>
      </div>
    </CardContent>
  </Card>
);

export const RealtimeCard = ({
  title,
  value,
  icon: Icon,
  status = "active",
  suffix = "",
}: any) => (
  <Card className="bg-gradient-card border-border/20 backdrop-blur-sm hover:shadow-card transition-all duration-300">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-web3-cyan" />
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-foreground">
            {value}
            {suffix}
          </span>
          {status === "active" && (
            <div className="w-2 h-2 bg-web3-neon rounded-full animate-glow-pulse"></div>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

export const AlertItem = ({ type, message, timestamp, severity }: any) => (
  <div
    className={`p-3 rounded-md border-l-4 ${
      severity === "high"
        ? "border-destructive bg-destructive/10"
        : severity === "medium"
        ? "border-web3-cyan bg-web3-cyan/10"
        : "border-web3-neon bg-web3-neon/10"
    } animate-fade-in`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <AlertTriangle
          className={`h-4 w-4 ${
            severity === "high"
              ? "text-destructive"
              : severity === "medium"
              ? "text-web3-cyan"
              : "text-web3-neon"
          }`}
        />
        <span className="text-sm font-medium text-foreground">{type}</span>
      </div>
      <span className="text-xs text-muted-foreground">{timestamp}</span>
    </div>
    <p className="text-sm text-muted-foreground mt-1">{message}</p>
  </div>
);

export const VerificationQueueItem = ({
  tourist,
  location,
  status,
  timestamp,
}: any) => (
  <div className="flex items-center justify-between p-3 rounded-md bg-card/50 border border-border/20 hover:bg-card/80 transition-colors">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
        <Users className="h-4 w-4 text-white" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{tourist}</p>
        <p className="text-xs text-muted-foreground">{location}</p>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <Badge variant={status === "pending" ? "secondary" : "default"}>
        {status}
      </Badge>
      <span className="text-xs text-muted-foreground">{timestamp}</span>
    </div>
  </div>
);
