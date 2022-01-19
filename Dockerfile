# Pull base image
FROM node:14.15-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY . /app

# Install dependencies
RUN yarn install --production

# Build app
RUN yarn build

# Listen on port
EXPOSE 3000

# Set node server
ENTRYPOINT yarn start
