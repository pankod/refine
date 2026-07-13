---
title: A Detailed Guide on Docker run Command
description: We'll discuss the Docker run command in detail, including its syntax, options, and examples.
slug: docker-run-command
authors: muhammad_khabbab
category: "Ecosystem / Integrations"
tags: [docker]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-24-docker-run-command/social.png
hide_table_of_contents: false
last_update: 2023-07-11
---

## What is the Docker run command?

The `docker run` command starts a new container, executes a command inside it, and pulls an image if needed. You can use the Docker run command to create and execute containers based on Docker images.

### When to use the Docker run command

Docker commands have revolutionized the business by utilizing containerization technology, most commonly used for enabling quicker innovation, easier deployments, and better resource management.

### Containerization and application deployment:

The lightweight, isolated environments known as containers, which encapsulate applications and their dependencies, are created and executed using the Docker run the command through which application deployment is simplified.

### Isolated Development and Testing Environments:

Docker run makes setting up isolated environments for development and testing easier. To ensure consistent and reproducible results during the development and testing phases, developers can spin up containers with specific configurations, dependencies, and software versions.

### Fast Prototyping:

Developers can quickly update containers with multiple configurations, libraries, or dependencies without affecting the host system to test new scenarios with new prototypes. Docker run is the perfect tool for experimenting with new ideas and quickly iterating on development projects because of its flexibility and isolation.

## Syntax of Docker run command

## Overview of the syntax

The syntax of the docker run command is as follows:

`docker run \[OPTIONS\] IMAGE \[COMMAND\] \[ARG...\]`

The basic structure of the Docker run command consists of four different parts. Two parts are compulsory, and two are optional. It's important to remember that the OPTIONS and COMMAND \[ARGS\] sections offer flexibility and let you customize the execution, configuration, and behavior of the container.

### Compulsory:

1.  **docker run**: This is the command's core part used to create and run containers.

2.  **IMAGE:** This part is specifically for the Docker image from which the container is created. Every dependency is included in an image, which is a read-only template.

In the most basic version of the command, where you need to create and run the container using the default settings, you just need 'docker run' and the Image ID or Name. **For example**:`docker run \[image_id_or_name\]`.

### Optional:

3.  **\[OPTIONS\]:** The configuration of the container features is made possible by various options, including networking, resource allocation, volumes, environment variables, and more.

4.  **\[COMMAND\] \[ARG...\]:** This part of the command allows you to run the specified '\[COMMAND\]' inside the container by overriding the default command of the image.

## Explanation of each part of the syntax with examples and screenshots

### Container image

The IMAGE parameter is specified right after 'docker run' in the command(if options are not specified) and requires an IMAGE Id or Name to search the image locally and pulls the image automatically from the docker hub repository if the image is not found locally.

**Syntax:** `docker run IMAGE`

**For Example, Let's run an image that exists locally:** We have an image with the name '**sample_docker_run**' in our local repository.

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-24-docker-run-command/image1.png"  alt="Docker run command with local image sample_docker_run" />
</div>

<br/>

**Example:** Let's run an image that does not exist locally but in the docker hub. We will use the 'Nginx' image that is not available locally but on the docker hub.

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-24-docker-run-command/image2.png"  alt="Docker pulling nginx image from Docker Hub" />
</div>

<br/>

1.  'nginx' image is not found locally, so 'docker run' will now pull the nginx image from the docker hub repository.

### Container options

Using different OPTIONS in the 'docker run' command, you can name the containers, map the ports, and set up the environment variables.

**Syntax:** `docker run \[OPTIONS\] IMAGE`

#### Naming the Container

**For example:** I want to name the container with the sample image in the docker run command.

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-24-docker-run-command/image3.png"  alt="Docker run with --name option assigning custom container name" />
</div>

<br/>

1.  Adding '--name' parameter along with the container name of our choice and the sample image.

2.  The specified name is assigned to the container of the sample image.

#### Mapping Port

**For example:** I want to map the port between the container and the host system that allows access to the containerized application on the host. Let's run my sample image container by mapping the port '8080:80'

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-24-docker-run-command/image4.png"  alt="Docker run with -p option mapping port 8080:80" />
</div>

<br/>

1.  Adding '-p' or '—publish' parameter along with the port to map against the container. In this example, we have mapped 8888:80 with the container name 'MapPortDockerRun' while using the 'docker run' command.

2.  The port has been mapped to the container.

#### Setting up Environment Variables

**Example:** I want to set up the value of the environment variable inside the container that is needed for the application configuration by using the docker run command.

**Here is the default value of my environment variable:**

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-24-docker-run-command/image5.png"  alt="Default environment variable value in container" />
</div>

<br/>

1.  Default value set against environment variable.

**Now, I have to change the default value to 'custom_value_set_up_via_docker_run'**

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-24-docker-run-command/image6.png"  alt="Docker run with -e option setting custom environment variable" />
</div>

<br/>

2.  Used '-e' or '--env' with the environment variable name and its value that I want to set up and get the desired results.

3.  As a result of assigning value through the 'docker run' options, the application successfully responds with the configured value.

### Command

The command parameter comes at the end of the 'docker run' command and allows you to run your defined command inside the container along with the arguments passed. There is a predefined entrypoint script for some images. Use the '—entrypoint' option to replace the entrypoint with your command.

**Syntax:** `docker run \[OPTIONS\] IMAGE \[COMMAND\]\[ARGS..\]`

**Example:** I want to change my default image(sample_docker_run) command by overriding the command passed through 'docker run'.

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-24-docker-run-command/image7.png"  alt="Docker run overriding default image command with echo" />
</div>

<br/>

1.  **Default Image(sample_docker_run) command:** echo **"**Hello, this is my custom image for Docker run command guide!"

2.  **Docker run command section that overrides the existing one:** echo "Hello, this is the custom image that has to override the defined command of docker image."

3.  '**echo'** is the command, and "**_Hello, this is the custom image that has to override the defined command of docker image."_** is the argument passed to the command for running it inside the container.

## Examples of using the Docker run command

### Basic examples

**Example:** Let's run the Friendica container, a platform for distributed messaging such as social media communication.

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-24-docker-run-command/image8.png"  alt="Docker pulling and running Friendica container" />
</div>

<br/>

1.  The command '**docker run friendica:fpm**' couldn't be able to find this image locally, so it pulled the image from the docker hub repository and started the new instance of Friendica.

**Example:** Now, we run another container of Friendica in detached mode with the port mapping so that you can access the Friendica installation wizard at <http://localhost:8080/> from your host system.

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-24-docker-run-command/image9.png"  alt="Friendica container in detached mode accessible at localhost:8080" />
</div>

<br/>

1.  The command 'docker run -d -p 8080:80 friendica' download the image from the docker hub repository and utilize the '-d' option to run this container in detached mode(running in the background) and also map the container with the '8080:80' port by utilizing the '-p' option.

2.  As a result, I can access the Friendica installation page from the host system(localhost) at port 8080.

## Advanced examples

### Run container in Network

**Example**: Let's create a network named 'advance-friendica-example' and run the Friendica container in that specific network as it allows the Friendica container to communicate with other containers in the same network.

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-24-docker-run-command/image10.png"  alt="Creating network and running Friendica container with --network option" />
</div>

<br/>

1.  We created our network with the name 'advance-friendica-example' using the 'docker network \[network_name\]' command.

2.  Once the network is created, we execute the **`docker run -d -p 8080:80 --network advance-friendica-example friendica`** command to run the Friendica container inside the specified network. As a result, it returns the container ID.

3.  Now, we check whether the container is running in the specified network or not; for that purpose, we run the command **`docker network inspect advance-friendica-example`** and compare the Container ID we got in the output of the second command.

### Run container with volumes

**Example:** We want to run the Friendica container with the volume, allowing us to mount the directory of our host system with the container.

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-24-docker-run-command/image11.png"  alt="Docker run with -v option mounting host directory to container" />
</div>

<br/>

1.  We use '-v' to mount the volume of the host system with the friendica container. In the above Example, we have executed the command '**_docker run -d -p 8080:80 -v path/to/host:/var/www/html friendica_**'. Where '**_path/to/host_**' is the path of the host machine, and '**_/var/www/html_**' is the path of the container directory.

2.  To ensure that the volume is successfully mounted, you can run 'docker inspect \<container_name_or_id\>' and then navigate to the 'mount' section of the output.

### Connecting Multiple Containers:

**Example:** Let's run the Redis container along with the friendica container in the newly created network name '**_advance-containers-connection_**' and ensure that both containers are connected by accessing the Redis container from the friendica container command line.

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-24-docker-run-command/image12.png"  alt="Connecting Redis and Friendica containers in same network" />
</div>

<br/>

1.  Run the Redis container inside the new network(i.e., '**advance-containers-connection**') with the name 'redis-container' and map the port of this container to '**6379**'

2.  Run the Friendica container by linking it with the 'redis-container', using the '**--link**' parameter along with the other container name required to link. Keep this container in the same network, i.e., '**advance-containers-connection**'.

3.  To check the connection between these two containers, switch to the Friendica container command line interface. For Example (**Run command**: `docker exec it \<friendica-container-id\> bash`).

4.  Once you switch to the Friendica command-line interface, use telnet to ping the Redis container(Command: `telnet redis 6379`) from the Friendica container. If you get the output 'Connected to Redis', both containers are connected Successfully.

**Note:** If your container does not have 'telnet', then you can install it by using the following commands:

- apt-get update

- apt-get install -y telnet

## 4. Best practices for using the Docker run command

### Security considerations

### Do not use root user

Using non-root users while running the containers is recommended to reduce the potential security risks. While executing the 'docker run' command, you can specify the user by using the '--user' parameter(For Example: `docker run --user myuser \<image\>`). You must also ensure that the specified user has only the necessary permissions to perform tasks.

### Restricting Container Capabilities

Restricting the container capabilities helps you to enhance your security, as by default, containers inherit the capabilities of the host system and allow access to all system resources. By using, 'the --cap-drop' and '--cap-add options', you can limit or add particular capabilities to containers.

### Isolating Containers

Docker provides different mechanisms to isolate containers. Two commonly used methods are user namespaces and Seccomp profiles; through user namespaces, you have a separate namespace for each container, which means if you enable user namespaces, then even the process in the container that has root access will only be able to utilize non-privileged user capabilities. Using Seccomp profiles divide the system calls into Whitelisted(allowed ones) and Blacklisted(Not Allowed), adding an additional layer of security.

## Performance considerations

### **Resource Allocation**

You must ensure containers have the resources they need to perform well by setting appropriate resource limits, as it prevents resource contention or system overload. It enhances the overall stability of the containerized environment while helping improve individual containers' performance.

### **Container Restart Policies**

This method is useful for ensuring the availability and resilience of your containers. Docker offers different restart policies to specify how containers should behave when they shut down or when the Docker daemon restarts. You can also automate the recovery process for container failures or system reboots using an appropriate restart policy.

### **Utilizing Cache Mechanisms**

Docker's caching features can speed up build and deployment times significantly. Layers can be cached and reused in later builds via Docker's layer caching feature if the instructions and their context haven't changed. The size of the final image can be decreased by using multi-stage builds, which separate the build environment from the runtime environment.

### Optimize Container Startup

It's important to reduce container starting time for efficient deployment and scalability. Minimizing unnecessary dependencies and processes in your container image is one method to accomplish this. Another method is to use multi-stage builds during the build process to keep the build environment separate from the final runtime environment.

## Summary

### Recap of the key points covered in the article, emphasizing the importance and versatility of the Docker run command

1.  'docker run' is the most important command for running containers as it allows you to control the behavior of containers by specifying the names of containers and images with a variety of other options.

2.  Through arguments like port mappings (-p), environment variables (-e), volumes (-v), and more, the command enables flexibility as you can customize container behavior according to the requirements of your application.

3.  By reusing cached layers, Docker caching technology and proper Dockerfile structure can reduce build and deployment times.

4.  In case of failures or system reboots, container restart rules can be configured to restart containers automatically.

5.  Using the Docker Run command, you can quickly prototype, test, and iterate on applications in isolated container environments.

6.  A huge set of precompiled images, which can be used with the command "Docker Run," is available in the extensive Docker Hub registry.

### Encouragement to further explore and experiment with the Docker run command to leverage its full potential:

The "docker run" command is a gateway to the vast world of Docker and containerization, as it will not only give you the power and flexibility to create a container that can be easily operated and managed but also allow you to explore different container images available in the Docker Hub or to create your own. Define multi-container applications, communicate among them, and simplify the deployment of your application. This is a constant improvement and learning journey as we embrace the "docker run" command. You can deepen your knowledge by engaging yourself in the community of Docker, reading documents, and participating in forums, as the docker run command is constantly evolving, and you need to keep up-to-date with the latest advancements.
