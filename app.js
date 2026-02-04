/**
 * ARIANNA CLEMENTE - PORTFOLIO LOGIC
 * Modular Script for AI Adaptation & UI Management
 */

const AppState = {
  apiKey: "", // Pegar API Key aquí para pruebas locales
  currentLang: "es",
  analysisData: null,
  stack: [
    {
      name: "Laravel",
      icon: "devicon-laravel-original colored",
      color: "brand-pink",
    },
    { name: "PHP", icon: "devicon-php-plain colored", color: "brand-teal" },
    {
      name: "JS (ES6+)",
      icon: "devicon-javascript-plain colored",
      color: "yellow-400",
    },
    { name: "WordPress", icon: "devicon-wordpress-plain", color: "blue-400" },
    { name: "SQL", icon: "devicon-mysql-plain colored", color: "brand-pink" },
    { name: "Git", icon: "devicon-git-plain colored", color: "orange-500" },
  ],
};

// Gallery state
let currentSlide = 0;
let totalSlides = 0;

/**
 * Gestión de Navegación
 */
const Navigation = {
  switchTab(tabId) {
    document
      .querySelectorAll(".tab-content")
      .forEach((t) => t.classList.remove("active"));
    const target = document.getElementById(`${tabId}-tab`);
    if (target) {
      target.classList.add("active");
      window.scrollTo(0, 0);
    }
  },
};

/**
 * Servicio de Inteligencia Artificial (Gemini)
 */
const AI_Service = {
  async handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    this.showPreview(file);
    this.updateStatus("loading");

    try {
      const base64 = await this.toBase64(file);
      const result = await this.analyze(base64);
      AppState.analysisData = result;
      this.updateStatus("result", result);
    } catch (e) {
      console.error("Error en el análisis IA:", e);
      alert("Hubo un error al procesar la imagen.");
      this.updateStatus("idle");
    }
  },

  async analyze(base64Image) {
    // Prompt optimizado para extracción de datos de vacante
    const prompt = `Actúa como reclutador técnico. Analiza esta vacante y devuelve un JSON estricto: { "company": "nombre", "role": "título", "key_skills": ["skill1", "skill2", "skill3", "skill4"], "vibe": "frase corta de enfoque", "target_keywords": ["seo1", "seo2"] }`;

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "image/png",
                data: base64Image.split(",")[1],
              },
            },
          ],
        },
      ],
    };

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${AppState.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!res.ok) throw new Error("Fallo en la petición a Gemini");

    const data = await res.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return JSON.parse(rawText.replace(/```json|```/g, "").trim());
  },

  updateStatus(state, data = null) {
    const statuses = ["ai-idle", "ai-loading", "ai-result"];
    statuses.forEach((id) =>
      document.getElementById(id).classList.add("hidden"),
    );
    document.getElementById(`ai-${state}`).classList.remove("hidden");

    if (state === "result" && data) {
      document.getElementById("res-company").innerText = data.company;
      document.getElementById("res-role").innerText = data.role;
    }
  },

  showPreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById("imagePreview").src = e.target.result;
      document.getElementById("previewContainer").classList.remove("hidden");
      document.getElementById("uploadPlaceholder").classList.add("hidden");
    };
    reader.readAsDataURL(file);
  },

  reset() {
    document.getElementById("jobImage").value = "";
    document.getElementById("previewContainer").classList.add("hidden");
    document.getElementById("uploadPlaceholder").classList.remove("hidden");
    this.updateStatus("idle");
  },

  toBase64: (file) =>
    new Promise((resolve, reject) => {
      const r = new FileReader();
      r.readAsDataURL(file);
      r.onload = () => resolve(r.result);
      r.onerror = (e) => reject(e);
    }),
};

/**
 * Gestión de Interfaz (UI)
 */
const UI = {
  init() {
    this.renderStack();
    this.updateCodeSnippet();
  },

  renderStack() {
    const container = document.getElementById("stackGrid");
    if (!container) return;

    container.innerHTML = AppState.stack
      .map(
        (item) => `
            <div class="stack-card bg-white/5 border border-white/10 p-8 rounded-[2rem] flex flex-col items-center group hover:border-${item.color} transition-all">
                <i class="${item.icon} text-5xl mb-4 group-hover:scale-110 transition-transform"></i>
                <span class="font-bold text-xs uppercase tracking-widest text-brand-lavender">${item.name}</span>
            </div>
        `,
      )
      .join("");
  },

  updateCodeSnippet(customData = null) {
    const data = customData || {
      role: "Solution Architect",
      experience: "3+ Years",
      stack: ["Laravel", "WordPress", "IA Integration"],
    };

    const snippet = document.getElementById("codeSnippet");
    if (!snippet) return;

    snippet.innerHTML = `
<span class="text-brand-pink">const</span> <span class="text-white">ary</span> = {
  role: <span class="text-brand-lavender">"${data.role}"</span>,
  exp: <span class="text-brand-lavender">"${data.experience || "3+ Yrs"}"</span>,
  skills: [${(data.stack || data.key_skills || []).map((s) => `"${s}"`).join(", ")}]
};`;
  },

  applyAdaptation() {
    const data = AppState.analysisData;
    if (!data) return;

    // Cambios visuales en el Hero
    document.getElementById("heroSubtitle").innerText =
      `${data.role} Specialized`;
    document.getElementById("heroKeywords").innerText =
      data.key_skills.join(" • ");
    document.getElementById("heroDescription").innerText =
      `Enfocada en ${data.vibe}, aporto mis soluciones técnicas para potenciar los objetivos de ${data.company}.`;

    this.updateCodeSnippet(data);

    // Notificación simple y vuelta al inicio
    console.log(`Portafolio adaptado para ${data.company}`);
    Navigation.switchTab("home");
  },
};

const translations = {
  es: {
    "nav-exp": "Experiencia",
    "nav-stack": "Stack",
    "nav-contact": "Contacto",
    "hero-tag": "Full Stack Developer & Solution Architect",
    "hero-btn": "Explorar Proyectos",
    "hero-desc":
      "Técnico Medio en Informática con más de 3 años de experiencia desarrollando ecosistemas digitales para ONGs e instituciones educativas globales.",
    "exp-tag": "Experiencia Profesional",
    "exp-title": "Proyectos de alto impacto y arquitectura de datos.",
    "modal-role": "Mi Rol",
    "modal-act": "Actividades Clave",
    "modal-res": "Resultados Obtenidos",
    "visit-btn": "Visitar Proyecto",
  },
  en: {
    "nav-exp": "Experience",
    "nav-stack": "Stack",
    "nav-contact": "Contact",
    "hero-tag": "Full Stack Developer & Solution Architect",
    "hero-btn": "Explore Projects",
    "hero-desc":
      "IT Associate Degree with over 3 years of experience developing digital ecosystems for NGOs and global educational institutions.",
    "exp-tag": "Professional Experience",
    "exp-title": "High-impact projects and data architecture.",
    "modal-role": "My Role",
    "modal-act": "Key Activities",
    "modal-res": "Results Achieved",
    "visit-btn": "Visit Project",
  },
};

const projectData = {
  "fya-donations": {
    es: {
      title: "Sistema de Donaciones",
      intro:
        "Desarrollo de una plataforma a medida para Fe y Alegría que gestiona flujos de transacciones seguros.",
      category: "Laravel • SQL",
      role: "Desarrolladora Full Stack",
      activities: [
        "Arquitectura de base de datos segura.",
        "Gestión de entornos de hosting y migraciones.",
        "Estabilización para alto tráfico.",
      ],
      results:
        "Procesamiento exitoso de miles de donaciones en campañas críticas.",
    },
    en: {
      title: "Donation System",
      intro:
        "Custom platform development for Fe y Alegría managing secure transaction flows.",
      category: "Laravel • SQL",
      role: "Full Stack Developer",
      activities: [
        "Secure database architecture.",
        "Hosting environment and migration management.",
        "High-traffic stabilization.",
      ],
      results:
        "Successful processing of thousands of donations during critical campaigns.",
    },
    images: [
      "https://placehold.co/800x450/141414/f55481?text=Donaciones+Dashboard",
      "https://placehold.co/800x450/141414/27a397?text=Security+SQL",
    ],
    link: "https://app.donarfeyalegriavzla.org",
  },
  "fya-chatbot": {
    es: {
      title: "Chatbot IA de Atención",
      intro:
        "Automatización inteligente mediante el modelo Gemini para soporte al donante.",
      category: "AI • Gemini API",
      role: "Developer IA",
      activities: [
        "Configuración de API Gemini.",
        "Entrenamiento de base de conocimiento.",
        "Integración en entorno web.",
      ],
      results:
        "Atención automatizada 24/7 con reducción significativa en tiempos de espera.",
    },
    en: {
      title: "AI Support Chatbot",
      intro: "Intelligent automation using Gemini model for donor support.",
      category: "AI • Gemini API",
      role: "AI Developer",
      activities: [
        "Gemini API configuration.",
        "Knowledge base training.",
        "Web environment integration.",
      ],
      results:
        "24/7 automated support with significant reduction in wait times.",
    },
    images: [
      "https://placehold.co/800x450/27a397/ffffff?text=Gemini+Integration",
      "https://placehold.co/800x450/27a397/141414?text=Chat+Interface",
    ],
    link: "https://chatbotfya.web.app/",
  },
  "cide-ecuador": {
    es: {
      title: "Plugin Custom CIDE",
      intro:
        "Desarrollo de un plugin a medida para WordPress destinado a la validación de consultas en bases de datos.",
      category: "WordPress • PHP",
      role: "CMS Developer",
      activities: [
        "Creación de lógica de validación personalizada.",
        "Gestión de plataformas LMS (LearnDash/Moodle).",
        "Mantenimiento de DSpace y OJS.",
      ],
      results:
        "Mejora en la integridad de datos institucionales y procesos de consulta automatizados.",
    },
    en: {
      title: "CIDE Custom Plugin",
      intro:
        "Custom WordPress plugin development for database query validation.",
      category: "WordPress • PHP",
      role: "CMS Developer",
      activities: [
        "Custom validation logic creation.",
        "LMS (LearnDash/Moodle) platform management.",
        "DSpace and OJS maintenance.",
      ],
      results:
        "Improved institutional data integrity and automated query processes.",
    },
    images: [
      "https://placehold.co/800x450/504382/edece7?text=WordPress+Custom+Plugin",
      "https://placehold.co/800x450/504382/fbbec6?text=LMS+Administration",
    ],
    link: "https://cidelatam.org",
  },
  "editorial-crisalidas": {
    es: {
      title: "Sistema Editorial OJS",
      intro:
        "Instalación y configuración técnica integral de Open Journal Systems para publicaciones académicas.",
      category: "OJS • Frontend",
      role: "OJS Systems Specialist",
      activities: [
        "Personalización de temas frontend.",
        "Integración de plugins de flujo editorial.",
        "Lanzamiento de dos revistas académicas.",
      ],
      results:
        "Despliegue exitoso de plataformas editoriales con cumplimiento de estándares académicos.",
    },
    en: {
      title: "OJS Editorial System",
      intro:
        "End-to-end technical installation and configuration of Open Journal Systems for academic publishing.",
      category: "OJS • Frontend",
      role: "OJS Systems Specialist",
      activities: [
        "Frontend theme customization.",
        "Editorial workflow plugin integration.",
        "Launch of two academic journals.",
      ],
      results:
        "Successful deployment of editorial platforms complying with academic standards.",
    },
    images: [
      "https://placehold.co/800x450/f55481/141414?text=OJS+Installation",
      "https://placehold.co/800x450/f55481/edece7?text=Academic+Journal",
    ],
    link: "https://revistayachakuna.com",
  },
  "fya-landing": {
    es: {
      title: "Landing Page Recaudación",
      intro:
        "Sitio de alto rendimiento enfocado en conversión y SEO para maximizar donaciones.",
      category: "WordPress • SEO",
      role: "Web Designer & Dev",
      activities: [
        "Diseño UI/UX optimizado para conversión.",
        "Integración con Google Analytics.",
        "Estrategia SEO on-page.",
      ],
      results:
        "Aumento en el tráfico orgánico y tasa de conversión de donantes potenciales.",
    },
    en: {
      title: "Fundraising Landing Page",
      intro:
        "High-performance site focused on conversion and SEO to maximize donations.",
      category: "WordPress • SEO",
      role: "Web Designer & Dev",
      activities: [
        "UI/UX design optimized for conversion.",
        "Google Analytics integration.",
        "On-page SEO strategy.",
      ],
      results:
        "Increase in organic traffic and potential donor conversion rate.",
    },
    images: [
      "https://placehold.co/800x450/27a397/ddfaf8?text=Landing+UX",
      "https://placehold.co/800x450/27a397/141414?text=SEO+Optimization",
    ],
    link: "https://donarfeyalegriavzla.org",
  },
};

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  grid.innerHTML = "";
  Object.keys(projectData).forEach((key) => {
    const p = projectData[key][AppState.currentLang || "es"];
    grid.innerHTML += `
      <div class="project-card bg-brand-beige/50 border border-brand-lavender/20 rounded-[2.5rem] p-8 flex flex-col cursor-pointer" onclick="openModal('${key}')">
          <div class="flex justify-between items-start mb-6">
              <span class="bg-brand-pink text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">${p.category}</span>
          </div>
          <h4 class="text-2xl font-bold mb-4 text-brand-purple italic">${p.title}</h4>
          <p class="text-brand-gray text-sm mb-8 flex-grow line-clamp-3">${p.intro}</p>
          <button class="text-brand-teal font-black text-[10px] uppercase tracking-widest flex items-center">
              + Info <i class="fa-solid fa-arrow-right ml-2"></i>
          </button>
      </div>
    `;
  });
}

function toggleLanguage() {
  AppState.currentLang = AppState.currentLang === "es" ? "en" : "es";
  document.getElementById("langLabel").innerText =
    AppState.currentLang.toUpperCase();
  // Traducir estáticos
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.innerText = translations[AppState.currentLang][key];
  });

  // Re-renderizar proyectos
  renderProjects();
}

function openModal(id) {
  const project = projectData[id];
  const p = project[AppState.currentLang || "es"];

  // Galería
  const container = document.getElementById("galleryContainer");
  container.innerHTML = "";
  project.images.forEach((img) => {
    container.innerHTML += `<img src="${img}" class="w-full h-full object-cover shrink-0" alt="Vista del Proyecto">`;
  });

  currentSlide = 0;
  totalSlides = project.images.length;
  updateGallery();

  // Textos
  document.getElementById("modalTitle").innerText = p.title;
  document.getElementById("modalIntro").innerText = p.intro;
  document.getElementById("modalCategory").innerText = p.category;
  document.getElementById("modalRole").innerText = p.role;
  document.getElementById("modalResults").innerText = p.results;

  const list = document.getElementById("modalActivities");
  list.innerHTML = p.activities
    .map(
      (a) =>
        `<li class="flex items-center gap-3"><i class="fa-solid fa-check text-brand-teal text-[10px]"></i> ${a}</li>`,
    )
    .join("");

  const links = document.getElementById("modalLinks");
  links.innerHTML = `<a href="${project.link}" target="_blank" class="w-full text-center bg-brand-black text-white py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-brand-pink transition">${translations[AppState.currentLang]["visit-btn"]}</a>`;

  document.getElementById("projectModal").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function updateGallery() {
  const container = document.getElementById("galleryContainer");
  container.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateGallery();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateGallery();
}

function closeModal() {
  document.getElementById("projectModal").style.display = "none";
  document.body.style.overflow = "auto";
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const txt =
      translations[AppState.currentLang] &&
      translations[AppState.currentLang][key];
    if (txt) el.innerText = txt;
  });
}

// Init
window.onload = () => {
  UI.init();
  applyTranslations();
  renderProjects();
};
