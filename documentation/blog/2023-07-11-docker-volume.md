---
title: A Detailed Guide on Docker Volumes
description: We'll go over the fundamentals of Docker volumes, including what they are, why they're important, and how to use them.
slug: docker-volumes
authors: muhammad_khabbab
category: "Engineering"
tags: [docker]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-11-docker-volume/social.webp
hide_table_of_contents: false
---

## Brief introduction to Docker

Docker, also known as Docker Engine, has a major impact on the modern industry as it is an open-source platform for creating, distributing, and running applications. Applications are packaged and executed using Docker containers in a loosely isolated environment. You can execute applications without depending on what is already installed on the host because containers are lightweight and come up with everything you need to run them. Its containerization solution addresses major issues with application deployment, supporting microservices design, allowing CI/CD pipelines, enhancing scalability and resource efficiency, enabling hybrid and cloud-native settings, and encouraging DevOps collaboration.

## Why Docker Volumes are Important

Data created and utilized by Docker containers can be stored on Docker volumes. Docker volumes are important due to the following reasons:

- They will enable you to store data outside the container's filesystem, ensuring it remains intact even if the container is updated or deleted.

- It is simpler to generate backups or snapshots of the volumes by detaching the data from the container itself, ensuring that crucial data can be restored in the case of system failures or disasters.

- By allowing developers to exchange code, libraries, and other dependencies using shared volumes, Docker volumes encourage developer collaboration.

- Performance can be increased by using Docker volumes which make use of the resources of the host machine.

- Data can be accessed directly from the host's file system or other external storage systems, minimizing the overhead associated with containerized file operations.

## Understanding Docker Volumes

### Docker Volumes versus other storage options

The recommended method for storing data generated and utilized by Docker containers is through Docker volumes because bind mounts and tmpfs mounts are dependent on the directory structure and OS of the host system. Below are the areas where docker volume excels over other storage options.

Data Isolation and Portability

Docker volume's data is kept separate from the host file system and other containers. Additionally, Docker volumes can be used across a variety of platforms and scenarios, making it simpler to deploy and consistently run applications.

Extensibility and Integration

Unlike tmpfs mounts, Docker volumes can integrate drivers and plugins, making it possible to utilize network-attached storage (NAS), cloud storage, distributed file systems, or custom storage options.

Container Orchestration:

Kubernetes and other container orchestration systems are easily integrated with Docker volumes. Data handling in dynamic or containerized environments is standardized, Simplified, and consistent due to Docker volumes.

### Overview of Docker volume features

Data sharing across containers:

Docker volumes make it possible for different containers to exchange and use the same data. This feature is quite helpful when microservices or multiple containers need to connect and work together by sharing common data.

Volume Snapshotting:

Volume snapshotting is supported by a few storage drivers and plugins for Docker volumes. You can create a snapshot at a specific point in time that can be later used for backup, cloning, or versioning purposes.

Mount Options:

Docker volumes provide flexible mount options so that the volume can be mounted inside containers in a way that works for you. Read-only mode, choosing the volume driver, configuring consistency parameters, and more are all included in the mount options.

Volume Security:

Security features for Docker volumes include access control and permission management. You can specify who is allowed to read, write, or execute on a volume, ensuring that sensitive information is kept secure and that only authorized containers or users can access it.

## Working with Docker Volumes (Screenshots of commands)

### The lifecycle of a Docker Volume

The four key stages of a docker volume's lifespan are creation, use, inspection, and removal.

### Creating a Docker volume

The `docker volume create` command(i.e., docker volume create) can be used to build a docker volume. This command creates a volume with the local driver by default and a random name. The --name and --driver options additionally allow you to provide a name of your choice and a driver as well. Let's take an Example:

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-11-docker-volume/image1.png"  alt="Terminal showing docker volume create command output" />
</div>

<br/>

### Using a Docker volume

With the options --mount or -v of the docker run command, you can attach a docker volume to one or more containers in order to use it. But, for that purpose, you need to specify the source (the volume's name), the target (the path on which the volume is mounted in the container), and the name(name of the container). Let's take an example of mounting volume(**source**: sample-volume) with a WordPress container at path(**target**: /var/www/html).

**Command in Example:** `docker run -d --name wordpress --mount source=sample-volume,target=/var/www/html wordpress`

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-11-docker-volume/image2.png"  alt="Terminal running docker run with --mount for a WordPress container" />
</div>

<br/>

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-11-docker-volume/image3.png"  alt="Terminal output confirming the volume mount in the running container" />
</div>

<br/>

**Note:** Alternatively, You can also use '-v' instead of '--mount', but for volume, '—mount' is recommended, and '-v' is recommended for bind mounts.

### Inspecting a Docker volume

The `docker volume inspect` command(i.e., docker volume inspect \<name-of-volume\>) can be used to examine a docker volume. The information displayed by this command includes the volume's name, driver, mountpoint, labels, and options. Let's take an example of inspecting 'sample-volume'.

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-11-docker-volume/image4.png"  alt="Terminal showing docker volume inspect output" />
</div>

<br/>

### Removing a Docker volume

The `docker volume rm` command(i.e., docker volume rm \<name-of-volume\>) can delete a docker volume. By deleting the volume, the occupied disk space is released. In the example below, we will delete the '**sample-volume**' created earlier.

>

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-11-docker-volume/image5.png"  alt="Terminal showing docker volume rm command output" />
</div>

<br/>

**Note:** Please note that volume you want to delete should not be in use by any container.

## A Glance at common docker volume commands

### Listing Docker Container

Lists every Docker volume on the system with `docker volume ls`. Through this command, You can have general information of all docker volumes, along with their names and related mountpoints.

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-11-docker-volume/image6.png"  alt="Terminal showing docker volume ls output" />
</div>

<br/>

### **Remove all unused Volumes**

To eliminate all unused volumes, you can also use the docker volume prune command(i.e., docker volume prune). For example, we want to remove anonymous local volumes not used by at least one container. For that purpose, first, we have to list the unused volumes not referenced by any container by using the '-f dangling=true' option with the 'docker volume ls', and then we will run 'docker volume prune' to delete the volumes.

**Command in Example:**

`docker volume rm sample-volume`

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-11-docker-volume/image7.png"  alt="Terminal showing docker volume prune output" />
</div>

<br/>

## Backup and Restore Docker Volumes (Screenshots of commands)

## Why backing up Docker volumes is crucial

Persistent data generated and consumed by Docker containers are stored on Docker volumes. You can containerize stateful workloads because data stored in a volume is available even after your containers have stopped running. However, disasters like disk failures, accidental deletions, or malicious attacks can still happen to volumes. For the safe side, you should periodically back up your volumes so that you can restore them in the case of data loss or corruption.

## Steps to back up a Docker volume

There are multiple ways to backup the docker volume, but the most common way is to use a temporary container that mounts the volume and builds an archive of its contents. In order to achieve this, you need to use the docker run command with the '—volume-from' option to mount the volume from another container and the '-v' option to bind mount a directory where you want to keep your backup on a host system. To compress the backup file, you can use tools like tar and gzip. Let's take an example of creating a backup of 'sample-volume'.

**Step 1:** We have created a container that stores data in 'sample-volume'

**Command in Example:** `docker run -d --name sample-container -v sample-volume:/data ubuntu`

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-11-docker-volume/image8.png"  alt="Terminal creating a sample container with a mounted volume" />
</div>

<br/>

**Step 2:** Now, we will create a backup file 'sample-backup' of 'sample-volume' at the path of our choice on the host system by starting a temporary container and removing it using the 'rm' option once the backup is created. We created the 'sample-backup' at _'C:\Users\\my-username\]\Documents_'

**Command in Example:**

`docker run --rm --volumes-from sample-container -v C:\Users\\*my-username*\]\Documents:/backup-dir ubuntu tar cvzf /backup-dir/sample-backup.tar.gz /data`

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-11-docker-volume/image9.png"  alt="Terminal command creating a backup archive from a Docker volume" />
</div>

<br/>

## Steps to restore a Docker volume

A docker volume can be restored from a backup file using a method similar to the backup method. You have to first mount the volume and the backup file in another temporary container before extracting the content of the backup file into the volume. As an example, let's restore the 'sample-backup' into the newly created volume (known as the 'restored-volume').

**Step 1:** We have created a temporary container to mount the volume and backup file(i.e., 'sample-backup') and then extract the backup content into the volume(i.e., 'restored-volume'.

**Command in Example:** `docker run --rm -v sample-volume:/data -v C:\Users\\username\]\Documents:/backup-dir ubuntu tar xvzf /backup-dir/sample-backup.tar.gz -C /data`

<div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-11-docker-volume/image10.png"  alt="Terminal command restoring a Docker volume from a backup archive" />
</div>

<br/>

**Note:** It is important to note that while restoring the volume, it should not be in use by any container.

## Best Practices for Docker Volumes

### Optimizing Docker volume usage

1.  It is better to restrict the number of volumes to only what is required for your application because each volume has some overhead.

2.  Instead of a random name assigned by docker, naming the volume yourself will improve control and visibility, making managing and referencing volumes simpler.

3.  Caching should be enabled for the volumes that are frequently accessing read-only data. Caching minimizes the need to continually read data from slower storage systems, enhancing the performance of containerized applications.

4.  Use read-only volumes if your applications only require read access to data, as it will prevent accidental changes.

5.  Check volumes frequently to see whether they are storing too much data or if their capacity is being exceeded. Volumes may need to be resized or cleaned up as necessary to maintain optimal resource use.

## Ensuring data consistency with volumes

1.  Try to perform atomic operations while changing data within a volume. Atomic operations ensure that changes are applied in a single, unified phase and are indivisible.

2.  Follow consistent and organized methods when attaching or detaching volumes from containers. A sudden or inappropriate volume removal might cause data loss.

3.  If multiple containers change the same files, prevent them from writing to the same drive simultaneously. Corruption of data and conflicts can result from concurrent write access.

4.  For your volume of data, implement a backup strategy to guarantee data availability and consistency. Back up the volumes regularly to a different storage system or an off-site location.

## Managing Docker volumes effectively

1.  When working with many containers and volumes, it is simpler to identify and manage volumes when naming conventions are clear and consistent.

2.  To protect sensitive data stored in volumes, implement the necessary security procedures. Ensure that data integrity remains intact, volumes are correctly encrypted, and access restrictions are in place.

3.  Automate the creation of the volumes that your application needs as part of the container deployment process. Use Docker Compose files or infrastructure-as-code tools to design and automatically provision the necessary volumes.

4.  Volume plugins can increase the functionality of Docker volumes, enabling you to use cutting-edge features like replication, snapshotting, or interaction with cloud storage providers.

## Conclusion

## Summary of Docker volume usage

1.  In Docker containerized systems, persistent and controllable storage is made possible by the powerful feature known as Docker volumes.

2.  They enable data sharing across containers, give a mechanism to isolate data from containers, and possible data persistence during container restarts and updates.

3.  Regarding data isolation, flexibility, and compatibility with container orchestration platforms, Docker volumes outperform as an alternative storage solution.

4.  Various Docker volume commands can be used to create, inspect, utilize, and remove Docker volumes.

5.  Limiting the number of volumes, utilizing descriptive naming, frequently cleaning up unused volumes, and regularly keeping data backup and security measures in place are all best practices for Docker volume utilization.

## Final thoughts on exploring Docker volumes

In order to obtain a deeper understanding of docker volume, it is recommended to examine the Docker documentation and community resources and experiment with various use cases. You can effectively utilize Docker for your application deployments by understanding its use. Docker volumes provide significant flexibility and options for managing data within containers, but further exploring Docker volumes can assist you in weighing the advantages and disadvantages of various storage solutions and selecting the one that best matches your use case.
