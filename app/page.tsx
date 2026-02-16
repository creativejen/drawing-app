import Image from "next/image";
import { Permanent_Marker } from "next/font/google";

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
  return (
    <div className="min-h-screen bg-[#f8f6f2] py-16 px-4">
      <div className="max-w-7xl mx-auto">

     <h1 className={`${permanent.className} text-center text-7xl mb-12`}>
 Jen Drawings
</h1>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {drawings.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt=""
              width={1600}
              height={1000}
              className="w-full h-auto"
            />
          ))}
        </div>

      </div>
    </div>
  );
}
