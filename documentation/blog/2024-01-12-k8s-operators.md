---
title: Kubernetes Operators
description: This article digs deep into the essence of Kubernetes operators, explaining their purpose, functionality, and how they are actually implemented.
slug: kubernetes-operators
authors: muhammad_khabbab
category: "Engineering"
tags: [kubernetes]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-12-k8s-operators/social.png
hide_table_of_contents: false
---

## Introduction

Kubernetes operators are revolutionizing the way we manage complex applications in cloud environments. These operators, similar to intelligent assistants, automate critical tasks like upgrades, monitoring, and configuration changes in Kubernetes applications. This article digs deep into the essence of Kubernetes operators, explaining their purpose, functionality, and how they are actually implemented.

We will also provide detailed step-by-step instructions to create and deploy a basic operator in a Kubernetes cluster. Let's start by understanding operators in more detail.

## Understanding Kubernetes Operators

### What Kubernetes operators are

Operators handle Kubernetes applications like smart assistants. Imagine a complex system with many apps that need constant upgrades, changes, and monitoring. Handling this manually is difficult but Kubernetes operators simplify this. They are like customized helpers who know what an app needs. Automating component installation, upgrades, and repairs is super simple through operators. They are essential for application deployment, scalability, and management automation.

### Why they should be used?

Kubernetes Operators provide valuable services including the following:

- They manage application and service deployment lifecycles automatically.
- They monitor performance and automatically adjust instances to match demand.
- Operators perform backups, upgrades, and fixes. They maintain cluster application performance.

Using the declarative Kubernetes API, operators can simplify these duties. This keeps them in the user-specified state.

Operators make these tasks easier by using the Kubernetes API and its declarative approach. This way, they maintain the desired state specified by the user.

A simple operator definition in YAML:

```bash
apiVersion: operators.coreos.com/v1beta1
kind: Operator
metadata:
  name: my-custom-operator
spec:
  serviceName: "my-app-service"
  size: 3
  version: "1.0.0"
```

The above configuration defines an operator named `my-custom-operator`. It targets a service `my-app-service` with three replicas of version `1.0.0`. The operator will monitor and manage the state of this service in the Kubernetes cluster.

## Types of Kubernetes Operators

### Overview of different types of operators

1.  **Core Operators:**
    - Core operators are included in Kubernetes by default. They're part of the Kubernetes system itself.
    - Examples: Deployment, ReplicaSet, DaemonSet.
2.  **Community Operators:**
    - These are created and maintained by the Kubernetes community. These are not part of core Kubernetes, but they are used widely.

- Examples: Prometheus Operator, etcd Operator.

3.  **Custom Operators:**
    - Made by users for their specific needs. They can do anything you configure them to do.
    - Example: A customer database operator to manage your databases in a way specific to your organization's technical needs.

Kubernetes operators are usually developed through the operator framework although you can also develop operators without using the operator framework. The operator framework has provided tools and workflows to simplify the development of operators their their operator SDK and this is the path we will follow in this guide too.

### Use cases for each type

1.  **Core Operators:**
    - You can them for basic Kubernetes operations.
    - Example: Use the deployment operator to roll out the new versions of your application.
2.  **Community Operators:**
    - These operators are for common tools not available in Kubernetes by default.
    - Example: You can use Prometheus Operator to monitor Kubernetes clusters.
3.  **Custom Operators:**
    - This is your best choice when you have a unique need not available in the core operator or in the community operator.
    - Example: Managing a special database or a complex app that requires specific actions to be performed during updates.

Now we will create a simple operator using the operator framework utilizing their operator SDK.

## Section 3. Building Your Own Kubernetes Operator

### Environment Setup:

- Install Go language (version 1.13+). You can use this link for installation. https://go.dev/doc/install
- Set up Kubernetes cluster (Minikube or a cloud-based solution).
- Install `kubectl` command-line tool

### **Operator SDK Installation:**

For Windows, the binary is not supported, you will need to use `WSL` on Windows. I am on Windows and I installed WSL and Ubuntu for this purpose. So Linux and macOS are officially supported. So above-mentioned pre-requisites will be installed on the OS where the operator's SDK will be installed i.e. Linux in my case. Here are the steps that I performed:

1- Open your WSL/Ubuntu terminal and install the required dependencies for the operators SDK through the below command:
`sudo apt-get install make gcc g++ git`

2- Download the operator SDK binary for your OS. I used the below URL as I am on linux.
`wget https://github.com/operator-framework/operator-sdk/releases/download/v1.17.0/operator-sdk_linux_amd64`

3- Make this binary executable so modify the permissions as below:
`chmod +x operator-sdk_linux_amd64`

4- To use the Operator SDK anywhere in your terminal, move it to a directory in your system PATH. A common place is `/usr/local/bin/`.
`sudo mv operator-sdk_linux_amd64 /usr/local/bin/operator-sdk`

5- Verify the installation of your operators SDK.
`operator-sdk version`

See the below screenshot of all these steps that I performed on my Ubuntu:

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-12-k8s-operators/image2.webp" alt="Terminal commands installing Operator SDK on Ubuntu" />
</div>

### **Creating a New Operator:**

Before we go into the details of creating a new operator, note that the operator will be developed locally and then will be deployed to the Kubernetes cluster(either local cluster or cloud-based cluster).

So here are the steps:
1- Create an operator project in your local environment
`operator-sdk init --domain=mydomain.com --repo=github.com/myuser/my-operator`

Here are the details of these parameters:

**`--domain`**: This is used to provide a unique group name for your custom resource definitions (CRDs). It doesn't have to be a domain you own; it's just a way to ensure that your CRDs are unique and don't conflict with others. You can set this to any string that follows domain name conventions.

**`--repo`**: This is used for Go module naming. If you're not planning to push your operator code to a remote repository, you can set this to any valid URL format. It doesn't need to point to an existing repository.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-12-k8s-operators/image3.png" alt="operator-sdk init output creating a new operator project" />
</div>

2- Create API and controller within the same directory:
`operator-sdk create api --group=webapp --version=v1 --kind=AppService --resource=true --controller=true`

You will notice that folders of `api` and `controllers` are now created automatically.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-12-k8s-operators/image9.png" alt="Project tree showing api and controllers folders" /></div>

### Developing Your Operator

**1-Modify the API Types**: Now you need to edit the files in the `api/v1/` directory to define the spec and status of your `AppService` custom resource. . As an example `api/v1/appservice_types.go` can be updated to match the structure of your `AppService`. Below are contents of `appservice_types.go`:

```bash
package v1

import (
    metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// AppServiceSpec specifies the desired state of AppService
type AppServiceSpec struct {
    //You can mention any instructions here related to your app
    Size int32 `json:"size"`
}

// Here AppServiceStatus specifies the observed state of AppService
type AppServiceStatus struct {
    // Notet that the Nodes are actually the names of the AppService pods
    Nodes []string `json:"nodes"`
}

// The schema
type AppService struct {
    metav1.TypeMeta   `json:",inline"`
    metav1.ObjectMeta `json:"metadata,omitempty"`

    Spec   AppServiceSpec   `json:"spec,omitempty"`
    Status AppServiceStatus `json:"status,omitempty"`
}

// AppServiceList is merely a list of AppService
type AppServiceList struct {
    metav1.TypeMeta `json:",inline"`
    metav1.ListMeta `json:"metadata,omitempty"`
    Items           []AppService `json:"items"`
}

func init() {
    SchemeBuilder.Register(&AppService{}, &AppServiceList{})
}
```

In above code snippet, `AppServiceSpec` includes a `Size` field, representing the target number of instances, and `AppServiceStatus` contains a `Nodes` field, that lists the names of currently running instances.

**2-Implement Controller Logic**: In the `controllers/` folder, you will see a controller file for your resource (e.g., `appservice_controller.go`). In this file, you will write the logic for handling CRUD operations for your `AppService` resources. Below are the contents of the controller file.

```bash
package controllers

import (
    "context"
    appsv1 "github.com/myuser/custom-operator/api/v1"//<your-api-path>
    ctrl "sigs.k8s.io/controller-runtime"
    "sigs.k8s.io/controller-runtime/pkg/log"
)

// Below AppServiceReconciler reconciles an AppService object
type AppServiceReconciler struct {
    client.Client
    Scheme *runtime.Scheme
}

func (r *AppServiceReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
    _ = context.Background()
    log := log.FromContext(ctx)

    // Get the AppService instance
    appService := &appsv1.AppService{}
    err := r.Get(ctx, req.NamespacedName, appService)
    if err != nil {
        log.Error(err, "Failed to fetch AppService")
        return ctrl.Result{}, err
    }

    log.Info("Reconciling AppService", "namespace", req.Namespace, "name", req.Name)

    // Here you can put Business logic to handle AppService

    return ctrl.Result{}, nil
}

func (r *AppServiceReconciler) SetupWithManager(mgr ctrl.Manager) error {
    return ctrl.NewControllerManagedBy(mgr).
        For(&appsv1.AppService{}).
        Complete(r)
}
```

In the above snippet, the `Reconcile` method logs a message whenever it will be triggered.

**3-Generate CRDs and RBAC Manifests**: The next step is to create the CRD's and RBAC manifests. Just execute the following commands in your project directory to generate and update CRD manifests and RBAC rules based on the markers present in your Go source files:

```
make generate
make manifests
```

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-12-k8s-operators/image4.png" alt="make generate and make manifests output for CRD and RBAC files" />
</div>

### Testing Your Operator

Before testing the operator, you need to ensure that your `kubectl` is configured and connected to your Kubernetes cluster. Here are the steps to test the operator:

1- Deploy the created CRD's to your Kubernetes cluster. What this command will do? It will install or set up the necessary dependencies, configurations, and manifests for your operator within the Kubernetes cluster:

`make install`
2- Now just run your operator with the below command. It will launch the operator and put it in listening mode, ready to respond to changes in the cluster.
`make run`

See the below screenshot when I executed this command on my Ubuntu.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-12-k8s-operators/image5.png" alt="make run output starting the operator controller" />
</div>

3- The last step is to apply a custom resource (CR) YAML file to the cluster using `kubectl apply -f`, It creates an instance of a custom resource defined by your operator. In other words, you are telling Kubernetes to create a specific type of resource that your operator is designed to manage. This is how you request your operator to perform a certain task or provide a specific service.

Here is a sample custom resource YAML file:

```bash
apiVersion: webapp.mydomain.com/v1
kind: AppService
metadata:
  name: example-appservice
spec:
  size: 3  # Example size
```

Just apply through `kubectl apply -f` Now you have the terminal window open where `make run` was executed, just check any new logs there. As you can see in below screenshot, the highlighted log shows the successful operator reconciliation.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-12-k8s-operators/image6.png" alt="Operator logs showing successful reconciliation" />
</div>

You can check the status of your custom resource through the command `kubectl get appservices`. See the below screenshot showing this command output:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-12-k8s-operators/image7.png" alt="kubectl get appservices output showing custom resources" />
</div>

Congratulations!!! you have created and deployed your first Kubernetes operator. It was not that hard !!!! Here is a brief summary of the role of the major components we created today:

- **Custom Resource (CR)**: Specifies the desired state of a resource in a simple configuration.
- **Controller**: Implements the core business logic for managing resources based on the desired state defined in CRs.
- **API**: Defines the structure and schema of custom resources, ensuring their validity and conformity.

## Conclusion

Kubernetes operators represent a significant leap in managing and automating Kubernetes applications. They not only simplify the lifecycle management of services and applications but also ensure high performance and reliability through automated adjustments and maintenance. This article has gone through the detailed steps to create, configure, and deploy a simple operator to a Kubernetes cluster through the operator framework.

Following the same approach, you can develop production-ready operators for your application. As we have seen, whether it's core, community, or custom operators, each plays a vital role in enhancing the Kubernetes experience, making them an indispensable tool in the arsenal of any cloud-native technology enthusiast.
