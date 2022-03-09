# Build environment
# Pull base image
#FROM node:14.15-alpine as build

# Set working directory
#WORKDIR /app

# Copy files
#COPY . /app

# Install dependencies
#RUN yarn install --production

#ARG REACT_APP_MOVIE_API_KEY
#ENV REACT_APP_MOVIE_API_KEY=$REACT_APP_MOVIE_API_KEY

# Build app
#ENV REACT_APP_DEV_DISABLE_ESLINT=true
#ENV SKIP_PREFLIGHT_CHECK=true
#ENV DISABLE_ESLINT_PLUGIN=true
#RUN yarn build

# Production environment
FROM nginx:stable-alpine

RUN ls

#COPY --from=build /app/build /usr/share/nginx/html
COPY build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Listen on port
EXPOSE 3000

# Set node server
CMD ["nginx", "-g", "daemon off;"]
