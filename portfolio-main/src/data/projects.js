export const projects = [
  {
    id: "cloud-security-scanner",
    title: "Cloud Security Scanner",
    category: "Cloud Security / DevSecOps",
    shortDescription: "An automated cloud security scanner that identifies misconfigurations, vulnerabilities, and compliance risks across AWS, Azure, and GCP.",
    tags: ["React", "FastAPI", "Python", "Docker", "Cloud Security"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://ai-cloud-security.vercel.app",
    caseStudy: {
      overview: "AI Cloud Security Scanner is a modern dashboard that automatically scans cloud environments to identify security vulnerabilities, misconfigurations, and compliance risks, helping organizations protect their cloud infrastructure.",
      challenge: "Providing unified real-time visibility across multi-cloud environments (AWS, Azure, GCP) to remediate security risks before exploitation.",
      approach: "Designed automated scanning pipelines with FastAPI backend, structured security policy checks, and a responsive frontend dashboard.",
      solution: "Implemented comprehensive security misconfiguration detection, compliance scoring, and guided remediation workflows.",
      technologies: ["React", "FastAPI", "Python", "Docker", "AWS/Azure/GCP", "REST API"],
      outcome: "Successfully deployed and live, delivering instant risk assessment and clear actionable guidance for cloud security hardening."
    }
  },
  {
    id: "wildlife-news",
    title: "Wildlife News (WildTN)",
    category: "AI Intelligence / Environmental News",
    shortDescription: "A Tamil Nadu Wildlife & Forest News Aggregator with automated news collection, AI classification, conflict level scoring, and PDF digests.",
    tags: ["React", "FastAPI", "Python", "NLP", "ReportLab"],
    image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://tnwildlife-news.vercel.app/",
    caseStudy: {
      overview: "WildTN-News is a fullstack AI-powered news intelligence platform dedicated to aggregating, analyzing, and reporting wildlife news, human-animal conflict alerts, and forest department bulletins across Tamil Nadu.",
      challenge: "Aggregating scattered Tamil and English environmental news in real-time and scoring human-wildlife conflict severity.",
      approach: "Built automated web scrapers with 15-minute periodic scanning, NLP classification, and bilingual (Tamil/English) executive summaries.",
      solution: "Developed an interactive intelligence analytics dashboard and automated PDF bulletin generator using ReportLab.",
      technologies: ["React", "Vite", "FastAPI", "Python", "APScheduler", "ReportLab", "NLP"],
      outcome: "Deployed live platform providing instant conflict severity tracking and downloadable executive wildlife bulletins."
    }
  },
  {
    id: "attendance-monitor",
    title: "Attendance Monitor",
    category: "Fullstack & Mobile / Biometrics",
    shortDescription: "An automated attendance monitoring system to track employee login/logout times using fingerprint authentication and automated reporting.",
    tags: ["FastAPI", "Python", "PostgreSQL", "Flutter", "Docker"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://attendance-monitor-alpha.vercel.app/",
    caseStudy: {
      overview: "Developed an automated attendance system adopting Clean Architecture for the FastAPI backend, integrated with Flutter for cross-platform support and biometric fingerprint verification.",
      challenge: "Eliminating time theft and manual attendance overhead while providing reliable hours calculation and automated reporting.",
      approach: "Built clean layered architecture with repository patterns, JWT authentication, and automated daily/monthly report generation.",
      solution: "Containerized with Docker and PostgreSQL, creating a secure, flexible, and maintainable biometric tracking platform.",
      technologies: ["FastAPI", "Python", "PostgreSQL", "SQLAlchemy", "Alembic", "Flutter", "Docker"],
      outcome: "Delivered a live attendance monitoring prototype with automated time recording and reliable analytics."
    }
  },
  {
    id: "red-ball-game",
    title: "Red Ball Game",
    category: "Web Gaming / Interactive Physics",
    shortDescription: "An interactive physics-based 2D platformer ball game with responsive mechanics, obstacle navigation, and smooth canvas graphics.",
    tags: ["JavaScript", "HTML5 Canvas", "CSS3", "Physics Engine"],
    image: "https://images.unsplash.com/photo-1612287233207-68b321550c60?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://red-ball-game.vercel.app",
    caseStudy: {
      overview: "An engaging 2D platformer web game built from scratch using vanilla JavaScript and HTML5 Canvas with custom physics simulation and dynamic obstacle gameplay.",
      challenge: "Building responsive physics, fluid collision detection, and smooth frame-rate controls without heavyweight game engines.",
      approach: "Engineered custom velocity, friction, gravity, and particle systems optimized for desktop and mobile browsers.",
      solution: "Crafted interactive level layouts, responsive touch/keyboard controls, sound effects, and scoring mechanisms.",
      technologies: ["JavaScript ES6+", "HTML5 Canvas", "CSS3", "Game Physics", "Audio API"],
      outcome: "Live and playable on Vercel, providing an addictive 60fps retro platformer experience across all screen sizes."
    }
  },
  {
    id: "medai",
    title: "MED AI",
    category: "AI Chatbot / Healthcare",
    shortDescription: "An AI-powered healthcare assistant that simplifies medical understanding through conversational interactions, prescription analysis, and document support.",
    tags: ["OpenAI GPT-4", "OpenCV", "FastAPI", "NLP", "Supabase"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://med-ai.vercel.app",
    caseStudy: {
      overview: "MED AI is an intelligent healthcare assistant designed to help users understand symptoms, analyze medical prescriptions, and answer health questions with AI-driven support.",
      challenge: "Making complex medical information accessible and understandable while ensuring safe and accurate guidance.",
      approach: "Integrated OpenAI Vision APIs with OpenCV image preprocessing to decode prescription photos and medical documents.",
      solution: "Built a conversational assistant with structured medical Q&A, token-optimized responses, and safety disclaimers.",
      technologies: ["OpenAI API", "OpenCV (cv2)", "FastAPI", "Python", "NLP", "Supabase"],
      outcome: "Deployed live assistant offering approachable healthcare exploration and intelligent document support."
    }
  }
];
