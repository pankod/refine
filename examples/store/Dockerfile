FROM refinedev/node:18 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ENV CI true

FROM base AS deps

COPY package.json pnpm-lock.yaml .npmrc ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

FROM base AS builder

COPY --from=deps /app/refine/node_modules ./node_modules

COPY . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

RUN pnpm run build --scope store --skipNxCache

FROM base AS runner

ENV NODE_ENV production

COPY --from=builder /app/refine/examples/store/public ./public

COPY --from=builder --chown=refine:nodejs /app/refine/examples/store/.next/standalone ./
COPY --from=builder --chown=refine:nodejs /app/refine/examples/store/.next/static ./examples/store/.next/static

USER refine

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "./examples/store/server.js"]
