"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AddDrawing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return alert("Ajoute une image");

    // Upload image
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("drawings")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from("drawings")
      .getPublicUrl(fileName);

    // Insert en base
    await supabase.from("drawings").insert([
      {
        title,
        description,
        image_url: publicUrl.publicUrl,
      },
    ]);

    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">
          Ajouter un dessin
        </h1>

        <input
          type="text"
          placeholder="Titre"
          className="w-full mb-4 p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full mb-4 p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={(e) =>
            setFile(e.target.files ? e.target.files[0] : null)
          }
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-zinc-800"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
