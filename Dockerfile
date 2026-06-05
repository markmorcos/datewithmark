# ── build the static site ────────────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Public experimentation SDK key, inlined into the static bundle at build time
# (Astro only exposes `PUBLIC_*`). It's a *client* key — safe to ship to the
# browser. Supplied by CI from a k8s secret via deployment.yaml `buildArgs`
# (see infrastructure/scripts/build.sh). Empty default: the app still builds and
# the client falls back to the control variant if the key is absent.
ARG PUBLIC_EXP_SDK_KEY=""
ENV PUBLIC_EXP_SDK_KEY=$PUBLIC_EXP_SDK_KEY
RUN npm run build

# ── serve it with nginx ──────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
