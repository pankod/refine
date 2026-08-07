---
title: Docker Cheat Sheet - Most Commonly Used Commands
description: A reference guide highlighting essential Docker commands to streamline container management tasks efficiently.
slug: docker-cheat-sheet
authors: muhammad_khabbab
category: "Engineering"
tags: [docker, dev-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-12-docker-cheat-sheet/social.png
hide_table_of_contents: false
---

## Introduction

This article will serve us a quick cheat sheet for developers using dockers in their applications. All the major commands related to networking, containers, volumes, images will be discussed along with the sample output for each command. You should bookmark this article as quick guide for Docker common commands which are part of every developer's routine. Let's get started.

## Setting Up and Configuring Docker

### Installation

The command to install Docker varies depending on your operating system. For instance, on Ubuntu, you'd use `sudo apt-get install docker-ce`. On CentOS, it would be `sudo yum install docker`. For windows, you can use Docker desktop.

**Expert Tip:** You will need to have user permissions to execute Docker commands or the use of sudo in environments where the user is not part of the docker group.

### Version Check

To verify your Docker installation and check its version, run `docker --version`. You should see something like this: `Docker version 20.10.5, build 55c4c88`.

## Working with Docker Images

### Searching for Images

To search Docker Hub for images, use `docker search <image-name>`. For example, `docker search ubuntu` will return a list of available Ubuntu images.

```bash
$ docker search ubuntu
NAME                              DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
ubuntu                            Ubuntu is a Debian-based Linux operating sys…   11486     [OK]
dorowu/ubuntu-desktop-lxde-vnc    Docker image to provide HTML5 VNC interface …   438                  [OK]
rastasheep/ubuntu-sshd            Dockerized SSH service, built on top of offi…   246                  [OK]
consol/ubuntu-xfce-vnc            Ubuntu container with "headless" VNC session…   240                  [OK]
```

### Pulling an Image

To download an image from Docker Hub, use `docker pull <image-name>`. For instance, `docker pull ubuntu` will download the latest Ubuntu image. You’ll see the download progress and a message when it’s complete.

```bash
$ docker pull ubuntu
Using default tag: latest
latest: Pulling from library/ubuntu
Digest: sha256:adf73ca014822ad8237623d388cedf4d5346aa72c270c5acc01431cc93e18e2ba
Status: Downloaded newer image for ubuntu:latest
docker.io/library/ubuntu:latest

```

### Listing Images

To display all images downloaded on your system, run `docker images`. This will display a list of all images, along with their repository, tag, ID, creation date, and size. For example, after pulling the Ubuntu image, running `docker images` might show something like this:

```bash
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              latest              4e5021d210f6        2 weeks ago         64.2MB

```

### Removing an Image

To delete an image from your local storage, use `docker rmi <image-name>`. For example, `docker rmi ubuntu` will remove the Ubuntu image. You’ll get a confirmation message once it’s removed.

```bash
$ docker rmi ubuntu
Untagged: ubuntu:latest
Untagged: ubuntu@sha256:adf73ca014822ad8237623d388cedf4d5346aa72c270c5acc01431cc93e18e2ba
Deleted: sha256:4e5021d210f6a5119055cfb8e6c5e34be10e23a3db291c6a695f2c9cc40a8a66
Deleted: sha256:0b1edfbffd27c935a66664f7a4e3b25c2fc8a5739fa5e640b1768b129a2f60a9
Deleted: sha256:ba3557a56b150f9b813f9d02274d62914fd8fce120dd374d9ee17b87cf1a783d
Deleted: sha256:5bd56d818842930a650377334a15b6e2050f593e15a478c5b44976c2e59e293b
Deleted: sha256:22e2898808471c9a3a8ba9f9f8d7e0228303cf3a7c3a0a0898d55c6a50cbb8e6
```

## Managing Containers

### Running a Container

To start a new container from an image, use `docker run <options> <image-name>`. For example, `docker run -d -p 80:80 nginx` will start a new container from the nginx image in detached mode and map port 80 of the container to port 80 of the host.

```bash
$ docker run -d -p 80:80 nginx
Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
Digest: sha256:23b4dcdf0d34d4a129755fc6f52e1c6e23bb34ea011b315d87e193033bcd1b68
Status: Downloaded newer image for nginx:latest
d9a23308c7d2e5c0aadd7813de3c5b7a3c3a7a2b2b1bbe1a3ab3e6f6e0a2e020

```

### Listing Running Containers

To view all active containers, run `docker ps`. This will display a list of running containers along with their ID, image, command, creation time, status, ports, and names.

```bash
$ docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                               NAMES
d9a23308c7d2   nginx     "/docker-entrypoint.…"   36 seconds ago   Up 35 seconds   0.0.0.0:80->80/tcp, :::80->80/tcp   serene_leavitt
```

### Listing All Containers

To include inactive containers in the list, use `docker ps -a`.

```bash
$ docker ps -a
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS                      PORTS     NAMES
d9a23308c7d2   nginx     "/docker-entrypoint.…"   36 seconds ago   Up 35 seconds               80/tcp    serene_leavitt
45a1529327b2   ubuntu    "/bin/bash"              2 days ago        Exited (0) 2 days ago                 nostalgic_morse
```

### Stopping a Container

To halt a running container, use `docker stop <container-id>`. For example, `docker stop d9a23308c7d2` will stop the container with the ID `d9a23308c7d2`.

```bash
$ docker stop d9a23308c7d2
d9a23308c7d2
```

### Removing a Container

To delete a container from the system, use `docker rm <container-id>`. For example, `docker rm d9a23308c7d2` will remove the container with the ID `d9a23308c7d2`.

```bash
$ docker rm d9a23308c7d2
d9a23308c7d2
```

## Docker Networking

### Listing Networks

To display all Docker networks, use `docker network ls`. This will show a list of networks along with their ID, name, and driver.

```bash
$ docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
7fca4eb8c647   bridge    bridge    local
9f904ee27bf5   host      host      local
cf03ee007fb4   none      null      local
```

### Inspecting a Network

To view detailed information about a network, use `docker network inspect <network-name>`. This will return a JSON formatted details of the network.

```bash
$ docker network inspect bridge
[
    {
        "Name": "bridge",
        "Id": "7fca4eb8c647e57e9d46c32714271e0c3fa6ed54945f675632e65b2ff97d4e6a",
        "Created": "2021-02-18T20:46:38.3253083Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {},
        "Options": {
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1500"
        },
        "Labels": {}
    }
]
```

### Creating a Network

To set up a new network, use `docker network create <network-name>`. This will return the ID of the newly created network.

```bash
$ docker network create my_network
82b1d35f5d92f3a63f9062c2bea2afea2200b627b1c72c8ed835e4c8d80f0a6e
```

## Volumes and Data Management

### Creating a Volume

The command to create a volume is quite straightforward. You just need to specify the name of the volume you want to create.

```bash
docker volume create my-volume
```

When you run this command, Docker creates a new volume with the name `my-volume`. The output of the command will be the name of the volume, which confirms that the volume has been created.

```bash
my-volume
```

### Listing Volumes

To display all the volumes that are currently in the system, you can use the `docker volume ls` command. This command lists all the volumes that Docker has currently registered.

```bash
docker volume ls
```

The output of this command will be a list of all the volumes. Each line will represent a volume and will display the driver used for the volume and the name of the volume.

```bash
DRIVER    VOLUME NAME
local     my-volume
```

### Inspecting a Volume

If you need detailed information about a volume, you can use the `docker volume inspect` command. This command takes the name of the volume as an argument.

```bash
docker volume inspect my-volume
```

The output of this command is a JSON object that describes the given volume. This includes details such as the location of the volume on the host machine, the labels associated with the volume, and the options that have been set on the volume.

```json
[
  {
    "CreatedAt": "2024-02-08T09:29:00Z",
    "Driver": "local",
    "Labels": {},
    "Mountpoint": "/var/lib/docker/volumes/my-volume/_data",
    "Name": "my-volume",
    "Options": {},
    "Scope": "local"
  }
]
```

## Docker Compose and Dockerfile

### Running Docker Compose

To start all services defined in a `docker-compose.yml` file, you can use the `docker-compose up` command. This command starts all the services as per the configuration in the `docker-compose.yml` file.

```bash
docker-compose up
```

The output of this command will be the startup logs of all containers defined in the compose file. It will show the status of each service as it starts up.

```bash
Starting db ... done
Starting web ... done
```

Note that starting with Docker Compose version 1.28.0, the use of `docker-compose` commands has been deprecated in favor of the `docker compose` command (without the hyphen) as part of Docker's consolidation of functionality.

### Stopping Docker Compose Services

To halt services started with `docker-compose up`, you can use the `docker-compose down` command. This command stops all the running services.

```bash
docker-compose down
```

The output of this command will be the status of each service as it shuts down.

```bash
Stopping web ... done
Stopping db ... done
Removing web ... done
Removing db ... done
```

### Dockerfile

#### Building an Image from a Dockerfile

To create an image based on the Dockerfile in the current directory, you can use the `docker build` command. You need to specify a tag for the image.

```bash
docker build -t my-image .
```

The output of this command will be the status of each step of the build process.

```bash
Sending build context to Docker daemon  2.048kB
Step 1/3 : FROM alpine:latest
 ---> e7d92cdc71fe
Step 2/3 : RUN apk add --no-cache python3 py3-pip
 ---> Using cache
 ---> 3cf235f6a938
Successfully built 3cf235f6a938
Successfully tagged my-image:latest
```

### Cleaning Up

Docker provides a command to clean up unused containers, networks, images, and volumes. This is useful to free up system resources.

### Removing Unused Docker Objects

To clean up unused Docker objects, you can use the `docker system prune` command.

```bash
docker system prune
```

The output of this command will be the status of the cleanup process.

```bash
Total reclaimed space: 1.24GB
```

## Conclusion

If you have gone through this article, you will not have any issue in most of the Docker commands that are used frequently in daily operations. Whether it is management of images, networking, containers, volumes, etc., this article provides details on each of the important commands along with the example output for your complete understanding. Keep using this guide to increase your productivity and make your containerized application a success.
