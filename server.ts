import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please add it to your Secrets in Settings.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Brand Perception Oracle Diagnosis
  app.post("/api/oracle/diagnose", async (req, res) => {
    try {
      const { businessName, industry, currentStatus, biggestGap, targetAspiration } = req.body;

      if (!businessName || !industry || !currentStatus || !biggestGap || !targetAspiration) {
        res.status(400).json({ error: "Missing required fields for brand diagnostic." });
        return;
      }

      const ai = getAiClient();
      
      const prompt = `
        You are the Ancient Greek Oracle of Perception for KLEOS, a ultra-luxury digital brand positioning agency.
        Diagnose the digital value-perception discrepancy of the following business:
        
        Business Name: ${businessName}
        Industry/Niche: ${industry}
        Current Perception State (Value Output vs Visual Presence): ${currentStatus}
        Their Biggest Perception Gap: ${biggestGap}
        Target Brand Aspiration: ${targetAspiration}

        Your narrative tone must be deeply cinematic, philosophical, authoritative, and sophisticated.
        Explain that the problem isn't the quality of their service, but rather how their digital presence fails to demand high-ticket authority.
        Deliver a highly structured response in perfect Spanish.
      `;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          authorityScore: {
            type: Type.INTEGER,
            description: "A calculated digital perception or perception-authority score between 1 and 100 based on their pain points.",
          },
          diagnosisTitle: {
            type: Type.STRING,
            description: "A profound, poetic, short title for their current perception state (e.g. 'La Paradoja de la Invisibilidad Dorada').",
          },
          narrativeIntroduction: {
            type: Type.STRING,
            description: "A philosophical introduction (2-3 sentences) showing that elite value is invisible without premium perception.",
          },
          coreGaps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Three profound perception gaps written in poetic yet clear corporate luxury tone.",
          },
          transformationStrategy: {
            type: Type.STRING,
            description: "A 3-step elite digital ascension path or strategy suggested by KLEOS to rewrite their authority.",
          },
          proposedConcept: {
            type: Type.STRING,
            description: "A suggested ultra-premium positioning concept or slogan for them (e.g. 'KLEOS - El Silencio Autoritario').",
          }
        },
        required: ["authorityScore", "diagnosisTitle", "narrativeIntroduction", "coreGaps", "transformationStrategy", "proposedConcept"]
      };

      const result = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
          systemInstruction: "Act as the High Oracle of KLEOS. You analyze companies that do outstanding operational work but look amateurish or average in their digital positioning. Explain to them, with high philosophical rigor and exquisite linguistic elegance in Spanish, how they are losing status and money, and how Kleos can transform them.",
          temperature: 0.85,
        }
      });

      const text = result.text;
      if (!text) {
        throw new Error("No response received from the Oracle model.");
      }

      res.json(JSON.parse(text));
    } catch (error: any) {
      console.error("Oracle Diagnostics Error:", error?.message || error);
      res.status(500).json({ error: error?.message || "An error occurred during the Oracle consultation." });
    }
  });

  // Serve static files and integrate Vite
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support Express v4 SPA Routing standard wildcard
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[KLEOS REST Server] Operational and listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical: Failed to boot KLEOS Server:", err);
});
