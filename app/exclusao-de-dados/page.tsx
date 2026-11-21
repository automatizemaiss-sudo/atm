import Link from "next/link";
import { CompanyIdentity, contactEmail, legalMetadata, LegalPage } from "../LegalPage";

export const metadata = legalMetadata(
  "/exclusao-de-dados",
  "Saiba como solicitar à Automatize Mais a exclusão de dados pessoais e como o pedido será analisado.",
);

const deletionEmail = `mailto:${contactEmail}?subject=${encodeURIComponent("Solicitação de exclusão de dados")}`;

export default function ExclusaoDeDados() {
  return (
    <LegalPage path="/exclusao-de-dados">
      <section>
        <h2>Como solicitar a exclusão</h2>
        <p>Envie um e-mail para <a href={deletionEmail}>{contactEmail}</a> com o assunto “Solicitação de exclusão de dados”. Para localizar os registros, informe:</p>
        <ul>
          <li>Seu nome e um e-mail para receber a resposta.</li>
          <li>O e-mail ou número de WhatsApp usado na interação, conforme o canal envolvido.</li>
          <li>Quais dados deseja excluir e, se souber, a empresa atendida, o serviço ou a data aproximada da interação.</li>
        </ul>
        <p>No primeiro contato, envie apenas as informações necessárias para localizar os registros. Evite incluir senhas, códigos de autenticação ou cópias de documentos.</p>
      </section>

      <section>
        <h2>Verificação do pedido</h2>
        <p>Podemos confirmar o pedido por um canal já associado aos registros ou solicitar informações adicionais proporcionais ao caso. Se o pedido for feito em nome de outra pessoa, podemos solicitar comprovação de que você tem poderes para representá-la.</p>
      </section>

      <section>
        <h2>Dados controlados por empresas clientes</h2>
        <p>Quando a empresa cliente for a controladora e a Automatize Mais atuar como operadora, podemos indicar o canal da empresa responsável ou encaminhar o pedido a ela, compartilhando apenas as informações necessárias. A Automatize Mais poderá colaborar com a análise e executar as instruções cabíveis do controlador.</p>
      </section>

      <section>
        <h2>Retenção e resposta</h2>
        <p>A exclusão será avaliada conforme a LGPD. Determinados dados podem ser mantidos para cumprir obrigações legais ou regulatórias, exercer direitos ou atender a outras hipóteses permitidas pela legislação. A resposta será enviada ao e-mail informado, com o resultado da análise, as providências adotadas e, quando aplicável, os motivos e as orientações sobre retenção ou encaminhamento.</p>
      </section>

      <section>
        <h2>Responsável pelo canal</h2>
        <CompanyIdentity />
        <p>Para conhecer as demais formas de exercer seus direitos, consulte a <Link href="/privacidade">Política de Privacidade</Link>.</p>
      </section>
    </LegalPage>
  );
}
