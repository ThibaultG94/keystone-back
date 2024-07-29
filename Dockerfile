# Use a specific version of node on alpine
FROM node:18

# Set non-interactive mode
ARG DEBIAN_FRONTEND=noninteractive

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY . .

# Install dependencies
RUN npm install

# Copy .env file
COPY .env ./

# Set an environment variable to automatically answer "yes" to prompts
ENV ACCEPT_EULA=Y
#

# Your app binds to port 8080 by default, so use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Start your app
CMD [ "npm", "run", "dev" ]