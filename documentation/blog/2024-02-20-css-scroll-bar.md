---
title: How to Hide Scrollbar Using CSS?
description: We'll demonstrate how to hide scrollbars using CSS.
slug: css-hide-scrollbar
authors: peter_osah
category: "Tutorials"
tags: [css]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-20-css-scroll-bar/social.png
hide_table_of_contents: false
last_update: 2024-03-05
---

## Introduction

A scrollbar is a GUI element that appears on the right side (or bottom corner) of a webpage or web application to let users navigate a page or an element up and down (and also left and right) without taking their hands off the keyboard or trackpad. However, the default scrollbar may appear bland and out of place, diminishing the overall aesthetics of the webpage or web application.

With the help of new `CSS` attributes, scrollbars can now be styled and hidden without affecting the user's ability to scroll. In this article, we will demonstrate how to hide the scrollbar in most web browsers using `CSS`.

## CSS properties to hide element scrollbars

- The `CSS` property `overflow: hidden` is used to hide the vertical and horizontal scrollbar on an element. However, This property also affects the element's ability to scroll on its vertical and horizontal axis.
- The `CSS` property `overflow-y: hidden` is used to hide the vertical scrollbar on an element. This property also affects the element's ability to scroll on its vertical axis.
- The `CSS` property `overflow-x: hidden` is used to hide the horizontal scrollbar on an element. This property also affects the element's ability to scroll on its horizontal axis.
- You can hide a scrollbar on an element while being given the ability to scroll, through the following:
  - A pseudo selector `::-webkit-scrollbar`, which is only supported for webkit browsers. In the pseudo selector, you can define the `display: none` property which would hide the scrollbar on the element but retain its scrolling function.
  - The `-ms-overflow-style: none` property which is only supported for for Edge and other legacy browsers like IE.
  - The `scrollbar-width: none` property which is supported by Firefox.

## Hide scrollbars on specific elements

We will demonstrate how to hide scrollbars using the CSS attributes mentioned earlier.

Below is a codepen example that shows how to hide an element's scrollbar without affecting its ability to scroll.

In this example, we used the `::-webkit-scrollbar` pseudo-selector to hide the scrollbar on the element with a class `scroll-container` while maintaining its functionality.

```css
.scroll-container::-webkit-scrollbar {
  display: none;
}
```

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="CSS HIDE SCROLLBAR USING WEBKIT-SCROLLBAR PSEUDO ELEMENT" src="https://codepen.io/Necati-zmen/embed/VwRNmWO?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/VwRNmWO">
  CSS HIDE SCROLLBAR USING WEBKIT-SCROLLBAR PSEUDO ELEMENT</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Another example is using the property `overflow: hidden` to hide the scrollbar. However, as shown on the codepen, it affects the element's ability to scroll.

The `overflow: hidden` property is applied on the element with class `scroll-container` with a `max-height: 350px`.

```css
.scroll-container {
  background: white;
  padding: 2em;
  margin: auto;
  max-width: 450px;
  max-height: 350px;
  /* This displays hides the scrollbar on the element, however, it affects its scrolling function */
  overflow: hidden;
}
```

<iframe height="300" style={{ width: "100%" }}  scrolling="no" title="CSS HIDE SCROLLBAR USING OVERFLOW:HIDDEN PROPERTY" src="https://codepen.io/Necati-zmen/embed/abMxBpj?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/abMxBpj">
  CSS HIDE SCROLLBAR USING OVERFLOW:HIDDEN PROPERTY</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## CSS properties to hide browser scrollbars

- The pseudo selector `-webkit-scrollbar` can also be used to target browser scrollbars in all WebKit-based browsers. However, while this method has been around for a while, it has yet to be standardized and is likely to become outdated once the new [scrollbar](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scrollbars_styling) characteristics provided by [MDN](https://developer.mozilla.org/en-US/) are fully implemented and supported in all browsers.

- The browser's scrollbar can be hidden when the `CSS` properties `overflow: hidden`, `overflow-y: hidden`, or `overflow-x: hidden` are added to the `body` element (the root element). Nonetheless, it is not recommended to apply them to the base `body` element since it may interfere with the browser's ability to scroll on that page.

## Hide scrollbars in Webkit browsers like Chrome, Safari, Edge, and Firefo

We will demonstrate how to hide browser scrollbars using the CSS properties mentioned earlier.

The codepen example that follows demonstrates how to conceal the browser's scrollbar without impairing its scrolling functionality.

In this example, we used the `::-webkit-scrollbar` pseudo-selector to hide the scrollbar on the `body` element while maintaining its functionality.

```css
body::-webkit-scrollbar {
  display: none;
}
```

<iframe height="300" style={{ width: "100%" }}  scrolling="no" title="CSS HIDE BROWSER SCROLLBAR USING WEBKIT-SCROLLBAR PSEUDO ELEMENT" src="https://codepen.io/Necati-zmen/embed/oNVOYpO?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/oNVOYpO">
  CSS HIDE BROWSER SCROLLBAR USING WEBKIT-SCROLLBAR PSEUDO ELEMENT</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<br/> <br/>

Another option is to conceal the scrollbar by using the `CSS` property: `overflow: hidden`. Nevertheless, it has an impact on the browser's scrolling capability (which is not advisable) on that page, as seen on the codepen.

The `overflow: hidden` property is applied to the `body` element.

```css
body {
  border: 10px solid orange;
  margin: auto;
  max-width: 600px;
  font: 1em / 1.4 sans-serif;
  padding: 2em;
  display: grid;
  place-items: center;
  background: white;
  /* This displays hides the scrollbar on the browser, however, it affects its scrolling function */
  overflow: hidden;
}
```

<iframe height="300" style={{ width: "100%" }}  scrolling="no" title="CSS HIDE BROWSER SCROLLBAR USING OVERFLOW ATTRIBUTES" src="https://codepen.io/Necati-zmen/embed/rNRbWwd?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/rNRbWwd">
  CSS HIDE BROWSER SCROLLBAR USING OVERFLOW ATTRIBUTES</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Conclusion

In this article, we explained how to hide scrollbars at the element and page levels using CSS. Scrollbars should be hidden for certain UI and aesthetic reasons, but it's crucial to remember that accessibility is improved when scrollbars are displayed in scrollable sections because they make it easier for users to find and navigate content.
