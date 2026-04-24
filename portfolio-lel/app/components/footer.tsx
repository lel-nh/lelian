"use client";

import { useMousePosition } from "@/hooks/useMousePosition";

  
export default function Footer() {
  const mouse = useMousePosition();

  // On vérifie si on est dans le navigateur pour éviter l'erreur "window is not defined"
  const isClient = typeof window !== "undefined";
  
  // Calcul du décalage (si client, sinon 0)
  const xMove = isClient ? (mouse.x - window.innerWidth / 2)*0.02 : 0;
  const yMove = isClient ? (mouse.y - window.innerHeight / 2)*0.02 : 0;

  return(
    <footer className="border-t-3 border-black bg-gabor-yellow p-8 md:p-12 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="font-bold text-xl"> <a href="mailto:lelian.nahon@gmail.com?subject=Contact portfolio" className="hover:text-gabor-pink transition-colors">send mail</a></p>
        </div>
        <div className="flex gap-4">
          {['Instagram','LinkedIn'].map((link) => (
            <a key={link} href="#" className="px-4 py-2 font-bold uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
