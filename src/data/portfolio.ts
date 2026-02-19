import type { WorkExperience, Project, Skills, Education } from "@/types/portfolio";

import map1 from "@/assets/projects/map1.jpg";
import map2 from "@/assets/projects/map2.jpg";
import map3 from "@/assets/projects/map3.jpg";

import booth1 from "@/assets/projects/photobooth1.jpg";
import booth2 from "@/assets/projects/photobooth2.jpg";
import booth3 from "@/assets/projects/bhotobooth3.jpg";
import booth4 from "@/assets/projects/photobooth4.jpg";

import hrm1 from "@/assets/projects/hrm1.jpg";
import hrm2 from "@/assets/projects/hrm2.jpg";
import hrm3 from "@/assets/projects/hrm3.jpg";
import hrm4 from "@/assets/projects/hrm4.jpg";

import connexo1 from "@/assets/projects/chat1.jpg";
import connexo2 from "@/assets/projects/chat1.jpg";

import khaata1 from "@/assets/projects/mobilekhata1.jpg";
import khaata2 from "@/assets/projects/mobilekhata2.jpg";

import jobportal1 from "@/assets/projects/jobprotal1.jpg";
import jobportal2 from "@/assets/projects/jobprotal2.jpg";
import jobportal3 from "@/assets/projects/jobprotal3.jpg";


export const personalInfo = {
  name: "Binod Gautam",
  title: "Full Stack Developer",
  email: "gautambinod629@gmail.com",
  phone: "9815835831",
  github: "gautam-629",
  linkedin: "gautambinod",
  summary: `Full Stack Developer with 2+ years of experience designing and developing scalable, production-ready 
applications across frontend and backend systems. Strong expertise in React.js, Next.js, TypeScript, NestJS, and 
Express.js, with hands-on experience in real-time communication, API architecture and  database optimization.`
}

export const workExperience: WorkExperience[] = [
  {
    company: "RPA Nepal.Ltd.Pvt",
    role: "Full Stack Developer",
    period: "Apr 2024 - Present",
    achievements: [
     "Developed scalable web applications using React, Next.js, TypeScript, Express, and NestJS, including a map-based PWA with Leaflet.js, improving performance through optimized state management, lazy loading, and efficient API integration.",

"Implemented real-time communication features using Socket.io with Express Js, enabling low-latency bi-directional messaging with reliable WebSocket handling.",

"Designed modular frontend and backend architectures for HRM and dashboard systems using React Query, Redux, and Nest Js, reducing redundant API calls and improving data consistency.",

"Optimized existing applications by refactoring UI components, enhancing state management flow, restructuring API calls, and improving SEO and routing through Next.js migration.",

"Developed a Photo Booth management system with admin and user dashboards, including dynamic booth configuration and a frame editor built with Fabric.js for image upload, rotation, resizing, and precise positioning.",
    ],
  },
  {
    company: "Jobaxle.Pvt.Ltd",
    role: "Full Stack Developer",
    period: "Sep 2023 - Apr 2024",
    achievements: [
     "Developed responsive and SEO-friendly job portal pages using Next.js, Mantine UI, and PostgreSQL.",

"Built features including filtering, search, and a resume builder to improve user experience.",

"Implemented OAuth login (Google, GitHub) and integrated APIs with caching strategies using TanStack Query."
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Kumeji Map",
    description: "An immersive tourism map with 3D/VR experiences and quizzes designed to engage travelers. It delivers interactive maps with smooth performance and dynamic content tailored to each user.",
    tech: ["React", "Leaflet.js", "Tailwind CSS"],
    link: "https://join-kumejima.com/map/app",
    gradient: "from-purple-500 to-pink-500",
    images: [map1, map2,map3],
  },
  {
    name: "Photobooth",
    description: "Interactive tourism map with 3D/VR and quizzes",
    tech: ["React", "fabric.js", "Tailwind CSS"],
    link: "https://photo-stg-admin.chvps3.aozora-okinawa.com/",
    gradient: "from-orange-500 to-red-500",
    images: [booth1, booth2,booth3,booth4],
  },
   {
    name: "Tidyday (HRM System)",
    description: "An all-in-one Human Resource Management solution designed to simplify HR tasks. Tidyday automates attendance, payroll, performance tracking, and employee records, letting HR teams focus on people rather than paperwork.",
    tech: ["React.js", "React Query", "Tailwind CSS" ,"Nest js","Postgress"],
    link: "https://rpa.hamrohr.com",
    gradient: "from-green-500 to-emerald-500",
    images: [hrm1, hrm2,hrm3,hrm4],
  },
    {
    name: "Job Portal",
    description: "A dedicated job portal for IT and engineering careers. It features advanced search, filtering, and resume-building tools. Users can log in securely with Google/GitHub OAuth, making recruitment faster and more efficient.",
    tech: ["React js", "Next.js", "MySQL"],
    link: "https://jobaxle.com/auth/login",
    gradient: "from-green-500 to-emerald-500",
    images: [jobportal1, jobportal2,jobportal3],
  },
  {
    name: "Connexo Chat",
    description: "A real-time messaging platform enabling seamless communication for teams and communities. Connexo Chat supports instant updates, scalable architecture, and smooth interaction between users.",
    tech: ["Next.js", "TypeScript", "Socket.io", "Express.js"],
    link: "https://connexo.app",
    gradient: "from-blue-500 to-cyan-500",
    images: [connexo1, connexo2],
  },
 
  {
    name: "Mobile Khaata",
    description: "A digital ledger and daybook app that transforms traditional business operations into a simple, accurate digital platform. It allows businesses to manage sales, purchases, credit accounts, and generate reports effortlessly.",
    tech: ["React", "Redux", "Tailwind CSS", "Express.js"],
    link: "https://business.mobilekhaata.com",
    gradient: "from-indigo-500 to-purple-500",
    images: [khaata1, khaata2],
  },

 
];

export const skills: Skills = {
  Frontend: [
    "React.js", "Next.js", "Redux", "TanStack Query", "Zustand",
    "Tailwind CSS", "Ant Design", "ShadCN", "Mantine UI", "Leaflet.js","Fabric.js"
  ],
  Backend: ["Node.js", "Express.js", "NestJS", "Socket.io"],
  Languages: ["JavaScript (ES6+)", "TypeScript"],
  Databases: ["MySQL", "MongoDB", "PostgreSQL", "Redis"],
  Tools: ["Git", "Docker", "Postman"],
  Other: ["Responsive Design", "API Integration", "State Management", "SEO Optimization"],
};

export const education: Education = {
  institution: "Tribhuvan University",
  degree: "BCA (Bachelor of Computer Applications)",
  period: "Oct 2019 - Nov 2023",
};
