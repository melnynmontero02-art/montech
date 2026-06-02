import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MONTECH — Modernizamos tu Negocio",
  description:
    "Sistemas POS, páginas web modernas, CRM, facturación y automatización de WhatsApp 24/7 para negocios en República Dominicana.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
