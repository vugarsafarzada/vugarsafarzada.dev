# syntax=docker/dockerfile:1.6
FROM node:20-bookworm-slim AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@10.28.2 --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json
RUN pnpm install --frozen-lockfile

FROM deps AS dev
WORKDIR /app
ENV NODE_ENV=development
CMD ["pnpm","-w","--filter","backend","start:dev"]

FROM deps AS build
COPY . .
WORKDIR /app/backend
RUN pnpm exec prisma generate
RUN pnpm run build

FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/backend/dist /app/backend/dist
COPY --from=build /app/backend/prisma /app/backend/prisma
COPY --from=build /app/backend/package.json /app/backend/package.json
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/pnpm-workspace.yaml /app/pnpm-workspace.yaml
COPY --from=build /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=build /app/.npmrc /app/.npmrc
EXPOSE 3000
CMD ["node","/app/backend/dist/main.js"]
