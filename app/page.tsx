"use client";

import Image from "next/image";
import { Permanent_Marker } from "next/font/google";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const permanent = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
});


const drawings = [
  "/drawings/GOUCHEMAX.jpg",
  "/drawings/GOUACHEGIRLSNIGHT.jpg",
  "/drawings/GOUACHEMAISONROSE.jpg",
  "/drawings/GOUACHEHOMES.jpg",
  "/drawings/GOUACHEBCAT.jpg",
  "/drawings/GOUACHESTRAW.jpg",
  "/drawings/GOUACHEDOGS.jpg",
  "/drawings/GOUACHEBREDCAT.jpg",
];

export default function Home() {

  const [likes, setLikes] = useState<number[]>(
    new Array(drawings.length).fill(0)
  );

  useEffect(() => {
  const fetchLikes = async () => {
    const { data } = await supabase
      .from("likes")
      .select("*");

    if (data) {
      const initialLikes = new Array(drawings.length).fill(0);

      data.forEach((item) => {
        initialLikes[item.drawing_index] = item.count;
      });

      setLikes(initialLikes);
    }
  };

  fetchLikes();
}, []);


  const handleLike = async (index: number) => {
    const current = likes[index] || 0;

    // Optimistic update
    const newLikes = [...likes];
    newLikes[index] = current + 1;
    setLikes(newLikes);

    await supabase
      .from("likes")
      .upsert(
        { drawing_index: index, count: current + 1 },
        { onConflict: "drawing_index" }
      );
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] py-16 px-4">
      <div className="max-w-7xl mx-auto">

     <h1 className={`${permanent.className} text-center text-7xl mb-12`}>
 Jen Drawings
</h1>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {drawings.map((src, index) => (
            <div key={index} className="flex flex-col items-center">
            <Image
              key={index}
              src={src}
              alt=""
              width={1600}
              height={1000}
              className="w-full h-auto"
            />

            <button
                onClick={() => handleLike(index)}
                className="mt-4 flex items-center gap-2 group"
              >
                <Heart
                  className="w-6 h-6 stroke-[#5c4a3b] hover:fill-[#c75b39] hover:stroke-[#c75b39] transition"
                />

                <span className="text-sm text-[#5c4a3b]">
                  {likes[index] || 0}
                </span>
              </button>
              </div>
          ))}
        </div>

      </div>
    </div>
  );
}
