# Step 1: Use Node.js v20.x as the base image
FROM node:20-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if it exists)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the application port
EXPOSE 3039

# Step 7: Start the application
CMD ["npm", "run", "dev"]
