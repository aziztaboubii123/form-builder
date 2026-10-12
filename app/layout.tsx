import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Form Builder — Formulaire d'inscription avec validation",
  description:
    "Formulaire d'inscription multi-champs avec validation côté client, aperçu de fichier, toasts de succès/erreur et indicateur de chargement.",
  keywords: ["formulaire", "validation", "Next.js", "React", "Tailwind"],
  openGraph: {
    title: "Form Builder",
    description: "Formulaire d'inscription avec validation complète",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}