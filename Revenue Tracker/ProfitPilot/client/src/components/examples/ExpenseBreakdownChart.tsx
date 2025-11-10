import ExpenseBreakdownChart from '../ExpenseBreakdownChart';

export default function ExpenseBreakdownChartExample() {
  const mockData = [
    { name: "Salaries", value: 12000 },
    { name: "Utilities", value: 3500 },
    { name: "Marketing", value: 5000 },
    { name: "Rent", value: 4500 },
    { name: "Other", value: 3000 },
  ];

  return (
    <div className="p-6">
      <ExpenseBreakdownChart data={mockData} />
    </div>
  );
}
