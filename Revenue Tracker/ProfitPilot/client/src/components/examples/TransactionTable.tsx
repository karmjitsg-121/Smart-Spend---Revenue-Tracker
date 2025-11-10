import TransactionTable from '../TransactionTable';
import type { Transaction } from "@shared/schema";

export default function TransactionTableExample() {
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      date: new Date("2024-01-15"),
      amount: "5000.00",
      type: "income",
      category: "Sales",
      description: "Product sales - January batch"
    },
    {
      id: "2",
      date: new Date("2024-01-20"),
      amount: "1200.00",
      type: "expense",
      category: "Utilities",
      description: "Monthly electricity and water"
    },
    {
      id: "3",
      date: new Date("2024-01-22"),
      amount: "3500.00",
      type: "income",
      category: "Services",
      description: "Consulting services for client A"
    },
    {
      id: "4",
      date: new Date("2024-01-25"),
      amount: "2800.00",
      type: "expense",
      category: "Salaries",
      description: "Staff salaries - January"
    },
    {
      id: "5",
      date: new Date("2024-01-28"),
      amount: "850.00",
      type: "expense",
      category: "Marketing",
      description: "Social media advertising campaign"
    },
  ];

  return (
    <div className="p-6">
      <TransactionTable transactions={mockTransactions} />
    </div>
  );
}
