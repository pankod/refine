---
title: Using kubectl logs - DevOps Guide
description: Kubernetes pod logs show container operations and events in real-time. Containers in Kubernetes pods log their stdout and stderr streams. Debugging and monitoring Kubernetes cluster applications requires these logs.
slug: kubectl-logs
authors: muhammad_khabbab
category: "Ecosystem / Integrations"
tags: [kubernetes]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-28-kubectl-logs/social.png
hide_table_of_contents: false
---

## Introduction

Logging is essential for Kubernetes application monitoring and management. It gives valuable insights into application and Kubernetes infrastructure performance. Pods, nodes, and other system components generate logs in a Kubernetes cluster.

The distributed and dynamic Kubernetes environment makes logging difficult. Kubernetes pods can be scheduled on multiple nodes and have ephemeral containers, making centralized logging absolutely critical. Pod logs are retained when a container restarts or a pod is evicted or deleted.

Today we will focus on pod-level logs through the command `kubectl logs`. This command greatly helps with debugging and monitoring. This article will reveal all the secrets of `kubectl logs` through examples and practical use cases. Let's start with pod-level logging basics.

## Understanding Pod Logs

### Explanation of pod logs

Kubernetes pod logs show container operations and events in real-time. Containers in Kubernetes pods log their stdout and stderr streams. Debugging and monitoring Kubernetes cluster applications requires these logs.

**Key Points:**

- **Location**: Pod logs are stored on the node where the pod is running.
- **Access**: They can be accessed using the Kubernetes command-line tool **kubectl**.
- **Persistence**: By default, these logs are not persistent; they are deleted when the pod is deleted.

The example command to view pod's log is `kubectl logs [POD_NAME]`. We will discuss this in detail in this article.

### Difference between pod logs and system logs

1. **Pod Logs**:

- **Scope**: Specific to a single pod.
- **Content**: Includes output from the application or service running inside the pod.
- **Use Case**: Debugging application-level issues, monitoring application performance, and troubleshooting.
- **Accessed Through**: `kubectl logs`.

3. **System Logs**:

- **Scope**: Related to the Kubernetes node or the entire Kubernetes system.
- **Content**: Includes logs from the kubelet, container runtime, and other system components.
- **Use Case**: Diagnosing cluster-level issues, node-level problems, and monitoring the health of the Kubernetes infrastructure.
- **Accessed Through**: System tools like `journalctl` or log files in `/var/log/`.
  An example of a pod log is an error thrown by your application code. At the same time, a kubelet error on a node will be shown in the system log.

Let's start with getting the list of the pods and see what details are displayed after executing the `kubectl` command.

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-28-kubectl-logs/image1.png" alt="kubectl get pods output showing a single running pod" />
</div>

As you can see, there is only one pod because it is a small application. Here is the description of each of the columns shown in this example screenshot.

- **Name**: Name of the pod.
- **Ready**: Number of containers in the pod that are ready. In our case there was only one container
- **Status**: Current status of the pod (e.g., Running, Pending, Failed).
- **Restart**: Number of times the containers in the pod have restarted.
- **Age**: How long has the pod been running? In our case it is more than 40 mins.

**Expert tips:** Note that excessive logging can consume storage. Also, in the production environment, keep an eye on logging the sensitive information about customers like their email addresses or their IP addresses, etc. Last but not least, ensure that the time is synchronized across your cluster to avoid confusion when correlating logs from different sources.

## Prerequisites for Kubernetes Logging

### Necessary tools: Kubernetes cluster and kubectl

**1. Kubernetes Cluster:**

- **Setup**: You need an up-and-running Kubernetes cluster. This can be a Minikube cluster for local development, a cloud-based cluster like GKE (Google Kubernetes Engine), EKS (Elastic Kubernetes Service from AWS), or AKS (Azure Kubernetes Service), or a self-hosted Kubernetes.
- **Verification**: Use `kubectl get nodes` to verify that your cluster is up and running. You should see a list of available nodes.

**2. kubectl:**

- **Installation**: Ensure that **kubectl**, the Kubernetes command-line tool, is installed on your machine. It's the primary tool for communicating with your cluster.
- **Configuration**: **kubectl** should be configured to interact with your Kubernetes cluster. This typically involves setting up a **kubeconfig** file, often located at `~/.kube/config`.
- **Verification Command**: Run `kubectl version` to confirm it is installed and configured correctly. This command shows both the client and server versions. If your cluster is not working, it will not show the server version, but it will still show you the version information.
<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-28-kubectl-logs/image2.png" alt="kubectl version output showing both client and server versions" />
</div>

As you can see in the above image, both client and server versions are shown, which means you are good to go. Another command to verify your cluster's health is `kubectl cluster-info .`It will display information about the control node and services in the cluster, along with their IP addresses. It is a quick way to confirm that you can access the cluster and that it's operational.

### Ensure correct access rights and configuration

**Access rights**
Kubernetes manages resource access with RBAC. Your user or service account must have log access and viewing permissions. View or edit roles at the namespace level and cluster-admin for cluster-level access are common logging roles. Forbidden or Access Denied errors may result from incorrect permissions.

**Correct configuration of kubectl**
**Contexts**: In Kubernetes, you can switch between different clusters and namespaces using contexts. For example, switching between dev and production contexts. Make sure you are using the correct context for the cluster you plan to work with. Use `kubectl config get-contexts` to list and `kubectl config use-context [context-name]` to switch contexts.

## Deploying a Sample Application

### Deploying an application

#### Create a Deployment YAML File

First, create a YAML file that describes your deployment. This file specifies the desired state of your deployment, including the number of replicas, container images, ports, etc.
Here's an example `helloapp-deployment.yaml`:

      apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: hello-app
          labels:
            app: hello-app
        spec:
          replicas: 1
          selector:
            matchLabels:
              app: hello-app
          template:
            metadata:
              labels:

This file will create a deployment named `hello-app` with one pod.

### Deploy using Kubectl

With the YAML file ready, use `kubectl` to apply the deployment. Here is the command:

    kubectl apply -f hello-app.yaml

This command is instructing Kubernetes to create the deployment as described in the _hello-app.yaml_ file.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-28-kubectl-logs/image3.png" alt="kubectl apply output creating hello-app deployment from YAML" />
</div>

As you can see from the screenshot, the pod is successfully configured with this yaml file. You can also see a warning that kubectl will not be able to track the last applied configuration of the pod without the annotation. This means that if you make changes to the pod specs and then run kubectl apply, kubectl may not patch the pod specs correctly.

## Basic Log Retrieval with kubectl

### Using kubectl logs for basic log retrieval

Let's retrieve logs of a pod through `kubectl logs <pod-name>`

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-28-kubectl-logs/image4.png" alt="kubectl logs output showing pod log entries" />
</div>

As you can see, all the logs for this particular pod are displayed. If you want to download these logs to a text file for analysis, then you can use `kubectl logs my-pod > my-pod-logs.txt` command to do that. The only possible error you might get when running this command is that the pod is not in a running state. In that case you will see an error.

## Advanced Log Retrieval Techniques

### Retrieving logs from specific containers in a pod

Remember the command to retrieve the logs for a pod `kubectl logs <pod-name>`? We know that each pod can have multiple running containers. Which container's logs will be printed when we execute the above-mentioned command? The answer is simple: it will show the primary (the first container) logs. The primary container is the one running your application, while other containers are considered helper containers. That brings us to the next point: how to to view the logs of a particular container. Let's see the command.

    kubectl logs <pod-name> -c <container-name>

You need to specify both the pod name and the container name. Let's try this out.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-28-kubectl-logs/image5.png" alt="kubectl logs -c output for a specific container in a pod" />
</div>

Similarly, if you want to see the logs from the previous instance of the container, you can use the `-previous` flag like this `kubectl logs <pod-name> -c <container-name> -previous` This is helpful where the container has restarted and you would like to view the logs before that restart.

### Tailing logs

If you want to see the container logs in real-time on the go, you can the `-f` flag like this `kubectl logs <pod-name> -c <container-name> -f` It will keep your connection open and will display logs in real-time, until you terminate the execution through `Ctrl+C`. It is useful for monitoring application behavior and identifying potential issues in real-time.

### Filtering logs by time

Sometimes, you would like to see logs only for a particular time period, like the last hour. You can use the --since flag to do that. Here is an example below.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-28-kubectl-logs/image6.png" alt="Filtering container logs by time using --since flag" />
</div>

You can also use 1d for one day and 1m for one minute.

**Expert tips**

- You can also get logs of multiple pods in one go. Just use label selectors with `kubectl logs -l` to view logs from multiple pods simultaneously. For example, `kubectl logs -l appname=stagingapp` would show logs from all pods labeled with `appname=stagingapp`
- We had earlier mentioned that by default, you will be shown the logs of just one container of the pod. However, you can also see logs of all the containers of a pod using `kubectl logs <pod name> --all-containers=true`
- If you work with multiple Kubernetes clusters at the same time, you can use `kubectl logs <pod name> --context=<context-name>` to specify which cluster's logs you want to view.

## Conclusion

A pod is the basic unit of work in Kubernetes. In case of any issue in your application, the first thing you will do is check the logs of the pod. This guide has discussed the pods logs in detail. We have gone through different examples to show the result of kubectl commands to view pod's logs.

After reading this article, you will be fully equipped to troubleshoot any issues in your Kubernetes pod. Continue practicing the commands outlined in this article to gain practical experience and become an expert in Kubernetes.
