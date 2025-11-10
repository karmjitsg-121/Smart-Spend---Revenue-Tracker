import MetricCard from '../MetricCard';

export default function MetricCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <MetricCard title="Total Revenue" value={45890.50} trend={12.5} type="revenue" />
      <MetricCard title="Total Expenses" value={28340.75} trend={-5.2} type="expense" />
      <MetricCard title="Net Profit" value={17549.75} trend={8.3} type="profit" />
    </div>
  );
}
