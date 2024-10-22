FROM node:21.7.1-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

#EXPOSE 8080

CMD ["sh", "-c", "echo VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY && echo VITE_MAP_ID=$VITE_MAP_ID && npm run dev"]


