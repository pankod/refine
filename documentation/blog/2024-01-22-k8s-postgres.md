---
title: How to deploy Postgres on Kubernetes
description: This article will serve as a guide for installing PostgreSQL on Kubernetes, covering pre-requisites such as setting up Kubectl, Kubernetes clusters, and Docker.
slug: postgres-on-kubernetes
authors: muhammad_khabbab
category: "Engineering"
tags: [kubernetes, backend]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-22-k8s-postgres/social.png
hide_table_of_contents: false
---

## Introduction

PostgreSQL, renowned for its reliability and robustness, plays a pivotal role in database management within Kubernetes environments. This article will serve as a guide for installing PostgreSQL on Kubernetes, covering pre-requisites such as setting up Kubectl, Kubernetes clusters, and Docker. It guides through dockerizing PostgreSQL, configuring persistent storage, deploying using ConfigMaps and Secrets, and concludes with verification steps to ensure a successful setup. Let's start with the pre-requisites of this guide.

## Pre-requisites

Following are the pre-requisites for this hands-on guide.
1- Kubectl is successfully installed
2- Kubernetes cluster is successfully setup (using Minikube or a cloud provider)
3- Docker is successfully setup (if you want to build your own image of postgreSQL)

## Dockerizing PostgreSQL

### Creating a Docker image for PostgreSQL

Start with a base image and specify the version of PostgreSQL. Here we would use latest. Below is an example Dockerfile that will use the latest PostgreSQL image from the official Docker Hub.

```
FROM postgres:latest
```

### Add custom configurations or scripts here

Note that we need to add an environment variable for the master password in the Dockerfile. This will enable you to set the password when the container starts. However adding sensitive information like passwords directly inside the dockerfile is not recommended, we will use Kubernetes secret for that purpose (later in this article).

You can also use a specific version of PostgreSQL if you suspect that the latest version might create any issues. In that case, just specify the exact version in your dockerfile like below:

```
FROM postgres:13.3
```

### Additional commands for setting up the container

Now you need to build the docker image. Use the below command:

```
docker build -t <name-of-my-custom-image>
```

Just replace `<name-of-my-custom-image>` with the name of your choice.

### Pushing the image to a container registry

Now that the image is created, we need to store the created Docker image in a container registry for Kubernetes to access. However, first we need to tag the image using the below command:

```
docker tag my-postgres-image registry.example.com/my-postgres-image
```

If we take the example of the GCP container registry then the command will be like this:

```
docker tag my-postgres-image gcr.io/myproject/my-postgres-image
```

Let's push the image to registry:

```
docker push registry.example.com/my-postgres-image
```

You need to replace the `registry.example.com` with your registry. For the GCP example, we will use below:

```
docker push gcr.io/myproject/my-postgres-image
```

Make sure your Docker client is authenticated with the container registry.

### Why you might need a custom image?

For common images like PostgreSQL it is not at all mandatory to build and push your own image. Container registries like dockerhub, GCR, ECR, etc. already have ready and prepared images of PostgreSQL and much other common software, so you can directly use those images instead of building your own.

However, you might need to build your own image if you need some custom configuration. One of the use cases where you will need to set up the custom configuration instead of updating the database later is the CI/CD scenario.

In a CI/CD pipeline, especially with Kubernetes, there's a focus on immutable infrastructure. Containers are built once with a specific configuration and then deployed; they aren't modified after deployment. Customizing the PostgreSQL configuration at build time is the right choice.

## Configuring Persistent Storage

Configuring Persistent Storage with PV (Persistent Volumes) and PVC (Persistent Volume Claims) is necessary when installing PostgreSQL on Kubernetes to ensure data persistence across pod restarts and failures, safeguarding against data loss in the containerized environment.

Persistent volume (PV) provides dedicated storage space for the database, while persistent volume claims (PVCs) allow PostgreSQL pods to claim and utilize this storage, ensuring data persistence across pod restarts and deployments.

### Configure YAML files for PV and PVC

Persistent Volume YAML Example:

```
    apiVersion: v1
    kind: PersistentVolume
    metadata:
      name: postgres-pv
    spec:
      capacity:
        storage: 5Gi
      accessModes:
        - ReadWriteOnce
      hostPath:
        path: "/mnt/data"
```

Persistent Volume Claim YAML Example:

```
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: postgres-pvc
    spec:
      accessModes:
        - ReadWriteOnce
      resources:
        requests:
          storage: 5Gi
```

Do not forget to update `storage` and `path` as needed.

### Utilizing the YAML Files

1.  **Applying the PV Configuration:**

Run `kubectl apply -f [your-pv-file].yaml`.

This command creates the Persistent Volume in your Kubernetes cluster. Note that in case of deployment, we will create a separate YAML file for PVC like above and we will just reference it in the deployment YAML file. This is not the case with Statefulset.

In statefulset, we will define the PVC directly within the StatefulSet's YAML file using the `volumeClaimTemplates` section. That allows Kubernetes to dynamically create a unique PVC for each pod in the StatefulSet.

2.  **Applying the PVC Configuration:**
    Execute `kubectl apply -f [your-pvc-file].yaml`.

This creates the Persistent Volume Claim, which will bind to the available Persistent Volume.

1.  **Verifying the Configuration:**
    Use `kubectl get pv` and `kubectl get pvc` to verify that your PV and PVC are correctly set up and bound.

1.  **Attaching to PostgreSQL:**
    In your PostgreSQL deployment YAML, reference the PVC in the volumeMounts section. This step ensures that PostgreSQL uses the persistent storage for data. To attach the PVC to PostgreSQL, you'll need to edit its deployment
    YAML.

Here’s how:

1.  **Open Deployment YAML**: Locate your PostgreSQL deployment YAML file.
2.  **Add Volume to Deployment**: Under the `spec` section of the PostgreSQL deployment, add a `volumes` field. This field should reference the PVC you created.
3.  **Modify the Container Section**: Inside the `containers` section of the PostgreSQL deployment, add a `volumeMounts` field. This will mount the volume inside the PostgreSQL container. The below examples shows PVC configuration for a PostgreSQL database:

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-22-k8s-postgres/image1.png" alt="PostgreSQL StatefulSet PVC and volumeMounts configuration example" />
</div>

Note that `volumeMounts` specifies where inside the container the volume should be mounted (`/var/lib/postgresql/data` is the default data directory for PostgreSQL). Also, in case of cloud-managed cluster such as GKE, EKS, etc. cloud vendor automatically provisions PVs based on the PVCs in the StatefulSet so you do not need to explicitly specify the PV in your YAML file.

Also, the above example is in the case of statefulset. If we are using deployment instead of statefulset then we will separately define the PVC in its own YAML file. The PVC is then referenced in the Deployment under the `volumes` section and used by specifying a `volumeMounts` section in the container spec.

In the next section, we will define configmap and secrets and then apply the final statefulset YAML file.

## Deploying PostgreSQL Using ConfigMaps and Secrets

**A. Utilizing ConfigMaps for PostgreSQL Configuration**
ConfigMaps in Kubernetes are ideal for storing non-confidential data in key-value pairs. They're instrumental in separating your PostgreSQL configuration data from your application code, enhancing maintainability and flexibility.

**Creating a ConfigMap for PostgreSQL**

1.  **Identify Configuration Parameters**: Determine the PostgreSQL settings you wish to configure. Common examples include `max_connections`, `shared_buffers`, and `log_statement`.
2.  **Create a ConfigMap YAML File**: Draft a YAML file, say `postgres-config.yaml`, encompassing the desired settings. Here's a simplistic example:

```
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: postgres-config
    data:
      postgresql.conf: |
        max_connections = 100
        shared_buffers = 256MB
        log_statement = 'all'
```

3.  **Apply the ConfigMap**: Deploy the ConfigMap to your Kubernetes cluster using the command:

`kubectl apply -f postgres-config.yaml`

**Integrating ConfigMap with PostgreSQL StatefulSet**

In your StatefulSet YAML, reference the ConfigMap for PostgreSQL configuration. Here’s an illustrative snippet:

```
spec:
  containers:
  - name: postgres
    image: postgres:latest
    volumeMounts:
    - name: postgres-config-volume
      mountPath: /etc/postgresql
  volumes:
  - name: postgres-config-volume
    configMap:
      name: postgres-config
      items:
      - key: postgresql.conf
        path: postgresql.conf
```

This mounts the `postgresql.conf` from the ConfigMap into the PostgreSQL container at the specified `mountPath`.

**B. Securing PostgreSQL Using Kubernetes Secrets**

Kubernetes Secrets are essential for managing sensitive data such as passwords and should be used to secure your PostgreSQL deployment.

**Creating a Secret for PostgreSQL**

1.  **Prepare the Secret Data**: For PostgreSQL, this usually involves the database user password. Encode your password using Base64. For example:
    `echo -n 'yourpassword' | base64`
2.  **Create a Secret YAML File**: Draft a YAML file, e.g., `postgres-secret.yaml,` with the encoded password:

```
apiVersion: v1
kind: Secret
metadata:
  name: postgres-secret
type: Opaque
data:
  postgres-password: <base64-encoded-password>
```

3.  **Deploy the Secret**: Apply it to your Kubernetes cluster:

`kubectl apply -f postgres-secret.yaml`

**Integrating Secret with PostgreSQL StatefulSet**

Modify your StatefulSet YAML to use the Secret for setting the PostgreSQL password. Here’s an example:

```
spec:
  containers:
  - name: postgres
    image: postgres:latest
    env:
    - name: POSTGRES_PASSWORD
      valueFrom:
        secretKeyRef:
          name: postgres-secret
          key: postgres-password
```

Apply the above YAML file after making the above changes.

This sets the `POSTGRES_PASSWORD` environment variable in your PostgreSQL container to the password defined in the Secret. If you are using managed Kubernetes cluster on GKE for example, you can also set the environment variable from the web console, although the recommended practice is to use configmap and Kubernetes secret. See the below example of GKE PostgreSQL installation and adding environment variable.

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-22-k8s-postgres/image2.png" alt="GKE console showing PostgreSQL environment variable configuration" />
</div>

**Expert Tips:**

- Avoid embedding sensitive data directly in application code or in files that are part of the version control system. Use Kubernetes secret like we did above.
- Utilize Kubernetes namespaces to organize and manage your resources
  effectively.
- Note that changes to ConfigMaps and Secrets do not automatically propagate to running pods. You may need to restart the pods for changes to take effect.

## Verifying PostgreSQL Installation

After you applied above mentioned YAML file for a stateful set or for
deployment, let's verify the installation.

1. First check the list of pods by executing the command `kubectl get pods`
2. If you see the PostgreSQL pods, that means the installation was successful. To get into the database, execute the command `kubectl exec -it <pod-name> -- psql -U <username>` I used the default username which was `postgres`. This command will land you into the psql shell.
3. After you are into the psql shell, type the command "\l " to display a list of databases. The below screenshots show the result of all these commands.

 <div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-01-22-k8s-postgres/image3.png" alt="psql session output listing databases after kubectl exec" />
</div>

## Conclusion

This article comprehensively covered the installation of PostgreSQL on Kubernetes, from initial setup to final verification. By detailing steps like dockerizing PostgreSQL, managing persistent storage, and securely deploying with ConfigMaps and Secrets, it provides readers with a thorough understanding and practical guidance. This knowledge is invaluable for anyone looking to implement PostgreSQL within a Kubernetes environment, ensuring a secure and efficient database setup.
