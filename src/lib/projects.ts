export type ProjectLink = {
  label: string;
  href: string;
};

export type BrandKey =
  | "google"
  | "gemini"
  | "deepmind"
  | "aws"
  | "anthropic"
  | "huggingface"
  | "kaggle"
  | "devpost"
  | "nmims";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  summary: string;
  domain: string;
  status: string;
  achievement?: string;
  timeline: string;
  platform: string;
  team: string[];
  stack: string[];
  architecture: string[];
  impact: string[];
  links: ProjectLink[];
  brands: BrandKey[];
  accent: "azure" | "ember" | "violet" | "mint" | "rose" | "cyan";
  sceneType: "map" | "transform" | "timeline" | "signal" | "device" | "reason" | "radar";
};

export const featuredProjects: Project[] = [
  {
    slug: "hawkeye",
    title: "HawkEye",
    subtitle: "Live AI Disaster Command Center",
    tagline: "Voice-controlled real-time 3D flood intelligence",
    domain: "Geospatial intelligence · Emergency response",
    status: "Submitted",
    achievement: "Gemini Live Agent Challenge · Devpost",
    timeline: "March 2026",
    platform: "Google ADK · CesiumJS · BigQuery",
    team: ["Tayyab Khan", "Kumar Nikunj Sinha", "Sahil Jayesh Tanna"],
    summary:
      "A four-agent swarm built on Google's Agent Development Kit. It ingests drone footage, Sentinel-1 SAR, and live sensor data, then thinks, speaks, and acts — warning commanders when evacuation routes turn unsafe in cities like Jakarta.",
    stack: [
      "Google ADK",
      "Gemini 2.5 Flash Native Audio",
      "Nano Banana 2",
      "FastAPI (bidi-streaming WS)",
      "BigQuery (geospatial)",
      "Firestore",
      "CesiumJS · Photorealistic 3D Tiles",
      "React · Vite",
    ],
    architecture: [
      "Perception Agent — Sentinel-1 SAR + drone feeds via Google Earth Engine",
      "Analyst Agent — 2.6M historical flood events, ST_DWITHIN / ST_INTERSECTS",
      "Predictor Agent — photorealistic risk projections via Nano Banana 2",
      "Coordinator Agent — autonomous alerts, routes, and disagreement",
    ],
    impact: [
      "Sub-second voice latency end-to-end",
      "17 Google Cloud services orchestrated as one system",
      "Built to address flood-prone metros (Jakarta · pop. 11M+)",
    ],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/hawkeye-osbena" },
      { label: "Live Demo", href: "https://dia-1027824348124.us-central1.run.app" },
    ],
    brands: ["google", "gemini", "devpost"],
    accent: "azure",
    sceneType: "map",
  },
  {
    slug: "hephaestus",
    title: "Hephaestus",
    subtitle: "AI Architectural Visualization",
    tagline: "2D floor plans become 3D worlds in minutes",
    domain: "Architecture · Spatial AI",
    status: "Winner",
    achievement: "Google DeepMind Nano Banana Hackathon · Global · $400K+ pool",
    timeline: "September 2025 · 48-hour sprint",
    platform: "Gemini 2.5 Flash Image · Three.js",
    team: ["Tayyab Khan", "Sahil Tanna", "Kumar Nikunj Sinha"],
    summary:
      "Automatically converts 2D floor plans into hyper-realistic 3D interior environments with 360° panoramic walkthroughs. Eliminates manual CAD-to-3D conversion so clients can feel a space, not just read it.",
    stack: [
      "Gemini 2.5 Flash Image (Nano Banana)",
      "Three.js",
      "React",
      "Procedural 3D geometry",
      "Real-time 360° rendering",
    ],
    architecture: [
      "2D plan ingestion and normalization",
      "AI spatial interpretation — walls, rooms, layout logic",
      "Procedural 3D geometry generation",
      "Real-time 360° rendering and navigation",
    ],
    impact: [
      "Winner at Google DeepMind's global Nano Banana Hackathon",
      "Eliminates CAD-to-3D work at early design stages",
      "Moves architectural visualization from specialist to accessible",
    ],
    links: [
      {
        label: "Kaggle Writeup",
        href: "https://www.kaggle.com/competitions/banana/writeups/hephaestus",
      },
    ],
    brands: ["deepmind", "gemini", "kaggle"],
    accent: "violet",
    sceneType: "transform",
  },
  {
    slug: "directors-cut",
    title: "Director's Cut",
    subtitle: "Autonomous AI Video Editor",
    tagline: "Long-form to production-ready shorts in 3–5 minutes",
    domain: "Creative intelligence · Video",
    status: "3rd Place — Consumer Track",
    achievement: "MCP 1st Birthday Hackathon · Anthropic × HuggingFace",
    timeline: "Nov–Dec 2025",
    platform: "MCP · Modal Labs · Qwen VL · WhisperX",
    team: ["Tayyab Khan", "Sahil Tanna", "Kumar Nikunj Sinha"],
    summary:
      "A multi-agent system that turns long YouTube videos into vertical shorts from a single URL. A 5-stage pipeline handles analysis, verification, planning, FFmpeg execution, and post-production.",
    stack: [
      "Model Context Protocol",
      "Modal Labs",
      "Qwen VL",
      "WhisperX",
      "FLUX",
      "ElevenLabs",
      "FFmpeg",
    ],
    architecture: [
      "Hotspot detection via vision-AI + multimodal reasoning",
      "Smart 9:16 subject tracking with Qwen VL",
      "Mood-matched intros, subtitles, pacing, voiceover",
      "MCP server exposed to Claude / ChatGPT for conversational orchestration",
    ],
    impact: [
      "3rd place out of a global consumer track",
      "Scales FFmpeg + parallel AI inference on Modal with zero DevOps",
      "Condenses hours of manual editing to minutes",
    ],
    links: [
      {
        label: "HuggingFace Space",
        href: "https://huggingface.co/spaces/MCP-1st-Birthday/directors-cut",
      },
    ],
    brands: ["anthropic", "huggingface"],
    accent: "ember",
    sceneType: "timeline",
  },
  {
    slug: "momnitrix",
    title: "Momnitrix",
    subtitle: "Maternal Health Triage on Your Wrist",
    tagline: "Clinician-grade risk on a smartwatch",
    domain: "Healthcare · Multi-model medical AI",
    status: "Submitted · Judging",
    achievement: "Google MedGemma Impact Challenge · $100K pool",
    timeline: "January–February 2026",
    platform: "MedGemma · MedSigLIP · Derm Foundation · MedASR",
    team: [
      "Tayyab Khan · ML & Full-Stack",
      "Sahil Tanna · Mobile & WatchOS",
      "Nikunj Sinha · Clinical Research",
    ],
    summary:
      "Closes the interpretation gap between prenatal visits — turning smartwatch vitals, wound photos, and voice check-ins into structured, clinician-aligned risk assessments in real time.",
    stack: [
      "MedGemma 1.5 4B-IT (LoRA)",
      "MedSigLIP (SurgWound)",
      "Derm Foundation",
      "MedASR",
      "Gemini Flash orchestrator",
      "SwiftUI · HealthKit · WatchOS",
    ],
    architecture: [
      "MedGemma — 5-part structured risk assessments with clinical thresholds",
      "MedSigLIP — wound healing, infection risk (Macro AUC 0.745)",
      "Derm Foundation — 10-class skin conditions on pre-computed embeddings",
      "MedASR — clinical-vocabulary speech recognition",
      "Async parallel dispatch via asyncio.gather",
    ],
    impact: [
      "1/20th the cost of GPT-4 calls · data never leaves controlled inference",
      "Model weights open-sourced on HuggingFace",
      "Targets 287K preventable maternal deaths / year",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/tayyab415/momnitrix-medgemma",
      },
      {
        label: "Live Demo",
        href: "https://momnitrix-frontend-1027824348124.us-central1.run.app/",
      },
    ],
    brands: ["google", "gemini", "kaggle"],
    accent: "rose",
    sceneType: "signal",
  },
  {
    slug: "hireon",
    title: "HireOn",
    subtitle: "AI-Native Interview Preparation",
    tagline: "Live, sub-second, full-stack mock interviews",
    domain: "Career intelligence · Voice AI",
    status: "Submitted",
    achievement: "Amazon Nova AI Hackathon · Devpost",
    timeline: "March 2026",
    platform: "Amazon Bedrock · Nova 2 Lite · Nova 2 Sonic",
    team: ["Tayyab Khan", "Kumar Nikunj Sinha", "Sahil Jayesh Tanna"],
    summary:
      "A six-stage lifecycle from resume and JD analysis through a live bidirectional voice mock interview to a post-interview report with body language cues from webcam snapshots.",
    stack: [
      "Nova 2 Lite (1M ctx, multimodal)",
      "Nova 2 Sonic (speech-to-speech, bidi)",
      "Nova 2 Lite — Extended Thinking",
      "Amazon Bedrock",
    ],
    architecture: [
      "Native PDF resume ingestion + structured fit maps",
      "Speech-to-speech interview with sub-second latency and VAD",
      "Post-interview deep reasoning over transcript + webcam frames",
      "Pressure Mode + guardrails + crash-plan study generator",
    ],
    impact: [
      "No STT→LLM→TTS chaining — true bidi-streaming",
      "Resume risk detection thinks like a cynical recruiter",
      "Tonight's Crash Plan generated post-interview",
    ],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/hireon" },
      {
        label: "Live Demo",
        href: "https://hireeon-frontend-1027824348124.us-central1.run.app/",
      },
    ],
    brands: ["aws", "devpost"],
    accent: "cyan",
    sceneType: "radar",
  },
  {
    slug: "gemmatron",
    title: "Gemmatron",
    subtitle: "Reasoning in a 2B open-source model",
    tagline: "Lightweight model. Heavy lifting.",
    domain: "Reasoning · Post-training",
    status: "Honorable Mention",
    achievement: "Google Tunix Hack · Kaggle · $100K pool",
    timeline: "November 2025 – January 2026",
    platform: "Tunix (JAX) · Gemma-2 2B · LoRA · GRPO",
    team: [
      "Tayyab Khan",
      "Sahil Tanna",
      "Nikunj Sinha",
      "Pahal Chordiya",
      "Taha Khan",
    ],
    summary:
      "Proves transparent, step-by-step reasoning is achievable in a 2B open-source model through a disciplined three-stage training curriculum — correctness and interpretability, not parameter count.",
    stack: ["Tunix (JAX)", "Gemma-2 2B", "LoRA", "GRPO", "Kaggle TPUs"],
    architecture: [
      "Stage 1 — SFT-1 synthetic reasoning foundation (LoRA)",
      "Stage 2 — GRPO with verifiable constraint-based rewards",
      "Stage 3 — SFT-2 self-distillation back into supervised knowledge",
    ],
    impact: [
      "Reasoning quality without RL at inference",
      "Delivered within 9h/session · 20h/week TPU budget",
      "Honorable mention recognition from Google",
    ],
    links: [
      {
        label: "Kaggle Writeup",
        href: "https://www.kaggle.com/competitions/google-tunix-hackathon/writeups/gemmatron-tunix",
      },
    ],
    brands: ["google", "gemini", "kaggle"],
    accent: "violet",
    sceneType: "reason",
  },
  {
    slug: "echo",
    title: "ECHO",
    subtitle: "Emotion-Cognition Human Observer",
    tagline: "A 6-wheeled robot that reads emotion before it answers",
    domain: "Embodied AI · Robotics",
    status: "Capstone · In Progress",
    achievement: "First hardware robotics capstone in the programme",
    timeline: "2025 – 2026",
    platform: "Raspberry Pi 4 · Gemini Robotics · Whisper · Azure TTS",
    team: [
      "Tayyab Khan",
      "Kumar Nikunj Sinha",
      "Sahil Jayesh Tanna",
      "Shashvath Arun",
      "Pahal Chordiya",
    ],
    summary:
      "A 6-wheeled autonomous robot that sees, understands, thinks, and speaks with emotion as a first-class input. Face → custom TFLite FER model → Gemini Robotics → Azure TTS.",
    stack: [
      "Custom EfficientNetB0 FER (TFLite FP16)",
      "MediaPipe face detection",
      "Whisper (local STT)",
      "gemini-robotics-er-1.5-preview",
      "Azure Neural TTS",
      "L298N · HC-SR04 · IR sensors",
    ],
    architecture: [
      "Thread 1 — Vision (always on, 3–5 FPS on RPi4 CPU)",
      "Thread 2 — Conversation (wake-word → Whisper → Gemini → TTS)",
      "Thread 3 — Navigation (sensors + L298N motor control)",
      "Emotion injected into every Gemini Robotics prompt",
    ],
    impact: [
      "79.49% accuracy · Macro F1 = 0.7034 · +23.25 pp over MobileNetV2 baseline",
      "8.39 MB TFLite model · ~80ms inference on RPi4",
      "Edge-first: vision, STT, motors all run locally",
    ],
    links: [],
    brands: ["google", "gemini", "nmims"],
    accent: "mint",
    sceneType: "device",
  },
];

export const archiveProjects: Project[] = [
  {
    slug: "cutpilot",
    title: "CutPilot",
    subtitle: "Agentic AI Video Editor on Gemini 3",
    tagline: "You direct. A 4-agent film crew executes.",
    domain: "Creative intelligence",
    status: "Submitted",
    achievement: "Gemini 3 Hackathon · Devpost",
    timeline: "February 2026",
    platform: "Gemini 3 · Veo 3.1 · Imagen",
    team: ["Tayyab Khan", "Sahil Jayesh Tanna", "Kumar Nikunj Sinha"],
    summary:
      "An intelligent timeline where you type 'make this intro more energetic' and a 4-agent system watches, plans, executes, and self-corrects until the cut matches the brief.",
    stack: [
      "React 19 · TypeScript 5.8 · Vite 6",
      "Tailwind 4 (Oxide) · Motion 12",
      "Google GenAI SDK · Veo 3.1 · Imagen",
      "Gemini 3 Pro + Flash",
    ],
    architecture: [
      "Eyes — analyst watching via intelligent frame sampling",
      "Brain — planner outputting validated JSON edit plans",
      "Hands — executor with mutex-locked TimelineStore",
      "Verifier — QA agent that autonomously replans",
    ],
    impact: [
      "Observable Store pattern supports 50+ AI edits/sec",
      "Autonomous replan loop — no human in the corrective path",
    ],
    links: [
      {
        label: "Devpost",
        href: "https://devpost.com/software/chronosync-etczh4",
      },
      {
        label: "Live Demo",
        href: "https://cutpilot-1027824348124.us-west1.run.app/",
      },
    ],
    brands: ["google", "gemini", "devpost"],
    accent: "ember",
    sceneType: "timeline",
  },
  {
    slug: "careermatch",
    title: "CareerMatch",
    subtitle: "CV-to-Job Matching with BigQuery ML",
    tagline: "Matched on competence, not formatting compliance",
    domain: "Career intelligence · BigQuery",
    status: "Submitted",
    achievement: "BigQuery AI Hackathon · Google Cloud · Kaggle",
    timeline: "September 2025",
    platform: "BigQuery ML · AI.GENERATE",
    team: ["Tayyab Khan", "Sahil Tanna", "Kumar Nikunj Sinha"],
    summary:
      "Semantic embeddings, AI-powered CV parsing, weighted scoring, and 24-month salary forecasting — connecting candidates to roles based on skill overlap rather than keyword theatre.",
    stack: ["BigQuery ML", "AI.GENERATE", "Vector similarity"],
    architecture: [
      "Universal CV parsing across LinkedIn / campus / global boards",
      "Semantic vector similarity (skills > titles)",
      "Weighted scoring — Skills ~50% / Experience ~35% / Education ~15%",
      "24-month salary forecasting per role trajectory",
    ],
    impact: [
      "Generative AI without leaving BigQuery",
      "Transparent scoring with explicit skill-gap identification",
    ],
    links: [
      {
        label: "Kaggle Writeup",
        href: "https://www.kaggle.com/competitions/bigquery-ai-hackathon/writeups/new-writeup-1758333230181",
      },
    ],
    brands: ["google", "kaggle"],
    accent: "azure",
    sceneType: "reason",
  },
  {
    slug: "concalliq",
    title: "ConcallIQ",
    subtitle: "Earnings-call RAG with QuIM + FIT",
    tagline: "80–85% recall · 40–60% token reduction",
    domain: "Financial intelligence · RAG research",
    status: "Approved & Certified",
    achievement: "NMIMS · Semester 5 Research",
    timeline: "Submitted November 3, 2025",
    platform: "LangChain · Gemini · Streamlit",
    team: ["Tayyab Khan", "Nikunj Sinha", "Sahil Tanna"],
    summary:
      "Transforms static earnings-call PDFs into interactive knowledge bases using QuIM-RAG (question-to-question matching) and FIT-RAG (self-knowledge gating) for dramatic cost and latency wins.",
    stack: [
      "Streamlit",
      "pdfplumber",
      "LangChain",
      "Gemini Flash-Lite",
      "text-embedding-004",
      "NumPy",
    ],
    architecture: [
      "QuIM-RAG — question-to-question matching, +15–20% recall over baseline",
      "FIT-RAG — self-knowledge gate skips 20–30% of queries",
      "30–40% cost reduction per 20-query session",
      "4–7s query response time end to end",
    ],
    impact: [
      "Generalizes beyond finance — legal, medical, technical docs",
      "Published under NMIMS research programme",
    ],
    links: [],
    brands: ["gemini", "nmims"],
    accent: "cyan",
    sceneType: "reason",
  },
];

export type TeamMember = {
  name: string;
  short: string; // what the team calls them, used on the Contact links
  role: string;
  bio: string;
  linkedin: string;
  email?: string;
};

export const team: TeamMember[] = [
  {
    name: "Sahil Tanna",
    short: "Sahil",
    role: "Full-stack engineering · iOS & WatchOS · Product design · Interfaces",
    bio: "Builds end-to-end — from WatchOS vitals pipelines to full-stack web apps and design systems. The one who ships the product the user actually touches.",
    linkedin: "https://www.linkedin.com/in/sahiltanna7/",
    email: "sahiltanna@1horizon-ai.com",
  },
  {
    name: "Tayyab Khan",
    short: "Tayyab",
    role: "ML engineering · Multi-agent systems · Platform",
    bio: "Designs the agent swarms, training curricula, and streaming backends that make the intelligence behave like infrastructure instead of a demo.",
    linkedin: "https://www.linkedin.com/in/tayyab-khan-159153282/",
    email: "tayyab@1horizon-ai.com",
  },
  {
    name: "Kumar Nikunj Sinha",
    short: "Nikunj",
    role: "Research · Clinical reasoning · Data science",
    bio: "Grounds every project in rigor — clinical validation, statistical foundations, and the research lens that turns hackathon code into real work.",
    linkedin: "https://www.linkedin.com/in/kumar-nikunj-sinha-kns/",
    email: "nikunjsinha@1horizon-ai.com",
  },
];

export const contact = {
  email: "sahiltanna@1horizon-ai.com",
};

export type Recognition = {
  rank: string;        // "Winner", "3rd Place", "Honorable Mention"
  rankShort: string;   // short variant kept for a11y / legacy
  rankCaption: string; // small label under the title
  project: string;
  projectSlug: string;
  venue: string;       // hackathon name
  partners: BrandKey[];
  pool?: string;
  color: "azure" | "violet" | "mint";
  // Which animated medallion to render as the card's hero symbol.
  medal: "trophy" | "bronze" | "honorable";
  // All three of our wins are from global hackathons — we surface this
  // explicitly on the card since the reach is part of the achievement.
  global?: boolean;
  // Optional region/scale caption — e.g. "Worldwide · 10K+ submissions".
  scale?: string;
};

export const recognitions: Recognition[] = [
  {
    rank: "Winner",
    rankShort: "W",
    rankCaption: "Spatial AI · Architecture",
    project: "Hephaestus",
    projectSlug: "hephaestus",
    venue: "Nano Banana Hackathon · Google DeepMind",
    partners: ["deepmind", "gemini"],
    pool: "$400K+ prize pool",
    color: "azure",
    medal: "trophy",
    global: true,
    scale: "Worldwide · Google DeepMind",
  },
  {
    rank: "3rd Place",
    rankShort: "03",
    rankCaption: "Consumer Track",
    project: "Director's Cut",
    projectSlug: "directors-cut",
    venue: "MCP 1st Birthday Hackathon",
    partners: ["anthropic", "huggingface"],
    color: "violet",
    medal: "bronze",
    global: true,
    scale: "Global · Anthropic × Hugging Face",
  },
  {
    rank: "Honorable Mention",
    rankShort: "HM",
    rankCaption: "Google Tunix · Kaggle",
    project: "Gemmatron",
    projectSlug: "gemmatron",
    venue: "Google Tunix Hackathon",
    partners: ["google", "kaggle"],
    pool: "$100K prize pool",
    color: "mint",
    medal: "honorable",
    global: true,
    scale: "Global · Google Cloud × Kaggle",
  },
];

export type CapabilityIcon =
  | "agents"
  | "multimodal"
  | "voice"
  | "cube"
  | "chip"
  | "robot"
  | "orchestrate"
  | "realtime";

export const capabilities: {
  title: string;
  body: string;
  icon: CapabilityIcon;
}[] = [
  {
    title: "Multi-agent systems",
    body: "Swarms with differentiated roles — perception, analysis, prediction, coordination — coordinated with protocol-level handoffs.",
    icon: "agents",
  },
  {
    title: "Multimodal AI",
    body: "Vision, speech, language, and sensor data unified as one interpretable input surface.",
    icon: "multimodal",
  },
  {
    title: "Speech interfaces",
    body: "Sub-second bidi voice pipelines with VAD, barge-in, and session resumption built into the transport.",
    icon: "voice",
  },
  {
    title: "3D visualization",
    body: "Three.js, CesiumJS, and Photorealistic 3D Tiles driven by structured model outputs.",
    icon: "cube",
  },
  {
    title: "Edge deployment",
    body: "TFLite on ARM, quantized inference, threaded runtimes, offline-first reliability.",
    icon: "chip",
  },
  {
    title: "Robotics",
    body: "Embodied reasoning — vision, locomotion, and dialog converging on a single physical agent.",
    icon: "robot",
  },
  {
    title: "Model orchestration",
    body: "Specialist models dispatched async, fused behind safety guardrails and deterministic rules.",
    icon: "orchestrate",
  },
  {
    title: "Real-time systems",
    body: "WebSocket full-duplex, streaming token ingestion, and observable state for high-frequency updates.",
    icon: "realtime",
  },
];
