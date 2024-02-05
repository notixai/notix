FROM node:20.11.0-bullseye AS development

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

# Install dependecies
#RUN npm set progress=false \
#    && npm config set depth 0 \
#    && npm i install
RUN npm ci

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 5000

# Serve the app
CMD ["npm", "start"]

FROM development as dev-envs
RUN apt-get update
RUN apt-get install -y --no-install-recommends git

RUN useradd -s /bin/bash -m vscode
RUN groupadd docker
RUN usermod -aG docker vscode

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]