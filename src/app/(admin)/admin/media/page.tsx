import { prisma } from "@/lib/prisma";
import { MediaUploader } from "@/features/media/MediaUploader";
import { MediaGrid } from "@/features/media/MediaGrid";

export const metadata = { title: "Media Library | Admin" };

export default async function AdminMediaPage() {
  const files = await prisma.mediaFile.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const totalSize = files.reduce((sum, f) => sum + (f.size ?? 0), 0);
  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Media Library</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {files.length} files · {formatBytes(totalSize)} total
        </p>
      </div>

      <MediaUploader />

      <MediaGrid files={files} />
    </div>
  );
}
