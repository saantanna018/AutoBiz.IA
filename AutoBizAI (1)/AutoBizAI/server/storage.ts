import { 
  users, businesses, analytics, emailCampaigns,
  type User, type InsertUser, type Business, type InsertBusiness,
  type Analytics, type InsertAnalytics, type EmailCampaign, type InsertEmailCampaign
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Business methods
  getBusinessesByUserId(userId: number): Promise<Business[]>;
  getBusiness(id: number): Promise<Business | undefined>;
  createBusiness(business: InsertBusiness & { userId: number }): Promise<Business>;
  updateBusiness(id: number, business: Partial<Business>): Promise<Business>;
  deleteBusiness(id: number): Promise<void>;
  
  // Analytics methods
  getAnalyticsByBusinessId(businessId: number): Promise<Analytics[]>;
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  
  // Email campaign methods
  getEmailCampaignsByBusinessId(businessId: number): Promise<EmailCampaign[]>;
  createEmailCampaign(campaign: InsertEmailCampaign): Promise<EmailCampaign>;
  updateEmailCampaign(id: number, campaign: Partial<EmailCampaign>): Promise<EmailCampaign>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const { db } = await import("./db");
    const { users } = await import("@shared/schema");
    const { eq } = await import("drizzle-orm");
    
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { db } = await import("./db");
    const { users } = await import("@shared/schema");
    const { eq } = await import("drizzle-orm");
    
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { db } = await import("./db");
    const { users } = await import("@shared/schema");
    
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Business methods
  async getBusinessesByUserId(userId: number): Promise<Business[]> {
    const { db } = await import("./db");
    const { businesses } = await import("@shared/schema");
    const { eq } = await import("drizzle-orm");
    
    return await db.select().from(businesses).where(eq(businesses.userId, userId));
  }

  async getBusiness(id: number): Promise<Business | undefined> {
    const { db } = await import("./db");
    const { businesses } = await import("@shared/schema");
    const { eq } = await import("drizzle-orm");
    
    const [business] = await db.select().from(businesses).where(eq(businesses.id, id));
    return business || undefined;
  }

  async createBusiness(business: InsertBusiness & { userId: number }): Promise<Business> {
    const { db } = await import("./db");
    const { businesses } = await import("@shared/schema");
    
    const [newBusiness] = await db
      .insert(businesses)
      .values(business)
      .returning();
    return newBusiness;
  }

  async updateBusiness(id: number, business: Partial<Business>): Promise<Business> {
    const { db } = await import("./db");
    const { businesses } = await import("@shared/schema");
    const { eq } = await import("drizzle-orm");
    
    const [updatedBusiness] = await db
      .update(businesses)
      .set({ ...business, updatedAt: new Date() })
      .where(eq(businesses.id, id))
      .returning();
    return updatedBusiness;
  }

  async deleteBusiness(id: number): Promise<void> {
    const { db } = await import("./db");
    const { businesses } = await import("@shared/schema");
    const { eq } = await import("drizzle-orm");
    
    await db.delete(businesses).where(eq(businesses.id, id));
  }

  // Analytics methods
  async getAnalyticsByBusinessId(businessId: number): Promise<Analytics[]> {
    const { db } = await import("./db");
    const { analytics } = await import("@shared/schema");
    const { eq, desc } = await import("drizzle-orm");
    
    return await db.select().from(analytics)
      .where(eq(analytics.businessId, businessId))
      .orderBy(desc(analytics.date));
  }

  async createAnalytics(analyticsData: InsertAnalytics): Promise<Analytics> {
    const { db } = await import("./db");
    const { analytics } = await import("@shared/schema");
    
    const [newAnalytics] = await db
      .insert(analytics)
      .values(analyticsData)
      .returning();
    return newAnalytics;
  }

  // Email campaign methods
  async getEmailCampaignsByBusinessId(businessId: number): Promise<EmailCampaign[]> {
    const { db } = await import("./db");
    const { emailCampaigns } = await import("@shared/schema");
    const { eq, desc } = await import("drizzle-orm");
    
    return await db.select().from(emailCampaigns)
      .where(eq(emailCampaigns.businessId, businessId))
      .orderBy(desc(emailCampaigns.createdAt));
  }

  async createEmailCampaign(campaign: InsertEmailCampaign): Promise<EmailCampaign> {
    const { db } = await import("./db");
    const { emailCampaigns } = await import("@shared/schema");
    
    const [newCampaign] = await db
      .insert(emailCampaigns)
      .values(campaign)
      .returning();
    return newCampaign;
  }

  async updateEmailCampaign(id: number, campaign: Partial<EmailCampaign>): Promise<EmailCampaign> {
    const { db } = await import("./db");
    const { emailCampaigns } = await import("@shared/schema");
    const { eq } = await import("drizzle-orm");
    
    const [updatedCampaign] = await db
      .update(emailCampaigns)
      .set(campaign)
      .where(eq(emailCampaigns.id, id))
      .returning();
    return updatedCampaign;
  }
}

export const storage = new DatabaseStorage();
