# Use a specific version of node on alpine
FROM node:18

# Déclare les arguments qui vont être passés comme variables d'environnement
ARG ENV
ARG DATABASE_URL
ARG FRONTEND_URL

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
COPY . .

# Install dependencies
RUN npm install

# Passe les variables d'environnement dans le conteneur
ENV ENV=${ENV}
ENV DATABASE_URL=${DATABASE_URL}
ENV FRONTEND_URL=${FRONTEND_URL}

# Your app binds to port 8080 by default, so use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Start your app
CMD [ "npm", "start" ]