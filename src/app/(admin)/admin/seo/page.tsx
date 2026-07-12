import { prisma } from "@/lib/prisma";
import { updateSeoSettings } from "@/actions/settings.actions";

export const metadata = { title: "SEO Settings | Admin" };

const pages = ["home", "about", "projects", "products", "services", "blog", "contact", "experience", "skills"];

export default async function AdminSeoPage() {
  const seoSettings = await prisma.seoSettings.findMany();
  const seoMap = Object.fromEntries(seoSettings.map((s) => [s.page, s]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">SEO Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage meta titles, descriptions, and Open Graph settings per page</p>
      </div>

      <div className="space-y-4">
        {pages.map((page) => {
          const seo = seoMap[page];
          return (
            <form key={page} action={async (formData) => {
              "use server";
              await updateSeoSettings(page, formData);
            }}>
              <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                <div className="px-5 py-3 border-b border-border/50 bg-muted/30 flex items-center justify-between">
                  <h2 className="font-semibold text-sm capitalize">/{page === "home" ? "" : page}</h2>
                  <button type="submit" className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-md hover:bg-primary/90 transition-colors">
                    Save
                  </button>
                </div>
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Meta Title</label>
                    <input
                      name="metaTitle"
                      defaultValue={seo?.metaTitle || ""}
                      placeholder={`${page.charAt(0).toUpperCase() + page.slice(1)} | DevFolio`}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Meta Description</label>
                    <input
                      name="metaDesc"
                      defaultValue={seo?.metaDesc || ""}
                      placeholder="Page description..."
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">OG Title</label>
                    <input
                      name="ogTitle"
                      defaultValue={seo?.ogTitle || ""}
                      placeholder="Open Graph title..."
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">OG Description</label>
                    <input
                      name="ogDescription"
                      defaultValue={seo?.ogDescription || ""}
                      placeholder="Open Graph description..."
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Keywords</label>
                    <input
                      name="keywords"
                      defaultValue={seo?.keywords || ""}
                      placeholder="keyword1, keyword2, keyword3"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" name="noIndex" id={`noIndex-${page}`} defaultChecked={seo?.noIndex} className="rounded" />
                    <label htmlFor={`noIndex-${page}`} className="text-xs text-muted-foreground">No Index (hide from search engines)</label>
                  </div>
                </div>
              </div>
            </form>
          );
        })}
      </div>
    </div>
  );
}
