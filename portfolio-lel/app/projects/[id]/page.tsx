"use client";
import { projects } from '@/app/data';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Tag, Calendar, ExternalLink } from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams();
  const router = useRouter();
  
  // On trouve le projet par son ID
  const project = projects.find(p => p.id.toString() === id);

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black uppercase">Projet égaré !</h1>
        <button onClick={() => router.push('/projects')} className="mt-4 underline font-bold">Retourner aux projets</button>
      </div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto py-10 px-4"
    >
      {/* Bouton Retour stylisé */}
      <button 
        onClick={() => router.back()}
        className="group flex items-center gap-2 font-black uppercase mb-12 border-3 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* TEXTE DU PROJET */}
        <div className="space-y-8">
          <header>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-none break-words">
              {project.title}<span className="text-gabor-blue">.</span>
            </h1>
            <div className="flex flex-wrap gap-4 mt-6">
              <span className="flex items-center gap-2 border-2 border-black px-3 py-1 bg-gabor-yellow font-bold text-sm uppercase">
                <Tag size={14} /> {project.categories.join(', ')}
              </span>
              <span className="flex items-center gap-2 border-2 border-black px-3 py-1 bg-white font-bold text-sm uppercase">
                <Calendar size={14} /> {project.date}
              </span>
            </div>
          </header>

          <div className="prose prose-xl">
            <p className="text-2xl font-bold leading-tight">
              {project.description}
            </p>
            <p className="text-gray-600 font-medium">
              Ici, tu peux ajouter un long texte explicatif sur ton processus créatif, 
              les outils utilisés (Next.js, Tailwind, etc.) et les défis rencontrés. 
              Le style Gabor aime les contrastes : n'hésite pas à être direct.
            </p>
          </div>

          <a 
            href="#" 
            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-black uppercase text-lg shadow-[8px_8px_0px_0px_rgba(82,113,255,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
          >
            Voir le site live <ExternalLink size={20} />
          </a>
        </div>

        {/* IMAGE DU PROJET */}
        <motion.div 
          whileHover={{ rotate: 1 }}
          className="border-4 border-black shadow-brutal bg-white p-4"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-auto border-2 border-black"
          />
          <div className="mt-4 flex gap-2">
            {project.tags?.map(tag => (
              <span key={tag} className="text-xs font-black uppercase opacity-40">#{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
