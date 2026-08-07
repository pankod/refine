---
title: A Complete Guide to Listing Docker Containers
description: We'll discuss the importance of listing docker containers, how to list running and stopped containers, listing the latest containers, and how to disable truncation of container names.
slug: docker-list-containers
authors: muhammad_khabbab
category: "Engineering"
tags: [docker]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-06-docker-list-containers/social.png
hide_table_of_contents: false
---

## Brief overview of the importance of listing Docker containers

Listing containers is an essential task if you are working with containerized applications as this allows you to see the running container on a Docker host, monitor their health, efficiently utilize the resource, help identify potential causes of the problem, help balance loads, organize container placement, and also take care of security by checking the presence of unauthorized or malicious containers.

## Listing Running Containers

### docker ps command to list only the running containers:

You might have created many containers. Some are running, but some are stopped. Now, you will execute the ‘**docker ps**’ command for listing docker containers, but executing this command will show you only running containers by default.

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-06-docker-list-containers/image1.png"  alt="docker ps output showing running containers" />
</div>

<br/>

### Explanation of the columns displayed in the output:

Once you have executed the ‘**docker ps**’ command, you can see the following output against each running container based on seven different columns.

1.  **Container Id:** This column contains the identity mapped to each container running.

2.  **Image:** This is an image of each container specifically used to create that container.

3.  **Command:** Command executed in the background to initialize and run each container.

4.  **Created:** Timestamp when each container is created.

5.  **Status:** The current state of each container that can be running, exited, paused, removing, restarting etc.

6.  **Ports:** Ports are bind to each container, and they will help you to access the service inside each container by utilizing the host port. For Example, if host port 8080 is bind to container port 80, then you can be able to access the container web content by using ‘http://localhost:8080’ URL on your local machine.

7.  **Names:** Each running container has a unique name assigned to them.

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-06-docker-list-containers/image2.png"  alt="docker ps columns and container details" />
</div>

<br/>

## Listing All Containers

### docker ps -a command to list all containers, including the stopped ones:

If you want to see all containers, add a keyword with the ‘**docker ps**’ command, i.e., ‘-a’. This command will show you all containers, whether they are running, restarting, paused, or stopped.

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-06-docker-list-containers/image3.png"  alt="docker ps -a output listing all containers" />
</div>

<br/>

### Differentiating between running and stopped containers in the output:

In the output of the ‘**docker ps -a**’ command, you can distinguish between running and stopped containers by looking at the ‘STATUS’ column. If the value is ‘up 3 hours’, the container has been running for the last 3 hours, and if the value is ‘Exited 4 hours go’, the container was stopped 4 hours ago.

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-06-docker-list-containers/image4.png"  alt="Container status values for running and exited" />
</div>

<br/>

## Listing Latest Containers

### docker ps -l command to list the latest created container

‘**docker ps -l**’ is used to list the latest container created, but the ‘-l’ keyword is depreciated in recent versions of docker. Instead of ‘-l’, you can use ‘docker ps -n 1’ to see the latest one. Using ‘**docker ps -n 1**’, it is important to set the limit of showing the latest containers; you must add the number of limits after the ‘-n’ keyword. For Example, if you want to list the last 5 latest containers created, then you can execute ‘**docker ps -n 5**’.

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-06-docker-list-containers/image5.png"  alt="docker ps -n 1 output for latest container" />
</div>

<br/>

## Explanation of the usefulness in scenarios where the latest container is of interest

### Rollback on encountering issues with the latest update:

Suppose you regularly deploy new updates to your containerized application, and anything goes wrong after the last update. In that case, this command will help you easily identify most latest containers created since the last update for immediate rollback to the older version.

### Limitation on resources for container deployment:

Suppose you have limited resources(CPU/RAM/Storage etc.) and want an effective allocation of resources; for that, you need to have a track of the resource utilized by the most recent containers created, and this command will help you list them all to make a change in their configuration to ensure efficiency.

## Disabling Truncation

### docker ps --no-trunc command to disable truncation of container names

When you run the command ‘**docker ps**’ you will find out that in output, the values of a few columns are truncating, making it difficult to understand, especially when you need full container ids or image names. For that purpose, you need to use ‘**docker ps –no-trunc**’, which will turn off the docker default truncating feature and give you a full view of values in the output.

### Displaying full values in the output:

Following is the example output after disabling docker default truncation by using the ‘**docker ps –no-trunc**’ command:

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-06-docker-list-containers/image6.png"  alt="docker ps --no-trunc output with full values" />
</div>

<br/>

## Listing the ID Only (Quiet Mode)

### docker ps -q command to list only the container IDs in quiet mode

Most of the time, in the ‘**docker ps**’ command output, the additional information except Container ids is not useful for you, and instead of showing images, ports, names, etc., against each container in the output, you only want to list the container ids, then for this purpose, there is a specific command, i.e., ‘**docker ps -q**’ that will customize your output to only display container ids.

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-06-docker-list-containers/image7.PNG"  alt="docker ps -q output of container IDs" />
</div>

<br/>

## Suitable for scenarios where only the container IDs are required:

### Orchestration Environment

Most companies, especially enterprises, use orchestration tools like Kubernetes and docker swarm. These orchestration tools often utilize Container IDs to manage and schedule containers. You can retrieve a container ID and run operations on containers in the orchestration environment using docker ps -q.

### Connecting Containers

In a distributed architecture, we usually must establish a connection between containers for resource sharing, network connectivity, and scalability. For creating a connection between containers, we need to have IDs specific to them. Using the command ‘docker ps -q’, we can quickly fetch the required ids to create a connection.

## Viewing Container Size

### docker ps --size command to display the size of containers

As we have discussed earlier in the ‘**Listing Latest Containers**’ scenarios section that, we might have limited resources, so to avoid unnecessary usage, we need to monitor the resource utilization by each container. This specific command will facilitate us by representing the disk space utilized by each container and allow us to quickly identify containers that consume large amounts of space on the disk to take the appropriate actions.

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-06-docker-list-containers/image8.PNG"  alt="docker ps --size output with size column" />
</div>

<br/>

## Understanding the additional size column in the output.

The ‘**docker ps --size**’ command will add an additional column to the list of containers output that represents the Actual Size(overall size) and Virtual Size utilized by each container.

**Actual Size:** The size utilized by the writable container layer consists of the container’s filesystem and any modifications made.

**Virtual Size:** If each layer in a container were to be separated and not shared, the virtual size is the total amount of disk space required. The combined size of all the container's layers, which include any shares, base pictures, and additional layers, comes under the virtual size.

## Customizing the Output

### docker ps --format command to customize the output format using Go templates

Suppose you want to get the customized output that will only contain the column of your choice while listing your containers. In that case, you can use ‘docker ps’ with the keyword ‘--format’ along with the Go template string that is directly integrated with docker and can be used simply with the docker command because its syntax is native to the ‘Go Programming Language’ on which the docker is itself built. The command will look something like this ‘**docker ps –format** “**GOTEMPLATE**” ’.

**Go Template String Syntax:** docker ps --format "ID: {{.ID}}, Name: {{.Names}}, Image: {{.Image}}, Status: {{.Status}}"

Double curly brackets {{}} are used to denote placeholders that relate to particular container properties such as ID, Names, Image, and Status. These placeholders will be replaced by actual values when you run the command.

## Examples of customizing the displayed information

Let’s customize an output that only displays Container ID, Image, and Name:

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-06-docker-list-containers/image9.png"  alt="docker ps --format output with selected columns" />
</div>

<br/>

> Let’s customize an output that displays the latest containers with Container ID, Status, and additional column SIZE:

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-06-docker-list-containers/image10.png"  alt="Formatted output including container size" />
</div>

<br/>

## Using Advanced Filters

### docker ps --filter command to apply advanced filters for listing specific containers

Docker also provides advanced filtering options that will allow you to list the containers based on different attributes and conditions of your choice. All you need to do is to add ‘--filter’ keyword with the key-value pair. ‘Key’ will be the name of an attribute of the container on which you want to filter, and ‘Value’ will be the condition you want to apply to that attribute. An interesting fact about the filter keyword is that you can repeat it multiple times with different conditions.

## Filtering based on various criteria such as name, label, status, etc.

**Filtering Based on Name:** Only show the container with the name ‘admiring_benz’(**Command**: ‘docker ps –filter “name=admiring_benz”’)

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-06-docker-list-containers/image11.png"  alt="docker ps --filter name output" />
</div>

<br/>

**Filtering Based on Status:** Filter output based on different statuses e.g exited, created or running etc.

**Commands**: docker ps –filter “status=running”, docker ps –filter “status=exited”, docker ps –filter “status=created”

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-06-docker-list-containers/image12.png"  alt="docker ps --filter status output" />
</div>

<br/>

**Filtering Based on Label:** Filter output by using Filter keyword multiple times for status attribute and label conditioning.(**Command**: docker ps --filter "status=created" --filter "label=com.example.version=1.0")

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-06-06-docker-list-containers/image13.PNG"  alt="docker ps --filter label output" />
</div>

<br/>

## Conclusion

## Recap of the different options and commands covered

1.  'docker ps' command can be use to list all containers that are running.

2.  By using 'docker ps' command with other options('docker ps -n 5'/'docker ps -l', 'docker ps -a', 'docker ps -q') we can achieve the output with the list of the latest containers, containers with ids only and containers in different states(running, stopped, created, etc.)

3.  The output of 'docker ps' command can be customized by adding a format keyword followed by the Go Template in the command(e.g docker ps –format "TEMPLATE").

4.  We can also use advance filters based on attributes to get the result with specific containers against 'docker ps' command.

5.  The actual and Virtual size of each container can be added and viewed in additional column of the container list by using '--size' keyword with 'docker ps' command(e.g docker ps --size).

## Final thoughts on the usefulness of Docker container listing

1.  Container listing is useful for container management to view all created containers comprehensively.

2.  It is useful in connecting different containers to share resources and monitor container-specific health and performance.

3.  Integrating container listing commands in scripts, third-party monitoring systems, and orchestration tools will help to accomplish automated workflows.

4.  Container listing will also assist in identifying the bug in the containerized environment by using them with logging, allowing you to examine each container's details.
