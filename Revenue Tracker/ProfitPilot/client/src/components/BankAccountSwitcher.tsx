import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2Icon } from "lucide-react";

interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  balance?: number;
}

interface BankAccountSwitcherProps {
  accounts: BankAccount[];
  selectedAccountId?: string;
  onAccountChange: (accountId: string) => void;
}

export default function BankAccountSwitcher({
  accounts,
  selectedAccountId,
  onAccountChange,
}: BankAccountSwitcherProps) {
  const connectedAccounts = accounts.filter(acc => acc.accountNumber);
  
  if (connectedAccounts.length === 0) {
    return null;
  }

  const selectedAccount = connectedAccounts.find(acc => acc.id === selectedAccountId) || connectedAccounts[0];

  return (
    <div className="flex items-center gap-2">
      <Building2Icon className="h-4 w-4 text-muted-foreground" />
      <Select
        value={selectedAccountId || connectedAccounts[0]?.id}
        onValueChange={onAccountChange}
      >
        <SelectTrigger className="w-[280px]" data-testid="select-bank-account">
          <SelectValue>
            <div className="flex items-center justify-between w-full">
              <span className="truncate">{selectedAccount?.name}</span>
              {selectedAccount?.balance !== undefined && (
                <span className="font-mono text-sm ml-2">
                  ₹{selectedAccount.balance.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              )}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {connectedAccounts.map((account) => (
            <SelectItem key={account.id} value={account.id}>
              <div className="flex items-center justify-between w-full gap-4">
                <div className="flex flex-col items-start">
                  <span className="font-medium">{account.name}</span>
                  <span className="text-xs text-muted-foreground">{account.accountNumber}</span>
                </div>
                {account.balance !== undefined && (
                  <span className="font-mono text-sm">
                    ₹{account.balance.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
