"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/app/data'; // On importe nos données brutes
import { ArrowUpRight } from 'lucide-react'
import { useMousePosition } from "@/hooks/useMousePosition";

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');

  // Génération dynamique des catégories uniques
  const categories = ['All', ...new Set(projects.flatMap(p => p.categories))];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.categories.includes(filter));

  const mouse = useMousePosition();

  // On vérifie si on est dans le navigateur pour éviter l'erreur "window is not defined"
  const isClient = typeof window !== "undefined";
  
  // Calcul du décalage (si client, sinon 0)
  const xMove = isClient ? (mouse.x - window.innerWidth / 2)*0.02 : 0;
  const yMove = isClient ? (mouse.y - window.innerHeight / 2)*0.02 : 0;

  return (
    <section className="py-10 max-w-6xl mx-auto px-4 items-center">
      {/* Titre avec effet Gabor (Italique + Bold + Couleur) */}
      <div className="mb-16">
        <h1 className="text-7xl md:text-6xl font-black tracking-tighter italic">
          projects<span className="text-gabor-pink">.</span>
        </h1>
      </div>

      {/* Barre de Filtres style "Boutons Stickers" */}
      <div className="flex flex-wrap gap-4 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`
              px-8 py-3 font-black tracking-widest transition-all
              ${filter === cat 
                ? ' rounded-xl -translate-y-1 shadow-[8px_8px_0px_0px_rgba(82,113,255,1)]' 
                : ' rounded-xl hover:bg-gabor-yellow active:shadow-none active:translate-x-1 active:translate-y-1'
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grille Animée */}
      <motion.div 
        layout 
        className="grid aspect-square grid-cols-1 md:grid-cols-2 gap-10 p-10"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group cursor-pointer"
              whileHover={{scale:1.03,
                x: xMove,
                y: yMove
              }}
            >
              <div className="group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden t-4 flex flex-col items-center text-center p-6 rounded-xl">
                {/* Image du Projet */}
                <div className="h-72 md:h-100 aspect-square overflow-hidden rounded-xl">
                  <a href={`/projects/${project.id}`}>

                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                  />
                  </a>
                </div>

                {/* Infos du Projet */}
                <div className="t-4 flex flex-col items-center text-center p-6">
                  <div>
                    <a href={`/projects/${project.id}`}>
                    {/*<div className="flex flex-wrap gap-2 mb-3">
                      {project.categories.map((cat: string) => (
                        <span
                        key={cat} 
                          className="text-[12px] text-left font-black uppercase py-0.5"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>  */}
                    <h2 className="text-xl font-black uppercase leading-none">
                      {project.title}
                    </h2>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
