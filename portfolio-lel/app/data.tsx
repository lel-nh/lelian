
export const projects = [
  {
    id: 1,
    title: "Mycelium",
    categories: ["Design","Science"],
    date: "2024",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    description: "Refonte visuelle de la gamme running.",
    tags: ["UI", "Brand", "3D"]
  },
  {
    id: 2,
    title: "Web App Store",
    categories: ["Dev"],
    date: "2023",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    description: "Dashboard complexe pour e-commerce.",
    tags: ["Next.js", "React", "API"]
  },
  {
    id: 3,
    title: "Editorial Mag",
    categories: ["Design"],
    date: "2024",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
    description: "Mise en page d'un magazine d'art.",
    tags: ["Print", "Typography"]
  },
  {
    id: 4,
    title: "Eco Mobile App",
    categories: ["Dev"],
    date: "2024",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    description: "Application de suivi carbone.",
    tags: ["React Native", "Firebase"]
  }
];

export const archiveItems = [
  { id: 1, title: "Skate Sticker", image: "https://picsum.photos/400/600", color: "#FFDE59" },
  { id: 2, title: "Logo Jazz", image: "https://picsum.photos/400/300", color: "#FF3131" },
  { id: 3, title: "Poster NY", image: "https://picsum.photos/400/500", color: "#5271FF" },
];
// src/data.js

export const resume = {
  experience: [
    {
      company: "Nom de l'Entreprise",
      role: "Fullstack Developer",
      period: "2023 - Présent",
      description: "Développement d'applications web avec Next.js. Optimisation des performances et SEO.",
      color: "#5271FF" // Bleu Gabor
    },
    {
      company: "Agence Digitale",
      role: "UI Designer",
      period: "2021 - 2023",
      description: "Conception d'interfaces sous Figma et intégration Tailwind CSS.",
      color: "#FF3131" // Rouge Gabor
    }
  ],
  education: [
    {
      school: "Ton École / Université",
      degree: "Master en Informatique",
      year: "2021",
      color: "#FFDE59" // Jaune Gabor
    }
  ],
  skills: [
    { name: "Next.js", level: "Expert" },
    { name: "Tailwind CSS", level: "Expert" },
    { name: "Framer Motion", level: "Avancé" },
    { name: "TypeScript", level: "Intermédiaire" },
    { name: "Figma", level: "Avancé" }
  ]
};
