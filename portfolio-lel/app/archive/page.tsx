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
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center text-center">
        {archiveItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05,
              x: xMove, // Légère translation selon la position du curseur
              y: yMove,
            }}
            className="break-inside-avoid p-2 inline-block w-full"
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-auto rounded-2xl p-2"
              loading="lazy" // Bon pour le SEO et la performance !
            />
          {/*  <h3 className="text-xl font-bold uppercase mt-2">{item.title}</h3> */ }
          </motion.div>
        ))}
      </div>
    </section>
  );
}
