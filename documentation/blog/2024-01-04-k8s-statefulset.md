---
title: Kubernetes Statefulset vs Deployment with Examples
description: We'll discuss the practical differences between Deployments and StatefulSets.
slug: kubernetes-statefulset-vs-deployment
authors: muhammad_khabbab
category: "Alternatives"
tags: [kubernetes, comparison]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-04-k8s-statefulset/social.png
hide_table_of_contents: false
---

## Introduction

Kubernetes provides powerful solutions for deploying and managing containerized applications. Two main choices in this regard are Deployment and StatefulSet. However, understanding the differences between these two resources can be a challenge. This article discusses the practical differences between Deployments and StatefulSets. While both serve the critical role of managing applications, they cater to distinct needs and scenarios. Deployments are ideal for stateless applications, where each instance is essentially identical and interchangeable.

On the other hand, StatefulSets are designed for stateful applications that require stable, unique identities and persistent storage. By exploring the functionalities, advantages, and limitations of each, this article aims to provide developers with a clear understanding of when and how to use these Kubernetes resources effectively.

## What is Deployment

Kubernetes deployment creates and manages application replicas. It seamlessly updates your app and lets you revert if something goes wrong. Applications are highly available, and scale and load balance easily with deployments.

### Key deployment features:

**Demand-based scaling:** Increase or decrease running instances automatically.

**Rollout and Rollback:** Smoothly roll out new features or revert to previous versions without downtime.

**Auto-healing:** The Deployment replaces failed or deleted nodes to maintain the desired state.

**Update Strategy:** Roll out updates simultaneously or gradually to minimize disruption.

### A sample deployment configuration

Below is a simple example of a deployment configuration. This YAML file specifies a deployment that manages a set of three replicas of a simple nginx application.

```
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: proxy-deployment
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: proxy
      template:
        metadata:
          labels:
            app: proxy
        spec:
          containers:
          - name: nginx
            image: nginx:1.14.2
            ports:
            - containerPort: 80
```

Let's decode the content of this YAML file:

- `apiVersion`: Specifies the Kubernetes API version.
- `kind`: Indicates that this is a Deployment.
- `metadata`: Provides names and labels for identifying the Deployment.
- `spec.replicas`: Indicates the desired number of replicas.
- `selector`: Selects the pods that this Deployment manages.
- `template`: Describes how the pod replicas should be constructed, including the container image and ports.

## What is StatefulSet

Consider a scenario where you are developing an e-commerce application where you have to maintain the state of the cart and sessions, you would need some way of persisting the data and the state. This is where StatefulSets enter the scene, ensuring that each pod's identity and data are maintained across restarts and rescheduling. Unlike deployment, which is great for stateless applications (think of them as forgetful), a StatefulSet remembers its data (state) even if moved around in a cluster.

### Key StatefulSet features:

**Stable, Unique Network Identifiers:** Each pod in a StatefulSet gets a unique, stable hostname and network identifier, ensuring consistent and identifiable access to the network and storage, which is crucial for stateful applications like databases.

**Persistent Storage Management:** StatefulSets manage the deployment and scaling of a set of Pods, while maintaining the persistent storage associated with each pod. This means that even if a pod is rescheduled to a different node, it retains its storage, ensuring data persistence.

**Ordered, Graceful Deployment and Scaling:** Pods in a StatefulSet are created, updated, and deleted in a strict, ordered manner (based on their ordinal index). This ensures controlled scaling and rolling updates, maintaining the order and integrity crucial for stateful applications.

### A sample StatefulSet configuration

```
    apiVersion: apps/v1
    kind: StatefulSet
    metadata:
      name: scheduling-statefulset
    spec:
      serviceName: "scheduling-service"
      replicas: 3
      selector:
        matchLabels:
          app: scheduling-app
      template:
        metadata:
          labels:
            app: scheduling-app
        spec:
          containers:
          - name: scheduling-container
            image: scheduling-image
      volumeClaimTemplates:
      - metadata:
          name: scheduling-storage
        spec:
          accessModes: [ "ReadWriteOnce" ]
          resources:
            requests:
              storage: 2Gi

```

In this sample, we have a StatefulSet named `scheduling-statefulset`, with three replicas. Notice the `serviceName`, which is key to maintaining the network identity for each pod. The `volumeClaimTemplates` section is where the StatefulSet plays and important role, allowing each pod in the set to have its own persistent storage.

## Practical example - deploying a stateful application

**Pre-requisite:** You have already created a cluster successfully.

### Create your YAML file

Create the Statefulset through YAML file. Let's create a Mysql database, which is an example of a stateful application. We will use a public image of Mysql. See the below YAML file for details.

```
    apiVersion: apps/v1
    kind: StatefulSet
    metadata:
      name: mysql-statefulset
    spec:
      serviceName: "mysql"
      replicas: 1
      selector:
        matchLabels:
          app: mysql
      template:
        metadata:
          labels:
            app: mysql
        spec:
          containers:
          - name: mysql
            image: mysql:5.7
            env:
            - name: MYSQL_ROOT_PASSWORD
              value: <YOUR_PASSWORD>
            ports:
            - containerPort: 3306
            volumeMounts:
            - name: mysql-persistent-storage
              mountPath: /var/lib/mysql
      volumeClaimTemplates:
      - metadata:
          name: mysql-persistent-storage
        spec:
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 1Gi
```

**Expert tip:** Keep an eye on the environment variables needed for this YAML to work. In this case of SQL, we need to provide the master password of Mysql as part of the YAML file. This is referenced by `<YOUR_PASSWORD>` in the above-mentioned YAML file.

### Apply the statefulset YAML file

Now we just need to apply this YAML file through the command `kubectl apply -f mysql.yaml`

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-04-k8s-statefulset/image1.PNG" alt="kubectl apply output creating mysql StatefulSet from YAML" />
</div>

### Verify the statefulset successfully running

Let's verify if our statefulset is actually created or not. This can be checked by the command `kubectl get statefulsets`

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-04-k8s-statefulset/image2.PNG" alt="kubectl get statefulsets output showing mysql statefulset status" />
</div>

You can also see the pods associated with this statefulset, Just run the command `kubectl get pods -l <label-key>=<label-value>` In my case, it was `app=mysql` so I executed below command. You can see the pods running for this statefulset.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-04-k8s-statefulset/image3.PNG" alt="Listing mysql pods with kubectl get pods -l app=mysql" />
</div>

To scale your statefulset, you can use the command `kubectl scale statefulsets [statefulset-name] --replicas=[new-replica-count]`. Similalry you can update the container image used in your statefulset to deploy a new version of your application.
by running the command: `kubectl set image statefulset [statefulset-name] [container-name]=[new-image-name]`

### Possible errors when using statefulsets

Statefulsets are state-conscious as compared to deployment that is stateless. As a result, you are likely to face more errors when creating a statefulset. Below are some possible issues you might encounter only when creating statefulsets.

**Persistent Volume Claim (PVC) Conflicts:** Error when the specified PVCs are not available or in use by another StatefulSet or pod.

**Headless Service Requirement:** Error due to the absence of a required headless service for the StatefulSet's network identity.

**Pod Naming Issue:** Error if the StatefulSet's pod name format conflicts with Kubernetes naming conventions.

**Update Strategy Misconfiguration:** Error caused by an improperly configured update strategy, unlike Deployments that support rolling updates by default.

**Stateful Pod Scheduling Failure:** Error when pods fail to schedule due to persistent storage affinity constraints, not common in stateless Deployments.

## Practical example - deploying a stateless application

**Pre-requisite:** You have already created a cluster successfully.

### Create your YAML file

```
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: stateless-app1
      namespace: default
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: stateless-app1
      template:
        metadata:
          labels:
            app: stateless-app1
        spec:
          containers:
          - name: hello-app-1
            image: gcr.io/google-samples/hello-app:2.0
            resources:
              requests:
                cpu: "500m"
                memory: "2Gi"
              limits:
                cpu: "500m"
                memory: "2Gi"
```

In this YAML file:

- **API Version and Kind**: The `apiVersion` and `kind` fields specify the API version of the resource and the type of resource, which is a `Deployment` in this case.

  - **Metadata**: Includes the `name` and `namespace` for the deployment. The `namespace` defaults to `default` if not specified.
  - **Spec**: Defines the desired state of the deployment:
  - `replicas`: The number of desired pods.
  - `selector`: Specifies how the deployment finds the pods it manages using `matchLabels`.
  - `template`: Defines the pods to be created with a `metadata` section for labels and a `spec` section detailing the container configuration.

- **Container Specs**: Include the `name` of the container, the `image` to use, and the `resources` block, which defines the CPU and memory `requests` and `limits` for the container.

### Apply the stateless YAML file

Now we just need to apply this YAML file through the command `kubectl apply -f stateless-app1.yaml`

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-04-k8s-statefulset/image4.PNG" alt="kubectl apply output creating stateless-app1 deployment" />
</div>

### Verify the deployment is successfully running

Let's verify if our deployment is actually created or not. This can be checked by the command `kubectl rollout status deployment/[deployment-name]` Let's verify this

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-04-k8s-statefulset/image5.PNG" alt="kubectl rollout status confirming deployment successfully rolled out" />
</div>

As you can see from the above screenshot, the deployment was rolled out successfully. To confirm how many pods for this deployment are currently running, the command is `kubectl get pods -l app=[deployment-label]` The above screenshots shows 3 pods (replicas) running for this deployment.

## Comparison of deployment and statefulset

The below comparison table will help you understand the difference between these two important entities in Kubernetes world.

| Aspect                    | Deployment                                                                                                              | StatefulSet                                                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Primary Use-Case**      | Managing stateless applications.                                                                                        | Managing stateful applications.                                                                                    |
| **When to Use**           | - When you need to scale stateless applications. - For applications where each instance is interchangeable.             | - When you need stable, unique network identifiers - For applications that require persistent storage.             |
| **Replica Management**    | Each pod gets a random hash value as part of its name.                                                                  | Each pod is assigned a unique ordinal index that remains as long as the pod exists.                                |
| **Storage**               | Usually uses ephemeral storage. Persistent volumes can be used but are not managed as part of the deployment lifecycle. | Supports stable storage using Persistent Volumes that are linked to each pod's ordinal index.                      |
| **Scaling Behavior**      | Scales out replicas without considering order or state.                                                                 | Scales out replicas in a predictable order. Pods are created and deleted in order.                                 |
| **Update Strategy**       | Supports Rolling Update and Recreate strategies.                                                                        | Primarily uses Rolling Updates. Updates proceed in the reverse order of the pod ordinal index.                     |
| **Failover Behavior**     | In case of node failure, pods are rescheduled without regard to the original state.                                     | Maintains the same network identity even after rescheduling, which is crucial for certain data-heavy applications. |
| **Pod Name Preservation** | Pod names change when pods are replaced.                                                                                | Pod names are preserved (using a sticky identity) when pods are rescheduled.                                       |
| **Use Case Examples**     | - Web servers - Stateless backend services                                                                              | - Databases (like MySQL, PostgreSQL) - Any system where data consistency and order are important                   |
| **Pre-Requisites**        | Basic understanding of Kubernetes objects.                                                                              | Understanding of persistent storage and headless services for stable network identifiers.                          |

## Conclusion

Kubernetes Deployments and StatefulSets cater to different needs in application management. Deployments are ideal for stateless applications, offering features like automatic scaling, easy updates, and high availability. Deployments excel in scenarios where quick scaling and rapid deployment changes are needed.

In contrast, StatefulSets are designed for stateful applications, ensuring stable network identifiers and persistent storage. They're essential when dealing with applications like databases, where data persistence and order are crucial. Choosing between a Deployment and a StatefulSet depends on whether your application requires statefulness or benefits from statelessness.
