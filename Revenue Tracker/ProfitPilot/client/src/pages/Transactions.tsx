import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import TransactionTable from "@/components/TransactionTable";
import TransactionForm from "@/components/TransactionForm";
import type { Transaction, InsertTransaction } from "@shared/schema";

export default function Transactions() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // todo: remove mock functionality - replace with real data from API
  const [transactions, setTransactions] = useState<Transaction[]>([
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
    {
      id: "6",
      date: new Date("2024-02-05"),
      amount: "6200.00",
      type: "income",
      category: "Sales",
      description: "Product sales - February batch"
    },
    {
      id: "7",
      date: new Date("2024-02-10"),
      amount: "1500.00",
      type: "expense",
      category: "Office Supplies",
      description: "Office furniture and supplies"
    },
    {
      id: "8",
      date: new Date("2024-02-15"),
      amount: "4200.00",
      type: "income",
      category: "Services",
      description: "Web development project"
    },
  ]);

  const handleAddTransaction = (data: InsertTransaction) => {
    // todo: remove mock functionality - replace with API call
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: data.date,
      amount: data.amount.toString(),
      type: data.type,
      category: data.category,
      description: data.description,
    };
    setTransactions([newTransaction, ...transactions]);
    console.log("Transaction added:", newTransaction);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">Transaction History</h1>
          <p className="text-muted-foreground text-sm mt-1">
            View and manage all your transactions
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} data-testid="button-add-transaction">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      <TransactionTable transactions={transactions} />

      <TransactionForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleAddTransaction}
      />
    </div>
  );
}
