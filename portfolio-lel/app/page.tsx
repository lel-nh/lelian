"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/app/data'; // On importe nos données brutes
import { ArrowUpRight, ChevronDown, Menu } from 'lucide-react'
import { useMousePosition } from "@/hooks/useMousePosition";
import { Filter } from 'lucide-react';


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

 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const [projectToShow, setProjectToShow] = useState<number | null>(null);

// On récupère les données du projet sélectionné pour l'afficher
 const selectedProject = projects.find(p => p.id === projectToShow);


useEffect(() => {
  if (projectToShow !== null) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
}, [projectToShow]);


  return (
    <section className="py-10 max-w-6xl mx-auto px-4 items-center">
      {/* Titre avec effet Gabor (Italique + Bold + Couleur) */}
      <div className="mb-16">
        <h1 className="text-7xl md:text-6xl font-black tracking-tighter italic">
          projects<span className="text-gabor-pink">.</span>
        </h1>
      </div>


  <div className="relative mb-16 flex justify-left"> {/* Positionné à droite */}
    
    {/* Bouton Entonnoir */}
    <button 
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="flex rounded-xl -translate-y-1 shadow-[8px_8px_0px_0px_rgba(82,113,255,1)] items-center gap-3 px-6 py-3 font-black uppercase tracking-widest hover:-translate-y-1 transition-all active:shadow-black active:translate-y-1"
    >
      <Filter size={20} />
      <span>{filter}</span>
      <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }}>
        <ChevronDown size={18} />
      </motion.div>
    </button>

    {/* Menu Déroulant */}

    <AnimatePresence>
      {isMenuOpen && (
        <>
      <div 
        className="fixed inset-0 z-30 cursor-default" 
        onClick={() => setIsMenuOpen(false)} 
      />
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute top-full mt-4 left-0 z-40 min-w-[200px] p-2 bg-white/70 dark:bg-zinc-900/70 text-black dark:text-white backdrop-blur-sm rounded-xl"
        >
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setIsMenuOpen(false); // Ferme le menu après sélection
                }}
                className={`
                  px-4 py-2 text-left font-black uppercase tracking-wider transition-colors
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
        </motion.div>
      
        </>
      )}
    </AnimatePresence>
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
                <button
                  onClick={() => setProjectToShow(project.id)}
                >
                {/* Image du Projet */}
                <div className="h-72 md:h-100 aspect-square overflow-hidden rounded-xl">

                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                  />
                </div>

                {/* Infos du Projet */}
                <div className="t-4 flex flex-col items-center text-center p-6">
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
                </div>
               </button>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
  {projectToShow && selectedProject && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      
      {/* 1. L'arrière-plan (Overlay) qui ferme la modale au clic */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setProjectToShow(null)}
        className="absolute inset-0 bg-black/20 backdrop-blur-md"
      />

      {/* 2. La "Mini Page" (La Modale) */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 0.9, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        className="relative bg-white dark:bg-zinc-900 overflow-y-auto rounded-xl">

        <div className="p-6">
          <img 
            src={selectedProject.image} 
            className="h-100 md:h-200 aspect-square mb-6 flex flex-col items-center rounded-xl object-cover" 
          />
          <h2 className="text-4xl font-black uppercase italic mb-4">
            {selectedProject.title}
          </h2>
          <p className="text-lg opacity-80">
            {/* Si tu as une description dans tes data, elle va ici */}
            {selectedProject.description || "In coming..." }
          </p>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>

    </section>
    
  );
}
