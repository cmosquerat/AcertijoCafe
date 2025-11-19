import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Acertijo Café - En Construcción",
  description: "Próximamente estaremos listos para servirte el mejor café",
  icons: {
    icon: "/SimboloBlanco.svg",
    shortcut: "/SimboloBlanco.svg",
    apple: "/SimboloBlanco.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${poppins.variable} ${roboto.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}

