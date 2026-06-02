import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Shield, Check, ChevronDown, MessageSquare, ArrowRight, Activity, 
  Menu, X, BookOpen, AlertCircle, Heart, Star, Sparkles, Droplet
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Link de checkout da Kiwify (pode ser editado facilmente pelo usuário)
const KIWIFY_CHECKOUT_URL = "https://pay.kiwify.com.br/colesterol-fora";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Ref para GSAP animations
  const appRef = useRef(null);

  // Monitorar scroll para Navbar "Ilha Flutuante"
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero text fade-up staggered
      gsap.fromTo('.hero-anim', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }
      );

      // 2. Identification cards fade-up staggered
      gsap.fromTo('.problem-card', 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.problem-section',
            start: 'top 75%',
          }
        }
      );

      // 3. Features cards fade-up staggered
      gsap.fromTo('.feature-card', 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-section',
            start: 'top 75%',
          }
        }
      );

      // 4. Philosophy text reveal (split-word style animation)
      gsap.fromTo('.philosophy-word',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.philosophy-section',
            start: 'top 75%',
          }
        }
      );

      // 5. Stacking protocol cards pinning timeline
      const cards = gsap.utils.toArray('.protocol-card');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.protocol-wrapper',
          start: 'top top',
          end: `+=${window.innerHeight * 1.5}`, // Altura de scroll total reduzida para transições mais rápidas
          scrub: true,
          pin: true,
          anticipatePin: 1,
        }
      });
      
      cards.forEach((card, index) => {
        if (index > 0) {
          // Slide in the next card
          tl.fromTo(card, 
            { yPercent: 100 }, 
            { yPercent: 0, duration: 1, ease: 'none' }
          );
          
          // Animate the previous card going back (scale down slightly, soft blur, reduce opacity)
          const prevCard = cards[index - 1];
          tl.to(prevCard, {
            scale: 0.96,
            filter: 'blur(4px)',
            opacity: 0.35,
            duration: 1, // Sincronizado perfeitamente com a duração de entrada
            ease: 'none'
          }, '<'); // '<' faz rodar ao mesmo tempo que o slide anterior
        }
      });

    }, appRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={appRef} className="min-h-screen bg-bgCreme text-dark relative font-sans">
      
      {/* A. NAVBAR — "A Ilha Flutuante" */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 rounded-full px-6 py-3 transition-all duration-500 ease-in-out flex items-center justify-between ${
        scrolled 
          ? 'bg-bgCreme/80 backdrop-blur-xl border border-primary/10 shadow-lg py-3 text-primary' 
          : 'bg-transparent text-white border border-white/5'
      }`}>
        {/* Logo */}
        <a href="#" className="font-heading font-extrabold text-sm md:text-base tracking-wider flex items-center gap-2">
          <Heart className="w-5 h-5 text-accent animate-pulse" />
          <span>COLESTEROL FORA DA MINHA VIDA</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <a href="#sobre" className="hover:text-accent transition-colors duration-200">Sobre</a>
          <a href="#guia" className="hover:text-accent transition-colors duration-200">O Guia</a>
          <a href="#protocolo" className="hover:text-accent transition-colors duration-200">O Protocolo</a>
          <a href="#garantia" className="hover:text-accent transition-colors duration-200">Garantia</a>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a 
            href={KIWIFY_CHECKOUT_URL}
            className="btn-premium bg-accent hover:bg-accentHover text-white text-xs px-5 py-2.5 rounded-full font-bold shadow-md hover:scale-103 transition-transform"
          >
            Quero Agora — R$37
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1 rounded-full hover:bg-black/10 focus:outline-none"
          aria-label="Abrir Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-bgCreme border border-primary/10 shadow-xl rounded-3xl p-6 flex flex-col gap-4 text-primary md:hidden animate-fade-in">
            <a 
              href="#sobre" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 border-b border-primary/5"
            >
              Sobre
            </a>
            <a 
              href="#guia" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 border-b border-primary/5"
            >
              O Guia
            </a>
            <a 
              href="#protocolo" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 border-b border-primary/5"
            >
              O Protocolo
            </a>
            <a 
              href="#garantia" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold py-2 border-b border-primary/5"
            >
              Garantia
            </a>
            <a 
              href={KIWIFY_CHECKOUT_URL}
              className="btn-premium bg-accent hover:bg-accentHover text-white py-3 rounded-full text-center font-bold text-sm mt-2"
            >
              QUERO MEU GUIA AGORA — R$37
            </a>
          </div>
        )}
      </nav>

      {/* B. HERO SECTION — "A Cena de Abertura" */}
      <section className="relative h-[100dvh] w-full flex items-end justify-start overflow-hidden bg-primary">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1974')",
          }}
        />
        
        {/* Strong primary-to-black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-primary/80 to-transparent opacity-90" />

        {/* Content Container (Bottom-left aligned) */}
        <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 pb-16 md:pb-24 flex flex-col items-start gap-4">
          <div className="overflow-hidden">
            <span className="hero-anim block font-heading font-extrabold text-white text-3xl md:text-5xl uppercase tracking-wider">
              Seu colesterol alto é
            </span>
          </div>
          <div className="overflow-hidden leading-none -mt-2">
            <h1 className="hero-anim block font-drama italic text-accent text-7xl md:text-9xl lg:text-[10rem] font-bold">
              Reversível.
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="hero-anim block text-white/80 font-sans text-base md:text-xl max-w-xl">
              Descubra o protocolo alimentar de 21 dias que médicos não prescrevem — mas a ciência comprova.
            </p>
          </div>
          
          <div className="hero-anim mt-4">
            <a 
              href={KIWIFY_CHECKOUT_URL}
              className="btn-premium bg-accent hover:bg-accentHover text-white text-sm md:text-base px-8 py-4 rounded-full font-bold shadow-lg hover:scale-103 transition-transform"
            >
              QUERO MEU GUIA AGORA — R$37
            </a>
          </div>

          <div className="hero-anim font-mono text-[10px] md:text-xs text-white/60 mt-3 flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-accent" /> Entrega imediata</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-accent" /> Garantia de 7 dias</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-accent" /> PDF completo</span>
          </div>
        </div>
      </section>

      {/* C. SEÇÃO — IDENTIFICAÇÃO DO PROBLEMA */}
      <section id="sobre" className="problem-section py-24 px-6 md:px-12 bg-bgCreme flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-heading font-extrabold text-primary text-3xl md:text-5xl tracking-tight leading-tight">
              Você se identifica com alguma dessas situações?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="problem-card bg-white p-8 rounded-3xl border border-primary/5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <AlertCircle className="w-6 h-6 text-accent" />
              </div>
              <p className="text-dark font-medium leading-relaxed">
                "Seus exames voltaram com colesterol alto — e o médico só falou em remédio."
              </p>
            </div>

            {/* Card 2 */}
            <div className="problem-card bg-white p-8 rounded-3xl border border-primary/5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <p className="text-dark font-medium leading-relaxed">
                "Você já tentou mudar a alimentação, mas não sabe exatamente o que cortar ou incluir."
              </p>
            </div>

            {/* Card 3 */}
            <div className="problem-card bg-white p-8 rounded-3xl border border-primary/5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <p className="text-dark font-medium leading-relaxed">
                "Tem medo das consequências: infarto, AVC, problemas no coração."
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="font-heading font-semibold text-lg md:text-xl text-primary max-w-2xl mx-auto leading-relaxed">
              Se você marcou ao menos uma dessas situações, o <span className="underline decoration-accent decoration-2">Guia Alimentar de 21 Dias</span> foi feito para você.
            </p>
          </div>
        </div>
      </section>

      {/* D. SEÇÃO FEATURES — "Artefatos Funcionais Interativos" */}
      <section id="guia" className="features-section py-24 px-6 md:px-12 bg-white flex flex-col items-center border-t border-primary/5">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-accent uppercase tracking-wider font-semibold">Tecnologia e Evidência</span>
            <h2 className="font-heading font-extrabold text-primary text-3xl md:text-5xl mt-2 tracking-tight">
              O que torna este guia diferente
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Card 1 — "Diagnostic Shuffler" */}
            <div className="feature-card bg-bgCreme p-8 rounded-3xl border border-primary/5 shadow-sm flex flex-col justify-between h-[450px] relative overflow-hidden">
              <div>
                <span className="font-mono text-[10px] text-accent font-semibold uppercase tracking-widest block mb-2">// Card 01</span>
                <h3 className="font-heading font-bold text-xl text-primary mb-2">Identifique seus inimigos ocultos</h3>
                <p className="text-sm text-dark/70 leading-relaxed mb-6">
                  7 alimentos comuns que estão elevando seu LDL silenciosamente
                </p>
              </div>

              {/* Shuffler UI Workspace */}
              <div className="relative w-full h-48 flex items-center justify-center">
                <DiagnosticShuffler />
              </div>
            </div>

            {/* Card 2 — "Telemetry Typewriter" */}
            <div className="feature-card bg-bgCreme p-8 rounded-3xl border border-primary/5 shadow-sm flex flex-col justify-between h-[450px] relative overflow-hidden">
              <div>
                <span className="font-mono text-[10px] text-accent font-semibold uppercase tracking-widest block mb-2">// Card 02</span>
                <h3 className="font-heading font-bold text-xl text-primary mb-2">Protocolo baseado em ciência</h3>
                <p className="text-sm text-dark/70 leading-relaxed mb-6">
                  Cada recomendação tem respaldo de estudos clínicos publicados
                </p>
              </div>

              {/* Typewriter UI Workspace */}
              <div className="bg-dark text-emerald-400 p-5 rounded-2xl font-mono text-xs h-48 flex flex-col justify-between border border-emerald-500/10 shadow-inner">
                <div className="flex items-center justify-between border-b border-emerald-500/10 pb-2">
                  <span className="text-[10px] tracking-wider text-emerald-400/60 uppercase">SYSTEM TELEMETRY</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 status-pulse"></span>
                    <span className="text-[10px] text-emerald-400/80">LIVE FEED</span>
                  </div>
                </div>
                <div className="flex-1 py-4 flex items-center">
                  <TelemetryTypewriter />
                </div>
                <div className="text-[9px] text-emerald-400/30 flex justify-between">
                  <span>SECURE SSL</span>
                  <span>SYS_ID: #40212</span>
                </div>
              </div>
            </div>

            {/* Card 3 — "Cursor Protocol Scheduler" */}
            <div className="feature-card bg-bgCreme p-8 rounded-3xl border border-primary/5 shadow-sm flex flex-col justify-between h-[450px] relative overflow-hidden">
              <div>
                <span className="font-mono text-[10px] text-accent font-semibold uppercase tracking-widest block mb-2">// Card 03</span>
                <h3 className="font-heading font-bold text-xl text-primary mb-2">21 dias. Semana a semana.</h3>
                <p className="text-sm text-dark/70 leading-relaxed mb-6">
                  Plano progressivo sem precisar mudar tudo de uma vez
                </p>
              </div>

              {/* Scheduler UI Workspace */}
              <div className="relative w-full h-48 bg-white rounded-2xl p-4 border border-primary/5 flex flex-col justify-between overflow-hidden shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-primary/60 font-semibold">PLANO_SEMANAL.EXE</span>
                  <span className="text-[10px] font-mono bg-accent/10 text-accent px-2 py-0.5 rounded-full font-semibold">ATIVO</span>
                </div>
                <CursorProtocolScheduler />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* E. SEÇÃO PHILOSOPHY — "O Manifesto" */}
      <section className="philosophy-section relative py-32 px-6 md:px-12 bg-dark text-white overflow-hidden flex flex-col items-center justify-center">
        {/* Parallax low opacity background texture */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1974')",
            backgroundAttachment: 'fixed'
          }}
        />

        <div className="relative z-10 w-full max-w-4xl text-center flex flex-col gap-8 md:gap-12">
          <div>
            <p className="text-white/50 text-sm md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
              {"A maioria das dietas foca em: restrição total, sofrimento e resultados impossíveis.".split(" ").map((word, i) => (
                <span key={i} className="philosophy-word inline-block mr-1">
                  {word}
                </span>
              ))}
            </p>
          </div>
          
          <div className="h-[2px] w-24 bg-accent/30 mx-auto" />

          <div>
            <h2 className="font-drama italic text-3xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-3xl mx-auto">
              {"Nós focamos em: ".split(" ").map((word, i) => (
                <span key={i} className="philosophy-word inline-block mr-2 text-white/90">
                  {word}
                </span>
              ))}
              <span className="text-accent underline decoration-accent/30 decoration-4 block md:inline font-extrabold">
                {"substituições inteligentes ".split(" ").map((word, i) => (
                  <span key={i} className="philosophy-word inline-block mr-2">
                    {word}
                  </span>
                ))}
              </span>
              {"e resultados mensuráveis.".split(" ").map((word, i) => (
                <span key={i} className="philosophy-word inline-block mr-2 text-white/90">
                  {word}
                </span>
              ))}
            </h2>
          </div>
        </div>
      </section>

      {/* F. SEÇÃO PROTOCOL — "Sticky Stacking" */}
      <section id="protocolo" className="relative bg-dark text-white border-t border-white/5">
        <div className="protocol-wrapper w-full relative">
          
          {/* Card 1 */}
          <div className="protocol-card w-full h-screen bg-[#1F2E25] flex items-center justify-center px-6 md:px-12 sticky top-0">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6">
                <span className="font-mono text-sm text-accent tracking-widest font-semibold">PASSO 01</span>
                <h2 className="font-heading font-extrabold text-3xl md:text-5xl leading-tight">
                  Elimine os vilões
                </h2>
                <p className="text-white/80 leading-relaxed text-base md:text-lg">
                  Nas primeiras 7 dias você identifica e substitui os 3 principais alimentos que estão sabotando seus exames. Sem dieta radical — apenas trocas cirúrgicas.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                  <span>STATUS: SCAN_COMPLETE</span>
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping"></span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                {/* Animação Concentric Circles */}
                <svg className="w-64 h-64 md:w-80 md:h-80 text-accent/40" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" className="animate-[spin_30s_linear_infinite]" />
                  <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="10 5" className="animate-[spin_20s_linear_infinite_reverse]" />
                  <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1.5" fill="none" className="animate-[spin_12s_linear_infinite]" />
                  <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="2 2" />
                  <circle cx="50" cy="50" r="4" fill="#CC5833" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="protocol-card w-full h-screen bg-[#2A3C31] flex items-center justify-center px-6 md:px-12 sticky top-0">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6">
                <span className="font-mono text-sm text-accent tracking-widest font-semibold">PASSO 02</span>
                <h2 className="font-heading font-extrabold text-3xl md:text-5xl leading-tight">
                  Ative os superalimentos
                </h2>
                <p className="text-white/80 leading-relaxed text-base md:text-lg">
                  Da semana 2 em diante, você inclui ativamente os 8 alimentos com ação comprovada de redução do LDL. Seu corpo começa a responder de forma cirúrgica.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                  <span>STATUS: INJECTING_NUTRIENTS</span>
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping"></span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                {/* Animação Laser Scan Grid */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 border border-white/10 rounded-[2rem] overflow-hidden bg-black/20 flex items-center justify-center">
                  <svg className="w-full h-full text-white/10" viewBox="0 0 100 100">
                    <defs>
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="5" cy="5" r="0.75" fill="currentColor" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    <line x1="0" y1="0" x2="100" y2="0" stroke="#CC5833" strokeWidth="1.5" className="animate-laser-scan" />
                  </svg>
                  <div className="absolute font-mono text-[9px] text-[#CC5833] bottom-4 left-4 tracking-widest uppercase">
                    SYS_SCANNING: 88.4%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="protocol-card w-full h-screen bg-[#34473C] flex items-center justify-center px-6 md:px-12 sticky top-0">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6">
                <span className="font-mono text-sm text-accent tracking-widest font-semibold">PASSO 03</span>
                <h2 className="font-heading font-extrabold text-3xl md:text-5xl leading-tight">
                  Consolide o hábito
                </h2>
                <p className="text-white/80 leading-relaxed text-base md:text-lg">
                  Na semana 3 os novos padrões se fixam. Pesquisas mostram que 21 dias de consistência tornam o comportamento automático — sem esforço.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                  <span>STATUS: INTEGRATION_LOCKED</span>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                {/* Animação EKG/Waveform */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 border border-white/10 rounded-[2rem] overflow-hidden bg-black/20 flex items-center justify-center px-4">
                  <svg className="w-full h-32 text-accent" viewBox="0 0 100 50">
                    <path 
                      d="M 0 25 L 15 25 L 20 15 L 25 35 L 30 25 L 45 25 L 50 5 L 55 45 L 60 25 L 75 25 L 80 18 L 85 32 L 90 25 L 100 25" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      fill="none"
                      strokeDasharray="200" 
                      strokeDashoffset="200"
                      className="animate-ekg" 
                    />
                  </svg>
                  <div className="absolute font-mono text-[9px] text-[#CC5833] bottom-4 left-4 tracking-widest uppercase">
                    SYS_VITALITY: ACCENT_STABILIZED
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* G. SEÇÃO — O QUE VOCÊ RECEBE */}
      <section className="py-24 px-6 md:px-12 bg-bgCreme flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-accent uppercase tracking-wider font-semibold">// O Guia Completo</span>
            <h2 className="font-heading font-extrabold text-primary text-3xl md:text-5xl mt-2 tracking-tight">
              Tudo que está incluído no guia
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 md:p-12 rounded-[3rem] border border-primary/5 shadow-sm">
            {[
              "8 capítulos completos sobre colesterol e alimentação",
              "Tabela LDL/HDL/Triglicerídeos com metas por faixa etária",
              "Os 7 alimentos que você deve eliminar (com substitutos práticos)",
              "Os 8 superalimentos que reduzem o LDL ativamente",
              "Guia completo de fibras com tabela de porções",
              "Protocolo semanal de 21 dias passo a passo",
              "Cardápio semanal completo (café, almoço, lanche e jantar)",
              "Estratégias de sono e gestão de estresse",
              "Linguagem simples — sem termos médicos complicados",
              "PDF para baixar e consultar quando quiser"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-6 h-6 bg-[#2E4036]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
                <span className="text-dark font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* H. SEÇÃO PRICING — Oferta única */}
      <section className="py-24 px-6 md:px-12 bg-primary text-white flex flex-col items-center relative overflow-hidden">
        {/* Subtle decorative laser lines */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-80" />
        
        <div className="w-full max-w-xl text-center flex flex-col items-center gap-6 relative z-10">
          <span className="font-mono text-xs text-accent uppercase tracking-wider font-semibold">OFERTA DE LANÇAMENTO</span>
          
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl tracking-tight leading-tight">
            Comece a cuidar da sua saúde hoje
          </h2>
          
          <p className="text-white/70 max-w-md mx-auto text-sm md:text-base leading-relaxed">
            Tenha acesso instantâneo ao melhor material prático de reeducação nutricional contra o colesterol.
          </p>

          {/* Preços Ancorados */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center font-mono text-sm text-white/50 my-2">
            <span className="line-through">Consulta nutricional: R$250+</span>
            <span className="hidden md:inline">•</span>
            <span className="line-through">Suplementos por 30 dias: R$150+</span>
          </div>

          {/* Preço Principal */}
          <div className="flex flex-col items-center mb-4">
            <span className="font-heading font-black text-6xl md:text-8xl text-white tracking-tighter">
              R$ 37
            </span>
            <span className="font-mono text-xs text-accent mt-2 tracking-widest uppercase font-semibold">
              pagamento único • acesso vitalício
            </span>
          </div>

          {/* CTA Grande */}
          <a 
            href={KIWIFY_CHECKOUT_URL}
            className="w-full btn-premium bg-accent hover:bg-accentHover text-white py-5 text-lg rounded-full font-bold shadow-xl hover:scale-103 transition-transform"
          >
            QUERO MEU GUIA AGORA — R$37
          </a>

          <p className="text-[10px] text-white/50 -mt-2">
            Ao clicar, você será redirecionado para o checkout seguro da Kiwify.
          </p>

          {/* Benefícios Rápidos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-6 border-t border-white/10 pt-6 text-left font-mono text-[11px] text-white/70">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent" />
              <span>PDF enviado no e-mail</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent" />
              <span>Garantia de 7 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent" />
              <span>Celular, tablet e PC</span>
            </div>
          </div>
        </div>
      </section>

      {/* I. SEÇÃO — GARANTIA */}
      <section id="garantia" className="py-24 px-6 md:px-12 bg-bgCreme flex flex-col items-center">
        <div className="w-full max-w-3xl bg-white border border-primary/5 p-8 md:p-12 rounded-[3rem] shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <div className="w-16 h-16 bg-[#CC5833]/10 rounded-full flex items-center justify-center flex-shrink-0 text-accent">
            <Shield className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-heading font-extrabold text-primary text-2xl md:text-3xl tracking-tight">
              Garantia incondicional de 7 dias
            </h2>
            <p className="text-dark/80 leading-relaxed font-medium">
              Se por qualquer motivo você não ficar satisfeito com o conteúdo, basta enviar um e-mail em até 7 dias após a compra e devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
            </p>
          </div>
        </div>
      </section>

      {/* J. SEÇÃO — PERGUNTAS FREQUENTES (FAQ) */}
      <section className="py-24 px-6 md:px-12 bg-white flex flex-col items-center">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-accent uppercase tracking-wider font-semibold">// Suporte</span>
            <h2 className="font-heading font-extrabold text-primary text-3xl md:text-5xl mt-2 tracking-tight">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <FaqAccordion 
              question="Este guia substitui o acompanhamento médico?"
              answer="Não. O guia é educativo e complementar. Sempre mantenha o acompanhamento com seu médico. As orientações aqui são baseadas em evidências e ajudam você a fazer escolhas alimentares mais inteligentes."
            />
            <FaqAccordion 
              question="Funciona para qualquer tipo de colesterol alto?"
              answer="O protocolo é voltado para colesterol alto relacionado a hábitos alimentares e estilo de vida — que representa a maioria dos casos. Colesterol de origem genética (hipercolesterolemia familiar) requer acompanhamento médico especializado."
            />
            <FaqAccordion 
              question="Como vou receber o guia?"
              answer="Imediatamente após a confirmação do pagamento, você recebe o PDF no e-mail cadastrado no checkout. O acesso é vitalício."
            />
            <FaqAccordion 
              question="Preciso ter conhecimento de nutrição?"
              answer="Zero. O guia foi escrito em linguagem simples, com exemplos práticos e um cardápio pronto para seguir desde o primeiro dia."
            />
            <FaqAccordion 
              question="E se eu não gostar?"
              answer="Você tem 7 dias de garantia total. Se não gostar por qualquer motivo, devolvemos 100% do valor."
            />
          </div>
        </div>
      </section>

      {/* K. FOOTER */}
      <footer className="bg-[#0D0D0D] text-white rounded-t-[4rem] px-6 md:px-12 pt-20 pb-10 flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col gap-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10">
            <div className="flex flex-col gap-4">
              <span className="font-heading font-black text-lg tracking-wider text-white uppercase">
                COLESTEROL FORA DA MINHA VIDA
              </span>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Ciência aplicada à sua mesa.
              </p>
            </div>
            
            <div className="flex flex-col gap-2.5 font-medium text-sm text-white/70">
              <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-1">Navegação</span>
              <a href="#sobre" className="hover:text-accent transition-colors duration-200">Sobre</a>
              <a href="#guia" className="hover:text-accent transition-colors duration-200">O Guia</a>
              <a href="#protocolo" className="hover:text-accent transition-colors duration-200">O Protocolo</a>
            </div>

            <div className="flex flex-col gap-2.5 font-medium text-sm text-white/70">
              <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-1">Informações</span>
              <a href="#" className="hover:text-accent transition-colors duration-200">Política de Privacidade</a>
              <a href="#" className="hover:text-accent transition-colors duration-200">Termos de Uso</a>
              <a href="mailto:contato@colesterolforadaminhavida.com" className="hover:text-accent transition-colors duration-200">Contato</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Status Indicador */}
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full font-mono text-[10px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 status-pulse"></span>
              <span>SISTEMA OPERACIONAL</span>
            </div>

            <p className="text-[9px] text-white/40 max-w-md text-center md:text-right leading-relaxed">
              Este material tem fins educativos e não substitui orientação médica. As informações fornecidas não devem ser utilizadas para diagnosticar ou tratar qualquer problema de saúde sem consultar um profissional qualificado.
            </p>
          </div>
          
        </div>
      </footer>

    </div>
  );
}

// ==========================================
// SUBCOMPONENTS & ARTEFACTS
// ==========================================

// Card 1 — "Diagnostic Shuffler"
function DiagnosticShuffler() {
  const [cards, setCards] = useState([
    { 
      id: 1, 
      label: "Margarina escondida", 
      text: "Gorduras trans sintéticas indutoras de inflamação e LDL.", 
      level: "Ameaça Crítica",
      color: "border-red-500/30 text-red-600 bg-red-500/5"
    },
    { 
      id: 2, 
      label: "Frutose industrial", 
      text: "Xarope de milho de alta concentração, sobrecarrega o fígado.", 
      level: "Ameaça Alta",
      color: "border-amber-500/30 text-accent bg-amber-500/5"
    },
    { 
      id: 3, 
      label: "Farinha refinada", 
      text: "Provoca picos de insulina que geram gorduras no fígado.", 
      level: "Ameaça Moderada",
      color: "border-yellow-500/30 text-yellow-600 bg-yellow-500/5"
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[260px] h-[120px] flex items-center justify-center">
      {cards.map((card, index) => {
        // Estilos de profundidade e transformação baseados na posição
        let style = {};
        if (index === 0) {
          style = {
            transform: 'translateY(0px) scale(1)',
            zIndex: 30,
            opacity: 1
          };
        } else if (index === 1) {
          style = {
            transform: 'translateY(16px) scale(0.95)',
            zIndex: 20,
            opacity: 0.8
          };
        } else {
          style = {
            transform: 'translateY(32px) scale(0.90)',
            zIndex: 10,
            opacity: 0.5
          };
        }

        return (
          <div
            key={card.id}
            style={style}
            className="absolute w-full bg-white p-4 rounded-2xl border border-primary/5 shadow-sm transition-all duration-700 ease-elastic flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-heading font-extrabold text-sm text-primary">
                {card.label}
              </span>
              <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full border ${card.color}`}>
                {card.level}
              </span>
            </div>
            <p className="text-[10px] text-dark/70 leading-normal">
              {card.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// Card 2 — "Telemetry Typewriter"
function TelemetryTypewriter() {
  const messages = [
    "LDL reduzido em 10% com betaglucana...",
    "HDL aumentado com gorduras monoinsaturadas...",
    "Triglicerídeos -25% com ômega-3 em 4 semanas...",
    "Fibra solúvel: sequestra colesterol no intestino..."
  ];
  
  const [currentMsgIdx, setCurrentMsgIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullText = messages[currentMsgIdx];
    
    if (!isDeleting) {
      if (currentText !== fullText) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 70);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (currentText !== "") {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length - 1));
        }, 30);
      } else {
        setIsDeleting(false);
        setCurrentMsgIdx((prev) => (prev + 1) % messages.length);
      }
    }
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentMsgIdx]);

  return (
    <div className="flex items-center leading-relaxed">
      <span className="text-emerald-400 font-mono tracking-tight mr-1 text-[11px] md:text-xs">
        {currentText}
      </span>
      <span className="w-[1.5px] h-[1.2em] bg-accent inline-block ml-0.5 animate-pulse" />
    </div>
  );
}

// Card 3 — "Cursor Protocol Scheduler"
function CursorProtocolScheduler() {
  const days = ['S', 'M', 'T', 'Q', 'Q', 'S', 'S'];
  const [activeDayIndex, setActiveDayIndex] = useState(-1);
  const [cursorPos, setCursorPos] = useState({ x: 180, y: 150, opacity: 0, scale: 1 });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    let timer;
    
    const runSequence = () => {
      // Passo 0: Inicial / Invisível / Reset
      setActiveDayIndex(-1);
      setIsSaved(false);
      setCursorPos({ x: 220, y: 140, opacity: 0, scale: 1 });

      // Passo 1: Entrar e mover até a quarta-feira (Índice 3 - o primeiro Q)
      timer = setTimeout(() => {
        setCursorPos({ x: 112, y: 62, opacity: 1, scale: 1 });
      }, 800);

      // Passo 2: Clicar no dia
      timer = setTimeout(() => {
        setCursorPos({ x: 112, y: 62, opacity: 1, scale: 0.85 });
      }, 1800);

      // Passo 3: Ativar o dia / Liberar clique
      timer = setTimeout(() => {
        setActiveDayIndex(3);
        setCursorPos({ x: 112, y: 62, opacity: 1, scale: 1 });
      }, 2100);

      // Passo 4: Mover até o botão salvar
      timer = setTimeout(() => {
        setCursorPos({ x: 105, y: 125, opacity: 1, scale: 1 });
      }, 3000);

      // Passo 5: Clicar no botão salvar
      timer = setTimeout(() => {
        setCursorPos({ x: 105, y: 125, opacity: 1, scale: 0.85 });
      }, 4000);

      // Passo 6: Exibir status de salvo / Soltar clique
      timer = setTimeout(() => {
        setIsSaved(true);
        setCursorPos({ x: 105, y: 125, opacity: 1, scale: 1 });
      }, 4300);

      // Passo 7: Sumir cursor
      timer = setTimeout(() => {
        setCursorPos(prev => ({ ...prev, opacity: 0 }));
      }, 5500);

      // Repetir ciclo
      timer = setTimeout(() => {
        runSequence();
      }, 7000);
    };

    runSequence();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex-1 flex flex-col justify-between mt-4">
      {/* Grid semanal */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div 
            key={index}
            className={`h-9 rounded-xl flex items-center justify-center text-xs font-heading font-extrabold transition-all duration-300 border ${
              activeDayIndex === index 
                ? 'bg-accent border-accent text-white shadow-sm' 
                : 'bg-bgCreme border-primary/5 text-primary/70'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Botão de Ação */}
      <button 
        className={`w-full py-3 rounded-2xl font-heading font-extrabold text-xs tracking-wider transition-all duration-300 shadow-sm ${
          isSaved 
            ? 'bg-primary text-white' 
            : 'bg-white border border-primary/10 text-primary'
        }`}
      >
        {isSaved ? "SALVO COM SUCESSO" : "CONFIRMAR DIA"}
      </button>

      {/* Cursor Simulado */}
      <div 
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          opacity: cursorPos.opacity,
          transform: `scale(${cursorPos.scale})`,
          transition: 'left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s, transform 0.15s'
        }}
        className="absolute pointer-events-none z-40"
      >
        <svg className="w-5 h-5 text-accent drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path 
            fill="currentColor" 
            d="M5.5 3v13.5l3.8-3.8 2.6 6 2.4-1-2.6-6H16L5.5 3z" 
          />
        </svg>
      </div>
    </div>
  );
}

// Accordion de FAQ
function FaqAccordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-bgCreme rounded-3xl border border-primary/5 overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-extrabold text-sm md:text-base text-primary hover:text-accent transition-colors focus:outline-none"
      >
        <span>{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : 'text-primary/50'}`} />
      </button>
      <div 
        className="transition-all duration-300 overflow-hidden"
        style={{ maxHeight: isOpen ? '250px' : '0px' }}
      >
        <p className="px-6 pb-6 text-dark/70 text-sm leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}
