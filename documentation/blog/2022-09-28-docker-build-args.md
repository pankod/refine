---
title: How to use Docker Build Args and Environment Variables
description: A guide for using Docker Build Args to Configure Image Builds
slug: docker-build-args-and-env-vars
authors: muhammad_khabbab
category: "Engineering"
tags: [docker]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-28-docker-build-args/social.png
hide_table_of_contents: false
last_update: 2022-12-16
---

## Introduction

Containerization is a core part of modern application development, and docker containers have changed how development teams deploy their applications. As part of standard practices of containerization, it is crucial to manage the build arguments and environment variables through proper configuration instead of just hard coding them.

Today, we will discuss docker ARG and ENV variables in detail. We will go through various examples of dockerfile and docker compose for build arguments and env variables. As security is an inevitable part of containerization, we will discuss securing the env parameters and secrets.

Let’s start with the difference between ARG and ENV variables and their best use cases.

## Build arg vs. Env arg

ARG and ENV are dockerfile instructions through which you can apply the different configurations. However, both look pretty similar when you look at the dockerfile. Some of the notable differences between these two are below:

- ARG parameters are applied only during the docker image building process; they are unavailable once you have built the image.
- The running containers cannot access ARG values.
- Some examples of ARG arguments include a version of your Ubuntu or a version of a library.
- You can specify a default value for ARG parameters in dockerfile, and you can modify them during the creation of the build
- You can pass ENV variables not only during the image building but also at runtime when your containers are running
- ENV variables are usually your API keys, database URLs, secret keys, etc.
- Like ARG variables, the ENV can also have a default value in the dockerfile. You can override ENV values set in a Dockerfile by providing updated ENV values through your docker-compose.yml file or Docker CLI.

See the below diagram to understand the difference between ARG and ENV.

<div class="img-container" align-items="center" >
   <img style={{alignSelf:"center", width:"400px"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-28-docker-build-args/docker-environment-build-args.png"  alt="Docker build-time vs runtime environment variables comparison" />

</div>

<br/>

[Diagram Source](https://vsupalov.com/docker-arg-vs-env/)

## How to pass arg variables

Find below a snippet from a dockerfile where you can see two build ARG values, one for the Ubuntu version and the other for the CUDA library version.

```
ARG UBUNTU_VERSION=18.01 //Default value provided

FROM ubuntu:${UBUNTU_VERSION}

ARG CUDA_VERSION=9.0 //Default value provided

RUN echo ${CUDA_VERSION}
RUN echo ${UBUNTU_VERSION}
```

In the above snippet, docker expects two values to be passed at build time. The Cuda version and Ubuntu version. Here is how you will pass these two parameters when building the image:

```
docker build -t nodejs-server -f Dockerfile.arg --build-arg UBUNTU_VERSION=18.04
--build-arg CUDA_VERSION=10.0
```

After you execute the above, the docker will build the image with Ubuntu version 18.04 and Cuda version 10.0. When passing multiple build arguments, you need to append the flag of `--build-arg` for every ARG argument.

Note the placement of the ARG tag. As explained on the official docker site [here](https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact), An ARG argument declared before “FROM” is outside of the build stage, so you cannot use it in any instruction after a “FROM”. If you want to reuse the same ARG again, you must repeat it after the “FROM”.

If you pass an ARG at build time but that ARG argument is absent from your dockerfile, you will see a warning or an error (depending on your docker version).

See below an example from docker compose:

```
build:
	context: .
	args:
		UBUNTU_VERSION: 18.04
		CUDA_VERSION: 10.0
```

Docker compose dynamically updates the ARG values declared in the dockerfile. If we do not provide default values in the docker compose, then docker will pick the values from the shell environment in which docker compose is running. In the below example, docker will pick the values from the shell environment.

```
build:
	context: .
	args:
		UBUNTU_VERSION
		CUDA_VERSION
```

## How to pass env variables

There are many ways you can pass the ENV values, such as:

1. Provide their values in the dockerfile
2. Define them in dockerfile but set their value when running a container
3. Use ARG variables to set ENV values

Here is a snippet from a dockerfile below.

```
ARG CUDA_VERSION
# no default value
ENV ENV_CUDA _VERSION

# a default value
ENV ENV_CUDA_VERSION 18.04

# this syntax is also fine
ENV ENV_CUDA _VERSION=18.04

# Using ARG to set ENV
ENV ENV_CUDA_VERSION =$CUDA_VERSION

```

Let’s pass the ENV value from the command line.
`$ docker run -e ENV_CUDA_VERSION =18.04 alpine env`

If the ENV variable is present in the environment shell, then the docker will pick the value even from the shell. See the below example.

`$ docker run -e ENV_CUDA_VERSION alpine env //value will be picked from environment shell`

You can access the ENV value in your code through `process.env.ENV_CUDA_VERSION`

If we look at the docker compose version of ENV values, it is pretty straightforward.

```
services:
 database: image: "postgres:${POSTGRES_VERSION}"
 environment:
	DBNAME: productsdb
	 DBUSER: "${USER}
```

In the above example, the value of “DBNAME” is static, but the value of “DBUSER” is dynamic. You can set the value of “DBUSER” parameter dynamically during the “build” or “up” process like below:

```
DBUSER=guest docker-compose build
DBUSER=guest docker-compose up
```

However, due to security issues, specifying the ENV value directly in the dockerfile or compose file is not recommended. Passing build arguments dynamically through the command leaves traces in the docker image. Furthermore, you can only pass a couple of ENV values through the command.

What if you have a dozen or more ENV parameters for dynamic substitution? That brings us to the solution of the ENV file.

## Using ENV file

Using ENV files is the recommended way of specifying your configuration in non-production environment. For production, especially in the cloud-based production environment, you should take advantage of a cloud-managed service (AWS parameter store, Azure key vault, etc.) for specifying values of ENV.

The usage of .ENV file is straightforward. Just mention key-value pairs in a file, and name it with .env extension as below:

```
env_var1_name=value
env_var1_name=value
```

Now as soon as you tell docker about this file, all the ENV variables mentioned in the .ENV file will be accessible to the application code. Here is how to mention .ENV file when running docker:

```
docker run --env-file= myenvfile.env alpine env
```

Similarly, you can mention your .ENV file in docker compose as below:

```
services:
  web:
    env_file: myenvfile.env
```

You can also pass the .env file to docker compose as below:

```
docker-compose --env-file /path/ myenvfile.env config
```

Considering that there are many places you can mention the value of an ENV parameter, you need to remember the order of priority for docker. Below is the order of preference from top to bottom, in which docker will pick the value for ENV parameters.

1. Compose file
2. Shell environment variables
3. Environment file
4. Dockerfile

## How to secure your environment variables in docker

The build arguments generally and ENV values especially contain sensitive information you would not like to get leaked easily. Even if you pass any build secrets through `–build-arg` , the secrets are still included in the docker image.

Security is particularly crucial for ENV values which are usually the API keys, secret keys, payment-related keys, etc. Securing your build or ENV variables is inevitable for your application. Although there are multiple ways to secure the ENV parameters, our recommended way is to use docker buildkit and `–secret` flag.

Here is how to do it:

1. Set the environment variable `DOCKER_BUILDKIT=1`

2. Add below to the top of your dockerfile. This will ensure the docker build will use the latest 1.x version of the Dockerfile syntax
   `# syntax = docker/dockerfile:1`

3. Use the `--secret` argument to docker `build` command. The parameter `id` is any string of your choice.
   `DOCKER_BUILDKIT=1 docker build --secret id=mysecret,src=mysecrets.env...`

4. Now mount the file having your secrets or ENV values. The `id` here must match the `id` passed in the docker build command above.
   `RUN --mount=type=secret,id=mysecret … `

If you are using docker swarms, you can also take advantage of [docker secrets](https://docs.docker.com/engine/swarm/secrets/) to secure your configuration parameters.

## Conclusion

Today, we discussed how to use docker ARG and ENV parameters. The ARG arguments are only available when building the image, while ENV parameters are available to the application containers during build and when the container is running.

We presented the relevant examples for both dockerfile and docker compose. As docker caches the image layers, securing the secret configuration and ENV variables is also a must-do task. We presented the best way to integrate your .env files with docker in a secure manner.
