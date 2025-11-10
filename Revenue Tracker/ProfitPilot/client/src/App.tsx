import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import BankAccountSwitcher from "@/components/BankAccountSwitcher";
import ReminderNotification from "@/components/ReminderNotification";
import Dashboard from "@/pages/Dashboard";
import Analytics from "@/pages/Analytics";
import Transactions from "@/pages/Transactions";
import Integrations from "@/pages/Integrations";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // todo: remove mock functionality - fetch from API/storage
  const [selectedAccountId, setSelectedAccountId] = useState("1");
  
  // todo: remove mock functionality - fetch from API/storage
  const connectedBankAccounts = [
    { id: "1", name: "State Bank of India", accountNumber: "****1234", balance: 125430.50 },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider>
          <ReminderNotification />
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between p-4 border-b gap-4">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <BankAccountSwitcher
                  accounts={connectedBankAccounts}
                  selectedAccountId={selectedAccountId}
                  onAccountChange={(id) => {
                    setSelectedAccountId(id);
                    console.log("Switched to account:", id);
                  }}
                />
              </header>
              <main className="flex-1 overflow-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <Router />
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
