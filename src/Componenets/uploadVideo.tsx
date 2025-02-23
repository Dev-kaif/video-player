// components/UploadVideo.tsx
"use client"
import { useState } from 'react';

export default function UploadVideo({setSrc}:{setSrc:(a: string)=>void}) {
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    // Construct Cloudinary upload URL
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;

    // Create FormData and append file & preset
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset!);

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setSrc(data.secure_url);
        setVideoUrl(true)
      } else {
        setError('Upload failed');
        console.error('Upload error:', data);
      }
    } catch (err) {
      setError('Upload failed');
      console.error(err);
    }
    setUploading(false);
  };

  return (
    <div className="p-4 border-dashed border-2 border-gray-400 rounded-md">
      <label className="block text-lg font-semibold mb-2">
        Upload a Video:
      </label>
      <input type="file" accept="video/*" onChange={handleFileChange} className="mb-4" />
      {uploading && <p className="text-gray-500">Uploading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {videoUrl && (
        <div className="mt-4">
          <p className="font-bold">Video uploaded successfully!</p>
        </div>
      )}
    </div>
  );
}
