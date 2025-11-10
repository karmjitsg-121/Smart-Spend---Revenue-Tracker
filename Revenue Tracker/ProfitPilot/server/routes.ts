import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransactionSchema, insertUserPreferencesSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Transactions
  app.get("/api/transactions", async (req, res) => {
    try {
      const transactions = await storage.getTransactions();
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const parsed = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(parsed);
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ error: "Invalid transaction data" });
    }
  });

  // User Preferences
  app.get("/api/preferences", async (req, res) => {
    try {
      const preferences = await storage.getPreferences();
      res.json(preferences);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch preferences" });
    }
  });

  app.patch("/api/preferences", async (req, res) => {
    try {
      const parsed = insertUserPreferencesSchema.partial().parse(req.body);
      const preferences = await storage.updatePreferences(parsed);
      res.json(preferences);
    } catch (error) {
      res.status(400).json({ error: "Invalid preferences data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
