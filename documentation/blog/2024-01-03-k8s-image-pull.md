---
title: Kubernetes Image Pull Policy - A Detailed Guide
description: Image pull policy in Kubernetes is a strategic decision that impacts applications' efficiency, reliability, and security.
slug: kubernetes-image-pull-policy
authors: muhammad_khabbab
category: "Engineering"
tags: [kubernetes]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-03-k8s-image-pull/social.png
hide_table_of_contents: false
---

## Introduction

In the dynamic world of Kubernetes, container images are the building blocks of application deployment. The choice of image pull policy `Always`, `IfNotPresent`, or `Never` is more than a configuration detail; it's a strategic decision that impacts applications' efficiency, reliability, and security.

This article will provide a detailed guide to understanding and implementing these policies, ensuring developers and DevOps professionals can optimize container management in Kubernetes environments. Let's start by understanding what an image is and why its pull policy matters.

## What is a Kubernetes Image?

### A. Definition and Role in Containerized Applications

Kubernetes images are lightweight, standalone, executable packages that contain code, runtime, system tools, libraries, and settings to run software. Image-based containers are the basic units of deployment in Kubernetes clusters.

Containerized applications depend on these images for a consistent running environment. Consistency is essential in a Kubernetes ecosystem, where applications are deployed on developer laptops and high-capacity cloud servers. Kubernetes eliminates the "it works on my machine" problem by using images to ensure consistent application behavior across deployments.

### B. Storage and Reference in Kubernetes

In Kubernetes, images are typically stored in a container registry, which can be either a public registry like Docker Hub or a private one hosted within an organization. These images are then referenced in Kubernetes manifests, such as Pods or Deployment configurations, by their unique names.

The image name usually consists of the registry location, the image's path within the registry, and a tag that identifies the version of the image. For example, `registry.example.com/my-application:v1.2.3` specifies an image named `my-application`, version `v1.2.3`, stored in `registry.example.com`.

Kubernetes uses these references to pull the required images from the specified container registry to the nodes within the cluster where the containers will run. This process is governed by the image pull policy, which determines when and how new images are downloaded. The policy can always be set to pull the latest version, pull if not present on the node, or never pull if an image already exists, providing flexibility and control over how container images are managed in a Kubernetes environment.

## Image Repositories and Registry in Kubernetes

### Public Repositories

- **Definition**: Public image repositories, like Docker Hub, are accessible by anyone. They host container images made available to the public.
- **Use Cases**: Ideal for standard, open-source images or for sharing images broadly.
- **Example**: `nginx`, `redis`, `node`: standard images used universally.

### Private Repositories

- **Definition**: Private repositories are restricted, requiring authentication for access. They host proprietary or sensitive images.
- **Use Cases**: Ideal for enterprise applications or sensitive data handling.
- **Example**: Corporate image repositories hosting proprietary software.

### Configuring Kubernetes to Use Specific Image Repositories

### Using Public Repositories

1.  **Default Behavior**: Kubernetes pulls images from public repositories without any special configuration by default.
2.  **Example**: Deploying an Nginx pod using a public image.
    - `kubectl create deployment mysql --image=mysql`

### Using Private Repositories

1.  **Creating a Secret for Authentication**:

    - Command: `kubectl create secret docker-registry my-registry-secret --docker-server=DOCKER_REGISTRY_SERVER --docker-username=DOCKER_USER --docker-password=DOCKER_PASSWORD --docker-email=DOCKER_EMAIL`
    - This secret will be used to authenticate with the private repository.

2.  **Referencing the Secret in a Pod Configuration**:
    - Use the `imagePullSecrets` field in the pod specification to reference the created secret. See a sample YAML configuration below:

```
apiVersion: v1
kind: Pod
metadata:
  name: my-private-image-pod
spec:
  containers:
    name: private-container
    image: <your-private-image>
  imagePullSecrets:
    name: my-registry-secret
```

### Image Pull Policy in Kubernetes

Kubernetes supports different image pull policies:

- **Always**: Always pull the image from the repository.
- **IfNotPresent**: Pulls the image if not already present locally.
- **Never**: Never pull the image; only use local images.

### Setting Image Pull Policy

- Specify the `imagePullPolicy` in the container spec.
- Example: Setting to `Always` for a development environment.

```
    apiVersion: v1
    kind: Pod
    metadata:
      name: staging-pod
    spec:
      containers:
      - name: staging-container
        image: <your-image>
        imagePullPolicy: Always
```

## Configuring Image Pull Secrets

### A. Step-by-Step Guide on Creating and Configuring Image Pull Secrets

- **Create a Docker Registry Secret**: Use the `kubectl create secret` command. Replace the placeholders with appropriate credentials and the URL of your private docker registry (e.g., GCR, ECR).
  `kubectl create secret docker-registry myregistrykey --docker-username=[your_username] --docker-password=[your_password] --docker-email=[your_email] --docker-server=[your_registry]`

On GCR, I executed the command, and you can see the results below. Note that the command to create the secret on GCR is slightly different than dockerhub as GCR requires a keyfile.json too. Read more about it in the expert tip below.

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-03-k8s-image-pull/image1.PNG" alt="Creating GCR image pull secret with kubectl create secret docker-registry" />
</div>

**Expert Tip:** Traditional docker registries (like dockerhub) rely on username and password for authentication. They are simpler and are typically used for individual or less complex enterprise setups. Whereas cloud-based registries (like GCR) use service accounts and JSON key files for authentication, offering more robust security features suitable for complex, automated, and scalable cloud environments.

- **Verify the Secret**: To ensure the secret is created, run `kubectl get secrets`. Look for `myregistrykey` in the output. The above screenshot shows the execution of this command and gcr key successfully displayed.
- **Inspect the Secret**: Use `kubectl describe secret <my-registry-key>` for a detailed view of the secret's configuration, verifying its correct setup.

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-03-k8s-image-pull/image2.PNG" alt="kubectl get secrets showing myregistrykey in the namespace" />
</div>

### B. How to Attach These Secrets to a Service Account or a Specific Pod

Now, you have two options here. You can attach this image secret directly to a pod, or you can attach it to a service account. Here are the differences between these two approaches.

**Scope:** Direct pod attachment is pod-specific, while service account attachment is broader, affecting all pods using that service account.

**Management:** Pod-specific secrets require more management effort if many pods need access to the secret. Service account attachment is more manageable in such scenarios.

**Flexibility vs. Simplicity:** Attaching secrets to individual pods offers more flexibility (different secrets for different pods), while attaching to a service account offers simplicity (one secret for many pods).

So:

- Attach it to pod directly for a few specific pods or when different
  pods require different credentials.
- Attach it to service account for ease of management and when many pods use the same registry credentials

**Attaching to a Service Account**:

- Create a service account:

`kubectl create serviceaccount myserviceaccount`

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-03-k8s-image-pull/image3.PNG" alt="Creating service account for attaching image pull secrets" />
</div>

You might need to give necessary permissions/add role to this service account (e.g. if it needs to interact with Kubernetes API for example).

- Attach the secret to the service account:
  `kubectl patch serviceaccount myserviceaccount -p '{"imagePullSecrets": [{"name": "myregistrykey"}]}'`

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-03-k8s-image-pull/image4.PNG" alt="Patching service account to include imagePullSecrets" />
</div>

**Attaching to a Specific Pod**:

- Modify your Pod specification to include `imagePullSecrets`:

```
  apiVersion: v1
  kind: Pod
  metadata:
  name: mypod
  spec:
  containers: - name: mycontainer
  image: myimage
  imagePullSecrets: - name: <my-registry-key>
```

- Apply this configuration using `kubectl apply -f podspec.yaml`.

## Understanding Image Pull Policies

Kubernetes, a powerful orchestration tool for container management, provides flexibility in how images are pulled from repositories. Understanding the image pull policies—`Always`, `IfNotPresent`, and `Never`—is crucial for both performance optimization and maintaining security.

### A. Detailed Explanation of Different Image Pull Policies

1.  **Always**: This policy forces Kubernetes always to pull the image from the repository, regardless of whether it is already present on the node. It ensures that the container always uses the latest version of the image, making it ideal for development environments where updates are frequent.
2.  **IfNotPresent**: Kubernetes will pull the image if it is not already present on the node. If the image is on the node, it won't attempt to pull it again. This policy is a balance between resource utilization and ensuring currency. It is useful in production environments where stability and resource optimization are crucial.
3.  **Never**: With this policy, Kubernetes will never pull the image from the repository. It will strictly use local images. This policy is suitable for scenarios where you're using custom or pre-loaded images and don't want any automatic updates from remote repositories.

### B. Examples Showing YAML Configuration for Each Policy

1. **Always**

```
apiVersion: v1
kind: Pod
metadata:
  name: always-pull-policy
spec:
  containers:
  - name: demo-container
    image: demo/image
    imagePullPolicy: Always
```

2. **IfNotPresent**

```
apiVersion: v1
kind: Pod
metadata:
  name: if-not-present-policy
spec:
  containers:
  - name: demo-container
    image: demo/image
    imagePullPolicy: IfNotPresent
```

3. **Never**

```
apiVersion: v1
kind: Pod
metadata:
  name: never-pull-policy
spec:
  containers:
  - name: demo-container
    image: demo/image
    imagePullPolicy: Never
```

### C. When to Use Each Policy for Optimal Performance and Security

1.  **Always**:
    - Use in development environments to ensure the latest updates are always tested.
    - Helpful for continuous integration setups where the latest code changes need to be reflected immediately.
    - Ensures that every time a pod starts, it uses the most recent version of the image, critical for applications requiring up-to-date functionality or security patches.
2.  **IfNotPresent**:
    - Ideal for production environments where stability and resource conservation are priorities.
    - Best for scenarios where frequent image updates are not necessary or when network bandwidth is a concern.
3.  **Never**:
    - Suitable for offline environments or when using tightly controlled, pre-validated images.
    - Ensures security by preventing unauthorized or unexpected image updates.
    - Relies solely on local images, ensuring that pods only use images that have been pre-approved and manually loaded onto the node.

## Conclusion

Mastering Kubernetes image pull policies is critical for streamlined and secure container management. This article has highlighted the use cases of different policies and their practical applications, from rapid development cycles to stable production environments. Adopting the right image pull policy is crucial for maintaining the balance between application consistency, resource optimization, and security in your Kubernetes clusters.
