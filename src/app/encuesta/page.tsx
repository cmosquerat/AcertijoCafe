"use client";

import EncuestaWizard from "@/components/EncuestaWizard";

export default function EncuestaPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#1a365c" }}
    >
      {/* Background accents - sólidos */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-orange blur-[120px] opacity-[0.08]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-green blur-[100px] opacity-[0.08]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
        <div className="w-full max-w-2xl">
          <EncuestaWizard />
        </div>
      </div>
    </div>
  );
}


