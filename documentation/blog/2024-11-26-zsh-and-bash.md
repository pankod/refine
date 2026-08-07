---
title: Zsh and Bash
description: We'll explore the unique features of these tools and their similarities and differences.
slug: zsh-vs-bash
authors: muhammad_khabbab
category: "Alternatives"
tags: [dev-tools, comparison]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/social-2.png
hide_table_of_contents: false
last_update: 2024-11-26
---

**This article was last updated on November 26, 2024, to add clear definition.**

## Introduction

In the early days of computing, programmers used a non-graphical interface called the shell or terminal to communicate with computer systems. The shell is an alternative to the more user-friendly graphical user interface (GUI) that comes with every computer or operating system. The shell lets you do everything you can do with the GUI but with more simplicity, control, and automation. Unlike the GUI, which uses visual elements and clicking, a shell is a text-based tool that lets you carry out the same tasks with text characters from your keyboard.

Among all Unix-based shell environments, two of the most famous are Zsh and Bash. Zsh is fully customizable, having features like auto-completion, syntax highlighting, and support for plugins, which is ideal for an interactive, modern workflow. On the other hand, Bash excels in simplicity with POSIX compliance and in scripting with strong automation and cross-platform capabilities. Thus, Zsh is the ideal choice when advanced customization and a modern user experience are desired, while Bash serves best for standardized scripting and in terms of being highly reliable.

In this article, we’ll explore the unique features of these tools and their similarities and differences. We’ll also compare some of their features, so you'll have enough knowledge to make an informed choice when choosing the right shell. Let's dive in!

## What is Bash?

Bash (short for Bourne Again Shell) is a Unix-based shell and command processor that provides a command-line interface where you can interact with all components of your operating system by executing commands or running scripts. It offers a rich set of built-in commands and utilities for tasks such as file manipulation, text processing, and system administration. In the coming sections, we’ll look at some of the available features in Bash.

## What is Zsh?

Zsh (short for Z shell and pronounced as “Zee shell” or “Zed shell”) is an extended and improved version of Bash that can be used as an interactive login shell and as a command-line interpreter for shell scripting and command programming.
While Zsh is not completely compatible with Bash, it shares some similar functionalities and features with Bash. Zsh is designed to be a highly customizable shell with an interactive command-line interface for executing commands, running shell scripts, and performing various system administration tasks.

## Basic Features of Bash and Zsh

Bash and Zsh are similar tools with a wide range of similar features and capabilities for carrying out the same task. However, one is superior to the other in terms of features and capabilities. In this section, we’ll explore some of the distinct features of the two shells and their capabilities.

### Features of Bash

1.  Brace expansion: Brace expansion is a technique in bash that allows you to generate multiple combinations or sequences based on a specified pattern or set of values. The basic syntax for brace expansion in bash is to enclose a pattern or a set of values within curly braces `{}`. Below are a few examples to illustrate how brace expansion works in bash:

    **Generating a sequence**: `{1..5}` generates a sequence of numbers from 1 to 5 as follows: `1 2 3 4 5`.

    **Nested Brace Expansion**: `{1..3}{a,b}` generates a sequence of numbers combined with a sequence of letters: `1a 1b 2a 2b 3a 3b`.

2.  Tab completion: If you press the tab key while writing a command, bash automatically uses command line completion to match built-in command options, program names, filenames, and variable names.
3.  Portability: If you're running a bash script or command that you want to conform very closely to the POSIX 1003.2 standard, you can invoke bash with the `--posix` option or stating `set -o posix`.
4.  Command history: Using the `history` command in bash will allow you to view, edit, and rerun up to 500+ commands that you've run previously in the shell.
5.  Batch and concurrent execution of commands: In bash, you can run multiple commands one after the other using the following syntax `command1; command2`. You can also run two commands concurrently using the `&` character. The syntax is as follows: `command1 & command2`.

### Features of Zsh

1.  Themeable prompts: Themeable prompts allow you to customize the appearance and behavior of your command-line prompt. For example, you can set up zsh to auto-hide when you type a long command and display your prompt information on the right side of the screen.
2.  Spell checking and autofill: Zsh has built-in spell checking and autofill capabilities to help you detect and correct spelling errors in your workflow.
3.  Syntax highlighting: One of the superpowers of zsh is its extendibility. Zsh provides support for syntax highlighting which is useful for visually identifying different parts of a command or script based on their syntax.

## Optimizing Performance in Zsh and Bash

I've been checking out ways to improve our shell environments for quite some time, focusing on both Zsh and Bash in particular. Here are a few ideas along with illustrative code snippets showing how we can do that:

### Shell Startup Times

We can reduce the startup time in Zsh by implementing **lazy loading** for plugins. Here's an example:

```bash
# .zshrc

# Load plugins when they are only necessary
zmodload zsh/complist
autoload -Uz compinit && compinit
autoload -Uz promptinit && promptinit
```

It just ensures that Zsh will load only some of the modules when needed, not at the time of its startup.

### Resource Management

In both Bash and Zsh, it will be better to handle system resources if we refrain from the use of background processes. Here is what we simply do in Bash:

```bash
# .bashrc

# Disable command autocorrection on a bash
shopt -u cdspell
```

Further savings in both CPU cycles and memory usage can be achieved by disabling the unnecessary features from Bash, for instance, command auto-correction.

### Performance Benchmarking for Everyday Tasks

We can also benchmark typical tasks to find performance bottlenecks. Here is a sample script that benchmarks file listing in a directory:

```bash
# time_list.sh
#!/bin/bash

start_time=$(date +%s%N)
ls -l
end_time=$(date +%s%N)
execution_time=$((end_time - start_time))
echo "Execution time: $execution_time nanoseconds"
```

This script times the execution of the command `ls -l`, which could be useful to compare performance differences between Bash and Zsh.

## How to setup Bash and Zsh on your computer

In this section, we'll explore how you can setup bash on a Windows operating system. This is because,unlike Windows, bash and zsh are easily accessible in other operating systems such as macOS and Linux.

### Using Bash on Windows

There are two common methods of using bash on Windows. You can either use Git Bash or the Windows Subsystem for Linux on Windows 10 and above.

**Method 1 - Git Bash**

Git Bash is a shell application for Windows operating systems which provides emulation layer for interacting with the Git through the command-line interface.

If you're a seasoned or experienced programmer, it's likely you have Git installed on your computer already. When you download and install [Git for Windows](https://git-scm.com/downloads), the installation comes with Git Bash, and you can run it from your computer like any other application.

To use Git Bash on a Windows machine, ensure you have Git downloaded and installed already. After the installation, you can use the search tool to look for the application and run it.

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/search.png"  alt="Windows search showing Git Bash" />
</div>

<br/>

The app looks like below:

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/bash.png"  alt="Git Bash terminal window" />
</div>

<br/>

You can run the following command to confirm that the shell running is bash:

```bash
echo $SHELL
```

You should get an output similar to the following:

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/echo.png"  alt="Terminal output for echo $SHELL" />
</div>

<br/>

**Method 2 - Windows Subsystem for Linux**

Another way to use bash on Windows is through the Windows Subsystem for Linux (WSL). To get started, you'll need to do the following:

1. Enable the Windows Subsystem for Linux. Open **Control Panel** on your computer then go to **Programs** > **Turn Windows features on and off**. Make sure the checkbox for Windows Subsystem for Linux is ticked as shown below (you'll need to restart your computer for the changes to apply):

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/control-panel.png"  alt="Windows features dialog with WSL enabled" />
</div>

<br/>

2. Install a Linux distribution. Since bash is the default shell in most Linux distributions, you can use any distro you're comfortable with, but we'll be using Ubuntu in this guide. Head over to Microsoft Store on your computer and install Ubuntu on your computer:

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/store.png"  alt="Microsoft Store listing for Ubuntu" />
</div>

<br/>

3. Search and run the Ubuntu application.

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/search-ubuntu.png"  alt="Windows search showing Ubuntu app" />
</div>

<br/>

4. When you launch the Ubuntu application for the first time, it'll take you through a series of prompts to configure your username and password:

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/prompt.png"  alt="Ubuntu first-run setup prompts" />
</div>

<br/>

5. Run `echo $SHELL` to confirm bash is the shell environment you're in.

### Using Zsh on Windows

Once you have bash working on your computer, you can then use it to install any other shell environment of your choice, including zsh, ksh, and a host of others.
Open Ubuntu and run the following command to install zsh:

```bash
sudo apt-get install zsh
```

After the installation is complete, you can run `zsh --version` to confirm the if zsh has been installed successfully on your computer. Finally, run `zsh` to switch the shell environment to zsh. Note that you can only run zsh from any Linux-based operating system such as Ubuntu on Windows. If you try to run `zsh` from the normal command-line or Powershell, it won't work.

### Using Bash and Zsh on macOS and Linux

If you fall into any of the category of these users, congratulations! Both bash and zsh are readily available on macOS and Linux distributions, and you have the flexibility to choose your preferred shell based on your needs and preferences.

Bash was the default shell in macOS version 10.3 until version 10.15 (macOS Catalina) before the default shell was changed to zsh. However, bash is still included in newer versions of macOS and you can change the default shell to any of the two, depending on what suits your use case and preferences.

Just like macOS, bash is included by default in most Linux distributions. Zsh on the other hand, needs to be installed manually. The installation process varies for different distributions but you can always check how to go about it for your distro on [zsh website](https://www.zsh.org/).

## Deep Dive into Bash Features

### Explanation of key Bash features with examples

### Command Line Editing

### Command Editing:

Editing commands in Bash is possible using standard editing keys. You can use the arrow keys to move the Cursor, the backspace or delete keys to remove characters, and a variety of keyboard shortcuts to quickly cut, copy, and paste the text.

**Example 1:** You can Move the Cursor by using arrows. For example, we have used the left arrow to bring the Cursor from the end-of-line to the start of the line, and you can also delete the characters using the backspace or delete keys.

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/comman-editing.png"  alt="Bash command line cursor editing example" />
</div>

<br/>

**Example 2:** You can also cut, copy and paste the text in the Bash Command line. Let’s take an example of the same command(echo “Hello, World!”). Move the Cursor to the start of the ‘World’ using the ‘left’ arrows explained above, and press ‘**Ctrl+K**’ to cut and then ‘**Ctrl+Y**’ to paste.

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/command-editing-2.png"  alt="Bash cut and paste command editing example" />
</div>

<br/>

### Command Recalling:

The Ctrl+R keyboard shortcut allows you to look up, retrieve and then recall specific commands from the history, but you need to know the part of that command. With only a few keystrokes, Bash will search your command history and present a list of match commands.

**Example:**
Let’s take an example of searching ‘echo “Hello, World!”’ command in our history by using the word ‘Hello’(i.e., the part of the command) after pressing ‘**Ctrl+R**’ and then recalling that command.

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/command-recalling.png"  alt="Bash history search with Ctrl+R" />
</div>

<br/>

### Command Reusing:

In the Bash tool, shortcuts are available to recall and reuse parts of earlier commands using a specific syntax. The last command is repeated by syntax “!!”, while “**!$**” refers to the last argument of the previous command.

**Examples:**

**Example 1:** Let’s repeat the last command using “**!!**”

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/comman-reusing-1.png"  alt="Bash command reuse with !!" />
</div>

<br/>

**Example 2:** Now, Let’s reuse the last argument of the previous command by using the syntax “**!$**”. We run the previous command ‘echo “World”’. Now we will list the directory with the name “World” used as the last argument in the previous command.

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/command-reusing-2.png"  alt="Bash last-argument reuse with !$" />
</div>

<br/>

### Shell Scripts

### Variables

For storing and Manipulating data, you can use ‘Variables’ that can be declared without having data types. ‘Variables’ can hold Strings, numbers, or any other values.

**Example:** You want to hold personal data having name, age, and gender. You do not need to specify the string data type for name and the number data type for age. So, for that purpose, you just need to name the variables and assign them the values.

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/variables.png"  alt="Bash variables example" />
</div>

<br/>

### Control Structures

With the help of control structures, Linux commands can be controlled during execution in shell scripts. Using Bash control structures, such as the if-then-else, for, and while loops, you can construct scripts that perform various operations based on the specified conditions.

**Example:** Let’s print a list of numbers from 1-3 by utilizing the ‘**for**’ loop in the Bash command line.

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/control-structure.png"  alt="Bash for-loop control structure example" />
</div>

<br/>

### Job Control:

### Foreground jobs

Foreground Jobs refer to the default behavior of command execution in Bash. When you run any command in the Bash Shell, it will wait for that command to complete and will not allow you to have any other input until completion. For Example, when you run the ‘**ls**’ command, the shell will wait to display the output and open a new prompt.

### Background Jobs

The background job will allow you to run commands or processes in the background while working on the shell. The ampersand (&) sign is added to the end of a command to make it operate as a background job. For Example, “like long_running_task_command **&**”. When a command runs asynchronously in the background, you can carry on running other commands or scripts without having to wait for the background operation to complete.

## Deep Dive into Zsh Features

### Explanation of key Zsh features with examples

### Auto-Complete:

Zsh has a comprehensive autocomplete feature offers suggestions and auto-completes as you write commands, parameters, file names, and more. It can considerably speed up command entry and minimize mistakes.

**Example:** Zsh will autocomplete the path to ‘/usr/’ when you type ‘ls -l /us’ and press the Tab key. You can then continue typing or press Enter to run the command.

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/auto-complete.png"  alt="Zsh autocomplete example" />
</div>

<br/>

### Path Expansion

Zsh has powerful path expansion features that let you define patterns and perform a variety of operations on file and directory paths. Globbing patterns, recursive matching, file filtering, and other features are supported by Zsh's path expansion.

**Example:** If you're using Zsh, you can type ‘**ls /path/to/directory//\*.txt**’ and hit enter to expand the path ‘**ls /path/to/directory//\*.txt**’ and display a list of all the text files under that specified directories, and it’s subdirectories.

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/path-expansion.png"  alt="Zsh path expansion example" />
</div>

<br/>

### Theme and Plugin System

The fact that Zsh can adopt new themes is the most exciting thing about it. New themes and plugins for Zsh or changes in existing ones can be made to suit your needs. It provides you with a choice of personalizing your shell, adding useful features with plugins, and increasing productivity.

**Example:** The ‘**Oh My Zsh**’ framework is widely used to incorporate themes and plugins, such as the "**agnoster**" theme that showcases a prompt with Git branch status and the "git" plugin that includes Git aliases and shortcuts.

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-07-14-zsh-and-bash/theme-plugin.png"  alt="Oh My Zsh theme and plugins example" />
</div>

<br/>

## Case Study: When to Use Bash and When to Use Zsh

### Real-world examples of scenarios where Bash is preferable

### Command Line Editing

**Scenario:** Consider modifying the ‘rsync’ command to sync files between various directories.

**Solution:** You can use bash shell command line editing without retyping the commands. Recall the previous command using the Up arrow key. Use the Left/Right arrow keys to navigate the file paths or arguments needing modification. Modify the paths or arguments and press Enter to execute the modified command.

### Shell Scripting

**Scenario:** Let's say you need to update some code in a repository, stop the server, then restart it in order to publish a web application.

**Solution:** Write a shell script to automate the process and assure consistency. Create a deployment.sh script using a text editor, Write commands to stop the server, update code, restart the server, then Save the script file, Make the script executable(**chmod +x deployment.sh**), and Execute the script(**./deployment.sh**).

### Background Processing

**Scenario:** You've got long-running tasks or processes that need to be performed in the background or managed interactively.

**Solution:** To effectively manage foreground and background operations, use job control. Start the data processing script as a background job, Monitor the progress of the background job using the jobs command(jobs), and bring the job to the foreground for interactive monitoring.

### Real-world examples of scenarios where Zsh is preferable

### Auto-Complete

**Scenario:** Consider a directory with several files and subdirectories, and you want to browse that directory structure and work with complicated command arguments.

**Solution:** Zsh can autocomplete files and directory names by inputting the first few characters and clicking the Tab key, making accessing or modifying them simpler. For instance, when you type cd /u/lo and click Tab, it could automatically complete as cd /usr/local/.

### Path Expansion

**Scenario:** You want to operate on multiple files or folders at once without individually identifying each one, such as removing every text file from a particular directory.

**Solution:** You can utilize path expansion to remove several files simultaneously rather than specifying each separately. If you type ‘**rm /path/to/directory/\*.txt**’, all text files in that directory will be removed.

### Theme and Plugin System:

**Scenario:** You can use a plugin or tool from your Zsh command line to have a web search instead of opening a web browser separately and manually inputting the search term.

**Solution:** A plugin such as ‘[Web-Search](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/web-search)’ allows you to search inside the command line instead of using a browser separately. This plugin adds aliases for searching with Google, Wiki, Bing, YouTube, and other popular services.

## Cross-Platform Compatibility in Zsh and Bash

For my part, one important thing to note is that we push to make our scripts cross-platform since most of us work and write scripts within shell environments. Here's how we can approach it:

### Portability Across Different Operating Systems

Ensure our scripts run across Windows, macOS, and Linux without any hitches:

- **Use POSIX-compliant Commands:** Try to keep to POSIX-compliant commands and syntax. POSIX is just a standard to see compatibility among Unix-like operating systems.

```bash
# Sample POSIX-compliant syntax
for file in *; do
  echo "$file"
done
```

This loop will work under most Unix-like systems.

- **Don't use OS-specific Commands:** Some commands, including `ls` and `dir`, have OS-specific variations. Use more generic commands that are broadly supported, or add condition checking:

```bash
# Example of Conditional OS Check
if [ "$(uname)" = "Linux" ]; then
  ls -la
elif [ "$(uname)" = "Darwin" ]; then
  ls -lG
else
  echo "Unsupported OS"
fi
```

### Docker and Container Compatibility

When working with Docker or containerized environments, it's important to ensure that our shell scripts work accordingly inside the containers.

- **Test Scripts in Docker:** Always test the scripts within the Docker environment they are supposed to execute in. This way, all the dependencies are set up correctly.

```bash
# Sample Dockerfile to try a script
FROM ubuntu:20.04
COPY script.sh /usr/local/bin/script.sh
RUN chmod +x /usr/local/bin/script.sh
CMD ["/usr/local/bin/script.sh"]
```

- **Use Environment Variables:** Docker has great support with environment variables; make your scripts flexible, so configurations could be passed in using environment variables:

```bash
# Usage example of environment variables in a script
echo "Running in environment: $ENVIRONMENT"
```

If we put the focus on these areas, we are sure that our scripts will be sturdy and operational not only on dissimilar platforms, but also in different environments. What's more, the possible issues on migration between these systems can be decreased.

## Conclusion

### Summarizing key points made in the article

1. Both Bash and Zsh are two popular UNIX shells used as command languages and for shell scripting. Bash, with its widespread adoption, POSIX compliance, and familiarity, remains a popular and reliable option if you’re looking to streamline your command-line experience.
2. Zsh, on the other hand, introduces advanced features, such as auto-complete, path expansion, customizable prompts, syntax highlighting, theme and plugin support, which can significantly improve your productivity and user experience.

### Final thoughts on choosing between Bash and Zsh based on specific needs and environments

1. Without too much rambling, deciding on which to use between Bash and Zsh will ultimately depend on your need and personal preferences. There is no definitive answer as to which shell is superior, as both have unique strengths and capabilities.
2. If you consider compatibility and need maximum compatibility with different Unix systems or POSIX compliance, Bash is your best bet. Since Bash is the default shell on many Linux distributions and macOS, using it will ensure that your scripts and commands will work accordingly across these platforms.
3. Another example is customization needs. While both Bash and Zsh offer customization options, the customization capabilities of Zsh are far more superior to that of Bash. For instance, Zsh has a rich and extensive open-source framework and community called “Oh My Zsh” for managing your Zsh configuration and customizations.
