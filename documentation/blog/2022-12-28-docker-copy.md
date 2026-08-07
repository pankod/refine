---
title: How to Use Docker Copy Command
description: We'll discuss how to copy files in Docker using the docker copy command.
slug: docker-copy
authors: muhammad_khabbab
category: "Engineering"
tags: [docker]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-28-docker-copy/social.png
hide_table_of_contents: false
last_update: 2023-01-04
---

## Introduction

We will discuss how to copy files in Docker using the docker copy command. The `docker cp` command is a powerful command through which you can move files between your host file system and your Docker containers. It works with both files and directories.

## How to copy files in Docker

Copying important files and directories is an essential part of container building. There are three ways to copy files in Docker:

- `docker CP` command
- Dockerfile `COPY` command
- Using volume mounts

Today we will discuss the `docker cp` command in detail. We will also touch upon the `COPY` command in Dockerfile. Let’s start with the `docker cp` command first. `docker cp` is a powerful command through which you can move files between your host file system and your Docker containers. It works with both files and directories.
The `cp` command is the quickest way to copy files to and from docker container. The `cp` command is very similar to the unix “cp” command. The basic syntax of the command is as follows:
`docker cp <src> <dest>`

If you are running from the windows prompt, then you need to mention the container name/ID as part of the source. Let’s try one example. The `docker ps` command will display the running containers.

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-28-docker-copy/image1.png"  alt="Docker ps command showing running containers" />
</div>

<br/>

Note the ID of the running container you want the files to copied to. In above example the container ID is “613a1a58b70d”. If you have opened the terminal/CLI for a specific container, then no need to mention the container ID.

Now let’s find the files in the container through basic `ls` command.

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-28-docker-copy/image2.png"  alt="List files in container with ls command" />
</div>

<br/>

The below command will copy the file `app.js` from container to host file system in the folder `D:/DockerCopy`. Note the container ID is mentioned in the source.

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-28-docker-copy/image3.png"  alt="Docker cp copying file from container to host using ID" />
</div>

<br/>

Instead of ID, you can mention container name as well. See the example below:

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-28-docker-copy/image4.png"  alt="Docker cp copying file using container name" />
</div>

<br/>

Just reverse the command and you can copy the file from host file system to the container. The below example will copy a text file named “tocopy.txt” from host file system to the container.

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-28-docker-copy/image5.png"  alt="Docker cp copying text file from host to container" />
</div>

<br/>

To verify the successfully copy, run the `ls` command in the container terminal. You can see the file copied to container.

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-28-docker-copy/image6.png"  alt="Verifying file copied successfully with ls" />
</div>

<br/>

You can use the same command to copy not just single file but whole folder as well.

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-28-docker-copy/image7.png"  alt="Docker cp copying entire folder to container" />
</div>

<br/>

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-28-docker-copy/image8.png"  alt="Verifying folder copied successfully" />
</div>

<br/>

Note that the docker `cp` command assumes that container path is relative to the container's / (root) directory. Also, the `cp` command will work regardless of container is running or stopped.

There are only two optional arguments for this command:
`-a: Archive mode. It preserves all uid/gid information of the files to be copied`
`-L: Always follow symbolic links in SRC`

You can also use the `docker cp` command to copy files between two containers. Just use the container name or ID in the source and destination paths.

## Copy through Dockerfile
Let’s discuss how to copy files through dockerfile copy command. The basic purpose of Dockerfile is to build Docker image, which is then converted into Docker containers. Dockerfiles can contain different commands, one of which is `COPY`. The `COPY` command allows us to copy a file or folder from the host system into the docker image. The copied files become a part of every container that is created from that docker image.

The syntax is same as the cp command discussed above:
`COPY <source> <destination>`
The below example will copy index.html to the container to replace the default index.html file.
`…
COPY index.html /var/www/html
…`
If you build the docker image and run the container, you will see the file will be copied. Note that the `COPY` command cannot be used copy files between your host and a running container. The sole purpose of `COPY` command is to add files in the docker image during the construction process.

## How docker copy command works

The `docker cp` command is used to copy files to/from your docker container to the host file system. This command works even if the container is not running. As Docker uses layers for storing images, when you run the container, Docker creates another layer on top of the existing layer. The new layer contains all the changes done inside the container. Note that it is not a data volume like a file system or a directory that we can mount directly to a docker container. The data inside the container is managed by the storage driver. Data is present inside the block level of the parent image of the container, and this is where the `cp` command is executed. Container is actually a snapshot of the image so it does not have the block, but it has a pointer to the block on the nearest parent image where it is actually residing. It reads the respective block from there and copies it upon execution of `docker cp` command.

## Difference between Copy and Add command

The `ADD` command has been there even before the `cp` command. Although the `cp` command essentially performs the same function i.e. copying files and folders to a docker container. However, there are a few additional features in the `Add` command.

1. You can mention a URL as source. The command will download the files from the URL and will copy them to the destination.
   `ADD http://website.com/folder  /destination/folder`
   The above command will download all files from the source folder and will copy them to the destination folder of the container.

2. You can mention a compressed file in the source, and it will decompress the contents and then copy them to the destination.
   `ADD source.file.gzip /destination/folder`
   The above example will extract the contents of a local zip file to the destination folder. Note that you cannot mention a URL of a compressed file as a source; the compressed file must be from the local file system. This technique will stop creating an additional image layer and will save space too.

However, in spite of all the extra features provided by `ADD` command, Docker discourages its use because of safety reasons. Docker suggests using only the `cp` command if copying a local file. If you want to download and copy files from the internet, then it suggests using the `curl` command with a `RUN` command.
The only recommended use of `ADD` is to extract the local tar file into the image, as shown in below example:
`ADD rootfs.tar.xz /`

## Limitations of Copy command

Despite of all he usefulness of Docker `cp` command, it has certain limitations, as below:

- You cannot use it to copy files between two containers. You will need to multi-stage it by copying files from container 1 to a host file system and then copying from the host file system to container 2
- You cannot use it to download files from a URL and then copy them. Files must be present on the local file system
- You cannot copy certain system files such as resources under `/proc`, `/sys`, `/dev`, `tmpfs`, etc.

## When should you use Docker copy

Following are some of the common use cases for the docker copy command.

- You can copy any important file from inside a docker container to the host file system, which will allow you to create a custom docker image the way you want it. E.g. you can run the official Nginx docker image and then use the `COPY` command to copy the Nginx configuration file to the host file system

- `docker cp` is very useful when debugging containers or when working in a non-production environment. If you have to manually inject a temporary configuration file or extract a buried log, it can be extremely helpful. Using `docker cp` is more convenient and faster than rebuilding the entire image every time you update the code.
