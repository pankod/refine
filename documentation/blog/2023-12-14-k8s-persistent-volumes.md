---
title: Kubernetes Persistent Volumes - Best Practices and Use Cases
description: Kubernetes Persistent Volumes (PVs) and Persistent Volume Claims (PVCs) are key tools for storing data in containerized environments.
slug: kubernetes-persistent-volumes
authors: muhammad_khabbab
category: "Engineering"
tags: [kubernetes]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-14-k8s-persistent-volumes/social.png
hide_table_of_contents: false
---

## Introduction

Welcome to our guide on Kubernetes Persistent Volumes (PVs) and Persistent Volume Claims (PVCs). In this article, we'll explore how Kubernetes handles data storage, a key part of running applications that need to save data permanently. We'll start with a basic introduction to Kubernetes and why keeping data safe and accessible is important in systems where applications are in containers.

Our goal is to give you a clear and straightforward understanding of PVs and PVCs—how they work, how they differ from temporary storage, and how to set them up and use them in different scenarios. This guide is designed for anyone interested in Kubernetes, whether you're just starting out or looking to deepen your knowledge about Kubernetes storage.

## Conceptual Overview of Persistent Volumes and Claims

### Basic explanation of Persistent Volumes (PV) and Persistent Volume Claims (PVC)

In Kubernetes, a **Persistent Volume (PV)** is a storage unit in the cluster, provisioned by an administrator or dynamically through Storage Classes. It functions as a cluster resource, independent of individual pod lifecycles, much like a node.

A **Persistent Volume Claim (PVC)** is a user's request for storage. Analogous to how pods consume node resources, PVCs utilize PV resources. They can specify size requirements and access modes, such as single read/write or multiple read-only mounts.
Here is a conceptual diagram showing difference between the two. Image credit: stackoverflow.com

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-14-k8s-persistent-volumes/image3.PNG" alt="Conceptual diagram showing relationship between Persistent Volumes and Persistent Volume Claims" />
</div>

### Highlighting the difference between ephemeral and persistent storage in Kubernetes

Kubernetes' ephemeral storage is tied to a pod's lifecycle, being temporary and deleted with the pod. Examples include _emptyDir_ volumes.

Conversely, persistent storage survives beyond pod terminations, essential for data persistence across restarts and crashes. **Persistent Volumes (PVs)** and **Persistent Volume Claims (PVCs)** are crucial Kubernetes objects enabling persistent storage.
Screenshot Suggestion: Diagram illustrating PV and PVC relationship

## Setting Up Your Environment for PV

### Instructions on setting up a Kubernetes environment suitable for experimenting with PVs (e.g., Minikube setup)

**Install Minikube**: Begin by installing Minikube, which simulates a Kubernetes cluster on a local machine. Use the command `minikube start` to initiate the cluster.

**Install kubectl:** Ensure that `kubectl` is installed, as it's the command line tool for interacting with the Kubernetes cluster.

**Verify Installation**: Use `kubectl version` to verify both client and server versions.

**Enable Necessary Add-ons**: Some add-ons might be needed for PVs, like the storage-provisioner. Enable them using `minikube addons enable <addon-name>`.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-14-k8s-persistent-volumes/image1.PNG" alt="Minikube environment setup with kubectl version verification" />
</div>

## Deep Dive into Persistent Volume Types

### Exploration of different types of Persistent Volumes and their suitability

Kubernetes supports various persistent volume types, catering to different data storage requirements.

#### HostPath

A HostPath Persistent Volume utilizes a file or folder on the Node’s filesystem. It is used for single node testing.

Example YAML:

```
apiVersion: v1

kind: PersistentVolume
metadata:
  name: example-hostpath
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/mnt/data"
```

#### NFS

Multiple nodes can share files stored on an NFS Persistent Volume. It is used to exchange data between multiple pods.

Example YAML:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: example-nfs
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteMany
  nfs:
    path: "/usr/local/path"
    server: <nfs-server-ip>
```

#### AWS EBS

AWS Elastic Block Store (EBS) is a storage service from Amazon that provides block-level storage volumes for EC2 instances.

Example YAML:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: aws-ebs-prod-ec2
spec:
  capacity:
    storage: 16Gi
  accessModes:
    - ReadWriteOnce
  azureDisk:
    diskName: "<disk-name>"
    diskURI: "<disk-uri>"
    fsType: "ext4"
```

## Creating and Configuring a Persistent Volume

### Step-by-step guide on creating a PV in Kubernetes

1. Define the Persistent Volume (PV) in a YAML file:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: example-pv
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  hostPath:
    path: "/mnt/data"

```

1. Apply the YAML file using `kubectl`:

```
kubectl apply -f pv.yaml
```

The output will show you following:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-14-k8s-persistent-volumes/image2.PNG" alt="Kubectl apply output showing PersistentVolume example-pv created successfully" />
</div>

### Configuring access modes and storage classes

- Access modes determine how the PV can be accessed. Common access modes include `ReadWriteOnce`, `ReadOnlyMany`, and `ReadWriteMany`.
- Storage classes are used to define different storage types. You can specify a storage class in the PV definition under `storageClassName`.

Example of specifying a storage class:

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: example-pv
spec:
  storageClassName: gp2
```

## Working with Persistent Volume Claims

### Demonstrating how to create and manage PVCs

Create a PVC by defining it in a YAML file:

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mypvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

Apply it with `kubectl apply -f pvc.yaml` just like below screenshot.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-14-k8s-persistent-volumes/image4.PNG" alt="Creating PersistentVolumeClaim mypvc with kubectl apply command" />
</div>

You can manage it with commands like `kubectl get pvc` to list PVCs, or `kubectl delete pvc mypvc` to delete.

### Linking PVCs to Pods and understanding the binding process

Pods use PVCs by referencing them in their YAML files:

```
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
    - name: mycontainer
      image: nginx
      volumeMounts:
        - mountPath: "/var/www/html"
          name: myvolume
  volumes:
    - name: myvolume
      persistentVolumeClaim:
        claimName: mypvc
```

A Pod's successful binding to a PVC is checked by:
`kubectl describe pod mypod`

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-14-k8s-persistent-volumes/image5.PNG" alt="Pod description showing successful PVC binding to mypod volume mount" />
</div>

## Advanced Scenarios and Best Practices

### Handling dynamic volume provisioning

Dynamic volume provisioning simplifies the process of managing storage in Kubernetes by automatically provisioning storage volumes as needed. This eliminates the need for administrators to manually create and manage PVs.

To enable dynamic volume provisioning, you will need to install and configure a storage provisioner. A storage provisioner is a Kubernetes controller that watches for PersistentVolumeClaims (PVCs) and provisions PVs based on the requests in the PVCs.

Once you have installed and configured a storage provisioner (e.g. AWS EBS), you can use the following steps to provision storage for your Pods:

1. Create a StorageClass. A StorageClass is a Kubernetes resource that defines the storage requirements for your Pods. The StorageClass specifies the provisioning parameters for the PV that will be created.

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-storage-class
provisioner: my-provisioner
```

2. Create a PVC (PersistentVolumeClaim). A PVC is a storage request submitted by a Pod. The PVC specifies the access modes and storage capacities for the PV that it requires. See above for creating a PVC.

3. Create a Pod. The Pod specifications should reference the PVC that you created in step 2.

```
apiVersion: v1
kind: Pod
metadata:
  name: production-pod-ec2
spec:
  containers:
    - name: production-api-container
      image: busybox
      volumeMounts:
        - name: production-EU-PVC
          mountPath: /mnt/data
  volumes:
    - name: production-EU-PVC
      persistentVolumeClaim:
        claimName: prod-pvc
```

Once the Pod is created, the storage provisioner will automatically provision a PV that meets the requirements of the PVC. The Pod will then be able to mount the PV and access the storage.

You can also use the `kubectl get pv` and `kubectl get pvc` commands to view the status of your PVs and PVCs.

### Tips on managing PV lifecycle, including expanding and reclaiming volumes

**Expanding Volumes**: Ensure the storage class has `allowVolumeExpansion: true`. To expand a PVC, simply edit the PVC and increase the `spec.resources.requests.storage` value.

**Reclaiming Volumes**: Set `persistentVolumeReclaimPolicy` to `Delete` or `Retain` in your PV to control the reclaim behavior when a PVC is deleted.

### Addressing security considerations in persistent storage

**Use RBAC**: Restrict access to PVCs using Role-Based Access Control (RBAC) policies.

**Encryption**: Enable encryption at rest for your storage volumes to protect sensitive data.

**PVC Access Modes**: Choose the correct access mode (`ReadWriteOnce`, `ReadOnlyMany`, `ReadWriteMany`) based on your security and sharing requirements.

## Conclusion

This article has thoroughly covered Kubernetes Persistent Volumes (PVs) and Persistent Volume Claims (PVCs), key tools for storing data in containerized environments. We learned how PVs and PVCs work, their differences from temporary storage, and why they're important for keeping data safe even when containers stop or fail.

The guide walked us through setting up a Kubernetes environment with Minikube and kubectl, and explained different types of PVs like HostPath, NFS, and AWS EBS, each suited for specific needs. It showed us how to create and use PVs and PVCs, and delved into advanced topics like automatically managing storage with dynamic volume provisioning.

Finally, we shared tips on managing PVs, like how to expand or delete them, and discussed important security practices. In short, this guide is a practical resource for anyone looking to understand and use persistent storage in Kubernetes, making data management more efficient and secure in various applications.
