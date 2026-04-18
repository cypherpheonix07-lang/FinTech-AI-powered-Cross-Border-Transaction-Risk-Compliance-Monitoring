import axios from 'axios';
import { env } from '../config/env';
import { logger } from '../config/logger';

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  eval_count?: number;
  eval_duration?: number;
}

export class OllamaService {
  private static instance: OllamaService;
  private readonly baseUrl: string;
  private readonly model: string;

  private constructor() {
    this.baseUrl = env.OLLAMA_URL;
    this.model = env.OLLAMA_MODEL;
  }

  public static getInstance(): OllamaService {
    if (!OllamaService.instance) {
      OllamaService.instance = new OllamaService();
    }
    return OllamaService.instance;
  }

  /**
   * Check if the Ollama service is reachable.
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/tags`);
      return response.status === 200;
    } catch (error) {
      logger.error('Failed to connect to Ollama:', error instanceof Error ? error.message : String(error));
      return false;
    }
  }

  /**
   * Generate a response using the configured model.
   */
  async generate(prompt: string, system?: string): Promise<string> {
    try {
      logger.info(`🤖 Sending prompt to Ollama [${this.model}]`);
      const response = await axios.post<OllamaResponse>(`${this.baseUrl}/api/generate`, {
        model: this.model,
        prompt,
        system,
        stream: false,
      });

      return response.data.response;
    } catch (error) {
      logger.error('Ollama generation error:', error instanceof Error ? error.message : String(error));
      throw new Error(`AI Brain offline: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Run a security simulation based on predefined prompts.
   */
  async runSecuritySimulation(scenario: string): Promise<string> {
    const systemPrompt = "You are PathGuard's Security Sentinel, an expert in transaction path security and bank-grade encryption.";
    return this.generate(scenario, systemPrompt);
  }

  /**
   * Get an explanation for a transaction risk score.
   */
  async explainRisk(data: any): Promise<string> {
    const prompt = `
      As an AI Risk Analyst, explain the following transaction data in plain English. 
      Identify why it was flagged and what "Bank-Grade Security" measures were applied.
      DATA: ${JSON.stringify(data)}
    `;
    return this.generate(prompt);
  }
}

export const ollamaService = OllamaService.getInstance();
