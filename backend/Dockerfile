# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Set environment variables if needed
# ENV ENV_VARIABLE=VALUE

# Expose the port your app runs on
EXPOSE 3000

# Command to run on container start
CMD ["node --max-old-space-size=4096", "server.js"]
