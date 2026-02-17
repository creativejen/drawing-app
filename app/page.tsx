"use client";

import Image from "next/image";
import { Permanent_Marker } from "next/font/google";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

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

  const [likes, setLikes] = useState<number[]>(() => {
    if (typeof window === "undefined") {
      return new Array(drawings.length).fill(0);
    }

    const saved = localStorage.getItem("likes");
    return saved
      ? JSON.parse(saved)
      : new Array(drawings.length).fill(0);
  });

  const [liked, setLiked] = useState<boolean[]>(() => {
    if (typeof window === "undefined") {
      return new Array(drawings.length).fill(false);
    }

    const saved = localStorage.getItem("liked");
    return saved
      ? JSON.parse(saved)
      : new Array(drawings.length).fill(false);
  });

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
    localStorage.setItem("liked", JSON.stringify(liked));
  }, [likes, liked]);

  const toggleLike = (index: number) => {
    const newLikes = [...likes];
    const newLiked = [...liked];

    if (newLiked[index]) {
      newLikes[index] -= 1;
      newLiked[index] = false;
    } else {
      newLikes[index] += 1;
      newLiked[index] = true;
    }

    setLikes(newLikes);
    setLiked(newLiked);
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
                onClick={() => toggleLike(index)}
                className="mt-4 flex items-center gap-2 group"
              >
                <Heart
                  className={`
                    w-6 h-6 transition-all duration-300
                    ${
                      liked[index]
                        ? "fill-[#c75b39] stroke-[#c75b39] scale-110"
                        : "stroke-[#5c4a3b]"
                    }
                    group-hover:scale-110
                  `}
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
