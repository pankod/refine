---
title: Kubectl Scale - DevOps Guide
description: Kubectl scale is a powerful command that allows you to scale your Kubernetes resources. This article will explore different scenarios to scale your Kubernetes replica/nodes.
slug: kubectl-scale
authors: muhammad_khabbab
category: "Ecosystem / Integrations"
tags: [kubernetes]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-25-kubectl-scale/social.png
hide_table_of_contents: false
---

## Introduction

**Understanding Kubernetes Workloads**

In Kubernetes, we deal with several types of workloads, each serving a unique purpose. Let's dive into what these are and how **`kubectl scale`** can be applied to manage them.

**Deployments**

Imagine Deployments as managers for your application instances. They ensure that a specified number of these instances, known as Pods, are running at any given time. Using **`kubectl scale`**, you can tell Kubernetes to increase or decrease the number of Pods in a Deployment.

**StatefulSets**

StatefulSets are like Deployments but with a memory. They're used when your application needs to remember its state (like a database). You can also scale StatefulSets with **`kubectl scale`**, adjusting the number of replicas while maintaining their unique identities and storage.

**ReplicaSets**

ReplicaSets are the workforce behind Deployments. They make sure the right number of Pod replicas are running. Though usually managed by Deployments, you can directly scale ReplicaSets using **`kubectl scale`** if needed.

**DaemonSets**

DaemonSets ensure that each node in your Kubernetes cluster runs a copy of a Pod. It's like having a utility software installed on every computer in an office. Scaling DaemonSets is a bit different. Instead of changing the number of Pods, scaling here typically involves adding or removing nodes from the cluster.

Understanding these workloads and how to scale them efficiently is crucial in Kubernetes. It ensures your applications have the resources they need when they need them, and also that you're not using more resources than necessary. Whether it's handling peak traffic times or scaling down during quieter periods, **`kubectl scale`** gives you the flexibility to manage your application's demands effectively.

## Basic Scaling with kubectl scale

Managing your Kubernetes resources effectively means needing to adjust their scale to accommodate different loads or requirements. This is where the `kubectl scale` command comes into play, offering a straightforward way to change the number of replicas of a resource.

#### Syntax and Usage

The basic syntax for scaling a resource is:
`kubectl scale --replicas=<number> <resource-type>/<resource-name>`

This command allows you to specify the desired number of replicas for a particular resource, such as a Deployment or ReplicaSet.

#### Practical Example

Consider you have a Kubernetes deployment named `printing` that has currently just one replica. We will use the command `kubectl get deployment <deploymentName>` to currently serve replicas. Notice the value in the "available" column, which shows the current replica count available to serve. That is currently 1.

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-25-kubectl-scale/image1.PNG" alt="kubectl get deployment output showing printing deployment with 1 available replica" />
</div>

Now you want to scale it to 3 replicas. Here's how you would do it:
`kubectl scale --replicas=3 deployment/printing`

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-25-kubectl-scale/image2.PNG" alt="kubectl scale command increasing printing deployment replicas to 3" />
</div>

As you can see from above srcreenshot, this command has increased the number of replicas for `printing` deployment to 3.

**Expert tips:**

- Do not confuse replica with pod; they are both different. Replica is the desired number of running pods whereas the pods are the actual running instances of an application. A deployment with 3 replicas might have 2 running pods if one pod is being unhealthy.
- Use the `--dry-run` flag to simulate the scaling command without actually applying the changes. It is helpful when you want to confirm the command syntax, your access rights, the name of the deployment, etc.

## Advanced Scaling Options in Kubectl

### A. Conditional Scaling

Conditional scaling in Kubectl allows you to scale resources based on current states. It's like saying, "If there are 'X' replicas now, change it to 'Y' replicas."

Use the command: `kubectl scale --current-replicas=<number> --replicas=<new-number> <resource>`.

Note that the `resource` here can refer to any of the deployment types mentioned workloads above, e.g., deployment, replica sets, stateful sets, etc.

Let's try this command. In our example, we will use the "deployment" resource.

`kubectl scale --current-replicas=3 --replicas=5 deployment/printing` So this command should increase the replicas to 5, right?

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-25-kubectl-scale/image3.PNG" alt="Conditional scaling failure due to mismatched current replica count" />
</div>

What do you think what happened? The scaling operation failed. And this is the difference between this command (conditional scaling) and the simple non-conditional scaling command we discussed above. The conditional scaling command verifies whether you have specified the current replica count correctly or not. If incorrect, it will not scale. This is contrary to the simple non-conditional scaling command that will scale the replicas to the desired number regardless of the current replica count. Let's correct the command and try again. As you can see below, it worked fine this time.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-25-kubectl-scale/image4.PNG" alt="Conditional scaling succeeds after specifying correct current replicas" />
</div>

#### B. Scaling Multiple Resources

Sometimes, you would like to scale multiple resources simultaneously, e.g., scaling two deployments at the same time, like one for API and one for the front end.

You can use the command: `kubectl scale --replicas=<number> deployment/<deployment1> deployment/<deployment2>`. In our example we have two deployments named printing. You can use the command `kubectl get deployments` to confirm the name of your deployments. Let's scale both of these in the same command.

    kubectl scale --replicas=3 deployment/hello-app deployment/printing

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-25-kubectl-scale/image5.PNG" alt="Scaling multiple deployments in one kubectl scale command" />
</div>
The above screenshots show that both deployments were scaled successfully.

**Expert tips:**

- You can scale more than two deployments in the same command; just use the same format as above.
- If you specify two deployments to scale, but the name of one of the deployments is incorrect, the deployment with the correct name will scale successfully, but the other one with the incorrect name will fail, and you will see its error, too. See the screenshot below for an example.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-25-kubectl-scale/image6.PNG" alt="Partial failure when one deployment name is incorrect during scaling" />
</div>

## Automated Scaling vs. Manual Scaling

### Horizontal Pod Autoscaler (HPA)

Automated scaling in Kubernetes is primarily handled by the Horizontal Pod Autoscaler (HPA). HPA automatically adjusts the number of pods in a deployment, replica set, or stateful set based on observed CPU utilization or other select metrics. It's like having a smart assistant that keeps an eye on your application's load and adjusts resources accordingly without any manual intervention.

To set up HPA, you can use below command:
`kubectl autoscale deployment [deployment-name] --min=[min-pods] --max=[max-pods] --cpu-percent=[target-percentage]`

This command tells Kubernetes to keep the number of pods between the minimum and maximum limits, scaling up or down based on CPU usage. Let's look at the example below:

`kubectl autoscale deployment hello-app --min=2 --max=5 --cpu-percent=80`

In the above example, 80% is the target average CPU utilization across all pods in the deployment. When the average CPU utilization exceeds this threshold, Kubernetes will add more pods (not more than 5 which is max). When the average CPU utilization falls below this threshold, Kubernetes will remove pods (not less than 2, which is the minimum).

**Expert tip:** The scope of this article's scaling options is limited to horizontal scaling. Kubernetes also allows to do vertical scaling. Just like HPA (horizontal pod autoscaler), there is VPA (vertical pod autoscaler) too. Depending on your need, you can utilize vertical pod autoscaler too (a topic for some other day perhaps).

### When to Use Manual Scaling

- Specific Event-Driven Scenarios: If you know there will be a spike in traffic (like a sale or an event), you can proactively scale up.
- Testing and Development: In development environments, you might need to test the behavior of your application under different loads, e.g., load testing, etc.

## Conclusion

This article provided a comprehensive overview of kubectl scale, a crucial tool for managing Kubernetes workloads. We explored different scenarios to scale your Kubernetes replica/nodes. We also explored advanced scaling options like conditional scaling, scaling multiple resources simultaneously, and automated scaling using Horizontal Pod Autoscalers (HPA). Finally, we discussed the pros and cons of manual scaling versus automated scaling and potential scenarios where each might be beneficial.
