---
title: Introduction to Docker Compose
description: We'll go over the basics of Docker Compose in this article, including what it is, how it works, and how to use it.
slug: docker-compose
authors: muhammad_khabbab
category: "Engineering"
tags: [docker]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-31-docker-compose/social.png
hide_table_of_contents: false
---

## Brief explanation of Docker Compose and its purpose

For multi-container Docker applications, Docker Compose is a tool that is designed for application definition and execution. By enabling you to execute several container applications simultaneously from a single YAML file, Docker Compose finds a solution to the problem. Docker Compose is the best option for environments used for development, testing, and staging, as well as for quick integration processes. By utilizing Docker Compose, which enables you to store and version control your application stack in a file, you can also just make it possible for others to contribute to your project. Compose additionally allows the isolation of your application from the host environment and consistency across several instances.

## Overview of the benefits and use cases of Docker Compose

### Benefits of Docker Compose

Provide Reproducible Environments

It also allows you to easily create local environments that are identical to your production environment. Using these, you can test your applications and reduce instances of errors and unexpected behavior in production.

Ensure the Security of internal Container Networking

For internal communication, all the containers defined in the compose file are placed on the same internal network. This protects them from unauthorized access from the outside. It also simplifies the management of the multi-container application network.

Help in Scalability and High Availability

You can scale specific services inside your application using Docker Compose by defining the necessary number of container instances. This increases the capacity of your application and ensures high availability by dividing the workload among several instances.

Recreate containers only when they have changed

Compose caches the configuration used while building a container. Furthermore, when we resume a service that has not changed, Compose reuses the existing containers. Reusing containers in this context simply means that we can quickly change our environments.

### Use Cases of Docker Compose

Development environments

Running applications and their dependencies in isolated environments is essential while developing software. For instance, you could be dependent on the application of another team, and that team may have its own set of complications, such as having to set up the database in a specific way. You can execute the entire stack or delete it using Compose with only one command.

Automated testing environments

Tools that make it simple to create and remove environments are often needed for automated workflows such as CI/CD pipelines. Compose offers an efficient approach for creating and destroying such environments for your test suite through the use of a configuration file.

Single host deployments

Even though Compose was primarily created for workflows in development and testing, it is sometimes utilized in production to run containers on a single host. Although Compose is becoming better, it still functions more as a wrapper over the Docker API than an orchestrator like Swarm or Kubernetes.

## II. Installation and Setup

## Instructions for installing Docker Compose on different operating systems

Installing Docker Desktop is the quickest and most convenient method to use Docker Compose. Along with Docker Engine and Docker CLI, which are necessary for Compose to function, Docker Desktop also contains Docker Compose. You can get Docker Desktop(**_Windows, Linux, MacOS_**) from the official Docker website(<https://www.docker.com/products/docker-desktop/>).

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-31-docker-compose/image1.png"  alt="Docker Desktop download page" />
</div>

<br/>

## Verifying the installation

In order to verify the installation of Docker Compose, go to the terminal or command prompt of your OS and then run the command `docker-compose --version`. If the output of the command shows the version of Docker compose, then your installation is successful.

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-31-docker-compose/image2.png"  alt="Terminal showing docker-compose --version output" />
</div>

<br/>

## Configuring Docker Compose for your environment

You have to create a Compose file that describes the services of your application in order to configure Docker Compose in your environment. A YAML file contains information on each service's image, command, ports, volumes, environment variables, dependencies, and other settings.

Let's suppose we have created a docker compose file(with yml extension) in our project directory, specify the components information, and this can be viewed and validated by navigating to the project directory from the terminal and then running `docker-compose –config` Command.

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-31-docker-compose/image3.png"  alt="Terminal output for docker-compose config" />
</div>

<br/>

## III. Writing a Docker Compose File

## Introduction to the Docker Compose YAML syntax

A variety of programming scenarios, including internet communications, object persistence, and, in the case of compose, configuration files, can employ the data serialization language YAML. The YAML syntax can be used to construct key-value pairs and hierarchical structures. Indentation is used to show how different parts and components are related to one another and how they work together. Inline comments are also supported in YAML because JSON does not allow inline comments, so YAML is significantly more suitable for describing Compose files.

## Overview of the key sections in a Docker Compose file

**Version**

specifies which version of the Docker Compose file syntax should be used. A string is required as the version's value. The string can contain both a major and minor version number, such as 3.9, or only a major version number, like 3, for example.

**Services**

The containers made for the services in your application are configured in the services mapping. Under the services key, a layered mapping is set for each service. Each service is capable of having whatever name you like. The services with the names web, db, and redis are shown in our example below:

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-31-docker-compose/image4.png"  alt="Docker Compose services section example" />
</div>

<br/>

**Network**

You can specify the networks that link the services and enable communication between them; otherwise, Compose will automatically construct a new network using the application's default bridge driver. The network's name is derived from the name of the directory in which the Compose file is located.

**Volume**

The volume key mapping is utilized like that of docker volume create. Volumes can be referred to inside the services section in their configuration keys. Additionally, external volumes that were created by using the docker volume create command, or another compose file can also be declared.

## Step-by-step guide on writing a basic Docker Compose file

### Defining services

Under the services section, begin by listing the services or containers that make up your application. Similar to how you configure containers using docker run command arguments, you define the configuration options for service containers inside of the service configuration mapping.

 <div className="centered-image">
   <img style={{alignSelf:"center", width: "300px"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-31-docker-compose/image5.png"  alt="Docker Compose service definition example" />
</div>

<br/>

### Specifying container images and versions

Choose the image for each service from a container registry, such as Docker Hub. Additionally, you can use the '**latest**' tag or specify a specific image version.

 <div className="centered-image">
   <img style={{alignSelf:"center", width: "300px"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-31-docker-compose/image6.png"  alt="Docker Compose image and version example" />
</div>

<br/>

### Configuring or mapping volume settings

You need to specify the volume mapping between the host system and the container in order to configure the bind mount volume setting. It follows `\[host-path\]:\[container-path\]` format. The '**./html**' directory on the host system is mapped in the example below to the '**/usr/share/nginx/html**' directory in the web container. You can further configure or customize other volume settings as well, such as naming volumes or specifying read-only options for volumes, etc.

 <div className="centered-image">
   <img style={{alignSelf:"center", width: "300px"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-31-docker-compose/image7.png"  alt="Docker Compose volume mapping example" />
</div>

<br/>

### Environment variables

Your containers can be dynamically configured without affecting the container images themselves. In the Example Below, The '**environment'** variable for the database service of MySQL is defined. '**MYSQL_ROOT_PASSWORD**' is the name of the environment variable and 'secret' is the value that can dynamically change. This approach allows you to add several environment variables, with each variable appearing on a separate line and beginning with a hyphen (-).

 <div className="centered-image">
   <img style={{alignSelf:"center", width: "300px"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-31-docker-compose/image8.png"  alt="Docker Compose environment variables example" />
</div>

<br/>

### Exposing ports

You need to define the ports to expose on the host system and map them to the internal ports of the container using the '**ports**' key. In the example below, port '**80**' of the web container has been mapped to host system port '**8080**'.

 <div className="centered-image">
   <img style={{alignSelf:"center", width: "300px"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-31-docker-compose/image9.png"  alt="Docker Compose port mapping example" />
</div>

<br/>

## IV. Managing Docker Compose Projects

## Creating a Docker Compose project directory structure

- The services (or containers) you want to execute as part of your application must be specified in a file called '**docker-compose.yml**' that must be created in your project root directory.

- Depending on the requirements and demands of your application, you can also create a '**services/**' directory that contains all services and their related files like the Dockerfile, requirements.txt, and app.py.

- Any persistent data directories that could be mounted as volumes in your Docker Compose services are kept in the '**volume/**' directory.

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-31-docker-compose/image10.png"  alt="Docker Compose project directory structure" />
</div>

<br/>

## B. Running Docker Compose commands

### 1. docker-compose up

For starting your application, you need to build and run all containers specified in the configuration file, and Docker compose will facilitate you for that purpose by just running one single command. Using the command line tool, you must go to the project root directory where the configuration file is placed and run the '`docker-compose up`' command. Please see the example below:

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-31-docker-compose/image11.png"  alt="Terminal output for docker-compose up" />
</div>

<br/>

### 2. docker-compose down

Now, if you want to stop your application and remove all containers or services that were created and launched using the configuration file in the previous command, Docker compose will also make this task easier by allowing you to accomplish it with just one command (i.e., "`docker-compose down`") at the same location of the configuration file.
See the illustration below:

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-31-docker-compose/image12.png"  alt="Terminal output for docker-compose down" />
</div>

<br/>

### 3. docker-compose build

If you want to rebuild the images for each service defined in the YAML configuration file or If the Dockerfiles or build contexts have changed, then you need to run the command '`docker-compose build`' at the same location where your configuration file has been placed.

### 4. docker-compose start and docker-compose stop

If you want to start or stop your application, but you want to avoid removing the containers, Docker compose will help you achieve this purpose by using '`docker-compose start`' or '`docker-compose stop`' commands.

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-31-docker-compose/image13.png"  alt="Terminal output for docker-compose start/stop" />
</div>

<br/>

## Managing multiple Docker Compose environments (e.g., development, production)

It is possible to control how your application behaves in different environments by using environment variables with docker-compose. For instance, you can set up your development and production environments with various network settings, ports, or database credentials. To achieve this, you need to provide environment variables in the docker-compose.yml file by using the 'environment' or env_file keys for each service. Additionally, you can make separate configuration files for each environment, such as "**docker-compose.production.yml**," "**docker-compose.staging.yml**" and "**docker-compose.development.yml**". Once the environment-specific files are created, then you need to use the '**-f**' or '**—file**' option with '**docker-compose**' to use them for each environment. In the case of a staging environment, navigate to the staging configuration file location and then run the command 'docker-compose -f docker-compose.staging.yml up'

## Overriding Docker Compose configurations using environment-specific files

Once you have created multiple compose files for different configurations of different environments, docker-compose also offer you to override one configuration with another. Override files can hold different values for any configurations specified in the main '`docker-compose.yml`' file. Let's suppose your application is currently running by using base configurations in the 'docker-compose.yml' file, and as a developer, you want to override development configurations for the development environment; for that purpose, you need to create another file(`docker-compose.development.override.xml`) in the same directory that contains development specific values and run docker-compose command that explicitly specifies the file(**use -f option**) that needs to override on the base file. According to this example, the command that shows the applied configuration will be '`docker-compose -f docker-compose.yml -f docker-compose.development.override.yml config`'

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-31-docker-compose/image14.png"  alt="Docker Compose config with override files" />
</div>

<br/>

## V. Conclusion

## Summary of key points covered in the guide

1.  The administration and orchestration of multi-container applications are made easier by Docker Compose.

2.  Using a YAML file, Docker Compose enables you to specify and set up your application services.

3.  In accordance with the settings described in the YAML file, it automates the creation of networks, volumes, and containers.

4.  For your application, Docker Compose offers advantages in reproducible environments, internal networking security, scalability, high availability, and caching configuration.

5.  Simple one-line Commands in Docker Compose, including up, down, build, start, and stop, assist in managing and controlling your containers.

6.  Using different YAML files, you can establish and switch to different Docker Compose environments (such as development, staging, testing, and production).

## Encouragement for further exploration and experimentation with Docker Compose

1.  Research and practice more complex capabilities of Docker Compose, such as the use of external networks, health checks, or service dependencies.

2.  Learn more about other configuration choices and best practices by digging further into the resources and documentation for Docker Compose.

3.  Join online forums and groups dedicated to Docker and Docker Compose to share your knowledge and get insight from others.

4.  Stay up-to-date with the most recent Docker and Docker Compose releases and upgrades can help you continually advance your knowledge and abilities.
