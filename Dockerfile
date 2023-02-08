FROM node:16-slim AS nodebase

#### deps #######################
# Install dependencies only when needed
FROM nodebase AS deps-build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm clean-install
#### /deps #######################

#### deps-prod #######################
# Install dependencies only when needed
FROM nodebase AS deps-prod
ARG NODE_ENV=production

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm clean-install --production
#### /deps-prod #######################

#### builder-dev #######################
# Rebuild the source code only when needed
FROM nodebase AS builder-dev
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
ARG NODE_ENV=dev

COPY --from=deps-build /app/node_modules ./node_modules
COPY . .

RUN echo ${NODE_ENV}
RUN npm run lint --fix
RUN NODE_ENV=${NODE_ENV} npm run build
#### /builder-dev #######################

#### builder-prod #######################
# Rebuild the source code only when needed
FROM nodebase AS builder-prod
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
ARG NODE_ENV=production

COPY --from=deps-build /app/node_modules ./node_modules
COPY . .

RUN echo ${NODE_ENV}
RUN npm run lint --fix
RUN NODE_ENV=${NODE_ENV} npm run build
#### /builder-prod #######################


#### runner-dev #######################
## DEVELOPMENT RUNNER IMAGE
FROM builder-dev AS runner-dev
ARG NODE_ENV=dev
ENV NEXT_TELEMETRY_DISABLED 1

LABEL development=true

EXPOSE 3000
ENV PORT 3000

CMD [ "npm", "run", "dev" ]
#### /runner-dev #######################

#### /runner-prod #######################
# Production image #
FROM nodebase AS runner-prod
LABEL production=true

WORKDIR /app
ARG NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# install upgrades and re-slim image
RUN apt-get -y update && apt-get upgrade -y && apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/man/?? /usr/share/man/??_*

RUN addgroup --system --gid 1001 www-root
RUN adduser --system --uid 1001 www-root
USER www-root

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder-prod --chown=www-root /app/next.config.js ./
COPY --from=builder-prod --chown=www-root /app/public ./public
COPY --from=builder-prod --chown=www-root /app/package.json ./package.json
COPY --from=builder-prod --chown=www-root /app/.next ./.next
COPY --from=deps-prod --chown=www-root /app/node_modules ./node_modules
COPY --from=builder-prod --chown=www-root /app/.env.${NODE_ENV} ./

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
#COPY --from=builder-prod --chown=www-root:www-root /app/.next/standalone ./
#COPY --from=builder-prod --chown=www-root:www-root /app/.next/static ./.next/static/

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "run", "start"]
#### /runner-prod #######################