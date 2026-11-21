import Link from "next/link";
import { CompanyIdentity, contactEmail, legalMetadata, LegalPage } from "../LegalPage";

export const metadata = legalMetadata(
  "/termos",
  "Consulte as condições de uso do site da Automatize Mais e as orientações para integrações com WhatsApp e IA.",
);

export default function Termos() {
  return (
    <LegalPage path="/termos">
      <section>
        <h2>Identificação e finalidade</h2>
        <CompanyIdentity />
        <p>O site apresenta os serviços da Automatize Mais e permite iniciar um contato ou agendar uma conversa. Os serviços podem incluir automação, agentes de inteligência artificial e integrações entre sistemas empresariais.</p>
      </section>

      <section>
        <h2>Uso do site e obrigações dos usuários</h2>
        <p>Use o site para fins lícitos, forneça informações corretas ao entrar em contato e respeite os direitos de terceiros. É vedado interferir no funcionamento do site, tentar obter acesso não autorizado, enviar conteúdo malicioso ou usar os canais de contato para fraude ou abuso.</p>
        <p>Clientes devem disponibilizar apenas contas e dados que estejam autorizados a usar, proteger suas credenciais, comunicar acessos indevidos de que tenham conhecimento e cumprir as obrigações legais e contratuais aplicáveis à sua operação.</p>
      </section>

      <section>
        <h2>Uso responsável de WhatsApp e IA</h2>
        <p>Nas integrações contratadas, o cliente deve observar as permissões da conta, obter as autorizações exigidas para contatar destinatários, respeitar pedidos de interrupção de mensagens e evitar spam ou comunicações enganosas. Aplicam-se, conforme a integração, os <a href="https://developers.facebook.com/terms/">Termos da Plataforma Meta</a>, os <a href="https://www.whatsapp.com/legal/business-terms/">Termos do WhatsApp Business</a> e a <a href="https://business.whatsapp.com/policy">Política de Mensagens do WhatsApp Business</a>.</p>
        <p>Respostas geradas por IA podem conter erros ou omissões. O cliente deve configurar a supervisão compatível com o uso contratado e revisar as saídas antes de usá-las em decisões com impacto relevante. A habilitação e os recursos de uma integração dependem, entre outros fatores, da elegibilidade da conta e das permissões concedidas pela plataforma.</p>
      </section>

      <section>
        <h2>Propriedade intelectual</h2>
        <p>Marcas, identidade visual, textos e demais conteúdos do site pertencem à Automatize Mais ou aos respectivos titulares. A reprodução e o uso de materiais de terceiros dependem de autorização ou de hipótese legal aplicável. Direitos sobre materiais, software e entregas de projetos contratados seguem o contrato correspondente e a legislação aplicável.</p>
      </section>

      <section>
        <h2>Disponibilidade e responsabilidades</h2>
        <p>O site, a agenda e os recursos integrados podem sofrer interrupções por manutenção, falhas técnicas ou indisponibilidade de terceiros. O funcionamento das integrações depende das configurações das contas, da conectividade e dos recursos oferecidos pelas plataformas envolvidas.</p>
        <p>A Automatize Mais responde pelas obrigações que assume e pelas responsabilidades previstas em lei. Usuários e clientes respondem pelos próprios atos, pelo conteúdo que fornecem e pelo uso das contas e integrações sob sua gestão. Permanecem aplicáveis os direitos e responsabilidades previstos na legislação.</p>
      </section>

      <section>
        <h2>Contratação e alterações</h2>
        <p>Estes termos regem o uso do site. Escopo, condições comerciais e compromissos de prestação de serviços são definidos nos contratos individuais. Em caso de divergência sobre uma prestação contratada, aplica-se o contrato correspondente, observada a legislação. Alterações destes termos serão publicadas nesta página com a data de atualização.</p>
      </section>

      <section>
        <h2>Contato</h2>
        <p>Envie dúvidas para <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Para informações sobre dados pessoais, consulte a <Link href="/privacidade">Política de Privacidade</Link>.</p>
      </section>
    </LegalPage>
  );
}
