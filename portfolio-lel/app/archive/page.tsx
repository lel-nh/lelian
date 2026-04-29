"use client";
import { archiveItems } from '@/app/data';
import { motion } from 'framer-motion';
import { Pointer } from 'lucide-react';
import { useMousePosition } from "@/hooks/useMousePosition";

export default function ArchivePage() {
  const mouse = useMousePosition();

  // On vérifie si on est dans le navigateur pour éviter l'erreur "window is not defined"
  const isClient = typeof window !== "undefined";
  
  // Calcul du décalage (si client, sinon 0)
  const xMove = isClient ? (mouse.x - window.innerWidth / 2)*0.02 : 0;
  const yMove = isClient ? (mouse.y - window.innerHeight / 2)*0.02 : 0;

  return (
    <section className="py-10">
      <h1 className="text-6xl font-black mb-12 italic decoration-gabor-yellow">
        things<span className="text-gabor-yellow">.</span>
      </h1>

      {/* Colonnes style Pinterest via CSS Columns */}
 <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 p-4">
  {archiveItems.map((item) => (
    <motion.div
      key={item.id}
      whileHover={{ 
        scale: 1.02,
        x: xMove, 
        y: yMove,
      }}
      className="break-inside-avoid" // Empêche l'image de se couper entre deux colonnes
    >
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full h-auto rounded-2xl border-2 border-transparent hover:border-white/10 transition-all"
        loading="lazy"
      />
    </motion.div>
  ))}
</div>

    </section>
  );
}
