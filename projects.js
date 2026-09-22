window.PORTFOLIO_PROJECTS = Object.freeze([
  {
    id: "zeta-e-procurement", featured: true, number: "01", kind: ["web", "api"], category: "Academic project · Procurement", title: "ZETA E-Procurement",
    summary: "Integrated goods and services procurement project covering vendors, tenders, bidding, digital contracts, audit logs, document exports, and notifications.",
    role: "Team Lead · Backend · Database · Authentication · Deployment", stack: ["Laravel", "PHP", "MySQL", "JWT Authentication", "Blade", "Tailwind CSS"],
    problem: "Procurement workflows need one connected system for vendors, tenders, bids, contracts, and records.", solution: "Built Laravel/PHP backend flows, a MySQL database, JWT authentication, an admin interface, and mobile API integration with a five-person academic team.",
    highlights: ["REST API", "JWT authentication", "MySQL relational data", "Vendor, tender, and bidding workflows", "Mobile integration"],
    github: "https://github.com/chandra7251/e-tender", playStore: "https://play.google.com/store/apps/details?id=com.vandrafcy.zeta", note: "Academic final project with a five-person team."
  },
  {
    id: "coffee-karawang", featured: true, number: "02", kind: ["web"], category: "Directory · Fullstack web", title: "Coffee Karawang",
    summary: "Karawang cafe and coffeeshop directory for comparing categories, facilities, menus, reviews, and locations.",
    role: "Fullstack development", stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Supabase"],
    problem: "Local cafe information is scattered and hard to compare before visiting.", solution: "Built a searchable directory with authentication, reviews, bookmarks, maps, API routes, and an admin dashboard.",
    highlights: ["Next.js and TypeScript", "PostgreSQL with Prisma", "Search and filtering", "Reviews and bookmarks", "Map integration", "Admin dashboard"],
    github: "https://github.com/chandra7251/coffe_karawang", demo: "https://kopikarawang.vercel.app", note: "Public fullstack directory project."
  },
  {
    id: "casher-and-owner", featured: true, number: "03", kind: ["web"], category: "POS · Web application", title: "Cashier & Owner",
    summary: "Cafe POS application connecting cashier transactions with owner sales monitoring and operations.",
    role: "Fullstack development", stack: ["Laravel", "Inertia", "React", "MySQL"],
    problem: "Cafe staff and owners need connected transaction and sales-monitoring workflows.", solution: "Built POS transactions, an owner dashboard, and supporting data flows in Laravel, Inertia, React, and MySQL.",
    highlights: ["Cashier transactions", "Owner dashboard", "Sales monitoring", "Laravel and React integration", "MySQL data model"],
    github: "https://github.com/chandra7251/casher_and_owner", note: "Cafe POS project."
  },
  {
    id: "e-procurement-api", featured: true, number: "04", kind: ["api"], category: "Backend · REST API", title: "E-Procurement API",
    summary: "Backend services for authentication, tenders, bidding, results, and purchase orders.",
    role: "Backend development", stack: ["Laravel", "PHP", "MySQL"],
    problem: "Procurement clients need structured services for core tender and purchasing workflows.", solution: "Implemented backend endpoints and data flows for procurement operations.",
    highlights: ["Authentication", "Tender and bidding services", "Purchase-order workflow", "Laravel and MySQL"],
    github: "https://github.com/chandra7251/e-procurement-api", note: "Backend-focused project."
  },
  {
    id: "hunter-log", featured: true, number: "05", kind: ["mobile"], category: "Mobile · Fitness", title: "Hunter-Log",
    summary: "Gym tracker for logging workout progress and building exercise habits.",
    role: "Mobile development", stack: ["Ionic", "TypeScript", "SQLite"],
    problem: "Workout progress needs a focused mobile log that works with local training data.", solution: "Built an Ionic and TypeScript application with SQLite storage for workout tracking.",
    highlights: ["Ionic mobile app", "TypeScript", "SQLite local storage", "Google Play release"],
    github: "https://github.com/chandra7251/Hunter-Log", playStore: "https://play.google.com/store/apps/details?id=com.chandra.hunterlog", note: "Published on Google Play Store."
  },
  {
    id: "mobile-e-tender", featured: false, number: "06", kind: ["mobile"], category: "Mobile · Procurement", title: "Mobile E-Tender",
    summary: "Mobile companion project for accessing e-tender data and procurement workflows.", role: "Mobile development", stack: ["Ionic", "TypeScript", "Capacitor", "REST API"],
    problem: "Procurement information must remain available in a mobile workflow.", solution: "Built a mobile companion using Ionic, TypeScript, Capacitor, and REST API integration.", highlights: ["Ionic", "Capacitor", "REST API integration"],
    github: "https://github.com/chandra7251/mobile_e-tender", note: "Mobile companion for final-project procurement work."
  },
  {
    id: "keuanganku", featured: false, number: "07", kind: ["web"], category: "Web · Finance", title: "KeuanganKu",
    summary: "Student finance tracker with monitoring, analytics, reminders, and reports.", role: "Fullstack development", stack: ["Laravel", "MySQL", "Chart.js"],
    problem: "Students need a clear view of personal financial activity.", solution: "Built finance-tracking workflows, monitoring, reports, and analytics.", highlights: ["Financial monitoring", "Reports", "Laravel and MySQL"],
    github: "https://github.com/chandra7251/KeuanganKu", note: "Personal finance project."
  },
  {
    id: "visualearn", featured: false, number: "08", kind: ["ux"], category: "UX design · Accessibility", title: "VisuaLearn",
    summary: "Accessible university learning concept for Deaf students using real-time transcription and source-linked AI summaries.", role: "Team Lead · UX Designer", stack: ["Figma", "FigJam", "UX Research", "Usability Testing", "WCAG 2.2"],
    problem: "Deaf students need more structured access to classroom conversations and review material.", solution: "Led research, co-design, user flows, high-fidelity prototyping, and two usability-testing iterations.", highlights: ["Accessibility research", "Co-design", "Usability testing", "WCAG 2.2"],
    proposal: "assets/Proposal_VisuaLearn_GEMASTIK2026.pdf", note: "GEMASTIK XIX 2026 academic competition proposal."
  }
]);
