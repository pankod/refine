# Tailwind Flex

This post is about how to use TailwindCSS Flex classes effectively to implement reponsive components. We follow an example of building a React navbar with TailwindCSS Flex.

## Introduction

TailwindCSS is a robust CSS framework that provides numerous utility classes for layout, sizing, colors, typography, etc. One of the most powerful capabilities Tailwind provides is repsonsive variants of all utility classes for all screensizes. Tailwind also supports utility variants for element's states like `hover`, `focus`, `active`, and so on.

CSS Flexbox is supported by TailwindCSS with Flex utility classes that are initiated with `flex` and further styled with item intuitive and easy to remember modifiers like `justify-start`, `justify-center`, `items-start`, `items-center` and the likes. Element layouts like the direction are manipulated using classes named `flex-col` and `flex-row`.

In this post, we will play with Tailwind Flex classes to build a simple React navbar that initially has its menu vertically stacked in screens smaller than `md`, and snaps horizontally to the top at larger screens. We'll employ a mobile first approach, so we'll be starting with using `flex-direction: "column"` with `flex-col` class and then at `md` apply `flex-direction: "row"` with `flex-row`. We'll use the Flex order modifiers such as `order-last` to change order of navbar items. We'll also be growing items using `flex-{n}` classes.

We'll start with a collapsible React navbar that already comes with the collapse and show feature as well as necessary spacing and sizing implemented, so that we can focus the on the use of Tailwind Flex classes in this article.

Before starting though, let's talk about the pre-requisites that need to be managed to get going with getting hands on with Tailwind Flex.

## Prerequisites

You need to have [**Node.js**]() in order to have a React App initialized.

Follow these steps in order to get started:

1. From your terminal, go the folder of your choice. Create a React App with CRA and open it in your code editor:

```bash
npx create-react-app flex-navbar
code flex-navbar
```

2. Install TailwindCSS and initialize the `tailwind.config.js`:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

3. Configure template paths:

```bash title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. Add Tailwind layers to your CSS file:

```css title="src/styles/styles.css"
/* CSS reset or normalizer code */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* TailwindCSS styles */
```

It is important that the Tailwind directives are added towards the top of your CSS file, before any other TailwindCSS classes are used.

If you run into any hurdle, please check out how to initialize a React app with `create-react-app` (CRA) for TailwindCSS from [here](https://tailwindcss.com/docs/guides/create-react-app).

With the development environment set up, lets now get our starter files prepared.

## Starter Files

Our `App.tsx` file should look like this:

```jsx
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>{/*Lorem stuff here*/}</main>
    </div>
  );
}

export default App;
```

Please feel free to clean up all other imports and markups.

We want to focus on the `<Navbar />` component, which looks initially like this:

```jsx
import React, { useState } from "react";
import Avatar from "./avatar";
import SearchIcon from "./searchIcon";
import HamburgerIcon from "./hamburgerIcon";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuHidden = !isMobileMenuOpen ? "hidden md:block" : "";
  return (
    <nav className="navbar">
      <div id="brand-wrapper" className="nav-wrapper">
        <a className="brand" href="/">
          tailzup!
        </a>
      </div>
      <div
        className={`${menuHidden} border-t border-slate-500 md:border-none text-amber-50 transition-all ease-in-out duration-1000`}
      >
        <div id="items" className="my-2">
          <div className="left mx-2 p-2">
            <input
              className="text-input"
              type="email"
              placeholder="Find danielle trump or storm..."
            />
            <SearchIcon />
          </div>
          <div>
            <ul id="right" className="">
              <li className="nav-item">
                <a href="/">
                  <Avatar />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Friends
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Messages
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <HamburgerIcon
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </nav>
  );
};

export default Navbar;
```

If you examine, you can see that the display and hiding logic of the vertical menu is already implemented using `isMobileMenuOpen` state. We also have all the spacing, typography and colors styles completed with `navbar`, `nav-wrapper`, `brand` and `text-input` classes composed from necessary TailwindCSS utility classes. You can see what's going on in `src/styles/styles.css` file for the details.

We also have some icons in `src/components/icons` folder.

<details>

<summary>Show Icons</summary>

```jsx
import React from "react";

export const HamburgerIcon = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <div
      className={`absolute top-3 right-4 p-1 border border-slate-500 rounded md:hidden text-slate-500 hover:text-slate-300 hover:bg-slate-500`}
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    >
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </a>
    </div>
  );
};

export const Avatar = () => {
  return (
    <a href="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="avatar"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    </a>
  );
};

export const SearchIcon = () => {
  return (
    <button
      className="px-2 py-0.5 border rounded-r hover:rounded-r hover:border-slate-400 hover:bg-slate-500 transition ease-in-out duration-50"
      href="/"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </button>
  );
};
```

</details>

The icons aslo come with necessary TailwindCSS styles. You can copy paste them directly and use in your navbar if you feel the need to.

Alright, with everything now set on the stage. Let's try run the app:

```bash
npm run dev
```

You can see the vertical menu and the toggle button at viewport width less than `md`. And the toggle button is functioning properly:

![unflexed-navbar]()

The menu items in `<Navbar />` are not yet following flex formatting, as all the `div`s and the unordered list are forming Block Formatting Contexts. You can see the `<Navbar />` component does not have any flex styling yet:

```jsx
import React, { useState } from "react";
import Avatar from "./avatar";
import SearchIcon from "./searchIcon";
import HamburgerIcon from "./hamburgerIcon";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuHidden = !isMobileMenuOpen ? "hidden md:block" : "";
  return (
    <nav className="navbar">
      <div id="brand-wrapper" className="nav-wrapper">
        <a className="brand" href="/">
          tailzup!
        </a>
      </div>
      <div
        className={`${menuHidden} border-t border-slate-500 md:border-none text-amber-50 transition-all ease-in-out duration-1000`}
      >
        <div id="items" className="my-2">
          <div className="left mx-2 p-2">
            <input
              className="text-input"
              type="email"
              placeholder="Find danielle trump or storm..."
            />
            <SearchIcon />
          </div>
          <div>
            <ul id="right" className="">
              <li className="nav-item">
                <a href="/">
                  <Avatar />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Friends
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Messages
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <HamburgerIcon
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </nav>
  );
};
```

So let's start flexing the navbar with TailwindCSS classes.

## Styling a Navbar with TailwindCSS classes

We'll go inside out, as it is easier to manage inner flex containers and then combine container siblings up the HTML tree.

**List Items with Tailwind Flex**

We'll apply a mobile first approach to the `<ul></ul>` and its `<li></li>` items. They make up the main navigation links. And We want to start with flex columns at smaller screens and then go horizontal at `md`. While in column layout, we want the items to justified and aligned as default to top and left:

```jsx
// Skipped markup

<div>
  <ul
    id="right"
    className="
                        flex flex-col
                        md:flex-row md:justify-start md:items-center
                    "
  >
    <li className="nav-item md:order-last">
      <a href="/">
        <Avatar />
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/">
        Home
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/">
        Friends
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/">
        Messages
      </a>
    </li>
  </ul>
</div>
```

At `md`, with `md:flex-row md:justify-start md:items-center` we turning the items horizontal, to justified to the start and vertically positioned to center.

**Ordering List Items with Tailwind Flex**

Notice, the `<Avatar />` item's `<li></li>` element is the first item on smaller screens, and we moved its order to last with `md:order-last`. It's showing at the end of the horizontal navbar.

### Search Bar

Next, we look at the sibling of the container of the list we just "flexed", the parent which houses the search bar. We first want the search bar input and icon to be flexed, horizontally and vertically centered at all times. So:

```jsx
<div
  className="
                left mx-2 p-2
                flex justify-center items-center
            "
>
  <input
    className="text-input"
    type="email"
    placeholder="Find danielle trump or storm..."
  />
  <SearchIcon />
</div>
```

And then we want to correctly position the search bar and the nav list items. We want the search bar and list items stacked vertically from top and left on smaller screens, i.e., while in `flex-col` direction. And on screens larger than `md`, we want them to go horizontal, position from start and vetically centered So, on the parent container with `id="items"`:

```jsx
<div
  id="items"
  className="
                            my-2
                            flex flex-col justify-start items-start
                            md:flex-row md:justify-start md:items-center
                        "
>
  <div
    className="
                            left mx-2 p-2
                            order-last md:order-none
                            flex justify-center items-center
                        "
  >
    <input
      className="text-input"
      type="email"
      placeholder="Find danielle trump or storm..."
    />
    <SearchIcon />
  </div>
  <div>
    <ul
      id="right"
      className="
                                flex flex-col
                                md:flex-row md:justify-start md:items-center
                            "
    >
      <li className="nav-item md:order-last">
        <a href="/">
          <Avatar />
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/">
          Home
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/">
          Friends
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/">
          Messages
        </a>
      </li>
    </ul>
  </div>
</div>
```

Notice, we are applying flex orders with Tailwind Flex `order` classes. With `order-last md:order-none` on the search bar container, we are placing it at the bottom of the vertical stack on smaller screens, and by removing it on `md` and up, we are moving it back to first position.

So, with these changes, we have been able to achieve a good shape for the vertical navbar. The navbar looks almost complete and it can now strongly flex its muscle back an forth the horizontal position:

![vertical-menu-complete]

We need to now fix things with the brand item, which should be in the left on larger screens.

### Positioning Navbar Logo with Tailwind Flex

Before we work on the parent `<nav></nav>`, let's make sure all elements inside the `id="brand-wrapper"` is always centered horizontally and vertically.

```jsx
<div
  id="brand-wrapper"
  className="
                    nav-wrapper
                    flex justify-start items-center flex-1 self-start
                "
>
  <a className="brand" href="/">
    tailzup!
  </a>
</div>
```

Notice with `flex-1`, we are making the `brand-wrapper` `div` grow to empty spaces all the time.

And now in the parent `nav` element, for screens larger than `md`, let's make the navbar items on the right become horizontal with the brand item on the left:

```jsx
<nav
  className="
                    navbar
                    flex flex-col justify-start md:flex-row md:justify-between md:items-center
                "
>
  <div
    className="
                        nav-wrapper
                        flex justify-start items-center flex-1 self-start
                    "
  >
    <a className="brand" href="/">
      tailzup!
    </a>
  </div>
  <div
    className={`${menuHidden} border-t border-slate-500 md:border-none text-amber-50 transition-all ease-in-out duration-1000`}
  >
    <div
      id="items"
      className="
                            my-2
                            flex flex-col justify-start items-start
                            md:flex-row md:justify-start md:items-center
                        "
    >
      <div
        className="
                                left mx-2 p-2
                                order-last md:order-none
                                flex justify-center items-center
                            "
      >
        <input
          className="text-input"
          type="email"
          placeholder="Find danielle trump or storm..."
        />
        <SearchIcon />
      </div>
      <div>
        <ul
          id="right"
          className="
                                    flex flex-col
                                    md:flex-row md:justify-start md:items-center
                                "
        >
          <li className="nav-item md:order-last">
            <a href="/">
              <Avatar />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Friends
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Messages
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <HamburgerIcon
    isMobileMenuOpen={isMobileMenuOpen}
    setIsMobileMenuOpen={setIsMobileMenuOpen}
  />
</nav>
```

With `flex flex-col justify-start md:flex-row md:justify-between md:items-start` on `nav` element, we are placing the brand items stacked on top of other items on smaller screens, and then `md` and up, they are horizontally spaced between and centered vertically.

So, with these Tailwind Flex power, we have a pretty neat React responsive navbar we can use on any webpage:

![navbar-final]()

And the final `<Navbar />` component looks like this:

```jsx
import React, { useState } from "react";
import Avatar from "./avatar";
import SearchIcon from "./searchIcon";
import HamburgerIcon from "./hamburgerIcon";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuHidden = !isMobileMenuOpen ? "hidden md:block" : "";
  return (
    <nav
      className="
									navbar
									flex flex-col justify-start md:flex-row md:justify-between md:items-center
								"
    >
      <div
        className="
										nav-wrapper
										flex justify-start items-center flex-1 self-start
									"
      >
        <a className="brand" href="/">
          tailzup!
        </a>
      </div>
      <div
        className={`${menuHidden} border-t border-slate-500 md:border-none text-amber-50 transition-all ease-in-out duration-1000`}
      >
        <div
          id="items"
          className="
											my-2
											flex flex-col justify-start items-start
											md:flex-row md:justify-start md:items-center
										"
        >
          <div
            className="
												left mx-2 p-2
												order-last md:order-none
												flex justify-center items-center
											"
          >
            <input
              className="text-input"
              type="email"
              placeholder="Find danielle trump or storm..."
            />
            <SearchIcon />
          </div>
          <div>
            <ul
              id="right"
              className="
													flex flex-col
													md:flex-row md:justify-start md:items-center
												"
            >
              <li className="nav-item md:order-last">
                <a href="/">
                  <Avatar />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Friends
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Messages
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <HamburgerIcon
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </nav>
  );
};

export default Navbar;
```

## Summary
