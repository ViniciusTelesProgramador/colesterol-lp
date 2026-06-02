# Plano de Tarefas - task_plan.md

## Fase 1: Inicialização e Ambiente
- [x] Criar `gemini.md` (Constituição)
- [x] Criar `task_plan.md` (Plano de tarefas)
- [x] Criar `findings.md` (Descobertas)
- [x] Criar `progress.md` (Rastreamento de progresso)
- [x] Inicializar o projeto React com Vite
- [x] Instalar as dependências (gsap, lucide-react, tailwindcss)
- [x] Configurar o arquivo `index.html` para carregar as Google Fonts (Plus Jakarta Sans, Outfit, Cormorant Garamond, IBM Plex Mono)

## Fase 2: Configuração do Design System (index.css)
- [x] Implementar a textura de ruído global via SVG/CSS.
- [x] Definir a paleta de cores (Musgo, Argila, Creme, Carvão) no Tailwind.
- [x] Configurar transições e variáveis globais.

## Fase 3: Desenvolvimento do App.jsx
- [x] Implementar a Navbar flutuante ("A Ilha Flutuante") com detector de scroll.
- [x] Implementar a Hero Section ("Cena de Abertura") com contraste de tipografia e animação GSAP fade-up.
- [x] Implementar a Seção de Identificação do Problema (3 cards).
- [x] Implementar a Seção Features com os 3 artefatos interativos:
  - [x] Card 1: Diagnostic Shuffler (cards que rotacionam).
  - [x] Card 2: Telemetry Typewriter (feed de texto mono digitado ao vivo).
  - [x] Card 3: Cursor Protocol Scheduler (grade semanal com cursor clicando).
- [x] Implementar a Seção Philosophy ("O Manifesto") com efeito parallax e revelação GSAP.
- [x] Implementar a Seção Protocol ("Sticky Stacking") com 3 cards de tela cheia que se empilham ao rolar:
  - [x] Passo 1: Círculos concêntricos giratórios (animação SVG/CSS).
  - [x] Passo 2: Linha de laser scan (animação SVG/CSS).
  - [x] Passo 3: EKG / waveform pulsante (animação SVG/CSS).
- [x] Implementar a Seção O Que Você Recebe (lista com ícones Lucide).
- [x] Implementar a Seção Pricing (oferta única de R$37 convertida, com ancoragem de preço e CTA Kiwify).
- [x] Implementar a Seção Garantia (escudo Lucide + texto de 7 dias).
- [x] Implementar a Seção FAQ (accordion interativo com as 5 perguntas frequentes).
- [x] Implementar o Footer (status "Sistema Operacional" verde pulsante, links, disclaimer).

## Fase 4: Integração, Polimento e Animações GSAP
- [x] Ajustar todos os ciclos de vida de animação com `gsap.context()` e cleanup.
- [x] Ajustar responsividade de todas as seções (mobile-first).
- [x] Verificar integridade de links e caminhos de imagens do Unsplash.

## Fase 5: Validação e Testes
- [x] Validar build de produção (`npm run build`).
- [x] Verificar se as animações carregam sem quebra de layout e de forma performática.
