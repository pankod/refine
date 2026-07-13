---
title: Using Arguments in Bash Scripts
description: This article will help you understand how to use arguments in bash scripts to make your scripts more flexible and reusable.
slug: bash-script-arguments
authors: muhammad_khabbab
category: "Engineering"
tags: [dev-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-22-bash-script/social.png
hide_table_of_contents: false
---

## Introduction

Arguments in any bash script are inevitable for any scripting task. They make the script flexible and dynamic instead of static and hard coded. Now there are many variations in how arguments can be used effectively in a script, and this is exactly what we will discuss today. Remember, a solid understanding of arguments is crucial to automate your tasks through script arguments. For each point in this article, we will provide an example from a practical perspective as well.

Let's start with understanding how positional parameters work in the bash script.

Steps to be covered:

- [Understanding Positional Parameters](#understanding-positional-parameters)
- [Using Special Parameters](#using-special-parameters)
- [Implementing Flags and Options](#implementing-flags-and-options)
- [Handling Variable Numbers of Arguments](#handling-variable-numbers-of-arguments)
  - [Best Practices for Bash Script Arguments](#best-practices-for-script-arguments)

### Understanding Positional Parameters

In bash scripting, positional parameters are a fundamental concept. They’re the variables that bash scripts use to handle input data. When you run a script, you can pass arguments to it, and these arguments are stored in special variables known as positional parameters. The first argument you pass is stored in `$1`, the second in `$2`, and so on.

Let’s understand this in detail through an example. Let's say you have a bash script that needs to process three pieces of input data and you want to make use of positional parameters. The below snippet shows how you might use positional parameters to handle this:

```bash
#!/bin/bash
echo "Arg 1: $1"
echo "Arg 2: $2"
echo "Arg 3: $3"
```

When you run this script with three arguments, it will echo back the first three arguments you passed to it. For instance, if you run `./myscript.sh marketing sales engineering`, the script will output:

```bash
Arg 1: marketing
Arg 2: sales
Arg 3: engineering
```

This shows how `$1`, `$2`, and `$3` correspond to the first, second, and third arguments you passed to the script. It is a simple yet powerful way to make your scripts more flexible and reusable.

### Using Special Parameters

In bash scripting, there are special parameters that provide additional ways to handle input data. These include `$*`, `$@`, and `$#`.

The `$*` and `$@` parameters represent all arguments that were passed to the script. While they might seem identical, their behavior diverges when you try to iterate over them in a script. Let’s illustrate this with an example:

```bash
#!/bin/bash
echo "Iterating with \$*"
for arg in "$*"
do
    echo $arg
done

echo "Iterating with \$@"
for arg in "$@"
do
    echo $arg
done
```

If you run this script with the arguments `./myscript.sh one two three`, you’ll notice that `$*` treats all arguments as a single string, while `$@` treats each argument as a separate string.

The `$#` parameter is different - it doesn’t represent the arguments themselves, but the number of arguments. This can be useful when your script needs to know how many arguments were passed. Here’s a simple script that uses `$#`:

```bash
#!/bin/bash
echo "You provided $# arguments."
```

If you run `./myscript.sh apple banana cherry`, the script will output `You provided 3 arguments.` This shows how `$#` can be used to count the number of arguments passed to a script.

## Implementing Flags and Options

Bash scripts often require input parameters to customize behavior, and `getopts` is a utility that can be used to parse positional parameters.

```bash
#!/bin/bash

# Initialize our own variables
OPTIND=1         # Reset in case getopts has been used previously in the shell.
verbose=0
name=""

while getopts "h?vn:" opt; do
    case "$opt" in
    h|\?)
        echo "Usage: $0 [-v] [-n name]"
        exit 0
        ;;
    v)  verbose=1
        ;;
    n)  name=$OPTARG
        ;;
    esac
done

shift $((OPTIND-1))

[ "${1:-}" = "--" ] && shift

echo "verbose=$verbose, name='$name', Leftovers: $@"
```

In the script above, `-h` is used for displaying help information, and `-n` is used for setting a name. The `v` flag is used to set verbose mode. If `-v` is provided when the script is run, `verbose` is set to 1. If `-n` is provided, the next argument is assigned to the variable `name`.

Here’s an example of how you might run this script:

```bash
$ ./myscript -v -n "Example Name" leftover args

```

Output:

```bash
verbose=1, name='Example Name', Leftovers: leftover args
```

In this example, the `-v` flag sets verbose mode, and `-n` sets the name to “Example Name”. Any arguments provided after the flags (in this case, “leftover args”) are still available in the script.

## Handling Variable Numbers of Arguments

Bash scripts often need to accept a variable number of arguments. This is where `$@` comes into play. It’s a special shell variable that holds all the arguments provided to the script.

```bash
#!/bin/bash

# Initialize an empty string
concatenated=""

# Loop through all arguments
for arg in "$@"; do
    concatenated+="$arg "
done

# Print the concatenated string
echo "Concatenated string: $concatenated"
```

In the script above, we initialize an empty string `concatenated`. We then loop through all arguments provided to the script using `$@` and append each argument to `concatenated`.

Here’s an example of how you might run this script:

```bash
$ ./myscript arg1 arg2 arg3
```

Output:

```bash
Concatenated string: arg1 arg2 arg3
```

In this example, the script concatenates the three arguments `arg1`, `arg2`, and `arg3` into a single string. This demonstrates how a bash script can handle a variable number of arguments.

### Best Practices for Script Arguments

Here are some best practices for designing bash scripts with arguments:

- **Use Intuitive Argument Names:** Opt for descriptive and intuitive names for arguments. This improves readability and helps maintain the code.

  - Bad: `bash script.sh $1 $2`
  - Good: `bash script.sh -u username -p password`

- **Assign Default Values:** Where practical, assign default values to arguments. This ensures that your script behaves predictably even when certain inputs are omitted.

  - Example: `file_path=${1:-"/default/path"}`

- **Inline Comments:** Use inline comments to explain the purpose and expected values of arguments. This documentation aids future maintainers and users of your script.

  - Example: `# -u: Username for login`

- **Leverage `getopts` for Option Parsing:** `getopts` allows for more flexible and robust argument parsing, supporting both short and long options.
  - Example:

```bash
while getopts ":u:p:" opt; do
  case ${opt} in
    u ) username=$OPTARG;;
    p ) password=$OPTARG;;
    \? ) echo "Usage: cmd [-u] [-p]";;
  esac
done
```

- **Validate Input Early:** Check for the existence and format of required arguments at the start of your script to prevent execution with invalid inputs.
  - Example:

```bash
if [ -z "$username" ] || [ -z "$password" ]; then
  echo "Username and password are required."
  exit 1
fi
```

- **Beware of Unquoted Variables:** Always quote variables to handle values with spaces correctly.
  - Bad: `if [ -z $var ]; then`
  - Good: `if [ -z "$var" ]; then`
- **Explicitly Declare Intent:** Use `set -u` to treat unset variables and parameters as an error, preventing scripts from running with unintended states.
  - Add `set -u` at the beginning of your script.

## Conclusion

The importance of arguments in developing scripts that can adapt to different situations is highlighted by the fact that they are extensively used in bash scripts. We focused on improving script functionality and user interaction by using positional parameters, special variables, and `getopts`.

Not only do the given examples provide a useful roadmap, but they also inspire developers to try new things and incorporate these ideas into their scripts. Your scripting skills will certainly improve after adopting these best practices and techniques, allowing you to make your automation tasks more efficient and adaptable.
