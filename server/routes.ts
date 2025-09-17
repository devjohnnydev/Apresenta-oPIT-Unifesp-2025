import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPresentationSchema, slideDataSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all presentations
  app.get("/api/presentations", async (req, res) => {
    try {
      const presentations = await storage.getAllPresentations();
      res.json(presentations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch presentations" });
    }
  });

  // Get specific presentation
  app.get("/api/presentations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const presentation = await storage.getPresentation(id);
      
      if (!presentation) {
        return res.status(404).json({ message: "Presentation not found" });
      }
      
      res.json(presentation);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch presentation" });
    }
  });

  // Create new presentation
  app.post("/api/presentations", async (req, res) => {
    try {
      const validatedData = insertPresentationSchema.parse(req.body);
      const presentation = await storage.createPresentation(validatedData);
      res.status(201).json(presentation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create presentation" });
    }
  });

  // Update presentation
  app.put("/api/presentations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertPresentationSchema.partial().parse(req.body);
      
      const presentation = await storage.updatePresentation(id, validatedData);
      
      if (!presentation) {
        return res.status(404).json({ message: "Presentation not found" });
      }
      
      res.json(presentation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update presentation" });
    }
  });

  // Update slides
  app.put("/api/presentations/:id/slides", async (req, res) => {
    try {
      const { id } = req.params;
      const slides = z.array(slideDataSchema).parse(req.body);
      
      const presentation = await storage.updateSlides(id, slides);
      
      if (!presentation) {
        return res.status(404).json({ message: "Presentation not found" });
      }
      
      res.json(presentation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update slides" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
