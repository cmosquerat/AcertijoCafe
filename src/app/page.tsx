"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CoffeeBackground from "@/components/CoffeeBackground";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 py-4 sm:py-6">
      {/* Coffee Background */}
      <CoffeeBackground />

      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center h-full"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Logo Section */}
        <motion.div
          variants={itemVariants}
          className="mb-6 sm:mb-8 md:mb-10 relative flex items-center justify-center flex-shrink-0 z-20"
        >
          <motion.div
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem]"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/logo.png"
              alt="Acertijo Café Logo"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-2 sm:space-y-3 md:space-y-4 w-full flex flex-col items-center flex-shrink-0 relative z-20"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Próximamente
          </motion.h1>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-xl text-accent/90 font-body max-w-2xl px-4"
            variants={itemVariants}
          >
            Estamos preparando algo que despertará tus sentidos.
          </motion.p>

          <motion.p
            className="text-sm sm:text-base md:text-lg text-accent/85 font-body max-w-2xl px-4"
            variants={itemVariants}
          >
            Pronto descubrirás el enigma detrás de cada taza
          </motion.p>

          <motion.div
            className="glass-effect rounded-full px-5 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3 inline-block"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <p className="text-sm sm:text-base md:text-lg text-accent font-body font-medium">
              Página en construcción
            </p>
          </motion.div>

          {/* Instagram Link */}
          <motion.a
            href="https://www.instagram.com/acertijocafe?igsh=aHgyMjJ3Y3BoaW1h"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 sm:mt-3 glass-effect rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 inline-flex items-center gap-2 sm:gap-3 hover:bg-white/10 transition-colors text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="text-sm sm:text-base md:text-lg text-accent font-body font-medium whitespace-nowrap">
              Síguenos en Instagram
            </span>
          </motion.a>

          {/* Address Link */}
          <motion.a
            href="https://www.google.com/maps/search/?api=1&query=Calle+70A+No+23B+25,+Manizales,+Colombia"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 sm:mt-3 glass-effect rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 inline-flex items-center gap-2 sm:gap-3 hover:bg-white/10 transition-colors text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm sm:text-base md:text-lg text-accent font-body font-medium">
              Calle 70A No 23B 25, Manizales
            </span>
          </motion.a>
        </motion.div>
      </motion.div>
    </main>
  );
}

