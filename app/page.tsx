"use client";

import Image from "next/image";
import { Permanent_Marker } from "next/font/google";
import { Heart } from "lucide-react";
import { useState } from "react";

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
  () => new Array(drawings.length).fill(0)
  );

  const [liked, setLiked] = useState<boolean[]>(
    () => new Array(drawings.length).fill(false)
  );

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
