import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { BellIcon, SaveIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { UserPreferences } from "@shared/schema";

export default function Settings() {
  const { toast } = useToast();
  const [dailyEnabled, setDailyEnabled] = useState(false);
  const [dailyTime, setDailyTime] = useState("18:00");
  const [weekendEnabled, setWeekendEnabled] = useState(false);
  const [weekendTime, setWeekendTime] = useState("20:00");

  const { data: preferences, isLoading } = useQuery<UserPreferences>({
    queryKey: ["/api/preferences"],
  });

  useEffect(() => {
    if (preferences) {
      setDailyEnabled(preferences.dailyReminderEnabled);
      setDailyTime(preferences.dailyReminderTime);
      setWeekendEnabled(preferences.weekendReminderEnabled);
      setWeekendTime(preferences.weekendReminderTime);
    }
  }, [preferences]);

  const updatePreferencesMutation = useMutation({
    mutationFn: async (updates: Partial<UserPreferences>) => {
      const response = await fetch("/api/preferences", {
        method: "PATCH",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to update preferences");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/preferences"] });
      toast({
        title: "Settings Saved",
        description: "Your reminder preferences have been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    updatePreferencesMutation.mutate({
      dailyReminderEnabled: dailyEnabled,
      dailyReminderTime: dailyTime,
      weekendReminderEnabled: weekendEnabled,
      weekendReminderTime: weekendTime,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">Loading preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold" data-testid="text-page-title">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your notification preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BellIcon className="h-5 w-5 text-primary" />
            <CardTitle>Revenue Tracking Reminders</CardTitle>
          </div>
          <CardDescription>
            Get reminded to add your daily income and expenses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <Label htmlFor="daily-reminder" className="text-base font-medium">
                  Daily Reminder
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Get reminded at the end of each day to add your revenue
                </p>
              </div>
              <Switch
                id="daily-reminder"
                checked={dailyEnabled}
                onCheckedChange={setDailyEnabled}
                data-testid="switch-daily-reminder"
              />
            </div>

            {dailyEnabled && (
              <div className="ml-0 space-y-2">
                <Label htmlFor="daily-time">Reminder Time</Label>
                <Input
                  id="daily-time"
                  type="time"
                  value={dailyTime}
                  onChange={(e) => setDailyTime(e.target.value)}
                  className="max-w-xs"
                  data-testid="input-daily-time"
                />
              </div>
            )}
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <Label htmlFor="weekend-reminder" className="text-base font-medium">
                  Weekend Reminder
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Get reminded on weekends to review and add your transactions
                </p>
              </div>
              <Switch
                id="weekend-reminder"
                checked={weekendEnabled}
                onCheckedChange={setWeekendEnabled}
                data-testid="switch-weekend-reminder"
              />
            </div>

            {weekendEnabled && (
              <div className="ml-0 space-y-2">
                <Label htmlFor="weekend-time">Reminder Time</Label>
                <Input
                  id="weekend-time"
                  type="time"
                  value={weekendTime}
                  onChange={(e) => setWeekendTime(e.target.value)}
                  className="max-w-xs"
                  data-testid="input-weekend-time"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button 
              onClick={handleSave} 
              disabled={updatePreferencesMutation.isPending}
              data-testid="button-save-settings"
            >
              <SaveIcon className="h-4 w-4 mr-2" />
              {updatePreferencesMutation.isPending ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
