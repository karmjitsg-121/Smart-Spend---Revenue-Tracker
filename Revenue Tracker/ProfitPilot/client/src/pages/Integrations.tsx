import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2Icon, 
  SmartphoneIcon, 
  CheckCircleIcon,
  LinkIcon,
  ShieldCheckIcon
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  connected: boolean;
  balance?: number;
}

interface UpiApp {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
}

export default function Integrations() {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedUpi, setSelectedUpi] = useState<string | null>(null);

  // todo: remove mock functionality - replace with real integration data
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    { id: "1", name: "State Bank of India", accountNumber: "****1234", connected: true, balance: 125430.50 },
    { id: "2", name: "HDFC Bank", accountNumber: "", connected: false },
    { id: "3", name: "ICICI Bank", accountNumber: "", connected: false },
    { id: "4", name: "Axis Bank", accountNumber: "", connected: false },
    { id: "5", name: "Kotak Mahindra Bank", accountNumber: "", connected: false },
    { id: "6", name: "Punjab National Bank", accountNumber: "", connected: false },
    { id: "7", name: "Bank of Baroda", accountNumber: "", connected: false },
    { id: "8", name: "Canara Bank", accountNumber: "", connected: false },
    { id: "9", name: "Other Bank", accountNumber: "", connected: false },
  ]);

  // todo: remove mock functionality - replace with real integration data
  const [upiApps, setUpiApps] = useState<UpiApp[]>([
    { id: "1", name: "Google Pay", icon: "💳", connected: true },
    { id: "2", name: "PhonePe", icon: "📱", connected: false },
    { id: "3", name: "Paytm", icon: "💰", connected: false },
    { id: "4", name: "Amazon Pay", icon: "🛒", connected: false },
    { id: "5", name: "BHIM UPI", icon: "🏦", connected: false },
    { id: "6", name: "WhatsApp Pay", icon: "💬", connected: false },
    { id: "7", name: "Mobikwik", icon: "📲", connected: false },
    { id: "8", name: "FreeCharge", icon: "⚡", connected: false },
    { id: "9", name: "Other UPI App", icon: "💸", connected: false },
  ]);

  const handleBankConnect = (bankId: string) => {
    setSelectedBank(bankId);
  };

  const handleUpiConnect = (upiId: string) => {
    setSelectedUpi(upiId);
  };

  const confirmBankConnection = () => {
    if (selectedBank) {
      // todo: remove mock functionality - implement real bank API integration
      const mockBalance = Math.floor(Math.random() * 500000) + 10000;
      setBankAccounts(prev =>
        prev.map(bank =>
          bank.id === selectedBank
            ? { 
                ...bank, 
                connected: true, 
                accountNumber: "****" + Math.floor(1000 + Math.random() * 9000),
                balance: mockBalance
              }
            : bank
        )
      );
      setSelectedBank(null);
      console.log("Bank connected:", selectedBank);
    }
  };

  const confirmUpiConnection = () => {
    if (selectedUpi) {
      // todo: remove mock functionality - implement real UPI API integration
      setUpiApps(prev =>
        prev.map(app =>
          app.id === selectedUpi ? { ...app, connected: true } : app
        )
      );
      setSelectedUpi(null);
      console.log("UPI app connected:", selectedUpi);
    }
  };

  const handleDisconnect = (type: "bank" | "upi", id: string) => {
    // todo: remove mock functionality - implement real disconnection
    if (type === "bank") {
      setBankAccounts(prev =>
        prev.map(bank =>
          bank.id === id ? { ...bank, connected: false, accountNumber: "", balance: undefined } : bank
        )
      );
    } else {
      setUpiApps(prev =>
        prev.map(app =>
          app.id === id ? { ...app, connected: false } : app
        )
      );
    }
    console.log(`${type} disconnected:`, id);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold" data-testid="text-page-title">Integrations</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Connect your bank accounts and payment apps to sync transactions automatically
        </p>
      </div>

      <div className="flex items-center gap-2 p-4 bg-accent/50 rounded-md border border-accent-border">
        <ShieldCheckIcon className="h-5 w-5 text-primary" />
        <p className="text-sm">
          Your financial data is encrypted and secure. We use bank-level security to protect your information.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2Icon className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Bank Accounts</CardTitle>
            </div>
            <CardDescription>
              Link your bank accounts to automatically import transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bankAccounts.map((bank) => (
                <Card key={bank.id} className="hover-elevate">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <Building2Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium" data-testid={`text-bank-name-${bank.id}`}>{bank.name}</p>
                          {bank.connected && (
                            <>
                              <p className="text-sm text-muted-foreground">{bank.accountNumber}</p>
                              {bank.balance !== undefined && (
                                <p className="text-sm font-semibold font-mono text-primary" data-testid={`text-bank-balance-${bank.id}`}>
                                  ₹{bank.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {bank.connected ? (
                          <>
                            <Badge variant="default" className="gap-1">
                              <CheckCircleIcon className="h-3 w-3" />
                              Connected
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDisconnect("bank", bank.id)}
                              data-testid={`button-disconnect-bank-${bank.id}`}
                            >
                              Disconnect
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleBankConnect(bank.id)}
                            data-testid={`button-connect-bank-${bank.id}`}
                          >
                            <LinkIcon className="h-4 w-4 mr-2" />
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <SmartphoneIcon className="h-5 w-5 text-muted-foreground" />
              <CardTitle>UPI Payment Apps</CardTitle>
            </div>
            <CardDescription>
              Connect your UPI apps to track digital transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upiApps.map((app) => (
                <Card key={app.id} className="hover-elevate">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-xl">
                          {app.icon}
                        </div>
                        <p className="font-medium" data-testid={`text-upi-name-${app.id}`}>{app.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {app.connected ? (
                          <>
                            <Badge variant="default" className="gap-1">
                              <CheckCircleIcon className="h-3 w-3" />
                              Connected
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDisconnect("upi", app.id)}
                              data-testid={`button-disconnect-upi-${app.id}`}
                            >
                              Disconnect
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpiConnect(app.id)}
                            data-testid={`button-connect-upi-${app.id}`}
                          >
                            <LinkIcon className="h-4 w-4 mr-2" />
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={selectedBank !== null} onOpenChange={() => setSelectedBank(null)}>
        <DialogContent data-testid="dialog-bank-connect">
          <DialogHeader>
            <DialogTitle>Connect Bank Account</DialogTitle>
            <DialogDescription>
              Enter your credentials to securely link your bank account
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username or Email</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                data-testid="input-bank-username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                data-testid="input-bank-password"
              />
            </div>
            <div className="flex items-start gap-2 p-3 bg-muted rounded-md">
              <ShieldCheckIcon className="h-4 w-4 text-primary mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Your credentials are encrypted and stored securely. We never share your banking information.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setSelectedBank(null)}
              data-testid="button-cancel-bank"
            >
              Cancel
            </Button>
            <Button onClick={confirmBankConnection} data-testid="button-confirm-bank">
              Connect Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedUpi !== null} onOpenChange={() => setSelectedUpi(null)}>
        <DialogContent data-testid="dialog-upi-connect">
          <DialogHeader>
            <DialogTitle>Connect UPI App</DialogTitle>
            <DialogDescription>
              Authorize access to sync your UPI transactions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="upi-id">UPI ID</Label>
              <Input
                id="upi-id"
                placeholder="yourname@upi"
                data-testid="input-upi-id"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="upi-pin">UPI PIN</Label>
              <Input
                id="upi-pin"
                type="password"
                placeholder="Enter your UPI PIN"
                maxLength={6}
                data-testid="input-upi-pin"
              />
            </div>
            <div className="flex items-start gap-2 p-3 bg-muted rounded-md">
              <ShieldCheckIcon className="h-4 w-4 text-primary mt-0.5" />
              <p className="text-xs text-muted-foreground">
                We use secure OAuth to access your transactions. Your UPI PIN is never stored.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setSelectedUpi(null)}
              data-testid="button-cancel-upi"
            >
              Cancel
            </Button>
            <Button onClick={confirmUpiConnection} data-testid="button-confirm-upi">
              Authorize Access
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
