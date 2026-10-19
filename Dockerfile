# Build estático con Astro y servido con nginx. Coolify: build pack "Dockerfile", puerto 80.

FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.1.1 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Solo dependencias de producción: el build no necesita el CLI de Higgsfield ni las de chequeo de tipos.
RUN pnpm install --frozen-lockfile --prod
COPY . .
RUN pnpm build

FROM nginx:1.29-alpine
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q --spider http://127.0.0.1/ || exit 1
