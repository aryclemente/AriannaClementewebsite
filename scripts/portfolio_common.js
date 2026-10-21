const fs = require('fs');
const path = require('path');

// Image URL mappings to local assets
const imageMap = {
  // Logo
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB3MavmoJrYY5dN3bohs1X2WpPlfUYEL5bze6K72l8Ac6nMrVE7K73bCXDaZcFqbEYauRYPWrjeDMlhe4sjOVF1OYqT98aompavz8n3wQ12pO-aXXNx1LZ2aEScNaZXy33gRo_PO5VBRg54ASCd3DavmkjN3WdXw1H5ggMoLB-zFLWKNhHNgSwGQXjVenE046FWNBHEXmyK1dZoW78X1649rwzFI0KvvVkOGzum3p08-3z7IUWA0PCurB-fwHSsjthBYQ': 'assets/images/portfolio/logo_arycode.png',
  // Full-Stack
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBA0eMuSwM6mbnObiPr5LnMBuNKIEuFa_wCfoatyZi5dJCCcp9FLmnJQN9pR0hJML6HvfrWf_fKemwkMYMI_YMgfhKqFIyctEX_n1wOAhIHt3gnqv7h-KNMx5WmRbDp7I_o9HSKylQeZuLC6Gky2dca_9j1_Oy4UW-nfxIvU91nUnKCRmpEqYSJ2O9X89CiocydJpZTqpD1TzG8ubnZxhVeZUtVGexv12eqSVSUDVE1HIE4KX3oH9qn': 'assets/images/portfolio/fs_gonzaga_admin.png',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDTYcUkVuseWMgSkpHiobHWuwqhk5YQimB18HoMac_rvC3x2JgjBrOomd-cUlqAj4MWklH0zc0TTT7PiNPVUZJ4522qWOk1heM0tHHzgV8-Yhzg0lRrsW0gkLRvHJZmaxvd3mcAla3_lGsDAue3wqOxtgFDs3n-9wNiZgTH6hyygxPiCdtfusk09h_SYTXlv_t7ygBLK1BwoCg9dlaZ0YEC_3VH1USRimVh8wkQ8EjeJjtaErGkPMAs': 'assets/images/portfolio/fs_donaciones_feyalegria.png',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAX3J0SxvApvSSJPMmMwuZrQiNxq9XPBwi2q2Sln202wUJRvQ1x_mQjhGI3RyZ3uU5gmGV3yyvAmtU-7aqqWYuYktilpHGJR47gTzrbY_jSjf1BEfWMLtqUJejuVLCEEbW8ZQDNGuRKURIi4lJG89xlu26DkSx8V6NwxW1XlnjLCROZuog2ixE0YJsgR5KF8Yvr4ONIv9RR3pyOrBG5dnF9bExNxKaZTl2Cgv5airBaOKFSzw6sK-xc': 'assets/images/portfolio/fs_vacantes_iujo.png',
  // WordPress
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDd0AjmvFT774YbAA3t130yOwanjPgCP74NS1RkR8g8huEtVlFxoGZ2rQdrT7CGNA3zvNobJ87ggxolqpue6nZM6vQGnrTi99hNwyeet9ag6uznZ5aN1PXVFRhBAnQMPdHn5mzDkXt8pNlu9JBV1VXlSgBL2rXhRBQ0CurtCo-YRqyWP55b8czjMuuHGuY7HmI4aOObysJBvaWHjvBGLCv9qTRsEj2NlhvTa3IvB5XkJdWLU7HA6EkB': 'assets/images/portfolio/wp_colegio_gonzaga.png',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC73TCYhrz9F_ZYx2tbifJOJ7T2orFO8zj827HohI_YUS6owONqGKqJoyYLWV9lSe2IJ_DGNwSuiJhYj6qemfAOdg9dY36QN6P-TZuZVpdM9pOSyDCAWawjvuW2kkGEoExT1CjWDcS-PMiiLucDENcGk0q4kEuFNhV68A-RZMrq87ZDGFiTvAfF_nHvSUhXX2yYRcGB2ZPJ_UHPumob1QDDfEfX4YNXhIEY521oLQVwjrzYrs7awx4C': 'assets/images/portfolio/wp_cep.png',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBSFwjlBCVFbP67TUS7XTibdSNVjMGMTEZddGZekWdj1sGDVheWA1S_i8y5gYyNZ-mij9_22xwQxvrJAakTUBD4T18LHPab_Sior5961t6JzDi_15T8Uewz0X_1EDIFViywqcAqJ7iSOQlpef6VsvCd-rkuljHdsbwPqgngoRtI5zLp94M65AbMii0VC9mWq4L39U3vvfj3Lu3sakstAZSYeIb1Ka2swzPXibe3rNhwsncMiISZ-Ry5': 'assets/images/portfolio/wp_beca_estudiante.png',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuALzfdPbNhy9RCdaN_MFjJZ8iqrapQu3Aos1PdZQatIqNe-bJGQ7TOpA0YV8JOg5QzYOSUQEu9TWrrEyy7aQQElYmiqK2Q6USgN17Uy-pGMdiAxqSE9wmjHOkkwyBcQEa5XsAC6kr-nPw2VpTmXZt9Z-7gYGjpzGnQLwFv-OFUYWjg0G6_1SyVg0D-9cSvjff6er7Gt42ALfC5NOeE02qJiJ5EdRqStlTOSVVE9rh8TtSnBG7aqPxOS': 'assets/images/portfolio/wp_validacion_cide.png',
  // Marketing & Analytics
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCmJpKD34OXtT6kPMbMu_9ZiNEmUvlbDtcBiwCKZgI20v6oGrqVZyzhBFu5Xhumv8Xb2gYT-uOYLCacphbGSL-NSgOJZqtu9xUx9jmWeuBf5yslYxbFlGkk3V5iMAhQdoOPq5ldPITJyGTL9wnbf-l9wWe_BcxvRvz25WGDKsg18r5PdTgYhhqcfuHPJmFbf8e_8zOcs6CGIyXcJPSjzPPfJ-WlJNMiIHE6IT4yey14snrzg_q_I_6K': 'assets/images/portfolio/mkt_italcambio.png',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBlIxEYsuEefQA_Tn58xrs-LihsQ_cckWXh0KjJpws8tyg3-oZy6vAKfr6XOkQ6LtiJI7ujcXpy7AvJ9RnBVbeaMiOJL5jC5k1RWVcQet-qer-UVVtZu-eaBDCfP9YjXnbNXMEA1DLQnaXg6LNVWy4h5qfd4w3Y6QAf7NicWxzY33mGkQUqpTeKWVqPMevE3k9Biyi3ZJWB5mr9cl-N5crmcG_rVLdBIu18C3JE5HOWzc2UnHFgnTnd': 'assets/images/portfolio/mkt_meta_ads_cide.png',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDvuaAX1tYMXqsWa2gw90xJCKGobpn6kwI0GreocHE0nrNKN4yh9ZAji6JfbKv9vkvjLbd4dGrNjakcTiJ-mZ2BQWOfZ2yhDwUg9Ly3g2D71GZPTH7nIinJNskQPHOE7oUpKyVLoxEWDhgXqLAc6oTt1lmampdySxPrXwzxtlVoNKN_9v8jf9ba2oy_Lm-xb1jXMMGWg6sVgeyK5SCVWordDOb130DRoRdkVAD73JjzCPLuaIZMewqP': 'assets/images/portfolio/mkt_ga4_pipeline.png',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCMzxU8SARU0QZ1MlTGE1fTLVA4TdpXk5FChZNLgTsjFYEAmn57i2oR_0yCPHBpTT1ZEf_x3GWJ041BW1Cegoi0SNiUYAnZhMIjl6I5kxld1qgjHVdMGZ6jKZSqZjprcLJap4KlBGH_EFNsZXQNIV90_d_psmR8-N2camOIUzSScIkWwTrgimftSsO0as26Q3DTx9Ttcnx5L80j9MDWkkXwsMj6lwZ3CjW1hD6qNlCx0tQhRYP4HdyZ': 'assets/images/portfolio/mkt_lid_calendar.png',
  // Soporte
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBR6WUO6d0EXGqs_xF_h7Buuuu-e7HQPVl6bHAXS2epn5156A-nAvHN4nfgE-4RhWg0ctSBBHPXEr23s5GDXwlVC4SBWKYSyC_cQjXnbo0OBDsIxIuJGWOaxkTHmXBnjagyD_FH6y0WqePcdZO5J18B_nhdB3gFzgp4vuw4wBTbKs42jsp9R44QsMZH3ZAhSGu0csxqFiDoxSmB-C3K3vI011mIusmjgF-3mm3BtKbkPdKoBB53Y5OL': 'assets/images/portfolio/sop_revistas_ojs.png',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBKdgFc_pXI7RnmG1XRihKAFEPyTpP4rcy9vI0qM-KeMEve9u8xA41VqE6AqBHwWWeCVAjelGB5rtnvvVBHhFUiN5uknDb2_Xd0wjarBDYJxjI_eVIfxVJ3cL4IU0S38-wMhBwBFGz43vnSTLAEO17zcGGXAWpi7YSNp7QEBCzozO8OT3M9bzNRxxFTjm7SXP1rbpwdVaxUPe_I-8iQhwaT6_kgnilT5cJ5gErntOm3yBtA8qCj35y6': 'assets/images/portfolio/sop_dspace_rack.png',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAbS77NiHGw_l3k7Z6mymLviiL95FWoHmrqviAaW5w-0lx75KS8NFpbV8voVxjTfloKCBTNy9yfqN_ShJPgQ80P0AJO0uA4Y0kcMeAVVW_UlTh8Mu2L6Zb2bhVl-1-cagtplRJ2VGoIBIt7M3YditzbI55U5QJ0zmDqE39IK8r-6B7A2YCdxI0n76Q0TgqlVxH_d1mE628r2uaU9ZnxNzCqXr01CyfgFwqF8Lhm84SKl5IVXrckNjdX': 'assets/images/portfolio/sop_moodle_lms.png'
};

// 3D Heart SVG Component (matches Ary Code 💖 image perfectly)
const heartSvg = `
<svg class="w-6 h-6 inline-block shrink-0 transform group-hover:scale-110 transition-transform" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="heart3d_grad1" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FF5C93" />
      <stop offset="40%" stop-color="#FF1A75" />
      <stop offset="100%" stop-color="#D40055" />
    </radialGradient>
    <filter id="heartShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#FF1A75" flood-opacity="0.35"/>
    </filter>
  </defs>
  <path d="M16 28.5C15.4 28.5 14.8 28.2 14.4 27.8C8.2 21.6 3.5 17.2 2.3 13.5C0.8 8.8 3.8 3.5 9 3.5C12.1 3.5 14.5 5.2 16 7.2C17.5 5.2 19.9 3.5 23 3.5C28.2 3.5 31.2 8.8 29.7 13.5C28.5 17.2 23.8 21.6 17.6 27.8C17.2 28.2 16.6 28.5 16 28.5Z" fill="url(#heart3d_grad1)" filter="url(#heartShadow)"/>
  <ellipse cx="10" cy="8.5" rx="3.5" ry="2" fill="white" fill-opacity="0.3" transform="rotate(-25 10 8.5)"/>
</svg>
`;

// Common Header generator
function createHeader(activePage = 'portafolio', basePath = '') {
  const isPortfolio = ['portafolio', 'hub', 'fullstack', 'wordpress', 'marketing', 'soporte'].includes(activePage);
  const isInicio = activePage === 'inicio';

  return `
<!-- HEADER / NAVBAR -->
<style>
  #ctaHablemosBtn, #ctaHablemosBtn *, .cta-hablemos, .cta-hablemos * {
    color: #ffffff !important;
  }
  .bg-clean-white {
    background-color: #ffffff !important;
  }
  .text-clean-white {
    color: #ffffff !important;
  }
  #portafolioDropdownContainer:hover .dropdown-menu,
  #portafolioDropdownContainer:focus-within .dropdown-menu,
  #portafolioDropdownContainer.is-open .dropdown-menu {
    opacity: 1 !important;
    pointer-events: auto !important;
    transform: translateY(0) !important;
  }
</style>
<header class="fixed top-0 left-0 right-0 w-full z-50 bg-clean-white/95 backdrop-blur-md border-b border-border-slate/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
  <div class="h-20 max-w-[1280px] mx-auto px-5 lg:px-8 flex items-center justify-between gap-4">
    <!-- Brand ID: Ary Code 💖 -->
    <a class="flex items-center gap-2 text-decoration-none group py-1" href="${basePath}index.html#inicio">
      <span class="font-headline-sm font-extrabold text-2xl text-text-dark-primary tracking-tight flex items-center gap-2">
        <span>Ary Code</span>
        ${heartSvg}
      </span>
    </a>
    
    <!-- Navigation Links: Inicio & Portafolio Dropdown (hidden: servicios, proyectos, metodologia, blog) -->
    <nav class="hidden lg:flex items-center gap-2">
      <!-- Inicio (Exact "Inicio" shading style) -->
      <a class="px-3.5 py-2 font-headline-sm text-sm font-semibold ${isInicio ? 'text-primary-container bg-primary-container/10' : 'text-text-dark-secondary hover:text-primary-container hover:bg-primary-container/10'} rounded-xl transition-colors" href="${basePath}index.html#inicio">
        Inicio
      </a>
      
      <!-- Portafolio Dropdown (Exact "Inicio" shading style) -->
      <div class="relative group" id="portafolioDropdownContainer">
        <a href="${basePath}portafolio.html" class="px-3.5 py-2 font-headline-sm text-sm font-semibold ${isPortfolio ? 'text-primary-container bg-primary-container/10' : 'text-text-dark-secondary hover:text-primary-container hover:bg-primary-container/10'} rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer">
          <span>Portafolio</span>
          <span class="material-symbols-outlined text-base transition-transform duration-200 group-hover:rotate-180 text-primary-container">expand_more</span>
        </a>
        
        <!-- Dropdown Menu -->
        <div class="dropdown-menu absolute top-full left-0 pt-2 w-72 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
          <div class="bg-clean-white border border-border-slate/80 rounded-2xl shadow-xl p-2 flex flex-col gap-1">
            <div class="px-3 py-1.5 text-[11px] font-label-code font-bold uppercase tracking-wider text-text-dark-secondary border-b border-border-slate/50 mb-1 flex items-center justify-between">
              <span>Especialidades</span>
              <span class="text-[10px] bg-primary-container/10 text-primary-container px-2 py-0.5 rounded-full font-bold">4 Áreas</span>
            </div>
            
            <a href="${basePath}portafolio-wordpress.html" class="px-3 py-2 font-headline-sm text-sm font-semibold ${activePage === 'wordpress' ? 'bg-primary-container/10 text-primary-container' : 'text-text-dark-primary hover:bg-primary-container/10 hover:text-primary-container'} rounded-xl transition-colors flex items-center gap-2.5">
              <span class="material-symbols-outlined text-lg text-primary-container">web</span>
              <div class="flex flex-col">
                <span class="leading-tight">WordPress &amp; Sitios Web</span>
                <span class="text-[11px] font-normal text-text-dark-secondary">WPO, CMS escolar &amp; Plugins</span>
              </div>
            </a>
            
            <a href="${basePath}portafolio-fullstack.html" class="px-3 py-2 font-headline-sm text-sm font-semibold ${activePage === 'fullstack' ? 'bg-primary-container/10 text-primary-container' : 'text-text-dark-primary hover:bg-primary-container/10 hover:text-primary-container'} rounded-xl transition-colors flex items-center gap-2.5">
              <span class="material-symbols-outlined text-lg text-primary-container">terminal</span>
              <div class="flex flex-col">
                <span class="leading-tight">Desarrollo Full-Stack</span>
                <span class="text-[11px] font-normal text-text-dark-secondary">Laravel, C2P &amp; Microservicios</span>
              </div>
            </a>
            
            <a href="${basePath}portafolio-marketing.html" class="px-3 py-2 font-headline-sm text-sm font-semibold ${activePage === 'marketing' ? 'bg-primary-container/10 text-primary-container' : 'text-text-dark-primary hover:bg-primary-container/10 hover:text-primary-container'} rounded-xl transition-colors flex items-center gap-2.5">
              <span class="material-symbols-outlined text-lg text-primary-container">query_stats</span>
              <div class="flex flex-col">
                <span class="leading-tight">Marketing &amp; Analytics</span>
                <span class="text-[11px] font-normal text-text-dark-secondary">GA4, Meta Ads &amp; Growth</span>
              </div>
            </a>
            
            <a href="${basePath}portafolio-soporte.html" class="px-3 py-2 font-headline-sm text-sm font-semibold ${activePage === 'soporte' ? 'bg-primary-container/10 text-primary-container' : 'text-text-dark-primary hover:bg-primary-container/10 hover:text-primary-container'} rounded-xl transition-colors flex items-center gap-2.5">
              <span class="material-symbols-outlined text-lg text-primary-container">dns</span>
              <div class="flex flex-col">
                <span class="leading-tight">Soporte Técnico &amp; Académico</span>
                <span class="text-[11px] font-normal text-text-dark-secondary">Revistas OJS, DSpace &amp; Moodle</span>
              </div>
            </a>
            
            <div class="border-t border-border-slate/50 mt-1 pt-1">
              <a href="${basePath}portafolio.html" class="px-3 py-2 font-headline-sm text-xs font-bold ${activePage === 'hub' ? 'bg-primary-container/10 text-primary-container' : 'text-primary-container hover:bg-primary-container/10'} rounded-xl transition-colors flex items-center justify-between">
                <span>Ver Portafolio General (Hub)</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Right CTA & Mobile Toggle (with guaranteed pure white text) -->
    <div class="flex items-center gap-3">
      <a id="ctaHablemosBtn" class="inline-flex items-center justify-center bg-hot-pink-vibrant hover:bg-hot-pink-hover !text-white text-clean-white font-headline-sm text-sm md:text-base font-bold px-4 md:px-6 py-2 md:py-2.5 rounded-xl transition-all shadow-[0_8px_18px_-4px_rgba(255,46,147,0.4)] transform hover:-translate-y-0.5" href="${basePath}index.html#contacto" style="color: #ffffff !important;">
        <span style="color: #ffffff !important;" class="text-white font-bold">¡Hablemos!</span>
      </a>
      <button id="mobileMenuBtn" aria-label="Abrir menú" class="lg:hidden p-2.5 rounded-xl bg-surface-container-low border border-border-slate text-text-dark-primary hover:text-primary-container transition">
        <span class="material-symbols-outlined text-2xl" id="menuIcon">menu</span>
      </button>
    </div>
  </div>
</header>

<!-- Mobile Menu Drawer -->
<div id="mobileMenu" class="fixed inset-0 z-40 bg-dark-violet/80 backdrop-blur-md hidden transition-opacity duration-300">
  <div class="fixed top-20 left-0 right-0 bg-clean-white border-b border-border-slate p-6 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
    <nav class="flex flex-col gap-2">
      <a class="mobile-nav-link px-4 py-3 rounded-xl font-headline-sm text-base font-semibold ${isInicio ? 'bg-primary-container/10 text-primary-container' : 'text-text-dark-primary hover:bg-primary-container/10 hover:text-primary-container'} transition" href="${basePath}index.html#inicio">Inicio</a>
      
      <!-- Portafolio section with 4 specialties -->
      <div class="flex flex-col gap-1 bg-surface-container-low/60 p-2.5 rounded-2xl border border-border-slate/60">
        <div class="px-3 py-1 font-headline-sm text-xs font-bold uppercase tracking-wider text-text-dark-secondary flex items-center justify-between">
          <span>Portafolio</span>
          <span class="text-[10px] bg-primary-container/10 text-primary-container px-2 py-0.5 rounded-full font-label-code font-bold">4 Áreas</span>
        </div>
        <a class="mobile-nav-link px-3 py-2.5 rounded-xl font-headline-sm text-sm font-semibold ${activePage === 'hub' ? 'bg-primary-container/10 text-primary-container' : 'text-text-dark-primary hover:bg-primary-container/10 hover:text-primary-container'} transition flex items-center gap-2.5" href="${basePath}portafolio.html">
          <span class="material-symbols-outlined text-lg text-primary-container">dashboard</span>
          <span>Ver Portafolio General (Hub)</span>
        </a>
        <a class="mobile-nav-link px-3 py-2.5 rounded-xl font-headline-sm text-sm font-semibold ${activePage === 'wordpress' ? 'bg-primary-container/10 text-primary-container' : 'text-text-dark-primary hover:bg-primary-container/10 hover:text-primary-container'} transition flex items-center gap-2.5" href="${basePath}portafolio-wordpress.html">
          <span class="material-symbols-outlined text-lg text-primary-container">web</span>
          <span>WordPress &amp; Sitios Web</span>
        </a>
        <a class="mobile-nav-link px-3 py-2.5 rounded-xl font-headline-sm text-sm font-semibold ${activePage === 'fullstack' ? 'bg-primary-container/10 text-primary-container' : 'text-text-dark-primary hover:bg-primary-container/10 hover:text-primary-container'} transition flex items-center gap-2.5" href="${basePath}portafolio-fullstack.html">
          <span class="material-symbols-outlined text-lg text-primary-container">terminal</span>
          <span>Desarrollo Full-Stack</span>
        </a>
        <a class="mobile-nav-link px-3 py-2.5 rounded-xl font-headline-sm text-sm font-semibold ${activePage === 'marketing' ? 'bg-primary-container/10 text-primary-container' : 'text-text-dark-primary hover:bg-primary-container/10 hover:text-primary-container'} transition flex items-center gap-2.5" href="${basePath}portafolio-marketing.html">
          <span class="material-symbols-outlined text-lg text-primary-container">query_stats</span>
          <span>Marketing &amp; Analytics</span>
        </a>
        <a class="mobile-nav-link px-3 py-2.5 rounded-xl font-headline-sm text-sm font-semibold ${activePage === 'soporte' ? 'bg-primary-container/10 text-primary-container' : 'text-text-dark-primary hover:bg-primary-container/10 hover:text-primary-container'} transition flex items-center gap-2.5" href="${basePath}portafolio-soporte.html">
          <span class="material-symbols-outlined text-lg text-primary-container">dns</span>
          <span>Soporte Técnico &amp; Académico</span>
        </a>
      </div>

      <a class="mobile-nav-link px-4 py-3 rounded-xl font-headline-sm text-base font-semibold !text-white text-clean-white bg-primary-container hover:bg-primary text-center mt-2 shadow-md transition" href="${basePath}index.html#contacto" style="color: #ffffff !important;">¡Agendar Diagnóstico!</a>
    </nav>
  </div>
</div>
`;
}

// Common Footer generator
function createFooter(basePath = '') {
  return `
<!-- FOOTER -->
<footer class="w-full bg-surface-container-lowest border-t border-border-slate py-12">
  <div class="max-w-[1280px] mx-auto px-5 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8 border-b border-border-slate">
      <div class="md:col-span-5 flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <span class="font-headline-sm font-extrabold text-2xl text-text-dark-primary tracking-tight flex items-center gap-2">
            <span>Ary Code</span>
            ${heartSvg}
          </span>
        </div>
        <p class="font-body-sm text-sm text-text-dark-secondary max-w-sm leading-relaxed">
          Arquitectura de software de alto impacto, soluciones cloud escalables y desarrollo Full-Stack con rigor técnico y sub-segundo tiempo de respuesta.
        </p>
        <div class="flex items-center gap-2 pt-1">
          <span class="flex h-2 w-2 relative">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-turquoise opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-mint-turquoise"></span>
          </span>
          <span class="font-label-code text-xs text-text-dark-secondary font-medium">Sistemas Operacionales • 99.98% Disponibilidad</span>
        </div>
      </div>
      
      <div class="md:col-span-3 flex flex-col gap-2">
        <span class="font-label-code text-xs font-bold uppercase text-primary-container tracking-wider">Contacto Directo</span>
        <a class="font-body-sm text-sm text-text-dark-primary hover:text-hot-pink-vibrant transition-colors flex items-center gap-2 pt-1" href="mailto:hello.ary.code@gmail.com">
          <span class="material-symbols-outlined text-[16px] text-primary-container">mail</span>
          <span>hello.ary.code@gmail.com</span>
        </a>
        <a class="font-body-sm text-sm text-text-dark-primary hover:text-hot-pink-vibrant transition-colors flex items-center gap-2" href="https://wa.me/584241685298" target="_blank" rel="noopener">
          <span class="material-symbols-outlined text-[16px] text-mint-turquoise">chat</span>
          <span>+58 424 168 5298</span>
        </a>
        <span class="font-body-sm text-xs text-text-dark-secondary pt-1">Caracas, Venezuela • Remoto Global</span>
      </div>
      
      <div class="md:col-span-4 flex flex-col gap-2">
        <span class="font-label-code text-xs font-bold uppercase text-primary-container tracking-wider">Redes & Canales</span>
        <div class="flex flex-wrap items-center gap-2 pt-1">
          <a aria-label="GitHub" class="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-text-dark-primary hover:bg-primary-container hover:text-clean-white transition-all shadow-sm" href="https://github.com/aryclemente" target="_blank" rel="noopener">
            <span class="material-symbols-outlined text-[20px]">terminal</span>
          </a>
          <a aria-label="LinkedIn" class="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-text-dark-primary hover:bg-primary-container hover:text-clean-white transition-all shadow-sm" href="https://www.linkedin.com/in/arianna-clemente/" target="_blank" rel="noopener">
            <span class="material-symbols-outlined text-[20px]">hub</span>
          </a>
          <a aria-label="WhatsApp" class="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-text-dark-primary hover:bg-mint-turquoise hover:text-clean-white transition-all shadow-sm" href="https://wa.me/584241685298" target="_blank" rel="noopener">
            <span class="material-symbols-outlined text-[20px]">chat</span>
          </a>
          <a aria-label="Email" class="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-text-dark-primary hover:bg-hot-pink-vibrant hover:text-clean-white transition-all shadow-sm" href="mailto:hello.ary.code@gmail.com">
            <span class="material-symbols-outlined text-[20px]">alternate_email</span>
          </a>
        </div>
      </div>
    </div>
    
    <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-dark-secondary font-label-code">
      <p>© 2026 Ary Code // Arianna Clemente. Todos los derechos reservados.</p>
      <div class="flex items-center gap-4">
        <span class="text-text-dark-secondary">Stack: Solutions Architect Core</span>
        <span class="text-mint-turquoise font-semibold">● Production Ready</span>
      </div>
    </div>
  </div>
</footer>
`;
}

// Cross-portfolio navigation strip for specialized pages
function createCrossNav(currentArea, basePath = '') {
  const areas = [
    { id: 'fullstack', title: 'Full-Stack', desc: 'Laravel, APIs & Microservicios', href: `${basePath}portafolio-fullstack.html`, icon: 'terminal', count: '3 Proyectos' },
    { id: 'wordpress', title: 'WordPress & Web', desc: 'Portales Institucionales WPO', href: `${basePath}portafolio-wordpress.html`, icon: 'web', count: '4 Proyectos' },
    { id: 'marketing', title: 'Marketing & Analytics', desc: 'GA4, Meta Ads & Fintech Growth', href: `${basePath}portafolio-marketing.html`, icon: 'query_stats', count: '4 Proyectos' },
    { id: 'soporte', title: 'Sistemas Académicos', desc: 'Revistas OJS, DSpace & LMS', href: `${basePath}portafolio-soporte.html`, icon: 'dns', count: '3 Proyectos' }
  ];

  const filtered = areas.filter(a => a.id !== currentArea);

  return `
<!-- Cross Portfolio Navigation Strip -->
<section class="w-full py-16 bg-surface-container-low/70 border-t border-border-slate">
  <div class="max-w-[1280px] mx-auto px-5 lg:px-8 flex flex-col gap-8">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <span class="font-label-code text-xs font-bold uppercase text-primary-container tracking-wider flex items-center gap-1.5 mb-1">
          <span class="material-symbols-outlined text-[16px]">explore</span> Explorar Más Especialidades
        </span>
        <h3 class="font-headline-lg text-2xl font-extrabold text-text-dark-primary">
          Otras Áreas del Portafolio Profesional
        </h3>
      </div>
      <a href="${basePath}portafolio.html" class="inline-flex items-center gap-2 font-headline-sm text-sm font-bold text-primary-container hover:text-hot-pink-vibrant transition-colors">
        <span>Ver Todas las 4 Áreas</span>
        <span class="material-symbols-outlined text-base">arrow_forward</span>
      </a>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${filtered.map(a => `
        <a href="${a.href}" class="group p-6 rounded-2xl bg-clean-white border border-border-slate hover:border-primary-container/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <div class="w-10 h-10 rounded-xl bg-primary-container/10 text-primary-container group-hover:bg-primary-container group-hover:text-clean-white transition-colors flex items-center justify-center">
                <span class="material-symbols-outlined text-xl">${a.icon}</span>
              </div>
              <span class="text-xs font-label-code font-bold px-2.5 py-1 rounded-full bg-surface-container text-text-dark-secondary">
                ${a.count}
              </span>
            </div>
            <h4 class="font-headline-sm text-lg font-bold text-text-dark-primary group-hover:text-primary-container transition-colors">
              ${a.title}
            </h4>
            <p class="font-body-sm text-xs text-text-dark-secondary">
              ${a.desc}
            </p>
          </div>
          <div class="pt-4 mt-4 border-t border-border-slate/50 flex items-center justify-between text-xs font-bold text-primary-container group-hover:text-hot-pink-vibrant transition-colors">
            <span>Ver Casos de Estudio</span>
            <span class="material-symbols-outlined text-base transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </a>
      `).join('')}
    </div>
  </div>
</section>
`;
}

// Mobile menu script
const mobileMenuScript = `
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
        if (menuIcon) menuIcon.textContent = 'close';
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.add('hidden');
        if (menuIcon) menuIcon.textContent = 'menu';
        document.body.style.overflow = 'auto';
      }
    });

    // Close when clicking mobile nav links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (menuIcon) menuIcon.textContent = 'menu';
        document.body.style.overflow = 'auto';
      });
    });
  }

  // Desktop Dropdown Controller
  const dropdownContainer = document.getElementById('portafolioDropdownContainer');
  if (dropdownContainer) {
    const dropdownMenu = dropdownContainer.querySelector('.dropdown-menu');
    if (dropdownMenu) {
      let closeTimer = null;
      const openMenu = () => {
        clearTimeout(closeTimer);
        dropdownMenu.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-1');
        dropdownMenu.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      };
      const closeMenu = () => {
        closeTimer = setTimeout(() => {
          dropdownMenu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-1');
          dropdownMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
        }, 150);
      };

      dropdownContainer.addEventListener('mouseenter', openMenu);
      dropdownContainer.addEventListener('mouseleave', closeMenu);

      const arrow = dropdownContainer.querySelector('.material-symbols-outlined');
      if (arrow) {
        arrow.style.cursor = 'pointer';
        arrow.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const isOpen = dropdownMenu.classList.contains('opacity-100');
          if (isOpen) {
            dropdownMenu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-1');
            dropdownMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
          } else {
            openMenu();
          }
        });
      }

      document.addEventListener('click', (e) => {
        if (!dropdownContainer.contains(e.target)) {
          dropdownMenu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-1');
          dropdownMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
        }
      });
    }
  }
</script>
`;

module.exports = {
  imageMap,
  heartSvg,
  createHeader,
  createFooter,
  createCrossNav,
  mobileMenuScript
};
