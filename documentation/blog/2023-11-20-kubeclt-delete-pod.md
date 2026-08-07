---
title: A Guide for Delete Pods from Kubernetes Nodes - kubectl delete
description: We'll learn how to delete pods from Kubernetes nodes using the kubectl delete command.
slug: kubectl-delete-pod
authors: muhammad_khabbab
category: "Ecosystem / Integrations"
tags: [kubernetes]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-19-kubectl-delete-pod/social.png
hide_table_of_contents: false
---

## What is a pod in Kubernetes

Kubernetes has the smallest execution unit, called a pod. A pod includes one or more applications. Pods are ephemeral by nature, so if a pod fails (or the node on which it is executing fails), Kubernetes has an automatic way of creating new replicas of that pod in order to keep the operation running. Within the Kubernetes system, containers, such as Docker containers, that are in the same pod will share the same compute resources.

Steps we'll cover in this post:

- [What is a pod in Kubernetes](#what-is-a-pod-in-kubernetes)
- [Why one might need to delete pods](#why-one-might-need-to-delete-pods)
- [Precautions Before Deleting a Pod](#precautions-before-deleting-a-pod)
  - [Importance of ensuring application resilience](#importance-of-ensuring-application-resilience)
  - [Dangers of hurriedly deleting pods without checks](#dangers-of-hurriedly-deleting-pods-without-checks)
- [Deleting All Pods from a Node](#deleting-all-pods-from-a-node)
  - [Explanation of `kubectl drain` command](#explanation-of-kubectl-drain-command)
- [Verifying the node's pods before and after the drain](#verifying-the-nodes-pods-before-and-after-the-drain)
  - [Handling special cases (NoExecute and DaemonSet pods)](#handling-special-cases-noexecute-and-daemonset-pods)
  - [The `--force` flag and its implications](#the---force-flag-and-its-implications)
  - [Removing the node from the cluster](#removing-the-node-from-the-cluster)
- [Individually Deleting Pods from Nodes](#individually-deleting-pods-from-nodes)
  - [Why you might want a more controlled approach](#why-you-might-want-a-more-controlled-approach)
  - [Use of the `kubectl cordon` command](#use-of-the-kubectl-cordon-command)
  - [Deleting individual pods](#deleting-individual-pods)
- [Handling Deployment and ReplicaSet pods](#handling-deployment-and-replicaset-pods)
- [Working with StatefulSet pods](#working-with-statefulset-pods)
- [Bringing Pods Back onto Nodes](#bringing-pods-back-onto-nodes)
  - [The `kubectl uncordon` command](#the-kubectl-uncordon-command)
  - [Verifying pods being scheduled back onto the node](#verifying-pods-being-scheduled-back-onto-the-node)

## Why one might need to delete pods

You may have to delete pods from one or more worker nodes for a variety of reasons, such as debugging node issues, upgrading and removing nodes from the cluster if you are deploying container applications using Kubernetes. In some cases, it is necessary to delete your pod from the node in order to manually scale down a cluster for testing purposes or sometimes when all pods need to be removed from any specific node due to maintenance.

## Precautions Before Deleting a Pod

### Importance of ensuring application resilience

The provision of a consistent and reliable service that will satisfy user expectations and needs shall help to improve customer satisfaction and loyalty. If the service is reliable and available, it will be less likely that customers will switch to competitors or complain. A reduction in the frequency and effect of failures and interruptions, helps to reduce operating costs and risks. Failures may also result in revenue loss, data loss, security breach or reputational damage. These effects may be avoided or mitigated through resilient applications that can recover quickly from a failure and restore normal operations.

### Dangers of hurriedly deleting pods without checks

1. Deleting pods without first performing checks might cause your service to go down or perform poorly, especially if you delete too many pods at once or delete crucial pods that are not replicated.
2. You may lose or otherwise damage your data if you remove the pod without checking it, especially in cases where there is no backup or replication of stored and processed data.
3. Deleting pods without performing any checks can lead to issues and failures propagating throughout your system, particularly if the deleted pods are connected to a communication network or a dependency chain.

## Deleting All Pods from a Node

### Explanation of `kubectl drain` command

A drain command is used to gracefully remove a node from service, evicting all pods running on that node and scheduling them for other available nodes while preventing new Pods from being scheduled at that time. To avoid any possible data loss or disruption to running applications, the kubectl drain command ensures that the pods are not abruptly terminated. This enables node maintenance and troubleshooting to be planned without affecting the availability of applications.

For Example, if we want to drain minikube node having the pods managed by '**DaemonSet**' Controller (we used `–ignore-daemonsets` Flag) and other pods which are not managed by any controller (we used `–force` flag), we will execute the command below:

`kubectl drain minikube --ignore-daemonsets --force`

**The Above Command will return the following output:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-19-kubectl-delete-pod/KD_1.png" alt="Draining minikube node using kubectl drain with ignore-daemonsets and force flags" />
</div>

<br/>

## Verifying the node's pods before and after the drain

It is critical to verify the node's pods before and after the drain to ensure that the pods are correctly relocated to other nodes and that the service is not disturbed. Before and after the drain, we can use the command below to list the pods and their node assignments for all namespaces:

`kubectl get pods --all-namespaces -o wide`

**As you can see in the output below, the above command will return the name, namespace, status, restarts, age, IP, node, and nominated node for each pod. We can see which pods were evicted from the drained node and which nodes they were assigned to by comparing the outputs:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-19-kubectl-delete-pod/KD_2.png" alt="Listing all pods across namespaces showing node assignments before and after drain" />
</div>

<br/>

### Handling special cases (NoExecute and DaemonSet pods)

Pods with a toleration of the node are NoExecute pods. If they do not have a **toleranceSecond** value that indicates how long the taint can be tolerated, those pods may stay on the node for an indefinite period of time. You must use the `--force` flag with `kubectl drain`, which will delete the pods without waiting for graceful termination, to force the removal of these pods.
A daemonSet controller manages pods, ensuring that a copy of each pod executes on every node in the cluster. `kubectl drain` does not evict DaemonSet pods by default unless you specify the `--ignore-daemonsets` flag, which ignores the pods and continues the drain.

### The `--force` flag and its implications

When you drain a node with pods that are managed by ReplicationController, ReplicaSet, Job, DaemonSet, or StatefulSet, the corresponding controller will regenerate those pods. As a result, if you attempt to drain a node that contains such a pod, you will receive an error message as a warning. However, in order to execute the drain operation in this case, you need to use the `--force` option.

### Removing the node from the cluster

For gracefully removing the node, once the node got drained and not running any deployment, pod, statefulSet or DaemonSets, then you can follow the syntax below for the command to delete that node from the cluster:

`kubectl delete node [NAME_OF_NODE]`

For Example, we have a node with the name '**minikube**', and we have drained the node already. So, now we will run the following command to remove it from the cluster:

`kubectl delete node minikube`

**The above command will return the following output:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-19-kubectl-delete-pod/KD_3.png" alt="Deleting minikube node from cluster using kubectl delete node" />
</div>

<br/>

## Individually Deleting Pods from Nodes

### Why you might want a more controlled approach

A controlled approach for deleting pods is important because it allows better fault tolerance, which ensures that node issues have little impact on service availability and also helps in optimizing resource utilization by releasing resources on a particular node, helping to prevent degradation.

### Use of the `kubectl cordon` command

A reliable method for removing pods from nodes in a controlled manner is executing the `kubectl cordon` command. This powerful command designates a node as unschedulable, ensuring that no additional pods will be allocated to it. Yet, the current pods still on that node will remain active and successfully handle incoming requests. This practical approach enables you to effectively delete pods from the node without compromising the accessibility of your cluster.
For Example, we will use the command below to mark our node (i.e., minikube) unschedulable:

`kubectl cordon minikube`

**The Above Command will return the following output:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-19-kubectl-delete-pod/KD_4.png" alt="Marking minikube node as unschedulable using kubectl cordon" />
</div>

<br/>

### Deleting individual pods

Once a node is cordon, you can delete single pods from that node through the kubectl delete pod command. You can Delete a pod by name [*and optionally by namespace*]. kubectl get pods command with `--field-selector` allows you to list the pods that are in a particular node.
For Example, First, we list the Pods in our 'minikube' node using the following command:

`kubectl get pods --all-namespaces --field-selector spec.nodeName=minikube`

**The above command will return the output below:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-19-kubectl-delete-pod/KD_5.png" alt="Listing pods on minikube node using field-selector" />
</div>

<br/>

Suppose in the list of pods, we want to delete the pod named '**my-demo-pod**'. We will execute the command below to individually delete that specific pod from the minikube node:

`kubectl delete pod my-demo-pod`

**The above command will return the following output:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-19-kubectl-delete-pod/KD_6.png" alt="Deleting my-demo-pod from cordoned node" />
</div>

<br/>

## Handling Deployment and ReplicaSet pods

A deleted pod will be re-created in case it belonged to a Deployment or ReplicaSet and scheduled to another node. In turn, this maintains the required number of replicas. On the other hand, in order to delete all the deployment or ReplicaSet pods from a node, you need to scale up the replica count before deleting the pods and then scale down the replica count. It will ensure that the pods are not scheduled back onto the same node.

For Example, we have a deployment named '**example-deployment**', we will scale up the replica count using the command below:

`kubectl scale deployment example-deployment --replicas=4`

**The above Command will return the output below:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-19-kubectl-delete-pod/KD_7.png" alt="Scaling example-deployment to 4 replicas using kubectl scale" />
</div>

<br/>

Now we will list the pods of the '**example deployment**' that comes under the '**example-namespace**' on the minikube node by running the command below:

`kubectl get pods -l app=nginx -n example-namespace --field-selector spec.nodeName=minikube`

**The above Command will return the output below:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-19-kubectl-delete-pod/KD_8.png" alt="Listing nginx pods in example-namespace on minikube node" />
</div>

<br/>

Now, we will delete the pod(my-demo-deployment-cbdccf466-p8zjf) listed in the output above and then by running the command below, we will see that the pod is recreated:

`kubectl get pods -l app=nginx`

**The below output shows that the pod is recreated in the same minikube node(as we are using the single-node Kubernetes environment):**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-19-kubectl-delete-pod/KD_9.png" alt="Pod automatically recreated after deletion, shown in kubectl get pods output" />
</div>

<br/>

Now, we will scale down the replica count of 'example-deployment' by using the command below:

`kubectl scale deployment example-deployment --replicas=3`

**The below output shows that the replica count has been scaled down:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-19-kubectl-delete-pod/KD_10.png" alt="Scaling example-deployment down to 3 replicas" />
</div>

<br/>

## Working with StatefulSet pods

However, it is important to note that StatefulSet pods behave differently when deleting them. Deleting the StatefulSet pod does not automatically trigger rescheduling to another node. Instead, it is replicated at the same node with the same name and ordinal index. The reason for this is that StatefulSet pods have a unique and persistent identifier within the cluster. Hence, if you intend to remove pods of StatefulSet from a node, start by decreasing the size of the StatefulSet by scaling it down to reduce the number of replicas and then delete the pods.

Suppose we have a StatefulSet named '**demo-statefulset**' having 3 pods, and we will scale down the replica count to 2 by running the command below:

`kubectl scale statefulset demo-statefulset --replicas=2`

**The output below confirms that 'demo-statefulset' has been scaled down to 2 Replicas:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-19-kubectl-delete-pod/KD_11.png" alt="Scaling demo-statefulset down to 2 replicas" />
</div>

<br/>

After listing the StatefulSet pod in the minikube node, we can see two pods, '**demo-statefulset-0**' and '**demo-statefulset-1**'. We will delete the '**demo-statefulset-0**' pod by running the command `kubectl delete pod demo-statefulset-0` and verify that '**demo-statefulset-0**' is deleted and not recreated on the minikube node by running the command below:

`kubectl get pods -l app=web-app`

## Bringing Pods Back onto Nodes

### The `kubectl uncordon` command

Use the `kubectl uncordon` command to mark a node as schedulable and ready to receive new pods to be scheduled. Pods can return to a node that was previously cordoned or drained as well. For Example, if we have previously cordon the minikube node and its status was '**SchedulingDisabled**', we can execute the command below to mark the minikube node as schedulable:

`kubectl uncordon minikube`

**The above Command will return the following output:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-19-kubectl-delete-pod/KD_12.png" alt="Marking minikube node as schedulable again using kubectl uncordon" />
</div>

<br/>

### Verifying pods being scheduled back onto the node

After you uncordon a node, you can verify that pods are being scheduled back onto the node using the below command. It will show you the pods that are running on a specific node.

`kubectl get pods`

**After running the command above, you can see in the output below that the 'demo-deployment' pod, which was deleted from the 'minikube' node when it was cordoned, has been rescheduled and recreated on the 'minikube' node after it was uncordon:**

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-19-kubectl-delete-pod/KD_13.png" alt="Pods successfully rescheduled to uncordoned minikube node" />
</div>

<br/>

## Conclusion

Understanding the complexities of pod deletions in a Kubernetes environment is critical for ensuring your applications stay resilient and reliable. Although Kubernetes has been designed to handle pod termination cases smoothly, quick or blinded pod removal might cause service downtime, data loss, and potential cascading failures. The manner in which various pods are deleted varies on the type(Deployments, StatefulSets, or DaemonSets) they belong. To avoid scheduling the pods on the same node again, techniques such as reducing the number of replicas before deletion must be adopted.

It is highly recommended that before adopting pod deletion techniques in a production Kubernetes cluster, you practice and experiment in a safe, non-production environment such as a development or staging cluster. This hands-on experience allows you to become familiar with the complexities of pod management and the implications of various deletion actions. You can improve your skills, test your understanding of pod behaviors, and fine-tune your deletion procedures by practicing in a controlled environment. Careful preparation in a secure environment is essential for Kubernetes pod management success.
