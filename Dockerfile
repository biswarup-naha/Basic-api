FROM oven/bun:1 AS base

WORKDIR /app

COPY package.json .

RUN bun install

COPY . .

ENV PORT=5000
ENV ATLAS_URI=mongodb+srv://jeeeeet6902:NMSMxDrXwME8XW67@cluster0.zqnzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
ENV JWT_SECRET=cApSiTeChTaSk-4

EXPOSE 5000

CMD ["bun", "dev"]