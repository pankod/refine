---
title: kubectl port-forward - Kubernetes Port Forwarding Explained
description: We'll see how to use kubectl port-forward to access internal Kubernetes services from outside the cluster.
slug: kubectl-port-forward
authors: muhammad_khabbab
category: "Ecosystem / Integrations"
tags: [kubernetes]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-05-kubectl-port-forwarding/social.png
hide_table_of_contents: false
---

## Importance of accessing internal Kubernetes services

Port forwarding in Kubernetes allows you to access internal cluster resources from outside the cluster. Users can link an external port with a resource such as a pod, deployment, replica set, or service. As a result, the resource is now available from within the local network. For Example, you installed PostgreSQL service on your cluster and don't want to expose it to the public but still want to run queries and access the database locally.

Through Kubernetes port forwarding, you can create a tunnel and access PostgreSQL from your Kubernetes cluster via localhost port(e.g., 5432).

Steps we'll cover in this article:

- [Importance of accessing internal Kubernetes services](#importance-of-accessing-internal-kubernetes-services)
- [Role of port forwarding in development and debugging](#role-of-port-forwarding-in-development-and-debugging)
- [When port forwarding is most appropriate](#when-port-forwarding-is-most-appropriate)
- [Understanding Port Forwarding in a Nutshell](#understanding-port-forwarding-in-a-nutshell)
  - [Quick overview of port forwarding in general networking](#quick-overview-of-port-forwarding-in-general-networking)
  - [Significance in local development and testing](#significance-in-local-development-and-testing)
- [Setting up a Local Kubernetes Environment](#setting-up-a-local-kubernetes-environment)
  - [Brief guide on setting up a Minikube cluster for local testing](#brief-guide-on-setting-up-a-minikube-cluster-for-local-testing)
- [Deploying a Sample Service](#deploying-a-sample-service)
  - [Instructions to deploy a simple service in the Kubernetes cluster](#instructions-to-deploy-a-simple-service-in-the-kubernetes-cluster)
- [Kubectl Port Forward in Action](#kubectl-port-forward-in-action)
  - [Detailed steps on how to use kubectl port-forward](#detailed-steps-on-how-to-use-kubectl-port-forward)
- [Differences between forwarding to a pod, service, and deployment](#differences-between-forwarding-to-a-pod-service-and-deployment)
  - [Port Forwarding to Pod](#port-forwarding-to-pod)
  - [Port Forwarding to Service](#port-forwarding-to-service)
  - [Port Forwarding to Deployment](#port-forwarding-to-deployment)
- [Use Cases and Practical Scenarios](#use-cases-and-practical-scenarios)
  - [Situations where port forwarding is particularly beneficial:](#situations-where-port-forwarding-is-particularly-beneficial)
  - [Potential pitfalls and things to watch out for:](#potential-pitfalls-and-things-to-watch-out-for)
- [Beyond Local: Port Forwarding in Cloud-based Clusters](#beyond-local-port-forwarding-in-cloud-based-clusters)
  - [How port forwarding works with cloud providers like EKS, GKE, and AKS](#how-port-forwarding-works-with-cloud-providers-like-eks-gke-and-aks)
- [Precautions and differences when working with cloud-based clusters](#precautions-and-differences-when-working-with-cloud-based-clusters)
- [Tips and Best Practices](#tips-and-best-practices)
  - [Ensuring secure and effective port forwarding](#ensuring-secure-and-effective-port-forwarding)

## Role of port forwarding in development and debugging

**Kubernetes Port Forwarding is useful for development and debugging because it enables you to:**

1. Use your local development tools and connect to a service running in the cluster.
2. Access a service running in the cluster using your local browser.
3. Access logs and other diagnostic data from a cluster running the service.

## When port forwarding is most appropriate

For development and test purposes with Kubernetes, port forwarding can be useful to make quick access to specific pods. Alternatives include NodePort for static external access, LoadBalancer for traffic distribution in production, and Ingress for HTTP Routing.

The production environment benefits from more scalable and secure solutions such as LoadBalancers and Ingress Load Controllers, which ensure efficient traffic management, while port forwarding is only useful for temporary connections and debugging.

## Understanding Port Forwarding in a Nutshell

### Quick overview of port forwarding in general networking

Port forwarding, or port mapping, allows private local-area network (LAN) devices to communicate with external servers on the internet by redirecting communication requests through a network gateway, like a router.  
Without port forwarding, internal devices can only communicate with each other. With port forwarding, they can interact with external systems, solving numerous network issues. However, it carries a risk; for example, an unprotected remote desktop connection could allow unauthorized access to your local machine.

### Significance in local development and testing

Port forwarding is highly beneficial for local development rather than uploading applications to a remote server again and again for testing. If your application faces issues in production, port forwarding allows you to investigate on your machine to identify problems. This way, continuous fixes in production are avoided until the bug is actually resolved and properly tested.

It's recommended for extensive development work, enabling issue resolution locally before updating the final version on the actual server and preserving the live site during debugging.

## Setting up a Local Kubernetes Environment

### Brief guide on setting up a Minikube cluster for local testing

A tool called Minikube (CLI/EXE) makes it simple to run Kubernetes locally. For users who want to experiment with Kubernetes or work with it on a daily basis, Minikube hosts a single-node Kubernetes cluster within a virtual machine on your laptop.
For Example, if you have a laptop with a Windows machine and you want to set up a minikube cluster for local development and testing on Windows.

So First of all, you have to make sure the following as a prerequisite:

1. Turn on Windows Hyper-V.
2. Get Chocolatey installed on Windows.
3. Download and Install Docker Desktop.
4. Install Kubectl, the Kubernetes CLI, for interaction with the cluster.

**You can use the command below to install minikube on Windows:**

`choco install minikube`

**Once you have installed minikube, you need to start it using the docker driver(make sure docker is running):**

`minikube start --driver=docker`

**After running the command above, the output below shows that the minikube cluster is set on your local machine:**

 <div className="centered-image">
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-05-kubectl-port-forwarding/1.png"  alt="Minikube cluster starting with Docker driver" />
</div>

<br/>

**You can also verify the setup by running the command below:**

`minikube status`

**The status command will return the output below:**

<div className="centered-image">
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-05-kubectl-port-forwarding/2.png"  alt="Minikube status showing control plane, kubelet, and apiserver running" />
</div>

<br/>

**Control Plane:** This status is for the control plane node of your cluster

**host:** docker container is the host in our case, where the Kubernetes cluster is running

**kubelet:** This is an agent running on minikube node

**apiserver:** The component of the control plane that exposes Kubernetes API.

**kubeconfig:** This shows that to interact with the Kubernetes cluster, this kubeconfig file is correctly configured.

## Deploying a Sample Service

### Instructions to deploy a simple service in the Kubernetes cluster

As an example, let's deploy a basic Nginx web server to the previously created cluster, as we will be using the current context(i.e., minikube), so the service will be deployed to the same cluster by default. Although YAML files are normally used in Kubernetes to describe workloads and services, but for simplicity, we will be using kubectl tool.

**At the very first step, let's create a deployment with the name 'example-deployment' that manages the 'nginx' service:**

` kubectl create deployment example-deployment --image=nginx`

**You can see below the output that the above command will create a deployment that will pull the nginx image from the Docker hub:**

<div className="centered-image">
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-05-kubectl-port-forwarding/3.png"  alt="Creating example-deployment with nginx image using kubectl" />
</div>

<br/>

In the next step, we will expose the above-created deployment as a service so that it can be accessible through a stable IP address. For this purpose, we will run the command below:

`kubectl expose deployment example-deployment --port=80`

**The below output confirms that the specified service is exposed on port 80:**

<div className="centered-image">
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-05-kubectl-port-forwarding/4.png"  alt="Exposing deployment as service on port 80" />
</div>

<br/>

In the last step, we need to retrieve a URL through which we can access the service on the browser, and we can achieve this by using the minikube command below:

`minikube service example-deployment --url`

**As you can see in the below output that we have the URL in response through which we can access the nginx welcome page:**

<div className="centered-image">
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-05-kubectl-port-forwarding/5.png"  alt="Getting service URL from minikube for browser access" />
</div>

<br/>

**Nginx Welcome Page on Browser:**

<div className="centered-image">
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-05-kubectl-port-forwarding/6.png"  alt="Nginx welcome page displayed in browser" />
</div>

<br/>

## Kubectl Port Forward in Action

### Detailed steps on how to use kubectl port-forward

A tunnel is created between the target resource and your localhost through the port-forward command. Below is the syntax of the kubectl port-forward command:

`kubectl port-forward [resource-type/][name-of-target-resource] [local-port]:[target-resource-port]`

Let's suppose we want to forward the port to the resource of the type of service we created previously, i.e., example-deployment. In that case, the name of the resource will be '**example-deployment**', which is of service type, and the port it is using is **80**.

First, you need to verify the service details by using the command below:

`kubectl get services`

<div className="centered-image">
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-05-kubectl-port-forwarding/7.png"  alt="Listing services with kubectl get services command" />
</div>

<br/>

Now, we want the Kubernetes API to listen at port **8080** and forward the data to port **80** for the '**example-deployment**' service. We can use the command below to meet that purpose:

`kubectl port-forward services/example-deployment 8080:80`

**The illustration below shows that after forwarding the port, the nginx welcome page becomes available at localhost:8080:**

<div className="centered-image">
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-05-kubectl-port-forwarding/8.png"  alt="Port forwarding service from local port 8080 to pod port 80, accessing nginx on localhost" />
</div>

<br/>

## Differences between forwarding to a pod, service, and deployment

### Port Forwarding to Pod

By creating a direct connection to a particular Pod, port forwarding to it allows you to access a single instance of your application. This is beneficial when you are required to debug a specific pod.

You can get the pod's name by listing all pods through the `kubectl get pods` command. In our case, we can use the command below for port forwarding to a specific pod(i.e., example-deployment-5cff4bc76f-tkjzz):

`kubectl port-forward pod/example-deployment-5cff4bc76f-tkjzz 8000:80`

**The above command will return the following output:**

<div className="centered-image">
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-05-kubectl-port-forwarding/9.png"  alt="Port forwarding to specific pod example-deployment-5cff4bc76f-tkjzz on port 8000" />
</div>

<br/>

### Port Forwarding to Service

When you are forwarding the port to a service, Kubernetes handles the connection and forwards it to one of the Pods behind that service. You're not connected to a specific Pod; Kubernetes will route the connection to any Pod matching your Service Selector. This is most commonly used when you want to access a service without exposing it externally.

The Example of port forwarding to service is already described above in the '**_Detailed steps on how to use kubectl port-forward_**' section.

### Port Forwarding to Deployment

This is similar to port forwarding to the service without making any direct connection with the specific pod. Kubectl will automatically select the pod behind the deployment and create a tunnel. It is only useful when you donot bother about connecting with the specific pod.

You can get the list of all deployments by using the `kubectl get deployments` command. In our case, we have a deployment with the name '**example-deployment**', so we will be using the command below for port forwarding from port **8888** to port **80** on any pod under the deployment:

`kubectl port-forward deploy/example-deployment 8888:80`

**The above command will return the following output:**

<div className="centered-image">
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-05-kubectl-port-forwarding/10.png"  alt="Port forwarding to deployment from local port 8888 to pod port 80" />
</div>

<br/>

## Use Cases and Practical Scenarios

### Situations where port forwarding is particularly beneficial:

1. If you want to develop and test local applications without placing them on a production/live server.
2. If you want to share your work with other team members without creating a complicated ingress controller or load balancer.
3. In order to improve application performance, security and connectivity through the reduction of delays, packet loss and connection issues.
4. Without relying upon third-party providers, if you want to create and use your own VPN servers or proxies.

### Potential pitfalls and things to watch out for:

1. Ensure that any other applications or services on your local machine or cluster are not using the ports used for port forwarding.
2. Ensure that port forwarding is secure, allowed, and available only to those you can trust. In order to secure port forwarding, use firewall rules, SSH tunnels, tokens, certificates, or passwords. Don't use port forwarding to expose private or sensitive information or services.
3. Ensure that port forwarding doesn't use too much resources(e.g., CPU, memory, bandwidth, etc) from local machines or clusters. Keep a check on port forwarding and their usage of resources. You can limit the number and duration of port forwarding sessions and stop or delete them if you don't need them.

## Beyond Local: Port Forwarding in Cloud-based Clusters

### How port forwarding works with cloud providers like EKS, GKE, and AKS

Port forwarding with Kubernetes clusters in the cloud works pretty much the same as with local clusters. You can forward traffic from your own local machine to Pods running in Amazon EKS, Google GKE or Azure AKS using the 'kubectl port-forward' command. It's handy for testing and debugging apps in the cloud.

## Precautions and differences when working with cloud-based clusters

1. If you want to enable port forwarding between your local machine and the cluster, you may need to set up firewall rules or security groups. For Example, the inbound rules of your cluster's security group may need to be changed for AWS EKS. You may need to set up a firewall rule for your cluster network if you are using GCP GKE. You may need to set up a Network Security Groups rule on subnets in your cluster for Azure AKS.
2. Additional resources, such as load balancers, can be provided by cloud-based clusters to facilitate the deployment of services.
3. In cloud-based clusters, port forwarding may result in lower bandwidth or higher latency than in local clusters. It is due to the fact that traffic from your local machine must pass through the internet to your cluster on the cloud.

## Tips and Best Practices

### Ensuring secure and effective port forwarding

**Prevent Unauthorized Access:**
Use firewall rules, SSH tunnels, tokens, certificates, or passwords to secure your port forwarding. Within your cluster, you can further isolate users or environments using different contexts or namespaces.

**Prevent Port Conflicts with other applications and services:**
To see which ports are in use locally on your system, use the `netstat` command. To see which ports are used on the cluster, use the `kubectl get services` command.

**Stay Alert:**
Use monitoring and logging to quickly identify any unusual activities. Also, Verify data packets to help prevent potential breaches.

## Conclusion

Kubernetes port forwarding allows developers to test and debug applications directly on their own machines, making it a more flexible tool. This simplifies the access to internal cluster services, thereby providing a convenient interface for communication without exposing them to an external network. Knowledge of port forwarding is a valuable asset in the Kubernetes toolkit, whether you're working on a local setup or cloud cluster.

The official Kubernetes documentation providing instructions on [how to use kubectl port forwarding](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/) to Kubernetes [Debug services](https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/) in clusters is a valuable source of information for those who want to learn more about port forwarding and related topics. Other methods and tools to solve service issues are also provided.
