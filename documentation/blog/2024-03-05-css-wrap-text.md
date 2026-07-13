---
title: How do you wrap text content in CSS?
description: We'll look at the CSS features that allow us to wrap overflowing text in containers.
slug: css-text-wrap
authors: peter_osah
category: "Tutorials"
tags: [css]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-05-css-wrap-text/social.png
hide_table_of_contents: false
---

## Introduction

Text overflow happens when text does not fit completely within its container element. As a result, it goes outside of its boundaries, which might lead to broken layouts. However minor, this issue has been common among web developers. Fortunately, CSS has supplied certain CSS attributes that can control text-overflow. In this article, we'll look at the CSS features that allow us to wrap overflowing text in containers.

## How does content wrapping work in browsers?

Content (like words) are often wrapped at "**soft wrap opportunities**", which are places in content where you'd expect it to break naturally, like after a hyphen or in between words like with spaces or punctuation. When browsers and [user-agents](https://www.link-assistant.com/seo-wiki/user-agent/) notice soft text wrap opportunities, they wrap text to minimize content overflow.
Soft wrap opportunities vary between languages and it is determined by the language system that is being utilized in your HTML document (the value of the `lang` attribute that you supply on the `HTML` element or the default language).

## What's the distinction between a soft word wrap break and forceful line breaks?

A soft wrap break is any content wrap that takes place during a soft wrap opportunity. For this to happen, ensure that wrapping is enabled on the element (For example, setting the value of `white-space` `CSS` property to `nowrap` will disable wrapping therefore, ensure that the `white-space` `CSS` property is set to `normal`).

On the other hand, Forced line breaks are created by explicit line-breaking controls (line or new line breaking intentionally done using `CSS`) or line breaks (line breaks done directly on the `HTML` element) and not a soft wrap opportunity.

## Explore the values of the overflow-wrap property

The `overflow-wrap` `CSS` property was previously known as `word-wrap`. For legacy reasons, browsers see `word-wrap` as a legacy name alias for the `overflow-wrap` property.
This property determines whether the browser may break at disallowed points within a line to prevent overflow when an ordinarily unbreakable `string` is too long to fit within the line box.
In order or an element to set an `overflow-wrap` value, it should have a `white-space` property that is set to `normal` (which is the default for elements).

The following are the values of the `overflow-wrap` property:

### `normal`:

Using the `overflow-wrap: break-word` value causes the browser to utilize the system's default line-breaking behavior.

```css
.text {
  overflow-wrap: normal;
}
```

We will illustrate the use of `overflow-wrap: normal` value with a Codepen.

In the codepen example below, a word that is longer than its container appears in the text. The word overflows its container because there is no soft wrap opportunity(due to the presence of a very long word) and the `overflow-wrap`property value is set to `normal`.This is the system's default line-breaking behavior.

>

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="overflow-wrap-normal example" src="https://codepen.io/Necati-zmen/embed/ZEZGopL?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/ZEZGopL">
  overflow-wrap-normal example</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<br/><br/>

### `break-word`:

Using `overflow-wrap: break-word` value on text wraps an element allows text to only break words in mid-word if necessary. It will first try to maintain a word unbroken by moving it to the next line, but will subsequently break the word if there is still not enough space.

```css
.text {
  overflow-wrap: break-word;
}
```

We will illustrate the use of `overflow-wrap: break-word` value with a Codepen. in the example, the long word is wrapped to the next line due to the `overflow-wrap`property value set to `break-word`.

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="overflow-wrap-break-word-example" src="https://codepen.io/Necati-zmen/embed/zYXGjKd?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/zYXGjKd">
  overflow-wrap-break-word-example</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### `anywhere`:

The `overflow-wrap: anywhere` value which breaks words in the same way as the `overflow-wrap: break-word` property.

```css
.text {
  overflow-wrap: anywhere;
}
```

An example is illustrated on the Codepen below

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="overflow-wrap-anywhere-example" src="https://codepen.io/Necati-zmen/embed/mdgJLrv?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/mdgJLrv">
  overflow-wrap-anywhere-example</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<br/> <br/>

One thing to note is while the `overflow-wrap: break-word` value and the `overflow-wrap: anywhere` value breaks words in the same manner by default, The distinction lies in its impact on the elements `min-content` width computation. When the width of the elements is both set to `min-content`, it is rather obvious.

```css
.text-anywhere {
  width: min-content;
  overflow-wrap: anywhere;
}
```

```css
.text-break-word {
  width: min-content;
  overflow-wrap: anywhere;
}
```

An example of this is illustrated in the Codepen below.

The element(with class `text-break-word`) with `overflow-wrap:break-word`, makes its `width` equal to the longest word by calculating `min-content` as if no words were broken.

The other element(with class `text-anywhere`) with `overflow-wrap: anywhere` uses all possible breaks to compute `min-content`. The `width` of a single character is what happens to `min-content` because a line break can occur anywhere.

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="difference-between-overflow-wrap-breakword-and-overflow-wrap-anywhere" src="https://codepen.io/Necati-zmen/embed/WNWvJov?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/WNWvJov">
  difference-between-overflow-wrap-breakword-and-overflow-wrap-anywhere</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Explore the values of the word-break property

The `word-break` property is another `CSS` property that determines how long words should break at the end of a line.

The following are the values of the `word-break` property:

### `normal`:

Setting the value of the `word-break` property to `normal` will apply the default word-break rules.

```css
.text {
  word-break: normal;
}
```

The following Codepen example shows what happens when you apply the styling `word-break: normal` to a block of text that contains a word longer than its container.

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="word-break-normal-example" src="https://codepen.io/Necati-zmen/embed/MWRwGbb?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/MWRwGbb">
  word-break-normal-example</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## `keep-all`:

Setting the value of the `word-break` property to `keep-all` will also apply the default word-break rules. Additionally, it should not be used in Chinese, Japanese, or Korean (CJK) texts as the browser will not apply word breaks to it even if there is an overflow.

```css
.text {
  word-break: keep-all;
}
```

An example is illustrated on the Codepen below

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="word-break-keep-all-example" src="https://codepen.io/Necati-zmen/embed/abxOGBE?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/abxOGBE">
  word-break-keep-all-example</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## `break-all`:

Setting the value of the `word-break` property to `break-all` will break a word at any character to prevent overflow of the word out of its container.

```css
.text {
  word-break: break-all;
}
```

An example is illustrated on the Codepen below:

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="word-break-break-all-example" src="https://codepen.io/Necati-zmen/embed/LYvVmbr?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/LYvVmbr">
  word-break-break-all-example</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## `break-word`:

Setting the value of the `word-break` property to `break-word` will break a word at soft wrap opportunities (like hyphens or in between words like with spaces or punctuation) to prevent overflow of the word out of its container.

```css
.text {
  word-break: break-word;
}
```

An example is illustrated on the Codepen below:

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="word-break-break-word-example" src="https://codepen.io/Necati-zmen/embed/GRLJdNL?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/GRLJdNL">
  word-break-break-word-example</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## What makes a word-break different from an overflow-wrap?

The differences between these properties are listed below:

| `overflow-wrap`                                                                                                                                                                            | `word-break`                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The `overflow-wrap: break-word`, `overflow-wrap: anywhere` properties will wrap the full overflowing word wrap break even at soft wrap opportunities if the content exceeds its container. | The `Word-break: break-all` property will break word between two characters, even if placing it on its own line eliminates the need for word break. <br/> Also, the`Word-break: break-word` property is similar to the `overflow-wrap: break-word`, `overflow-wrap: anywhere` properties as it wraps break words at soft wrap opportunities as well. |

## Wrap text using word-break and overflow-wrap properties

As previously stated, the `overflow-wrap` property (legacy called `word-wrap`) is your best option for wrapping text or breaking a word that has overflowed its box or container. However, you can also consider using the `word-break` property if the `overflow-wrap` property does not work for you.
However, keep in mind the distinctions between `overflow-wrap` and `word-break`, as discussed above.

Here's a Codepen example of the `overflow-wrap` and `word-wrap` properties in use. You can experiment with it to understand its effects:

<iframe height="300" style={{ width: "100%" }} scrolling="no" title="text-wrap-with-css-example" src="https://codepen.io/Necati-zmen/embed/NWmqMdq?default-tab=css%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Necati-zmen/pen/NWmqMdq">
  text-wrap-with-css-example</a> by Necati Özmen (<a href="https://codepen.io/Necati-zmen">@Necati-zmen</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Conclusion

In this article, we looked at `CSS`-based content wrapping. We also looked at the numerous `CSS` properties for efficiently wrapping content in any form. With this article, you should be able to effortlessly manage the presentation style of contents (words) on your webpages or web applications using `CSS`.
