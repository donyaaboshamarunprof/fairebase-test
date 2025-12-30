"use client";

import { useState } from "react";
import { uploadFile } from "@/lib/upload";
import { useAuth } from "@/context/AuthContext";

export default function UploadImage() {
    const { user } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file || !user) return;

        setLoading(true);
        const url = await uploadFile(file, user, "images");
        setLoading(false);

        alert("Uploaded! URL: " + url);
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <button onClick={handleUpload} disabled={loading}>
                Upload
            </button>
        </div>
    );
}
