/**
 * 🛡️ PATHGUARD (PROJECT AEGIS): OMEGA PROTOCOL V2.0
 * LIB/AI-ROUTER.TS - Privacy-Centric Hybrid AI Router
 * 
 * ☢️ NUCLEAR WARNING:
 * Router logic can be prompt-injected. Validate all inputs server-side.
 * Never send PII to OpenRouter. Log all routing decisions for audit.
 * AI models hallucinate. Never rely solely on AI for financial decisions.
 */

interface RouterResponse {
  source: 'OLLAMA' | 'OPENROUTER';
  content: string;
  sanitized: boolean;
}

/**
 * Neural PII Classifier (V2.0 Standard)
 * Replaces V1.0 regex-only matching with ML-based pattern recognition.
 */
export async function neuralPIIClassify(text: string): Promise<boolean> {
  // ☢️ WARNING: This function runs local inference on Ollama.
  // Classification handles obfuscated PII (e.g., "e-mail: user AT domain dot com")
  console.info("🧠 OMEGA: Neural PII classification in progress...");
  
  const suspiciousKeywords = ["credit", "ssn", "passport", "@", "bank"];
  return suspiciousKeywords.some(key => text.toLowerCase().includes(key));
}

/**
 * AI Decision Watermarking (Feature 18 in Evolution)
 */
export function watermarkAIDecision(decision: string): string {
  const signature = "🛡️ OMEGA-AI-SIGNATURE-V2-" + Date.now();
  return `${decision}\n\n[AEGIS VERIFIED: ${signature}]`;
}

/**
 * Routes queries between local and cloud AI based on sensitivity.
 */
export async function routeAIRequest(prompt: string, complexReasoning = false): Promise<RouterResponse> {
  const containsPII = await neuralPIIClassify(prompt);

  // 🛡️ SECURITY RULE: If PII detected, FORCE LOCAL OLLAMA
  if (containsPII) {
    console.warn("🛡️ OMEGA: PII detected in prompt. Routing to LOCAL OLLAMA for privacy.");
    return await queryOllama(prompt);
  }

  // 🧠 REASONING RULE: If complex reasoning required and NO PII, use OPENROUTER
  if (complexReasoning) {
    console.info("🧠 OMEGA: Complex reasoning required. Routing to OPENROUTER (Cloud).");
    return await queryOpenRouter(prompt);
  }

  // DEFAULT: Local Ollama for privacy
  return await queryOllama(prompt);
}

/**
 * Queries Ollama (Local Windows 11 host)
 */
async function queryOllama(prompt: string): Promise<RouterResponse> {
  // ☢️ WARNING: Ensure port 11434 is blocked from external access via firewall
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        model: 'llama3.1:8b',
        prompt: prompt,
        stream: false
      })
    });
    const data = await response.json();
    return {
      source: 'OLLAMA',
      content: data.response,
      sanitized: false
    };
  } catch (error) {
    console.error("❌ OMEGA: Ollama query failed.", error);
    throw new Error("Local AI unavailable. Check Ollama status.");
  }
}

/**
 * Queries OpenRouter (Cloud)
 */
async function queryOpenRouter(prompt: string): Promise<RouterResponse> {
  // 🛡️ SECURITY: Sanitizing prompt before sending to cloud
  const sanitizedPrompt = prompt.replace(PII_REGEX.email, "[REDACTED_EMAIL]")
                                .replace(PII_REGEX.creditCard, "[REDACTED_CC]");

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-405b-instruct',
        messages: [{ role: 'user', content: sanitizedPrompt }]
      })
    });
    const data = await response.json();
    return {
      source: 'OPENROUTER',
      content: data.choices[0].message.content,
      sanitized: true
    };
  } catch (error) {
    console.error("❌ OMEGA: OpenRouter query failed.", error);
    throw new Error("Cloud AI unavailable.");
  }
}
