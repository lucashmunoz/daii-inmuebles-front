FROM node:21.7.1-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN echo "VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY"
RUN echo "VITE_MAP_ID=$VITE_MAP_ID"

EXPOSE 5173

CMD ["npm", "run", "dev"]
