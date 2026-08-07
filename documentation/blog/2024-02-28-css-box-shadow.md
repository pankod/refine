---
title: CSS Box Shadow with 25 Examples
description: We'll explore the CSS `box-shadow` property.
slug: box-shadow-css
authors: joseph_mawa
category: "Tutorials"
tags: [css]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-28-css-shadows/social.png
hide_table_of_contents: false
---

## Introduction

You can use the CSS `box-shadow` property to add one or more box shadow effects to an element. Box shadows come in handy when you're looking to create aesthetically pleasing and enriching UI.

You can use them to create contrast between an element and its immediate surroundings. Therefore, emphasizing the importance of an element in the UI.

Similarly, it's not uncommon to use box shadows to indicate an element's interactivity by raising them during the hover state.

In this article, we will explore the CSS `box-shadow` property. We'll also go above and beyond to highlight the commonest box shadow examples. Hopefully, the examples will inspire you in your next project.

What we'll cover:

- [What is CSS Box Shadow](#what-is-css-box-shadow)
  - [Box shadow horizontal and vertical offsets](#box-shadow-horizontal-and-vertical-offsets)
  - [Box shadow blur radius](#box-shadow-blur-radius)
  - [Box shadow spread radius](#box-shadow-spread-radius)
  - [Box shadow color](#box-shadow-color)
  - [The `inset` keyword](#the-inset-keyword)
- [How to create CSS Box Shadow](#how-to-create-css-box-shadow)
- [CSS Box Shadow examples](#css-box-shadow-examples)

## What is CSS Box Shadow

As its name suggests, the CSS `box-shadow` property adds one or more shadow effects to an HTML element. You can use CSS box shadow to flexibly enhance the visual design of your application and provide an enriching user experience.

A typical CSS box shadow usually consists of 2-4 CSS lengths, an optional CSS color, and an optional `inset` keyword. You can use the `box-shadow` property to apply one or more CSS box shadows to an element like so:

```txt
.box {
  box-shadow: 2px 3px 2px 1px rgb(0, 0, 34, 0.3) inset;
               |   |   |   |   |                  |
               |   |   |   |   |                  |
               |   |   |   |   |                  inset key word
               |   |   |   |   color
               |   |   |   spread radius
               |   |   blur radius
               |   vertical offset(y-offset)
               horizontal offset(x-offset)
}
```

The example above has four CSS length values, CSS color, and the `inset` keyword. Though we have set four length values, only two are required. The rest are optional. We'll explore each of them in the sub-sections below.

### Box shadow horizontal and vertical offsets

As explained above, you can specify a box shadow using 2-4 CSS length values. The first length value is the horizontal offset, and the second is the vertical offset. You can also refer to the horizontal and vertical offsets as the X and Y offsets, respectively.

Both horizontal and vertical offsets can take positive or negative values. A positive horizontal offset will draw a shadow effect that is offset to the right of the element. A negative horizontal offset will draw it to the left.

On the other hand, a positive vertical offset will offset the shadow down, and a negative one will offset it up.

### Box shadow blur radius

The third length value in a box shadow is the blur radius. The blur radius should either be zero or a positive CSS length value. A negative value is invalid.

The box shadow will have sharp edges if the blur radius is zero. The edges become more blurred as you increase the blur radius. The blur radius is an optional value. You can omit it if you don't need a blur effect on the box shadow.

### Box shadow spread radius

The fourth length value in a box shadow is the spread radius. It takes both positive and negative values.

A positive blur radius will cause the shadow effect to expand in all directions by the specified radius. On the other hand, a negative value will cause it to contract. If you set its value to zero, the box shadow will have the same size as the element.

Similar to the blur radius, the spread radius is optional. It defaults to zero if you omit the spread radius.

### Box shadow color

As its name suggests, the box shadow color specifies the color of the shadow. It's optional. If you omit it, the shadow color defaults to `currentColor`.

### The `inset` keyword

You can use the optional `inset` keyword to change the shadow from an outer box shadow to an inner box shadow. With an inner box shadow, the shadow is enclosed within the element's border.

## How to create CSS Box Shadow

You can create a box shadow by selecting the element using a valid CSS selector and using the `box-shadow` property to apply the box shadow effect, as in the example below. Be aware that the blur radius, spread radius, color, and the `inset` keyword are optional.

```css
.box {
  box-shadow: 2px 3px 2px 1px rgb(0, 0, 34, 0.3) inset;
}
```

To apply multiple box shadow effects to the same element, you need to separate them with commas like so:

```css
.box {
  box-shadow: 24px 24px 6px 20px rgba(0, 0, 0, 0.4), 12px 12px 0px 8px rgba(
        0,
        0,
        0,
        0.4
      ) inset;
}
```

For comma-separated shadow effects, the first shadow appears in front, and the others appear behind in the order you declare them.

If you apply a border radius to your element, the box shadow will have circular corners.

There are several online interactive tools, such as Mozilla's [Box-shadow generator](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_backgrounds_and_borders/Box-shadow_generator) that you can use to generate CSS box shadow effects. They come in handy if you're unsure of the box shadow styling.

Though you may not be highly skilled in CSS, you can experiment with the interactive tool before picking a shadow effect suitable for your styling and branding.

## CSS Box Shadow examples

In this section, we will explore CSS Box shadow examples. Some of them are used by the most popular brands. You can copy and tweak them or use them in your next project.

**Example 1**

In the example below, we are applying two box shadows separated by commas. The first shadow effect has y-offset of `1px` and blur radius of `2px`. The x-offset and spread radius are both zero. The second box shadow has positive length values except the x-offset. Its value is zero.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0px 1px 2px 0px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
}
```

You can play with the code above in the codepen below.

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="example 1" src="https://codepen.io/Necati-zmen/embed/rNbBQQp?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/rNbBQQp">
  example 1</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

**Example 2**

In the example below, all the box shadow length values are zero except the spread radius. It doesn't have the `inset` keyword. Therefore, you will have an outer box shadow. We have also set the color for the box shadow to black with an alpha value of 0.05.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.05);
}
```

You can play with the box shadow above in the codepen below.

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="example 2" src="https://codepen.io/Necati-zmen/embed/GRLKwPK?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/GRLKwPK">
  example 2</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

**Example 3**

The example below has two box shadow effects separated by commas. Both of them have positive y-offset and blur radius. Both shadow effects will have black color with opacity of `0.12`.

Both shadow effects don't have the `inset` keyword. Therefore, you will have an outer box shadow.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12);
}
```

You can tweak the above shadow effects in the codepen below.

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="example 3" src="https://codepen.io/Necati-zmen/embed/QWPLJzG?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/QWPLJzG">
  example 3</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
 **Example 4**

In the shadow effect below, we have two box shadows separated by a comma. Both shadows have black color with an alpha value of `0.1`. However the second has a negative spread radius. Therefore it will cause the second shadow effect to shrink.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
}
```

You can tweak the box-shadow above in the codepen below.

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="example 4" src="https://codepen.io/Necati-zmen/embed/xxeKQma?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/xxeKQma">
  example 4</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

**Example 5**

Unlike the previous examples, the code below will create an inner box shadow because of the `inset` keyword and it has a positive x-offset.

The background color will be black with an alpha value of `0.05`.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05) inset;
}
```

You can play with the above shadow effect in the codepen below.

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="example 5" src="https://codepen.io/Necati-zmen/embed/PogYxVq?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/PogYxVq">
  example 5</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

**Example 6**

Unlike the previous example, the shadow effect below has two box shadows separated by a comma. Both of them have black color with alpha values of `0.13` and `0.11` respectively.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.13), 0 1px 1px 0 rgba(0, 0, 0, 0.11);
}
```

You can play with the shadow effect above in the codepen below.

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="example 6" src="https://codepen.io/Necati-zmen/embed/NWmKEoR?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/NWmKEoR">
  example 6</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

**Example 7**

The shadow effects example below is similar to the previous one. However, both shadow effects have larger y-offset and blur radius than the previous example.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0 26px 58px 0 rgba(0, 0, 0, 0.22), 0 5px 14px 0 rgba(0, 0, 0, 0.18);
}
```

You can see what the above effect looks like in the codepen below.

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="example 7" src="https://codepen.io/Necati-zmen/embed/KKYPrJm?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/KKYPrJm">
  example 7</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

**Example 8**

The box-shadow below is also similar to the previous one. However, instead of having a dark box-shadow, we have a lighter color with an alpha value of `0.15`. You can increase the alpha value to make the shadow effect more noticeable.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0px 3px 6px 0px rgba(140, 149, 159, 0.15);
}
```

Below is the codepen for the code above. You can tweak the box shadow by modifying the length or the RGBa values.

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="example 8" src="https://codepen.io/Necati-zmen/embed/qBwWQgQ?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/qBwWQgQ">
  example 8</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

**Example 9**

The code below creates another box shadow similar to the previous one but with larger y-offset and blur radius. The color of the box shadow is black with an alpha value of `0.2`.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.2);
}
```

You can tweak the code above in the codepen below.

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="example 9" src="https://codepen.io/nibble0101/embed/ExJYLLz?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/nibble0101/pen/ExJYLLz">
  example 9</a> by Joseph Mawa (<a href="https://codepen.io/nibble0101">@nibble0101</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

**Example 10**

The example below sets the x-offset, y-offset, and blur radius to `2px`. It also sets the box shadow to black with an alpha value of `0.15`. Because it doesn't have the `inset` keyword, the element will have an outer shadow effect.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
}
```

You can tweak the above shadow effect in the codepen below.

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="example 10" src="https://codepen.io/Necati-zmen/embed/RwObqvX?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/RwObqvX">
  example 10</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

**Example 11**

The example below has three box shadows separated by commas. Unlike the previous examples, all the three shadow effects are inner box shadows because of the `inset` keyword.

The first and last box shadows have dark color with alpha values of `0.25`. The second has a white color with an alpha value of `0.9`.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0 0 35px 5px rgba(0, 0, 0, 0.25) inset, 0 2px 1px 1px rgba(
        255,
        255,
        255,
        0.9
      ) inset, 0 -2px 1px rgba(0, 0, 0, 0.25) inset;
}
```

The image below shows what the above box shadow will look like.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-28-css-shadows/11.png" alt="box shadow css" />
</div>

**Example 12**

The code below is similar to the previous one. However, it has four box shadows instead of three. The first two do not have the `inset` keyword. Therefore, they will form an outer box shadow. The last two have the `inset` keyword. They will create an inner box shadow.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: -15px -15px 15px rgba(255, 255, 255, 0.2), 15px 15px 15px rgba(0, 0, 0, 0.1),
    -5px -5px 5px rgba(255, 255, 255, 0.2) inset, 5px 5px 5px rgba(
        0,
        0,
        0,
        0.1
      ) inset;
}
```

The code above will create a shadow effect that will look like the image below.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-28-css-shadows/12.png" alt="box shadow css" />
</div>

**Example 13**

The code below will apply inner box shadow to an element because of the `inset` keyword. In both shadow effects, the x-offset, y-offset, and blur radius have been set. In the second shadow effect, the x-offset and y-offset are both negative.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 2px 2px 10px rgba(255, 255, 255, 0.1) inset, -5px -8px 8px rgba(
        0,
        0,
        0,
        0.2
      ) inset;
}
```

The code above will create a box shadow that looks like the image below.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-28-css-shadows/13.png" alt="box shadow css" />
</div>

**Example 14**

The code below will create a box shadow similar to the previous example. However, instead of two, we have three box shadows separated by commas. The first two are outer box shadows while the last one is an inner box shadow.

You will notice some of the box shadow length values are negative while others are positive. You can play around with them to see their effect.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4), 0px 7px 13px -3px rgba(0, 0, 0, 0.3),
    0px -3px 0px rgba(0, 0, 0, 0.2) inset;
}
```

The code above will create a box shadow that looks like the image below.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-28-css-shadows/14.png" alt="box shadow css" />
</div>

**Example 15**

The example below applies multiple comma-separated box shadows to an element. The first box shadow has three length values while the second has four length values.

Both do not have the `inset` keyword. Therefore, it will create outer shadow effect.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25), 0px 0px 1px 1px rgba(9, 30, 66, 0.13);
}
```

The code above will create a box shadow that looks like the image below.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-28-css-shadows/15.png" alt="box shadow css" />
</div>
 **Example 16**

The code below will create outer box shadow similar to the previous example. However, there is a difference in the length values and the color of the box shadows. The box shadow created will look like a border.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16), 0px 0px 0px 3px rgba(51, 51, 51, 1);
}
```

The code above will create a box shadow similar to the image below.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-28-css-shadows/16.png" alt="box shadow css" />
</div>

**Example 17**

The code below is the most complicated example so far. There are sixteen box shadows separated by commas. Each box shadow has all the four length values and box shadow color without the `inset` keyword. Therefore, each one will be an outer box shadow. The box shadow has a dark color with an alpha value of `0.62`.

You can tweak the values to see their effect.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.62), 1px 0px 0px 0px rgba(0, 0, 0, 0.62),
    1px 2px 0px 0px rgba(0, 0, 0, 0.62), 2px 1px 0px 0px rgba(0, 0, 0, 0.62),
    2px 3px 0px 0px rgba(0, 0, 0, 0.62), 3px 2px 0px 0px rgba(0, 0, 0, 0.62),
    3px 4px 0px 0px rgba(0, 0, 0, 0.62), 4px 3px 0px 0px rgba(0, 0, 0, 0.62),
    4px 5px 0px 0px rgba(0, 0, 0, 0.62), 5px 4px 0px 0px rgba(0, 0, 0, 0.62),
    5px 6px 0px 0px rgba(0, 0, 0, 0.62), 6px 5px 0px 0px rgba(0, 0, 0, 0.62),
    6px 7px 0px 0px rgba(0, 0, 0, 0.62), 7px 6px 0px 0px rgba(0, 0, 0, 0.62),
    7px 8px 0px 0px rgba(0, 0, 0, 0.62), 8px 7px 0px 0px rgba(0, 0, 0, 0.62);
}
```

The code above will create a box shadow effect that looks like the image below.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-28-css-shadows/17.png" alt="box shadow css" />
</div>

**Example 18**

The code below resembles most of the examples highlighted above. The difference is primarily in the color of the box shadow and its opacity.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0 0 0 2px rgb(119, 64, 74), 8px 8px 0 0 rgb(119, 64, 74);
}
```

The code above will create a box shadow that looks like the image below.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-28-css-shadows/18.png" alt="box shadow css" />
</div>

**Example 19**

In the box shadow example below, we have an x-offset of `0px`, y-offset of `9px` and blur radius of `30px`. The color of the box shadow has an alpha value of `0.1`. Unlike the previous box shadow examples, the example below has a single box shadow.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0px 9px 30px rgba(229, 178, 107, 0.1);
}
```

The code above will generate a box shadow that looks like the image below.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-28-css-shadows/19.png" alt="box shadow css" />
</div>

**Example 20**

In the box shadow example below we have two box shadows separated by a comma. The first box shadow has positive value for the y-offset and blur radius but a negative value for the spread radius. In the second box radius all length values are zero except the spread radius.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0px 4px 8px -2px rgba(9, 30, 66, 0.25), 0px 0px 0px 1px rgba(9, 30, 66, 0.08);
}
```

The box shadow styles above will generate box shadow that looks like the image below.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-28-css-shadows/20.png" alt="box shadow css" />
</div>

**Example 21**

In the example below, we have an inner box shadow because of the `inset` keyword. The x-offset is zero, y-offset is negative, blur radius is `36px`, and a negative spread radius. The color of the box shadow is black with an alpha value of `0.35`.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0px -50px 36px -28px inset rgba(0, 0, 0, 0.35);
}
```

The code above will generate a box shadow which looks like the image below.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-28-css-shadows/21.png" alt="box shadow css" />
</div>

**Example 22**

The box shadow below has an x-offset of `0px`, y-offset of `22px`, blur radius of `70px`, and spread radius of `4px`. Given the length values, the box shadow will make the element appear raised.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0px 22px 70px 4px rgba(0, 0, 0, 0.56);
}
```

The code above will create a box shadow which looks like the image below.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-28-css-shadows/22.png" alt="box shadow css" />
</div>

**Example 23**

Similar to one of the previous examples, the code below will create an inner box shadow because of the `inset` keyword.

You will notice that the spread radius both take on negative values. The colors will also have opacities of `0.25` and `0.3` respectively.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0px 30px 60px -12px inset rgba(50, 50, 93, 0.25), 0px 18px
      36px -18px inset rgba(0, 0, 0, 0.3);
}
```

The styling above will create a box shadow which looks like the image below.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-28-css-shadows/23.png" alt="box shadow css" />
</div>

**Example 24**

The example below is similar to one of the box shadows we created above. All the length values are zero except the spread radius. It will create a shdow effect which looks like an element border.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0px 0px 0px 3px rgba(3, 102, 214, 0.3);
}
```

The styling above will create a box shadow which looks like the image below.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-28-css-shadows/24.png" alt="box shadow css" />
</div>

**Example 25**

The box shadow example below comprise of three box shadows separated by commas. The first two will create outer shadow effects while the last will create inner shadow effect because of the `inset` keyword.

```css
.box {
  width: 200px;
  height: 50px;
  box-shadow: 0px 50px 100px -20px rgba(50, 50, 93, 0.25), 0px 30px 60px -30px
      rgba(0, 0, 0, 0.3), 0px -2px 6px 0px inset rgba(10, 37, 64, 0.35);
}
```

The code above will create a box shadow which looks like the image below.

<div className="centered-image">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-02-28-css-shadows/25.png" alt="box shadow css" />
</div>

## Conclusion

As mentioned above, you can creatively use box shadows to provide a unique and enriching user experience. They come in handy if you want to add depth and dimension to some of your UI elements. You can also apply box shadows to draw attention to the most important elements of your UI.

To apply a box shadow, select an element using the CSS selectors and specify the required horizontal and vertical offsets as above. Optionally, specify the blur and spread radius, box shadow color, and the `inset` keyword.

To learn more about CSS box shadows, you can use free interactive box shadow generators such as Mozilla's online [Box-shadow generator](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_backgrounds_and_borders/Box-shadow_generator). They can simplify your work immensely.
