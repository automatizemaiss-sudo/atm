import Image from "next/image";

const BOOKING_URL = "https://calendar.app.google/nNFRYafpCPvkKa7M7";

function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand ${light ? "brand--light" : ""}`} aria-label="ATM+">
      <span className="brand-lines" aria-hidden="true"><i /><i /><i /></span>
      <b>atm</b><em>+</em>
    </span>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Header() {
  return (
    <header className="header">
      <a href="#inicio" className="logo-link" aria-label="ATM+ — início"><Brand /></a>
      <a className="button button--small" href="#agendamento">Agendar reunião <Arrow /></a>
    </header>
  );
}

function HeroFlow() {
  return (
    <div className="flow-visual" aria-label="Leads, atendimento, dados, processos e CRM convergem em eficiência, conversão e escala">
      <div className="flow-inputs">
        {["Leads", "Atendimento", "Dados", "Processos", "CRM"].map((item, i) => (
          <span key={item} style={{ "--i": i } as React.CSSProperties}>{item}</span>
        ))}
      </div>
      <div className="flow-core" aria-hidden="true">+</div>
      <div className="flow-results"><span>eficiência</span><span>conversão</span><span>escala</span></div>
    </div>
  );
}

function Hero() {
  return (
    <main id="inicio" className="hero section-shell">
      <div className="hero-copy">
        <div className="eyebrow"><span /> Tecnologia aplicada à operação</div>
        <h1>Automação e IA para <mark>vender mais</mark>, atender melhor e escalar sua operação.</h1>
        <p>Identificamos gargalos e construímos soluções sob medida para comercial, atendimento e operação.</p>
        <a className="button button--hero" href="#agendamento">Agendar uma reunião <Arrow /></a>
        <div className="hero-proof"><strong>+21 mil</strong> leads processados <i /> <strong>R$199 mil</strong> em vendas geradas em uma operação</div>
      </div>
      <HeroFlow />
    </main>
  );
}

const logos = [
  { src: "/weburn.png", alt: "Weburn", cls: "logo-weburn" },
  { src: "/voltz.png", alt: "Voltz Club", cls: "logo-square" },
  { src: "/thiago-sampaio-logo.png", alt: "Thiago Sampaio Nutrição", cls: "logo-square" },
  { src: "/pod-ser-facil.png", alt: "Pod Ser + Fácil", cls: "logo-square" },
];

function LogoCloud() {
  return (
    <section className="logo-section section-shell" aria-labelledby="logo-title">
      <p id="logo-title">Soluções implementadas em operações reais.</p>
      <div className="logo-cloud">
        {logos.map((logo) => <div className={`client-logo ${logo.cls}`} key={logo.alt}><Image src={logo.src} alt={logo.alt} width={220} height={100} /></div>)}
      </div>
    </section>
  );
}

const services = [
  ["01", "Atendimento com IA", "Conversa, qualifica, responde e direciona leads."],
  ["02", "Follow-ups automáticos", "Recupere oportunidades antes que sejam esquecidas."],
  ["03", "CRM e funil comercial", "Leads organizados, distribuídos e acompanhados."],
  ["04", "Integração de sistemas", "Faça suas ferramentas trabalharem juntas."],
  ["05", "Automação operacional", "Elimine tarefas repetitivas e processos manuais."],
  ["06", "Dashboards e dados", "Transforme informações em decisão."],
  ["07", "Soluções sob medida", "Automações específicas para cada gargalo."],
];

function Services() {
  return (
    <section className="dark-section" id="solucoes">
      <div className="section-shell">
        <div className="section-heading section-heading--light"><div><span className="kicker">POSSIBILIDADES</span><h2>O que podemos<br /><mark>automatizar?</mark></h2></div><p>Onde houver repetição, demora ou perda de informação, existe espaço para ganhar eficiência.</p></div>
        <div className="services-grid">
          {services.map(([num, title, text], i) => (
            <article className={`service-card ${i === 6 ? "service-card--wide" : ""}`} key={title}>
              <span className="service-num">{num}</span><div className="service-icon" aria-hidden="true"><i /><b>+</b></div><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WeburnCase() {
  return (
    <section className="weburn-case section-shell" aria-labelledby="weburn-title">
      <div className="case-top">
        <div><span className="kicker">CASE PRINCIPAL</span><div className="weburn-mark"><Image src="/weburn.png" alt="Weburn" width={280} height={120} /></div></div>
        <p id="weburn-title">Automação e IA aplicadas ao processo comercial para trabalhar leads em escala e transformar atendimento em vendas.</p>
      </div>
      <div className="metrics">
        <div><strong>21.431</strong><span>Leads processados</span></div>
        <div><strong>12,31%</strong><span>Conversão</span></div>
        <div className="metric-accent"><strong>R$199.184<small>,33</small></strong><span>Em vendas</span></div>
      </div>
    </section>
  );
}

const cases = [
  { logo: "/voltz.png", name: "Voltz", title: "IA para suporte e comercial", text: "Inteligência artificial no atendimento de clientes e oportunidades comerciais." },
  { logo: "/thiago-sampaio-logo.png", name: "Thiago Sampaio Nutrição", title: "IA aplicada ao atendimento e vendas", text: "Automação de conversas, atendimento e processos comerciais." },
  { logo: "/pod-ser-facil.png", name: "Pod Ser + Fácil", title: "Automação aplicada à produção de conteúdo", text: "Processos automatizados para produzir e distribuir conteúdo." },
];

function Cases() {
  return (
    <section className="cases section-shell">
      <div className="section-heading"><div><span className="kicker">NA PRÁTICA</span><h2>Soluções diferentes.<br /><mark>Impacto real.</mark></h2></div><p>Cada operação tem um gargalo. Cada solução é desenhada a partir dele.</p></div>
      <div className="case-grid">
        {cases.map((item, index) => <article className="case-card" key={item.name}><div className={`case-logo case-logo--${index}`}><Image src={item.logo} alt={item.name} width={180} height={180} /></div><div className="case-content"><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}
      </div>
    </section>
  );
}

const transforms = [["Processo manual", "Automatizado"], ["Lead esquecido", "Follow-up"], ["Atendimento lento", "IA"], ["Dados espalhados", "Inteligência"]];

function Problems() {
  return (
    <section className="problems">
      <div className="section-shell">
        <div className="section-heading"><div><span className="kicker">TRANSFORMAÇÃO</span><h2>Onde existe gargalo,<br />existe oportunidade de <mark>automatizar.</mark></h2></div></div>
        <div className="transform-list">
          {transforms.map(([before, after]) => <div className="transform-row" key={before}><span>{before}</span><div className="transform-path"><i /><b>+</b></div><strong>{after}</strong></div>)}
        </div>
        <div className="pain-strip">{["Leads perdidos", "Atendimento sobrecarregado", "CRM desorganizado", "Sistemas desconectados"].map(x => <span key={x}><i />{x}</span>)}</div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [["01", "Diagnóstico", "Entendemos sua operação e identificamos os gargalos."], ["02", "Implementação", "Construímos e integramos a solução."], ["03", "Evolução", "Acompanhamos, corrigimos e melhoramos."]];
  return (
    <section className="process dark-section">
      <div className="section-shell">
        <div className="section-heading section-heading--light"><div><span className="kicker">COMO FUNCIONA</span><h2>Do gargalo<br />à <mark>solução.</mark></h2></div><p>Um processo direto, da identificação à evolução contínua.</p></div>
        <div className="process-grid">{steps.map(([num, title, text]) => <article key={num}><span>{num}</span><div className="process-node">+</div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="founder section-shell">
      <div className="founder-photo"><Image src="/matheus-donha.png" alt="Matheus Donha, founder da ATM+" width={720} height={900} priority /></div>
      <div className="founder-copy"><span className="kicker">QUEM ESTÁ POR TRÁS</span><h2>Estratégia, processos<br />e tecnologia <mark>juntos.</mark></h2><div className="founder-line" /><h3>Matheus Donha</h3><p className="role">Founder ATM+</p><p>Especialista em processos e automações para vendas.</p><a className="text-link" href="#agendamento">Vamos conversar <Arrow /></a></div>
    </section>
  );
}

function Booking() {
  return (
    <section className="booking" id="agendamento">
      <div className="booking-intro section-shell">
        <span className="kicker">PRÓXIMO PASSO</span><h2>Identifique o próximo<br />gargalo da sua <mark>operação.</mark></h2><p>Em uma conversa, entendemos seu cenário e avaliamos onde automação e IA podem gerar mais impacto.</p>
      </div>
      <div className="calendar-wrap section-shell"><div className="calendar-head"><div><span>Escolha um horário</span><small>Conversa inicial · online</small></div><a href={BOOKING_URL} target="_blank" rel="noreferrer">Abrir agenda <Arrow /></a></div><iframe src={BOOKING_URL} title="Agenda de reuniões ATM+" loading="lazy" /></div>
    </section>
  );
}

function Footer() {
  return <footer><Brand light /><p>Automação e IA para operações que querem crescer.</p><a href="#inicio">Voltar ao topo ↑</a><small>© 2026 ATM+. Todos os direitos reservados.</small></footer>;
}

export default function Home() {
  return <><Header /><Hero /><LogoCloud /><Services /><WeburnCase /><Cases /><Problems /><Process /><Founder /><Booking /><Footer /></>;
}
