---
title: How to use Docker Exec command?
description: We'll go over the Docker exec command syntax, usage as well as some examples.
slug: docker-exec
authors: muhammad_khabbab
category: "Engineering"
tags: [docker]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-18-docker-exec/social.png
hide_table_of_contents: false
last_update: 2023-11-29
---

## Introduction

Docker has evolved into a critical tool in the modern industry, simplifying software development and deployment. Its containerization ensures that applications behave consistently across environments, while its efficiency and scalability result in shorter cycles and lower costs. When building or deploying containers, you'll frequently need to inspect or debug a running container's current state.

Docker provides the `docker exec` command to launch applications in already running containers. It enables you to launch a session within the container's default directory. When the container is restarted, sessions created with the exec command are not resumed. Docker exec is a command that allows any provided command to be executed within a Docker container. This implies that the inputs supplied to it will be interpreted as commands to be executed within the container. It improves application availability, performance and efficiency by enabling real-time updates and continuous monitoring of containers.

Steps we'll cover in this guide:

- [Understanding Docker Exec Command](#3-understanding-docker-exec-command)
- [Interactive Mode with Docker Exec](#interactive-mode-with-docker-exec)
- [Running Specific Commands in a Docker Container](#running-specific-commands-in-a-docker-container)
- [Running a Background Process in a Docker Container](#running-a-background-process-in-a-docker-container)
- [How to Exit a Docker Exec Command](#how-to-exit-a-docker-exec-command)
- [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)

## Prerequisites

**Docker Installation:** Docker must be installed on your machine. Docker's official website includes installation instructions for many operating systems. In order to install Docker on your machine, please visit: <https://docs.docker.com/engine/install/>

**Understanding of Docker Command Line Interface:** Docker is generally administered via the command line, thus, a basic understanding of the command line interface is required. Understanding fundamental commands and navigating the terminal will be useful. Please make sure to prepend the sudo commands in this guide if you are going to use Docker as a root user.

**Running Container:** We need to create a container for running the `docker exec` command. For example, we create a "**test-container**" by running the following command:

Running Container Command

```tsx
docker run -d --name container-name alpine watch "date >> /var/log/date.log"
```

While creating the container, we utilized a few options like '**-d**' to run the container by detaching it from the terminal. We created an alpine container and used 'watch' to iteratively run the command "**_date \>\> /var/log/date.log_**". The provided command inside the docker run command will print the date in the logs after every two seconds.

After successfully installing Docker, use the following command to check the version:

Detailed Docker Version Information Command

```tsx
docker version
```

This docker version command provides further information about the Docker engine version present on your system.

Alternatively, you can execute the following command, which simply outputs the docker version and no other information:

Only Docker Version Command

```tsx
Docker –version
```

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-18-docker-exec/image1.png"  alt="Docker version command output" />
</div>

<br/>

## 3. Understanding Docker Exec Command

Docker exec Syntax

```tsx
docker exec <options> <container_name_or_container_id> <command>
```

1.  **docker exec:** The docker exec keyword must be used to run a command on a currently running Docker container.

2.  **\<options\>:** Depending on the scenario, we may specify several flags that are compatible with the docker exec command as an option. Each option serves the following purpose:

- **-d, --detach=true\|false**

Detached mode is to run the command in the background. The default value is false.

- **--detach-keys=""**

Override the key sequence to detach the container. The format can be a single character like **_\[a-Z\] or ctrl-\<value\>_** where **_\<value\>_** is one of*: **a-z, @, ^, \[, , or \_**.*

- **-i, --interactive=true\|false**

Keep STDIN open even if not attached. The default is false.

- **--privileged=true\|false**

Give the process extended capabilities when running in a container. The default is false. Without this flag, the process run by the docker exec in a running container has the same capabilities as the container, which may be limited. Set --privileged to give all capabilities to the process.

- **-t, --tty=true\|false**

Allocate a pseudo-TTY. The default is false.

- **-u, --user=""**

Sets the username or UID used and, optionally the group name or GID for the specified command.

3.  **\<container_name_or_container_id \>:** You can define container information, such as a container ID or name, with the exec command to assist in identifying the running container in the Docker environment.

4.  **\<command\>:** We can define the command in the exec command as needed, and that specific command will run inside the container.

**Examples of different `docker exec` commands**

**Example 1:** Creating the file inside the container into the root directory by using '**docker exec**'.

Docker exec Create New File command

```tsx
docker exec -i test-container touch /newfile
```

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-18-docker-exec/image2.png"  alt="Docker exec creating new file in container root directory" />
</div>

<br/>

**Example 2:** We want to list all the running processes within the specific container by using 'docker exec'.

List Running Processes Command

```tsx
docker exec -i test-container ps
```

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-18-docker-exec/image3.png"  alt="Docker exec listing running processes in container" />
</div>

<br/>

## Interactive Mode with Docker Exec

"-i" or "--interactive" will Ensure that STDIN is opened if you have not attached it, and "**-t**" or **"-tty**" enables users to interact with the container's shell interactively. A combination of flags (-i and -t) can be used to indicate that the command should be run interactively using a pseudo-TTY (-t terminal) attached to the container. This will allow you to send commands and get responses from the container.

We are using the Alpine container, so let us access the shell of the container to run the commands and get responses interactively.

Interactive Mode Command

```tsx
docker exec -it test-container /bin/sh
```

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-18-docker-exec/image4.png"  alt="Docker exec accessing Alpine container shell interactively" />
</div>

<br/>

## Running Specific Commands in a Docker Container

Let's go through how to use some particular commands using docker exec. As you know that we can use the docker exec command, followed by the container ID or container name and the command we want to execute within that docker container.

Now, let's take an example if we want to list the content of the current working directory in the container, so we will use the "**ls**" switch with `docker exec`. After listing every item in the current directory, we need to run a command in a specific directory from the list. To do this, we will use the "**--workdir**" option with the command to print the directory name of the container where our command is being executed. Specifically, we will run the `pwd` command inside the container along with `docker exec` and the "**--workdir**" option to print the directory name where our command is being executed.

At last, just to ensure the access rights to run other commands further, we want to identify the current user, so we will run the "whoami" command along with the "**docker exec**" to print the current user's username.

Specific Commands using docker exec

```tsx
docker exec test-container ls

docker exec –workdir /home test-container pwd

docker exec test-container whomami
```

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-18-docker-exec/image5.png"  alt="Docker exec running ls, pwd with --workdir, and whoami commands" />
</div>

<br/>

## Running a Background Process in a Docker Container

By using this command, you can ask the Docker engine to remain executing the command while you perform another operation by asking it to execute it within the container. When you run a container in detached mode with the "**-d**" option, Docker launches the container in the background and returns control to the command-line tool you're currently using.

Let's run a command using docker exec that will continuously add logs in the background, even if we got control over the terminal and enabled it to run other commands.

Run Process in Background Command

```tsx
docker exec -d test-container bin/sh -c "while true; do echo 'Background Job Running Successfully'>> /var/log/container_logs.log; sleep 1; done"
```

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-18-docker-exec/image6.png"  alt="Docker exec running background logging process with -d flag" />
</div>

<br/>

 <div className="centered-image">
   <img style={{alignSelf:"center", width:"500px"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-18-docker-exec/image7.png"  alt="Container logs showing background job running successfully" />
</div>

<br/>

## How to Exit a Docker Exec Command

To exit the container's shell, you can simply type the "**exit**" command or press "**Ctrl + D**". This will bring you back to the command interpreter running on your own computer.

Exit Container Shell Command

```tsx
exit;
```

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-18-docker-exec/image8.png"  alt="Exiting Docker container shell with exit command" />
</div>

<br/>

## Common Issues and Troubleshooting

- Sometimes, you might face an error while utilizing the `docker exec` command, and this can be because the container is not running or you are typing the incorrect name or ID of the container. To avoid this issue, you can run `docker ps` to list all containers that are running. This way, you can identify whether the specified container is running or not. Also, you can cross-check the name from the list of running containers.

- If you try to run a command within the container and receive, a "permission denied" message. It's conceivable that the user running the `docker exec` command lacks necessary container access rights. The -u option is used to identify the user for the purpose of checking access privileges.

- If you are attempting to run a command that is not supported inside the container, try using the command once more in the container's interactive shell. You can switch to the container's shell by utilizing `/bin/sh`, `/bin/bash`, or any other, according to availability.

- The command will either block the terminal, or it will stop immediately. This may happen when the command is running in the foreground, waiting for input or output, or when it is running in the background and abruptly stops. To resolve this, use "**-d**" to run the command in detached mode in the background.

- Make sure that your container is correctly configured and that you have the required dependencies set up. For any problems that might be encountered in "docker exec", check the container's docker file and configuration files.

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-18-docker-exec/image9.png"  alt="Docker exec common error troubleshooting examples" />
</div>

<br/>

## Conclusion

1.  You can use this functionality to communicate with containers and execute various actions without having to create a new container instance.

2.  This command will allow you to execute commands on your container's shell, allowing you to manage and debug it more effectively.

3.  The `docker exec` command provides a versatile and fast way to communicate with Docker containers, whether you need to specify commands, access the container shell, or run scripts.

4.  `docker exec` is a valuable tool for more efficiently managing and scaling applications when paired with an automation tool or container orchestration platform like Docker Compose or Kubernetes.

5.  The Docker ecosystem includes an active community that provides a plethora of resources, tutorials, and best practices. By playing with `docker exec`, you will have the opportunity to learn from professionals and share your experiences with other enthusiasts.

6.  The Docker Exec command creates a secure environment for testing. You may start a new shell session within the container and experiment with different commands, configurations, and settings without impacting the host system or other containers. This sandboxed method reduces risks while encouraging creativity.
