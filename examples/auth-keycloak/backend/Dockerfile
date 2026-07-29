FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN SKIP_K8S_SYNC=true npm run build

EXPOSE 3000
CMD ["npm", "start"]
