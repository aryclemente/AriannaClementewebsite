# Bases del Sitio Web - Arianna Clemente (AryCode)

Este documento sienta las bases estratégicas, el contenido clave y la estructura de información para el sitio web personal y portafolio profesional de **Arianna Clemente**.

---

## 1. Perfil Profesional y Propósito del Sitio

* **Nombre:** Arianna Clemente
* **Marca Personal:** AryCode
* **Título Profesional:** Full Stack Developer & Solution Architect / Técnico Medio en Informática
* **Experiencia:** +3 años desarrollando ecosistemas digitales, arquitecturas de datos y soluciones de software para ONGs, instituciones educativas y proyectos tecnológicos.
* **Propósito del Sitio Web:**
  * Mostrar el portafolio de proyectos de alto impacto con métricas y arquitectura de datos.
  * Presentar la trayectoria profesional, habilidades técnicas y experiencia.
  * Ofrecer una herramienta dinámica e inteligente (Configurador con IA) para adaptar la propuesta de valor según las vacantes.
  * Facilitar la conversión de contactos profesionales y reclutadores.

---

## 2. Secciones y Estructura del Sitio Web

### 2.1. Navegación y Encabezado (Header)
* **Logotipo / Insignia:** AC | AryCode
* **Menú Principal:**
  * **Portafolio:** Enlace directo a los proyectos principales.
  * **Adaptar con IA:** Herramienta interactiva para personalizar la experiencia del reclutador.
  * **Selector de Idioma:** Español / Inglés.

---

### 2.2. Hero Section (Portada Principal)
* **Etiqueta:** `Full Stack Developer & Solution Architect` (disponible para proyectos / empleo).
* **Titular Principal:** *Diseñando Soluciones Escalables.*
* **Subtítulo / Resumen:**
  > Técnico Medio en Informática con más de 3 años de experiencia desarrollando ecosistemas digitales para ONGs e instituciones educativas.
* **Llamado a la Acción (CTA):** "Explorar Proyectos".
* **Elemento Visual:** Consola/Ventana de Código con animación tipográfica e interactividad.

---

### 2.3. Experiencia Profesional y Proyectos Destacados

Cada proyecto en el sitio web debe presentar la siguiente información detallada:

#### Plantilla para Estructurar un Proyecto:
1. **Categoría / Tipo de Proyecto:** (Ej: *Ecosistema Digital / Plataforma Educativa / Gestión de ONGs*)
2. **Título del Proyecto:** Nombre descriptivo.
3. **Introducción / Desafío:** Problema o necesidad a resolver.
4. **Mi Rol:** Responsabilidad y funciones desempeñadas (Ej: *Lead Developer, Backend Architect*).
5. **Actividades e Implementaciones Clave:**
   * Desarrollo de arquitectura y bases de datos.
   * Integración de módulos y APIs.
   * Optimización y soporte continuo.
6. **Resultados e Impacto:** Métricas concretas (Ej: *+500 usuarios activos, 40% aumento en eficiencia*).
7. **Stack Tecnológico:** Lenguajes, frameworks y herramientas empleadas.
8. **Recursos / Galería:** Capturas de pantalla, enlaces a código o sitio en vivo.

---

### 2.4. Ecosistema Técnico (Skills & Stack)

Lista principal de tecnologías y herramientas dominadas:
* **Backend:** Laravel, PHP, Node.js, SQL (MySQL / PostgreSQL).
* **Frontend:** JavaScript (ES6+), HTML5, CSS3, TailwindCSS.
* **CMS & Herramientas:** WordPress, Git, GitHub.
* **Metodologías & Arquitectura:** Diseño de bases de datos, API REST, arquitectura escalable.

---

### 2.5. Personalización Inteligente (Configurador IA)

* **Objetivo:** Permitir que un reclutador o cliente suba una captura de pantalla de una oferta de empleo o vacante.
* **Procesamiento (Gemini IA):** Extrae empresa, rol, habilidades clave y palabras clave.
* **Resultado:** Reorganiza y destaca la experiencia y tecnologías del portafolio que mejor se adapten a la vacante analizada.

---

### 2.6. Pie de Página y Contacto (Footer)

* **Titular:** *Construyamos algo grande.*
* **Correo Electrónico:** `hello.ary.code@gmail.com`
* **Teléfono / WhatsApp:** `+58 424 168 5298`
* **Redes / Enlaces Profesionales:** GitHub, LinkedIn, CV en PDF.

---

## 3. Tono de Comunicación e Identidad Visual

* **Tono de Voz:** Profesional, moderno, directo, innovador y enfocado en soluciones e impacto.
* **Colores de Marca (Paleta):**
  * Fondo Principal / Oscuro: `brand-black` (#0A0A0B)
  * Acentos: `brand-pink` (#FF2D55 / #E63946), `brand-teal` (#00F2FE), `brand-lavender`.
* **Tipografía:** Tipografías sans-serif modernas con estilo técnico/mono para bloques de código.

---

## 4. Checklist de Contenido Pendiente por Definir / Completar

- [ ] Redactar las fichas completas de los 3-4 proyectos clave.
- [ ] Adjuntar imágenes/capturas de pantalla para la galería de cada proyecto.
- [ ] Definir si se agregará enlace de descarga del CV (Curriculum Vitae).
- [ ] Configurar / verificar credenciales del servicio de IA (Gemini API Key).
- [ ] Traducir/revisar los contenidos para el modo bilingüe (Español / Inglés).

---

## 5. Cambios del sitio web

Muy bien, ahora vamos con la pagina de inicio, en la seccion de banner hero, apliquemos los siguientes cambios:

1. El color solido de fondo, apliquemos un degradado entre morado y rosado. 
2. Elimina estas metricas 
99.9% Uptime garantizado
+45% Eficiencia operativa
Sub-second latency
3. Cambia por la nueva imagen arianna_hero que subi en la carpeta assets/images
4. El texto que se mueve Sitio we, automatizaciones, sistemas a tu medida, tiene el tamaño incorrecto, y se ve parte de las letras superiores e inferiores, corrige esto. 
5. Cambia el boton Ver Proyectos por Ver portafolio.
6. Cambia el subtitulo Solutions Architect & Tech Lead por I code ideas to solve problems in software.

Ahora ve a la seccion de porque trabajar conmigo, y vamos a hacer lo mismo, aplicar los cambios de estilos y contenido, para que se vea como en la imagen, la nueva imagen es arianna_why_me.png que esta en la carpeta assets/images. 


Excelente! Ahora vamos a la seccion de empresas que han trabajado conmigo,tenemos logos, estan en la carpeta assets/images/marcas/ los nombres son: .
1. CEP
2. logogonzaga
3. ven_color_h
4. Logo Beca a un estudiante
5. cide eventos
6. ciicep
7. Editorial crisalidas
8. ingedaca

como son mas de 4 vamos agregar tipo carrusel, que ellas se deszlicen a medida cada 2 segundos y se repita el carrusel.


Vamos a rediseñar el portafolio de Wordpress, el primero proyecto el del gonzaga. 

1. Vamos a cambiar el titulo de este banner ⚡ ESPECIALIDAD EN SISTEMAS CMS & WPO

2. Estas metricas me parecen muy tecnicas para clientes y reclutadores. Benchmark Global
speed
99.8% Latencia Baja
95+
CWV Score
< 1.2s
FCP Medio
0 Bloat
No Heavy Builders
Vamos a cambiarlas. 




3. Este texto tambien me gustaria cambiarlo
Soluciones web de alto impacto, arquitecturas optimizadas para velocidad (WPO) y desarrollo de plugins/temas a medida para ONGs e instituciones educativas.
Quiero hablar del problema y la solucion, un antes y un despues. 

4. Vamos a integrar el video del cep a la seccion del caso de estudio del CEP. Tambien la imagen cep3.jpg

5. Enfoquemos la redaccion de cada caso de estudio enfocado en una que pueda entender el cliente y el reclutador. Quiero que se destaque el problema, la solucion, y el impacto que tuvo en la organizacion. En vez de tantos terminos tecnicos.

6. Disponibilidad Q2/Q3 para Nuevos Proyectos
Si se refiere a los cutrimestres o trimestres. Ya es octubre, no tiene sentido. Y lo mas importante, no tiene sentido poner disponibilidad de fechas. Si es dificil modificarlo. 

7. Respuesta promedio: < 4 horas hábiles
No incluyamos esto ahora, pero me parece bien agendar para futuras mejoras, conectar con el whatsapp bussiness, y automatizar.

8. Ajustar los textos de las secciones CIDE, Beca a un estudiant y contacto para coincidir con el cliente y con menos palabras tecnicas. Vamos a enfocarnos en el Impacto.

## 6. Cambios del portafolio de Wordpress

1. Eliminar las 4 cards de Autogestión Total (100%),...
2. Cambiar la descripcion de "De una estructura inicial " a el resultado directo que obtuvimos. 





