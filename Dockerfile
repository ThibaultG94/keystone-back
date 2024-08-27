# Use a specific version of node on alpine
FROM node:18

# Crée le répertoire de l'application
WORKDIR /usr/src/app

# Déclare les arguments
ARG ENV
ARG DB_CONFIG
ARG DATABASE_PROVIDER
ARG FRONTEND_URL

# Passe les variables d'environnement dans le conteneur
ENV ENV=${ENV}
ENV DB_CONFIG=${DB_CONFIG}
ENV DATABASE_PROVIDER=${DATABASE_PROVIDER}
ENV FRONTEND_URL=${FRONTEND_URL}

# Copie tous les fichiers de l'application
COPY . .

# Copie les fichiers de dépendances et installe-les
RUN npm install

# Expose le port sur lequel l'application écoute
EXPOSE 3000

# Démarre l'application
CMD [ "npm", "start" ]
