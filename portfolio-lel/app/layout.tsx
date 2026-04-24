// src/app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['400', '700', '900'],
  variable: '--font-inter',
});

export const metadata = {
  title: ".lel | Engineer Creator",
  description: "Découvrez les projets de Lel, un développeur passionné par le web et les technologies modernes. Explorez une collection de projets innovants, allant du développement web à l'intelligence artificielle, tous conçus avec créativité et expertise.",
  keywords: "portfolio, projets, développement web, intelligence artificielle, technologie, créativité"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="antialiased flex flex-col min-h-screen">
        <Navbar />
        {/* Le pt-24 ou pt-32 est OBLIGATOIRE car la navbar est en 'fixed' */}
        <main className="flex-grow pt-32 px-4 md:px-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
