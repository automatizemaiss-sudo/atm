import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const output = new URL("../.next/server/app/", import.meta.url);
const legalPages = [
  ["privacidade", "Política de Privacidade"],
  ["termos", "Termos de Uso"],
  ["exclusao-de-dados", "Exclusão de Dados"],
];

function readPage(slug) {
  return readFile(new URL(`${slug}.html`, output), "utf8");
}

test("renders the landing page with its booking CTA and legal footer links", async () => {
  const html = await readPage("index");
  assert.match(html, /<title>ATM\+ \| Automação e IA para sua operação<\/title>/);
  assert.match(html, /<button[^>]*>Ver horários disponíveis/);
  assert.doesNotMatch(html, /<iframe\b/);

  const footer = html.match(/<footer>(.*?)<\/footer>/s)?.[1] ?? "";
  for (const [slug, title] of legalPages) {
    assert.ok(footer.includes(`href="/${slug}">${title}</a>`), title);
  }
});

for (const [slug, title] of legalPages) {
  test(`prerenders /${slug} with its own SEO metadata and return navigation`, async () => {
    const html = await readPage(slug);
    const head = html.match(/<head>(.*?)<\/head>/s)?.[1] ?? "";
    assert.ok(head.includes(`<title>${title} | Automatize Mais</title>`));
    assert.ok(head.includes(`rel="canonical" href="https://automatizemais.com/${slug}"`));
    assert.match(head, /<meta name="description" content="[^"]+"/);
    assert.doesNotMatch(head, /<meta[^>]+name="(?:robots|googlebot)"[^>]+noindex/i);
    assert.ok(html.includes(`<h1>${title}</h1>`));
    assert.match(html, /href="\/">Voltar ao início<\/a>/);
    assert.match(html, /62775207 MATHEUS MIGUEL RODRIGUES DONHA/);
    assert.match(html, /62\.775\.207\/0001-95/);
  });
}

test("renders email instructions for deletion requests", async () => {
  const html = await readPage("exclusao-de-dados");
  const subject = encodeURIComponent("Solicitação de exclusão de dados");
  assert.ok(html.includes(`href="mailto:automatizemaiss@gmail.com?subject=${subject}"`));
  assert.doesNotMatch(html, /<form\b/);
});
