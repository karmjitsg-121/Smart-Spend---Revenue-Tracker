import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface MonthlyData {
  month: string;
  revenue: number;
  expenses: number;
}

interface RevenueChartProps {
  data: MonthlyData[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="month"
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
                formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                name="Revenue"
                dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                name="Expenses"
                dot={{ fill: "hsl(var(--chart-2))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
