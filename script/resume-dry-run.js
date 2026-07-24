const normalizeText = (value) => value.replace(/\s+/g, " ").trim();
const toTitleCase = (value) => value.split(/\s+/).filter(Boolean).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
const sentenceCase = (value) => {
  const clean = normalizeText(value.replace(/^[-•]\s*/, ""));
  if (!clean) return "";
  const withCapital = clean.charAt(0).toUpperCase() + clean.slice(1);
  return /[.!?]$/.test(withCapital) ? withCapital : `${withCapital}.`;
};

const knownSkills = [
  "javascript", "typescript", "python", "java", "c++", "go", "sql",
  "react", "next.js", "node.js", "express", "html", "css", "tailwind", "graphql", "rest api",
  "postgresql", "mongodb", "mysql", "redis",
  "docker", "kubernetes", "aws", "gcp", "azure", "git", "github", "figma", "postman",
];

const smartTechCase = (value) => {
  const lower = value.toLowerCase();
  const dictionary = {
    javascript: "JavaScript",
    typescript: "TypeScript",
    react: "React",
    "react.js": "React.js",
    "node.js": "Node.js",
    nodejs: "Node.js",
    express: "Express",
    "express.js": "Express.js",
    html: "HTML",
    css: "CSS",
    sql: "SQL",
    mysql: "MySQL",
    mongodb: "MongoDB",
    postgresql: "PostgreSQL",
    aws: "AWS",
    github: "GitHub",
    linkedin: "LinkedIn",
    ml: "Machine Learning",
    ai: "AI",
  };
  return dictionary[lower] || toTitleCase(value);
};

const stripListMarker = (value) => value.replace(/^\s*(?:[-•]+|\d+[.)])\s*/, "");

const extractEntries = (value) => {
  const normalized = normalizeText(value);
  if (!normalized) return [];

  const lineEntries = value.split("\n").map((line) => normalizeText(stripListMarker(line))).filter(Boolean);
  if (lineEntries.length > 1) return lineEntries;

  const single = lineEntries[0] || normalized;
  if (/[.!?]/.test(single)) return [single];

  const hasDelimiter = /[,;|]/.test(single);
  const wordCount = single.split(/\s+/).filter(Boolean).length;
  if (hasDelimiter && wordCount <= 18) {
    return single.split(/[,;|]/).map((item) => normalizeText(stripListMarker(item))).filter(Boolean);
  }
  return [single];
};

const actionVerbs = ["Developed", "Implemented", "Optimized", "Engineered", "Collaborated", "Delivered", "Built", "Enhanced"];
const ensureMinBullets = (bullets, minCount, fallbackFactory, maxCount) => {
  const normalized = bullets.map((b) => sentenceCase(b)).filter(Boolean);
  for (let i = normalized.length; i < minCount; i += 1) normalized.push(sentenceCase(fallbackFactory(i)));
  return normalized.slice(0, maxCount);
};

const inferTechHighlights = (text) => knownSkills.filter((skill) => text.toLowerCase().includes(skill)).map((skill) => smartTechCase(skill)).slice(0, 6);

const joinTech = (skills, fallback) => {
  const unique = Array.from(new Set(skills.filter(Boolean)));
  const source = unique.length > 0 ? unique : fallback;
  if (source.length <= 2) return source.join(" and ");
  return `${source.slice(0, source.length - 1).join(", ")}, and ${source[source.length - 1]}`;
};

const hasSignal = (text, pattern) => pattern.test(text.toLowerCase());

const buildExperienceBullets = (text) => {
  const lower = text.toLowerCase();
  const tech = inferTechHighlights(text);
  const frontendTech = tech.filter((item) => ["React", "React.js", "HTML", "CSS", "JavaScript", "TypeScript", "Tailwind"].includes(item));
  const backendTech = tech.filter((item) => ["Node.js", "Express", "Python", "Java", "SQL", "PostgreSQL", "MySQL", "MongoDB"].includes(item));

  const bullets = [];
  if (frontendTech.length > 0 || hasSignal(lower, /(frontend|ui|interface|responsive|web)/)) {
    bullets.push(sentenceCase(`Developed responsive and user-friendly frontend modules using ${joinTech(frontendTech, ["React", "JavaScript", "HTML", "CSS"])}, improving usability and consistency across core user flows`));
  }
  if (backendTech.length > 0 || hasSignal(lower, /(backend|api|server|database|node|express|sql)/)) {
    bullets.push(sentenceCase(`Implemented backend services and API integrations with ${joinTech(backendTech, ["Node.js", "Express", "SQL"])}, improving reliability, scalability, and data handling efficiency`));
  }
  if (hasSignal(lower, /(debug|bug|issue|fix|optimi|performance|latency)/)) {
    bullets.push(sentenceCase("Optimized application behavior by troubleshooting defects and refining performance-critical workflows, resulting in smoother releases and improved stability"));
  }
  if (hasSignal(lower, /(team|collaborat|target|deadline|support|communicat)/)) {
    bullets.push(sentenceCase("Collaborated with cross-functional team members to align implementation priorities, support sprint targets, and deliver features within timelines"));
  }
  bullets.push(sentenceCase("Contributed to end-to-end feature delivery by writing maintainable code, validating functionality, and continuously improving development quality"));

  return ensureMinBullets(Array.from(new Set(bullets)), 4, (i) => `${actionVerbs[i % actionVerbs.length]} production-ready feature enhancements with a strong focus on quality, ownership, and consistent execution`, 5);
};

const buildProjectBullets = (text) => {
  const clean = normalizeText(text);
  const tech = inferTechHighlights(clean);
  const techStack = joinTech(tech, ["React", "JavaScript", "Node.js", "Express"]);
  const mentionsApi = hasSignal(clean, /(api|backend|server|node|express|database)/);
  const mentionsUi = hasSignal(clean, /(frontend|ui|responsive|interface|html|css|react)/);

  const bullets = [
    sentenceCase(`Designed and developed a full-stack project architecture using ${techStack}, with clean component structure and maintainable code organization`),
    sentenceCase("Implemented core application features including navigation, data rendering, input handling, and reusable modules for better scalability"),
    sentenceCase("Applied robust engineering practices such as validation, structured debugging, and iterative refinement to improve reliability and user experience"),
    sentenceCase("Optimized performance and responsiveness to ensure smooth interaction across common devices, browsers, and user workflows"),
  ];

  if (mentionsApi) {
    bullets.push(sentenceCase("Integrated backend logic and service communication to support dynamic functionality, consistent data flow, and stable application behavior"));
  }
  if (mentionsUi) {
    bullets.push(sentenceCase("Enhanced frontend usability through responsive layout design, intuitive interaction patterns, and improved visual clarity for end users"));
  }

  return ensureMinBullets(Array.from(new Set(bullets)), 4, (i) => `Built project capability ${i + 1} with production-focused engineering standards and maintainable design`, 6);
};

const toProfessionalBullets = (text, context) => {
  const normalized = normalizeText(text);
  if (!normalized) {
    return context === "experience"
      ? buildExperienceBullets("frontend backend teamwork optimization")
      : buildProjectBullets("full stack web application with frontend and backend features");
  }
  return context === "experience" ? buildExperienceBullets(normalized) : buildProjectBullets(normalized);
};

const toAchievementBullets = (text) => {
  const normalized = normalizeText(text);
  const entries = extractEntries(normalized);
  const wonFirst = /(1st|first)\s*(place|rank|prize)/i.test(normalized);
  const ideathon = /(ideathon|ideation)/i.test(normalized);
  const university = /(reva|university|college)/i.test(normalized);

  const bullets = [];
  if (wonFirst || ideathon) {
    bullets.push(sentenceCase(`Secured ${wonFirst ? "1st place" : "top recognition"} in ${ideathon ? "an Ideathon competition" : "a technical innovation event"}${university ? " at university level" : ""}, demonstrating strong ideation and execution capabilities`));
  }
  bullets.push(sentenceCase("Presented solution concepts with clear problem framing, practical implementation direction, and measurable impact orientation"));
  bullets.push(sentenceCase("Demonstrated leadership, collaboration, and communication skills while working under competitive timelines and evaluation criteria"));
  if (entries.length > 0) {
    bullets.push(sentenceCase("Converted the achievement into continuous learning outcomes by refining technical depth, presentation quality, and structured problem solving"));
  }

  return ensureMinBullets(Array.from(new Set(bullets)), 3, (i) => `Demonstrated consistent growth through achievement milestone ${i + 1} in academics and project execution`, 4);
};

const cleanLabeledValue = (value, label) => normalizeText(value).replace(new RegExp(`^${label}\\s*:?`, "i"), "").trim();
const extractHandle = (value) => {
  const withoutProtocol = value.replace(/https?:\/\//gi, "").replace(/^www\./i, "");
  const chunks = withoutProtocol.split("/").filter(Boolean);
  const candidate = chunks[chunks.length - 1] || withoutProtocol;
  const match = candidate.match(/[a-zA-Z0-9-_.]+/);
  return match ? match[0].replace(/\.+$/, "") : "";
};
const normalizeSocialHandle = (value) => {
  const cleaned = value
    .replace(/linkedin\.com\/in\//gi, "")
    .replace(/linkedin\.com\//gi, "")
    .replace(/github\.com\//gi, "")
    .replace(/https?:\/\//gi, "")
    .replace(/^www\./i, "")
    .trim();

  if (!cleaned) return "";
  const parts = cleaned.split("/").filter(Boolean);
  const probable = parts[parts.length - 1] || cleaned;

  if (probable.includes(".")) {
    const fallback = probable.split(".")[0];
    return fallback.replace(/[^a-zA-Z0-9-_]/g, "");
  }
  return probable.replace(/[^a-zA-Z0-9-_]/g, "");
};

const formatLinkedIn = (linkedin) => {
  if (!linkedin) return "";
  const raw = cleanLabeledValue(linkedin, "linkedin");
  const handle = normalizeSocialHandle(raw) || extractHandle(raw);
  return handle ? `linkedin.com/in/${handle}` : "";
};

const formatGitHub = (github) => {
  if (!github) return "";
  const raw = cleanLabeledValue(github, "github");
  const handle = normalizeSocialHandle(raw) || extractHandle(raw);
  return handle ? `github.com/${handle}` : "";
};

const input = {
  name: "Atharv",
  headline: "SOFTWARE ENGINEER",
  email: "Gmail: atharvpatil@gmail.com",
  phone: "Phone: 9663843577",
  location: "Bangalore",
  linkedin: "LinkedIn: linkedin.com/in/https://atharvpatil.linkdine.com",
  github: "GitHub: github.com/GitHub.com/atharv-p-2004",
  summary: "im aspiring full stack software engineer I know html.css js machine learning python java react node.js which good technical skills and I also be good in debugging",
  achievements: "1st place in ideation conducted by reva university that is one of the best moment of wining my first ideation.",
  certifications: "Python for beginers -udemy.",
};

const experienceInput = "I used fronted tools like react.js html css javascript.\nFor backend I used node.js express and javascript.\nMainly I focused on the froned part of the website and I helps my team to achieve there target.";
const projectInput = "Built and implemented amazon clone, implementation, optimization features with a focus on performance, reliability, and user impact.\nUsed tools and languages like react,javascript html css node.js express.";
const topStack = joinTech(inferTechHighlights(`${experienceInput} ${projectInput}`), ["JavaScript", "React", "Node.js", "Python", "SQL"]);

const output = {
  header: {
    name: input.name,
    role: input.headline,
    contactLine: [
      `Gmail: ${cleanLabeledValue(input.email, "gmail")}`,
      `Phone: ${cleanLabeledValue(input.phone, "phone")}`,
      input.location,
      `LinkedIn: ${formatLinkedIn(input.linkedin)}`,
      `GitHub: ${formatGitHub(input.github)}`,
    ].join(" | "),
  },
  summary: [
    sentenceCase("Emerging software engineer with practical exposure to full-stack engineering and data-driven problem solving"),
    sentenceCase(`Built strong technical proficiency in ${topStack}, with experience translating concepts into production-quality features`),
    sentenceCase("Known for analytical debugging, ownership, and teamwork while delivering reliable, performance-focused implementations"),
    sentenceCase("Motivated to contribute as a high-growth engineer by combining modern software practices with continuous learning and innovation"),
  ],
  experience: toProfessionalBullets(experienceInput, "experience"),
  projects: toProfessionalBullets(projectInput, "project"),
  achievements: toAchievementBullets(input.achievements),
};

console.log(JSON.stringify(output, null, 2));
