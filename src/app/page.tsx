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
      <section className="relative flex min-h-screen items-center px-4 pt-10 pb-32 sm:px-6 sm:pt-16 sm:pb-28 lg:px-8 lg:pt-20 lg:pb-28">
        {/* Fondo hero con imagen y overlay */}
        <div className="absolute inset-0 -z-10 bg-[#0b1220]">
          <img
            src="/acertijo/hero.png"
            alt="Barra de café en penumbra"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-[#0b1220]/60" />
          {/* Gradiente inferior muy visible en móviles para indicar contenido abajo */}
          <div className="absolute bottom-0 left-0 right-0 z-10 h-40 bg-gradient-to-t from-white via-white/60 to-white/30 md:h-24 md:from-transparent md:via-transparent" />
        </div>

        {/* Accentos de color - ocultos en móviles para no interferir con el logo */}
        <div className="pointer-events-none absolute inset-0 -z-0 hidden md:block">
          <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-orange/25 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-32 w-32 rounded-full bg-green/25 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 pb-8 sm:gap-10 sm:pb-0 md:gap-16 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)]">
          {/* Columna izquierda: texto principal (se muestra después del logo en móvil) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="order-2 max-w-xl space-y-5 sm:space-y-6 md:order-1 md:space-y-8"
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
              className="font-heading text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl"
            >
              Algo está despertando en{" "}
              <span className="text-orange">Manizales.</span>
            </motion.h1>

            {/* Bloque claro: encuesta + beneficio */}
            <motion.div
              variants={lineVariants}
              custom={2}
              className="mt-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 sm:px-5 sm:py-4"
            >
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light/80 sm:text-xs">
                Queremos conocerte.
              </p>
              <p className="mt-1 font-body text-sm leading-relaxed text-accent-light/90 sm:text-base">
                Responde una breve encuesta y recibe un capuchino gratis en nuestra
                apertura.
              </p>
            </motion.div>

            {/* Breve frase poética */}
            <motion.p
              variants={lineVariants}
              custom={3}
              className="font-body text-sm leading-relaxed text-accent-light/90 sm:text-base md:text-lg"
            >
              Antes de abrir nuestras puertas, queremos escucharte. Tu forma de
              disfrutar el café será el punto de partida de lo que estamos creando.
            </motion.p>

            {/* CTA principal */}
            <motion.div
              variants={lineVariants}
              custom={4}
              className="flex max-w-md flex-col gap-3 pt-2 sm:gap-4 sm:pt-4"
            >
              <button
                onClick={() => handleScrollTo("encuesta")}
                className="inline-flex w-full items-center justify-center rounded-full bg-orange px-8 py-4 font-body text-base font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-[#e66a1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange focus-visible:ring-offset-[#0b1220] sm:w-auto sm:px-10 sm:py-4 sm:text-lg"
              >
                Comenzar el acertijo
              </button>
              <p className="font-body text-xs leading-relaxed text-accent-light/80 sm:text-sm">
                Completa la encuesta y recibe un capuchino gratis en nuestra
                apertura.
              </p>
            </motion.div>

            {/* Indicador de scroll responsive */}
            <motion.div
              className="mt-3 flex items-center justify-center gap-2 text-[11px] text-accent-light/75 sm:justify-start sm:text-xs"
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

            {/* Botones secundarios */}
            <motion.div
              variants={lineVariants}
              custom={5}
              className="flex flex-col gap-3 pt-1 sm:flex-row sm:gap-4"
            >
              <a
                href="https://www.instagram.com/acertijocafe?igsh=aHgyMjJ3Y3BoaW1h"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-green bg-green/20 px-7 py-3 font-body text-xs font-medium text-accent-light transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d76018] focus-visible:ring-offset-[#0b1220] sm:px-8 sm:text-sm"
              >
                <span className="mr-2">Instagram</span>
                <span className="opacity-70">@acertijocafe</span>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Calle+70A+No+23B+25,+Manizales,+Colombia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-brown bg-brown/30 px-7 py-3 font-body text-xs font-medium text-accent-light transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d76018] focus-visible:ring-offset-[#0b1220] sm:px-8 sm:text-sm"
              >
                Calle 70A No 23B 25, Manizales
              </a>
            </motion.div>

            {/* Texto PRÓXIMAMENTE solo en móviles, después de la dirección */}
            <motion.div
              variants={lineVariants}
              custom={6}
              className="mx-auto mt-6 w-full max-w-xs space-y-3 text-center md:hidden"
            >
              <p className="font-body text-xs uppercase tracking-[0.18em] text-accent-light/80">
                PRÓXIMAMENTE
              </p>
              <p className="font-body text-sm leading-relaxed text-accent-light/90">
                Un lugar para quienes encuentran en una taza de café algo más que
                cafeína: una pausa, un enigma, un pequeño ritual.
              </p>
              <p className="font-body text-[11px] leading-relaxed text-accent-light/75">
                Primero te contamos una historia breve. Luego, podrás resolver una
                encuesta de pocos minutos y guardar tu capuchino de cortesía para la
                apertura.
              </p>
            </motion.div>
          </motion.div>

          {/* Columna derecha: logo + mini claim (primero en móvil) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="order-1 flex flex-col items-center gap-8 sm:gap-10 md:order-2 md:items-end"
          >
            <motion.div
              variants={lineVariants}
              custom={0}
              className="relative mx-auto h-52 w-52 sm:h-64 sm:w-64 md:mx-0 md:h-72 md:w-72"
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

            <motion.div
              variants={lineVariants}
              custom={1}
              className="mx-auto hidden w-full max-w-xs space-y-3 text-right md:mx-0 md:block md:max-w-sm"
            >
              <p className="font-body text-xs uppercase tracking-[0.18em] text-accent-light/80 sm:text-sm">
                PRÓXIMAMENTE
              </p>
              <p className="font-body text-sm leading-relaxed text-accent-light/90 sm:text-base md:text-lg">
                Un lugar para quienes encuentran en una taza de café algo más que
                cafeína: una pausa, un enigma, un pequeño ritual.
              </p>
              <p className="font-body text-[11px] leading-relaxed text-accent-light/75 sm:text-xs">
                Primero te contamos una historia breve. Luego, podrás resolver una
                encuesta de pocos minutos y guardar tu capuchino de cortesía para la
                apertura.
              </p>
            </motion.div>
          </motion.div>
        </div>

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
