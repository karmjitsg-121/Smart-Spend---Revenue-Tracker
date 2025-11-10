import { useState } from "react";
import TransactionForm from '../TransactionForm';
import { Button } from "@/components/ui/button";
import type { InsertTransaction } from "@shared/schema";

export default function TransactionFormExample() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: InsertTransaction) => {
    console.log('Transaction submitted:', data);
  };

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Transaction Form</Button>
      <TransactionForm open={open} onOpenChange={setOpen} onSubmit={handleSubmit} />
    </div>
  );
}
