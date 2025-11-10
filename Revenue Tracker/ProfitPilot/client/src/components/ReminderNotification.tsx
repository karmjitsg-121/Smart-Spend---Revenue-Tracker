import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { UserPreferences } from "@shared/schema";

const REMINDER_CHECK_INTERVAL = 60000; // Check every minute
const STORAGE_KEY = "lastReminderShown";

export default function ReminderNotification() {
  const { toast } = useToast();
  const [permissionGranted, setPermissionGranted] = useState(false);

  const { data: preferences } = useQuery<UserPreferences>({
    queryKey: ["/api/preferences"],
  });

  useEffect(() => {
    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        setPermissionGranted(permission === "granted");
      });
    } else if ("Notification" in window && Notification.permission === "granted") {
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    if (!preferences) return;

    const checkAndShowReminder = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday
      const isWeekend = currentDay === 0 || currentDay === 6;

      const lastShown = localStorage.getItem(STORAGE_KEY);
      const today = now.toDateString();

      // Don't show multiple reminders on the same day
      if (lastShown === today) return;

      let shouldShowReminder = false;
      let reminderMessage = "";

      // Check daily reminder (weekdays only)
      if (!isWeekend && preferences.dailyReminderEnabled && currentTime === preferences.dailyReminderTime) {
        shouldShowReminder = true;
        reminderMessage = "Time to add today's revenue and expenses!";
      }

      // Check weekend reminder
      if (isWeekend && preferences.weekendReminderEnabled && currentTime === preferences.weekendReminderTime) {
        shouldShowReminder = true;
        reminderMessage = "Weekend reminder: Don't forget to review and add your transactions!";
      }

      if (shouldShowReminder) {
        // Show toast notification
        toast({
          title: "Revenue Tracker Reminder",
          description: reminderMessage,
          duration: 10000,
        });

        // Show browser notification if permitted
        if (permissionGranted && "Notification" in window) {
          new Notification("Revenue Tracker Reminder", {
            body: reminderMessage,
            icon: "/favicon.ico",
            badge: "/favicon.ico",
          });
        }

        // Mark that we showed a reminder today
        localStorage.setItem(STORAGE_KEY, today);
      }
    };

    // Check immediately
    checkAndShowReminder();

    // Then check every minute
    const interval = setInterval(checkAndShowReminder, REMINDER_CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [preferences, toast, permissionGranted]);

  return null;
}
