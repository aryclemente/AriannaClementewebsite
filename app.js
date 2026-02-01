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

/**
 * Internacionalización (I18n) - Placeholder para futura expansión
 */
const I18n = {
  toggleLanguage() {
    AppState.currentLang = AppState.currentLang === "es" ? "en" : "es";
    document.getElementById("langLabel").innerText =
      AppState.currentLang.toUpperCase();
    // Lógica de traducción de strings aquí
  },
};

// Inicialización al cargar la ventana
window.onload = () => UI.init();
