import {
  PrismaClient,
  EmploymentType,
  WorkMode,
  ProjectStatus,
  ProductStatus,
  BlogStatus,
  SkillLevel,
  RequestStatus,
  OrderStatus,
  LeadStatus,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  console.log("🌱 Seeding database with Binod Gautam's portfolio data...");

  // ─────────────────────────────────────────────────────────
  // Admin User
  // ─────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "gautambinod629@gmail.com" },
    update: {},
    create: {
      name: "Binod Gautam",
      email: "gautambinod629@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // ─────────────────────────────────────────────────────────
  // Site Settings
  // ─────────────────────────────────────────────────────────
  const existingSettings = await prisma.siteSettings.findFirst();
  if (!existingSettings) {
    await prisma.siteSettings.create({
      data: {
        siteName: "Binod Gautam",
        siteTagline: "Full Stack Developer",
        siteDescription:
          "Full Stack Developer with 2.5+ years of experience building scalable, production-ready applications across frontend and backend systems. Proficient in React.js, Next.js, TypeScript, NestJS, and Express.js.",
        siteEmail: "gautambinod629@gmail.com",
        sitePhone: "+977 9815835831",
        siteCountry: "Nepal",
        currency: "USD",
        timezone: "Asia/Kathmandu",
      },
    });
  }

  // ─────────────────────────────────────────────────────────
  // Hero Section
  // ─────────────────────────────────────────────────────────
  const existingHero = await prisma.heroSection.findFirst();
  if (!existingHero) {
    await prisma.heroSection.create({
      data: {
        greeting: "Hi, I'm",
        title: "Binod Gautam",
        highlightedText: "Full Stack Developer",
        subtitle:
          "Building scalable frontend interfaces and robust backend architectures.",
        description:
          "Full Stack Developer with 2.5+ years of experience building scalable, production-ready applications across frontend and backend systems. Proficient in React.js, Next.js, TypeScript, NestJS, and Express.js.",
        primaryCTAText: "View My Work",
        primaryCTAUrl: "/projects",
        secondaryCTAText: "Hire Me",
        secondaryCTAUrl: "/contact",
        isActive: true,
      },
    });
  } else {
    await prisma.heroSection.update({
      where: { id: existingHero.id },
      data: {
        highlightedText: "Full Stack Developer",
        subtitle:
          "Building scalable frontend interfaces and robust backend architectures.",
        description:
          "Full Stack Developer with 2.5+ years of experience building scalable, production-ready applications across frontend and backend systems. Proficient in React.js, Next.js, TypeScript, NestJS, and Express.js.",
      }
    });
  }

  // ─────────────────────────────────────────────────────────
  // Statistics
  // ─────────────────────────────────────────────────────────
  const statsCount = await prisma.statistic.count();
  if (statsCount === 0) {
    const stats = [
      { label: "Years of Experience", value: "2.5", suffix: "+", icon: "Calendar", displayOrder: 1 },
      { label: "Projects Completed", value: "5", suffix: "+", icon: "CheckCircle", displayOrder: 2 },
      { label: "Companies Worked With", value: "2", suffix: "", icon: "Building", displayOrder: 3 },
      { label: "Technologies Mastered", value: "20", suffix: "+", icon: "Code2", displayOrder: 4 },
    ];
    for (const stat of stats) {
      await prisma.statistic.create({ data: stat });
    }
  }

  // ─────────────────────────────────────────────────────────
  // About Section
  // ─────────────────────────────────────────────────────────
  const existingAbout = await prisma.aboutSection.findFirst();
  if (!existingAbout) {
    await prisma.aboutSection.create({
      data: {
        headline: "Full Stack Developer building scalable, production-ready applications",
        biography:
          "<p>I'm Binod Gautam, a Full Stack Developer with over 2.5 years of experience building scalable, production-ready applications across frontend and backend systems.</p><p>I'm proficient in React.js, Next.js, TypeScript, NestJS, and Express.js, with hands-on experience in real-time systems, API architecture, and database optimization. I'm also familiar with CI/CD pipelines using GitHub Actions and cloud deployment on AWS (EC2, S3).</p><p>From map-based PWAs with real-time tracking to HRM systems and job portals, I enjoy solving problems that span the full stack — optimizing state management, designing modular architectures, and shipping features that hold up in production.</p>",
        location: "Nepal",
        availability: "Available for freelance & full-time opportunities",
        yearsOfExp: 3,
        isActive: true,
      },
    });
  }

  // ─────────────────────────────────────────────────────────
  // Social Links
  // ─────────────────────────────────────────────────────────
  const socialCount = await prisma.socialLink.count();
  if (socialCount === 0) {
    const socialLinks = [
      { platform: "GitHub", url: "https://github.com/gautam-629", icon: "Github", displayOrder: 1 },
      { platform: "LinkedIn", url: "https://linkedin.com/in/gautam-629", icon: "Linkedin", displayOrder: 2 },
      { platform: "Email", url: "mailto:gautambinod629@gmail.com", icon: "Mail", displayOrder: 3 },
    ];
    for (const link of socialLinks) {
      await prisma.socialLink.create({ data: link });
    }
  }

  // ─────────────────────────────────────────────────────────
  // Skill Categories + Skills
  // ─────────────────────────────────────────────────────────
  async function ensureCategory(name: string, slug: string, icon: string, displayOrder: number) {
    let cat = await prisma.skillCategory.findUnique({ where: { slug } });
    if (!cat) {
      cat = await prisma.skillCategory.create({ data: { name, slug, icon, displayOrder } });
    }
    return cat;
  }

  const frontendCat = await ensureCategory("Frontend", "frontend", "Monitor", 1);
  const backendCat = await ensureCategory("Backend", "backend", "Server", 2);
  const languagesCat = await ensureCategory("Languages", "languages", "FileCode", 3);
  const dbCat = await ensureCategory("Databases & ORM", "databases", "Database", 4);
  const devopsCat = await ensureCategory("DevOps & Cloud", "devops", "Cloud", 5);
  const toolsCat = await ensureCategory("Tools & Practices", "tools", "Wrench", 6);

  const skillsData = [
    // Frontend
    { name: "React.js", slug: "react", categoryId: frontendCat.id, level: SkillLevel.EXPERT, proficiency: 95, yearsOfExp: 2.5, featured: true, displayOrder: 1 },
    { name: "Next.js", slug: "nextjs", categoryId: frontendCat.id, level: SkillLevel.EXPERT, proficiency: 90, yearsOfExp: 2, featured: true, displayOrder: 2 },
    { name: "TypeScript", slug: "typescript", categoryId: frontendCat.id, level: SkillLevel.ADVANCED, proficiency: 88, yearsOfExp: 2, featured: true, displayOrder: 3 },
    { name: "Redux", slug: "redux", categoryId: frontendCat.id, level: SkillLevel.ADVANCED, proficiency: 85, yearsOfExp: 2, displayOrder: 4 },
    { name: "TanStack Query", slug: "tanstack-query", categoryId: frontendCat.id, level: SkillLevel.ADVANCED, proficiency: 85, yearsOfExp: 1.5, displayOrder: 5 },
    { name: "Zustand", slug: "zustand", categoryId: frontendCat.id, level: SkillLevel.ADVANCED, proficiency: 80, yearsOfExp: 1, displayOrder: 6 },
    { name: "Tailwind CSS", slug: "tailwind-css", categoryId: frontendCat.id, level: SkillLevel.EXPERT, proficiency: 92, yearsOfExp: 2.5, displayOrder: 7 },
    { name: "Ant Design", slug: "ant-design", categoryId: frontendCat.id, level: SkillLevel.ADVANCED, proficiency: 80, yearsOfExp: 1.5, displayOrder: 8 },
    { name: "ShadCN UI", slug: "shadcn-ui", categoryId: frontendCat.id, level: SkillLevel.ADVANCED, proficiency: 82, yearsOfExp: 1, displayOrder: 9 },
    { name: "Mantine UI", slug: "mantine-ui", categoryId: frontendCat.id, level: SkillLevel.ADVANCED, proficiency: 80, yearsOfExp: 1, displayOrder: 10 },
    { name: "Leaflet.js", slug: "leafletjs", categoryId: frontendCat.id, level: SkillLevel.ADVANCED, proficiency: 78, yearsOfExp: 1, displayOrder: 11 },
    { name: "Fabric.js", slug: "fabricjs", categoryId: frontendCat.id, level: SkillLevel.INTERMEDIATE, proficiency: 72, yearsOfExp: 0.5, displayOrder: 12 },

    // Backend
    { name: "Node.js", slug: "nodejs", categoryId: backendCat.id, level: SkillLevel.ADVANCED, proficiency: 88, yearsOfExp: 2.5, featured: true, displayOrder: 1 },
    { name: "Express.js", slug: "expressjs", categoryId: backendCat.id, level: SkillLevel.ADVANCED, proficiency: 88, yearsOfExp: 2.5, featured: true, displayOrder: 2 },
    { name: "NestJS", slug: "nestjs", categoryId: backendCat.id, level: SkillLevel.ADVANCED, proficiency: 85, yearsOfExp: 1.5, featured: true, displayOrder: 3 },
    { name: "Socket.io", slug: "socketio", categoryId: backendCat.id, level: SkillLevel.ADVANCED, proficiency: 84, yearsOfExp: 1.5, displayOrder: 4 },

    // Languages
    { name: "JavaScript (ES6+)", slug: "javascript", categoryId: languagesCat.id, level: SkillLevel.EXPERT, proficiency: 92, yearsOfExp: 2.5, displayOrder: 1 },
    { name: "TypeScript", slug: "typescript-lang", categoryId: languagesCat.id, level: SkillLevel.ADVANCED, proficiency: 88, yearsOfExp: 2, displayOrder: 2 },

    // Databases & ORM
    { name: "PostgreSQL", slug: "postgresql", categoryId: dbCat.id, level: SkillLevel.ADVANCED, proficiency: 85, yearsOfExp: 1.5, featured: true, displayOrder: 1 },
    { name: "MySQL", slug: "mysql", categoryId: dbCat.id, level: SkillLevel.ADVANCED, proficiency: 80, yearsOfExp: 2, displayOrder: 2 },
    { name: "MongoDB", slug: "mongodb", categoryId: dbCat.id, level: SkillLevel.INTERMEDIATE, proficiency: 75, yearsOfExp: 1, displayOrder: 3 },
    { name: "Prisma ORM", slug: "prisma-orm", categoryId: dbCat.id, level: SkillLevel.ADVANCED, proficiency: 85, yearsOfExp: 1.5, displayOrder: 4 },
    { name: "TypeORM", slug: "typeorm", categoryId: dbCat.id, level: SkillLevel.INTERMEDIATE, proficiency: 75, yearsOfExp: 1, displayOrder: 5 },

    // DevOps & Cloud
    { name: "GitHub Actions (CI/CD)", slug: "github-actions", categoryId: devopsCat.id, level: SkillLevel.INTERMEDIATE, proficiency: 75, yearsOfExp: 1, displayOrder: 1 },
    { name: "AWS (EC2, S3)", slug: "aws", categoryId: devopsCat.id, level: SkillLevel.INTERMEDIATE, proficiency: 72, yearsOfExp: 1, displayOrder: 2 },
    { name: "Docker", slug: "docker", categoryId: devopsCat.id, level: SkillLevel.INTERMEDIATE, proficiency: 70, yearsOfExp: 1, displayOrder: 3 },

    // Tools & Practices
    { name: "Git", slug: "git", categoryId: toolsCat.id, level: SkillLevel.EXPERT, proficiency: 90, yearsOfExp: 2.5, displayOrder: 1 },
    { name: "Postman", slug: "postman", categoryId: toolsCat.id, level: SkillLevel.ADVANCED, proficiency: 85, yearsOfExp: 2.5, displayOrder: 2 },
    { name: "REST API Design", slug: "rest-api-design", categoryId: toolsCat.id, level: SkillLevel.ADVANCED, proficiency: 88, yearsOfExp: 2.5, displayOrder: 3 },
    { name: "Responsive Design", slug: "responsive-design", categoryId: toolsCat.id, level: SkillLevel.ADVANCED, proficiency: 90, yearsOfExp: 2.5, displayOrder: 4 },
    { name: "SEO Optimization", slug: "seo-optimization", categoryId: toolsCat.id, level: SkillLevel.ADVANCED, proficiency: 85, yearsOfExp: 2.5, displayOrder: 5 },
    { name: "State Management", slug: "state-management", categoryId: toolsCat.id, level: SkillLevel.ADVANCED, proficiency: 88, yearsOfExp: 2.5, displayOrder: 6 },
  ];

  for (const skill of skillsData) {
    await prisma.skill.upsert({
      where: { slug: skill.slug },
      update: {
        name: skill.name,
        level: skill.level,
        proficiency: skill.proficiency,
        yearsOfExp: skill.yearsOfExp,
        displayOrder: skill.displayOrder,
        featured: skill.featured,
        categoryId: skill.categoryId,
      },
      create: skill,
    });
  }

  // ─────────────────────────────────────────────────────────
  // Experience
  // ─────────────────────────────────────────────────────────
  const expCount = await prisma.experience.count();
  if (expCount === 0) {
    await prisma.experience.create({
      data: {
        companyName: "RPA Nepal Pvt. Ltd.",
        jobTitle: "Full Stack Developer",
        employmentType: EmploymentType.FULL_TIME,
        workMode: WorkMode.ONSITE,
        location: "Nepal",
        startDate: new Date("2024-04-01"),
        currentlyWorking: true,
        shortDescription:
          "Building scalable web applications, real-time systems, and dashboard products using React, Next.js, Express, and NestJS.",
        description:
          "Developing scalable web applications and dashboard systems with React, Next.js, TypeScript, Express, and NestJS, including a map-based PWA and real-time communication features.",
        responsibilities: JSON.stringify([
          "Developed scalable web applications using React, Next.js, TypeScript, Express, and NestJS, including a map-based PWA with Leaflet.js, improving performance through optimized state management, lazy loading, and efficient API integration",
          "Implemented real-time communication features using Socket.io with Express.js, enabling low-latency bi-directional messaging with reliable WebSocket handling",
          "Designed modular frontend and backend architectures for HRM and dashboard systems using React Query, Redux, and NestJS, reducing redundant API calls and improving data consistency",
          "Optimized existing applications by refactoring UI components, enhancing state management flow, restructuring API calls, and improving SEO and routing through Next.js migration",
          "Developed a Photo Booth management system with admin and user dashboards, including dynamic booth configuration and a frame editor built with Fabric.js for image upload, rotation, resizing, and precise positioning",
        ]),
        achievements: JSON.stringify([
          "Improved application performance through optimized state management and lazy loading",
          "Reduced redundant API calls and improved data consistency across HRM and dashboard systems",
          "Built a custom Fabric.js-based frame editor for a Photo Booth product",
        ]),
        technologies: JSON.stringify([
          "React",
          "Next.js",
          "TypeScript",
          "Express.js",
          "NestJS",
          "Socket.io",
          "Leaflet.js",
          "Fabric.js",
          "React Query",
          "Redux",
        ]),
        featured: true,
        displayOrder: 1,
      },
    });

    await prisma.experience.create({
      data: {
        companyName: "Jobaxle Pvt. Ltd.",
        jobTitle: "Full Stack Developer",
        employmentType: EmploymentType.FULL_TIME,
        workMode: WorkMode.ONSITE,
        location: "Nepal",
        startDate: new Date("2023-09-01"),
        endDate: new Date("2024-04-01"),
        currentlyWorking: false,
        shortDescription:
          "Built a responsive, SEO-friendly job portal with search, filtering, a resume builder, and OAuth login.",
        description:
          "Developed responsive and SEO-friendly job portal pages using Next.js, Mantine UI, and PostgreSQL, with features supporting job search, filtering, and resume building.",
        responsibilities: JSON.stringify([
          "Developed responsive and SEO-friendly job portal pages using Next.js, Mantine UI, and PostgreSQL",
          "Built features including filtering, search, and a resume builder to improve user experience",
          "Implemented OAuth login (Google, GitHub) and integrated APIs with caching strategies using TanStack Query",
        ]),
        achievements: JSON.stringify([
          "Shipped a full job portal with search, filtering, and resume builder features",
          "Implemented multi-provider OAuth login (Google, GitHub)",
        ]),
        technologies: JSON.stringify([
          "Next.js",
          "Mantine UI",
          "PostgreSQL",
          "Prisma",
          "TanStack Query",
          "OAuth",
        ]),
        featured: true,
        displayOrder: 2,
      },
    });
  }

  // ─────────────────────────────────────────────────────────
  // Education
  // ─────────────────────────────────────────────────────────
  const eduCount = await prisma.education.count();
  if (eduCount === 0) {
    await prisma.education.create({
      data: {
        institution: "Tribhuvan University",
        degree: "BCA",
        fieldOfStudy: "Bachelor of Computer Applications",
        startDate: new Date("2019-10-01"),
        endDate: new Date("2023-11-01"),
        current: false,
        displayOrder: 1,
        isActive: true,
      },
    });
  }

  // ─────────────────────────────────────────────────────────
  // Services
  // ─────────────────────────────────────────────────────────
  const serviceCount = await prisma.service.count();
  if (serviceCount === 0) {
    const services = [
      {
        title: "Full Stack Web Development",
        slug: "full-stack-web-development",
        icon: "Code",
        shortDesc: "End-to-end web application development with React, Next.js, and Node.js",
        description:
          "<p>I build complete web applications from database to UI, specializing in React.js, Next.js, TypeScript, Express.js, and NestJS — with a focus on clean architecture and maintainable code.</p>",
        features: JSON.stringify([
          "Responsive, SEO-friendly UI",
          "REST API design & development",
          "Database schema design & optimization",
          "Authentication & authorization (OAuth, JWT)",
          "Cloud deployment on AWS",
        ]),
        startingPrice: 800,
        priceUnit: "per project",
        timeline: "2-6 weeks",
        featured: true,
        displayOrder: 1,
      },
      {
        title: "Real-Time Application Development",
        slug: "real-time-application-development",
        icon: "Zap",
        shortDesc: "Real-time, bi-directional features powered by Socket.io and WebSockets",
        description:
          "<p>I build real-time systems — live chat, notifications, and dashboards — using Socket.io with Express.js or NestJS for low-latency, reliable communication.</p>",
        features: JSON.stringify([
          "WebSocket-based real-time messaging",
          "Live dashboards & notifications",
          "Optimized state management for real-time data",
          "Scalable Socket.io architecture",
        ]),
        startingPrice: 600,
        priceUnit: "per project",
        timeline: "1-4 weeks",
        featured: true,
        displayOrder: 2,
      },
      {
        title: "API Architecture & Database Optimization",
        slug: "api-architecture-database-optimization",
        icon: "Database",
        shortDesc: "Modular API design, caching strategies, and database performance tuning",
        description:
          "<p>I design modular, well-structured backend APIs with NestJS or Express.js, and optimize database queries and schema design across PostgreSQL, MySQL, and MongoDB.</p>",
        features: JSON.stringify([
          "Modular API architecture",
          "Caching strategies with TanStack Query",
          "Database indexing & query optimization",
          "ORM setup (Prisma, TypeORM)",
        ]),
        startingPrice: 500,
        priceUnit: "per project",
        timeline: "1-3 weeks",
        displayOrder: 3,
      },
    ];
    for (const service of services) {
      await prisma.service.create({ data: service });
    }
  }

  // ─────────────────────────────────────────────────────────
  // Project Categories
  // ─────────────────────────────────────────────────────────
  async function ensureProjectCategory(name: string, slug: string, displayOrder: number) {
    let cat = await prisma.projectCategory.findUnique({ where: { slug } });
    if (!cat) {
      cat = await prisma.projectCategory.create({ data: { name, slug, displayOrder } });
    }
    return cat;
  }

  const webAppCat = await ensureProjectCategory("Web App", "web-app", 1);
  const mobileAppCat = await ensureProjectCategory("Mobile-Friendly App", "mobile-friendly-app", 2);
  const hrmCat = await ensureProjectCategory("HRM Software", "hrm-software", 3);

  // ─────────────────────────────────────────────────────────
  // Projects
  // ─────────────────────────────────────────────────────────
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    const projects = [
      {
        title: "Kumeji Map",
        slug: "kumeji-map",
        shortDescription: "Interactive tourism map with 3D/VR experiences and quizzes.",
        description:
          "<p>An interactive tourism map built with React and Leaflet.js, featuring 3D/VR experiences and gamified quizzes to help users explore destinations in a more engaging way.</p>",
        technologies: JSON.stringify(["React", "Leaflet.js", "Tailwind CSS"]),
        features: JSON.stringify([
          "Interactive map with custom markers and overlays",
          "3D/VR destination previews",
          "Gamified quizzes for tourist spots",
          "Optimized performance with lazy loading",
        ]),
        categoryId: webAppCat.id,
        status: ProjectStatus.COMPLETED,
        featured: true,
        githubUrl: "https://github.com/gautam-629/kumeji-map",
        displayOrder: 1,
      },
      {
        title: "connexo.app",
        slug: "connexo",
        shortDescription: "Real-time chat application with low-latency messaging.",
        description:
          "<p>A real-time chat application built with React.js, TypeScript, Socket.io, and Express.js, supporting low-latency bi-directional messaging with reliable WebSocket handling.</p>",
        technologies: JSON.stringify(["React.js", "TypeScript", "Socket.io", "Express.js"]),
        features: JSON.stringify([
          "Real-time bi-directional messaging",
          "Reliable WebSocket connection handling",
          "Typed, scalable frontend architecture",
        ]),
        categoryId: webAppCat.id,
        status: ProjectStatus.COMPLETED,
        featured: true,
        liveUrl: "https://connexo.app",
        githubUrl: "https://github.com/gautam-629/connexo",
        displayOrder: 2,
      },
      {
        title: "Tidy Days",
        slug: "tidy-days",
        shortDescription: "Human Resource Management (HRM) software for teams.",
        description:
          "<p>A full-featured Human Resource Management system built with React.js, NestJS, and RTK Query, designed to streamline employee management, attendance, and HR workflows.</p>",
        technologies: JSON.stringify(["React.js", "NestJS", "RTK Query", "Tailwind CSS"]),
        features: JSON.stringify([
          "Employee management dashboard",
          "Modular frontend and backend architecture",
          "Reduced redundant API calls via RTK Query caching",
        ]),
        categoryId: hrmCat.id,
        status: ProjectStatus.COMPLETED,
        featured: true,
        githubUrl: "https://github.com/gautam-629/tidy-days",
        displayOrder: 3,
      },
      {
        title: "Jobaxle",
        slug: "jobaxle",
        shortDescription: "Job portal with search, filtering, and a resume builder.",
        description:
          "<p>A responsive, SEO-friendly job portal built with Next.js, PostgreSQL, and Prisma. Includes job search, filtering, a resume builder, and OAuth login with Google and GitHub.</p>",
        technologies: JSON.stringify(["Next.js", "PostgreSQL", "Prisma"]),
        features: JSON.stringify([
          "Job search and advanced filtering",
          "Resume builder",
          "OAuth login (Google, GitHub)",
          "API caching with TanStack Query",
        ]),
        categoryId: webAppCat.id,
        status: ProjectStatus.COMPLETED,
        featured: true,
        githubUrl: "https://github.com/gautam-629/jobaxle",
        displayOrder: 4,
      },
      {
        title: "Mobile Khata",
        slug: "mobile-khata",
        shortDescription: "Digital ledger app for tracking transactions.",
        description:
          "<p>A digital ledger (khata) application built with React, Redux, and Express, allowing users to track credit and debit transactions digitally.</p>",
        technologies: JSON.stringify(["React", "Redux", "Tailwind CSS", "Express"]),
        features: JSON.stringify([
          "Digital transaction ledger",
          "Credit/debit tracking",
          "Clean, responsive UI",
        ]),
        categoryId: mobileAppCat.id,
        status: ProjectStatus.COMPLETED,
        featured: false,
        githubUrl: "https://github.com/gautam-629/mobile-khata",
        displayOrder: 5,
      },
    ];

    for (const project of projects) {
      await prisma.project.create({ data: project });
    }
  }

  // ─────────────────────────────────────────────────────────
  // SEO Settings
  // ─────────────────────────────────────────────────────────
  const seoCount = await prisma.seoSettings.count();
  if (seoCount === 0) {
    const seoPages = [
      { page: "home", title: "Binod Gautam | Full Stack Developer" },
      { page: "about", title: "About | Binod Gautam" },
      { page: "projects", title: "Projects | Binod Gautam" },
      { page: "products", title: "Products | Binod Gautam" },
      { page: "services", title: "Services | Binod Gautam" },
      { page: "blog", title: "Blog | Binod Gautam" },
      { page: "contact", title: "Contact | Binod Gautam" },
    ];
    for (const { page, title } of seoPages) {
      await prisma.seoSettings.create({
        data: {
          page,
          metaTitle: title,
          metaDesc:
            "Binod Gautam — Full Stack Developer specializing in React.js, Next.js, TypeScript, NestJS, and Express.js.",
          twitterCard: "summary_large_image",
        },
      });
    }
  }

  // ─────────────────────────────────────────────────────────
  // Certificates
  // ─────────────────────────────────────────────────────────
  const certCount = await prisma.certificate.count();
  if (certCount === 0) {
    const certificates = [
      {
        name: "AWS Certified Developer – Associate",
        issuer: "Amazon Web Services (AWS)",
        issueDate: new Date("2025-06-15"),
        credentialId: "AWS-DEV-ASSOC-12345",
        credentialUrl: "https://aws.amazon.com/verification",
        displayOrder: 1,
      },
      {
        name: "Meta Front-End Developer Professional Certificate",
        issuer: "Meta",
        issueDate: new Date("2023-08-10"),
        credentialId: "META-FE-98765",
        credentialUrl: "https://coursera.org/verify/meta-fe-dev",
        displayOrder: 2,
      },
      {
        name: "Full Stack Web Development Certification",
        issuer: "freeCodeCamp",
        issueDate: new Date("2022-12-05"),
        credentialId: "FCC-FS-54321",
        credentialUrl: "https://freecodecamp.org/certification/binodgautam/full-stack",
        displayOrder: 3,
      },
    ];
    for (const cert of certificates) {
      await prisma.certificate.create({ data: cert });
    }
  }

  // ─────────────────────────────────────────────────────────
  // Product Categories & Products
  // ─────────────────────────────────────────────────────────
  async function ensureProductCategory(name: string, slug: string, displayOrder: number) {
    let cat = await prisma.productCategory.findUnique({ where: { slug } });
    if (!cat) {
      cat = await prisma.productCategory.create({ data: { name, slug, displayOrder } });
    }
    return cat;
  }

  const saasCat = await ensureProductCategory("SaaS Boilerplates", "saas-boilerplates", 1);
  const templatesCat = await ensureProductCategory("UI Templates", "ui-templates", 2);
  const toolsProductCat = await ensureProductCategory("Developer Tools", "developer-tools", 3);

  const productCount = await prisma.product.count();
  if (productCount === 0) {
    const nextjsSaaS = await prisma.product.create({
      data: {
        name: "NextJS SaaS Boilerplate",
        slug: "nextjs-saas-boilerplate",
        tagline: "Ship your SaaS in days, not weeks",
        description: "A comprehensive Next.js boilerplate with integrated Authentication, Prisma ORM, Stripe payments, Tailwind CSS, and Shadcn UI. Get your production-ready SaaS off the ground quickly.",
        price: 99.00,
        discountedPrice: 49.00,
        currency: "USD",
        images: JSON.stringify(["/products/saas-boilerplate-1.png", "/products/saas-boilerplate-2.png"]),
        techStack: JSON.stringify(["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "NextAuth"]),
        userFeatures: JSON.stringify(["Fully configured OAuth", "Pre-designed Landing Page", "Stripe Billing Dashboard", "Dark/Light Mode toggling"]),
        adminFeatures: JSON.stringify(["User Management Dashboard", "Subscription analytics", "Feature toggles"]),
        status: ProductStatus.AVAILABLE,
        featured: true,
        displayOrder: 1,
        categoryId: saasCat.id,
      }
    });

    const portfolioTemplate = await prisma.product.create({
      data: {
        name: "Premium Portfolio Template",
        slug: "premium-portfolio-template",
        tagline: "Stunning modern portfolio for developers",
        description: "A gorgeous, responsive portfolio template built with Next.js, Framer Motion, and Tailwind CSS. Perfect for developers, designers, and creative professionals.",
        price: 39.00,
        discountedPrice: 19.00,
        currency: "USD",
        images: JSON.stringify(["/products/portfolio-1.png", "/products/portfolio-2.png"]),
        techStack: JSON.stringify(["Next.js", "Tailwind CSS", "Framer Motion", "React"]),
        userFeatures: JSON.stringify(["Smooth scroll animations", "Built-in blog engine", "Contact form with SMTP integration"]),
        status: ProductStatus.AVAILABLE,
        featured: true,
        displayOrder: 2,
        categoryId: templatesCat.id,
      }
    });

    const expressNestTool = await prisma.product.create({
      data: {
        name: "NestJS Starter CLI",
        slug: "nestjs-starter-cli",
        tagline: "Generate production NestJS projects instantly",
        description: "A powerful command line tool to bootstrap NestJS APIs with pre-configured JWT authentication, file uploads, mail templates, Docker Compose, and Winston logger.",
        price: 29.00,
        currency: "USD",
        images: JSON.stringify(["/products/cli-1.png"]),
        techStack: JSON.stringify(["Node.js", "NestJS", "Commander.js", "Docker"]),
        status: ProductStatus.AVAILABLE,
        featured: false,
        displayOrder: 3,
        categoryId: toolsProductCat.id,
      }
    });

    // FAQs for NextJS SaaS Boilerplate
    await prisma.productFaq.createMany({
      data: [
        {
          productId: nextjsSaaS.id,
          question: "Can I use this for client projects?",
          answer: "Yes, you can use it for both personal and client projects. The only restriction is that you cannot resell the boilerplate as-is.",
          displayOrder: 1,
        },
        {
          productId: nextjsSaaS.id,
          question: "Does it support database migrations?",
          answer: "Yes, it is fully configured with Prisma ORM and database migrations for PostgreSQL out of the box.",
          displayOrder: 2,
        }
      ]
    });

    // FAQs for Premium Portfolio Template
    await prisma.productFaq.createMany({
      data: [
        {
          productId: portfolioTemplate.id,
          question: "Is it SEO friendly?",
          answer: "Absolutely! It utilizes Next.js Server Components, metadata config, and correct semantic HTML tags for maximum SEO optimization.",
          displayOrder: 1,
        }
      ]
    });

    // Reviews for NextJS SaaS Boilerplate
    await prisma.productReview.createMany({
      data: [
        {
          productId: nextjsSaaS.id,
          reviewerName: "John Doe",
          reviewerEmail: "john@example.com",
          rating: 5,
          title: "Saved me at least 40 hours",
          content: "The authentication and Stripe setup alone are worth the price. Everything was well-documented and easy to customize.",
          verified: true,
          approved: true,
          helpfulCount: 5,
        },
        {
          productId: nextjsSaaS.id,
          reviewerName: "Alice Smith",
          reviewerEmail: "alice@example.com",
          rating: 4,
          title: "Excellent code quality",
          content: "Clean code, logical file structure, and super fast response times. Had some questions about middleware and got them solved immediately.",
          verified: true,
          approved: true,
          helpfulCount: 2,
        }
      ]
    });

    // Reviews for Premium Portfolio Template
    await prisma.productReview.createMany({
      data: [
        {
          productId: portfolioTemplate.id,
          reviewerName: "David Lee",
          reviewerEmail: "david@example.com",
          rating: 5,
          title: "Brilliant animations!",
          content: "The Framer Motion animations are buttery smooth. Customers love my new site layout.",
          verified: true,
          approved: true,
          helpfulCount: 3,
        }
      ]
    });
  }

  // ─────────────────────────────────────────────────────────
  // Working Products
  // ─────────────────────────────────────────────────────────
  const workingProductCount = await prisma.workingProduct.count();
  if (workingProductCount === 0) {
    await prisma.workingProduct.createMany({
      data: [
        {
          name: "TaskFlow Mobile App",
          slug: "taskflow-mobile-app",
          tagline: "Cross-platform productivity tool",
          description: "A fast, offline-first mobile task manager with real-time syncing capabilities, built for individuals and collaborative teams.",
          progress: 65,
          launchDate: new Date("2026-09-01"),
          currentMilestone: "Socket.io real-time synchronization backend",
          features: JSON.stringify(["Offline-first caching", "JWT auth", "Real-time task boards", "Push notifications"]),
          techStack: JSON.stringify(["React Native", "TypeScript", "NestJS", "MongoDB", "SQLite"]),
          status: ProductStatus.UNDER_DEVELOPMENT,
          featured: true,
          displayOrder: 1,
        },
        {
          name: "AI Code Reviewer extension",
          slug: "ai-code-reviewer-extension",
          tagline: "Automated PR reviews directly in VS Code",
          description: "VS Code extension that reviews your changes locally before you commit, highlighting performance bottlenecks and potential security vulnerabilities.",
          progress: 80,
          launchDate: new Date("2026-08-15"),
          currentMilestone: "Beta testing with early access group",
          features: JSON.stringify(["Local AI processing", "Language agnostic", "Performance profiling suggestions", "Inline diff edits"]),
          techStack: JSON.stringify(["VS Code Extension API", "TypeScript", "Ollama", "Rust"]),
          status: ProductStatus.UNDER_DEVELOPMENT,
          featured: true,
          displayOrder: 2,
        }
      ]
    });
  }

  // ─────────────────────────────────────────────────────────
  // Blog Categories & Tags & Blogs
  // ─────────────────────────────────────────────────────────
  async function ensureBlogCategory(name: string, slug: string, displayOrder: number) {
    let cat = await prisma.blogCategory.findUnique({ where: { slug } });
    if (!cat) {
      cat = await prisma.blogCategory.create({ data: { name, slug, displayOrder } });
    }
    return cat;
  }

  const webDevBlogCat = await ensureBlogCategory("Web Development", "web-development", 1);
  const sysDesignBlogCat = await ensureBlogCategory("System Design", "system-design", 2);
  const dbBlogCat = await ensureBlogCategory("Database Optimization", "database-optimization", 3);

  async function ensureBlogTag(name: string, slug: string) {
    let tag = await prisma.blogTag.findUnique({ where: { slug } });
    if (!tag) {
      tag = await prisma.blogTag.create({ data: { name, slug } });
    }
    return tag;
  }

  const reactTag = await ensureBlogTag("React", "react");
  const nextjsTag = await ensureBlogTag("NextJS", "nextjs");
  const socketioTag = await ensureBlogTag("Socket.io", "socketio");
  const postgresTag = await ensureBlogTag("PostgreSQL", "postgresql");
  const systemDesignTag = await ensureBlogTag("System Design", "system-design");

  const blogCount = await prisma.blog.count();
  if (blogCount === 0) {
    const blog1 = await prisma.blog.create({
      data: {
        title: "Mastering Real-Time Applications with Next.js and Socket.io",
        slug: "mastering-real-time-applications-with-nextjs-and-socketio",
        excerpt: "Learn how to build low-latency, scalable bi-directional communication systems in Next.js projects using Socket.io.",
        content: "<p>Real-time features have become a core requirement for modern web applications. From live chat clients and notification feeds to real-time collaboration dashboards, users expect instantaneous feedback.</p><p>In this post, we explore how to seamlessly integrate Socket.io into a Next.js application, set up a custom Express server handling WebSocket connections, and implement robust event emitter and listener loops.</p><p>We will also cover socket reconnection fallback algorithms, heartbeat pings, and horizontal scaling strategies utilizing Redis Adapter for message distribution across multiple node instances.</p>",
        categoryId: webDevBlogCat.id,
        status: BlogStatus.PUBLISHED,
        publishedAt: new Date("2026-05-10"),
        readTimeMin: 8,
        featured: true,
        viewCount: 150,
      }
    });

    const blog2 = await prisma.blog.create({
      data: {
        title: "PostgreSQL Performance Optimization Tips for Developers",
        slug: "postgresql-performance-optimization-tips-for-developers",
        excerpt: "Improve your SQL query performance, understand execution plans, and structure indexes effectively in PostgreSQL databases.",
        content: "<p>Databases are the heart of web applications, yet they are frequently the main performance bottleneck. Often, slow response times aren't caused by server capacity limits but by suboptimal schema design and poorly written queries.</p><p>In this tutorial, we will look at using EXPLAIN ANALYZE to analyze query execution strategies, configuring B-Tree and GIN indexes, optimizing partial index schemas, and structuring multi-column keys appropriately.</p><p>Additionally, we will discuss how ORMs like Prisma handle relation joins and how developer-driven query caching reduces database load.</p>",
        categoryId: dbBlogCat.id,
        status: BlogStatus.PUBLISHED,
        publishedAt: new Date("2026-06-02"),
        readTimeMin: 12,
        featured: true,
        viewCount: 320,
      }
    });

    const blog3 = await prisma.blog.create({
      data: {
        title: "Microservices vs Monoliths: A Practical Decision Framework",
        slug: "microservices-vs-monoliths-practical-decision-framework",
        excerpt: "Avoid over-engineering your backend. Let's look at the trade-offs between monolithic architecture and microservices.",
        content: "<p>Starting a new project with microservices is one of the most common architecture mistakes in recent years. While microservices offer scaling independence, they introduce significant network latency, distributed transaction complexity, and massive DevOps overhead.</p><p>This article reviews a practical framework deciding when to stick with a modular monolith and when to shift specific domain boundaries into separate microservices. We explore database sharing strategies, API gateways, and asynchronous event bus messaging protocols.</p>",
        categoryId: sysDesignBlogCat.id,
        status: BlogStatus.DRAFT,
        readTimeMin: 10,
        featured: false,
      }
    });

    // Relate blogs to tags
    await prisma.blogToTag.createMany({
      data: [
        { blogId: blog1.id, tagId: reactTag.id },
        { blogId: blog1.id, tagId: nextjsTag.id },
        { blogId: blog1.id, tagId: socketioTag.id },
        { blogId: blog2.id, tagId: postgresTag.id },
        { blogId: blog2.id, tagId: systemDesignTag.id },
        { blogId: blog3.id, tagId: systemDesignTag.id },
      ]
    });

    // Add comments
    await prisma.comment.createMany({
      data: [
        {
          blogId: blog1.id,
          name: "Emily White",
          email: "emily@example.com",
          content: "This was extremely clear. I had issues getting Socket.io to work with Next.js App Router, and your explanation of splitting out the WebSocket server was exactly what I needed.",
          approved: true,
        },
        {
          blogId: blog1.id,
          name: "Michael Chen",
          email: "mike@example.com",
          content: "How does this scale when using serverless hosting like Vercel? Do we need to run a standalone server for the socket connection?",
          approved: true,
        },
        {
          blogId: blog2.id,
          name: "Sofia Rodriguez",
          email: "sofia@example.com",
          content: "Great article! The tip about using partial indexes saved us a lot of memory. Keep it up!",
          approved: true,
        },
        {
          blogId: blog2.id,
          name: "Spam Bot",
          email: "spambot@annoying.com",
          content: "Cheap insurance rates click here now!!!",
          approved: false,
        }
      ]
    });
  }

  // ─────────────────────────────────────────────────────────
  // Testimonials
  // ─────────────────────────────────────────────────────────
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          clientName: "David Miller",
          company: "Vertex Solutions Ltd.",
          jobTitle: "Chief Technology Officer",
          rating: 5,
          feedback: "Binod is an exceptional full-stack developer. He joined our project to build out real-time features and database integrations, and delivered clean, testable code ahead of schedule. His understanding of Next.js and API optimization is top-notch.",
          projectType: "Real-time Dashboard Development",
          featured: true,
          displayOrder: 1,
        },
        {
          clientName: "Sarah Jenkins",
          company: "Nexus Logistics",
          jobTitle: "Operations Director",
          rating: 5,
          feedback: "We hired Binod to build a custom map-based PWA for real-time fleet tracking. The application is lightning fast and handles low-bandwidth areas incredibly well. Highly recommend his development services!",
          projectType: "Map-based PWA & Tracking API",
          featured: true,
          displayOrder: 2,
        },
        {
          clientName: "Rohan Shrestha",
          company: "NepHire Recruitment",
          jobTitle: "Founder & CEO",
          rating: 4,
          feedback: "Binod helped build our jobs portal backend, implementing OAuth logins and caching logic using TanStack Query. His technical execution is fantastic and his communication is always prompt and clear.",
          projectType: "Job Portal Development",
          featured: false,
          displayOrder: 3,
        }
      ]
    });
  }

  // ─────────────────────────────────────────────────────────
  // Case Studies
  // ─────────────────────────────────────────────────────────
  const caseStudyCount = await prisma.caseStudy.count();
  if (caseStudyCount === 0) {
    const davidTestimonial = await prisma.testimonial.findFirst({
      where: { clientName: "David Miller" }
    });

    await prisma.caseStudy.create({
      data: {
        title: "Scaling Kumeji Map to 10k Active Daily Users",
        slug: "scaling-kumeji-map",
        clientName: "Vertex Solutions Ltd.",
        industry: "Tourism & Travel",
        problem: "The legacy tourism application struggled with rendering 3D overlays and custom Leaflet markers, leading to extreme memory leaks and freezing on mid-range mobile devices.",
        solution: "We migrated the mapping layout to custom React components using lazy rendering strategies. We implemented an efficient coordinate clustering algorithm that reduces active DOM elements by 85%. On the backend, we configured CDN caching for map tiles and dynamic geo-JSON database queries in NestJS.",
        process: "1. Profiling mobile performance using Chrome DevTools memory allocation timeline.\n2. Writing a custom marker clusterer using spatial indexes in Leaflet.\n3. Moving CPU-heavy spatial computations into a Web Worker.",
        outcome: "We achieved 60fps scrolling and map navigation on average mobile devices. Render times dropped from 2.4s to under 300ms. Load time was reduced by 60%, allowing the site to successfully sustain a launch peaking at 12k concurrent visitors.",
        technologies: JSON.stringify(["React", "Leaflet.js", "NestJS", "PostgreSQL", "Web Workers"]),
        metrics: JSON.stringify([
          { label: "Render Speedup", value: "8x" },
          { label: "DOM Node Reduction", value: "85%" },
          { label: "Page Load Time", value: "-60%" }
        ]),
        testimonialId: davidTestimonial?.id || null,
        featured: true,
        displayOrder: 1,
      }
    });

    await prisma.caseStudy.create({
      data: {
        title: "Connexo: Designing a Low-Latency Real-Time Chat System",
        slug: "connexo-chat-system",
        clientName: "Internal Project",
        industry: "Messaging / SaaS",
        problem: "Existing open-source chat implementations failed to handle connection dropouts gracefully, leaving users with out-of-order messages and high reconnection latencies in low-network regions.",
        solution: "Built a customized message queue logic with local browser database (IndexedDB) reconciliation. Developed a custom Socket.io server layer with Redis adapter that matches local sequence indexes to ensure complete, ordered message deliveries upon reconnecting.",
        process: "1. Designing sequence numbering logic for all chat events.\n2. Implementing sliding-window acknowledgments on the client side.\n3. Stress testing using autocannon to simulate 5,000 concurrent sockets.",
        outcome: "Guaranteed ordered delivery of messages regardless of flaky networks. Reconnection sync time fell under 200ms. Socket CPU consumption dropped by 45% due to compact payload formats and reduced handshake logic.",
        technologies: JSON.stringify(["Next.js", "Socket.io", "ExpressJS", "Redis", "TypeScript"]),
        metrics: JSON.stringify([
          { label: "Sync Latency", value: "<200ms" },
          { label: "CPU Usage Reduction", value: "45%" },
          { label: "Message Delivery Guarantee", value: "100%" }
        ]),
        featured: true,
        displayOrder: 2,
      }
    });
  }

  // ─────────────────────────────────────────────────────────
  // Contact Messages
  // ─────────────────────────────────────────────────────────
  const messageCount = await prisma.contactMessage.count();
  if (messageCount === 0) {
    await prisma.contactMessage.createMany({
      data: [
        {
          name: "Marcus Aurelius",
          email: "marcus@philosophy.org",
          company: "Stoic Co",
          budget: "$1,000 - $3,000",
          service: "Full Stack Web Development",
          message: "We need a clean, responsive single page layout showing our company writings. Needs to load very fast and support offline reading capabilities.",
          status: LeadStatus.NEW,
          isRead: false,
          createdAt: new Date(Date.now() - 3600000 * 2),
        },
        {
          name: "Julius Caesar",
          email: "caesar@rome.gov",
          company: "Roman Empire Ltd",
          budget: "$10,000+",
          service: "Real-Time Application Development",
          message: "I need a real-time messaging tool to coordinate logistics and track map coordinates of multiple cohorts. Security is paramount.",
          status: LeadStatus.CONTACTED,
          notes: "Spoke with client. Very interested in real-time coordinates. Setting up a Zoom call.",
          isRead: true,
          createdAt: new Date(Date.now() - 3600000 * 24),
        },
        {
          name: "Mark Antony",
          email: "antony@cleopatra.net",
          message: "Just saying hi! Loved your work on the Kumeji map.",
          status: LeadStatus.CONVERTED,
          isRead: true,
          createdAt: new Date(Date.now() - 3600000 * 48),
        }
      ]
    });
  }

  // ─────────────────────────────────────────────────────────
  // Project Requests
  // ─────────────────────────────────────────────────────────
  const requestCount = await prisma.projectRequest.count();
  if (requestCount === 0) {
    await prisma.projectRequest.createMany({
      data: [
        {
          name: "Ada Lovelace",
          email: "ada@analyticalengine.io",
          projectType: "Full Stack Development",
          title: "Calculation engine interface",
          description: "We have a mathematical engine that outputs JSON logs. We need a beautiful dashboard to render these formulas, tables, and generate PDF reports of statistics.",
          budget: "$5,000 - $8,000",
          timeline: "2 months",
          status: RequestStatus.NEW,
          isRead: false,
        },
        {
          name: "Charles Babbage",
          email: "charles@diffengine.com",
          projectType: "API & Performance Tuning",
          title: "Query optimization for difference table engine",
          description: "Our database queries calculating polynomial differences are taking seconds. We need indexing strategy optimization and custom views.",
          budget: "$2,000 - $5,000",
          timeline: "3 weeks",
          status: RequestStatus.IN_REVIEW,
          isRead: true,
        }
      ]
    });
  }

  // ─────────────────────────────────────────────────────────
  // Orders
  // ─────────────────────────────────────────────────────────
  const orderCount = await prisma.order.count();
  if (orderCount === 0) {
    const boilerplate = await prisma.product.findUnique({
      where: { slug: "nextjs-saas-boilerplate" }
    });
    const template = await prisma.product.findUnique({
      where: { slug: "premium-portfolio-template" }
    });

    if (boilerplate) {
      await prisma.order.create({
        data: {
          orderNumber: "ORD-2026-0001",
          productId: boilerplate.id,
          customerName: "Benjamin Franklin",
          customerEmail: "ben@franklin.org",
          amount: 49.00,
          paymentMethod: "Stripe",
          paymentId: "ch_stripe_12345abc",
          status: OrderStatus.DELIVERED,
          deliveredAt: new Date(),
          createdAt: new Date(Date.now() - 3600000 * 12),
        }
      });

      await prisma.order.create({
        data: {
          orderNumber: "ORD-2026-0002",
          productId: boilerplate.id,
          customerName: "Thomas Jefferson",
          customerEmail: "thomas@declaration.org",
          amount: 49.00,
          paymentMethod: "Stripe",
          paymentId: "ch_stripe_67890xyz",
          status: OrderStatus.PAID,
          createdAt: new Date(Date.now() - 3600000 * 2),
        }
      });
    }

    if (template) {
      await prisma.order.create({
        data: {
          orderNumber: "ORD-2026-0003",
          productId: template.id,
          customerName: "Alexander Hamilton",
          customerEmail: "hamilton@treasury.gov",
          amount: 19.00,
          paymentMethod: "PayPal",
          paymentId: "pay_paypal_abc123",
          status: OrderStatus.PENDING,
          createdAt: new Date(),
        }
      });
    }
  }

  // ─────────────────────────────────────────────────────────
  // Media Files
  // ─────────────────────────────────────────────────────────
  const mediaCount = await prisma.mediaFile.count();
  if (mediaCount === 0) {
    await prisma.mediaFile.createMany({
      data: [
        {
          fileName: "kumeji-thumbnail.png",
          originalName: "kumeji-project-shot.png",
          url: "/placeholder-map.png",
          publicId: "portfolio/kumeji-thumbnail",
          resourceType: "image",
          format: "png",
          size: 450000,
          width: 800,
          height: 600,
          folder: "portfolio",
          altText: "Kumeji Map project preview",
          caption: "Kumeji Map Application Thumbnail",
        },
        {
          fileName: "connexo-preview.png",
          originalName: "connexo-preview.png",
          url: "/placeholder-chat.png",
          publicId: "portfolio/connexo-preview",
          resourceType: "image",
          format: "png",
          size: 320000,
          width: 800,
          height: 600,
          folder: "portfolio",
          altText: "Connexo Chat preview",
          caption: "Connexo Messaging Dashboard",
        }
      ]
    });
  }

  // ─────────────────────────────────────────────────────────
  // Newsletter Subscribers
  // ─────────────────────────────────────────────────────────
  const subCount = await prisma.newsletterSubscriber.count();
  if (subCount === 0) {
    await prisma.newsletterSubscriber.createMany({
      data: [
        { email: "sub1@gmail.com", name: "Robert Boyle", isActive: true },
        { email: "sub2@yahoo.com", name: "Isaac Newton", isActive: true },
        { email: "sub3@outlook.com", name: "Gottfried Leibniz", isActive: true },
        { email: "unsub@gmail.com", name: "René Descartes", isActive: false },
      ]
    });
  }

  // ─────────────────────────────────────────────────────────
  // Notifications
  // ─────────────────────────────────────────────────────────
  const notificationCount = await prisma.notification.count();
  if (notificationCount === 0) {
    await prisma.notification.createMany({
      data: [
        {
          title: "New Contact Message",
          message: "You received a new contact message from Marcus Aurelius.",
          type: "message",
          isRead: false,
          link: "/admin/messages",
        },
        {
          title: "New Product Order",
          message: "Thomas Jefferson just ordered NextJS SaaS Boilerplate.",
          type: "order",
          isRead: false,
          link: "/admin/orders",
        },
        {
          title: "New Project Request",
          message: "Ada Lovelace submitted a request for 'Calculation engine interface'.",
          type: "project_request",
          isRead: true,
          link: "/admin/requests",
        }
      ]
    });
  }

  // ─────────────────────────────────────────────────────────
  // Activity Logs
  // ─────────────────────────────────────────────────────────
  const logCount = await prisma.activityLog.count();
  if (logCount === 0) {
    const adminUser = await prisma.user.findUnique({
      where: { email: "gautambinod629@gmail.com" }
    });

    await prisma.activityLog.createMany({
      data: [
        {
          userId: adminUser?.id || null,
          action: "AUTH_LOGIN",
          entity: "User",
          entityId: adminUser?.id || null,
          metadata: JSON.stringify({ status: "success", ip: "127.0.0.1" }),
          ipAddress: "127.0.0.1",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        {
          userId: adminUser?.id || null,
          action: "UPDATE_SITE_SETTINGS",
          entity: "SiteSettings",
          metadata: JSON.stringify({ updatedFields: ["siteTagline", "siteDescription"] }),
          ipAddress: "127.0.0.1",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        {
          userId: adminUser?.id || null,
          action: "CREATE_PROJECT",
          entity: "Project",
          metadata: JSON.stringify({ title: "Kumeji Map" }),
          ipAddress: "127.0.0.1",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        }
      ]
    });
  }

  console.log("✅ Seed complete! Login: gautambinod629@gmail.com / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
