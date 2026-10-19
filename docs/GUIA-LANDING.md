# Guía: landing con scroll world a partir de fotos generadas con IA

Cómo se hizo la landing de **Café Julia** (demo de café de especialidad), para poder repetir el proceso con otros negocios. Incluye el prompt original en el que nos basamos, el prompt adaptado que usamos, el proceso paso a paso, los recursos y lo aprendido.

---

## 1. Recursos

| Recurso | Para qué lo usamos | Enlace |
|---|---|---|
| Higgsfield MCP | Generar fotos y vídeo con IA | https://midu.link/higgsfield |
| Proyecto de referencia de midudev | Ejemplo original del flujo (Arko) | ⚠️ PENDIENTE: el enlace llegó cortado (`https://github.com/midudev/mcp-higgsf...`) |
| Skills de Higgsfield (`higgsfield-*`) | Generación de imágenes/vídeo desde el CLI | https://github.com/higgsfield-ai/skills |
| Higgsfield CLI (`@higgsfield/cli`) | Instalado local como devDependency; se ejecuta con `pnpm exec higgsfield …` | https://www.npmjs.com/package/@higgsfield/cli |
| Skill `landing-page-design` (Elaya) | Estrategia, copy y sistema visual de la landing | https://github.com/elayadesign/ai-design-skills (ruta `skills/landing-page-design`) |
| Skill `scroll-world` | Referencia del patrón "scroll world" (vídeo que avanza con el scroll) | https://github.com/oso95/scroll-world |
| Astro | Framework (sitio estático) | https://docs.astro.build |
| Tailwind CSS 4 | Estilos | https://tailwindcss.com/docs |
| GSAP + ScrollTrigger | Scrub del vídeo y animaciones ligadas al scroll | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ |
| Lenis | Scroll suave | https://github.com/darkroomengineering/lenis |
| Phosphor Icons | Iconos (`@phosphor-icons/core`, SVG en línea) | https://phosphoricons.com |
| Young Serif / Manrope | Tipografías (Google Fonts, servidas en local, recortadas a latín) | https://fonts.google.com/specimen/Young+Serif · https://fonts.google.com/specimen/Manrope |
| ffmpeg | Recortar fotos a 16:9, unir clips, exportar mp4/webm/scrub y poster | https://ffmpeg.org |

Instalación de las skills en el proyecto (siempre a nivel proyecto, no global):

- Skills: `.claude/skills/` + `skills-lock.json` (instaladas con `npx skills add <repo>`).
- Plugin `scroll-world`: declarado en `.claude/settings.json` (`extraKnownMarketplaces` + `enabledPlugins`).

---

## 2. Proceso

1. **Fotos del local con Higgsfield** (Soul 2.0, 3:4, 900×1200 WebP): 9 fotos con una estética coherente (café terracota/crema, terciopelo óxido, bouclé, mármol, terrazo, luz ámbar). Resultado en `src/assets/photos/cafe_1..9.webp`.
2. **Vídeo de recorrido** con Higgsfield: 4 clips `kling3_0` std de 5 s, con frame inicial y final, pasando por las fotos 1 → 3 → 5 → 6 → 8 recortadas a 16:9 con ffmpeg. Unidos en un vídeo de 20 s, 1280×720, 24 fps, sin audio. Exportados en `public/video/`:
   - `cafe-walk.mp4` / `cafe-walk.webm`: bucle del hero.
   - `cafe-walk-scrub.mp4`: todos los cuadros clave (`-g 1`) para que el scrub con scroll vaya fluido.
   - `cafe-walk-poster.webp`: primer cuadro.
3. **Adaptar el prompt de referencia** (sección 4) al proyecto y revisarlo antes de usarlo.
4. **Plan antes del código**: la skill `landing-page-design` devuelve primero su *Output format* (orden de secciones, copy del hero, beneficios, cómo funciona, FAQ, SEO, tipo de layout) más qué foto va en cada sección. Se aprueba y recién entonces se escribe código.
5. **Construcción** sección por sección en Astro.
6. **Revisión en navegador** (Playwright) en escritorio (1440×900) y móvil (390×844), con movimiento reducido activado, consola sin errores, contraste AA medido y `pnpm astro check`.

---

## 3. Prompt original (referencia: Arko)

Prompt del ejemplo en el que nos basamos, sin cambios:

```text
Usa el skill landing-page-design. Vamos a crear la landing de Arko, un restaurante real de cocina nikkei en Barcelona. Como es un negocio real, usa solo los datos de este mensaje, de su web (arkorestaurant.com; compruébalos antes) y de las fotos: no inventes reseñas, premios, platos, precios ni cifras. Si falta algo, márcalo como pendiente.

Intake:
- Acción principal: reservar mesa en https://arkorestaurant.myrestoo.net/en/reservar
- Acción secundaria, solo más abajo: regalar una experiencia en https://www.arkorestaurant.com/es/regala/
- Oferta: Arko Short Experience, menú para 2 personas (sushi, starters, principal y postre), 150 €. Arko Full Experience, menú degustación completo para 2 personas, 11 pases, 250 €. Maridaje, selección de vinos armonizados, +100 €.
- Titular de su web: "Cocina japonesa con alma mediterránea".
- Texto de su web: "Un restaurante donde la disciplina japonesa dialoga con el producto mediterráneo y la herencia peruana. Sin concesiones: técnica nipona, ingredientes del mar y del mercado, sabor de Barcelona."
- Platos destacados: carpaccio de ventresca Bluefin trufado, kizami, wasabi y crema de aguacate; ostra con salsa ponzu de fruta de la pasión; nigiri Selección; picanha de Wagyu a la brasa, yuca frita y salsa tarí; gelato de lúcuma, sablé, nueces pecanas y caramelo salado.
- Prueba: arroz Koshihikari con vinagre de arroz rojo de una casa japonesa fundada en 1937; salmón y atún 100 % libres de anisakis, sin antibióticos ni hormonas; toda la soja que se sirve en sala es sin gluten.
- Datos: Carrer Enric Granados 63, 08008 Barcelona. Abierto de lunes a domingo de 13:00 a 00:00. +34 938 29 95 72. Instagram @arko.barcelona.
- Legal: enlaza sus páginas /es/legal/, /es/privacidad/, /es/cookies/ y /es/terminos-compra/ de arkorestaurant.com.
- Logo: https://www.arkorestaurant.com/logo.svg. Es un PNG dentro de un SVG: vectorízalo con potrace para que quede nítido y se pueda pintar con currentColor. Su A en arco será el favicon.
- Público (asumido): gente de Barcelona y visitantes que buscan una cena especial en el Eixample.
- Objeciones (asumidas): el precio, no saber qué es la cocina nikkei y las dudas con el pescado crudo o el gluten.
- Tráfico: Instagram y Google Maps.
- Tono: cálido, sereno y premium.
- Fotos, en public/photos/: 0-entrada.jpg a 5-barra-lateral.jpg son el recorrido; 6-vinos.jpg es el pasillo de vinos; photo-01.jpg a photo-27.jpg son platos, producto y cócteles. Usa solo los nombres de plato de la lista de destacados; las fotos de platos que no estén en ella, márcalas como pendientes de nombre.
- Diseño: tema oscuro minimal editorial sacado de las fotos. Fondo #131209, texto crema #f3eadb y naranja teja #d0703a solo como acento (el botón, teja con el texto oscuro). Óvalos y arcos como máscaras de imagen, espejos de borde orgánico como marcos y las espirales de arena de la barra como motivo.
- Tipografía: Hina Mincho para los titulares y Zen Kaku Gothic New para el texto, de Google Fonts, servidas en local y recortadas a latín. Queremos algo nipón pero elegante; es una excepción a tu lista de fuentes que pido yo expresamente. Sin cursivas ni negritas sintéticas.
- Prioridad móvil: sí.
- Layout: scroll world con las fotos del local. Vídeo vertical 9:16 fijado a la derecha a toda la altura, con la parte de arriba en arco, y el texto a la izquierda, un bloque por cada una de las seis paradas del recorrido. La cabecera es tu píldora flotante: alineada a la izquierda en escritorio, con el logo a la altura del texto, y centrada en móvil.

Stack: proyecto Astro ya creado con pnpm create astro@latest, con Tailwind, GSAP (ScrollTrigger), Lenis y sharp. Imágenes con <Picture> de astro:assets.

Antes de escribir código, mira las fotos de public/photos/ y devuélveme lo que pide tu Output format, más qué foto va en cada sección.
```

---

## 4. Prompt adaptado (Café Julia)

### Qué cambió respecto al original y por qué

| Original (Arko) | Adaptado (Café Julia) | Motivo |
|---|---|---|
| Negocio real, verificar datos en su web | Marca demo; enlaces `example.com`; datos con TODO | No hay negocio real detrás |
| Vídeo vertical 9:16 fijo a la derecha | Vídeo horizontal 16:9 fijo a pantalla completa con tarjetas encima; en móvil dentro de un arco 4:5 | Nuestro vídeo es 16:9; en vertical a pantalla completa queda muy ampliado y borroso |
| 6 paradas | 5 paradas (las 5 fotos por las que pasa el vídeo) | El vídeo tiene 4 clips de 5 s entre 5 fotos |
| Tema oscuro (#131209) | Tema claro crema con secciones cacao | Las fotos son cálidas y luminosas |
| Logo existente vectorizado con potrace | Logo diseñado a mano en SVG (monograma "J" en arco) | No había logo |
| Hina Mincho + Zen Kaku Gothic New | Young Serif + Manrope | Tono cálido y algo retro, a juego con el local |
| Acción: reservar mesa | Acción: "Cómo llegar" | A un café se llega sin reservar |

Antes de usarlo se preguntó: ciudad y moneda, acción principal, fuentes y si los precios iban como demo. Respuestas: **España** (se asumió Madrid), "Cómo llegar" está bien, fuentes aprobadas, precios demo. Después se pidió además priorizar la usabilidad y elegir colores y tonos con criterio propio.

### Prompt final (con las respuestas ya aplicadas)

```text
Usa el skill landing-page-design. Vamos a crear la landing de CAFÉ JULIA, un café de especialidad en Madrid (España). Es una marca de demostración: los enlaces son de prueba y el menú y los precios son una propuesta editable, no datos reales. Por eso no inventes reseñas, premios, años de historia, cifras de clientes ni orígenes con nombre de finca concreta. Todo lo que sea dato de negocio (dirección, horario, teléfono, precios) márcalo en el código con un comentario TODO para reemplazarlo antes de publicar. Español de España, tuteo.

Intake:
- Acción principal: cómo llegar / visitarnos → https://maps.example.com/cafe-julia (de prueba).
- Acción secundaria, solo más abajo: comprar café en grano para casa → https://tienda.example.com/cafe-julia (de prueba). Va en la sección de la barra (foto 5, donde se ven las bolsas de café en la estantería).
- Oferta (menú demo de especialidad, precios de prueba en €):
  · Espresso: espresso, cortado, flat white, cappuccino, latte.
  · Filtrados: V60 del origen de la semana, Chemex para dos, cold brew.
  · Sin café: chocolate caliente, matcha latte, té en hebras.
  · Para acompañar: croissant de mantequilla, tostada de masa madre con aguacate y huevo, banana bread, cookie de chocolate y sal.
  · Bebidas vegetales sin coste extra (avena o almendra).
- Titular propuesto: "Café de especialidad, sin prisa." (propón dos alternativas más).
- Texto base: "Un café para quedarse. Granos de especialidad tostados en pequeños lotes, preparados con calma en una barra de mármol, entre terciopelo, terrazo y luz cálida."
- Prueba (sin cifras inventadas): el menú cambia de origen cada semana; se puede preguntar en barra cómo se prepara cada café; el grano se vende en el mismo local; se puede ir con portátil o a leer.
- Datos (todos de prueba): Calle Ejemplo 27, 28004 Madrid. Lunes a viernes de 8:00 a 20:00, sábado y domingo de 9:00 a 20:00. Teléfono +34 910 000 000. Instagram @cafejulia (enlace https://instagram.com/cafejulia).
- Legal: enlaces de prueba a /legal, /privacidad y /cookies (páginas placeholder; solo los enlaces en el footer).
- Logo: diséñalo tú como SVG a mano (no lo generes con Higgsfield). Wordmark "CAFÉ JULIA" más un monograma "J" dentro de un arco, inspirado en los respaldos curvos de las sillas de terciopelo. Pintado con currentColor para usarlo claro u oscuro. El monograma en arco es el favicon (reemplaza public/favicon.svg y favicon.ico).
- Público (asumido): gente del barrio que trabaja o estudia cerca, amantes del café de especialidad y visitantes que buscan un lugar bonito para un café tranquilo.
- Objeciones (asumidas): "¿café de especialidad es caro o pretencioso?", "¿puedo quedarme a trabajar?", "¿hay opciones sin lactosa, veganas o sin gluten?", "¿tengo que reservar?" (no: se llega sin reserva).
- Tráfico: Instagram y Google Maps.
- Tono: cálido, cercano, sereno y sin pretensión. Tuteo.
- Fotos, en public/photos/ (cafe_1 a cafe_9, verticales 3:4, 900×1200). Muévelas a src/assets/photos/ para usarlas con <Picture>:
  · cafe_1: banqueta de terciopelo y mesas de mármol ondulado, con un friso de vasos iluminados en la pared.
  · cafe_2: banqueta crema con sillones de terciopelo y mesas verdes de borde dorado.
  · cafe_3: sofá de terciopelo con almohadón a rayas y lámpara de hongo.
  · cafe_4: vista cenital de un sillón en arco, una mesa de vidrio ondulado y una lámpara sobre terrazo.
  · cafe_5: barista en la barra de mármol, vitrina de pastelería y estantería de bolsas de café.
  · cafe_6: olivo en una mesa junto al ventanal, con sillas bouclé.
  · cafe_7: rincón de la ventana con vista a la calle y banqueta.
  · cafe_8: mujer tomando café bajo dos lámparas colgantes terracota.
  · cafe_9: mesas de acero y lámparas de pétalos naranja frente a una cortina.
- Vídeo, en public/video/ (horizontal 16:9, 1280×720, 20 s, sin audio): cafe-walk-scrub.mp4 (todos keyframes, para scrub con scroll), cafe-walk.mp4 y .webm (loop), cafe-walk-poster.webp. Es un recorrido que pasa por cafe_1 → cafe_3 → cafe_5 → cafe_6 → cafe_8, más o menos una parada cada 5 s.
- Diseño: tema claro, cálido y editorial, con los colores de las fotos. Fondo crema #f4ece2, texto cacao #3b2219, terracota #b4532a solo como acento (el botón: terracota con texto crema, comprueba el contraste AA y oscurece el tono si no da). Superficies secundarias en rosa yeso #e7cdbd. Los arcos son la máscara de imagen principal (como los respaldos de las sillas). Los bordes ondulados de las mesas de mármol se usan como separadores o marcos, y el moteado del terrazo como motivo sutil (SVG, sin degradados).
- Tipografía: Young Serif para los titulares y Manrope para el texto, de Google Fonts, servidas en local y recortadas a latín (incluye á é í ó ú ñ ü ¿ ¡ €). Pido la pareja de fuentes expresamente como excepción a tu regla de una sola fuente. Sin cursivas ni negritas sintéticas (Young Serif solo tiene regular, úsala así).
- Prioridad móvil: sí. Prioriza la usabilidad.
- Layout: scroll world con el vídeo del recorrido. En escritorio, el vídeo cafe-walk-scrub.mp4 queda fijo a pantalla completa (object-fit: cover) y avanza con el scroll. Encima van cinco bloques de texto, uno por parada (las cinco fotos del recorrido), sobre una tarjeta crema translúcida a la izquierda. En móvil, el mismo vídeo fijo y las tarjetas abajo. Antes del recorrido, un hero con el loop cafe-walk (con fundido en el corte, porque el último cuadro no coincide con el primero) y el poster como respaldo. Después del recorrido, las secciones normales: menú, sin reserva/quedarse a trabajar, grano para casa, FAQ, visítanos (horarios y cómo llegar) y footer. Las fotos 2, 4, 7 y 9, que no salen en el vídeo, úsalas en menú, beneficios, grano y visítanos con máscara de arco. Con prefers-reduced-motion, no hagas scrub: muestra las cinco fotos como imágenes fijas.
- Navegación (cabecera en píldora flotante: alineada a la izquierda en escritorio con el logo a la altura del texto, centrada en móvil): Inicio · El lugar · Menú · Grano · Visítanos, más el botón "Cómo llegar".

Stack: proyecto Astro 7 ya creado (starter basics, pnpm). Todavía hay que instalar Tailwind (pnpm astro add tailwind), GSAP con ScrollTrigger y Lenis (pnpm add gsap lenis). sharp viene con Astro. Imágenes con <Picture> de astro:assets. Borra los archivos de la plantilla (Welcome.astro, src/assets/astro.svg, background.svg) y cambia el title "Astro Basics".

Antes de escribir código, mira las fotos de src/assets/photos/ y devuélveme lo que pide tu Output format, más qué foto va en cada sección. No generes nada con Higgsfield (quedan pocos créditos).
```

> Los colores del prompt fueron el punto de partida; al construir se ajustaron (ver `src/styles/global.css`): crema `#f5ede3`, yeso `#ecd8ca`, arena `#d9bba7`, cacao `#3a2118`, cacao suave `#6b4636`, terracota `#a4461f` (botón, contraste 5,2:1 con crema), terracota oscuro `#87381a` (etiquetas pequeñas, para pasar AA sobre yeso) y noche `#2a1710` (secciones oscuras).

---

## 5. Cómo quedó el proyecto

- `src/data/site.ts`: **todos** los datos editables (enlaces, dirección, horario, teléfono, menú, FAQ, `noindex`). Los de prueba llevan `TODO`.
- `src/components/`: una sección por componente (`Header`, `Hero`, `Tour`, `Tagline`, `Benefits`, `Menu`, `HowItWorks`, `Beans`, `Faq`, `Visit`, `Footer`) más `Logo` e `Icon`.
- `src/scripts/motion.ts`: Lenis + ScrollTrigger sincronizados y revelado al entrar en pantalla (IntersectionObserver). Exporta `reducedMotion` y `lenis`.
- `src/components/Tour.astro`: el scroll world. Sección con `grid` donde el escenario (`sticky top-0 h-svh`) y las paradas (`100svh` cada una) ocupan la misma celda; ScrollTrigger mapea el progreso del scroll a `video.currentTime`, así la parada *i* queda centrada en el segundo `5·i`.
- `src/pages/404.astro` y `src/pages/[legal].astro`: 404 propia y páginas legales placeholder.
- `public/fonts/`: woff2 de Young Serif y Manrope (solo subconjunto latín), declarados en `global.css`.

### Antes de publicar

- [ ] Reemplazar los `TODO` de `src/data/site.ts` y el `site` de `astro.config.mjs`.
- [ ] Poner `noindex: false`.
- [ ] Quitar "Sitio de demostración" del footer.
- [ ] Redactar los textos legales.

### Despliegue (Coolify)

- `Dockerfile`: build con Node 22 + pnpm (solo dependencias de producción) y servido con `nginx:alpine`. En Coolify: build pack **Dockerfile**, puerto **80**.
- `docker/nginx/default.conf`: caché por tipo de archivo:

  | Ruta | Cache-Control | Motivo |
  |---|---|---|
  | HTML (`/`, `/legal`…) | `no-cache` | Revalida con ETag: los cambios se ven al momento |
  | `/_astro/*` | 1 año, `immutable` | Llevan hash en el nombre |
  | `/video/*`, `/fonts/*` | 30 días | Sin hash: **si se reemplaza un vídeo, cambiarle el nombre** |
  | favicon, `og.jpg` | 7 días | Cambian poco |

- También: gzip para texto, peticiones por rango (206) para el vídeo, 404 propia, cabeceras de seguridad básicas (`docker/nginx/security-headers.conf`) y healthcheck.
- Probar en local: `docker build -t cafe-julia . && docker run --rm -p 8088:80 cafe-julia` → http://localhost:8088

---

## 6. Lecciones aprendidas

**Higgsfield**
- Plan free: máximo 2 trabajos simultáneos (el tercero falla con `rate_limit_reached`, sin cobro).
- `kling3_0` std de 5 s cuesta 7,5 créditos.
- Entre fotos distintas tiende a hacer un fundido; pedir explícitamente "no dissolve, walks/pans into next room".
- El CLI está instalado local: `pnpm exec higgsfield …`, no `higgsfield …`.

**Vídeo**
- Para scrub con scroll, exportar con todos los cuadros clave (`ffmpeg … -g 1`); si no, buscar cuadros va a saltos.
- Si el último cuadro no coincide con el primero, el bucle salta: fundido al poster antes del corte.
- En iOS el vídeo solo permite buscar cuadros tras un `play()`; se hace `play().then(pause)` al acercarse a la sección.
- En móvil se reutiliza el vídeo liviano del hero (ya en caché) en lugar del de scrub (10 MB).
- Vídeo 16:9 en pantalla vertical completa = recorte enorme y borroso. Mejor dentro de un arco 4:5.

**Código**
- `pointer-events` se hereda: si la cabecera tiene `pointer-events-none`, el overlay del menú móvil necesita `pointer-events-auto` al abrirse, o los enlaces no responden.
- Tailwind 4 no permite `@apply` de una clase propia; hay que definirla con `@utility`.
- `astro check` no soporta TypeScript 7: instalar `typescript@^6`.
- Si instalas dependencias con el servidor de desarrollo corriendo, Vite responde **504 "Outdated Optimize Dep"** y no carga el JS (sin vídeo ni animaciones). Solución: `astro dev stop`, borrar `node_modules/.vite`, volver a arrancar y recargar el navegador con Ctrl+Shift+R. Por eso el layout quita la clase `js` si los scripts no cargan en 3 s: la página se ve completa aunque sin animaciones.
- Para revisar en el navegador, mejor `pnpm build && pnpm preview` que el modo dev (las recargas en caliente interrumpen las pruebas).

**Proceso**
- Pedir el plan (*Output format* de la skill) antes de escribir código ahorra iteraciones.
- Mirar las fotos y el vídeo antes de adaptar el prompt: la orientación del vídeo cambia todo el layout.
