FROM node:22.9.0-alpine

# Set the working directory to /app
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start"]
