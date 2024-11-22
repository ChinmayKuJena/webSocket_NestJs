# Step 1: Set the base image (Node.js)
FROM node:18 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (for faster builds)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --frozen-lockfile

# Step 5: Copy the entire project files into the container
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Set the port for the application (the port your NestJS app listens on)
EXPOSE 3000

# Step 8: Use a lightweight image for production
FROM node:18-slim

# Set working directory for the production environment
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --production --frozen-lockfile

# Copy the build files from the build stage
COPY --from=build /app/dist /app/dist

# Set environment variable to start in production mode
ENV NODE_ENV=production

# Step 9: Command to start the app in production mode
CMD ["node", "dist/main.js"]
