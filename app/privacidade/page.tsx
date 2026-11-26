import Link from "next/link";
import { CompanyIdentity, contactEmail, legalMetadata, LegalPage } from "../LegalPage";

export const metadata = legalMetadata(
  "/privacidade",
  "Conheça como a Automatize Mais trata dados pessoais no site e em serviços de automação, IA, CRM e WhatsApp.",
);

export default function Privacidade() {
  return (
    <LegalPage path="/privacidade">
      <section>
        <h2>Quem trata seus dados</h2>
        <CompanyIdentity />
        <p>Esta política cobre o site e os serviços de automação, inteligência artificial e integração. A Automatize Mais atua como controladora quando define as finalidades e os elementos essenciais do tratamento, como na gestão de seus próprios contatos comerciais. Ao tratar dados em nome de uma empresa cliente e segundo suas instruções, pode atuar como operadora, cabendo à empresa cliente, como controladora, definir as finalidades e as bases legais da operação.</p>
      </section>

      <section>
        <h2>Dados, finalidades e bases legais</h2>
        <ul>
          <li><strong>Contato e agendamento.</strong> Nome, e-mail, telefone quando informado, informações profissionais, horários e conteúdo das comunicações podem ser tratados para responder a contatos, marcar reuniões e preparar propostas. Quando solicitado pelo titular, o tratamento pode se basear em procedimentos preliminares a um contrato. O legítimo interesse pode fundamentar a gestão de contatos comerciais, após avaliação de necessidade, expectativas e direitos do titular.</li>
          <li><strong>Contratação e suporte.</strong> Dados de identificação, contato, registros contratuais e comunicações podem ser usados para executar contratos, prestar suporte e cumprir obrigações legais ou regulatórias. Dados pertinentes podem ser usados para o exercício regular de direitos, quando aplicável.</li>
          <li><strong>CRM.</strong> Dados de leads e clientes, como informações de contato, origem do contato, histórico de interações e etapa comercial, podem ser organizados em CRM para acompanhar solicitações, propostas e atendimentos. Para operações próprias, aplica-se a base adequada à finalidade, como procedimentos preliminares, execução contratual ou legítimo interesse avaliado. Em operações de clientes, seguimos as instruções do controlador quando atuamos como operadora.</li>
          <li><strong>Dados técnicos.</strong> Endereço IP, informações do navegador e registros de acesso podem ser processados na entrega de recursos do site e para diagnóstico, segurança e prevenção de abuso, conforme a necessidade e a base aplicável, como legítimo interesse avaliado ou obrigação legal.</li>
        </ul>
        <p>Quando o tratamento depender de consentimento, ele poderá ser revogado a qualquer momento pelo canal de privacidade.</p>
      </section>

      <section>
        <h2>WhatsApp Business Platform e Meta</h2>
        <p>Quando contratada e habilitada, uma integração pode tratar identificadores da conta comercial, números de telefone, identificadores e status de mensagens, horários, conteúdo de conversas e anexos, conforme as permissões concedidas. Esses dados podem ser usados para configurar a integração, encaminhar mensagens, acompanhar entregas e executar os fluxos de atendimento autorizados. A habilitação via Embedded Signup e a coexistência com o aplicativo WhatsApp Business dependem da configuração, das permissões e da elegibilidade da conta na Meta.</p>
      </section>

      <section>
        <h2>Atendimento com inteligência artificial</h2>
        <p>Nos fluxos contratados que utilizam IA, o conteúdo da conversa e o contexto necessário podem ser processados para entender a solicitação, elaborar respostas e encaminhar o atendimento. Quando a Automatize Mais atua como operadora, o tratamento segue a finalidade e as instruções do cliente controlador.</p>
      </section>

      <section>
        <h2>Provedores tecnológicos</h2>
        <p>O site usa Google Fonts para carregar a tipografia e Google Calendar no agendamento. Quando uma integração com a WhatsApp Business Platform está habilitada, a Meta e o WhatsApp participam do fluxo de mensagens e da gestão dos recursos da conta conforme as permissões concedidas. Provedores de hospedagem, CRM ou IA podem receber os dados necessários às funções que desempenham, conforme os serviços efetivamente contratados e a divisão de responsabilidades em cada operação.</p>
      </section>

      <section>
        <h2>Cookies e serviços de terceiros</h2>
        <p>O agendamento carrega um quadro do Google Calendar quando você abre a agenda. O Google pode usar cookies ou tecnologias semelhantes nesse serviço conforme a configuração do navegador e suas próprias práticas. O carregamento da tipografia também faz uma requisição ao Google. Consulte a <a href="https://policies.google.com/privacy?hl=pt-BR">Política de Privacidade do Google</a>.</p>
      </section>

      <section>
        <h2>Armazenamento, segurança e retenção</h2>
        <p>O armazenamento deve observar a finalidade do tratamento e as condições da operação contratada. O tratamento está sujeito às medidas técnicas e administrativas de segurança exigidas pela LGPD, adequadas à natureza dos dados e aos riscos envolvidos. Os dados podem ser mantidos pelo tempo necessário à finalidade informada e, quando cabível, para cumprir obrigações legais ou regulatórias, exercer direitos ou atender a outras hipóteses admitidas pela LGPD. Nas operações em que atuamos como operadora, a retenção também segue as instruções do controlador e as exigências legais aplicáveis.</p>
      </section>

      <section>
        <h2>Direitos e canal de privacidade</h2>
        <p>Conforme a LGPD e observados os requisitos aplicáveis, você pode pedir confirmação do tratamento, acesso, correção, portabilidade e informações sobre compartilhamento. Também pode solicitar anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados irregularmente, eliminação de dados tratados com consentimento nas hipóteses legais, informação sobre as consequências de negar consentimento e revogação do consentimento. Nos casos previstos em lei, você pode se opor ao tratamento e solicitar revisão de decisões tomadas unicamente com base em tratamento automatizado que afetem seus interesses. Você também pode peticionar à ANPD.</p>
        <p>Para solicitar acesso, correção ou exercer outro direito, escreva para <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Informe seu nome, o direito que deseja exercer e a interação a que o pedido se refere. Podemos solicitar uma confirmação proporcional de identidade ou representação. Se os dados forem controlados por uma empresa cliente, indicaremos seu canal, quando conhecido, ou colaboraremos com ela para tratar o pedido. Para eliminação, consulte também as <Link href="/exclusao-de-dados">instruções de exclusão de dados</Link>.</p>
      </section>
    </LegalPage>
  );
}
