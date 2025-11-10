import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { PlusIcon, TargetIcon, EditIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import MetricCard from "@/components/MetricCard";
import TransactionForm from "@/components/TransactionForm";
import type { Transaction, InsertTransaction, UserPreferences } from "@shared/schema";

export default function Dashboard() {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [goalInput, setGoalInput] = useState<string>("50000");

  // Fetch user preferences
  const { data: preferences } = useQuery<UserPreferences>({
    queryKey: ["/api/preferences"],
  });

  const monthlyRevenueGoal = preferences?.monthlyRevenueGoal 
    ? parseFloat(preferences.monthlyRevenueGoal) 
    : 50000;
  
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

  // todo: remove mock functionality - calculate from real data
  const totalRevenue = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const netProfit = totalRevenue - totalExpenses;

  // Calculate current month revenue
  const currentDate = new Date();
  const currentMonthRevenue = transactions
    .filter(t => {
      const transactionDate = new Date(t.date);
      return t.type === "income" && 
             transactionDate.getMonth() === currentDate.getMonth() &&
             transactionDate.getFullYear() === currentDate.getFullYear();
    })
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const goalProgress = monthlyRevenueGoal > 0 ? (currentMonthRevenue / monthlyRevenueGoal) * 100 : 0;
  const isOnTrack = goalProgress >= 50; // Simple heuristic

  const updateGoalMutation = useMutation({
    mutationFn: async (newGoal: number) => {
      const response = await fetch("/api/preferences", {
        method: "PATCH",
        body: JSON.stringify({ monthlyRevenueGoal: newGoal.toString() }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to update goal");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/preferences"] });
      setIsGoalDialogOpen(false);
      toast({
        title: "Goal Updated",
        description: "Your monthly revenue goal has been saved.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save goal. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSaveGoal = () => {
    const newGoal = parseFloat(goalInput);
    if (!isNaN(newGoal) && newGoal > 0) {
      updateGoalMutation.mutate(newGoal);
    }
  };

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
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Overview of your business finances
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} data-testid="button-add-transaction">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Total Revenue" value={totalRevenue} trend={12.5} type="revenue" />
        <MetricCard title="Total Expenses" value={totalExpenses} trend={-5.2} type="expense" />
        <MetricCard title="Net Profit" value={netProfit} trend={8.3} type="profit" />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <TargetIcon className="h-5 w-5 text-primary" />
            <CardTitle>Monthly Revenue Goal</CardTitle>
          </div>
          <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                variant="outline"
                data-testid="button-edit-goal"
                onClick={() => setGoalInput(monthlyRevenueGoal.toString())}
              >
                <EditIcon className="h-3 w-3 mr-1" />
                Edit Goal
              </Button>
            </DialogTrigger>
            <DialogContent data-testid="dialog-set-goal">
              <DialogHeader>
                <DialogTitle>Set Monthly Revenue Goal</DialogTitle>
                <DialogDescription>
                  Set your target monthly revenue to track your progress
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-amount">Goal Amount (₹)</Label>
                  <Input
                    id="goal-amount"
                    type="number"
                    placeholder="50000"
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    data-testid="input-goal-amount"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsGoalDialogOpen(false)} data-testid="button-cancel-goal">
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveGoal} 
                  disabled={updateGoalMutation.isPending}
                  data-testid="button-save-goal"
                >
                  {updateGoalMutation.isPending ? "Saving..." : "Save Goal"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Month</p>
              <p className="text-2xl font-semibold font-mono" data-testid="text-current-revenue">
                ₹{currentMonthRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Target</p>
              <p className="text-2xl font-semibold font-mono" data-testid="text-goal-amount">
                ₹{monthlyRevenueGoal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold" data-testid="text-goal-progress">
                {goalProgress.toFixed(1)}%
              </span>
            </div>
            <Progress value={Math.min(goalProgress, 100)} className="h-3" data-testid="progress-goal" />
          </div>

          {goalProgress >= 100 ? (
            <div className="bg-primary/10 border border-primary/20 rounded-md p-3">
              <p className="text-sm font-medium text-primary">
                🎉 Congratulations! You've achieved your monthly revenue goal!
              </p>
            </div>
          ) : isOnTrack ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-md p-3">
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                ✓ You're on track to meet your goal this month
              </p>
            </div>
          ) : (
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-md p-3">
              <p className="text-sm font-medium text-orange-700 dark:text-orange-400">
                ⚠ You need ₹{(monthlyRevenueGoal - currentMonthRevenue).toLocaleString('en-IN')} more to reach your goal
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <TransactionForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleAddTransaction}
      />
    </div>
  );
}
