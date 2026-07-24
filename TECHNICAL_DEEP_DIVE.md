# 🏗️ Technical Deep Dive: AI Resource Hub Architecture

> Detailed technical explanation of how each component works and connects for mentor presentations

---

## 📊 System Architecture Layers

### **Layer 1: Presentation Layer (Frontend - React)**

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │           React Components (JSX/TSX)             │   │
│  │                                                  │   │
│  │  Pages:                                          │   │
│  │  ├─ Home.tsx (Landing)                           │   │
│  │  ├─ login.tsx (Auth UI)                          │   │
│  │  ├─ builder/index.tsx (Resume Creator)          │   │
│  │  ├─ screener/index.tsx (Resume Analyzer)        │   │
│  │  └─ not-found.tsx (404)                          │   │
│  │                                                  │   │
│  │  Components:                                     │   │
│  │  ├─ layout/Navbar.tsx (Navigation)               │   │
│  │  └─ ui/* (50+ Reusable UI Components)            │   │
│  │                                                  │   │
│  │  Hooks & Utilities:                              │   │
│  │  ├─ use-mobile.tsx (Responsive detection)        │   │
│  │  ├─ use-toast.ts (Notifications)                 │   │
│  │  ├─ ai-enhancement-engine.ts (AI Logic)          │   │
│  │  └─ queryClient.ts (React Query setup)           │   │
│  └──────────────────────────────────────────────────┘   │
│                           ▲                              │
│                           │                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │         State Management & Data Flow              │   │
│  │                                                  │   │
│  │  Local State:                                    │   │
│  │  ├─ React.useState() for form data               │   │
│  │  ├─ Form validation with React Hook Form        │   │
│  │  └─ Zod schemas for type safety                  │   │
│  │                                                  │   │
│  │  Server State:                                   │   │
│  │  ├─ React Query (useQuery, useMutation)         │   │
│  │  ├─ Automatic caching & refetching              │   │
│  │  └─ Background sync                             │   │
│  │                                                  │   │
│  │  Context APIs:                                   │   │
│  │  ├─ TooltipProvider (UI context)                │   │
│  │  ├─ QueryClientProvider (React Query)           │   │
│  │  └─ Toast Notifications (Sonner)                │   │
│  └──────────────────────────────────────────────────┘   │
│                           ▲                              │
│                           │                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │            Routing Layer (wouter)                │   │
│  │                                                  │   │
│  │  Routes:                                         │   │
│  │  ├─ / ──────────────→ Home page                  │   │
│  │  ├─ /login ─────────→ Login page                 │   │
│  │  ├─ /builder ───────→ Resume builder             │   │
│  │  ├─ /screener ──────→ Resume screener            │   │
│  │  └─ /* ─────────────→ 404 page                   │   │
│  │                                                  │   │
│  │  Features:                                       │   │
│  │  ├─ Client-side routing                          │   │
│  │  ├─ History management                           │   │
│  │  └─ URL-based state                              │   │
│  └──────────────────────────────────────────────────┘   │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### **Layer 2: Business Logic Layer (AI Engine)**

```
┌─────────────────────────────────────────────────────┐
│              AI ENHANCEMENT ENGINE                   │
│          (ai-enhancement-engine.ts)                  │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  KEYWORD CATEGORIZATION MODULE               │   │
│  │                                               │   │
│  │  Input: "React", "PostgreSQL", "Leadership"  │   │
│  │                                               │   │
│  │  Process:                                     │   │
│  │  1. Convert to lowercase                      │   │
│  │  2. Match against keyword arrays              │   │
│  │  3. Return category type                      │   │
│  │                                               │   │
│  │  Categories:                                  │   │
│  │  ├─ "frontend" (React, Vue, Angular, etc)     │   │
│  │  ├─ "backend" (Node, Python, Java, etc)       │   │
│  │  ├─ "database" (PostgreSQL, MongoDB, etc)     │   │
│  │  ├─ "devops" (Docker, Kubernetes, AWS, etc)   │   │
│  │  ├─ "design" (Figma, UI/UX, etc)              │   │
│  │  ├─ "management" (Leadership, Team, etc)      │   │
│  │  └─ "generic" (Everything else)               │   │
│  │                                               │   │
│  │  Function: detectKeywordType(keyword)         │   │
│  │  ↓ Returns: "frontend" | "backend" | ...      │   │
│  └──────────────────────────────────────────────┘   │
│            ▼                                         │
│  ┌──────────────────────────────────────────────┐   │
│  │  ACTION VERB SELECTION MODULE                │   │
│  │                                               │   │
│  │  Input: keywordType = "frontend"              │   │
│  │         context = "experience"                │   │
│  │                                               │   │
│  │  Output: [                                     │   │
│  │    "Architected",                             │   │
│  │    "Engineered",                              │   │
│  │    "Optimized",                               │   │
│  │    "Implemented",                             │   │
│  │    "Developed",                               │   │
│  │    "Deployed"                                 │   │
│  │  ]                                            │   │
│  │                                               │   │
│  │  Function: getActionVerbsForType(type, ctx)   │   │
│  │  ↓ Returns: string[]                          │   │
│  └──────────────────────────────────────────────┘   │
│            ▼                                         │
│  ┌──────────────────────────────────────────────┐   │
│  │  IMPACT METRICS MODULE                       │   │
│  │                                               │   │
│  │  Frontend Metrics:                            │   │
│  │  ├─ "improved user engagement by 35%"        │   │
│  │  ├─ "reduced load time by 40%"               │   │
│  │  ├─ "increased conversion rate"              │   │
│  │  └─ "improved accessibility score to 95+"    │   │
│  │                                               │   │
│  │  Backend Metrics:                             │   │
│  │  ├─ "reduced API latency by 35%"             │   │
│  │  ├─ "scaled to handle 10x traffic"           │   │
│  │  └─ "improved throughput by 50%"             │   │
│  │                                               │   │
│  │  Database Metrics:                            │   │
│  │  ├─ "reduced query time by 50%"              │   │
│  │  ├─ "optimized storage efficiency by 30%"    │   │
│  │  └─ "scaled to handle 1M+ records"           │   │
│  │                                               │   │
│  │  Function: getImpactMetrics(type)             │   │
│  │  ↓ Returns: string[]                          │   │
│  └──────────────────────────────────────────────┘   │
│            ▼                                         │
│  ┌──────────────────────────────────────────────┐   │
│  │  PROFESSIONAL BULLET GENERATION MODULE       │   │
│  │                                               │   │
│  │  Algorithm:                                   │   │
│  │  1. detectKeywordType(keyword)                │   │
│  │  2. getActionVerbsForType(type, context)      │   │
│  │  3. getImpactMetrics(type)                    │   │
│  │  4. Select random verb from list              │   │
│  │  5. Select random metric from list            │   │
│  │  6. Assemble sentence:                        │   │
│  │     "[Verb] [subject], [metric]."             │   │
│  │                                               │   │
│  │  Example:                                     │   │
│  │  Input:  "React"                              │   │
│  │  ↓                                            │   │
│  │  Output: "Architected responsive, accessible │   │
│  │          React interfaces, improved user      │   │
│  │          engagement by 35%."                  │   │
│  │                                               │   │
│  │  Function: enhanceKeywordWithContextAI(...)   │   │
│  │  ↓ Returns: string                            │   │
│  └──────────────────────────────────────────────┘   │
│            ▼                                         │
│  ┌──────────────────────────────────────────────┐   │
│  │  TEXT PROCESSING UTILITIES                   │   │
│  │                                               │   │
│  │  normalizeText() - Clean whitespace           │   │
│  │  toTitleCase() - Format titles                │   │
│  │  sentenceCase() - Format sentences            │   │
│  │  splitKeywords() - Parse keyword input        │   │
│  │  toProfessionalBullets() - Batch processing   │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### **Layer 3: API & Communication Layer (Express Server)**

```
┌──────────────────────────────────────────────────────────────┐
│                    API LAYER (Express.js)                    │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              MIDDLEWARE STACK                          │  │
│  │                                                        │  │
│  │  1. express.json() - Parse JSON bodies                │  │
│  │  2. express.urlencoded() - Parse form data            │  │
│  │  3. requestLogger - Log all requests                  │  │
│  │  4. express-session - Session management              │  │
│  │  5. passport.initialize() - Auth setup                │  │
│  │  6. passport.session() - Session-based auth           │  │
│  │  7. errorHandler - Global error handling              │  │
│  │                                                        │  │
│  │  Flow:                                                │  │
│  │  Request → [Middleware chain] → Route Handler         │  │
│  │          → Response transformation → Client           │  │
│  └────────────────────────────────────────────────────────┘  │
│            ▼                                                  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │           AUTHENTICATION ROUTES                        │  │
│  │                                                        │  │
│  │  1. GET /api/auth/config                              │  │
│  │     ├─ No auth required                               │  │
│  │     └─ Returns: { googleConfigured, demoAuthEnabled }│  │
│  │                                                        │  │
│  │  2. GET /api/auth/me                                  │  │
│  │     ├─ Auth required (check session)                  │  │
│  │     └─ Returns: Current user info                     │  │
│  │                                                        │  │
│  │  3. POST /api/auth/register                           │  │
│  │     ├─ Input: { email, password, displayName }        │  │
│  │     ├─ Hash password with crypto.scryptSync()         │  │
│  │     ├─ Check for duplicate email                      │  │
│  │     ├─ Create user in storage                         │  │
│  │     └─ Return: New user + session                     │  │
│  │                                                        │  │
│  │  4. POST /api/auth/login                              │  │
│  │     ├─ Input: { email, password }                     │  │
│  │     ├─ Find user by email                             │  │
│  │     ├─ Verify password (timing-safe compare)          │  │
│  │     ├─ Create session                                 │  │
│  │     └─ Return: User + session                         │  │
│  │                                                        │  │
│  │  5. GET /api/auth/logout                              │  │
│  │     ├─ Destroy session                                │  │
│  │     └─ Redirect to home                               │  │
│  │                                                        │  │
│  │  6. GET /api/auth/google                              │  │
│  │     ├─ Passport redirect to Google                    │  │
│  │     └─ Triggers OAuth flow                            │  │
│  │                                                        │  │
│  │  7. GET /api/auth/google/callback                     │  │
│  │     ├─ Google returns user data                       │  │
│  │     ├─ Create/find user                               │  │
│  │     ├─ Create session                                 │  │
│  │     └─ Redirect to dashboard                          │  │
│  └────────────────────────────────────────────────────────┘  │
│            ▼                                                  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │      FUTURE ENDPOINTS (To be implemented)              │  │
│  │                                                        │  │
│  │  POST /api/resume                                      │  │
│  │  ├─ Input: { userId, content, metadata }              │  │
│  │  ├─ Save resume to database                           │  │
│  │  └─ Return: Resume ID + metadata                      │  │
│  │                                                        │  │
│  │  GET /api/resume/:id                                  │  │
│  │  ├─ Fetch resume from database                        │  │
│  │  └─ Return: Resume content                            │  │
│  │                                                        │  │
│  │  PUT /api/resume/:id                                  │  │
│  │  ├─ Update resume in database                         │  │
│  │  └─ Return: Updated resume                            │  │
│  │                                                        │  │
│  │  POST /api/analyze                                    │  │
│  │  ├─ Input: { resumeText, jobDescription }             │  │
│  │  ├─ Extract skills from both                          │  │
│  │  ├─ Calculate match score                             │  │
│  │  └─ Return: Analysis results                          │  │
│  │                                                        │  │
│  │  POST /api/enhance                                    │  │
│  │  ├─ Input: { text, context }                          │  │
│  │  ├─ Call AI enhancement engine                        │  │
│  │  └─ Return: Enhanced bullet points                    │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### **Layer 4: Database Layer (PostgreSQL)**

```
┌──────────────────────────────────────────────────────────────┐
│                   DATABASE LAYER                             │
│              (PostgreSQL + Drizzle ORM)                      │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │            DRIZZLE ORM (Type-Safe Layer)               │  │
│  │                                                        │  │
│  │  Features:                                            │  │
│  │  ├─ TypeScript-first ORM                              │  │
│  │  ├─ Zero-runtime overhead                             │  │
│  │  ├─ Auto-generated types from schemas                 │  │
│  │  ├─ Type-safe query builders                          │  │
│  │  └─ Excellent IDE autocomplete support                │  │
│  │                                                        │  │
│  │  Drizzle → SQL compilation                            │  │
│  │  Query { ... } → SELECT * FROM ... WHERE ...          │  │
│  └────────────────────────────────────────────────────────┘  │
│            ▼                                                  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              DATABASE TABLES                           │  │
│  │                                                        │  │
│  │  TABLE: users                                         │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Column       │ Type    │ Constraints            │  │  │
│  │  ├──────────────┼─────────┼────────────────────────┤  │  │
│  │  │ id           │ UUID    │ PK, Default(gen_uuid) │  │  │
│  │  │ username     │ TEXT    │ NOT NULL, UNIQUE      │  │  │
│  │  │ password     │ TEXT    │ NOT NULL, Hashed      │  │  │
│  │  │ created_at   │ TIMESTAMP │ DEFAULT(now())       │  │  │
│  │  │ updated_at   │ TIMESTAMP │ DEFAULT(now())       │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  │  TABLE: resumes (To be created)                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ id           │ UUID    │ PK                     │  │  │
│  │  │ user_id      │ UUID    │ FK → users.id          │  │  │
│  │  │ title        │ TEXT    │ Resume title           │  │  │
│  │  │ content      │ JSONB   │ Resume data            │  │  │
│  │  │ created_at   │ TIMESTAMP │ DEFAULT(now())       │  │  │
│  │  │ updated_at   │ TIMESTAMP │ DEFAULT(now())       │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  │  TABLE: analyses (To be created)                      │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ id             │ UUID    │ PK                   │  │  │
│  │  │ resume_id      │ UUID    │ FK → resumes.id      │  │  │
│  │  │ jd_text        │ TEXT    │ Job description      │  │  │
│  │  │ matched_skills │ JSONB   │ Array of skills      │  │  │
│  │  │ missing_skills │ JSONB   │ Array of skills      │  │  │
│  │  │ match_score    │ DECIMAL │ Match percentage     │  │  │
│  │  │ created_at     │ TIMESTAMP │ DEFAULT(now())      │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  │  TABLE: enhancements (To be created)                  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ id              │ UUID    │ PK                   │  │  │
│  │  │ user_id         │ UUID    │ FK → users.id        │  │  │
│  │  │ original_text   │ TEXT    │ Raw input            │  │  │
│  │  │ enhanced_text   │ TEXT    │ AI output            │  │  │
│  │  │ keyword_type    │ VARCHAR │ Category             │  │  │
│  │  │ liked           │ BOOLEAN │ User feedback        │  │  │
│  │  │ created_at      │ TIMESTAMP │ DEFAULT(now())      │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
│            ▼                                                  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │         DATABASE INDEXES (Performance)                │  │
│  │                                                        │  │
│  │  users:                                               │  │
│  │  ├─ PRIMARY KEY (id)                                  │  │
│  │  └─ UNIQUE INDEX (username)                           │  │
│  │                                                        │  │
│  │  resumes:                                             │  │
│  │  ├─ PRIMARY KEY (id)                                  │  │
│  │  ├─ FOREIGN KEY (user_id)                             │  │
│  │  └─ INDEX (user_id) - for fast user lookups          │  │
│  │                                                        │  │
│  │  analyses:                                            │  │
│  │  ├─ PRIMARY KEY (id)                                  │  │
│  │  └─ INDEX (resume_id)                                 │  │
│  │                                                        │  │
│  │  enhancements:                                        │  │
│  │  ├─ PRIMARY KEY (id)                                  │  │
│  │  └─ INDEX (user_id)                                   │  │
│  └────────────────────────────────────────────────────────┘  │
│            ▼                                                  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │      QUERY EXAMPLES (Drizzle Syntax)                  │  │
│  │                                                        │  │
│  │  1. Select user by ID                                 │  │
│  │     db.select().from(users).where(eq(users.id, id))   │  │
│  │                                                        │  │
│  │  2. Create new user                                   │  │
│  │     db.insert(users).values({...}).returning()        │  │
│  │                                                        │  │
│  │  3. Get user's resumes                                │  │
│  │     db.select().from(resumes)                         │  │
│  │       .where(eq(resumes.user_id, userId))             │  │
│  │       .orderBy(desc(resumes.created_at))              │  │
│  │                                                        │  │
│  │  4. Join resumes with analyses                        │  │
│  │     db.select().from(resumes)                         │  │
│  │       .leftJoin(analyses, eq(...))                    │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication & Security Flow

```
┌──────────────────────────────────────────────────────────────┐
│            AUTHENTICATION FLOW DIAGRAM                        │
│                                                               │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║          USER REGISTRATION FLOW                      ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                               │
│  1. User submits form with email & password                 │
│                                                               │
│     Form Validation:                                         │
│     ├─ Email format check (Zod validation)                  │
│     ├─ Password length ≥ 8 characters                       │
│     └─ Client-side validation before sending                │
│                                                               │
│  2. Send POST /api/auth/register                            │
│     {                                                        │
│       "email": "user@example.com",                          │
│       "password": "secure123"                               │
│     }                                                        │
│                                                               │
│  3. Server receives request                                 │
│     ├─ Parse JSON body                                      │
│     ├─ Validate input (Zod schema)                          │
│     ├─ Check if email already exists                        │
│     └─ If exists → return 409 Conflict                      │
│                                                               │
│  4. Hash password                                           │
│     ├─ Generate random salt (16 bytes)                      │
│     ├─ scryptSync(password, salt, 64)                       │
│     ├─ Result: 128-char hex string                          │
│     └─ Store: "salt:hash"                                   │
│                                                               │
│     Example:                                                │
│     Password: "secure123"                                   │
│         ↓                                                    │
│     Salt: "a7f9c2e1b4d6f0a9"                                │
│     Hash: "a7f9c2e1b4d6f0a9:5f8d9a3c..."                   │
│                                                               │
│  5. Create user in database                                 │
│     INSERT INTO users VALUES (                              │
│       id: generated_uuid,                                   │
│       username: "user@example.com",                         │
│       password: "a7f9c2e1b4d6f0a9:5f8d9a3c..."             │
│     )                                                        │
│                                                               │
│  6. Create session                                          │
│     ├─ Generate session ID                                  │
│     ├─ Store user data in session store                     │
│     ├─ Set secure cookie in response                        │
│     └─ Cookie: {                                            │
│           name: "connect.sid",                              │
│           value: "<session-id>",                            │
│           httpOnly: true,                                   │
│           secure: true (HTTPS only),                        │
│           sameSite: "lax",                                  │
│           maxAge: 604800000 (7 days)                        │
│         }                                                    │
│                                                               │
│  7. Return response                                         │
│     {                                                        │
│       "ok": true,                                           │
│       "user": {                                             │
│         "id": "uuid...",                                    │
│         "displayName": "user",                              │
│         "email": "user@example.com"                         │
│       }                                                      │
│     }                                                        │
│                                                               │
│  8. Client stores session                                   │
│     ├─ Browser automatically stores cookie                  │
│     ├─ Sends cookie on future requests                      │
│     └─ React Query caches user data                         │
│                                                               │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║          USER LOGIN FLOW                             ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                               │
│  1. User submits login form                                 │
│     {                                                        │
│       "email": "user@example.com",                          │
│       "password": "secure123"                               │
│     }                                                        │
│                                                               │
│  2. POST /api/auth/login                                    │
│                                                               │
│  3. Server validates input                                  │
│     ├─ Find user by email                                   │
│     ├─ If not found → 401 Unauthorized                      │
│     └─ If found → proceed to password check                 │
│                                                               │
│  4. Password verification (TIMING-SAFE)                    │
│     ├─ Extract stored salt from password field              │
│     ├─ scryptSync(submitted_password, stored_salt, 64)      │
│     ├─ timingSafeEqual(computed_hash, stored_hash)          │
│     │  (Prevents timing-based password guessing)            │
│     ├─ If match → create session                            │
│     └─ If mismatch → 401 Unauthorized                       │
│                                                               │
│  5. Create session (same as registration step 6)            │
│                                                               │
│  6. Return user data                                        │
│                                                               │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║          SESSION-BASED AUTHENTICATION                ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                               │
│  Protected Route Access:                                     │
│                                                               │
│  1. Client makes request to protected endpoint              │
│     GET /api/user/profile                                   │
│     + Cookie: connect.sid=<session-id>                      │
│                                                               │
│  2. Server middleware checks session                        │
│     ├─ Extract session ID from cookie                       │
│     ├─ Lookup session in store                              │
│     ├─ If valid → req.user populated                        │
│     ├─ If invalid → req.isAuthenticated() returns false     │
│     └─ If false → return 401 Unauthorized                   │
│                                                               │
│  3. Route handler accesses req.user                         │
│     if (req.isAuthenticated()) {                            │
│       return res.json({ user: req.user })                   │
│     }                                                        │
│                                                               │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║          GOOGLE OAUTH 2.0 FLOW                       ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                               │
│  1. User clicks "Login with Google" button                  │
│                                                               │
│  2. Frontend redirects to /api/auth/google                  │
│                                                               │
│  3. Passport redirects to Google OAuth consent screen       │
│                                                               │
│  4. User grants permissions                                 │
│                                                               │
│  5. Google redirects to /api/auth/google/callback           │
│     + query: ?code=<authorization-code>                     │
│                                                               │
│  6. Server exchanges code for access token                  │
│     POST https://oauth2.googleapis.com/token                │
│     {                                                        │
│       "code": "<authorization-code>",                       │
│       "client_id": "...",                                   │
│       "client_secret": "...",                               │
│       "redirect_uri": "http://localhost:3000/api/..."       │
│     }                                                        │
│                                                               │
│  7. Google returns user profile                             │
│     {                                                        │
│       "id": "110123456789...",                              │
│       "displayName": "John Doe",                            │
│       "emails": [{ "value": "john@example.com" }],          │
│       "photos": [{ "value": "https://..." }]                │
│     }                                                        │
│                                                               │
│  8. Server creates/finds user                               │
│     ├─ Check if user with Google ID exists                  │
│     ├─ If yes → use existing user                           │
│     ├─ If no → create new user                              │
│     └─ Create session                                       │
│                                                               │
│  9. Redirect to dashboard with session cookie               │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Transformation Pipeline

```
┌──────────────────────────────────────────────────────────────┐
│            RESUME BUILDER DATA FLOW                           │
│                                                               │
│  STEP 1: USER INPUTS EXPERIENCE                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  User Types:                                          │  │
│  │  "Built responsive React dashboard for analytics"   │  │
│  │                                                        │  │
│  │  React State Updates:                                 │  │
│  │  experiences = [{                                     │  │
│  │    id: 1,                                             │  │
│  │    company: "Tech Corp",                              │  │
│  │    title: "Frontend Engineer",                        │  │
│  │    description: "Built responsive React..."          │  │
│  │  }]                                                   │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│            ▼                                                  │
│  STEP 2: AI ENHANCEMENT TRIGGERED                            │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  User clicks "Enhance with AI"                        │  │
│  │                                                        │  │
│  │  Function called:                                     │  │
│  │  toProfessionalBullets(description, "experience")    │  │
│  │                                                        │  │
│  │  Process:                                             │  │
│  │  1. Split text into keywords: ["React", "dashboard"] │  │
│  │  2. For each keyword:                                 │  │
│  │     ├─ detectKeywordType("React") → "frontend"       │  │
│  │     ├─ getActionVerbsForType("frontend", "exp")      │  │
│  │     ├─ getImpactMetrics("frontend")                  │  │
│  │     └─ Generate bullet: "Architected..."             │  │
│  │  3. Return array of bullets                           │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│            ▼                                                  │
│  STEP 3: AI OUTPUT DISPLAYED                                 │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  Ghost text appears in textarea:                      │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │ Architected responsive, accessible React        │ │  │
│  │  │ dashboard, improved user engagement by 35%.     │ │  │
│  │  │                                                  │ │  │
│  │  │ [Press Tab to accept] ← Hint                    │ │  │
│  │  └──────────────────────────────────────────────────┘ │  │
│  │                                                        │  │
│  │  Bullet points shown in suggestions list             │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│            ▼                                                  │
│  STEP 4: USER ACCEPTS/EDITS                                  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  Option A: Press Tab                                 │  │
│  │  ├─ Suggestion becomes input text                     │  │
│  │  └─ Ghost text disappears                             │  │
│  │                                                        │  │
│  │  Option B: Manual edit                               │  │
│  │  ├─ User types different text                         │  │
│  │  └─ Ghost text dismissed                              │  │
│  │                                                        │  │
│  │  Option C: Click suggestion button                   │  │
│  │  ├─ Populate field with selected bullet             │  │
│  │  └─ Can still edit                                    │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│            ▼                                                  │
│  STEP 5: DATA COLLECTED                                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  All form data collected:                             │  │
│  │  {                                                    │  │
│  │    personalInfo: {                                    │  │
│  │      name, email, phone, location, ...                │  │
│  │    },                                                 │  │
│  │    experiences: [{                                    │  │
│  │      title, company,                                  │  │
│  │      description: "Architected responsive..."         │  │
│  │    }],                                                │  │
│  │    projects: [...],                                   │  │
│  │    education: [...],                                  │  │
│  │    jdText: "Job description here...",                 │  │
│  │    requiredSkills: [                                  │  │
│  │      { name: "React", present: true },                │  │
│  │      { name: "Node.js", present: true },              │  │
│  │      { name: "PostgreSQL", present: false }           │  │
│  │    ]                                                  │  │
│  │  }                                                    │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│            ▼                                                  │
│  STEP 6: EXPORT/SAVE                                         │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  Option A: Download PDF                              │  │
│  │  ├─ Convert form data to HTML                         │  │
│  │  ├─ html2canvas → image                               │  │
│  │  ├─ jsPDF → embed image                               │  │
│  │  └─ Browser downloads resume.pdf                      │  │
│  │                                                        │  │
│  │  Option B: Export YAML                               │  │
│  │  ├─ Convert form data to YAML structure               │  │
│  │  └─ Browser downloads resume.yaml                     │  │
│  │                                                        │  │
│  │  Option C: Save to Account                            │  │
│  │  ├─ POST /api/resume (future endpoint)                │  │
│  │  ├─ Save to database                                  │  │
│  │  └─ User can load later                               │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎯 Resume Screener Analysis Pipeline

```
┌──────────────────────────────────────────────────────────────┐
│            RESUME SCREENER DATA FLOW                          │
│                                                               │
│  STEP 1: FILE UPLOAD & PARSING                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  User selects file: resume.pdf or resume.docx         │  │
│  │                                                        │  │
│  │  If PDF:                                              │  │
│  │  ├─ pdfjs-dist library loads                          │  │
│  │  ├─ Extracts text from all pages                      │  │
│  │  ├─ Combines pages into single string                 │  │
│  │  └─ Removes extra whitespace                          │  │
│  │                                                        │  │
│  │  If DOCX:                                             │  │
│  │  ├─ Mammoth library processes                         │  │
│  │  ├─ Converts to HTML                                  │  │
│  │  ├─ Extracts text from HTML                           │  │
│  │  └─ Cleans formatting                                 │  │
│  │                                                        │  │
│  │  Result: resumeText =                                 │  │
│  │  "John Doe\nSoftware Engineer\nExperience:\n..."      │  │
│  │                                                        │  │
│  │  Stored in browser memory (not sent to server)        │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│            ▼                                                  │
│  STEP 2: JOB DESCRIPTION PASTING                             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  User pastes job description text:                    │  │
│  │  "We are looking for a Senior React Developer..."     │  │
│  │                                                        │  │
│  │  jdText stored in component state                     │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│            ▼                                                  │
│  STEP 3: SKILL EXTRACTION FROM JD                            │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  Algorithm:                                           │  │
│  │  1. Convert JD to uppercase                           │  │
│  │  2. Iterate through techDatabase (70+ skills)         │  │
│  │  3. Check if tech keyword in JD                       │  │
│  │     const jdUpper = jdText.toUpperCase()              │  │
│  │     const requiredSkills = techDatabase.filter(      │  │
│  │       tech => jdUpper.includes(tech.toUpperCase())    │  │
│  │     )                                                  │  │
│  │  4. Result: ["React", "Node.js", "PostgreSQL", ...] │  │
│  │                                                        │  │
│  │  techDatabase includes:                               │  │
│  │  ├─ Languages: JS, TS, Python, Java, Go, Rust, ...   │  │
│  │  ├─ Frontend: React, Vue, Angular, Next.js, ...      │  │
│  │  ├─ Backend: Node, Express, Django, Spring, ...      │  │
│  │  ├─ Databases: MongoDB, PostgreSQL, MySQL, ...       │  │
│  │  ├─ DevOps: Docker, Kubernetes, AWS, Azure, ...      │  │
│  │  ├─ Tools: Git, Jira, Figma, Postman, ...            │  │
│  │  └─ Methodologies: Agile, Scrum, TDD, ...             │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│            ▼                                                  │
│  STEP 4: SKILL EXTRACTION FROM RESUME                        │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  Algorithm:                                           │  │
│  │  1. Convert resume text to uppercase                  │  │
│  │  2. Iterate through techDatabase                      │  │
│  │  3. Check if tech keyword in resume                   │  │
│  │     const resumeUpper = resumeText.toUpperCase()      │  │
│  │     const presentSkills = techDatabase.filter(        │  │
│  │       tech => resumeUpper.includes(tech.toUpper())    │  │
│  │     )                                                  │  │
│  │  4. Result: ["React", "Node.js", ...]                │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│            ▼                                                  │
│  STEP 5: SKILL COMPARISON & SCORING                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  Categorize skills:                                   │  │
│  │                                                        │  │
│  │  matched = intersection(requiredSkills, presentSkills)│  │
│  │  ├─ Skills in BOTH JD and resume                      │  │
│  │  ├─ Example: ["React", "Node.js"]                     │  │
│  │  └─ Color: Green ✓                                    │  │
│  │                                                        │  │
│  │  missing = difference(requiredSkills, presentSkills)  │  │
│  │  ├─ Skills in JD but NOT resume                       │  │
│  │  ├─ Example: ["PostgreSQL", "Docker"]                 │  │
│  │  └─ Color: Red ✗                                      │  │
│  │                                                        │  │
│  │  Calculate scores:                                    │  │
│  │  matchScore = (matched.length / required.length) × 100│  │
│  │  matchScore = (2 / 5) × 100 = 40%                     │  │
│  │                                                        │  │
│  │  coverageScore = (present.length / required.length)   │  │
│  │  skillScore = based on impact of missing skills       │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│            ▼                                                  │
│  STEP 6: DISPLAY RESULTS                                     │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  UI shows:                                            │  │
│  │                                                        │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ ATS Match Score: 65%                            │  │  │
│  │  │ ████████░░░░░░░░░░                             │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                        │  │
│  │  MATCHED SKILLS (5)                                  │  │
│  │  ✓ React                                             │  │
│  │  ✓ Node.js                                           │  │
│  │  ✓ JavaScript                                        │  │
│  │  ✓ TypeScript                                        │  │
│  │  ✓ Git                                               │  │
│  │                                                        │  │
│  │  MISSING SKILLS (5)                                  │  │
│  │  ✗ PostgreSQL         [Add to resume]               │  │
│  │  ✗ Docker             [Add to resume]               │  │
│  │  ✗ AWS                [Add to resume]               │  │
│  │  ✗ GraphQL            [Add to resume]               │  │
│  │  ✗ Redis              [Add to resume]               │  │
│  │                                                        │  │
│  │  RECOMMENDATIONS:                                     │  │
│  │  • Add 5 missing skills to improve score to 100%     │  │
│  │  • Use skills in bullet points                       │  │
│  │  • Match job description keywords exactly            │  │
│  │  • Highlight metrics and achievements               │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🌐 Network & Communication Protocol

```
┌──────────────────────────────────────────────────────────────┐
│              HTTP REQUEST/RESPONSE CYCLE                      │
│                                                               │
│  CLIENT (Browser)                    SERVER (Express)        │
│  ├─ React component renders           Express listening      │
│  ├─ User clicks button                 on port 3000          │
│  │                                      or Vite dev          │
│  │                                      on port 5000         │
│  │                                                           │
│  ├─ Fetch API call initiated                                 │
│  │                                                           │
│  │ fetch('/api/auth/login', {                               │
│  │   method: 'POST',                                        │
│  │   headers: {                                             │
│  │     'Content-Type': 'application/json'                   │
│  │   },                                                     │
│  │   body: JSON.stringify({                                 │
│  │     email: 'user@example.com',                           │
│  │     password: 'password123'                              │
│  │   })                                                     │
│  │ })                                                       │
│  │                                                           │
│  │─────────────────────────────────────────────────────→   │
│  │  HTTP POST /api/auth/login                               │
│  │  Headers: {                                              │
│  │    Content-Type: application/json,                       │
│  │    Cookie: connect.sid=<session-id>                      │
│  │  }                                                        │
│  │  Body: {                                                  │
│  │    "email": "user@example.com",                          │
│  │    "password": "password123"                             │
│  │  }                                                        │
│  │                                                           │
│  │                                    ├─ Receive request    │
│  │                                    ├─ Log request        │
│  │                                    ├─ Parse JSON body    │
│  │                                    ├─ Extract session    │
│  │                                    ├─ Validate input     │
│  │                                    ├─ Query database     │
│  │                                    ├─ Verify password    │
│  │                                    ├─ Create session     │
│  │                                    ├─ Build response     │
│  │                                    └─ Send response      │
│  │                                                           │
│  │←──────────────────────────────────────────────────────── │
│  │  HTTP 200 OK                                              │
│  │  Headers: {                                              │
│  │    Content-Type: application/json,                       │
│  │    Set-Cookie: connect.sid=<new-session-id>;            │
│  │               Path=/;                                    │
│  │               HttpOnly;                                  │
│  │               Secure;                                    │
│  │               SameSite=Lax;                              │
│  │               Max-Age=604800                             │
│  │  }                                                        │
│  │  Body: {                                                  │
│  │    "ok": true,                                           │
│  │    "user": {                                             │
│  │      "id": "550e8400-e29b-41d4-a716-446655440000",      │
│  │      "displayName": "John Doe",                          │
│  │      "email": "user@example.com"                         │
│  │    }                                                      │
│  │  }                                                        │
│  │                                                           │
│  ├─ Receive response                                        │
│  ├─ Parse JSON                                              │
│  ├─ Browser sets cookie automatically                       │
│  ├─ React Query updates cache                               │
│  ├─ Update component state                                  │
│  ├─ Redirect to dashboard                                   │
│  └─ Re-render UI with user data                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 📈 Performance Considerations

### **Frontend Optimization**

```typescript
// Code Splitting (Automatic with Vite)
Routes are lazy loaded:
├─ Home chunk: 15 KB
├─ Builder chunk: 85 KB
├─ Screener chunk: 65 KB
└─ Login chunk: 25 KB

// React Query Caching
Responses cached by URL:
├─ GET /api/auth/me (60s stale time)
├─ GET /api/resumes (5m stale time)
└─ POST /api/analyze (no cache)

// Memoization
useMemo, useCallback prevent re-renders
memo() wraps expensive components
shouldComponentUpdate logic
```

### **Backend Optimization**

```typescript
// Connection Pooling
pg pool size: 10-20 connections
Reuse connections across requests
Reduces connection overhead

// Middleware Optimization
express.json() with size limit: 10MB
Request logging (structured logs)
CORS preflight caching

// Database Query Optimization
Indexes on frequently queried columns
N+1 query prevention with JOINs
Prepared statements (parameterized queries)
```

---

## 🎓 For Your Mentors

### **Key Talking Points**

1. **Full-Stack Architecture**
   - Frontend: React 19, TypeScript, Vite
   - Backend: Express.js, Node.js
   - Database: PostgreSQL, Drizzle ORM

2. **Type Safety**
   - TypeScript throughout stack
   - Zod runtime validation
   - Drizzle auto-generated types

3. **Authentication**
   - Session-based auth (express-session)
   - OAuth 2.0 (Google)
   - Secure password hashing (scrypt)

4. **AI Processing**
   - Keyword categorization algorithm
   - Context-aware action verb selection
   - Impact metrics generation
   - ATS optimization techniques

5. **Performance**
   - React Query for caching
   - Code splitting with Vite
   - Database indexing
   - Connection pooling

6. **Security**
   - Timing-safe password comparison
   - HttpOnly secure cookies
   - CSRF protection (SameSite)
   - Input validation (Zod)

---

**This document provides everything needed to explain your project to mentors!**
