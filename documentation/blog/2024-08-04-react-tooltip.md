---
title: Creating responsive tooltips in React with react-tooltip
description: We'll explore how to create a custom tooltip component in a React application, as well as integrating the react-tooltip library.
slug: react-tooltip
authors: david_omotayo
category: "Ecosystem / Integrations"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/social-2.png
hide_table_of_contents: false
last_update: 2024-08-05
---

**This article was last updated on August 05,2024 to add sections for Advanced Custom Tooltip Features and Performance Optimization.**

## Introduction

A tooltip is a short and informative message that appears when a user interacts with certain elements on a webpage. The main objective of a tooltip is to provide users with relevant information about the features and elements on the page when they are hovered or clicked.

Typically, a tooltip is displayed as a small box or pop-up and is commonly used to offer additional information about an icon, button, or other UI elements in an application. The content of a tooltip can also consist of various multimedia, including images, videos, and GIFs, based on the application's design.

You can see a tooltip in action through the following GIF example:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/first.avif" alt="Tooltip hover preview" />

<br/>

In this article, we'll explore how to create a custom tooltip component in a React application, as well as integrating a tooltip library like react-tooltip.

## Project setup

There are two ways you can use tooltips in your React applications, you either create a custom tooltip component from scratch or use a library such as react-tooltip. We'll go over how to set up both approaches, but before delving into the specifics, we'll quickly set up a simple React application to showcase the examples in this article.
To this end, [refine.new](https://refine.new/) serves as an excellent tool that we can use to rapidly create a new React CRUD application.

[refine.new](https://refine.new/) enables you to quickly bootstrap a new [Refine](https://github.com/refinedev/refine) application, an open-source React-based, headless UI library for creating enterprise applications, within your browser with features such as preview, tweaking, and instant download.

To get started, head on to [https://refine.new/](https://refine.new/), scroll down the page, and click on the `Let's start` button.

Upon clicking the button, you’ll be presented with a stepper component that let you choose and combine your preferred React platform, UI framework, backend connector, and auth provider.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/select.png" alt="refine.new setup stepper" />

<br/>

Since we’re not creating something complex, we’ll use these options to set up our application:

    Vite > Headless > Rest Api > No auth

After completing the required steps and clicking the 'complete' button, you will be redirected to a preview page for your Refine application. Here, you can make any necessary adjustments before building and downloading the application file.

Once you're done tweaking the application to your taste, click on the `Build & Download` button on the sidebar to download the application. If you haven't already, you will be prompted to sign in with your Google or GitHub profile.

After logging in, a second pop-up would appear with a URL for downloading the project file.

Finally, extract the downloaded file and open it in your IDE of choice.

Now that we have our project set up, the final step is to install the development dependencies and start the development server. you can do this by executing the commands below in your terminal:

    npm install
    npm run dev

These commands will install the necessary dependencies for your project and start the development server. If your browser doesn’t automatically preview the application, you can manually navigate to it by entering `[http://127.0.0.1:5173](http://127.0.0.1:5173)` in your browser.

<br/>

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/welcome.png" alt="Headless Refine starter screen" />

<br/>

Refine was originally designed to provide a rapid way of bootstrapping enterprise-level React applications, complete with predefined pages. When you create a new headless project with Refine, you’ll notice that these pages are already set up by default, but with placeholder data generated using the Refine Inferencer package.

<br/>

<div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/inferencer.png"  alt="Inferencer-generated list page" />
</div>

<br/>

The Refine inferencer package is a tool that automates the generation of CRUD (Create, Read, Update, Delete) pages for resources in your Refine application based on the data model. You can find more information about this package by visiting the [documentation](https://refine.dev/core/docs/packages/documentation/inferencer).

Since our application's pages are being populated by the inferencer, we don't have direct access to the rendered content, so we cannot add a tooltip to a specific element like the `create` button on the table. However, we can access the sidebar navigations via the `Menu` component in the `src/component` directory.

<div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/menu.png"  alt="Sidebar menu component" />
</div>

<br/>

When you create a Headless Refine application, a `Layout` component is automatically generated in the `src/components` directory. This component wraps the pages created by the inferencer and the `Menu` component, which contains the sidebar navigation.

<div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/layout.png"  alt="Layout component structure" />
</div>

<br/>

While the pages in the applications are automatically generate and are not editable, the `Layout` component provides some level of control over how the application is rendered to the browser.

We could simply clear out the `Layout` component and create a simple component that we can use to render an element for our examples. However, since the predefined pages generated by Refine simulate a real-world application, we have something close to what our examples may look like in an actual application.

## Creating a custom tooltip component

The structure of a tooltip is not as complex as it may seem. It consists of a single element that contains some text and is positioned absolutely to the anchor element ( element whose functionality is explained by the tooltip) or its parent element. When the anchor element is hovered or clicked, the opacity of the tooltip is increased.

If we were to create a custom tooltip for the sidebar navigation, the markup inside the `Menu` component would be structured as follows:

```html
<nav className="menu">
  <ul>
    {menuItems.map((item) => (
      <li key={item.key} className="tooltip_element">
        <NavLink to={item.route ?? "/"}>{item.label}</NavLink>
        <span className="tooltip">navigate to {item.label}</span>
      </li>
    ))}
  </ul>
</nav>;
```

What we did here is self-explanatory; we simply added a `span` element containing some text next to the navigation links.

And now for the styles:

```css
.tooltip_element {
  position: relative;
}

.tooltip {
  position: absolute;
  background-color: black;
  color: white;
  padding: 5px;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 1s;
  top: 0;
  left: 80px;
  width: max-content;
}

.tooltip_element:hover .tooltip {
  opacity: 1;
}
```

Here, we’re positioning the tooltip absolutely to the navigation links. initially, its opacity is set to `0`, and it becomes visible with an opacity of `1` only when the navigation links are hovered over. This is all that is needed to create a simple tooltip.

If you save your progress and go back to the browser, you should see something similar to the GIF below.

<div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/custom_tip.gif"  alt="Custom tooltip on sidebar links" />
</div>

<br/>

As of now, we have hardcoded the tooltip into our application, but this approach won't be practical for larger and more complex real-world applications. To make it scalable, we can create a separate component for the tooltip and pass the text and other properties such as color, position, and background color to it through props.

To implement this, create a new `tooltip` folder within the `src/component` directory of your project and then add a `index.tsx` file with the following code:

```tsx
import * as React from "react";

export interface ITooltipProps {
  position: string;
  message: string;
}

export function Tooltip({ message, position }: ITooltipProps) {
  return (
    <div>
      <span className={`tooltip tooltip-${position}`}>{message}</span>
    </div>
  );
}
```

In this code block, we’re basically doing the same thing as before within the `Menu` component, but now we're passing the content and a position class to the `span` element dynamically. The position class name will allow us to position the tooltip using the `top`, `right`, `bottom`, and `left` properties of the tooltip element. We'll need to create styles for each position that will be passed to the component:

```css
.tooltip-right {
  top: -5px;
  left: 105%;
}

.tooltip-left {
  top: -5px;
  right: 105%;
}

.tooltip-top {
  bottom: 105%;
  left: 0;
}

.tooltip-bottom {
  top: 105%;
  left: 0;
}
```

Now, If you import the tooltip component into the Menu component and pass the content and desired position as props, you should see a similar result when you view your application in the browser.

```tsx
import { useMenu } from "@refinedev/core";
import { NavLink } from "react-router-dom";
import { Tooltip } from "../tooltip";

export const Menu = () => {
  const { menuItems } = useMenu();

  return (
    <nav className="menu">
      <ul>
        {menuItems.map((item) => (
          <li key={item.key} className="tooltip_element">
            <NavLink to={item.route ?? "/"}>{item.label}</NavLink>
            <Tooltip message={`route to ${item.label}`} position="bottom" />
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

<br/>

<div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/custom_last.gif"  alt="Reusable tooltip component demo" />
</div>

<br/>

Our tooltip component is now ready for use throughout the application, however, it's missing some crucial features that would require significant time and effort to implement. For this reason, it is recommended to use a tooltip library like react-tooltip.

In the following sections, we will introduce and demonstrate how to integrate react-tooltip into our application.

## What is React-tooltip?

React tooltip is an open-source package for adding tooltips to react applications. It allows developers to create dynamic and engaging user interfaces by providing a simple and customizable approach to adding tooltips to any React component.

With react-tooltip, developers can easily control the content, appearance, and behavior of the tooltips in their applications. Overall, the package simplifies the process of implementing tooltips and saves time and effort for developers.

## Setting up React-tooltip

To incorporate react-tooltip into our application, we need to install the package first. Start by going to the terminal and executing the following command:

```
npm install react-tooltip
or
yarn add react-tooltip
```

Next, navigate to your project’s `index.tsx` file and add the following CSS import:

```tsx
import "react-tooltip/dist/react-tooltip.css";
```

This CSS file contains all the necessary styles react-tooltip needs to properly render tooltips in your application. It is crucial to include this file in the `index.tsx` or an equivalent top-level file; otherwise, the tooltip may not render correctly.

react-tooltip has been successfully incorporated, we can now leverage its features throughout our application. We'll explore how to do so efficiently in the following sections.

## Using React-tooltip

The `react-tooltip` package provides a `<Tooltip/>` component that can be bound to an anchor element and used to display element-specific information. There are two ways to bind the component to an anchor element:

- Using data attributes on elements
- Using the ReactTooltip component and props

**Using data attributes**
This method entails binding and defining the tooltip's content and position directly on anchor elements via specific data attributes, such as `data-tooltip-content`, `data-tooltip-place`, and `data-tooltip-id`.

The `data-tooltip-id` attribute is used to link the anchor element to the `<Tooltip/>` component. it is assigned an ID that corresponds to the ID on the anchor element. While the `data-tooltip-content` and `data-tooltip-place` are used to set the content and position of the tooltip, respectively.

To use this method in our application, we’ll start by importing the `<Tooltip/>` component into the `Menu` component and pass the content and position of the tooltip to the anchor element using the data attributes, as shown below:

```tsx
import { Tooltip } from "react-tooltip";

export const Menu = () => {
  const { menuItems } = useMenu();

  return (
    <nav className="menu">
      <ul>
        {menuItems.map((item) => (
          <li key={item.key} className="tooltip_element">
            <NavLink
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Hello world!"
              data-tooltip-place="top"
              to={item.route ?? "/"}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

Next, we will define the `<Tooltip>` component next to the anchor element and give it the same ID as the `data-tooltip-id` attribute on the navigation element:

```tsx
<li key={item.key} className="tooltip_element">
  <>
    <NavLink
      data-tooltip-id="my-tooltip"
      data-tooltip-content={`route to ${item.label}`}
      data-tooltip-place="top"
      to={item.route ?? "/"}
    >
      {item.label}
    </NavLink>
    <Tooltip id="my-tooltip" />
  </>
</li>
```

This will bind the `<Tooltip/>` component to the navigations and display the specified content when they are hovered on.

<br/>

<div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/rtt-first.gif"  alt="react-tooltip with data attributes" />
</div>

<br/>

## Using React Tooltip component

In contrast to the previous method, this technique employs CSS selectors to bind the anchor element with the tooltip component instead of relying on data attributes. The tooltip component’s content is assigned to it as children, while other properties such as `place` and `delay` are defined using props.

```tsx
<li key={item.key} className="tooltip_element">
  <>
    <NavLink className="my-tooltip" to={item.route ?? "/"}>
      {item.label}
    </NavLink>
    <Tooltip anchorSelect=".my-tooltip" place="left">
      route to {item.label}
    </Tooltip>
  </>
</li>
```

The `anchorSelect` property takes a string that matches the CSS selector provided on the anchor element. Its function is to locate anchor elements with matching selectors and attach the tooltip to them.

Notice that the `anchorSelect` property is prefixed with a dot, which is necessary because it accepts valid CSS selectors. If we were to set an ID on the anchor element instead, we would use a hash to begin the selector.

```tsx
<li key={item.key} className="tooltip_element">
  <>
    <NavLink className="my-tooltip" to={item.route ?? "/"}>
      {item.label}
    </NavLink>
    <Tooltip anchorSelect=".my-tooltip" place="left">
      route to {item.label}
    </Tooltip>
  </>
</li>
```

The tooltip will render on the browser just the same.

<br/>

<div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/using_rtt2.gif"  alt="react-tooltip with anchorSelect" />
</div>

<br/>

## Positioning

Throughout this article, we've consistently demonstrated how to use positioning in different examples, so you likely have a good understanding of how it works for both low-level and high-level implementations.

The `place` prop in the react-tooltip package is used to set the position of the tooltips and can be assigned one of four values that are similar to the position properties in CSS.

- `top`: This positions the tooltip at the top of the anchor element

<div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/positioning-top.png"  alt="Tooltip positioned at top" />
</div>

<br/>

- `right`: This positions the tooltip on the right side of the anchor element

<div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/positioning-right.png"  alt="Tooltip positioned at right" />
</div>

<br/>

- `bottom`: This positions the tooltip at the top of the anchor element

<div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/positioning-bottom.png"  alt="Tooltip positioned at bottom" />
</div>

<br/>

- `left`: This positions the tooltip on the left side of the anchor element

<div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/positioning_left.png"  alt="Tooltip positioned at left" />
</div>

<br/>

You may be curious about why the tooltip is appearing on the right of the anchor element rather than the left. This leads us to another useful feature of react-tooltip: responsiveness. By default, react-tooltip adjusts itself to fit your design, regardless of limitations. In this scenario, there is no more space left on the left side of the navigation area. Therefore, react-tooltip is rendering the tooltip on the right side instead of the left.

## Delay

Now that we understand how react-tooltip works and the various ways you could integrate it into your project, let's take a look at some of its standout features. Beginning with Delays, this feature enables you to introduce a delay before the tooltip appears or disappears when the anchor element is hovered over.

**tooltip-delay-show**
The `tooltip-delay-show` attribute adds a delay before the tooltip appears when an anchor element is hovered on. It requires a number value in milliseconds to specify the duration of the delay.

```tsx
<li key={item.key} className="tooltip_element">
  <>
    <NavLink
      data-tooltip-id="my-tooltip"
      data-tooltip-content={`route to ${item.label}`}
      data-tooltip-place="top"
      data-tooltip-delay-show={1000}
      to={item.route ?? "/"}
    >
      {item.label}
    </NavLink>
    <Tooltip id="my-tooltip" />
  </>
</li>
```

<br/>

<div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/delay_show.gif"  alt="Tooltip delay show example" />
</div>

<br/>

**tooltip-delay-hide**
This attribute does the opposite of the former, as it adds a delay to when the tooltip disappears from the screen after the mouse leaves the anchor element.

```tsx
<li key={item.key} className="tooltip_element">
  <>
    <NavLink
      data-tooltip-id="my-tooltip"
      data-tooltip-content={`route to ${item.label}`}
      data-tooltip-place="top"
      data-tooltip-delay-hide={1000}
      to={item.route ?? "/"}
    >
      {item.label}
    </NavLink>
    <Tooltip id="my-tooltip" />
  </>
</li>
```

<br/>

<div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/delay_hide.gif"  alt="Tooltip delay hide example" />
</div>

<br/>

## Clickable tooltip

react-tooltip also provides a feature that allows you to create clickable tooltips. This is useful if you need to include a button or link that takes the user to a page with detailed information related to the content displayed in the tooltip.

```tsx
<li key={item.key} className="tooltip_element">
  <>
    <NavLink id="my-tooltip" to={item.route ?? "/"}>
      {item.label}
    </NavLink>
    <Tooltip anchorSelect="#my-tooltip" place="right" clickable>
      route to {item.label}
      <br />
      <button
        onClick={() => alert(`This link routes to the ${item.label} page`)}
      >
        learn more
      </button>
    </Tooltip>
  </>
</li>
```

<div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-23-react-tooltip/clickable.avif"  alt="Clickable tooltip example" />
</div>

<br/>

## Bonus: Accessibility Improvements for Custom Tooltips

I have been giving some thought to a few improvements that might help make our React application more accessible. Increasing accessibility will mean that the app is much more user-friendly and considerate, more especially to those users who might have a disability. Here are some ideas with simple examples in code.

### Keyboard Navigation

Keyboard navigation enables the user to get into the application with only their keyboard. You would need a focus management strategy for tooltips too. Perhaps there will be an instance when it will be okay for screen readers to access these tooltips, with the right ARIA roles and properties.

```jsx
const Tooltip = ({ message, position }) => (
  <div role="tooltip" aria-label={message} tabIndex="0">
    <span className={`tooltip tooltip-${position}`}>{message}</span>
  </div>
);

const Menu = () => {
  const { menuItems } = useMenu();

  return (
    <nav className="menu">
      <ul>
        {menuItems.map((item) => (
          <li key={item.key} className="tooltip_element">
            <NavLink to={item.route ?? "/"} tabIndex="0">
              {item.label}
            </NavLink>
            <Tooltip message={`route to ${item.label}`} position="bottom" />
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

### Screen Reader Support

Add support for screen readers so the content within the tooltips is clear, but without overwhelming visual users with masses of unnecessary content. This could potentially be implemented using live regions in order to communicate dynamic content changes to screen readers.

```jsx
const Tooltip = ({ message, position }) => (
  <div role="tooltip" aria-live="polite" tabIndex="0">
    <span className={`tooltip tooltip-${position}`}>{message}</span>
  </div>
);

const Menu = () => {
  const { menuItems } = useMenu();

  return (
    <nav className="menu" aria-label="Main Navigation">
      <ul>
        {menuItems.map((item) => (
          <li key={item.key} className="tooltip_element">
            <NavLink
              to={item.route ?? "/"}
              aria-describedby={`tooltip-${item.key}`}
              tabIndex="0"
            >
              {item.label}
            </NavLink>
            <Tooltip
              id={`tooltip-${item.key}`}
              message={`route to ${item.label}`}
              position="bottom"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

## Performance Optimization for Custom Tooltips

In this section, you will find some thoughts and examples of code that enhance our tooltips for greater efficiency and performance:

### Lazy Loading Tooltips

Lazy loading can have an improvement in performance. Loading tooltips only when needed will surely be useful for those with lots of content.

**Example Code:**

```jsx
// Lazy loading Tooltip component using React.lazy
const LazyTooltip = React.lazy(() => import("./Tooltip"));

// Usage example with React.Suspense
const Menu = () => {
  const { menuItems } = useMenu();

  return (
    <nav className="menu">
      <ul>
        {menuItems.map((item) => (
          <li key={item.key} className="tooltip_element">
            <NavLink to={item.route ?? "/"}>{item.label}</NavLink>
            <React.Suspense fallback={<div>Loading...</div>}>
              <LazyTooltip
                message={`route to ${item.label}`}
                position="bottom"
              />
            </React.Suspense>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

### Reducing Re-rend

Minimizing unnecessary re-renders in React will maximize its performance. We can leverage memoization techniques into the `React.memo`, `useCallback`, and `use.

**Code Example:**

```jsx
// Memoizing Tooltip component
const Tooltip = React.memo(({ message, position }) => (
  <div role="tooltip" aria-label={message} tabIndex="0">
    <span className={`tooltip tooltip-${position}`}>{message}</span>
  </div>
));

// Using useCallback to memoize event handlers
const MenuItem = React.memo(({ item }) => {
  const handleMouseEnter = useCallback(() => {
    // handle mouse enter
  }, []);

  const handleMouseLeave = useCallback(() => {
    // handle mouse leave
  }, []);

  return (
    <li
      key={item.key}
      className="tooltip_element"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink to={item.route ?? "/"}>{item.label}</NavLink>
      <Tooltip message={`route to ${item.label}`} position="bottom" />
    </li>
  );
});

// Menu component
const Menu = () => {
  const { menuItems } = useMenu();

  return (
    <nav className="menu">
      <ul>
        {menuItems.map((item) => (
          <MenuItem key={item.key} item={item} />
        ))}
      </ul>
    </nav>
  );
};
```

## Conclusion

In this article, we covered the steps involved in creating and implementing a custom tooltip in a React application, and highlighted the challenges of building a comprehensive tooltip component from scratch. We then introduced react-tooltip and explored various methods of integrating the package into a React application.

There are many more features available in react-tooltip than what we covered in this article. I would suggest visiting the documentation and exploring the many capabilities of the package.
