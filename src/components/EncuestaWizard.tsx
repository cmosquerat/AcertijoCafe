"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";

interface SurveyData {
  // Ubicación y datos básicos
  barrio: string;
  edad: string;
  ocupacion: string;

  // Hábitos de consumo
  frecuencia: string;
  tipoCafe: string;
  intensidad: string;
  temperatura: string;
  tipoLeche: string;

  // Gustos y preferencias
  elecciones: string[];
  importanciaOrigen: string;
  perfilesSabor: string[];

  // Experiencia
  horario: string;
  valores: string[];

  // Contacto
  email: string;
  celular: string;

  // Autorización
  autorizacion: string;
}

const initialData: SurveyData = {
  barrio: "",
  edad: "",
  ocupacion: "",
  frecuencia: "",
  tipoCafe: "",
  intensidad: "",
  temperatura: "",
  tipoLeche: "",
  elecciones: [],
  importanciaOrigen: "",
  perfilesSabor: [],
  horario: "",
  valores: [],
  email: "",
  celular: "",
  autorizacion: "",
};

const steps = [
  "intro",
  "ubicacion",
  "habitos",
  "gustos",
  "experiencia",
  "contacto",
  "autorizacion",
  "completion",
] as const;

type StepId = (typeof steps)[number];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export default function EncuestaWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [data, setData] = useState<SurveyData>(initialData);
  const [isComplete, setIsComplete] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateData = (field: keyof SurveyData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setCurrentStep((prev) =>
      prev < steps.length - 1 ? prev + 1 : prev,
    );
  };

  const handleBack = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const createHeadersIfNeeded = async (): Promise<boolean> => {
    try {
      // Crear los encabezados como primera fila
      // SheetDB usa la primera fila como encabezados automáticamente
      const headersData = {
        codigo: "codigo",
        fecha: "fecha",
        barrio: "barrio",
        edad: "edad",
        ocupacion: "ocupacion",
        frecuencia: "frecuencia",
        tipoCafe: "tipoCafe",
        intensidad: "intensidad",
        temperatura: "temperatura",
        tipoLeche: "tipoLeche",
        elecciones: "elecciones",
        importanciaOrigen: "importanciaOrigen",
        perfilesSabor: "perfilesSabor",
        horario: "horario",
        valores: "valores",
        email: "email",
        celular: "celular",
        autorizacion: "autorizacion",
      };

      const response = await fetch("https://sheetdb.io/api/v1/kvh9rj37zuphl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [headersData] }),
      });

      if (response.ok) {
        console.log("Encabezados creados exitosamente");
        return true;
      }

      // Si hay error, intentar parsearlo
      const errorText = await response.text();
      console.log("Respuesta al crear encabezados:", errorText);
      
      return false;
    } catch (error) {
      console.error("Error al crear encabezados:", error);
      return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Generar código único antes de enviar
      const uniqueCode = `ACERTIJO-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      // Normalizar celular para que Sheets no lo interprete como fórmula
      const celularValue =
        data.celular && data.celular.trim().startsWith("+")
          ? `'${data.celular.trim()}`
          : data.celular || "";
      
      // Preparar datos para SheetDB (convertir arrays a strings y evitar valores null/undefined)
      const dataToSend: Record<string, string> = {
        codigo: uniqueCode,
        fecha: new Date().toISOString(),
        barrio: data.barrio || "",
        edad: data.edad || "",
        ocupacion: data.ocupacion || "",
        frecuencia: data.frecuencia || "",
        tipoCafe: data.tipoCafe || "",
        intensidad: data.intensidad || "",
        temperatura: data.temperatura || "",
        tipoLeche: data.tipoLeche || "",
        elecciones: data.elecciones.length > 0 ? data.elecciones.join(", ") : "",
        importanciaOrigen: data.importanciaOrigen || "",
        perfilesSabor: data.perfilesSabor.length > 0 ? data.perfilesSabor.join(", ") : "",
        horario: data.horario || "",
        valores: data.valores.length > 0 ? data.valores.join(", ") : "",
        email: data.email || "",
        celular: celularValue,
        autorizacion: data.autorizacion || "",
      };

      // Enviar datos a SheetDB según la documentación oficial
      let response = await fetch("https://sheetdb.io/api/v1/kvh9rj37zuphl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [dataToSend] }),
      });

      // Si el error es porque la hoja está vacía, crear los encabezados primero
      if (!response.ok) {
        const errorText = await response.text();
        console.error("SheetDB Error Response:", errorText);
        
        try {
          const errorJson = JSON.parse(errorText);
          if (errorJson.error && errorJson.error.includes("empty")) {
            console.log("La hoja está vacía, creando encabezados primero...");
            
            // Crear los encabezados
            const headersCreated = await createHeadersIfNeeded();
            
            if (headersCreated) {
              // Esperar un momento para que SheetDB procese los encabezados
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              // Reintentar enviar los datos
              response = await fetch("https://sheetdb.io/api/v1/kvh9rj37zuphl", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: [dataToSend] }),
              });
              
              // Verificar si el segundo intento fue exitoso
              if (!response.ok) {
                const retryErrorText = await response.text();
                throw new Error(`Error al guardar después de crear encabezados: ${response.status} ${response.statusText}. ${retryErrorText}`);
              }
            } else {
              throw new Error(`Error al crear encabezados. Error original: ${errorText}`);
            }
          } else {
            // Si el error no es por hoja vacía, lanzar el error original
            throw new Error(`Error al guardar: ${response.status} ${response.statusText}. ${errorText}`);
          }
        } catch (parseError) {
          // Si no se puede parsear el error, lanzar error genérico
          throw new Error(`Error al guardar: ${response.status} ${response.statusText}. ${errorText}`);
        }
      }

      // Si llegamos aquí, la respuesta fue exitosa
      const result = await response.json();
      console.log("Datos guardados exitosamente:", result);

      // Guardar código QR para mostrar
      setQrCode(uniqueCode);
      setIsComplete(true);
      setCurrentStep(steps.length - 1);
    } catch (error) {
      // En caso de error, aún mostrar el código pero loguear el error
      console.error("Error al guardar en SheetDB:", error);
      const uniqueCode = `ACERTIJO-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      setQrCode(uniqueCode);
      setIsComplete(true);
      setCurrentStep(steps.length - 1);
      // Podrías mostrar un mensaje de error al usuario si lo deseas
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleArrayValue = (field: keyof SurveyData, value: string) => {
    const current = data[field] as string[];
    if (current.includes(value)) {
      updateData(
        field,
        current.filter((v) => v !== value),
      );
    } else {
      updateData(field, [...current, value]);
    }
  };

  const direction = currentStep > 0 ? 1 : -1;
  const isIntermediateStep =
    currentStep > 0 && currentStep < steps.length - 1;

  return (
    <div className="w-full">
      {/* Barra de progreso */}
      {isIntermediateStep && (
        <div className="mb-8">
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(216,225,226,0.2)" }}
          >
            <motion.div
              className="h-full"
              style={{ backgroundColor: "#d76018" }}
              initial={{ width: 0 }}
              animate={{
                width: `${(currentStep / (steps.length - 2)) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="mt-2 text-center text-xs text-accent-light/50">
            {currentStep} de {steps.length - 2}
          </p>
        </div>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="rounded-3xl bg-white/5 p-6 shadow-xl ring-1 ring-white/10 sm:p-8 md:p-10"
        >
          {/* Intro Step - Storytelling */}
          {steps[currentStep] === "intro" && (
            <div className="space-y-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-6"
              >
                <p
                  className="text-sm font-body uppercase tracking-[0.18em] sm:text-base"
                  style={{ color: "#1a365c", opacity: 0.8 }}
                >
                  Hay momentos que comienzan en silencio…
                </p>
                <div className="space-y-5 text-left sm:space-y-6">
                  <p className="font-body text-base leading-relaxed text-primary-dark/90 sm:text-lg md:text-xl">
                    Una idea que se tuesta despacio, que se mueve entre aromas intensos y decisiones cuidadosas. Algo nuevo está despertando en Manizales. Algo creado a partir de pasión, técnica y una obsesión por el buen café.
                  </p>
                  <p className="font-body text-base leading-relaxed text-primary-dark/90 sm:text-lg md:text-xl">
                    En <span className="font-semibold">Acertijo Café</span> creemos que las mejores experiencias empiezan escuchando. Queremos conocer a quienes, como nosotros, encuentran en una taza un ritual, un refugio o un impulso. Por eso, antes de abrir nuestras puertas, queremos abrir una conversación contigo.
                  </p>
                  <p className="font-body text-base leading-relaxed text-primary-dark/90 sm:text-lg md:text-xl">
                    No diremos mucho todavía —parte de la magia está en el misterio— pero sí podemos adelantarte esto: estamos construyendo un espacio pensado para la ciudad, para tu rutina, para tu forma de disfrutar el café. Un lugar donde cada detalle tiene intención.
                  </p>
                  <p className="font-body text-base leading-relaxed text-primary-dark/90 sm:text-lg md:text-xl">
                    Si estás aquí, es porque queremos que seas parte de los primeros en descubrir lo que viene. Tu opinión nos ayudará a diseñar una experiencia que realmente valga la pena. Solo te tomará unos minutos y, como agradecimiento, tendrás un capuchino de cortesía para disfrutar en nuestra apertura.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex justify-center pt-4 sm:pt-6"
              >
                <motion.button
                  onClick={handleNext}
                  className="group relative w-full max-w-sm overflow-hidden rounded-full bg-orange px-8 py-4 font-body text-base font-semibold tracking-wide text-white shadow-lg shadow-orange/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange/40 sm:w-auto sm:px-12 sm:py-5 sm:text-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {/* Efecto de brillo animado */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Efecto de pulso sutil alrededor */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/30"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <span className="relative z-10 inline-flex items-center gap-2">
                    Comienza el acertijo
                    <motion.svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <path
                        d="M13 7L18 12L13 17M6 7L11 12L6 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </span>
                </motion.button>
              </motion.div>
            </div>
          )}

          {/* Ubicación Step */}
          {steps[currentStep] === "ubicacion" && (
            <div className="space-y-8">
              <h2 className="font-heading text-2xl font-bold text-primary-dark sm:text-3xl">
                1. Ubicación y datos básicos
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-3 block font-body font-medium text-primary-dark/90">
                    ¿En qué barrio vives actualmente?
                  </label>
                  <div className="space-y-2">
                    {[
                      "Palermo",
                      "La Camelia",
                      "Milán",
                      "Cámbulos",
                      "La Sultana",
                      "Otro",
                    ].map((barrio) => (
                      <button
                        key={barrio}
                        onClick={() => updateData("barrio", barrio)}
                        className={`w-full rounded-xl px-6 py-4 text-left transition-all ${
                          data.barrio === barrio
                            ? "border-2 border-orange/50 bg-orange/10"
                            : "border border-primary/10 bg-white/40 hover:border-primary/20"
                        }`}
                      >
                        <span className="font-body text-primary-dark">
                          {barrio}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block font-body font-medium text-primary-dark/90">
                    Edad
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {[
                      "15–20",
                      "21–25",
                      "26–30",
                      "31–40",
                      "41–50",
                      "51+",
                    ].map((edad) => (
                      <button
                        key={edad}
                        onClick={() => updateData("edad", edad)}
                        className={`rounded-xl px-4 py-3 text-sm transition-all ${
                          data.edad === edad
                            ? "border-2 border-green/50 bg-green/10"
                            : "border border-primary/10 bg-white/40 hover:border-primary/20"
                        }`}
                      >
                        <span className="font-body text-primary-dark">
                          {edad}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block font-body font-medium text-primary-dark/90">
                    Ocupación
                  </label>
                  <div className="space-y-2">
                    {[
                      "Estudiante",
                      "Empleado",
                      "Independiente",
                      "Emprendedor",
                      "Docente / académico",
                      "Otro",
                    ].map((ocupacion) => (
                      <button
                        key={ocupacion}
                        onClick={() => updateData("ocupacion", ocupacion)}
                        className={`w-full rounded-xl px-6 py-4 text-left transition-all ${
                          data.ocupacion === ocupacion
                            ? "border-2 border-orange/50 bg-orange/10"
                            : "border border-primary/10 bg-white/40 hover:border-primary/20"
                        }`}
                      >
                        <span className="font-body text-primary-dark">
                          {ocupacion}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="rounded-full border border-primary/10 bg-white/40 px-6 py-3 font-body text-primary-dark"
                >
                  Atrás
                </button>
                <button
                  onClick={handleNext}
                  disabled={
                    !data.barrio || !data.edad || !data.ocupacion
                  }
                  className="flex-1 rounded-full bg-orange px-6 py-3 font-body font-medium text-accent-light disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Hábitos Step */}
          {steps[currentStep] === "habitos" && (
            <div className="space-y-8">
              <h2 className="font-heading text-2xl font-bold text-primary-dark sm:text-3xl">
                2. Hábitos de consumo de café
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-3 block font-body font-medium text-primary-dark/90">
                    ¿Con qué frecuencia visitas una cafetería?
                  </label>
                  <div className="space-y-2">
                    {[
                      "Casi todos los días",
                      "2–3 veces por semana",
                      "1 vez por semana",
                      "1–2 veces al mes",
                      "Rara vez",
                    ].map((freq) => (
                      <button
                        key={freq}
                        onClick={() => updateData("frecuencia", freq)}
                        className={`w-full rounded-xl px-6 py-4 text-left transition-all ${
                          data.frecuencia === freq
                            ? "border-2 border-orange/50 bg-orange/10"
                            : "border border-primary/10 bg-white/40 hover:border-primary/20"
                        }`}
                      >
                        <span className="font-body text-primary-dark">
                          {freq}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block font-body font-medium text-primary-dark/90">
                    ¿Cómo sueles tomar café?
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      "Instantáneo",
                      "Filtrado (V60, Chemex, Prensa Francesa)",
                      "Espresso",
                      "Capuchino / Latte",
                      "Cold brew",
                      "No tomo café (pero consumo otras bebidas)",
                    ].map((tipo) => (
                      <button
                        key={tipo}
                        onClick={() => updateData("tipoCafe", tipo)}
                        className={`rounded-xl px-4 py-3 text-sm transition-all ${
                          data.tipoCafe === tipo
                            ? "border-2 border-green/50 bg-green/10"
                            : "border border-primary/10 bg-white/40 hover:border-primary/20"
                        }`}
                      >
                        <span className="font-body text-primary-dark">
                          {tipo}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block font-body font-medium text-primary-dark/90">
                    Intensidad preferida del café
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    {["Suave", "Medio", "Fuerte"].map((intensidad) => (
                      <button
                        key={intensidad}
                        onClick={() =>
                          updateData("intensidad", intensidad)
                        }
                        className={`flex-1 rounded-xl px-6 py-3 text-sm sm:py-4 sm:text-base transition-all ${
                          data.intensidad === intensidad
                            ? "border-2 border-orange/50 bg-orange/10"
                            : "border border-primary/10 bg-white/40 hover:border-primary/20"
                        }`}
                      >
                        <span className="font-body text-primary-dark">
                          {intensidad}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block font-body font-medium text-primary-dark/90">
                    ¿Prefieres bebidas calientes, frías o ambas?
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    {["Solo calientes", "Solo frías", "Ambas"].map(
                      (temp) => (
                        <button
                          key={temp}
                          onClick={() =>
                            updateData("temperatura", temp)
                          }
                          className={`flex-1 rounded-xl px-6 py-3 text-sm sm:py-4 sm:text-base transition-all ${
                            data.temperatura === temp
                              ? "border-2 border-green/50 bg-green/10"
                              : "border border-primary/10 bg-white/40 hover:border-primary/20"
                          }`}
                        >
                          <span className="font-body text-primary-dark text-left">
                            {temp}
                          </span>
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block font-body font-medium text-primary-dark/90">
                    Tipo de leche que usas normalmente
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {[
                      "Entera",
                      "Deslactosada",
                      "Almendras",
                      "Avena",
                      "Soya",
                      "Sin leche",
                    ].map((leche) => (
                      <button
                        key={leche}
                        onClick={() => updateData("tipoLeche", leche)}
                        className={`rounded-xl px-4 py-3 text-sm transition-all ${
                          data.tipoLeche === leche
                            ? "border-2 border-orange/50 bg-orange/10"
                            : "border border-primary/10 bg-white/40 hover:border-primary/20"
                        }`}
                      >
                        <span className="font-body text-primary-dark">
                          {leche}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="rounded-full border border-primary/10 bg-white/40 px-6 py-3 font-body text-primary-dark"
                >
                  Atrás
                </button>
                <button
                  onClick={handleNext}
                  disabled={
                    !data.frecuencia ||
                    !data.tipoCafe ||
                    !data.intensidad ||
                    !data.temperatura ||
                    !data.tipoLeche
                  }
                  className="flex-1 rounded-full bg-orange px-6 py-3 font-body font-medium text-accent-light disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Gustos Step */}
          {steps[currentStep] === "gustos" && (
            <div className="space-y-8">
              <h2 className="font-heading text-2xl font-bold text-primary-dark sm:text-3xl">
                3. Gustos y preferencias
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-3 block font-body font-medium text-primary-dark/90">
                    ¿Qué elegirías en una cafetería? (máximo 3 opciones)
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      "Pastelería artesanal",
                      "Opciones saludables",
                      "Sándwiches y brunch",
                      "Bebidas frías especiales",
                      "Métodos de filtrado",
                      "Café de origen",
                      "Bebidas sin café",
                    ].map((opcion) => (
                      <button
                        key={opcion}
                        onClick={() =>
                          toggleArrayValue("elecciones", opcion)
                        }
                        disabled={
                          !data.elecciones.includes(opcion) &&
                          data.elecciones.length >= 3
                        }
                        className={`rounded-xl px-4 py-3 text-sm transition-all ${
                          data.elecciones.includes(opcion)
                            ? "border-2 border-orange/50 bg-orange/10"
                            : "border border-primary/10 bg-white/40 hover:border-primary/20"
                        } disabled:cursor-not-allowed disabled:opacity-30`}
                      >
                        <span className="font-body text-primary-dark">
                          {opcion}
                        </span>
                      </button>
                    ))}
                  </div>
                  {data.elecciones.length > 0 && (
                    <p className="mt-2 text-xs text-primary-dark/60">
                      Seleccionadas: {data.elecciones.length}/3
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-3 block font-body font-medium text-primary-dark/90">
                    ¿Qué tan importante es el origen y calidad del café?
                  </label>
                  <div className="space-y-2">
                    {[
                      "Muy importante",
                      "Importante",
                      "No importa mucho",
                      "No lo noto",
                    ].map((importancia) => (
                      <button
                        key={importancia}
                        onClick={() =>
                          updateData("importanciaOrigen", importancia)
                        }
                        className={`w-full rounded-xl px-6 py-4 text-left transition-all ${
                          data.importanciaOrigen === importancia
                            ? "border-2 border-green/50 bg-green/10"
                            : "border border-primary/10 bg-white/40 hover:border-primary/20"
                        }`}
                      >
                        <span className="font-body text-primary-dark">
                          {importancia}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block font-body font-medium text-primary-dark/90">
                    ¿Qué perfiles de sabor te gustan más? (elige todos los que
                    apliquen)
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      "Dulces y cremosos",
                      "Especiados (chai, canela, jengibre)",
                      "Cítricos / frutales",
                      "Chocolate / nuez",
                      "Amargos / intensos",
                    ].map((perfil) => (
                      <button
                        key={perfil}
                        onClick={() =>
                          toggleArrayValue("perfilesSabor", perfil)
                        }
                        className={`rounded-xl px-4 py-3 text-sm transition-all ${
                          data.perfilesSabor.includes(perfil)
                            ? "border-2 border-orange/50 bg-orange/10"
                            : "border border-primary/10 bg-white/40 hover:border-primary/20"
                        }`}
                      >
                        <span className="font-body text-primary-dark">
                          {perfil}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="rounded-full border border-primary/10 bg-white/40 px-6 py-3 font-body text-primary-dark"
                >
                  Atrás
                </button>
                <button
                  onClick={handleNext}
                  disabled={
                    data.elecciones.length === 0 ||
                    !data.importanciaOrigen
                  }
                  className="flex-1 rounded-full bg-orange px-6 py-3 font-body font-medium text-accent-light disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Experiencia Step */}
          {steps[currentStep] === "experiencia" && (
            <div className="space-y-8">
              <h2 className="font-heading text-2xl font-bold text-primary-dark sm:text-3xl">
                4. Experiencia
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-3 block font-body font-medium text-primary-dark/90">
                    ¿En qué horario visitas cafeterías con más frecuencia?
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      "Mañana (7 am – 10 am)",
                      "Medio día (11 am – 2 pm)",
                      "Tarde (3 pm – 6 pm)",
                      "Noche (6 pm – 9 pm)",
                    ].map((horario) => (
                      <button
                        key={horario}
                        onClick={() => updateData("horario", horario)}
                        className={`rounded-xl px-4 py-4 text-sm transition-all ${
                          data.horario === horario
                            ? "border-2 border-orange/50 bg-orange/10"
                            : "border border-primary/10 bg-white/40 hover:border-primary/20"
                        }`}
                      >
                        <span className="font-body text-primary-dark">
                          {horario}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block font-body font-medium text-primary-dark/90">
                    ¿Qué valoras más en una cafetería? (elige hasta 2 opciones)
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      "Calidad del café",
                      "Precio",
                      "Ambiente",
                      "Atención",
                      "Ubicación",
                    ].map((valor) => (
                      <button
                        key={valor}
                        onClick={() =>
                          toggleArrayValue("valores", valor)
                        }
                        disabled={
                          !data.valores.includes(valor) &&
                          data.valores.length >= 2
                        }
                        className={`rounded-xl px-4 py-3 text-sm transition-all ${
                          data.valores.includes(valor)
                            ? "border-2 border-green/50 bg-green/10"
                            : "border border-primary/10 bg-white/40 hover:border-primary/20"
                        } disabled:cursor-not-allowed disabled:opacity-30`}
                      >
                        <span className="font-body text-primary-dark">
                          {valor}
                        </span>
                      </button>
                    ))}
                  </div>
                  {data.valores.length > 0 && (
                    <p className="mt-2 text-xs text-primary-dark/60">
                      Seleccionadas: {data.valores.length}/2
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="rounded-full border border-primary/10 bg-white/40 px-6 py-3 font-body text-primary-dark"
                >
                  Atrás
                </button>
                <button
                  onClick={handleNext}
                  disabled={!data.horario || data.valores.length === 0}
                  className="flex-1 rounded-full bg-orange px-6 py-3 font-body font-medium text-accent-light disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Contacto Step */}
          {steps[currentStep] === "contacto" && (
            <div className="space-y-8">
              <h2 className="font-heading text-2xl font-bold text-primary-dark sm:text-3xl">
                5. Información para contacto y beneficios
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-3 block font-body font-medium text-primary-dark/90">
                    Correo electrónico (opcional)
                  </label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => updateData("email", e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full rounded-xl border border-primary/15 bg-white/60 px-6 py-4 font-body text-primary-dark placeholder:text-primary/40 focus:border-orange/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block font-body font-medium text-primary-dark/90">
                    Número de celular (opcional)
                  </label>
                  <input
                    type="tel"
                    value={data.celular}
                    onChange={(e) => updateData("celular", e.target.value)}
                    placeholder="+57 300 000 0000"
                    className="w-full rounded-xl border border-primary/15 bg-white/60 px-6 py-4 font-body text-primary-dark placeholder:text-primary/40 focus:border-green/50 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="rounded-full border border-primary/10 bg-white/40 px-6 py-3 font-body text-primary-dark"
                >
                  Atrás
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 rounded-full bg-orange px-6 py-3 font-body font-medium text-accent-light"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Autorización Step */}
          {steps[currentStep] === "autorizacion" && (
            <div className="space-y-8">
              <h2 className="font-heading text-2xl font-bold text-primary-dark sm:text-3xl">
                6. Autorización para tratamiento de datos
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-4 block font-body font-medium text-primary-dark/90">
                    ¿Autorizas a Acertijo Café para el uso de tus datos con
                    fines comerciales, informativos y de contacto, según la Ley
                    1581 de 2012?
                  </label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => updateData("autorizacion", "si")}
                      className={`flex-1 rounded-xl px-6 py-4 transition-all ${
                        data.autorizacion === "si"
                          ? "border-2 border-green/50 bg-green/10"
                          : "border border-primary/10 bg-white/40 hover:border-primary/20"
                      }`}
                    >
                      <span className="font-body text-primary-dark">
                        Sí, autorizo
                      </span>
                    </button>
                    <button
                      onClick={() => updateData("autorizacion", "no")}
                      className={`flex-1 rounded-xl px-6 py-4 transition-all ${
                        data.autorizacion === "no"
                          ? "border-2 border-orange/50 bg-orange/10"
                          : "border border-primary/10 bg-white/40 hover:border-primary/20"
                      }`}
                    >
                      <span className="font-body text-primary-dark">
                        No autorizo
                      </span>
                    </button>
                  </div>
                </div>

                <div className="rounded-xl bg-primary/5 p-6 ring-1 ring-primary/10">
                  <p className="font-body text-sm leading-relaxed text-primary-dark/80">
                    <strong className="text-primary-dark/90">
                      Nota:
                    </strong>{" "}
                    Los datos serán usados únicamente para comunicar
                    beneficios, promociones, apertura y actividades
                    relacionadas con Acertijo Café. Puedes solicitar la
                    eliminación de tu información en cualquier momento.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="rounded-full border border-primary/10 bg-white/40 px-6 py-3 font-body text-primary-dark"
                >
                  Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!data.autorizacion || isSubmitting}
                  className="flex-1 rounded-full bg-orange px-6 py-3 font-body font-medium text-accent-light disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando..." : "Enviar encuesta"}
                </button>
              </div>
            </div>
          )}

          {/* Completion Step */}
          {steps[currentStep] === "completion" && isComplete && (
            <div className="space-y-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange">
                  <svg
                    className="h-10 w-10 text-accent-light"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </motion.div>

              <h2 className="font-heading text-3xl font-bold text-primary-dark sm:text-4xl">
                ¡Gracias!
              </h2>

              <p className="font-body text-lg leading-relaxed text-primary-dark/80">
                Presenta el correo de confirmación o un pantallazo al
                finalizar esta encuesta para reclamar tu capuchino gratis en
                nuestra apertura.
              </p>

              <div className="rounded-2xl bg-white p-6 shadow-inner ring-1 ring-primary/10 sm:p-8">
                <p className="mb-6 font-body text-sm text-primary-dark/70">
                  Tu código de reclamación:
                </p>
                <div className="flex flex-col items-center gap-6">
                  <div className="rounded-2xl bg-white p-4 shadow-md">
                    <QRCodeSVG
                      value={qrCode}
                      size={180}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <p className="font-mono text-lg font-bold text-primary-dark">
                    {qrCode}
                  </p>
                  <p className="font-body text-xs text-primary-dark/60">
                    Guarda este código o toma una captura de pantalla.
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.push("/")}
                className="rounded-full border border-primary/15 bg-white/60 px-8 py-4 font-body font-medium text-primary-dark hover:border-orange/50"
              >
                Volver al inicio
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


