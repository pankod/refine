import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export default function DockerExample() {
  return (
    <Sandpack
      showNavigator={false}
      showLineNumbers
      showFiles
      hidePreview
      showOpenInCodeSandbox={false}
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "react-router": "^7.0.2",
      }}
      files={{
        "/App.tsx": {
          code: AppTsxCode,
        },
        "/package.json": {
          code: PackageJsonCode,
        },
        "/Dockerfile.dev": {
          code: DockerfileDevCode,
        },
        "/Dockerfile.devtools": {
          code: DockerfileDevtoolsCode,
        },
        "/docker-compose.yml": {
          code: DockerComposeYmlCode,
        },
        "/nginx.conf": {
          code: NginxConfCode,
        },
        "/style.css": {
          code: "",
          hidden: true,
        },
      }}
    />
  );
}

const AppTsxCode = /* jsx */ `
import { Refine } from "@refinedev/core";
import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";

export default function App() {
    return (
        <DevtolsProvider
            url="http://devtools.local"
        >
            <Refine
                // ...
            >
                {/* ... */}
                <DevtoolsPanel />
            </Refine>
        </DevtolsProvider>
    )
}
`.trim();

const PackageJsonCode = /* json */ `
{
  "name": "my-app",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "refine dev --devtools false -- --host",
    "devtools": "refine devtools",
    "refine": "refine"
  },
  "dependencies": {
    "@refinedev/cli": "^2.16.36",
    "@refinedev/core": "^4.53.0",
    "@refinedev/devtools": "^1.2.6"
  }
}
`.trim();

const DockerfileDevCode = /* dockerfile */ `
# We're setting up our development server and running it on port 5173.
# We'll then use Nginx to reverse proxy the requests to the correct services.
# We're running the application at port 5173 and we'll access it via http://my-app.local.

# Use the official Node.js image as a parent image
FROM refinedev/node

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Command to run the development server
CMD ["npm", "run", "dev"]
`.trim();

const DockerfileDevtoolsCode = /* dockerfile */ `
# We're setting up our Devtools server and running it on port 5001.
# We'll then use Nginx to reverse proxy the requests to the correct services.
# We're running devtools at port 5001 and we'll access it via http://devtools.local.

# Use the Refine's Node.js image as a parent image
FROM refinedev/node

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the devtools server runs on
EXPOSE 5001

# Command to run the devtools server
CMD ["npm", "run", "devtools"]
`.trim();

const DockerComposeYmlCode = /* yaml */ `
# We're setting up a development environment with two services: dev and devtools.
# The dev service is the main service that runs the application.
# The devtools service is the service that runs the Refine Devtools.
version: "3"
services:
  dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - app:/app/refine
      - /app/refine/node_modules
    networks:
      - dev-network
  devtools:
    build:
      context: .
      dockerfile: Dockerfile.devtools
    volumes:
      - app:/app/refine
      - /app/refine/node_modules
    networks:
      - dev-network
  nginx:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    networks:
      - dev-network
networks:
  dev-network:
    driver: bridge
volumes:
  app:
`.trim();

const NginxConfCode = /* nginx */ `
# We're setting up a reverse proxy to map the requests to the correct services.
# Then we'll add the necessary aliases to the /etc/hosts file to make the services accessible via the domain names.
events {
    worker_connections 1024;
}
http {
    server {
        listen 80;
        server_name my-app.local;
        location / {
            proxy_pass http://dev:5173;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    server {
        listen 80;
        server_name devtools.local;
        location / {
            proxy_pass http://devtools:5001;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
`.trim();
