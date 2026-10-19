# Café Julia

Landing de demostración de un café de especialidad, hecha con Astro, fotos y vídeo generados con Higgsfield y un recorrido del local que avanza con el scroll ("scroll world").

**Guía completa del proceso** (prompt original, prompt adaptado, skills, recursos y lecciones): [docs/GUIA-LANDING.md](docs/GUIA-LANDING.md).

## Comandos

```sh
pnpm install
pnpm dev            # http://localhost:4321
pnpm build          # sitio estático en ./dist/
pnpm preview        # sirve el build
pnpm astro check    # chequeo de tipos
```

## Datos editables

Todo el contenido de negocio (enlaces, dirección, horario, teléfono, menú, FAQ) está en `src/data/site.ts`. Los datos de prueba están marcados con `TODO`.
