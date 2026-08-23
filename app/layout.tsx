import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ATM+ | Automação e IA para sua operação",
  description: "Automação e inteligência artificial para vendas, atendimento e processos. Identifique gargalos e escale sua operação com a ATM+.",
  openGraph: {
    title: "ATM+ | Automação e IA para sua operação",
    description: "Automação e inteligência artificial para vendas, atendimento e processos.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
