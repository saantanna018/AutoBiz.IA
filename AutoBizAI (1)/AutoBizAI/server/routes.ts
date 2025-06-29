import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertBusinessSchema, insertAnalyticsSchema, insertEmailCampaignSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid user data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  // Business routes
  app.get("/api/businesses", async (req: Request, res: Response) => {
    try {
      // For demo, use a fixed user ID of 1
      const businesses = await storage.getBusinessesByUserId(1);
      res.json(businesses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch businesses" });
    }
  });

  app.get("/api/businesses/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const business = await storage.getBusiness(id);
      if (!business) {
        return res.status(404).json({ error: "Business not found" });
      }
      res.json(business);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch business" });
    }
  });

  app.post("/api/businesses", async (req: Request, res: Response) => {
    try {
      const businessData = insertBusinessSchema.parse(req.body);
      // For demo, use a fixed user ID of 1
      const business = await storage.createBusiness({ ...businessData, userId: 1 });
      res.status(201).json(business);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid business data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create business" });
    }
  });

  app.put("/api/businesses/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const business = await storage.updateBusiness(id, updates);
      res.json(business);
    } catch (error) {
      res.status(500).json({ error: "Failed to update business" });
    }
  });

  app.delete("/api/businesses/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBusiness(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete business" });
    }
  });

  // Analytics routes
  app.get("/api/analytics/:businessId", async (req: Request, res: Response) => {
    try {
      const businessId = parseInt(req.params.businessId);
      const analytics = await storage.getAnalyticsByBusinessId(businessId);
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  app.post("/api/analytics", async (req: Request, res: Response) => {
    try {
      const analyticsData = insertAnalyticsSchema.parse(req.body);
      const analytics = await storage.createAnalytics(analyticsData);
      res.status(201).json(analytics);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid analytics data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create analytics" });
    }
  });

  // Email campaign routes
  app.get("/api/email-campaigns/:businessId", async (req: Request, res: Response) => {
    try {
      const businessId = parseInt(req.params.businessId);
      const campaigns = await storage.getEmailCampaignsByBusinessId(businessId);
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch email campaigns" });
    }
  });

  app.post("/api/email-campaigns", async (req: Request, res: Response) => {
    try {
      const campaignData = insertEmailCampaignSchema.parse(req.body);
      const campaign = await storage.createEmailCampaign(campaignData);
      res.status(201).json(campaign);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid campaign data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create email campaign" });
    }
  });

  app.put("/api/email-campaigns/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const campaign = await storage.updateEmailCampaign(id, updates);
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ error: "Failed to update email campaign" });
    }
  });

  // Demo data seeding route
  app.post("/api/seed-demo-data", async (req: Request, res: Response) => {
    try {
      // Create demo businesses
      const demoBusiness1 = await storage.createBusiness({
        userId: 1,
        name: "Newsletter de Marketing Digital",
        description: "Newsletter premium sobre estrategias de marketing digital",
        niche: "Marketing",
        status: "active",
        websiteUrl: "https://example.com/newsletter",
      });

      const demoBusiness2 = await storage.createBusiness({
        userId: 1,
        name: "Curso de Productividad",
        description: "Curso online para mejorar la productividad personal",
        niche: "Educación",
        status: "active",
        websiteUrl: "https://example.com/productividad",
      });

      // Create demo analytics
      const today = new Date();
      for (let i = 0; i < 30; i++) {
        const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        
        // Revenue analytics
        await storage.createAnalytics({
          businessId: demoBusiness1.id,
          metric: "revenue",
          value: (Math.random() * 200 + 50).toFixed(2),
        });

        await storage.createAnalytics({
          businessId: demoBusiness2.id,
          metric: "revenue",
          value: (Math.random() * 150 + 30).toFixed(2),
        });

        // Visitor analytics
        await storage.createAnalytics({
          businessId: demoBusiness1.id,
          metric: "visitors",
          value: (Math.floor(Math.random() * 100) + 20).toString(),
        });
      }

      // Create demo email campaigns
      const campaign1 = await storage.createEmailCampaign({
        businessId: demoBusiness1.id,
        name: "Bienvenida Nuevos Suscriptores",
        subject: "¡Bienvenido a nuestra comunidad!",
        content: "Gracias por suscribirte...",
        status: "sent",
      });

      const campaign2 = await storage.createEmailCampaign({
        businessId: demoBusiness1.id,
        name: "Newsletter Semanal",
        subject: "Estrategias de Marketing - Semana 12",
        content: "Esta semana hablamos de...",
        status: "sent",
      });

      // Note: Email campaign stats would be tracked separately in a real implementation

      res.json({ message: "Demo data created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to seed demo data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
