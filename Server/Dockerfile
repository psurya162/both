# Use a Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run your app
CMD ["npm", "start"]
