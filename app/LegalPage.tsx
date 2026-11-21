import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Brand } from "./Brand";

const site = "https://automatizemais.com";
export const contactEmail = "automatizemaiss@gmail.com";

const legalTitles = {
  "/privacidade": "Política de Privacidade",
  "/termos": "Termos de Uso",
  "/exclusao-de-dados": "Exclusão de Dados",
};

type LegalPath = keyof typeof legalTitles;

export function legalMetadata(path: LegalPath, description: string): Metadata {
  const title = `${legalTitles[path]} | Automatize Mais`;
  const url = `${site}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", locale: "pt_BR" },
  };
}

export function LegalLinks({ current }: { current?: LegalPath }) {
  return (
    <nav className="legal-links" aria-label="Documentos legais">
      {Object.entries(legalTitles).map(([path, label]) => (
        <Link key={path} href={path} aria-current={current === path ? "page" : undefined}>
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function CompanyIdentity() {
  return (
    <p>
      A Automatize Mais (ATM+) é o nome comercial de <strong>62775207 MATHEUS MIGUEL RODRIGUES DONHA</strong>,
      inscrita no CNPJ sob o nº 62.775.207/0001-95, em Ponta Grossa, Paraná, Brasil.
      Site oficial: <Link href="/">{site}</Link>.
    </p>
  );
}

export function LegalPage({ path, children }: { path: LegalPath; children: ReactNode }) {
  return (
    <>
      <header className="header">
        <Link href="/" className="logo-link" aria-label="ATM+ — início"><Brand /></Link>
        <Link href="/" className="button button--small">Voltar ao início</Link>
      </header>
      <main className="section-shell legal-page">
        <article>
          <header className="legal-page__heading">
            <h1>{legalTitles[path]}</h1>
            <p>Última atualização em <time dateTime="2026-11-21">21 de novembro de 2026</time></p>
          </header>
          {children}
        </article>
      </main>
      <footer>
        <Brand light />
        <LegalLinks current={path} />
        <small>© 2026 ATM+. Todos os direitos reservados.</small>
      </footer>
    </>
  );
}
