import type { Metadata } from "next";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jen Drawings",
  description: "An app to list my drawings and animation (Procreate and Procreate Dreams)",
};

async function getRandomPokemon() {
  const randomId = Math.floor(Math.random() * 151) + 1;

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${randomId}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return {
    name: data.name,
    image: data.sprites.front_default,
  };
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pokemon = await getRandomPokemon();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <footer className="mt-5 py-10 text-center text-sm text-zinc-500 flex flex-col items-center gap-3">
  <Image
    src={pokemon.image}
    alt={pokemon.name}
    width={120}
    height={120}
    className="hover:scale-110 transition"
  />

  <p className="text-xs tracking-wide">
    Powered by Jen and PokéAPI
  </p>
</footer>

      </body>
    </html>
  );
}
