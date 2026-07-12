import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  url: string;
  publicId: string;
  format: string;
  width?: number;
  height?: number;
  size: number;
  resourceType: string;
}

export async function uploadToCloudinary(
  file: string | Buffer,
  folder: string = "devfolio",
  options?: Record<string, unknown>
): Promise<UploadResult> {
  const source =
    typeof file === "string"
      ? file
      : `data:image/jpeg;base64,${file.toString("base64")}`;

  const result = await cloudinary.uploader.upload(source, {
    folder,
    ...options,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    format: result.format,
    width: result.width,
    height: result.height,
    size: result.bytes,
    resourceType: result.resource_type,
  };
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export async function getCloudinarySignature(
  params: Record<string, unknown>
): Promise<{ signature: string; timestamp: number }> {
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { ...params, timestamp },
    process.env.CLOUDINARY_API_SECRET!
  );
  return { signature, timestamp };
}

export default cloudinary;
