# Use a specific version of node on alpine
FROM node:18

# Déclare les arguments
ARG ENV
ARG DATABASE_URL
ARG DATABASE_PROVIDER
ARG FRONTEND_URL

# Crée le répertoire de l'application
WORKDIR /usr/src/app

# Passe les variables d'environnement dans le conteneur
ENV ENV=${ENV}
ENV DATABASE_URL=${DATABASE_URL}
ENV DATABASE_PROVIDER=${DATABASE_PROVIDER}
ENV FRONTEND_URL=${FRONTEND_URL}

# Copie les fichiers de dépendances et installe-les
COPY package*.json ./
RUN npm install

# Copie tous les fichiers de l'application
COPY . .

# Expose le port sur lequel l'application écoute
EXPOSE 3000

# Démarre l'application
CMD [ "npm", "run", "dev" ]
