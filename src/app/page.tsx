"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import EncuestaWizard from "@/components/EncuestaWizard";

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
        staggerChildren: 0.14,
        delayChildren: 0.18,
      },
    },
  };

  const lineVariants: any = {
    hidden: { opacity: 0, y: 12 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: i * 0.12,
        ease: "easeOut",
      },
    }),
  };

  const sectionVariants: any = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-primary-dark text-accent-light">
      {/* HERO / PORTADA */}
      <section className="relative flex min-h-screen items-center justify-center px-4 pt-20 pb-12 sm:px-6 sm:pt-24 sm:pb-16 md:min-h-screen md:pt-20 md:pb-16 lg:px-8 lg:pt-20 lg:pb-16">
        {/* Fondo hero con imagen y overlay */}
        <div className="absolute inset-0 -z-10 bg-[#0b1220]">
          <img
            src="/acertijo/hero.png"
            alt="Barra de café en penumbra"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-[#0b1220]/60" />
          {/* Gradiente inferior para indicar contenido abajo */}
          <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent md:h-24 md:from-transparent md:via-transparent" />
        </div>

        {/* Accentos de color - ocultos en móviles para no interferir con el logo */}
        <div className="pointer-events-none absolute inset-0 -z-0 hidden md:block">
          <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-orange/25 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-32 w-32 rounded-full bg-green/25 blur-3xl" />
        </div>

        {/* Logo de Instagram */}
        <motion.a
          href="https://www.instagram.com/acertijocafe?igsh=aHgyMjJ3Y3BoaW1h"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute top-4 right-4 z-20 sm:top-6 sm:right-6 md:top-8 md:right-8 lg:top-12 lg:right-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="h-7 w-7 text-accent-light transition-colors duration-200 hover:text-green sm:h-8 sm:w-8 md:h-10 md:w-10"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-label="Instagram"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </motion.a>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-6 sm:gap-8 md:gap-16 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)]">
          {/* Columna izquierda: texto principal (se muestra después del logo en móvil) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="order-2 max-w-xl space-y-6 text-center sm:space-y-5 md:order-1 md:space-y-8 md:text-left"
          >
            <motion.p
              variants={lineVariants}
              custom={0}
              className="font-body text-[11px] tracking-[0.22em] uppercase sm:text-xs"
              style={{ color: "#d8e1e2", opacity: 0.7 }}
            >
              ACERTIJO CAFÉ · MANIZALES
            </motion.p>

            <motion.h1
              variants={lineVariants}
              custom={1}
              className="font-heading text-3xl font-semibold leading-tight text-balance mb-2 sm:text-4xl sm:mb-0 md:text-5xl lg:text-6xl"
            >
              Algo está despertando en{" "}
              <span className="text-orange">Manizales.</span>
            </motion.h1>

            {/* Breve frase poética */}
            <motion.p
              variants={lineVariants}
              custom={3}
              className="font-body max-w-md mx-auto md:mx-0 text-balance text-sm leading-relaxed text-accent-light/90 mt-4 sm:text-base sm:mt-0 md:text-lg"
            >
              <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.28em] text-orange/90 sm:mb-2 sm:text-xs">
                Hay un café escondido detrás de un acertijo
              </span>
              <span className="block text-[13px] leading-relaxed text-accent-light/85 sm:text-sm md:text-base">
                Ayúdanos a resolver nuestro primer enigma y reclama un capuchino de cortesía en nuestra apertura.
              </span>
            </motion.p>

            {/* CTA principal */}
            <motion.div
              variants={lineVariants}
              custom={4}
              className="flex max-w-md mx-auto md:mx-0 flex-col gap-3 pt-4 sm:gap-3 sm:pt-2 md:gap-4 md:pt-4"
            >
              <button
                onClick={() => handleScrollTo("encuesta")}
                className="inline-flex w-full items-center justify-center rounded-full bg-orange px-6 py-3.5 font-body text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-[#e66a1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange focus-visible:ring-offset-[#0b1220] sm:w-auto sm:px-8 sm:py-4 sm:text-base md:px-10 md:text-lg"
              >
                Comenzar el acertijo
              </button>
              <p className="font-body text-[11px] leading-relaxed text-accent-light/80 sm:text-xs md:text-sm">
                Responde la encuesta y recibe un capuchino de cortesía en nuestra apertura.
              </p>
            </motion.div>

            {/* Indicador de scroll en móviles, aprovechando el espacio inferior del hero */}
            <motion.div
              variants={lineVariants}
              custom={5}
              className="mt-8 flex items-center justify-center gap-2 text-[11px] text-accent-light/75 md:hidden sm:text-xs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: [0, 4, 0] }}
              transition={{
                delay: 1,
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              onClick={() => handleScrollTo("como-funciona")}
            >
              <span className="uppercase tracking-[0.18em]">
                Desliza para continuar
              </span>
              <svg
                className="h-3 w-3 text-accent-light/80"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 16L6 10.5L7.4 9L12 13.2L16.6 9L18 10.5L12 16Z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Columna derecha: logo + mini claim (primero en móvil) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="order-1 flex flex-col items-center gap-4 sm:gap-6 md:order-2 md:items-end md:gap-10"
          >
            <motion.div
              variants={lineVariants}
              custom={0}
              className="relative mx-auto h-40 w-40 sm:h-52 sm:w-52 md:mx-0 md:h-96 md:w-96 lg:h-[28rem] lg:w-[28rem]"
            >
              {/* Fondo sutil detrás del logo, sin brillo excesivo */}
              <div className="absolute inset-0 rounded-full bg-accent/10 shadow-[0_20px_45px_rgba(0,0,0,0.75)]" />
              <Image
                src="/logo-principal.svg"
                alt="Acertijo Café"
                fill
                className="relative object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Indicador de scroll para desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => handleScrollTo("como-funciona")}
          whileHover={{ y: 4 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent-light/60 font-body">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              className="h-5 w-5 text-accent-light/60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* CÓMO FUNCIONA (3 PASOS) */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        id="como-funciona"
        className="relative overflow-hidden bg-[#0f172a] px-4 py-16 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      >
        {/* Imagen de granos como acento de fondo */}
        <div className="pointer-events-none absolute inset-0">
          <div className="relative h-full w-full bg-[#0f172a]">
            <img
              src="/acertijo/granos.png"
              alt="Granos de café"
              className="absolute inset-0 h-full w-full object-cover object-right opacity-40 md:opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#0f172a] via-[#0f172a]/50 to-[#0f172a]" />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-center">
          {/* Columna izquierda: texto y pasos */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-3">
              <p className="font-body text-xs uppercase tracking-[0.18em] text-accent-light/70">
                CÓMO FUNCIONA
              </p>
              <h2 className="font-heading text-2xl text-accent-light sm:text-3xl">
                Tres pasos sencillos para comenzar el acertijo.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {/* Paso 1 */}
              <div className="flex flex-col items-start rounded-2xl bg-white/5 p-6 text-left shadow-lg shadow-black/20 ring-1 ring-white/10">
                <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange/20 text-sm font-semibold text-orange">
                  1
                </span>
                <h3 className="mb-2 font-heading text-lg text-accent-light">
                  Respondes la encuesta
                </h3>
                <p className="font-body text-sm leading-relaxed text-accent-light/80">
                  Son solo unos minutos. Queremos calidad, no cantidad.
                </p>
              </div>

              {/* Paso 2 */}
              <div className="flex flex-col items-start rounded-2xl bg-white/5 p-6 text-left shadow-lg shadow-black/20 ring-1 ring-white/10">
                <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-green/20 text-sm font-semibold text-green">
                  2
                </span>
                <h3 className="mb-2 font-heading text-lg text-accent-light">
                  Guardamos tus respuestas
                </h3>
                <p className="font-body text-sm leading-relaxed text-accent-light/80">
                  Usamos tus datos de forma responsable para entender mejor a quienes
                  aman el café en la ciudad.
                </p>
              </div>

              {/* Paso 3 */}
              <div className="flex flex-col items-start rounded-2xl bg-white/5 p-6 text-left shadow-lg shadow-black/20 ring-1 ring-white/10">
                <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brown/20 text-sm font-semibold text-brown">
                  3
                </span>
                <h3 className="mb-2 font-heading text-lg text-accent-light">
                  Disfrutas un capuchino de cortesía
                </h3>
                <p className="font-body text-sm leading-relaxed text-accent-light/80">
                  En la apertura, podrás reclamar un capuchino gratis y ser de las
                  primeras personas en vivir Acertijo Café.
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha: imágenes integradas */}
          <div className="mt-4 flex flex-1 flex-col gap-4 md:mt-0">
            <div className="relative h-40 w-full overflow-hidden rounded-3xl bg-white/5 shadow-lg shadow-black/30 sm:h-52">
              <img
                src="/acertijo/hero.png"
                alt="Máquina de espresso preparando café"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
            </div>
            <div className="relative h-32 w-full overflow-hidden rounded-3xl bg-white/5 shadow-lg shadow-black/30 sm:h-44">
              <img
                src="/acertijo/story.png"
                alt="Taza de café servida cuidadosamente"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECCIÓN DE ENCUESTA */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        id="encuesta"
        className="px-4 py-16 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        style={{ backgroundColor: "#f3f4f6" }}
      >
        <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
          <div className="space-y-3 text-center">
            <p className="font-body text-xs uppercase tracking-[0.18em] text-primary/70">
              COMENCEMOS EL ACERTIJO
            </p>
            <h2 className="font-heading text-2xl text-primary-dark sm:text-3xl">
              Comencemos el acertijo.
            </h2>
            <p className="font-body text-sm text-primary-dark/80 sm:text-base">
              Cuéntanos cómo vives el café. El resto lo ponemos nosotros.
            </p>
          </div>

          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm ring-1 ring-primary/10">
            <div className="h-1 bg-[#d76018]" />
            <div className="p-4 sm:p-6 md:p-8">
              <EncuestaWizard />
            </div>
          </div>
        </div>
      </motion.section>

      {/* CIERRE / CTA FINAL */}
      <footer
        className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
        style={{ backgroundColor: "#1a365c" }}
      >
        <div className="mx-auto max-w-4xl space-y-6 text-center text-accent-light">
          <p className="font-heading text-xl sm:text-2xl">
            Gracias por ser parte de lo que estamos preparando.
            <br />
            Nos vemos pronto, taza en mano.
          </p>
          <div className="h-px w-20 mx-auto bg-accent/30" />
          <p className="font-body text-[11px] leading-relaxed text-accent-light/70 sm:text-xs">
            Acertijo Café tratará tus datos conforme a la normativa vigente en
            Colombia. Podrás solicitar la actualización o eliminación de tu
            información en cualquier momento.
          </p>
          <p className="font-body text-[10px] text-accent-light/50">
            © {new Date().getFullYear()} Acertijo Café. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
