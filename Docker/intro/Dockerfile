FROM node:14

WORKDIR /app

# Copia o package.json para o workdir
COPY package.json .

RUN npm install

COPY . .

# Porta aberta
EXPOSE 5200

CMD ["node", "index.js"]