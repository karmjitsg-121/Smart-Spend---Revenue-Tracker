import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTransactionSchema, type InsertTransaction } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: InsertTransaction) => void;
}

const incomeCategories = [
  { value: "Sales", label: "Sales" },
  { value: "Services", label: "Services" },
  { value: "Investment", label: "Investment" },
  { value: "Other Income", label: "Other Income" },
];

const expenseCategories = [
  { value: "Utilities", label: "Utilities" },
  { value: "Salaries", label: "Salaries" },
  { value: "Marketing", label: "Marketing" },
  { value: "Office Supplies", label: "Office Supplies" },
  { value: "Rent", label: "Rent" },
  { value: "Other Expense", label: "Other Expense" },
];

export default function TransactionForm({ open, onOpenChange, onSubmit }: TransactionFormProps) {
  const [transactionType, setTransactionType] = useState<"income" | "expense">("income");

  const form = useForm<InsertTransaction>({
    resolver: zodResolver(insertTransactionSchema),
    defaultValues: {
      date: new Date(),
      amount: 0,
      type: "income",
      category: "",
      description: "",
    },
  });

  const handleSubmit = (data: InsertTransaction) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  const categories = transactionType === "income" ? incomeCategories : expenseCategories;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" data-testid="dialog-transaction-form">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          data-testid="button-date-picker"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setTransactionType(value as "income" | "expense");
                      form.setValue("category", "");
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger data-testid="select-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₹
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-7"
                        data-testid="input-amount"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter transaction details..."
                      className="resize-none"
                      data-testid="input-description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button type="submit" data-testid="button-submit">
                Add Transaction
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
