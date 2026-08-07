---
title: git switch and git checkout – How to switch branches in git
description: We will go through different use cases and examples for using git checkout and git switch.
slug: git-switch-and-git-checkout
authors: muhammad_khabbab
category: "Alternatives"
tags: [git]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-20-git-switch/social-2.png
hide_table_of_contents: false
last_update: 2025-07-04
---

**This article was last updated on July 2, 2025, to improve the explanations of 'git switch' and align with current best practices.**

## Introduction

When working on a project, you usually work on more than one branch at a time. You also switch branches frequently based on priorities. Efficient branch switching is important to safely switch from one branch and commit your changes to the desired branch. The most famous command for switching branches has always been `git checkout` however the newer versions of Git divided its features into specific commands. Today, we will go through different use cases and examples for using `git checkout` and `git switch`. We will also go through some of the similar commands of Git. After reading this article, you will have strong knowledge of how to switch branches in Git and what are its companion commands.

Note that the command `git checkout` is a multi-feature command which performs multiple functions like:

• If it is a local branch or an explicit remote branch, it will switch to it
• If it is a tracked path, reset it
• If it is a remote branch, it will create a tracking branch and will switch to it
Let's go through some examples of switching branches through `git checkout`, and then we will touch upon the use of `git switch`.

Switching between branches is one of the basic Git operations when one needs to work with multiple features. To switch to an already existing branch, use `git checkout branch_name`. To create and switch to a new branch in one command, use `git checkout -b new_branch`. For remote branches, first fetch the branch using `git fetch --all`, then switch using `git checkout remote_branch_name`. With newer versions of Git, `git switch branch_name` is an easier way to switch to another branch.

## Using git checkout to switch branches

The `git checkout` command allows you to navigate between different branches created through the command `git branch`. When you checkout a branch, it updates all the files in your working directory to match the version stored in that branch. It also informs Git to preserve all the new commits on that branch.

Let's try different versions of `git checkout` command.

### Switch to an existing branch

First, get the list of the branches through `git branch`

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-20-git-switch/image1.png"  alt="git switch" />
</div>

<br/>

The "\*" shows your currently selected branch, which is "test_branch". Now let's switch to BranchB.

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-20-git-switch/image2.png"  alt="git switch" />
</div>
<br/>

To confirm the successful branch switch, execute `git branch` and you will see that your current branch is now BranchB

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-20-git-switch/image3.png"  alt="git switch" />
</div>

<br/>

### Switch to a new branch

The `git checkout` command also comes with a "-b" argument which creates a new branch and automatically switches to it. Let's try it.

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-20-git-switch/image4.png"  alt="git switch" />
</div>

<br/>

The above example shows that the new branch created is the currently selected branch as well.
When switching branch using `git checkout` you might see an error as below.

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-20-git-switch/image5.png"  alt="git switch" />
</div>

<br/>

The above error appears when you have changed a file, and the branch that you are switching to also has changes for the same file too (from the latest merge point). Git will not allow switching branch until you do one of the following:

• Use stash to locally stash your changes temporarily without commit
• Force checkout, which will discard your local changes
• Commit your changes, and then update this commit with extra changes (you can modify commits in Git until they are pushed)

## Troubleshooting Branch Issues

Allow me to share some tips on branch troubleshooting that will really help solve the common problems in a timely manner.

### Rescue the Detached HEAD State

You will have a detached HEAD state when you checkout a commit that is not a branch. Here is how you solve this:

- Create a new branch from the detached HEAD state:

```sh
git switch -c <new-branch>
```

- Or maybe you just want to switch back to an old branch:

```sh
git switch main
```

### Undoing a Commit

If you need to reset an unpublished commit, you can do:

- To prepare changes in your working directory:

```sh
git reset --soft HEAD~1
```

- To discard changes:

```sh
git reset --hard HEAD~1
```

### Recover a Deleted Branch

If you delete a branch by mistake, let's restore it with the reflog:

- Find the commit hash where the branch that was deleted was pointing:

```sh
git reflog
```

- For the restoration of the branch:

```sh
git checkout -b <branch-name> <commit-hash>
```

### Handling Unmerged Changes

If you have any unmerged files and you wish to change branches:

- Stash your changes:

```sh
git stash
```

- Switch branches:

```sh
git switch <branch-name>
```

- Apply the stashed changes:

```sh
git stash apply
```

### Check Branch Tracking Information:\*\*

Use this to see which remote branch your local branch is tracking:

```sh
git branch -vv
```

This command gives you information about branches and their tracking status.

### Switching to a remote branch

Switching between branches is one of the basic Git operations when one needs to work with multiple features. To switch to an already existing branch, use git checkout branch_name. To create and switch to a new branch in one command, use git checkout -b new_branch. For remote branches, first fetch the branch using git fetch --all, then switch using git checkout remote_branch_name. With newer versions of Git, git switch branch_name is an easier way to switch to another branch.

To checkout a remote branch, you will need to fetch the contents of the branch using `git fetch –all` first. Then use the same command `git checkout RemoteBranchName` to switch to remote branch. You might have noticed that it is the same command used to switch to a local branch.

If you want to switch to a remote branch that does not exist as local branch in your local working directory, you can simply execute `git switch remoteBranch`. When Git is unable to find this branch in your local repository, it will assume that you want to checkout the respective remote branch with the same name. It will then create a local branch with the same name. It will also set up a tracking relationship between your remote and local branch so that `git pull` and `git push` will work as intended.

## Using git switch vs git checkout

The `git switch` command replaced `git checkout` in 2020, although `git checkout` is still a supported command. The `git checkout` command performs two functionalities; "switch branch" and "restore working tree files". To separate these two functionalities, Git introduced the `git switch` command, which replaces the "switch branch" feature of "git checkout".

### Why git switch was needed?

Let's assume you have a file named "test.txt" and at the same time, you have a branch named "test". If you are on main branch and you want to checkout to branch "test", you would use the command "git checkout test" but this would checkout the file "test", this is where `git switch` comes in.

• `git switch test` will switch to branch "test" even if you have a file "test"
• `git restore` will discard uncommitted local changes in the file "test" even if you have a branch "test".

In modern Git practices, git switch is now favored for its improved clarity and safety. It handles only branch operations, which prevents the common mistake of accidentally overwriting files that can happen with the multi-purpose git checkout command. For example, creating a branch from a specific commit is much more intuitive using git switch -c `}<new-branch />{` `}<start-point />{`. This focused design makes your workflow more predictable and is the recommended approach in today's development environments.

Let's try this command.

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-20-git-switch/image6.png"  alt="git switch" />
</div>

<br/>

The above command works just the same way `git checkout` switched branches.
Switching to a branch that does not exist will throw an error:

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-20-git-switch/image7.png"  alt="git switch" />
</div>

<br/>

To create a new branch and switch to it in one go, try the following example:

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-20-git-switch/image8.png"  alt="git switch" />
</div>

<br/>

To verify, just run the `git branch` command to see if your current branch has been successfully switched to the newly created branch.

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-20-git-switch/image9.png"  alt="git switch" />
</div>

<br/>

Another interesting argument of this command is `git switch -`. If you have to frequently switch between two branches and typing the branch name every time is cumbersome, you can use the `git switch -` version, which switches to the previously checked out branch. Let's try.

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-20-git-switch/image10.png"  alt="git switch" />
</div>

<br/>

## Difference between git checkout and git reset

`git reset` moves the current branch reference, whereas `git checkout` just moves the head instead of the current branch reference.
`reset` resets the index without changing the working tree. The below example will reset the index to match HEAD, without touching the working tree:

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-20-git-switch/image11.png"  alt="git switch" />
</div>

<br/>

Note that you will use reset to undo the staging of a modified file.
`checkout` is mostly used with a branch, tag, or commit. It will reset HEAD and index to a specified commit, as well as perform the checkout of the index into the working tree at the same time. It is mostly used to discard the changes to your unstaged file(s).

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-12-20-git-switch/image12.png"  alt="git switch" />
</div>

<br/>

If your HEAD is currently set to the main branch, running `git reset 8e3f6r5` will point the main to "9e5e6a4". `Checkout` on the other hand, changes the head itself.

## Difference between git checkout and git restore

`git restore` was introduced when the functionality of `git checkout` was broken into two separate commands `git switch` and `git restore`. Apart from switching branches, `git checkout` can also restore files to a specific commit state. This latter functionality has been extracted into `git restore`.

`git restore` restores the files in the working tree from index or any other commit you specify. You can also use it to restore files in index from some other commit. Note that it does not update your branch. You would use `git restore` to revert non-committed changes. These changes can be in the form of the update in your working copy or the content in your index (i.e. staging area).

The below command will restore "test.txt" in the index so that it matches the version in HEAD. Basically, you are telling Git to copy from HEAD to staging area / index, which is how Git reset works.
`git restore --staged test.txt`

If you want to restore both index and the working tree, then you would use the following version:
`git restore --source=HEAD --staged --worktree test.txt `

<br/>
<div>
<a href="https://discord.gg/refine">
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="Join Refine on Discord banner" />
</a>
</div>

## Difference between git checkout and git Clone

`git clone` is used to fetch repositories you do not have. It will fetch your repositories from the remote git server. `git checkout` is a powerful command with different uses, like switching branches in your current repository and restoring files file from a particular revision.

## Branch Management Techniques

I thought I would share some advanced techniques on how to manage branches, which will streamline our workflow and keep the project organized.

**Branch Naming Conventions:**
Branch naming convention that is clear and consistent is important in projects with multiple contributors. So as to help us comprehend the meaning of each branch, and manage more effectively the project's process of development. Here are some common naming strategies:

- **Feature Branches:** `feature/<feature-name>` - New features, e.g., `feature/user-authentication`.
- **Bug Fix Branches:** `bugfix/<issue-number>` - Used for fixing bugs, e.g., `bugfix/123-fix-login-error`.
- **Release Branches:** `release/<version>` - Used for preparing a release, e.g., `release/1.0.0`.
- **Hotfix Branches:** `hotfix/<issue-number>` - For urgent fixes in production, e.g., `hotfix/456-patch-security-issue`.

**Using Pull Requests Effectively:**
Pull requests are one of the best ways to go over code changes and discuss them prior to merging with the main branch. Here are some tips:

- Attempt to create a PR even for insignificant change.
- Add a clear description and link to relevant issues.
- Request reviews from the team members who are code-savvy.
- Address the review comments quickly and update the PR.

## Performance Optimization in Branch Management

I would like to share some insights into performance optimization in branch management with an attempt to streamline the workflow and improve efficiency.

### Regular Branch Cleanup

The performance could be improved by cleaning the repository at regular intervals, deleting old or merged branches. It will prevent clutter, and it will be easy to spot the relevant branches.

- List merged branches:

```sh
git branch --merged
```

- Delete merged branches:

```sh
git branch -d <branch_name>
```

### Create Lightweight Branches

Git branches are lightweight, so do keep them lean for better performance. Do not add large files directly to the branches.

### Branch Change Success

Switching branches frequently can sometimes lead to performance issues, especially if there are uncommitted changes. To mitigate this:

- Stash changes before switching branches:

```sh
git stash
git checkout <branch-name>
git stash apply
```

### Rebase Instead of Merge

Rebase can clean up the project history with moving or combining commits to make it easier for users to trace and can save performance of branch operations.

- Rebase the branch on top of the main branch:

```sh
git checkout <feature-branch>
git rebase main
```

5. Lower Large File Changes:
   Large files or binary files can slow down branch operations. Use Git LFS (Large File Storage) to efficiently handle large files.

- Track a large file with Git LFS:

```sh
git lfs track <file>
```

### Repository Performance Monitoring

Monitor the performance of your repository on a regular basis to find possible bottlenecks.

- Determine repository size:

```sh
du -sh .git
```

- Reduce unnecessary items and optimize repository:

```sh
git gc --aggressive --prune=now
```

### Using Shallow Clones

Use shallow clones for large repositories to save network data and speed up the fetching.

- Shallow clone with depth:

```sh
git clone --depth 1 <repository-url>
```

These performance improvement techniques would help us hold an efficient and non-overburdened process of branch management.
