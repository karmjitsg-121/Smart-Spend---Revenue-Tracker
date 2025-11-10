import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { SearchIcon, FilterIcon } from "lucide-react";
import type { Transaction } from "@shared/schema";

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesCategory = filterCategory === "all" || transaction.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const categories = Array.from(new Set(transactions.map((t) => t.category)));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
              data-testid="input-search"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-filter-type">
              <FilterIcon className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-filter-category">
              <FilterIcon className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} data-testid={`row-transaction-${transaction.id}`}>
                    <TableCell className="font-medium" data-testid={`text-date-${transaction.id}`}>
                      {format(new Date(transaction.date), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell data-testid={`text-description-${transaction.id}`}>
                      {transaction.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" data-testid={`badge-category-${transaction.id}`}>
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={transaction.type === "income" ? "default" : "outline"}
                        data-testid={`badge-type-${transaction.id}`}
                      >
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold" data-testid={`text-amount-${transaction.id}`}>
                      {transaction.type === "income" ? "+" : "-"}₹
                      {parseFloat(transaction.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
