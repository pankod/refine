---
title: How to Delete Local and Remote Git Branches
description: We will take a look the example of deleting local and remote Git branches.
slug: git-delete-remote-branch-and-local-branch
authors: muhammad_khabbab
category: "Engineering"
tags: [git]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-11-27-git-delete/social-2.png
hide_table_of_contents: false
last_update: 2025-09-26
---

**This article was last updated on September 26, 2025 to include branch protection policies and team best practices for safe deletion.**

## Introduction

### TL DR;

To delete a branch locally, use the command `git branch -d branch_name`. This will delete the branch only if it has already been fully merged. If the branch has unmerged changes, you can force delete it using `git branch -D branch_name`. To delete a branch from a remote repository, use the command `git push origin --delete branch_name`. This will remove the branch from the remote. Alternatively, you can use the shorter command `git push origin :branch_name`.

Quick Tip: Always switch to another branch before deleting a branch, as Git does not allow you to delete the branch you are currently on.

- Delete a local branch: `git branch -d branch_name`
- Force delete a branch: `git branch -D branch_name`
- Delete a remote branch: `git push origin --delete branch_name`
- Short version for remote: `git push origin :branch_name`

Branches are kind of blocks in a repository where we write new features, fix bugs etc. For example, if three developers are working on a project, they can create their own branches and work on them as the branches are isolated, so everyone can work in their branch.

A branch can be:

- Local – only on your local machine.
- Remote – it is on a remote location, for example in the GitHub repo

Actually, there is a third type of branch, which is the reference to the remote branches. During the cleanup, these branches should be cleaned up too.
Today we will discuss various scenarios related to branch deletion. We will show you how to **delete local and remote branches** on GitHub. We will also go through some common errors while deleting a branch.

For this article, we assume you have installed GIT, and you have the access rights to **delete a branch**. Let's start with the need to delete a branch.

## Why you might need to remove a branch

You need to ensure that your Git repository is not a mess of outdated and old branches that are not being worked on anymore. You should perform periodic cleanup of the branches where you would either remove the old branches or you would merge them into the master. Your code repository should be neat, tidy, and easy to navigate.

## Deleting a GIT local branch

Please note that deleting a branch locally will not delete the remote branch. Here is the command to delete branch locally:

```
git branch -d "branch name"
```

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-11-27-git-delete/git-delete-branch-1.png"  alt="Terminal output for deleting a local Git branch" />
</div>

<br/>

The below command will also perform the same function, just a minor syntax difference.

```
git branch --delete <branch>
```

Note that the -d option is an abbreviation for --delete, which only removes the branch if it is fully merged in its parent branch. If you have unmerged changes, then it will not remove the branch, and you will get an error. You will need to forcibly remove the branch if you want to delete the branch, irrespective of the merge status. You can use the below command to remove the local branch forcibly:

```
git branch -D <branchName>
```

Another point to remember is the rebasing/merging progress. If your branch is in rebasing/merging process, You will see an error "Rebase/Merge in progress", and you won't be able to delete your branch. You can forcibly delete if you want to, or you can solve the rebasing/merging before trying again.

## Deleting a Git remote branch

To delete a branch from the remote repository, type:

```
git push origin -d "branch name"
```

<div className="centered-image"  >
   <img style={{alignSelf:"center", }}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-11-27-git-delete/git-delete-branch-2.png"  alt="Terminal output for deleting a remote Git branch" />
</div>

<br/>

In the above example, the remote branch "dev-testing" is deleted.
Both the below commands delete the remote branch, you can use whichever is more intuitive to you.

```
git push <remote_name> --delete <branch_name>
```

The following command is appropriate if you are on a version of Git older than 1.7.0

```
git push <remote_name> :<branch_name>
```

Note that executing "`git push origin –delete` "will delete your remote branch only. Note that the branch name is not mentioned at the end of the command. However, if you put the branch name at the end, it will delete and push it to remote simultaneously.

## Deleting a branch with merged changes

When we are deleting a branch having merged changes, we delete it by using small "d" like below:

```
git branch -d <BranchName>
```

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-11-27-git-delete/git-delete-branch-3.png"  alt="Deleting a merged Git branch with -d" />
</div>

## Deleting a git branch with unmerged changes

When we are deleting a branch having unmerged changes, then we will need to use the capital "D" to force the deletion like below:

```
git branch -D <branchName>
```

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-11-27-git-delete/git-delete-branch-4.png"  alt="Force deleting an unmerged Git branch with -D" />
</div>

<br/>

Another version of the same command is as below:

```
git branch --delete --force <branch_name>
```

It will also remove the branch forcibly even if there are unmerged changes in the branch.

## Advanced Scenarios for Branch Deletion

I want to share with you some of the tips in advance about deleting branches in Git, so as to ensure our repository remains clean and organized. Here are a few scenarios and how to handle them:

The usage of the double hyphen can also be applied when there are times when we have multiple old branches that we have to delete. It's a very boring job to do them manually, one by one. Here's a quick command for that:

```bash
git branch -d branch1 branch2 branch3
```

This will delete `branch1`, `branch2`, and `branch3` all at one go.

### Cleaning up local branches

It is good practice to delete the branches that have already been merged with the master branch in order to keep our local repository clean. We can handle this through the script, making it something that can be automated this way:

```bash
git checkout main
git branch --merged | grep -v '\*' | xargs -n 1 git branch -d
```

The script checks out the main branch, fetches all the already-merged branches, and deletes them.

### Automating Branch Deletion

We can take advantage of Git hooks to automatically delete branches upon merging of a pull request. This is achieved by creating a post-merge hook:

1. Write a file named `post-merge` in the directory `.git/hooks`.
2. Insert the script below:

```bash
#!/bin/sh
BRANCH=$(git symbolic-ref --short HEAD)
if [ "$BRANCH" != "main" ]; then
  git branch -d $BRANCH
fi
```

This script removes the branch after merging, in case it is not the main branch.

## What are tracking branches and how to delete them

When we check out a local branch from a remote branch, it automatically creates what is called a tracking branch. These are local branches that have a direct association with a remote branch. It means it exists on our local machine cache but not on the remote repository.

If you have deleted a remote branch using the command `git push origin :<branchname>`, its references still exist in local code repo of your team members. Now, you need to delete the local references too. `git remote prune origin` "deletes the refs to the branches that don't exist on the remote.

Another version of the same command is:
`git fetch <remote> --prune`
This will delete all the obsolete remote-tracking branches. A shorter version of the command is below:
`git fetch <remote> -p`

To delete a particular local remote-tracking branch, you can use following command:
`git branch --delete --remotes <remote>/<branch>`
A shorted version of the command is:
`git branch -dr <remote>/<branch> `

Note that if you delete a remote branch "X" from the command line using `git push` then it will also remove the local remote-tracking branch "origin/X" so there is no need to prune the obsolete remote-tracking branch with `git fetch –prune` or `git fetch –p`.

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-11-27-git-delete/git-delete-branch-5.png"  alt="Deleting a local branch with verbose output" />
</div>

<br/>

To confirm if the remote tracking branch was delete or not, you can run the following command

```
git branch –remotes
```

And the shorter version is:

```
git branch –r
```

## How to delete a branch on Github using web console

1.  Navigate to the main page of the repository.
2.  Above the list of files, click branches.
3.  Navigate to the branch you want to delete, then click delete icon

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-11-27-git-delete/git-delete-branch-6.png"  alt="Pruning remote branches after deletion" />
</div>

<br/>

## Automate Deletion with a Scheduled Task

You can even set up a scheduled task to delete the merged branches after a time. The commands can run either through a cron job on Unix-like systems or a scheduled task on Windows.

Here is an example: a cron job that is run at 12 AM every Sunday:

1. Open crontab file:

```bash
crontab -e
```

2. And now append this line to add the task to crontab:

```bash
0 0 * * 0 cd /path/to/your/repo && git fetch -p && git branch --merged main | grep -v 'main' | xargs -n 1 git branch -d
```

This will get the latest changes, prune stale branches, and remove branches merged to main.

## Running on CI/CD Pipelines

We can also leverage this opportunity to carry out automated branch deletion within our CI/CD pipeline. For instance, if we are to use GitHub Actions, here is how we can automate the workflow to delete branches:

```yaml
name: Delete Merged Branches

on:
  push:
    branches:
      - main

jobs:
  delete-merged-branches:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2
      - name: Delete Merged Branches
        run: |
          git fetch -p
          git branch --merged main | grep -v 'main' | xargs -n 1 git branch -d
```

The workflow is triggered with each push to the main branch and cleans branches merged to main.

## Frequently asked questions

### I am unable to delete my branch

Solution: You cannot delete a branch you are already on. You must first switch to another branch and then delete the required branch. See the below example:

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-11-27-git-delete/git-delete-branch-7.png"  alt="Listing all local and remote branches" />
</div>

<br/>

In the above example, we switched to another branch named "dev-arsam" and then we were able to delete the "test" branch successfully.

### I deleted a branch by mistake, can I recover it?

Solution: Yes, you should use `git reflog` command and find the SHA1 for the commit at the tip of your deleted branch, then just `git checkout [sha]` . And once you're at that commit, you can just `git branch branchname <SHA>` to recreate the branch from there.

The `git reflog` command is used to record updates made to the tip of branches. It allows to return to commits. After rewriting history, the reflog includes a history of previous branch commits and makes it possible to go back to a particular state if needed.

The below snapshot provides an example where a branch named "dev-arsam" will be recovered.

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-11-27-git-delete/git-delete-branch-8.png"  alt="Deleting a remote branch with git push --delete" />
</div>

<br/>

### How to automatically delete a branch when it is merge back into master

To avoid dangling branches, you can set up the configuration so that your branch will be automatically deleted as soon as it is merged into its parent branch e.g. Master branch

1. On GitHub.com, go to the home page of the repository.
2. Under your repository name, click Settings.
3. Under "Pull Requests", select or unselect Automatically delete head branches.

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-11-27-git-delete/git-delete-branch-9.png"  alt="Remote branch removed confirmation" />
</div>

<br/>

### I am getting an error when I delete a branch having the same name as a tag

You might get an error if you try to delete a branch having the same name as the tag. You will see an error similar to this "branch-or-tag-name matches more than one".

If you want to specify the deletion of branches and not tag, try the below command:

```
git push origin :refs/heads/branch-name
```

Similarly if you want to specify the deletion of tags and not branch, then use below command:

```
git push origin :refs/tags/tag-name
```

## Branch Protection and Pre-Delete Hooks

To avoid accidental removal of important branches such as `main`, `develop`, or long-lived release lines, modern platforms like GitHub and GitLab offer **branch protection rules**. These rules can block deletion, require pull request reviews, or enforce status checks before changes are merged. Combined with local safeguards, teams can also configure **pre-push or pre-delete Git hooks** that run before destructive actions. For example, a hook could refuse to delete a branch unless a team lead approves, or it could stop pushes that target protected branches. These practices make it harder for human error to remove branches that are still in use or critical to deployment pipelines.

## Best Practices for Teams

When multiple developers are working on the same repository, branch cleanup becomes more than a personal workflow—it’s a team-wide responsibility. A good practice is to schedule periodic reviews of stale branches, ideally at sprint boundaries or release milestones, so old feature branches don’t pile up. Communication also matters: announcing deletions in a team channel helps avoid surprises, especially when others may still be referencing those branches. Tools like `git show-branch`, `git branch --merged`, or GitHub’s branch dashboard can help verify whether a branch is truly inactive before removal. By treating cleanup as part of the collaboration process, teams reduce friction and ensure that only safe, unnecessary branches are deleted.

## Conclusion

In this article, we learned about the different ways to delete a branch in Git also answered frequently asked questions related to deleting a branch in Git.
