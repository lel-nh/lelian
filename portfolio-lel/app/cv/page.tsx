"use client";
import { resume } from '@/app/data';
import { motion } from 'framer-motion';
import { Star, GraduationCap, Briefcase, Code } from 'lucide-react';

export default function CVPage() {
  // Animation container pour l'effet de cascade
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.section 
      variants={container}
      initial="hidden"
      animate="show"
      className="py-10"
    >
      <h1 className="text-6xl md:text-6xl font-black italic mb-16">
        curriculum<span className="text-gabor-yellow">.</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* COLONNE GAUCHE (8/12) : EXPERIENCE */}
        <div className="lg:col-span-8 space-y-10">
          <div className="flex items-center gap-4 mb-6">
            <Briefcase size={32} strokeWidth={3} />
            <h2 className="text-4xl font-black uppercase italic">Parcours</h2>
          </div>

          {resume.experience.map((exp, index) => (
            <motion.div 
              key={index}
              variants={item}
              whileHover={{ scale: 1.01 }}
              className="p-8 relative group"
            >
              <div 
                className="absolute top-0 left-0 w-full h-2" 
                style={{ backgroundColor: exp.color }}
              ></div>
              <span className="text-sm font-black opacity-50 uppercase">{exp.period}</span>
              <h3 className="text-3xl font-black uppercase mt-2 group-hover:text-gabor-blue transition-colors">
                {exp.role}
              </h3>
              <p className="text-xl font-bold mb-4">{exp.company}</p>
              <p className="font-medium text-gray-700 leading-relaxed pt-4 mt-4">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* COLONNE DROITE (4/12) : SKILLS & EDUCATION */}
        <div className="lg:col-span-4 space-y-12">
          
          {/* SKILLS */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Code size={24} strokeWidth={3} />
              <h2 className="text-2xl font-black uppercase italic">Compétences</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {resume.skills.map((skill, i) => (
                <motion.span 
                  key={i}
                  variants={item}
                  className="px-4 py-2 font-black uppercase text-xs hover:bg-gabor-pink hover:text-white transition-colors cursor-default"
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap size={24} strokeWidth={3} />
              <h2 className="text-2xl font-black uppercase italic">Formation</h2>
            </div>
            <div className="space-y-6">
              {resume.education.map((edu, i) => (
                <motion.div 
                  key={i} 
                  variants={item}
                  className="p-4"
                >
                  <h4 className="font-black uppercase text-sm" style={{ color: edu.color }}>
                    {edu.year}
                  </h4>
                  <p className="font-black uppercase leading-tight">{edu.degree}</p>
                  <p className="font-bold text-xs opacity-60 uppercase mt-1">{edu.school}</p>
                </motion.div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </motion.section>
  );
}
