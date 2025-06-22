FROM node:18.18
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate --schema=./prisma/schema.prisma
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
