import { 
  transactions,
  categories,
  userPreferences,
  type Transaction, 
  type InsertTransaction,
  type Category,
  type InsertCategory,
  type UserPreferences,
  type InsertUserPreferences
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Transactions
  getTransactions(): Promise<Transaction[]>;
  getTransaction(id: string): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // User Preferences
  getPreferences(): Promise<UserPreferences | undefined>;
  updatePreferences(preferences: Partial<InsertUserPreferences>): Promise<UserPreferences>;
}

export class DatabaseStorage implements IStorage {
  // Transactions
  async getTransactions(): Promise<Transaction[]> {
    return await db.select().from(transactions);
  }

  async getTransaction(id: string): Promise<Transaction | undefined> {
    const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id));
    return transaction || undefined;
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const [transaction] = await db
      .insert(transactions)
      .values({
        ...insertTransaction,
        amount: insertTransaction.amount.toString(),
      })
      .returning();
    return transaction;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db
      .insert(categories)
      .values(insertCategory)
      .returning();
    return category;
  }

  // User Preferences
  async getPreferences(): Promise<UserPreferences | undefined> {
    const prefs = await db.select().from(userPreferences);
    if (prefs.length === 0) {
      // Create default preferences if none exist
      const [newPrefs] = await db
        .insert(userPreferences)
        .values({})
        .returning();
      return newPrefs;
    }
    return prefs[0];
  }

  async updatePreferences(updates: Partial<InsertUserPreferences>): Promise<UserPreferences> {
    const currentPrefs = await this.getPreferences();
    if (!currentPrefs) {
      throw new Error("Preferences not found");
    }
    
    const [updatedPrefs] = await db
      .update(userPreferences)
      .set(updates)
      .where(eq(userPreferences.id, currentPrefs.id))
      .returning();
    
    return updatedPrefs;
  }
}

export const storage = new DatabaseStorage();
