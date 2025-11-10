import { useState } from "react";
import BankAccountSwitcher from '../BankAccountSwitcher';

export default function BankAccountSwitcherExample() {
  const [selectedAccountId, setSelectedAccountId] = useState("1");

  const mockAccounts = [
    { id: "1", name: "State Bank of India", accountNumber: "****1234", balance: 125430.50 },
    { id: "2", name: "HDFC Bank", accountNumber: "****5678", balance: 89250.00 },
    { id: "3", name: "ICICI Bank", accountNumber: "****9012", balance: 45680.75 },
  ];

  return (
    <div className="p-6">
      <BankAccountSwitcher
        accounts={mockAccounts}
        selectedAccountId={selectedAccountId}
        onAccountChange={(id) => {
          setSelectedAccountId(id);
          console.log("Switched to account:", id);
        }}
      />
    </div>
  );
}
