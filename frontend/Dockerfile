# syntax=docker/dockerfile:1.6
FROM node:20-bookworm-slim AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@10.28.2 --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json
RUN pnpm install --frozen-lockfile

FROM deps AS dev
WORKDIR /app
ENV NODE_ENV=development
CMD ["pnpm","-w","--filter","frontend","dev"]

FROM deps AS build
COPY . .
ARG NEXT_PUBLIC_ACTIVE_PORT
ENV NEXT_PUBLIC_ACTIVE_PORT=$NEXT_PUBLIC_ACTIVE_PORT
WORKDIR /app/frontend
RUN pnpm -w --filter frontend build

FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/frontend /app/frontend
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/pnpm-workspace.yaml /app/pnpm-workspace.yaml
COPY --from=build /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=build /app/.npmrc /app/.npmrc
EXPOSE 3000
CMD ["pnpm","-w","--filter","frontend","exec","next","start"]
