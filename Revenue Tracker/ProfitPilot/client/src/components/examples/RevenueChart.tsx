import RevenueChart from '../RevenueChart';

export default function RevenueChartExample() {
  const mockData = [
    { month: "Jan", revenue: 45000, expenses: 28000 },
    { month: "Feb", revenue: 52000, expenses: 31000 },
    { month: "Mar", revenue: 48000, expenses: 29500 },
    { month: "Apr", revenue: 61000, expenses: 33000 },
    { month: "May", revenue: 55000, expenses: 30000 },
    { month: "Jun", revenue: 67000, expenses: 35000 },
  ];

  return (
    <div className="p-6">
      <RevenueChart data={mockData} />
    </div>
  );
}
