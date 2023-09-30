# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /index

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Expose a port (e.g., 3000) that your application will listen on
EXPOSE 5000

# Define the command to run your Node.js application
CMD ["node", "index.js"]