FROM cypress/base:18.16.0

#set the working directory in the container
WORKDIR /app

#copy the package.json and package-lock.json files
COPY package*.json ./
COPY cypress cypress
COPY cypress.config.js .
