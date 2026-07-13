---
title: Understanding the Basics of Kubernetes CronJob
description: CronJobs in Kubernetes is the way of running jobs automatically based on time intervals.
slug: kubernetes-cron-jobs
authors: muhammad_khabbab
category: "Engineering"
tags: [kubernetes]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-12-k8s-cronjobs/social.png
hide_table_of_contents: false
---

## Introduction

Kubernetes is an open-source container orchestration platform that manages containerized applications to run on a cluster of hosts. CronJobs in Kubernetes is the way of running jobs automatically based on time intervals. Developers have been using CronJobs in Linux for a long time. These commands or scripts are scheduled to run at set intervals like every minute, hour, day, week, or month.

CronJobs are very useful for keeping your system up-to-date as well as automating tasks such as backups, maintenance of the system, triggering automated emails, monitoring and alerts, automatically restarting the containers, and many other automation tasks.

This article will discuss how to incorporate CronJobs into your workflow. We will explain through examples how you can set up CronJobs for your Kubernetes environment and implement them in your Kubernetes configuration files. We will also explore ways to troubleshoot any issues related to CronJobs in the Kubernetes environment. At the end of this article, we will list some best practices to help you implement the cronjobs most efficiently and effectively.

## Understanding the Basics of Kubernetes CronJobs

### Definition and fundamental concepts of CronJobs in Kubernetes

Upon creating a CronJob resource, Kubernetes registers a schedule in cron expression format. This schedule dictates the timing of the Kubernetes cron job. The CronJob Controller checks every 10 seconds to identify any schedules that need executing. At the designated time, Kubernetes initiates a new Job resource to manage that particular execution.

Following this, Kubernetes automatically generates pods as per the schedule, aiming for successful pod creation. If a pod fails to initialize correctly, Kubernetes automatically generates a new one to as another attempt to execute the task again.

### High-level overview of how CronJobs differs from traditional cron tasks

A CronJob in Kubernetes schedules recurring tasks, whereas a cron task runs scripts or commands at specific times using the cron daemon. CronJobs, being managed by Kubernetes, can scale and integrate well with Kubernetes features such as secrets and volumes, whereas cron tasks can only leverage the environment of the host machine. CronJobs make use of Kubernetes manifests or kubectl to get configured while crontab files are used by cron tasks.

## Setting Up Your Environment for Kubernetes CronJobs

### Pre-requisites for working with CronJobs in Kubernetes

**Cluster:** You can use a minikube Single Node cluster that is enough for local testing. There are other options as well, like 'kind', through which you can create the multi-node cluster.

**Kubernetes CLI:** You will also require a command line tool for Kubernetes (i.e kubectl), so that you can run the commands against Kubernetes clusters.

**Docker Image:** An image is required that contains a command or script that you want to run as a CronJob.

**Text Editor:** It is required for editing the Kubernetes configuration files(YAML)

### Quick setup guide (with a screenshot of the setup environment)

1.  First, Install docker Docktop. You can download the setup from the official docker site and install it on your machine.
2.  Minikube can be installed by following the [official documentation](https://minikube.sigs.k8s.io/docs/start/), and by executing the '_minikube start_' command, you can set up a minikube cluster.
3.  Install kubectl(Kubernetes CLI) according to your Operating System by following the [official documentation](https://kubernetes.io/docs/tasks/tools/).
4.  Create a YAML file using any text editor for CronJob configuration and apply the configuration by running the command '_`kubectl apply -f Your_Config_File.YAML`_'.

**Here is the screenshot of our setup environment that we will be using for running cronjobs in Kubernetes:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-12-k8s-cronjobs/KCJ_1.png" alt="Kubernetes CronJob setup environment screenshot" />
</div>

<br/>

## Creating Your First Kubernetes CronJob

### Step-by-step process to create a basic CronJob

We are going to create a simple cronjob that would use an nginx image and replace the "Welcome to Nginx" Text with appending time for every minute, such as First it will be "Welcome to Nginx at [Current_time]" then after a minute when CronJob runs it will become "Welcome to Nginx at [Current_time + 1 Minute]".

**Step 1: Create a YAML File for configuring CronJob based on the above Example:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-12-k8s-cronjobs/KCJ_2.png" alt="CronJob YAML file for nginx example" />
</div>

<br/>

**Step 2: Run '`kubectl apply -f Your_Config_File.YAML`' to apply configurations:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-12-k8s-cronjobs/KCJ_3.png" alt="kubectl apply output for CronJob" />
</div>

<br/>

**Step 3: Check if Cron Jobs are Running by Executing '`kubectl get jobs –watch`':**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-12-k8s-cronjobs/KCJ_4.png" alt="kubectl get jobs --watch output" />
</div>

<br/>

**Step 4: Access Pod Logs to Verify Output**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-12-k8s-cronjobs/KCJ_5.png" alt="CronJob pod logs output" />
</div>

<br/>

### YAML configuration walkthrough (with a screenshot of the YAML file and command line execution)

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-12-k8s-cronjobs/KCJ_Config.png" alt="CronJob YAML configuration example" />
</div>

<br/>

In the Example above, we created a YAML file named '**Nginx-Welcome-Example.yaml**', which specifies the desired state and behavior of the Cron Job. To achieve our purpose, we provided the following configurations:

1.  **`apiVersion: batch/v1`** – This is Kubernetes API version that contains the Object Specification.
2.  **`kind: CronJob`** – This is the type of Object we want to create.
3.  **`metadata`** – The Object is named as 'replace-cronjob', which is a unique identifier within the namespace.
4.  **`schedule: "* * * * *"`** – The Job will execute after every minute according to the cron expression.
5.  **`JobTemplate`** – Here, we defined the desired state and behavior of our job.
6.  **`containers:`** , **`image: nginx:latest`** – We created one container in the pod with the 'Nginx' image.
7.  **`Command:`** **`- /bin/bash`** **`-c`** **`- echo "Welcome to Nginx at $(date)"`** – This is the actual action that will be performed after every minute. We print the Welcome Text with the current time when the pod is created by the CronJob to the standard output. We can see this output in the logs of each pod created.

### Explanation of key configuration parameters

**Schedule:** The schedule field, which indicates the job's repetition frequency in cron format. A cron expression is a string that has five or six fields separated by spaces, representing minute, hour, day of month, month, day of week and optionally year. Each field can have a certain value or range, represent a list or wildcard, as well as contain special characters. For example, **`* * * * *`** means every minute; **`0 12 * * *`** means every day at noon; and **`0 0 1 1 *`** means every year on January 1st.

**Job Template:** The jobTemplate field defines the template for creating the Job object that runs the pod. The jobTemplate has one field: spec.

**Container and Image:** The containers field lists containers running in the pod. Each container has many fields: name, image, and command. The name field stands for the specific container name within a given pod. The image field represents the Docker image used by this container. The command field refers to the script or command run inside this container.

## Debugging and Logging in Kubernetes CronJobs

### How to access and interpret logs generated by CronJobs

The logs generated against the command or script are captured by the container's standard output and standard error streams and stored in the logs of the pod. This means that you cannot access the logs of a CronJob directly because first, you need to know which Pods ran the job created by the CronJob. To list and view the logs of a pod, use kubectl command-line tool.

**First, you need to list the pod created by the CronJob by using the following command:**

`kubectl get pods`

**Then, copy the name of the pod and replace with [pod_name] in the command below:**

`kubectl logs [pod_name]`

There is another option as well where you can use labels and selectors to filter the Pods based on the name of the CronJob. In our last Example, we created the CronJob with the name 'replace-cronjob', so we could filter the pods of that CronJob and view the logs using the commands below:

`kubectl get pods -l cronjob-name=replace-cronjob`

**The above command will return the following output:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-12-k8s-cronjobs/KCJ_6.png" alt="kubectl get pods output filtered by cronjob-name" />
</div>

<br/>

`kubectl logs -l cronjob-name= replace-cronjob`

**The above command will return the following output:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-12-k8s-cronjobs/KCJ_7.png" alt="kubectl logs output for cronjob-name selector" />
</div>

<br/>

### Common issues and how to troubleshoot them (with screenshots of log outputs and debugging commands)

**Syntax Errors:**
CronJobs has a complex syntax like regular UNIX cron jobs that can take time to get right. Some common syntax errors include using wildcards incorrectly, making mistakes with cron schedules, and specifying an incorrect number of fields. Copy your expression into crontab.guru to check its syntax correctness.

**Let's suppose we have a wrong cron expression in our CronJob configuration that does not allow for creating a CronJob. While applying this configuration, it will return the error:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-12-k8s-cronjobs/KCJ_8.png" alt="CronJob error output for invalid cron expression" />
</div>

<br/>

**In order to troubleshoot this, we can use the command below:**

`kubectl create -f Nginx-Welcome-Example.yaml --dry-run=client -o yaml`

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-12-k8s-cronjobs/KCJ_9.png" alt="kubectl create --dry-run output for CronJob" />
</div>

<br/>

**Timezone:**
By default, CronJobs are run based on the Kubernetes cluster's timezone, which may differ from the user or application's timezone, causing scheduling conflicts or unexpected behavior.

To troubleshoot this issue, you can check the timezone of your cluster node by deploying a temporary pod to that specific node for debugging purposes and executing the command within that pod. For example, we deployed the temporary pod(i.e., named debugger-pod) in our node, and then we executed the command below in that pod:

`kubectl exec debugger-pod -- date`

**The command will return the following output:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-12-k8s-cronjobs/KCJ_10.png" alt="Pod date command output for timezone check" />
</div>

<br/>

**Image:**
If a CronJob specifies an image that is not available, the job will fail. You must see the `ImagePullBackOff` or `ErrImagePull` status against the pods created by CronJob. To troubleshoot this issue, you need to describe the pod by running the command below:

`kubectl describe pod [pod_name]`

**The Above Command will return the output below:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-12-k8s-cronjobs/KCJ_11.png" alt="kubectl describe pod output with image pull error" />
</div>

<br/>

## Real-world Scenarios and Best Practices

### Discussion on practical use cases of CronJobs in production environments

**Here are a few practical use cases of CronJobs in a Production Environment:**

**Email Reminder:**
An application sends the users reminders for certificate renewal when they are about to expire and need to be renewed. You can configure a cron job that hits the API, queries the database, filters out certificates that are close to the expiration date and sends an email to users as a reminder for renewal.

**Automated analysis and reporting:**
You may schedule a cron job that does reports automatically depending on the performance of your site or business. In this case, we can use a cron job to go through server logs, analyze web traffic, sales, or customer behavior every 30 minutes, and then create a PDF report.

**Automating data backup:**
You can use a cron job to back up databases and restore damaged or lost data. For instance, you can dump your website's database using the cron job daily while also backing up server data on an AWS S3 bucket or any other object storage service.

### Best practices for efficient and reliable CronJob implementations

1.  Always give your cron jobs descriptive and meaningful names, as well as comment about what they do and why. Secondly, test your cron jobs and dry run to ensure that you have configured the right cron expressions before deployment.
2.  Job failures might happen due to process failures within a pod or failures in the Kubernetes controller layer, forcing automatic infinite job retries until success. However, setting backoffLimit at some value (neither too low nor too high) facilitates a limited number of re-attempts.
3.  It is considered one of the best practices when configuring CronJob to uphold the '**_`Principle of Least Privilege`_**'. In that case, only necessary permissions should be assigned to scripts and dependencies. Ultimately, it improves security by reducing the risks involved.

## Conclusion

In this article, we have explored Kubernetes CronJobs in great length. We went through how to create cronjobs, maintain them, and apply them to your Kubernetes cluster. We also looked into some best practices that can help you implement your cronjobs in an efficient, reliable, and secure way on production.

As you continue your journey with Kubernetes, further explore and learn more about CronJobs by manipulating them in different ways. You can update or remove your existing CronJob configurations and resources. You can monitor or debug your CronJob executions as well as their outputs. Also, we would recommend you explore the advanced aspects of Kubernetes CronJobs by going through more details and examples in the official documentation.
