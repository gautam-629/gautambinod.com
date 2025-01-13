import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className=" px-4 overflow-hidden ">
      <Nav />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
