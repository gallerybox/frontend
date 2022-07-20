ARG NODE_VERSION
ARG NGINX_VERSION

# Stage 0 - 

FROM node:${NODE_VERSION} AS development

WORKDIR /usr/src/app/frontend

COPY package*.json ./

RUN npm install

COPY . ./

CMD npm run start



# Stage 1 - Build and compile the frontend

FROM node:${NODE_VERSION} AS builder

# Set working directory to Docker environment
WORKDIR /app

# Install app dependencias

# Step 1 - Copies package.json and package-lock.json to Docker environment
COPY package*json ./

# Step 2 - Install all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . ./

RUN npm run build



# Stage 2 - Based on Nginx to serve the frontend

FROM nginx:${NGINX_VERSION} AS production

# Set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html

# Remove default directory to nginx resources directory
RUN rm -rf ./*

# Copies static resources from builder stage
COPY --from=builder /app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "deamon off;"]