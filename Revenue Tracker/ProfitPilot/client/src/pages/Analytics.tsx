import RevenueChart from "@/components/RevenueChart";
import ExpenseBreakdownChart from "@/components/ExpenseBreakdownChart";

export default function Analytics() {
  // todo: remove mock functionality - calculate from real data
  const monthlyData = [
    { month: "Jan", revenue: 8500, expenses: 4850 },
    { month: "Feb", revenue: 10400, expenses: 1500 },
    { month: "Mar", revenue: 7200, expenses: 3200 },
    { month: "Apr", revenue: 9800, expenses: 4100 },
    { month: "May", revenue: 11200, expenses: 5300 },
    { month: "Jun", revenue: 10100, expenses: 4200 },
  ];

  // todo: remove mock functionality - calculate from real data
  const expenseBreakdown = [
    { name: "Salaries", value: 2800 },
    { name: "Utilities", value: 1200 },
    { name: "Marketing", value: 850 },
    { name: "Office Supplies", value: 1500 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold" data-testid="text-page-title">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Visualize your financial trends and patterns
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={monthlyData} />
        <ExpenseBreakdownChart data={expenseBreakdown} />
      </div>
    </div>
  );
}
