# base image
FROM node:18.17.0-slim

# Create and change to the app directory.
WORKDIR /usr/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY . .
ENV PUBLIC_SERVER_URL=teste2
# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
RUN npm ci --include=dev

RUN npm run build

CMD ["npm", "start"]
