import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, TrendingDownIcon, DollarSignIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  trend?: number;
  type: "revenue" | "expense" | "profit";
}

export default function MetricCard({ title, value, trend, type }: MetricCardProps) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  const icons = {
    revenue: TrendingUpIcon,
    expense: TrendingDownIcon,
    profit: DollarSignIcon,
  };

  const Icon = icons[type];

  return (
    <Card data-testid={`card-metric-${type}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground" data-testid={`text-metric-title-${type}`}>
          {title}
        </p>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className="text-3xl font-bold font-mono" data-testid={`text-metric-value-${type}`}>
            ₹{value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          {trend !== undefined && (
            <div className="flex items-center gap-1 text-sm">
              {isPositive && <ArrowUpIcon className="h-4 w-4 text-primary" />}
              {isNegative && <ArrowDownIcon className="h-4 w-4 text-destructive" />}
              <span
                className={cn(
                  "font-medium",
                  isPositive && "text-primary",
                  isNegative && "text-destructive"
                )}
                data-testid={`text-metric-trend-${type}`}
              >
                {Math.abs(trend).toFixed(1)}%
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
