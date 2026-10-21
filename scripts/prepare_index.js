const fs = require('fs');
const path = require('path');

let html = fs.readFileSync('extracted_stitch.html', 'utf8');

// Replacements for image URLs with local fallback
const imageReplacements = [
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPFFOVI5PupeLTfuH7hnTKVioiEX-F_56p2Kci6q0GuaCwTw2geon5hycz1n7NkUt0eKjByVhZRDXQHxs8r-NfpcZ9Ry4xFbDpwA6cZM5N_QqDjXHFv-_Akn_8C2xLQ14TtXLLVTyOKkmIcqsUe6JGar5ijs7otEo3HflaK20MpjMnYe7ya1JPJJ4WJCGutzkwfHx6J7TBXTbOlVvWadDp8fDau8NWC5d4g2RM3YfiavIWLiqKZ81ruLjuSe2ljjtNQA',
    local: 'assets/images/arianna_hero.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbyLruzS6Gnu4kpqWmlLM2IzDbqi68HAY8NmPXJD4BjJHhHXudV7TJrM5uOJJVU_7GOEIp68RdSRm5-NSvLynljojd7XAlIsZErn3BJOSmHN6R0wTayf8M0GBKC3Cr2rz9kT9nCAlxhL-hyCia0n5o5p_cEKA5vsqufy3K1ZgZLi4VTMMsWpJj9_CjOGCpssGj0llCeh4DN1cH8-cWI9zdA42R8iKMGqEvRqEleiY5ofyzGC6vxN5c',
    local: 'assets/images/service_custom_dev.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCjV5oxqRFHren1ga7Q_BNaDG4LgHP1roSj-0fHTy0j1Ki2TP5fH3E7RDOzSZPFhkNOZOIX5xjRPVSbPOpvkgRjiMqVWUAyKLxHDKcQM4J3RkeoJZmckhJWgNg9TnhMtHXcgR4trS4SjVUD0aNFVXluFIIh15C9qOO7_YJ6fo1wk3S7gtRO5MZEggqz_0RqTPYOlYX0ccDd_orkffloBuRV1Jixezhn6_W1WiZ05CfZYWuwBnrMP-2',
    local: 'assets/images/service_wordpress.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBwMjxlFho6z8yWUjrAEM3o3oelZoY3lVBxnOfaEzO_wMlMjiLVG0xgJ-bJWgNsHkN-AxKRiaEP49-W8ngeh03wmRXHAo-2XrA6M5r-SN1u8V0XAaIvZxfwA9dXG40Oqp6LZrpa3TGFj5IRhriK6OMhruzEiRAaEh0MLh1ZvWwuL0M_9qZ9XYOtr-G6hwlBnhUjdG1NjpN8oLqnc1D2gyHsqzMvPaBOzFncdOsSt6olqzAG0uoir65',
    local: 'assets/images/service_repos.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgR_lq4J1ColtQEyqdnWWpSIEiMC4J4dk1abjUMjCOa8EQ3vRoxfEco-KvyrNCl0Op0icnN8Km6Z_o5D9K667xoQWeSmZV8TM7cVsAhI00kb__QuD09tVGuuH5UH6ObT68VkheFL3PPw_CVrip3oEGtMRsNTqQOzMxvnZfPzlCLl7rEMjdSZGWvT2BXCkiGN4le4fueqibgYs7ISrn1_zFIQRHZdxu1I3-IC4TOjS7bMWoNcgw6SqR',
    local: 'assets/images/service_growth_ai.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTbyX7ui67a4scmsjhSCmIrSSQd6E8aEa5CBWE1qUF-jN42phVfRPO7BWHvbKDS_EQzcPtLxVL_hCXJsu7RNUUisoLG0sCpLzmHZ_7F5Sm2Cs18VSl7TaNZe6rlon9qZhVZjPpXGObzDryAL-cQRc97p0EgWJvsW2WeL3Se9o5H5EaIc8Oa-upquW27I8xIouoDf6p8netic8676ydZ_93agxx8sWIkPIKbdL8G5x3ClbIFVeZ9XKk',
    local: 'assets/images/case_audit_platform.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaNrMd546wKNzr9MtU4gA4im43FMKOqSbFHC2Wsjx7249_wYLk9TTxEmQINfwAsC8nbhkePzMygVmy-AlIzjFgkpSfQ5qUeV4-oCXiA4CZKKPIhXIh2TIFe-m0bF0tH9O22OqeLYKnTbj4ly-Mp5KXiLagP-khvhHYd7-VVezbCoq_lCOd2fA4_O2sSgSLqj_-odQPjzkeWT5GQbI73015WiPu8CBmTqzn_8002TeiJ7npZEjfOnay',
    local: 'assets/images/case_checkout.png'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfeDJeijGm4I2CdmyfDkz1RdP8nDkkNAFx03j-ekhnNxyfd-yLoNAZE8PWB6Ybo4CY09DpQiLyUzDzrYnBR4A5QPSAM-AefHAChIOV-ojc7K_Ct8DLlXhsj6JWuPPXAQUR3G7AfQLlVMPzIs2XELIYDDiIUJX5r8ZGJ49pFYDalC7ueQyH0-UriFXzZvzcjyLHknkDAqLPwxmcZfCl92XNj6nfyNqPrsgHJ6tJcAZgm7eH9Z29cHgG',
    local: 'assets/images/case_dspace.png'
  }
];

for (const item of imageReplacements) {
  html = html.split(item.url).join(`${item.local}" onerror="this.onerror=null;this.src='${item.url}'`);
}

// Update WhatsApp with real number
html = html.split('wa.me/584120000000').join('wa.me/584241685298');

// Update Email mailto links
html = html.split('mailto:hello@aryclement.dev').join('mailto:hello.ary.code@gmail.com');

// Ensure meta tags include description and OpenGraph
const seoMeta = `
<meta name="description" content="Arianna Clemente - Solutions Architect & Tech Lead. Arquitectura de software de alto rendimiento, desarrollo Full-Stack moderno (Laravel, PHP, WordPress, React, Cloud) y soluciones a medida con alta conversión.">
<meta name="keywords" content="Arianna Clemente, Solutions Architect, Tech Lead, Full Stack Developer, Laravel, DSpace, WordPress, Cloud Architecture, IA Growth">
<meta property="og:title" content="ARYCLEMENT // Arianna Clemente - Solutions Architect & Tech Lead">
<meta property="og:description" content="Arquitectura de software de alto rendimiento y desarrollo Full-Stack moderno para empresas y organizaciones.">
<meta property="og:type" content="website">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='25' fill='%234d17d6'/><text x='50' y='65' font-size='48' font-weight='900' font-family='sans-serif' fill='white' text-anchor='middle'>AC</text></svg>">
`;
html = html.replace('<meta content="web_standard" name="shell-type">', '<meta content="web_standard" name="shell-type">\n' + seoMeta);

// Add mobile hamburger button to the header
const headerTarget = `<!-- Right CTA -->
<div class="flex items-center gap-3">
<a class="inline-flex items-center justify-center bg-hot-pink-vibrant hover:bg-hot-pink-hover text-clean-white font-headline-sm text-sm md:text-base font-bold px-5 md:px-6 py-2.5 rounded-xl transition-all shadow-[0_8px_18px_-4px_rgba(255,46,147,0.4)] transform hover:-translate-y-0.5" href="#contacto">
<span class="">¡Hablemos!</span>
</a>
</div>`;

const headerReplacement = `<!-- Right CTA & Mobile Toggle -->
<div class="flex items-center gap-3">
<a class="inline-flex items-center justify-center bg-hot-pink-vibrant hover:bg-hot-pink-hover text-clean-white font-headline-sm text-sm md:text-base font-bold px-4 md:px-6 py-2 md:py-2.5 rounded-xl transition-all shadow-[0_8px_18px_-4px_rgba(255,46,147,0.4)] transform hover:-translate-y-0.5" href="#contacto">
<span class="">¡Hablemos!</span>
</a>
<button id="mobileMenuBtn" aria-label="Abrir menú" class="lg:hidden p-2.5 rounded-xl bg-surface-container-low border border-border-slate text-text-dark-primary hover:text-primary-container transition">
  <span class="material-symbols-outlined text-2xl" id="menuIcon">menu</span>
</button>
</div>`;

html = html.replace(headerTarget, headerReplacement);

// Add Mobile Menu Drawer right after header
const mobileMenuMarkup = `
<!-- Mobile Menu Drawer -->
<div id="mobileMenu" class="fixed inset-0 z-40 bg-dark-violet/80 backdrop-blur-md hidden transition-opacity duration-300">
  <div class="fixed top-20 left-0 right-0 bg-clean-white border-b border-border-slate p-6 shadow-2xl flex flex-col gap-4">
    <nav class="flex flex-col gap-2">
      <a class="mobile-nav-link px-4 py-3 rounded-xl font-headline-sm text-base font-semibold text-text-dark-primary hover:bg-primary-container/10 hover:text-primary-container transition" href="#inicio">Inicio</a>
      <a class="mobile-nav-link px-4 py-3 rounded-xl font-headline-sm text-base font-semibold text-text-dark-primary hover:bg-primary-container/10 hover:text-primary-container transition" href="#servicios">Servicios</a>
      <a class="mobile-nav-link px-4 py-3 rounded-xl font-headline-sm text-base font-semibold text-text-dark-primary hover:bg-primary-container/10 hover:text-primary-container transition" href="#proyectos">Proyectos S.T.A.R</a>
      <a class="mobile-nav-link px-4 py-3 rounded-xl font-headline-sm text-base font-semibold text-text-dark-primary hover:bg-primary-container/10 hover:text-primary-container transition" href="#metodologia">Metodología</a>
      <a class="mobile-nav-link px-4 py-3 rounded-xl font-headline-sm text-base font-semibold text-text-dark-primary hover:bg-primary-container/10 hover:text-primary-container transition" href="#blog">Blog & Recursos</a>
      <a class="mobile-nav-link px-4 py-3 rounded-xl font-headline-sm text-base font-semibold text-clean-white bg-primary-container hover:bg-primary text-center mt-2 shadow-md transition" href="#contacto">¡Agendar Diagnóstico!</a>
    </nav>
  </div>
</div>
`;

html = html.replace('</header>', '</header>\n' + mobileMenuMarkup);

// Add interactive video modal and scripts before </body>
const interactiveModalAndScript = `
<!-- Interactive Showcase / Video Preview Modal -->
<div id="videoModal" class="fixed inset-0 z-50 bg-dark-violet/85 backdrop-blur-md hidden items-center justify-center p-4 sm:p-6 transition-all duration-300">
  <div class="relative w-full max-w-3xl bg-clean-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform transition-all duration-300 scale-95 opacity-0" id="videoModalCard">
    <!-- Modal Header -->
    <div class="flex items-center justify-between p-5 sm:p-6 bg-[#19022c] text-clean-white border-b border-white/10">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-hot-pink-vibrant/20 text-hot-pink-vibrant flex items-center justify-center">
          <span class="material-symbols-outlined text-xl">smart_display</span>
        </div>
        <div>
          <h3 class="font-headline-sm text-lg font-bold text-clean-white" id="modalTitle">Showcase Reel</h3>
          <p class="font-label-code text-xs text-mint-turquoise" id="modalSubtitle">Demo en Vivo // Arquitectura & Flujos</p>
        </div>
      </div>
      <button onclick="closeVideoModal()" aria-label="Cerrar modal" class="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-clean-white transition">
        <span class="material-symbols-outlined text-xl">close</span>
      </button>
    </div>

    <!-- Modal Body: Interactive Video Preview Container -->
    <div class="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group">
      <img id="modalPoster" src="assets/images/service_custom_dev.png" class="w-full h-full object-cover opacity-70 filter brightness-95" alt="Showcase Preview">
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
      <!-- Center Animated Play Element -->
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <div class="w-16 h-16 rounded-full bg-hot-pink-vibrant text-clean-white flex items-center justify-center shadow-2xl shadow-hot-pink-vibrant/60 animate-pulse mb-3">
          <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
        </div>
        <p class="font-headline-sm text-sm sm:text-base font-bold text-white max-w-md drop-shadow-md" id="modalDesc">
          Grabación y walkthrough técnico disponible en sesión 1 a 1 de diagnóstico
        </p>
      </div>

      <!-- Live Telemetry overlay -->
      <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-label-code">
        <span class="bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-mint-turquoise font-semibold flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-mint-turquoise animate-ping"></span>
          Sistema Operativo en Producción
        </span>
        <span class="bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-secondary-container font-semibold" id="modalDuration">
          0:45 min
        </span>
      </div>
    </div>

    <!-- Modal Footer Actions -->
    <div class="p-5 sm:p-6 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border-slate">
      <div class="flex items-center gap-2 text-xs font-label-code text-text-dark-secondary">
        <span class="material-symbols-outlined text-mint-turquoise text-base">verified</span>
        <span>Código privado bajo acuerdo NDA institucional</span>
      </div>
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <a id="modalCta" href="#contacto" onclick="closeVideoModal()" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-hot-pink-vibrant hover:bg-hot-pink-hover text-clean-white font-headline-sm text-sm font-bold px-6 py-2.5 rounded-xl shadow-md shadow-hot-pink-vibrant/30 transition">
          <span>Solicitar Demo Completo</span>
          <span class="material-symbols-outlined text-base">arrow_forward</span>
        </a>
      </div>
    </div>
  </div>
</div>

<script>
  // Mobile Navigation Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIcon.textContent = 'close';
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.add('hidden');
        menuIcon.textContent = 'menu';
        document.body.style.overflow = 'auto';
      }
    });

    // Close when clicking mobile nav links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.textContent = 'menu';
        document.body.style.overflow = 'auto';
      });
    });
  }

  // Interactive Video / Showcase Modal
  const videoModal = document.getElementById('videoModal');
  const videoModalCard = document.getElementById('videoModalCard');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalPoster = document.getElementById('modalPoster');
  const modalDuration = document.getElementById('modalDuration');

  const showcaseData = {
    'desarrollo': {
      title: 'Desarrollo a Medida // Backend & Microservicios',
      subtitle: 'Arquitectura Laravel 11 + Docker + CI/CD',
      desc: 'Arquitectura desacoplada de alto rendimiento, optimización de queries SQL y APIs REST/GraphQL con escalabilidad vertical y horizontal.',
      poster: 'assets/images/service_custom_dev.png',
      duration: 'Reel • 0:45 min'
    },
    'wordpress': {
      title: 'Sitios Web WordPress Ultrarrápidos',
      subtitle: 'WooCommerce Headless & Core Web Vitals 95+',
      desc: 'Desarrollo de temas custom sin constructores pesados, caching avanzado y pasarelas de pago integradas con tiempos de carga bajo 800ms.',
      poster: 'assets/images/service_wordpress.png',
      duration: 'Reel • 0:50 min'
    },
    'repositorios': {
      title: 'Repositorios Digitales & Preservación DSpace',
      subtitle: 'DSpace 7/8 + Metadatos Dublin Core + Solr',
      desc: 'Gestión masiva de documentos, indexación semántica, interoperabilidad OAI-PMH y migración segura para universidades e instituciones.',
      poster: 'assets/images/service_repos.png',
      duration: 'Reel • 1:05 min'
    },
    'growth': {
      title: 'Marketing, IA & Growth Tech',
      subtitle: 'Chatbots con LLM + WhatsApp API + Automatizaciones',
      desc: 'Embudos de venta asistidos por inteligencia artificial con calificación automática de leads y sincronización CRM en tiempo real.',
      poster: 'assets/images/service_growth_ai.png',
      duration: 'Reel • 0:40 min'
    },
    'audit-platform': {
      title: 'Plataforma Centralizada de Gestión y Auditoría',
      subtitle: 'Enterprise SaaS • Laravel 11 + PostgreSQL + Redis',
      desc: 'Reducción de tiempos de respuesta a <180ms y procesamiento continuo de más de 50.000 documentos diarios con 99.98% de disponibilidad.',
      poster: 'assets/images/case_audit_platform.png',
      duration: 'Demo en vivo • 1:20 min'
    },
    'checkout': {
      title: 'Pasarela Multidivisa & Checkout de Alta Conversión',
      subtitle: 'Fintech & E-commerce • Stripe + React + Webhooks',
      desc: 'Flujo de transacciones en menos de 3 pasos con validación anti-fraude y +38% de incremento comprobado en conversión de carritos.',
      poster: 'assets/images/case_checkout.png',
      duration: 'Walkthrough • 1:15 min'
    },
    'dspace': {
      title: 'Repositorio Institucional & Indexación Masiva',
      subtitle: 'DSpace + Elasticsearch + Almacenamiento S3',
      desc: 'Preservación de más de 120.000 artículos indexados con metadatos estandarizados para consulta pública global.',
      poster: 'assets/images/case_dspace.png',
      duration: 'Tour Interactivo • 1:40 min'
    }
  };

  function openVideoModal(key) {
    const data = showcaseData[key] || showcaseData['desarrollo'];
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalDesc.textContent = data.desc;
    modalPoster.src = data.poster;
    modalDuration.textContent = data.duration;

    videoModal.classList.remove('hidden');
    videoModal.classList.add('flex');
    setTimeout(() => {
      videoModalCard.classList.remove('scale-95', 'opacity-0');
      videoModalCard.classList.add('scale-100', 'opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    videoModalCard.classList.remove('scale-100', 'opacity-100');
    videoModalCard.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      videoModal.classList.add('hidden');
      videoModal.classList.remove('flex');
      document.body.style.overflow = 'auto';
    }, 200);
  }

  // Bind video preview banners to modal
  document.addEventListener('DOMContentLoaded', () => {
    // Add pointer cursor and onclick to video banners
    const banners = [
      { selector: 'img[alt="Desarrollo a Medida Preview"]', key: 'desarrollo' },
      { selector: 'img[alt="WordPress Ultrarrápido Preview"]', key: 'wordpress' },
      { selector: 'img[alt="Repositorios Digitales Preview"]', key: 'repositorios' },
      { selector: 'img[alt="Growth Tech & AI Preview"]', key: 'growth' },
      { selector: 'img[alt="Video Demo Auditoría Operacional"]', key: 'audit-platform' },
      { selector: 'img[alt="Video Demo Checkout Multidivisa"]', key: 'checkout' },
      { selector: 'img[alt="Video Demo Repositorio DSpace"]', key: 'dspace' }
    ];

    banners.forEach(b => {
      const img = document.querySelector(b.selector);
      if (img) {
        const container = img.closest('.aspect-video');
        if (container) {
          container.style.cursor = 'pointer';
          container.setAttribute('title', 'Click para ver preview de la demostración');
          container.addEventListener('click', (e) => {
            e.preventDefault();
            openVideoModal(b.key);
          });
        }
      }
    });
  });

  // Close modal on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !videoModal.classList.contains('hidden')) {
      closeVideoModal();
    }
  });

  // Close modal when clicking backdrop
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeVideoModal();
    }
  });
</script>
`;

html = html.replace('</body>', interactiveModalAndScript + '\n</body>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully written index.html! Length:', html.length);
