import { prisma } from "@/lib/prisma";
import { calculateDuration } from "@/utils/calculateDuration";
import { formatDate } from "@/utils/format";
import { toStringArray } from "@/types";
import { Briefcase, MapPin, Globe } from "lucide-react";

export const metadata = { title: "Experience" };
export const revalidate = 3600;

export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({
    where: { status: true },
    orderBy: [{ currentlyWorking: "desc" }, { startDate: "desc" }],
  });

  return (
    <div className="container py-16 max-w-4xl mx-auto">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold mb-4">Work Experience</h1>
        <p className="text-muted-foreground text-lg">
          My professional journey across companies, roles, and technologies.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />

        <div className="space-y-8">
          {experiences.map((exp) => {
            const responsibilities = toStringArray(exp.responsibilities);
            const achievements = toStringArray(exp.achievements);
            const technologies = toStringArray(exp.technologies);

            return (
              <div key={exp.id} className="relative md:pl-16">
                <div className="absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-primary bg-background hidden md:block" />

                <div className="p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/20 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold">{exp.jobTitle}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Briefcase className="h-4 w-4 text-primary" />
                        {exp.companyWebsite ? (
                          <a
                            href={exp.companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-semibold hover:underline flex items-center gap-1"
                          >
                            {exp.companyName} <Globe className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-primary font-semibold">{exp.companyName}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {formatDate(exp.startDate)} –{" "}
                        {exp.currentlyWorking ? (
                          <span className="text-green-600 dark:text-green-400">Present</span>
                        ) : exp.endDate ? (
                          formatDate(exp.endDate)
                        ) : (
                          ""
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {calculateDuration(exp.startDate, exp.endDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {exp.employmentType.replace(/_/g, " ")}
                    </span>
                    {exp.workMode && (
                      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {exp.workMode}
                      </span>
                    )}
                    {exp.location && (
                      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {exp.location}
                      </span>
                    )}
                  </div>

                  {exp.shortDescription && (
                    <p className="text-muted-foreground text-sm mb-4">{exp.shortDescription}</p>
                  )}

                  {responsibilities.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold mb-2">Responsibilities</h3>
                      <ul className="space-y-1">
                        {responsibilities.map((r, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1.5 shrink-0">▸</span> {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {achievements.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold mb-2">Key Achievements</h3>
                      <ul className="space-y-1">
                        {achievements.map((a, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5 shrink-0">★</span> {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border/40">
                      {technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-muted px-2 py-0.5 rounded-md text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {experiences.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No experience entries found.
          </div>
        )}
      </div>
    </div>
  );
}
