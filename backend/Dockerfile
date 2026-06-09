FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

RUN pnpm install

COPY . .

RUN pnpm db:generate
RUN pnpm build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && pnpm start"]