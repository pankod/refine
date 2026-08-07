---
title: Kubectl Cheat Sheet - With Examples
description: Kubectl is a very handy tool if you want to manage your applications deployed in Kubernetes.
slug: kubectl-cheat-sheet
authors: muhammad_khabbab
category: "Engineering"
tags: [kubernetes, dev-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-15-kubectl-cheat-sheet/social.png
hide_table_of_contents: false
---

## Introduction

Kubernetes is a famous container orchestration tool that is very popular in modern software development. If you are using Kubernetes, you must have used Kubectl, which is the command line tool to manage your Kubernetes applications. This guide will walk you through the most frequently used commands for Kubectl. Not only will we discuss the important commands, but we will also discuss the practical code examples and the common errors that are faced during their execution. Some examples of what it can do includes:

- Management of your pods
- Management of your deployments
- Management of your services
- And many more

Now, we may not be able to cover each and every command, but be assured that the commands discussed below will certainly be of value if your application is using Kubernetes. Let's start with the basic one i.e. installation and setup of Kubectl.

## Setup and Basic Commands

### Installing kubectl: version

Checks kubectl installation and version.

**Common errors:** command not found (No kubectl installed).

Refused connection to localhost:8080: Kubernetes cluster is not running or kubectl is misconfigured.

### Basic Syntax

The basic syntax of any kubectl command is: `kubectl [command] Type [name] [flags]`
Note that 'TYPE' and 'NAME' are context-dependent and may not be required in that order.

**Common Flags:**

Command include get, describe, and create.

Type: pod, service.

Name: Optional for commanding all resources of a type.

Optional flags, like `--namespace` .

**Example:** `kubectl get pods -n mynamespace`

This command lists all 'mynamespace' pods.

**Common Flags:**

Use the -n or --namespace flag to specify the namespace.

Use `kubectl get pods -n mynamespace` with -o or --output for output formats like json or yaml. E.g. `kubectl get pod mypod json`

**Common Errors:** Invalid namespace or output format can cause server errors like "Not Found".

## Cluster Management and Context

### Viewing Cluster Info

`kubectl cluster-info`

Displays cluster master and service endpoints.

**Common Flags:**

`--kubeconfig` This option specifies the kubeconfig file.

**Common Errors:** Unable to connect to server due to network or connection issues.

**Example:** `kubectl cluster-info --kubeconfig=/myconfig`

### Switching Context

Switches one context to another.

`kubectl config use-context [context_name]`

**Common Flags:** It is most of the time used without any specific flags

**Common Errors:**

`error: no context exists with the name: [context_name]` : If context does not exist.

**Example:** `kubectl config use-context staging-context`

## Working with Namespaces

Kubernetes namespaces segment and manage resources. Important namespace operations are below.

### Namespace Creation

This simple command creates a Kubernetes namespace. Due to its specific functionality, it has few variants and flags.
**Example:**

Create a dev namespace using: `kubectl create namespace dev`

**Common Errors:**

Trying to create an existing namespace.
**Common flags:**

- `--dry-run` Shows the namespace without creating it.
- `-o [format]` Outputs details in yaml or json format.

### Namespace Listing

This command displays all Kubernetes namespaces.

**Example:**
Simple list: `kubectl get namespaces`
Detailed list: `kubectl get namespaces -o wide`

**Common Errors:**
Using wrong flags or formats.

**Common Flags:**

- `-o wide`: Shows namespace details like age.
- `-o json` or `-o yaml` The details are output in JSON or YAML.
- `--show-labels`: It shows Namespace labels.

### Namespace Deletion

`kubectl delete [namespace_name]`

This removes a namespace and its resources. Be careful since this is an irreversible operation.

**Example:**
You can delete test namespace using: `Run kubectl delete namespace test`

**Common Errors:**

- Trying to delete a system or nonexistent namespace.
- Not migrating or backing up namespace resources.

  **Common Flags:**

* `--grace-period=[seconds]` Allows setting a grace period before deletion.
* Use `--force` to delete the namespace forecibly.
* `--cascade` : Decides whether to delete namespace resources or not.

## Management of pods and deployment

### Pods Creating

Pods are created with `kubectl run [pod_name]. --image=[image_name]`

**Common Flags:**

- `--env` Configure environment variables.
- `-l, --labels` Labels the pod.
- `--dry-run` Simulate pod-making. It is useful for testing on QA/Staging before deployment to production.

**Example:**
Using the 'nginx' image to create 'nginx-pod' `kubectl run nginx-pod --image=nginx`

**Common Error:**
The `Error: image not found` error occurs when the container image does not exist.

### Get list of pods

See all the pods in currently set namespace `kubectl get pods`

**Common Flags**:

- `-o wide ` To display the details like node name.
- `--show-labels` Labels also display for each pod.
  **Example:**
  `kubectl get pods -o wide` will show all pods with all their details.

**Common Error:**
The `No resources found` error occurs when the namespace has no pods.

### Deleting Pods

The command to delete a pod is `kubectl delete pod [pod_name]`

**Common Flags:**

- `--grace-period`: Pause before killing the pod forcibly.
- `--force`: Immediately delete pod forcibly.

**Example:**

`kubectl delete nginx-pod` removes 'nginx-pod'.

**Common Error:**
A common error is `Pod not found` when the pod does not exist.

### Creating Deployments

Creates a deployment with its name and image `kubectl create deployment [name] --image=[image]`

**Common Flags:**

- `--replicas` Set desired number of replicas.
- Run `--dry-run` to simulate deployment instead of actual deployment.

**Example:**
Use the 'nginx' image to create 'nginx-deployment' `kubectl create deployment nginx-deployment --image=nginx`

**Common Error:**
Image format errors often result in `Invalid image name` errors.

### Listing deployments

Shows namespace deployments `kubectl get deployments`

**Common Flags:**
`-o wide` Shows extra details like replica count.

**Example:**

Displays all deployments `kubectl get deployments`

**Common Error:**
The `No resources found` error occurs when the namespace has no deployments.

## **Handling Services and Nodes**

### Manage Services

Overview
`kubectl get services` helps users quickly view all Kubernetes cluster services and their status.

**Common Flags**:

- `-o wide` : Provides additional details for each service.
- `--all-namespaces` You can see all the services present in all the namespaces.
- `--watch```Monitors service changes and updates display.

**Example:**
`kubectl get services -o wide`
This command will display all default namespace services in detail.

**Common Error:**
`Services' service-name' not found` Typing a service name incorrectly or querying a nonexistent service.

### List Nodes

Command `kubectl get nodes` displays all cluster nodes for size and health assessment.

**Common Flags:**

- `-o wide` Displays extra details like IP addresses, OS, kernel version, etc.
- `--selecto` Filters nodes by label.
- `--showlabels` Shows node labels.

**Example:**
`kubectl get nodes --selector=environment=production` This command displays all production nodes.

**Common Error:**
`Connection to server localhost:8080 refused` Usually due to incorrect kubectl configuration or inaccessible Kubernetes clusters.

## Advanced Resource Management

### Kubectl Labels

Kubernetes labels are key-value pairs on pods. They organize and select object subsets. The command `kubectl get pods -l ` retrieves pods by label.

**Common Flags:**

- `--l` or `--selector`: Specifies label selector
- `--all-namespaces` searches all namespaces
- `-o' or `--output` Outputs the format (yaml, json)

**Example:**
`kubectl get pods -l app=myApp` lists all pods with the label "app" equal to myApp.

**Common Error**:
Incorrect label names or values often result in no results. Ensure pod labels are correct.

### Scale deployments with kubectl

Scaling deployments involves changing the number of pod replicas (instances). The `kubectl scale` command does this magic.

**Common Flags:**

- `--replicas` Specifies number of copies needed
- `--current-replicas` Current replica count (For conditional scaling)
- `--timeout:`Time to wait for scale operation completion

**Example:**

`kubectl scale deployment myDeployment --replicas=5` scales myDeployment to 5 replicas.

**Common Error**:
A `deployment not found` error often occurs when scaling a nonexistent or misnamed deployment. The deployment name must be in the current namespace.

## **Debugging and Logs**

### Log Access

Kubernetes pod logs can be retrieved using `kubectl logs [pod_name]`. Understanding pod-running applications and diagnosing issues requires this command.

**Example:**
`kubectl logs my-app-pod` will show logs of the pod named "my-app-pod".

**Common Error:**
`Error from server (NotFound): pods "my-app-pod" not found` This error occurs when the Kubernetes cluster does not have any pod with this name.

### Tailing Logs

You can stream or "tail" pod logs with `kubectl logs -f [pod_name]`. This helps monitor log outputs in real-time, especially in dynamic environments.

**Example:**
`kubectl logs -f my-app-pod` Logs from the pod "my-app-pod" will be streamed live by this command.

**Common Error:**
`Error from server (NotFound): pods "my-app-pod" not found`. This error means the Kubernetes cluster does not have the specified pod.

## **Secrets and ConfigMaps**

### Creating Secrets

Kubernetes secrets store and manage passwords, OAuth tokens, and ssh keys. You can easily create these secrets with `kubectl create secret generic [secret_name] --from-literal=[key]=[value]`

**Common Flags:**

- `--from-literal` This flag specifies secret data as key-value pairs on the command line.
- `--from-file` Create secret from a file. In this case file name would be considered the key and its content will be the value.
- `--dry-run` Displays the object that would be sent to the cluster without actually sending it.
-
- `--output` or `-o' sets the output format (yaml or json).

**Example:**
`kubectl create secret generic my-secret --from-literal=password=myStrongPassword`

This command creates a secret named my-secret with one entry: password and myStrongPassword.

**Common Error:**

Incorrect or malformed key-value pairs are common when creating secrets. Following key=value format is essential.

### Using ConfigMaps

Kubernetes ConfigMaps stores non-confidential data in key-value pairs. Configuration files, command-line arguments, environment variables, port numbers, etc. can be stored there. The format is `kubectl create configmap [name] --from-literal=[key]=[value]`

**Common Flags**

Same as creating secrets (see above)

**Example:**

`kubectl create configmap app-config --from-literal=app_mode=production`

A ConfigMap named "app-config" with app_mode set to production is created.

**Common Error:**

When using `--from-file`, referencing nonexistent files or directories is a common error. Verify file paths are correct and accessible.

## **Useful Tips and Tricks**

### Aliases for efficiency

Using aliases for kubectl can speed up workflow by reducing keystrokes for each command.

**Example:**

`Alias k=kubectl`
You frequently check pod status. The alias lets you type `k get pods` instead of typing the whole word of kubectl.

### Kubectl Autocomplete for Faster Command Completion

Kubectl supports command-line autocompletion, saving significant time. This feature speeds up command, argument, and resource name completion.

**Setting up autocomplete:**

Source the autocomplete script in your shell's configuration file. For bash, You can add `source <(kubectl completion bash) `to your `.bashrc`. Add `source <(kubectl completion zsh)` to your `.zshrc` file for zsh.

After setting up, typing a command like `kubectl get pod` and pressing tab completes this command to `kubectl get pods`.

### Using Kubectl Port-Forward for Accessing Services Locally

When using `kubectl port-forward`, you can access and interact with internal Kubernetes cluster services from your local machine.

**Example:**

Use `kubectl port-forward svc/my-web-app 5000:8080` to forward a cluster service on port 8080.

The service's port 8080 receives traffic from your local machine's port 5000, so you can access the application at http://localhost:5000 in your browser.

## Conclusion

Kubetcl is a very handy tool if you want to manage your applications deployed in Kubernetes. Whether you are a novice or a seasoned practitioner, this guide will help you on every step of your Kubernetes journey, whether you are creating a pod or scaling your cluster.

Give special attention to the different tips and tricks mentioned in this article because they will save you a lot of time and effort. We encourage you to try the commands mentioned in this article and get your hands dirty; that's the best way to master Kubectl.
