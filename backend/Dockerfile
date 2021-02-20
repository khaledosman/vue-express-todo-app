
# FROM node:latest
FROM node:lts-alpine

# Set the working directory to /todoapp
WORKDIR /todoapp

# Copy the current directory contents into the container at /todoapp
COPY . /todoapp

# Install any needed packages specified in requirements.txt
# ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install
RUN npm install pm2 -g

RUN pm2 install typescript

# Make port 3000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV PORT 8000

# ENV PM2_MACHINE_NAME docker-server

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "src/index.ts" ]
