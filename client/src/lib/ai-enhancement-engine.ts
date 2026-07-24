/**
 * 🤖 Advanced AI Resume Enhancement Engine v2
 * 
 * Sophisticated keyword analysis and professional bullet point generation
 * with context awareness, impact metrics, and ATS optimization
 * 
 * Features:
 * - Detects keyword type (frontend, backend, database, devops, design, management)
 * - Generates context-aware professional bullets
 * - Uses varied action verbs for natural-sounding content
 * - Includes quantifiable impact metrics
 * - Optimizes for ATS scanning
 */

// Helper text processing utilities
const normalizeText = (value: string) => value.replace(/\s+/g, " ").trim();

const toTitleCase = (value: string) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const sentenceCase = (value: string) => {
  const clean = normalizeText(value.replace(/^[-•]\s*/, ""));
  if (!clean) {
    return "";
  }

  const withCapital = clean.charAt(0).toUpperCase() + clean.slice(1);
  return /[.!?]$/.test(withCapital) ? withCapital : `${withCapital}.`;
};

const splitKeywords = (value: string) =>
  value
    .split(/[,/|]/)
    .map(token => token.trim())
    .filter(Boolean);

/**
 * Detect the type/category of a keyword for context-aware enhancement
 * @param keyword - The keyword to analyze
 * @returns The detected keyword type (frontend, backend, database, devops, design, management, or generic)
 */
export const detectKeywordType = (
  keyword: string
): "frontend" | "backend" | "database" | "devops" | "design" | "management" | "generic" => {
  const lower = keyword.toLowerCase();

  const frontendKeywords = [
    "react",
    "vue",
    "angular",
    "html",
    "css",
    "javascript",
    "typescript",
    "ui",
    "ux",
    "frontend",
    "next.js",
    "tailwind",
    "styled",
  ];
  const backendKeywords = [
    "node.js",
    "nodejs",
    "python",
    "java",
    "go",
    "c++",
    "rust",
    "backend",
    "api",
    "rest",
    "graphql",
    "express",
    "fastapi",
  ];
  const databaseKeywords = [
    "postgres",
    "mongodb",
    "mysql",
    "redis",
    "sql",
    "database",
    "nosql",
    "elasticsearch",
    "firebase",
    "dynamodb",
  ];
  const devopsKeywords = [
    "docker",
    "kubernetes",
    "aws",
    "gcp",
    "azure",
    "ci/cd",
    "jenkins",
    "infra",
    "deployment",
    "terraform",
    "devops",
  ];
  const designKeywords = ["figma", "design", "ui", "ux", "design system", "prototype"];
  const managementKeywords = [
    "leadership",
    "team",
    "management",
    "agile",
    "scrum",
    "mentoring",
    "stakeholder",
    "communication",
  ];

  if (frontendKeywords.some(kw => lower.includes(kw))) return "frontend";
  if (backendKeywords.some(kw => lower.includes(kw))) return "backend";
  if (databaseKeywords.some(kw => lower.includes(kw))) return "database";
  if (devopsKeywords.some(kw => lower.includes(kw))) return "devops";
  if (designKeywords.some(kw => lower.includes(kw))) return "design";
  if (managementKeywords.some(kw => lower.includes(kw))) return "management";

  return "generic";
};

/**
 * Get varied action verbs based on keyword type and context
 * Ensures diverse, natural-sounding bullet points
 * @param keywordType - The detected keyword type
 * @param context - Whether this is for experience or project
 * @returns Array of action verbs suitable for this context
 */
export const getActionVerbsForType = (
  keywordType: string,
  context: "experience" | "project"
): string[] => {
  const actionVerbs: Record<string, Record<string, string[]>> = {
    frontend: {
      experience: ["Architected", "Engineered", "Optimized", "Implemented", "Developed", "Deployed"],
      project: ["Architected", "Built", "Engineered", "Created", "Developed", "Delivered"],
    },
    backend: {
      experience: ["Built", "Architected", "Engineered", "Optimized", "Scaled", "Implemented"],
      project: ["Engineered", "Built", "Architected", "Developed", "Implemented", "Created"],
    },
    database: {
      experience: ["Optimized", "Architected", "Scaled", "Engineered", "Implemented", "Designed"],
      project: ["Optimized", "Designed", "Engineered", "Implemented", "Built", "Architected"],
    },
    devops: {
      experience: ["Architected", "Automated", "Deployed", "Scaled", "Optimized", "Implemented"],
      project: ["Orchestrated", "Automated", "Deployed", "Implemented", "Architected", "Built"],
    },
    design: {
      experience: ["Designed", "Created", "Developed", "Delivered", "Led", "Optimized"],
      project: ["Designed", "Created", "Delivered", "Developed", "Built", "Engineered"],
    },
    management: {
      experience: ["Led", "Mentored", "Managed", "Coordinated", "Directed", "Fostered"],
      project: ["Led", "Coordinated", "Managed", "Oversaw", "Directed", "Spearheaded"],
    },
    generic: {
      experience: ["Delivered", "Implemented", "Developed", "Created", "Built", "Executed"],
      project: ["Built", "Implemented", "Delivered", "Created", "Developed", "Engineered"],
    },
  };

  return actionVerbs[keywordType]?.[context] || actionVerbs.generic[context];
};

/**
 * Generate quantifiable impact metrics based on keyword type
 * Adds credibility to resume bullets with measurable outcomes
 * @param keywordType - The detected keyword type
 * @returns Array of possible impact metrics
 */
export const getImpactMetrics = (keywordType: string): string[] => {
  const metrics: Record<string, string[]> = {
    frontend: [
      "improved user engagement by 35%",
      "enhanced UX/performance significantly",
      "reduced load time by 40%",
      "increased conversion rate",
      "improved accessibility score to 95+",
    ],
    backend: [
      "reduced API latency by 35%",
      "scaled to handle 10x traffic",
      "improved throughput by 50%",
      "reduced response time significantly",
      "enhanced system reliability to 99.9% uptime",
    ],
    database: [
      "reduced query time by 50%",
      "optimized storage efficiency by 30%",
      "improved data retrieval speed",
      "achieved 99.9% uptime",
      "scaled database to handle 1M+ records",
    ],
    devops: [
      "automated deployment pipeline reducing manual effort by 80%",
      "reduced downtime by 80%",
      "improved release frequency from quarterly to weekly",
      "enhanced system reliability and monitoring",
      "achieved zero-downtime deployments",
    ],
    design: [
      "improved user satisfaction scores",
      "streamlined user workflows reducing friction",
      "enhanced visual consistency across product",
      "improved accessibility for all users",
      "reduced user support tickets by 25%",
    ],
    management: [
      "improved team velocity by 40%",
      "enhanced team collaboration and morale",
      "increased team retention rate",
      "delivered projects on schedule",
      "mentored 3+ junior team members",
    ],
    generic: [
      "delivered measurable business impact",
      "improved efficiency across workflows",
      "enhanced overall quality and reliability",
      "strengthened team collaboration",
      "drove continuous improvement initiatives",
    ],
  };

  return metrics[keywordType] || metrics.generic;
};

/**
 * Main AI enhancement function - transforms keywords into professional bullets
 * Combines context detection, action verb selection, and impact metrics
 * @param keyword - The user input keyword or phrase
 * @param context - Whether this is for experience or project
 * @returns Professional, ATS-optimized bullet point
 */
export const enhanceKeywordWithContextAI = (keyword: string, context: "experience" | "project"): string => {
  const clean = normalizeText(keyword.replace(/^[-•]\s*/, ""));
  if (!clean) return "";

  // If it's already a complete sentence, just validate formatting
  const isCompleteSentence = clean.split(" ").length > 8 || /[.!?]/.test(clean);
  if (isCompleteSentence) {
    return sentenceCase(clean);
  }

  // Analyze the keyword
  const keywordType = detectKeywordType(clean);
  const actionVerbs = getActionVerbsForType(keywordType, context);
  const impactMetrics = getImpactMetrics(keywordType);

  // Select a random action verb and impact metric for variety
  const actionVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
  const impact = impactMetrics[Math.floor(Math.random() * impactMetrics.length)];

  // Generate context-specific bullet point based on keyword type
  let bullet = "";
  if (keywordType === "frontend") {
    bullet = `${actionVerb} responsive, accessible ${clean} interfaces, ${impact}.`;
  } else if (keywordType === "backend") {
    bullet = `${actionVerb} scalable ${clean} solutions, ${impact}.`;
  } else if (keywordType === "database") {
    bullet = `${actionVerb} ${clean} databases for optimal performance, ${impact}.`;
  } else if (keywordType === "devops") {
    bullet = `${actionVerb} ${clean} infrastructure and deployment pipelines, ${impact}.`;
  } else if (keywordType === "design") {
    bullet = `${actionVerb} ${clean} experiences, ${impact}.`;
  } else if (keywordType === "management") {
    bullet = `${actionVerb} teams through ${clean} initiatives, ${impact}.`;
  } else {
    // Generic fallback
    if (context === "experience") {
      bullet = `${actionVerb} ${clean} solutions that ${impact} across teams.`;
    } else {
      bullet = `${actionVerb} and shipped ${clean} functionality, ${impact}.`;
    }
  }

  return sentenceCase(bullet);
};

/**
 * Convert raw input text into professional bullets using advanced AI enhancement
 * Handles both newline-separated and comma-separated keyword input
 * @param text - Raw user input (keywords, fragments, or prose)
 * @param context - Whether this is for experience or project
 * @returns Array of professional, ATS-optimized bullet points
 */
export const toProfessionalBullets = (text: string, context: "experience" | "project"): string[] => {
  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => line.replace(/^[-•]\s*/, ""));

  if (lines.length > 0) {
    return lines.map(line => enhanceKeywordWithContextAI(line, context)).filter(Boolean);
  }

  return splitKeywords(text).map(token => enhanceKeywordWithContextAI(token, context)).filter(Boolean);
};

export default {
  detectKeywordType,
  getActionVerbsForType,
  getImpactMetrics,
  enhanceKeywordWithContextAI,
  toProfessionalBullets,
};
