import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB
const MAX_OTHER_SIZE = 10 * 1024 * 1024; // 10 MB (PDFs, etc.)
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
  "application/pdf",
];

export async function POST(request: NextRequest) {
  // Auth check
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = (formData.get("folder") as string) || "devfolio";

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `File type not allowed. Allowed: ${ALLOWED_TYPES.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate file size — videos get a larger allowance than images/docs
    const maxSize = file.type.startsWith("video/")
      ? MAX_VIDEO_SIZE
      : file.type.startsWith("image/")
        ? MAX_IMAGE_SIZE
        : MAX_OTHER_SIZE;

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size exceeds ${maxSize / (1024 * 1024)}MB limit` },
        { status: 400 }
      );
    }

    // Sanitize folder name to prevent path traversal
    // Allow nested folder paths (e.g. "devfolio/projects") but strip any
    // path traversal attempts and anything outside safe URL-path characters.
    const sanitizedFolder = folder
      .replace(/\.\./g, "")
      .replace(/[^a-zA-Z0-9_/-]/g, "")
      .replace(/\/+/g, "/")
      .replace(/^\/|\/$/g, "");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const result = await uploadToCloudinary(dataUri, sanitizedFolder, {
      resource_type: "auto",
    });

    // Save to media library
    await prisma.mediaFile.create({
      data: {
        fileName: result.publicId.split("/").pop() ?? file.name,
        originalName: file.name.slice(0, 255), // cap length
        url: result.url,
        publicId: result.publicId,
        resourceType: result.resourceType,
        format: result.format ?? null,
        size: result.size,
        width: result.width ?? null,
        height: result.height ?? null,
        folder: sanitizedFolder,
      },
    });

    return NextResponse.json({ url: result.url, publicId: result.publicId });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
