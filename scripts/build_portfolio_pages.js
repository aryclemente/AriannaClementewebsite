const fs = require('fs');
const path = require('path');
const { imageMap, createHeader, createFooter, createCrossNav, mobileMenuScript } = require('./portfolio_common');

const brainDir = 'C:/Users/user/.gemini/antigravity-ide/brain/f63c9ae6-d8c0-4831-a3ef-944425667605/.system_generated/steps';

const sources = {
  hub: path.join(brainDir, '34', 'output.txt'),
  fullstack: path.join(brainDir, '38', 'output.txt'),
  wordpress: path.join(brainDir, '40', 'output.txt'),
  marketing: path.join(brainDir, '42', 'output.txt'),
  soporte: path.join(brainDir, '44', 'output.txt')
};

const metaTags = {
  hub: {
    title: 'Portafolio Profesional de Ingeniería & Especialidades // Arianna Clemente',
    desc: 'Explora más de 5 años de trayectoria estructurados en 4 áreas de especialización técnica: WordPress, Desarrollo Full-Stack con Laravel, Marketing Digital & Analytics, e Infraestructura Académica OJS/DSpace.'
  },
  fullstack: {
    title: 'Portafolio Desarrollo Full-Stack & Microservicios // Arianna Clemente',
    desc: 'Arquitectura de software de alto impacto, pasarelas transaccionales bancarias (C2P Mercantil, Pago Móvil), APIs RESTful y sistemas escalables en Laravel, PostgreSQL y Docker.'
  },
  wordpress: {
    title: 'Portafolio WordPress & Sitios Web de Alta Velocidad // Arianna Clemente',
    desc: 'Rediseños estratégicos, optimización WPO extrema (Core Web Vitals 95+), mapas interactivos SVG y plugins personalizados para instituciones educativas y ONGs.'
  },
  marketing: {
    title: 'Portafolio Marketing Digital, Analítica & Growth // Arianna Clemente',
    desc: 'Auditoría e implementación de Google Analytics 4 (GA4), dashboards en Looker Studio, embudos con Meta Ads y gestión de comunidades fintech de alta fidelidad.'
  },
  soporte: {
    title: 'Portafolio Soporte Técnico & Sistemas Académicos // Arianna Clemente',
    desc: 'Despliegue, migración y mantenimiento de servidores cloud para Open Journal Systems (OJS), repositorios digitales DSpace 7.x y aulas virtuales Moodle LMS.'
  }
};

function processHtml(rawJsonFile, pageKey) {
  const data = JSON.parse(fs.readFileSync(rawJsonFile, 'utf8'));
  let html = data.html;

  // 1. Replace Images with local fallback
  for (const [url, local] of Object.entries(imageMap)) {
    // If the image is already wrapped or just url
    html = html.split(url).join(`${local}" onerror="this.onerror=null;this.src='${url}'`);
  }

  // 2. Replace Header and Footer
  html = html.replace(/<header[\s\S]*?<\/header>/i, createHeader(pageKey));
  html = html.replace(/<footer[\s\S]*?<\/footer>/i, createFooter());

  // 3. Inject SEO tags & Favicon in head
  const meta = metaTags[pageKey];
  const seoBlock = `
  <title>${meta.title}</title>
  <meta name="description" content="${meta.desc}">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.desc}">
  <meta property="og:type" content="website">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='25' fill='%234d17d6'/><text x='50' y='65' font-size='48' font-weight='900' font-family='sans-serif' fill='%23FF2E93' text-anchor='middle'>♥</text></svg>">
  `;

  // Remove existing title if any
  html = html.replace(/<title>[\s\S]*?<\/title>/i, '');
  html = html.replace('<meta content="web_standard" name="shell-type">', `<meta content="web_standard" name="shell-type">\n${seoBlock}`);

  // Ensure clean-white is defined in tailwind.config
  html = html.replace('"colors": {', '"colors": { "clean-white": "#FFFFFF", ');

  // 4. Update WhatsApp & Email links
  html = html.split('hello@aryclement.dev').join('hello.ary.code@gmail.com');
  html = html.split('wa.me/584120000000').join('wa.me/584241685298');
  html = html.split('https://wa.me/').join('https://wa.me/584241685298');
  
  // Replace generic contact hash links
  html = html.replace(/href=["']#["']\s+data-path=["']contacto["']/gi, 'href="index.html#contacto"');
  html = html.replace(/data-path=["']contacto["']\s+href=["']#["']/gi, 'href="index.html#contacto"');
  html = html.replace(/href=["']#["']\s+data-path=["']inicio["']/gi, 'href="index.html#inicio"');
  html = html.replace(/data-path=["']inicio["']\s+href=["']#["']/gi, 'href="index.html#inicio"');
  html = html.replace(/href=["']#["']\s+data-path=["']servicios["']/gi, 'href="index.html#servicios"');
  html = html.replace(/data-path=["']servicios["']\s+href=["']#["']/gi, 'href="index.html#servicios"');
  html = html.replace(/href=["']#["']\s+data-path=["']proyectos["']/gi, 'href="index.html#proyectos"');
  html = html.replace(/data-path=["']proyectos["']\s+href=["']#["']/gi, 'href="index.html#proyectos"');
  html = html.replace(/href=["']#["']\s+data-path=["']metodologia["']/gi, 'href="index.html#metodologia"');
  html = html.replace(/data-path=["']metodologia["']\s+href=["']#["']/gi, 'href="index.html#metodologia"');
  html = html.replace(/href=["']#["']\s+data-path=["']blog["']/gi, 'href="index.html#blog"');
  html = html.replace(/data-path=["']blog["']\s+href=["']#["']/gi, 'href="index.html#blog"');

  // 5. Page-specific enhancements
  if (pageKey === 'hub') {
    // Inter-card links in Hub Bento
    html = html.replace(
      /(<a[^>]*href=["']#["'][^>]*>[\s\S]*?Ver Portafolio WordPress[\s\S]*?<\/a>)/i,
      (match) => match.replace(/href=["']#["']/, 'href="portafolio-wordpress.html"')
    );
    html = html.replace(
      /(<a[^>]*href=["']#["'][^>]*>[\s\S]*?Ver Portafolio Full-Stack[\s\S]*?<\/a>)/i,
      (match) => match.replace(/href=["']#["']/, 'href="portafolio-fullstack.html"')
    );
    html = html.replace(
      /(<a[^>]*href=["']#["'][^>]*>[\s\S]*?Ver Portafolio Marketing[\s\S]*?<\/a>)/i,
      (match) => match.replace(/href=["']#["']/, 'href="portafolio-marketing.html"')
    );
    html = html.replace(
      /(<a[^>]*href=["']#["'][^>]*>[\s\S]*?Ver Portafolio Soporte[\s\S]*?<\/a>)/i,
      (match) => match.replace(/href=["']#["']/, 'href="portafolio-soporte.html"')
    );
  } else {
    // Specialized portfolio pages:
    // Replace breadcrumb links back to Hub
    html = html.replace(/href=["']#["']\s+data-path=["']portafolio["']/gi, 'href="portafolio.html"');
    html = html.replace(/data-path=["']portafolio["']\s+href=["']#["']/gi, 'href="portafolio.html"');
    
    // Replace remaining CTA buttons
    html = html.replace(
      /(<a[^>]*href=["']#["'][^>]*>[\s\S]*?Solicitar Presupuesto Formal[\s\S]*?<\/a>)/i,
      (match) => match.replace(/href=["']#["']/, 'href="index.html#contacto"')
    );
    html = html.replace(
      /(<a[^>]*href=["']#["'][^>]*>[\s\S]*?Solicitar Auditoría de Marketing[\s\S]*?<\/a>)/i,
      (match) => match.replace(/href=["']#["']/, 'href="index.html#contacto"')
    );
    html = html.replace(
      /(<a[^>]*href=["']#["'][^>]*>[\s\S]*?Solicitar Auditoría de Servidor[\s\S]*?<\/a>)/i,
      (match) => match.replace(/href=["']#["']/, 'href="index.html#contacto"')
    );
    html = html.replace(
      /(<a[^>]*href=["']#["'][^>]*>[\s\S]*?Agendar Asesoría Técnica Directa[\s\S]*?<\/a>)/i,
      (match) => match.replace(/href=["']#["']/, 'href="https://wa.me/584241685298?text=Hola%20Arianna,%20me%20gustar%C3%ADa%20agendar%20una%20asesor%C3%ADa%20t%C3%A9cnica%20sobre%20servidores%20y%20sistemas%20acad%C3%A9micos"')
    );

    // Add Cross-Portfolio Navigation before footer
    const crossNav = createCrossNav(pageKey);
    html = html.replace('<!-- FOOTER -->', `${crossNav}\n<!-- FOOTER -->`);
  }

  // 6. Append mobile navigation script
  html = html.replace('</body>', `${mobileMenuScript}\n</body>`);

  return html;
}

const outputs = [
  { key: 'hub', filename: 'portafolio.html', subfolderFile: 'portafolio/index.html' },
  { key: 'fullstack', filename: 'portafolio-fullstack.html', subfolderFile: 'portafolio/fullstack.html' },
  { key: 'wordpress', filename: 'portafolio-wordpress.html', subfolderFile: 'portafolio/wordpress.html' },
  { key: 'marketing', filename: 'portafolio-marketing.html', subfolderFile: 'portafolio/marketing.html' },
  { key: 'soporte', filename: 'portafolio-soporte.html', subfolderFile: 'portafolio/soporte.html' }
];

const subDir = path.join(__dirname, '..', 'portafolio');
if (!fs.existsSync(subDir)) {
  fs.mkdirSync(subDir, { recursive: true });
}

console.log('Building portfolio pages...');
for (const item of outputs) {
  const resultHtml = processHtml(sources[item.key], item.key);
  
  // 1. Root-level file
  const targetPath = path.join(__dirname, '..', item.filename);
  fs.writeFileSync(targetPath, resultHtml, 'utf8');
  console.log(`✓ Generated ${item.filename} (${(resultHtml.length / 1024).toFixed(1)} KB)`);

  // 2. Subfolder-level file (with adjusted relative paths)
  let subHtml = resultHtml
    .split('assets/images/').join('../assets/images/')
    .split('href="index.html').join('href="../index.html')
    .split('href="portafolio.html').join('href="index.html')
    .split('href="portafolio-fullstack.html').join('href="fullstack.html')
    .split('href="portafolio-wordpress.html').join('href="wordpress.html')
    .split('href="portafolio-marketing.html').join('href="marketing.html')
    .split('href="portafolio-soporte.html').join('href="soporte.html');

  const subPath = path.join(__dirname, '..', item.subfolderFile);
  fs.writeFileSync(subPath, subHtml, 'utf8');
  console.log(`✓ Generated ${item.subfolderFile} (${(subHtml.length / 1024).toFixed(1)} KB)`);
}
console.log('All portfolio pages generated successfully in both root and /portafolio/ directory!');

