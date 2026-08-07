---
title: Tailwind Animations with Examples
description: Understanding the cleanup function of the useEffect hook in React. Learn how to clean up side effects in React components to prevent memory leaks and improve performance.
slug: tailwind-animations
authors: peter_osah
category: "Ecosystem / Integrations"
tags: [tailwind, css]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-25-tailwind-animations/social.png
hide_table_of_contents: false
last_update: 2024-11-05
---

**This article was last updated on November 5, 2024 to include performance optimization tips and mobile-responsive techniques for improved animation handling in Tailwind CSS.**

## Introduction

`TailwindCSS` is a widely used, utility-first `CSS` framework that enables developers to easily create modern, responsive, and visually appealing user interfaces. Tailwind’s utility-first approach makes it easy to create `CSS` animations. This article will illustrate how to use `TailwindCSS` to add beautiful and complicated animations to your websites or applications.

## Built-in utility classes in Tailwind for animating elements

Tailwind provides built-in utility classes for an array of animations that can be added to elements.

### animate-none

This utility class applies no animation to an element. It assures that the element is not affected by animation, even if it is contained in a parent element with an animation class.

**Markup**:

```html
<div className="animate-none bg-blue-500 p-5">
  <h3>Animation here</h3>
</div>
```

### animate-spin

This utility class Adds a linear spin animation to element. It can be useful on elements such as loading indicators.

**Markup**:

```html
<div class="flex justify-center">
  <svg class="animate-spin">
    <!-- ... -->
  </svg>
</div>
```

**View**:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-25-tailwind-animations/2-min.gif" alt="Spin animation demo" />
</div>

### animate-ping

This utility class causes an element to scale and fade, much like a radar ping or a ripple in the sea. It can be beneficial on items that function as notification indications or attention-grabbing elements.

**Markup**:

```html
<div class="flex justify-center">
  <span class="relative flex h-16 w-16">
    <span
      class="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"
    ></span>
    <span
      class="relative inline-flex h-16 w-16 rounded-full bg-blue-500"
    ></span>
  </span>
</div>
```

**View**:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-25-tailwind-animations/3-min.gif" alt="Ping ripple animation demo" />
</div>

### animate-pulse

This utility class makes an element fade in and out gradually – This class is handy for things like skeleton loaders.

**Markup**:

```html
<div class="flex justify-center">
  <div class="h-16 w-16 animate-pulse rounded-full bg-blue-400"></div>
</div>
```

**View**:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-25-tailwind-animations/4-min.gif" alt="Pulse animation demo" />
</div>

## animate-bounce

This utility class adds a bounce animation to an element. It is useful for elements like scroll indicators.

**Markup**:

```html
<div class="flex justify-center">
  <div class="h-16 w-16 animate-bounce rounded-full bg-blue-500"></div>
</div>
```

**View**:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-25-tailwind-animations/5-min.gif" alt="Bounce animation demo" />
</div>

## Create custom animations in Tailwind:

Tailwind allows us to easily construct custom animations that are not provided as built-in utility classes.
All we need to do is define your animation's keyframes in the `tailwind.config.js` file and expand the theme setup to create a new animation.

We will illustrate this with a simple animation on the Refine logo as shown below:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-25-tailwind-animations/6-min.gif" alt="Refine logo custom animation" />
</div>

### Add keyframes to the Tailwind config file.

We will open the `tailwind.config.js` file in the root directory of the project and add an empty keyframes object to the `theme.extend` object. Now, inside this keyframes object, we'll add and specify our new slide animation as shown below.

```tsx
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        refine: {
          "0%": {
            left: "0%",
          },
          "20%": {
            left: "-50%",
          },
          "40%": {
            left: "0%",
          },
          "60%": {
            left: "50%",
          },
          "80%": {
            left: "0%",
          },
          "100%": {
            left: "0%",
          },
        },
      },
    },
  },
  plugins: [],
};
```

### Extend animation in the Tailwind config file.

After adding the values to our keyframes object in the `tailwind.config.js` file, we create a custom animation that uses this keyframe. We will add this animation name to a new `animation` object inside the `theme.extend` object as shown below:

```tsx
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        refine: {
          "0%": {
            left: "0%",
          },
          "20%": {
            left: "-50%",
          },
          "40%": {
            left: "0%",
          },
          "60%": {
            left: "50%",
          },
          "80%": {
            left: "0%",
          },
          "100%": {
            left: "0%",
          },
        },
      },
      animation: {
        "refine-slide": "refine 2s infinite",
      },
    },
  },
  plugins: [],
};
```

Next, we add the animation to the markup. To define a custom animation utility class in markup, use the format `animate-[nameOfAnimation]`. In our example, the name of the custom animation we added to the `tailwind.config.js` file is `refine-slide`, but when we specify the animation utility class in our 'HTML' markup, it is `animate-refine-slide`.

**Markup**:

```html
<div class="flex justify-center">
  <img
    class="animate-refine-slide relative h-16 w-16"
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRixkXz-MD-PkV6BOiGL5SAkJi9XGAyE9lLLQ&usqp=CAU"
    alt="Animated logo"
  />
</div>
```

**View**:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-25-tailwind-animations/7-min.gif" alt="Sliding logo animation preview" />
</div>

## Improving Mobile-Friendliness in Tailwind Animations

I wanted to share some thoughts on optimizing Tailwind animations for mobile since it seems that getting animations to work smoothly on smaller screens can be a challenge. Mobile devices often have different performance needs, so these adjustments will help keep animations looking great without impacting load times or battery life.

### Keep Animations Simple and Lightweight

Complex animations can strain mobile resources. Stick with simpler ones like `animate-fade` or `animate-bounce`, as they’re lightweight and fast. Also, avoid running multiple animations at once, as it can slow down performance on low-end devices.

```html
<div class="h-16 w-16 animate-bounce bg-blue-500"></div>
<!-- Lightweight animation -->
```

### Use Media Queries to Control Animation on Mobile

With Tailwind’s responsive utilities, you can leverage media queries to control when and where animations run. For example, you may want certain animations only on larger screens:

```html
<div class="h-16 w-16 bg-green-500 sm:animate-none lg:animate-ping"></div>
```

In this case, the ping animation runs only on screens larger than 1024px, while the element remains static on mobile devices.

### Shorten Animation Duration on Mobile

Animations generally look better shorter on mobile, where users expect faster transitions. Adjust the duration for smaller screens using Tailwind’s duration utilities:

```html
<div
  class="h-16 w-16 animate-pulse bg-red-500 duration-500 md:duration-1000"
></div>
```

Here, the animation duration is set to 500ms on mobile and 1000ms on medium and larger screens.

### Optimize Performance with GPU-Friendly Transitions

To ensure smoother performance on mobile, use GPU-friendly transitions like transform and opacity. These animations are easier for devices to process:

```html
<div
  class="scale-105 transform transition-transform duration-300 hover:scale-110"
></div>
```

Using transform can help avoid layout shifts, which are more resource-intensive on mobile.

These tweaks should help Tailwind animations feel smooth and responsive on mobile screens.

## Animate elements using arbitrary values in Tailwind.

In some cases, you may want to create an animation that will only be used once in your application. Rather than extending your animations in your `Tailwind.config.js` file, `Tailwind` offers a better option in such scenarios by using arbitrary values. To use them, place the animation properties, separated by underscores, between a pair of square brackets following the animate keyword in the markup, as shown below:

```tsx
animate -
  [
    animationName_easingFunction_durationInSeconds_iterationsCount_delayInSeconds_direction,
  ];
```

For example, if you want to create a one-off "wiggle" animation, you can declare the animation keyframes in your `CSS` file, then proceed to the markup and declare the animation as an arbitrary value as shown below:

**keyframe in `CSS` File**:

```css
@keyframes wiggle {
  0% {
    transform: skewX(9deg);
  }
  10% {
    transform: skewX(-8deg);
  }
  20% {
    transform: skewX(7deg);
  }
  30% {
    transform: skewX(-6deg);
  }
  40% {
    transform: skewX(5deg);
  }
  50% {
    transform: skewX(-4deg);
  }
  60% {
    transform: skewX(3deg);
  }
  70% {
    transform: skewX(-2deg);
  }
  80% {
    transform: skewX(1deg);
  }
  90% {
    transform: skewX(0deg);
  }
  100% {
    transform: skewX(0deg);
  }
}
```

**Markup**:

```html
<div class="flex justify-center">
  <div
    class="h-16 w-16 animate-[wiggle_1s_ease-in-out_infinite] rounded-full bg-blue-500"
  ></div>
</div>
```

**View**:

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-25-tailwind-animations/8-min.gif" alt="Wiggle animation demo" />
</div>

## Making Tailwind Dance with JavaScript for Interactive Animations

I wanted to share with you some tips on how to combine Tailwind with JavaScript to make animations more dynamic. This is especially useful if you want animations to respond to user interactions like clicks or scrolls. Here's a quick guide on setting up dynamic animations.

### JavaScript Toggle Animations

Easily manage Tailwind's utility animations dynamically using JavaScript by adding or removing classes. For example, you may want to start an animation when a user clicks a button:

```html
<button onclick="toggleAnimation()">Animate Box</button>
<div id="box" class="h-16 w-16 bg-blue-500"></div>

<script>
  function toggleAnimation() {
    const box = document.getElementById("box");
    box.classList.toggle("animate-bounce"); // Toggle the bounce animation
  }
</script>
```

In this example, each button click will start or stop the bounce animation on the box element.

### Animation Triggers on Scroll

You can also use JavaScript to trigger animations based on the scroll position. For instance, animations can start when elements scroll into view:

```tsx
window.addEventListener("scroll", () => {
  const element = document.getElementById("animate-on-scroll");
  if (element.getBoundingClientRect().top < window.innerHeight) {
    element.classList.add("animate-fade-in");
  }
});
```

This will apply the animate-fade-in class when the element enters the viewport, making it fade in as the user scrolls down.

### Conditional Animations with JavaScript

Using JavaScript, you can add animations conditionally, such as after a form validates successfully:

```tsx
function animateOnSuccess(isValid) {
  const icon = document.getElementById("success-icon");
  if (isValid) {
    icon.classList.add("animate-ping");
  } else {
    icon.classList.remove("animate-ping");
  }
}
```

The example above adds a ping animation to an icon when a condition, like successful form validation, is met.

Using JavaScript alongside Tailwind gives you the flexibility to control animations based on user interactions, which can make the experience feel more interactive and natural.

## Conclusion

In this article, We took a dive into `Tailwind` built-in utility classes for animation as well as how to use `Tailwind` CSS's theme configuration feature to add custom animations. We also learned how to create one-off animations with `Tailwind` arbitrary values.
Tailwind is an excellent `CSS` framework, and its utility-first approach, combined with its theme extension features, makes it popular among developers.
