/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import autorImg from './assets/autor.jpg';
import { 
  Shield, Check, ChevronDown, MessageSquare, ArrowRight, Activity, 
  Menu, X, BookOpen, AlertCircle, Heart, Star, Sparkles, Droplet,
  CheckCircle, UserCheck
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Link de checkout da Kiwify (pode ser editado facilmente pelo usuário)
const KIWIFY_CHECKOUT_URL = "https://pay.kiwify.com.br/GSu7b92";

// Link de checkout com desconto para o Popup de Exit Intent
const KIWIFY_DISCOUNT_URL = "https://pay.kiwify.com.br/Lvzjpip"; // Substitua pelo link direto do checkout de R$27

const StarRating = () => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" 
           fill="#F59E0B" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  
  // Ref para GSAP animations
  const appRef = useRef(null);

  // Monitorar scroll para Navbar e CTA Flutuante
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Controle do CTA flutuante
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const scrolledPercent = (window.scrollY / scrollHeight) * 100;
        const precoSection = document.getElementById('preco');
        let isPastPreco = false;
        if (precoSection) {
          const rect = precoSection.getBoundingClientRect();
          isPastPreco = rect.top <= window.innerHeight;
        }
        setShowFloatingCta(scrolledPercent >= 40 && !isPastPreco);
      }
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
          end: `+=${window.innerHeight * 1.2}`, // Altura de scroll total reduzida para transições mais rápidas e snappier
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
            Quero Agora — <span className="line-through opacity-70 mr-1">R$47</span> R$37
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
              QUERO MEU GUIA AGORA — <span className="line-through opacity-70 mr-1">R$47</span> R$37
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
            backgroundImage: "url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1974')",
          }}
        />
        
        {/* Strong primary-to-black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-primary/80 to-transparent opacity-90" />

        {/* Content Container (Bottom-left aligned) */}
        <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 pb-8 pt-24 md:pb-24 flex flex-col items-center md:items-start gap-2.5 md:gap-4 text-center md:text-left">
          <div className="overflow-hidden">
            <span className="hero-anim block font-heading font-extrabold text-white text-xl md:text-5xl uppercase tracking-wider">
              Colesterol alto é
            </span>
          </div>
          <div className="overflow-hidden leading-none -mt-1 md:-mt-2">
            <h1 className="hero-anim block font-drama italic text-accent text-5xl md:text-9xl lg:text-[10rem] font-bold">
              Reversível.
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="hero-anim block text-white/80 font-sans text-sm md:text-xl max-w-xl">
              Descubra o que ninguém te contou sobre alimentação e colesterol — em linguagem simples, sem complicação.
            </p>
          </div>
          
          <div className="hero-anim mt-2 md:mt-4 w-full md:w-auto flex flex-col items-center md:items-start gap-2">
            <a 
              href={KIWIFY_CHECKOUT_URL}
              className="w-full md:w-auto btn-premium bg-accent hover:bg-accentHover text-white text-xs md:text-base px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold shadow-lg hover:scale-103 transition-transform text-center"
            >
              QUERO MEU GUIA AGORA — <span className="line-through opacity-70 mr-1.5">R$47</span> R$37
            </a>
            <span className="text-[10px] md:text-xs text-white/60 text-center w-full md:text-left mt-1 block">
              ⭐⭐⭐⭐⭐ &nbsp;+847 pessoas já transformaram seus exames
            </span>
          </div>

          <div className="hero-anim font-mono text-[9px] md:text-xs text-white/60 mt-2 md:mt-3 flex items-center justify-center md:justify-start gap-3 md:gap-4 flex-wrap w-full md:w-auto">
            <span className="flex items-center gap-1"><Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-accent" /> Entrega imediata</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-accent" /> Garantia de 7 dias</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-accent" /> PDF completo</span>
          </div>
        </div>
      </section>

      {/* ELEMENTO 2 — VÍDEO DE APOIO */}
      <section className="py-16 px-6 md:px-12 bg-white flex flex-col items-center border-b border-primary/5">
        <div className="w-full max-w-3xl text-center flex flex-col items-center">
          <h2 className="font-heading font-extrabold text-primary text-2xl md:text-3xl lg:text-4xl mb-2 max-w-2xl leading-tight">
            Veja por que o colesterol alto é mais perigoso do que parece
          </h2>
          <p className="text-gray-500 font-medium text-sm md:text-base mb-8 max-w-lg">
            Em 3 minutos você vai entender o que está acontecendo nas suas artérias
          </p>
          
          <div className="w-full max-w-[600px] rounded-[12px] overflow-hidden shadow-md">
            <iframe 
              width="100%" 
              style={{ 
                maxWidth: '600px', 
                borderRadius: '12px', 
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                display: 'block', 
                margin: '0 auto' 
              }}
              height="340"
              src="https://www.youtube.com/embed/xHAE_tWUnsY?rel=0&modestbranding=1"
              title="Colesterol alto - entenda o risco"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
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

          <p className="italic text-gray-500 text-[14px] text-center mb-[20px]">
            Se você é como a maioria das mulheres que nos escrevem, provavelmente se identifica com pelo menos uma dessas situações:
          </p>

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
        <div className="protocol-wrapper w-full h-screen relative overflow-hidden">
          
          {/* Card 1 */}
          <div className="protocol-card w-full h-screen bg-[#1F2E25] flex items-center justify-center px-6 md:px-12 absolute inset-0">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6">
                <span className="font-mono text-sm text-accent tracking-widest font-semibold">PASSO 01</span>
                <h2 className="font-heading font-extrabold text-3xl md:text-5xl leading-tight">
                  Elimine os vilões
                </h2>
                <p className="text-white/80 leading-relaxed text-base md:text-lg">
                  Você vai identificar os 3 alimentos que estão sabotando seus exames sem você perceber — e vai trocá-los por opções que você já tem em casa.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                  <span>Fase de identificação</span>
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
          <div className="protocol-card w-full h-screen bg-[#2A3C31] flex items-center justify-center px-6 md:px-12 absolute inset-0 translate-y-full">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6">
                <span className="font-mono text-sm text-accent tracking-widest font-semibold">PASSO 02</span>
                <h2 className="font-heading font-extrabold text-3xl md:text-5xl leading-tight">
                  Ative os superalimentos
                </h2>
                <p className="text-white/80 leading-relaxed text-base md:text-lg">
                  Pequenas adições no cardápio do dia a dia que fazem seu fígado processar o colesterol de forma muito mais eficiente.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                  <span>Fase de ativação</span>
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
                    Alimentação estratégica
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="protocol-card w-full h-screen bg-[#34473C] flex items-center justify-center px-6 md:px-12 absolute inset-0 translate-y-full">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6">
                <span className="font-mono text-sm text-accent tracking-widest font-semibold">PASSO 03</span>
                <h2 className="font-heading font-extrabold text-3xl md:text-5xl leading-tight">
                  Consolide o hábito
                </h2>
                <p className="text-white/80 leading-relaxed text-base md:text-lg">
                  Depois de 21 dias, as novas escolhas alimentares já fazem parte da sua rotina — sem esforço, sem sofrimento.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                  <span>Fase de consolidação</span>
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
                    Saúde protegida
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

      {/* AJUSTE 4 — PROVA SOCIAL REAL */}
      <section className="py-24 px-6 md:px-12 bg-white flex flex-col items-center border-t border-primary/5">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-heading font-extrabold text-primary text-3xl md:text-5xl tracking-tight">
              O que dizem quem já usou o protocolo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="relative bg-white p-6 rounded-[12px] border border-primary/10 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <StarRating />
                  <span className="bg-emerald-500/10 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Compra verificada
                  </span>
                </div>
                <p className="text-dark/80 italic text-sm md:text-base leading-relaxed">
                  "Fiz os exames 30 dias depois de começar o protocolo. Meu LDL caiu de 178 para 142. Minha médica ficou surpresa e perguntou o que eu tinha feito diferente."
                </p>
              </div>
              <div className="font-sans text-xs md:text-sm text-dark font-bold border-t border-primary/5 pt-3 flex items-center gap-3">
                <div 
                  className="flex items-center justify-center text-white font-bold flex-shrink-0"
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: '#2E7D52', 
                    fontSize: '13px' 
                  }}
                >
                  RM
                </div>
                <span>Rosana M. — Fortaleza, CE</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative bg-white p-6 rounded-[12px] border border-primary/10 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <StarRating />
                  <span className="bg-emerald-500/10 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Compra verificada
                  </span>
                </div>
                <p className="text-dark/80 italic text-sm md:text-base leading-relaxed">
                  "Meu médico sempre dizia que eu precisava de remédio. Resolvi tentar 30 dias só com alimentação seguindo esse guia. No retorno, meu LDL tinha caído de 165 para 138. Ele ficou surpreso. Eu não fiquei."
                </p>
              </div>
              <div className="font-sans text-xs md:text-sm text-dark font-bold border-t border-primary/5 pt-3 flex items-center gap-3">
                <div 
                  className="flex items-center justify-center text-white font-bold flex-shrink-0"
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: '#2E7D52', 
                    fontSize: '13px' 
                  }}
                >
                  AM
                </div>
                <span>Ana Paula M. — Goiânia, GO</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative bg-white p-6 rounded-[12px] border border-primary/10 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <StarRating />
                  <span className="bg-emerald-500/10 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Compra verificada
                  </span>
                </div>
                <p className="text-dark/80 italic text-sm md:text-base leading-relaxed">
                  "Comprei com o pé atrás por ser só R$37. Mas o conteúdo é sério, muito bem explicado. Já indiquei para minha mãe e minha tia que também têm colesterol alto."
                </p>
              </div>
              <div className="font-sans text-xs md:text-sm text-dark font-bold border-t border-primary/5 pt-3 flex items-center gap-3">
                <div 
                  className="flex items-center justify-center text-white font-bold flex-shrink-0"
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: '#2E7D52', 
                    fontSize: '13px' 
                  }}
                >
                  FL
                </div>
                <span>Fernanda L. — Belo Horizonte, MG</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ELEMENTO 1 — SEÇÃO DO AUTOR */}
      <section className="py-20 px-6 md:px-12 bg-[#F8F8F8] flex flex-col items-center">
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* Foto circular */}
          <div className="flex-shrink-0">
            <img 
              src={autorImg} 
              alt="Ricardo Menezes" 
              className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-full object-cover shadow-md border-[3px] border-[#2E7D52]"
              style={{ borderRadius: '50%' }}
            />
          </div>
          
          {/* Texto à direita */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-sans font-bold uppercase tracking-wider text-[#2E7D52] text-[10px] mb-2">
              QUEM CRIOU ESTE GUIA
            </span>
            <h3 className="font-heading font-extrabold text-primary text-2xl md:text-3xl leading-tight mb-1">
              Ricardo Menezes
            </h3>
            <p className="text-gray-500 font-medium text-sm md:text-base mb-4">
              Pesquisador de saúde cardiovascular e hábitos alimentares
            </p>
            <p className="text-dark/85 text-sm md:text-base leading-relaxed mb-4 max-w-2xl">
              Aos 42 anos recebi a notícia que meu colesterol LDL estava em 187 mg/dL. O médico queria receitar estatina imediatamente. Pedi 90 dias para tentar resolver com alimentação. Passei meses estudando cada evidência científica disponível sobre nutrição cardiovascular. Resultado: LDL caiu para 131 mg/dL em 60 dias. Esse guia é o protocolo que usei — organizado para qualquer pessoa conseguir seguir.
            </p>
            <p className="italic text-[#2E7D52] text-[13px] mb-6 text-center md:text-left font-medium">
              Hoje mais de 800 pessoas — a maioria mulheres entre 40 e 65 anos — já usaram esse protocolo para transformar seus exames.
            </p>
            
            {/* 3 badges verdes */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-semibold text-[#2E7D52]">
              <span className="bg-[#2E7D52]/10 px-3 py-1.5 rounded-full flex items-center gap-1">
                ✓ Baseado em evidências
              </span>
              <span className="bg-[#2E7D52]/10 px-3 py-1.5 rounded-full flex items-center gap-1">
                ✓ Testado pessoalmente
              </span>
              <span className="bg-[#2E7D52]/10 px-3 py-1.5 rounded-full flex items-center gap-1">
                ✓ Linguagem simples
              </span>
            </div>
          </div>
        </div>

        {/* Botão CTA centralizado */}
        <div className="flex justify-center mt-6">
          <a 
            href={KIWIFY_CHECKOUT_URL}
            className="btn-premium bg-accent hover:bg-accentHover text-white text-xs md:text-base px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold shadow-lg hover:scale-103 transition-transform text-center"
            style={{ marginTop: '24px' }}
          >
            QUERO APLICAR ESSE PROTOCOLO — R$37
          </a>
        </div>
      </section>

      {/* AJUSTE 2 — BLOCO DE DOR */}
      <section className="py-20 px-6 md:px-12 bg-[#EAECE6] text-dark flex flex-col items-center">
        <div className="w-full max-w-2xl text-center md:text-center flex flex-col gap-6 text-[15px] md:text-lg text-dark/95 leading-relaxed">
          <p>
            Cada dia com colesterol alto é mais um dia acumulando risco.
          </p>
          <div className="flex flex-col gap-2">
            <p className="font-bold">O exame não melhora sozinho.</p>
            <p className="font-bold">A alimentação não muda sem um plano claro.</p>
            <p className="font-bold">O médico não tem tempo de te ensinar o que comer no dia a dia.</p>
          </div>
          <p>
            Por R$37 — menos que uma consulta, menos que um mês de suplemento — você tem o protocolo completo, o cardápio pronto e o plano de 21 dias para começar hoje.
          </p>
        </div>
      </section>

      {/* H. SEÇÃO PRICING — Oferta única */}
      <section id="preco" className="py-24 px-6 md:px-12 bg-primary text-white flex flex-col items-center relative overflow-hidden">
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
          <div className="flex flex-col gap-2 items-center justify-center font-mono text-sm text-white/50">
            <span className="line-through">Consulta nutricional: R$250</span>
            <span className="line-through">Suplementos por 30 dias: R$180</span>
          </div>

          {/* Separador visual */}
          <div className="w-24 h-[1px] bg-white/20 my-4" />

          {/* Texto de transição */}
          <span className="text-white/80 font-heading text-sm md:text-base uppercase tracking-wider font-semibold">
            Seu investimento hoje:
          </span>

          {/* Preço Principal */}
          <div className="flex flex-col items-center mb-4 mt-2">
            <CountdownTimer />

            {/* ELEMENTO 3 — URGÊNCIA NA SEÇÃO DE PREÇO */}
            <div className="w-full max-w-[280px] md:max-w-[320px] flex flex-col items-center gap-2 mt-4 mb-2">
              <span className="font-bold text-[13px] text-[#C0392B] text-center">
                🔥 Alta demanda — estoque digital limitado
              </span>
              <div className="w-full h-[10px] bg-[#F0F0F0] rounded-[5px] overflow-hidden">
                <div 
                  className="h-full rounded-[5px]" 
                  style={{ 
                    width: '78%', 
                    background: 'linear-gradient(to right, #F39C12, #C0392B)' 
                  }}
                />
              </div>
            </div>

            <p style={{ 
              textDecoration: 'line-through', 
              color: '#999', 
              fontSize: '18px',
              marginBottom: '4px',
              textAlign: 'center'
            }}>
              De R$47
            </p>
            <span className="font-heading font-black text-6xl md:text-8xl text-white tracking-tighter mt-2">
              R$ 37
            </span>
            <span className="font-mono text-[10px] text-white/60 mt-2 tracking-widest uppercase font-semibold">
              pagamento único • acesso vitalício • entrega imediata
            </span>
          </div>

          {/* CTA Grande */}
          <a 
            href={KIWIFY_CHECKOUT_URL}
            className="w-full btn-premium bg-accent hover:bg-accentHover text-white py-5 text-lg rounded-full font-bold shadow-xl hover:scale-103 transition-transform"
          >
            QUERO COMEÇAR HOJE — R$37
          </a>

          <p className="text-[10px] text-white/50 -mt-2">
            Ao clicar, você será redirecionado para o checkout seguro da Kiwify.
          </p>

          {/* Selo de Garantia de 7 Dias */}
          <div className="w-full bg-white border border-primary rounded-[12px] p-[20px] shadow-sm text-dark flex flex-col items-center gap-4 mt-6">
            <Shield className="w-10 h-10 text-primary" style={{ width: '40px', height: '40px' }} />
            <h4 className="font-heading font-bold text-center text-primary text-base">
              Garantia Incondicional de 7 Dias
            </h4>
            <p className="text-center text-xs md:text-sm text-dark/85 leading-relaxed">
              Se por qualquer motivo você não ficar satisfeito, basta enviar um e-mail em até 7 dias e devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 border-t border-primary/10 pt-4 w-full text-xs font-semibold text-primary">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-primary" /> Sem risco
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-primary" /> Sem perguntas
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-primary" /> 100% do valor
              </span>
            </div>
          </div>

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

      {/* Popups e Notificações de Conversão */}
      <ExitIntentPopup />
      <SocialProof />

      {/* AJUSTE 5 — CTA FLUTUANTE NO MOBILE */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-[9999] md:hidden p-4 transition-all duration-300 ease-out ${
          showFloatingCta ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <a 
          href={KIWIFY_CHECKOUT_URL}
          className="block w-full text-center bg-[#2E7D52] hover:bg-[#256341] text-white font-bold py-4 rounded-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
        >
          Quero Começar — R$37
        </a>
      </div>

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
    "Aveia no café da manhã reduziu LDL em 8% em 4 semanas...",
    "Mulheres de 45 a 60 anos são as que mais respondem ao protocolo alimentar...",
    "Azeite extra virgem protege as artérias da oxidação...",
    "21 dias de consistência criam novos hábitos automáticos...",
    "Feijão e lentilha: as fibras que sequestram o colesterol..."
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

// ==========================================
// NEW COMPONENTS FOR LP UPDATES
// ==========================================

// AJUSTE 3 — OFERTA ATIVA (SUBSTITUINDO CRONÔMETRO)
function CountdownTimer() {
  return (
    <div className="text-[11px] font-mono bg-transparent select-none mt-1 text-[#E53935] font-semibold">
      🔥 Oferta ativa para as próximas 31 acessos
    </div>
  );
}

// MUDANÇA 3 — POPUP DE EXIT INTENT
function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [time, setTime] = useState(600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(t => t <= 0 ? 600 : t - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, []);

  const mins = String(Math.floor(time/60)).padStart(2,'0');
  const secs = String(time % 60).padStart(2,'0');

  useEffect(() => {
    // Só ativa após 5 segundos de página
    const delayTimer = setTimeout(() => {
      const handleMouseLeave = (e) => {
        // Direção do topo (clientY < 10)
        if (e.clientY < 10) {
          // Aparece apenas UMA vez por sessão
          if (!sessionStorage.getItem("exitPopupShown")) {
            setIsOpen(true);
            sessionStorage.setItem("exitPopupShown", "true");
            // Dá tempo para o React renderizar o DOM antes de iniciar a transição CSS
            setTimeout(() => setAnimate(true), 50);
          }
        }
      };

      document.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, 5000);

    return () => clearTimeout(delayTimer);
  }, []);

  if (!isOpen) return null;

  const handleClose = () => {
    setAnimate(false);
    // Espera a animação de saída de 300ms antes de desmontar o modal do DOM
    setTimeout(() => setIsOpen(false), 300);
  };

  const handleOverlayClick = (e) => {
    // Fecha se o usuário clicar no fundo
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black/75 px-4 transition-opacity duration-300 ${
        animate ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div 
        className={`relative w-full max-w-[480px] bg-white rounded-2xl p-8 md:p-10 shadow-2xl flex flex-col items-center text-center transition-all duration-300 ${
          animate ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        {/* Botão X para fechar */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-dark/40 hover:text-dark transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tag vermelha */}
        <span className="bg-[#E53935]/10 text-[#E53935] text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
          ESPERA! Oferta exclusiva
        </span>

        {/* Títulos */}
        <h3 className="font-heading font-black text-2xl md:text-3xl text-dark leading-tight mb-2">
          Não vá embora sem o seu desconto
        </h3>
        <p className="text-dark/60 text-xs md:text-sm mb-6 leading-relaxed">
          Essa oferta expira quando você fechar esta página.
        </p>

        {/* Cronômetro */}
        <div style={{ 
          fontSize: '22px', 
          color: '#E53935', 
          fontWeight: 800, 
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          ⏱ Oferta expira em: {mins}:{secs}
        </div>

        {/* Bloco de preço */}
        <div className="flex flex-col items-center bg-[#F2F0E9]/40 border border-primary/5 rounded-2xl p-4 w-full mb-6">
          <span className="text-[12px] text-dark/40 line-through font-mono leading-none mb-1">
            De R$47
          </span>
          <span className="text-4xl md:text-5xl font-heading font-black text-[#2E7D52] tracking-tighter leading-none mb-2">
            R$27
          </span>
          <span className="bg-[#2E7D52]/10 text-[#2E7D52] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            Você economiza R$20
          </span>
        </div>

        {/* Lista de itens */}
        <div className="flex flex-col gap-3 w-full text-left mb-6 font-semibold text-xs md:text-sm text-dark/80">
          <div className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-[#2E7D52] flex-shrink-0" />
            <span>PDF completo com 8 capítulos</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-[#2E7D52] flex-shrink-0" />
            <span>Protocolo de 21 dias passo a passo</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-[#2E7D52] flex-shrink-0" />
            <span>Cardápio semanal + lista de compras</span>
          </div>
        </div>

        {/* Botão CTA */}
        <a 
          href={KIWIFY_DISCOUNT_URL} 
          className="w-full bg-[#2E7D52] hover:bg-[#256341] text-white py-4 px-6 rounded-full font-bold text-center text-sm md:text-base shadow-lg transition-transform duration-300 hover:scale-103 mb-3 uppercase tracking-wider"
        >
          QUERO POR R$27 AGORA
        </a>

        {/* Informação adicional */}
        <p className="text-[10px] text-dark/40 mb-5">
          Garantia de 7 dias. Entrega imediata no e-mail.
        </p>

        {/* Botão de Rejeição */}
        <button 
          onClick={handleClose}
          className="text-[11px] text-dark/40 hover:text-dark/70 transition-colors font-medium underline"
        >
          Não, prefiro pagar R$37 mais tarde
        </button>
      </div>
    </div>
  );
}

// MUDANÇA 5 — POPUP DE PROVA SOCIAL
function SocialProof() {
  const [notification, setNotification] = useState(null);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const hideTimerRef = useRef(null);

  const names = [
    "Maria S. — São Paulo", "João R. — Belo Horizonte", "Ana C. — Fortaleza",
    "Carlos M. — Recife", "Fernanda L. — Curitiba", "Roberto A. — Salvador",
    "Patricia O. — Manaus", "Lucas T. — Porto Alegre", "Beatriz N. — Brasília",
    "Eduardo F. — Goiânia", "Marcia V. — Campinas", "Thiago B. — Natal",
    "Claudia R. — Florianópolis", "Anderson S. — Belém", "Juliana M. — São Luís"
  ];

  const showNotification = () => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomMinutes = Math.floor(Math.random() * 8) + 1;
    setNotification({ name: randomName, minutes: randomMinutes });
    setVisible(true);

    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
    }, 4000); // Fica visível por 4 segundos
  };

  useEffect(() => {
    // Primeira notificação após 8 segundos
    const initialTimeout = setTimeout(() => {
      showNotification();

      // Novas notificações a cada 35 segundos
      const intervalId = setInterval(() => {
        showNotification();
      }, 35000);

      timerRef.current = intervalId;
    }, 8000);

    timerRef.current = initialTimeout;

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(timerRef.current);
      clearTimeout(hideTimerRef.current);
    };
  }, []);

  if (!notification) return null;

  return (
    <div
      style={{
        transform: visible ? 'translateX(0)' : 'translateX(120%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease-out',
      }}
      className="fixed bottom-6 right-6 z-[9999] max-w-[280px] w-full bg-white rounded-[10px] p-3.5 border-l-[3px] border-[#2E7D52] shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex items-start gap-3 select-none pointer-events-none"
    >
      <div className="w-[30px] h-[30px] bg-[#2E7D52]/10 rounded-full flex items-center justify-center text-[#2E7D52] flex-shrink-0 mt-0.5">
        <UserCheck className="w-[18px] h-[18px]" />
      </div>
      <div className="flex flex-col gap-0.5 text-left">
        <span className="font-bold text-[12px] text-[#1A1A1A] leading-tight">
          {notification.name}
        </span>
        <span className="text-[11px] text-[#666] leading-tight">
          acabou de adquirir o guia
        </span>
        <span className="text-[10px] text-[#2E7D52] font-semibold mt-0.5 leading-none">
          há {notification.minutes} minutos
        </span>
      </div>
    </div>
  );
}
