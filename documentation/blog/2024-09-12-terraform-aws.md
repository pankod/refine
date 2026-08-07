---
title: Getting Started with Terraform on AWS
description: We'll walk through getting started with Terraform specifically for infrastructure provisioning on Amazon Web Services (AWS).
slug: terraform-aws
authors: shingai_zivuku
category: "Ecosystem / Integrations"
tags: [dev-tools, backend]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-11-28-terraform-aws/social.png
hide_table_of_contents: false
last_update: 2024-09-12
---

**This article was last updated on September 12, 2024, to add sections on State Management in Terraform, Using Terraform Modules, Managing Secrets and Sensitive Data, Workspaces for Multi-Environment Management, Security Best Practices, Automating Terraform with CI/CD, Handling Resource Dependencies, and Cost Estimation with Terraform.**

## Introduction

Managing infrastructure across multiple environments and regions can be an operational headache for teams as applications scale. Provisioning resources manually is boring and time-consuming while scripting the process requires significant engineering effort.

Infrastructure as code (IaC) tools like HashCorp's Terraform provides a compelling solution - allowing you to define reusable configurations for spinning up everything from storage buckets to Kubernetes clusters.

In this beginner's guide, I will walk through getting started with Terraform specifically for infrastructure provisioning on Amazon Web Services (AWS). I will cover the prerequisites, configuring access to AWS, writing a simple Terraform configuration, modifying your infrastructure, and then cleaning up.

Whether you're already using AWS or looking to explore it with an IaC approach, this article will equip you with the fundamentals for provisioning just about any infrastructure you need.

## Prerequisites

Before you can start using Terraform to manage infrastructure on AWS, you need a few prerequisites:

### AWS Account and Credentials

For this guide, you need an AWS account. Accounts are free to [sign up](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) for. As part of the account creation process, you will create a root user who has complete access to the account.

For security best practices, you will be creating an IAM user with more limited permissions for Terraform to use.

Once you have an AWS account, under the IAM service, create a new IAM user. Be sure to save the access key and secret access key. These keys will be used by Terraform to authenticate and interact with your AWS account.

### AWS CLI

The AWS CLI tool allows you to manage AWS services from the command line. Install this and configure it with your access keys for Terraform to provision resources.

Download and [install the CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) for your operating system. Once installed, run `aws configure` and enter your access keys when prompted.

### Terraform

Finally, go to [terraform site](https://developer.hashicorp.com/terraform/install?product_intent=terraform) and download the Terraform binary for your system. Terraform is distributed as a single binary, so once downloaded you can run Terraform commands from your terminal.

Be sure to add the Terraform binary to your PATH environment variable so it is accessible system-wide.

## Configuring AWS Credentials

Now that you have your AWS account set up and Terraform installed, you need to [configure your access credentials](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration) for Terraform to use when interacting with AWS.

Here are some of the options for specifying credentials:

### Access Keys and Secret Keys

When you created your IAM user, AWS generated access and secret access keys for you. These keys act as username and password for programmatically interacting with AWS through their API.

You can pass these directly to Terraform through environment variables:

```bash
export AWS_ACCESS_KEY_ID=<your_access_key>
```

```bash
export AWS_SECRET_ACCESS_KEY=<your_secret_key>
```

Terraform will check these environment variables when needing credentials.

### ~/.aws/credentials File

Another option is to save your keys in a local AWS credentials file that AWS CLI checks by default:

```bash
[default]
aws_access_key_id = <your_access_key>
aws_secret_access_key = <your_secret_key>
```

This file is located at `~/.aws/credentials` on Linux/macOS. Terraform automatically checks this file for credentials to use.

With credentials configured through either approach, Terraform is now ready to build infrastructure on your AWS account.

## Creating a Simple Configuration

Now that Terraform can access your AWS account, let's write your first Terraform configuration file to deploy infrastructure. Terraform code is written in HCL (HashCorp Configuration Language) syntax.

Configuration files end in `.tf` and define providers and resources. You will specify that you want to use AWS as your provider.

Following the [AWS provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) documentation, create `main.tf` with the following:

```bash
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}
```

Then define an AWS EC2 resource instance:

```bash
resource "aws_instance" "refine-dev" {
  ami           = "ami-0fc5d935ebf8bc3bc"
  instance_type = "t2.micro"

  tags = {
    Name = "refine-dev"
  }
}
```

This configures an EC2 instance in the us-east-1 region using a free Linux image. Put together, your configuration file should look like the following:

```bash
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "refine-dev" {
  ami           = "ami-0fc5d935ebf8bc3bc"
  instance_type = "t2.micro"
}
```

With your provider and initial resource defined, run:

```bash
terraform init
```

This will initialize your Terraform working directory complete with plugins for the AWS provider.

Then run:

```bash
terraform plan
```

Terraform reads your config file and outlines what infrastructure it will create. If the plan looks good, it's time to apply.

Run `terraform apply` and Terraform will call out to AWS and create the EC2 instance.

## State Management in Terraform

Terraform maintains a **state file** that tracks the infrastructure it manages. To ensure consistency and collaboration across teams, we can recommend storing this state file in a remote backend like **AWS S3**, which prevents conflicts when multiple team members are working on the same infrastructure.

Example of remote state configuration with S3:

```hcl
terraform {
  backend "s3" {
    bucket = "my-terraform-state-bucket"
    key    = "terraform.tfstate"
    region = "us-west-2"
  }
}
```

By configuring remote state, team members can access the same state file, avoiding overwrites.

## Terraform Workspaces for Multi-Environment Management

A section on **workspaces** will show how users can manage different environments (dev, staging, production) within the same configuration. Workspaces allow Terraform to handle separate states for each environment without duplicating configuration files.

Example of using workspaces:

```bash
terraform workspace new dev
terraform workspace new prod
terraform workspace select dev
```

## Security Best Practices

It’s important to highlight enforcing security best practices using **IAM roles and policies**. We could also introduce **Terraform Sentinel** to enforce security policies during the `plan` and `apply` stages.

Example of assigning an IAM role to an EC2 instance:

```hcl
resource "aws_iam_instance_profile" "ec2_profile" {
  name = "example_profile"
  role = aws_iam_role.ec2_role.name
}

resource "aws_instance" "example" {
  ami           = "ami-0fc5d935ebf8bc3bc"
  instance_type = "t2.micro"
  iam_instance_profile = aws_iam_instance_profile.ec2_profile.name
}
```

## Automating Terraform with CI/CD Pipelines

Integrating Terraform into CI/CD pipelines like **GitHub Actions** or **Jenkins** will automate infrastructure deployments. A section could include a GitHub Actions workflow example that automates `terraform plan` and `terraform apply`.

Example of a GitHub Actions workflow:

```yaml
name: Terraform Apply
on:
  push:
    branches:
      - main

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v1
      - name: Terraform Init
        run: terraform init
      - name: Terraform Plan
        run: terraform plan
      - name: Terraform Apply
        run: terraform apply -auto-approve
```

This allows teams to automate infrastructure provisioning and management, ensuring faster, more reliable deployments.

## Handling Resource Dependencies

While Terraform automatically manages resource dependencies, users may need to explicitly define dependencies in some cases. A section on using `depends_on` will help clarify resource creation order.

Example of managing resource dependencies:

```hcl
resource "aws_instance" "web" {
  ami           = "ami-0fc5d935ebf8bc3bc"
  instance_type = "t2.micro"
}

resource "aws_elb" "web_elb" {
  depends_on = [aws_instance.web]
  instances  = [aws_instance.web.id]
}
```

## Modifying Infrastructure

A key advantage of infrastructure as code is how you can evolve your stack over time through code changes.

Let's make a small update to your configuration by adding some AWS tags into your resource:

resource "aws_instance" "refine-dev" {
ami = "ami-0fc5d935ebf8bc3bc"
instance_type = "t2.micro"

tags = {
Name = "refine-dev"
}
}

After saving this update in your Terraform file, run:

```bash
terraform plan
```

Terraform will output the changes needed to add these tags to your EC2 instance.

If they look good, apply with:

```bash
terraform apply
```

Your instance will then be updated in place, adding a name to your instance:

Terraform does this immutably by destroying the instance and recreating it, assigning it the same IP address throughout this process.

This immutable approach ensures consistency across updates and provides more visibility than manually editing existing resources in the AWS console.

By coding your infrastructure, you gain improved collaboration, version control integration, and automation capabilities for managing changes.

## Cleaning Up

Once you’re done experimenting with your infrastructure, it's best practice to clean up the resources you've created so you don't incur unnecessary charges.

Terraform makes this very simple - just run:

```bash
terraform destroy
```

Terraform will output all resources that will be destroyed and prompt for confirmation.

Type yes and Terraform will delete all the related infrastructure on AWS - EC2 instances, networking components, and security groups. Here, Terraform will delete your EC2 instance.

This is a key advantage over console-based provisioning. With all your infrastructure described in declarative config files, Terraform knows exactly what needs to be deleted based on the state. You don't have to manually track down orphaned resources or decompress tangled dependencies.

Properly cleaning up infrastructure keeps your accounts lean, extends the experience to production-grade workflows, and surfaces gaps in your understanding. Make sure to always destroy your test environments when finished experimenting!

You can recreate your stack easily at any time by running `terraform apply`. Your configuration code serves as the single source of truth.

## Cost Estimation with Terraform

Finally, we could include a section on cost estimation using tools like **Infracost**. This helps users estimate the cost of infrastructure before deployment, preventing unexpected AWS bills.

Example of cost estimation with Infracost:

```bash
infracost breakdown --path=./path_to_your_terraform
```

This provides insight into the cost impact of infrastructure decisions.

## Managing Secrets and Sensitive Data

Handling secrets like AWS access keys securely is crucial. We can include a section on managing sensitive data using **environment variables** or **AWS Secrets Manager**. This ensures sensitive information isn’t hardcoded in configuration files.

Example of using environment variables for secrets:

```bash
export AWS_ACCESS_KEY_ID=<your_access_key>
export AWS_SECRET_ACCESS_KEY=<your_secret_key>
```

In the Terraform configuration:

```hcl
variable "secret_key" {
  type      = string
  sensitive = true
}
```

## Using Terraform Modules

Modules help you **re-use and organize infrastructure code**, which is particularly useful for repetitive tasks like setting up EC2 instances or VPCs. A section on creating and using modules will help users keep their code DRY (Don’t Repeat Yourself).

Example of using a module for EC2 instances:

```hcl
module "ec2_instance" {
  source        = "./modules/ec2"
  instance_type = "t2.micro"
  ami           = "ami-0fc5d935ebf8bc3bc"
  tags = {
    Name = "refine-dev"
  }
}
```

By reusing modules, users can create standardized components and avoid redundant code.

## Conclusion

Through this getting started, hopefully, you now appreciate why contractors, startups, and enterprises alike are adopting IaC practices with Terraform. I touched on several benefits like configuration files serving as the single source of truth.

Need to recreate something from last month? Just reapply an old config commit instead of decoding tribal knowledge and runbooks. Changes systematically pass through pull requests and can integrate with CI/CD pipelines just like application code changes. No more snowflake production hotfixes!

So, what's next for you? Start by version-controlling your Terraform configurations, making them accessible to your team, and gradually converting more of your cloud infrastructure to code. As you gain experience, you'll be ready to use Terraform to manage infrastructure for production applications.

Thanks for following along with this getting started guide - hopefully you’re feeling empowered to start down the path of harnessing infrastructure as code! What will you build next?
