"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Sun, Moon } from 'lucide-react';
import { useEffect } from 'react';
import { useMousePosition } from "@/hooks/useMousePosition";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // L'état pour gérer l'ouverture
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };
  const mouse = useMousePosition();

  // On vérifie si on est dans le navigateur pour éviter l'erreur "window is not defined"
  const isClient = typeof window !== "undefined";
  
  // Calcul du décalage (si client, sinon 0)
  const xMove = isClient ? (mouse.x - window.innerWidth / 2)*0.02 : 0;
  const yMove = isClient ? (mouse.y - window.innerHeight / 2)*0.02 : 0;
  return (
    
    <nav className="fixed w-full z-50 px-4 md:px-10 py-2 bg-white/70 dark:bg-zinc-900/70 text-black dark:text-white backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-black tracking-tighter">
          <span className="text-gabor-pink">.</span>lel
        </Link>
        
        {/* Menu Desktop */}          
        <div className="hidden md:flex gap-8 font-bold uppercase items-center">
          <Link href="/" className="hover:text-gabor-blue transition-colors">           <motion.div
              whileHover={{scale:1.05,
              }}
            > Projects   </motion.div> </Link>
          <Link href="/archive" className="hover:text-gabor-pink transition-colors">           <motion.div
              whileHover={{scale:1.05,
              }}
            >Things    </motion.div></Link>
          <Link href="/cv" className="hover:text-gabor-yellow transition-colors">           <motion.div
              whileHover={{scale:1.05,
              }}
            >CV   </motion.div></Link>
          <button
            onClick={toggleTheme}
            aria-label="Basculer le thème"
            className="p-2 hover:scale-105 transition"
          >  <motion.div
              whileHover={{scale:1.05,
              }}
            >  
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </motion.div>
          </button>
     
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Basculer le thème"
            className=" p-1.5"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Bouton Mobile : On ajoute le onClick */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)} // Alterne entre vrai et faux
            className="border-2 border-black dark:border-white p-1 bg-white dark:bg-zinc-800"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Menu Mobile : S'affiche seulement si isOpen est true */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-zinc-900 border-b-3 border-black dark:border-white p-6 flex flex-col gap-6 md:hidden shadow-brutal"
          >
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)} // Ferme le menu quand on clique
              className="text-2xl font-black uppercase italic hover:text-gabor-blue"
            >
              Projects
            </Link>
            <Link 
              href="/archive" 
              onClick={() => setIsOpen(false)}
              className="text-2xl font-black uppercase italic hover:text-gabor-pink"
            >
              Things
            </Link>
            <Link 
              href="/cv" 
              onClick={() => setIsOpen(false)}
              className="text-2xl font-black uppercase italic hover:text-gabor-yellow"
            >
              CV
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
