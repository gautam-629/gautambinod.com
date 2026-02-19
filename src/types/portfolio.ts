export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  link: string;
  gradient: string;
  images: string[];
}

export interface Skills {
  [category: string]: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}
