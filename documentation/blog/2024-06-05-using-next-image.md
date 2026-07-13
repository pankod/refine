---
title: Nextjs image optimization with examples
description: Built-in image optimization using the next image component
slug: using-next-image
authors: michael
category: "Tutorials"
tags: [nextjs]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-17-using-next-image/social-2.png
hide_table_of_contents: false
last_update: 2024-06-05
---

**_This article was last updated on Jun 05, 2024 to add new sections on common pitfalls, advanced techniques and benefit consideration on Next.js Image Component_**

## Introduction

Images are a significant part of modern-day web application development. Depending on how you use them, they can either make or mar your applications' developer and user experiences. Images impact user experience and are equally crucial in Search Engine Optimization (SEO) ranking when used right.
Traditionally, images are added to web pages with the HTML `img` tag. This might prove to be efficient for simple use cases, but things quickly get untidy when dealing with a sizable amount of images.

NextJS introduced a solution for delivering performant images on the web in v.10. It features a new Image component and built-in automatic image optimization. In the coming sections, you'll learn how to leverage this solution for optimizing and developing performant applications, thereby improving developer and end-user experiences.

## Preparing your images for optimization

Before you dive into using the Image component, it's important to prepare your images to achieve optimum performance results. If you are dealing with a dynamic and large amount of images, you may want to consider a Content Delivery Network (CDN) such as Cloudinary to host your images. CDNs provide many images and application performance benefits such as automatic caching, file compression, and image resizing on the fly.

Here is a non-exhaustive list of things you should consider before serving your images to end-users:

1. **Choose the right format**

The three most popular image formats on the web are JPEG, PNG, and WebP. Of all three, WebP is highly recommended due to its many advantages and performance benefits.

WebP is a modern image format that provides superior lossy and lossless image compression for web images without compromising quality. It provides faster load times and is widely supported by browsers. [WebP-Converter](https://webp-converter.com/) is a good tool for converting your images to WebP.

2. **Resize images**

Serving the right images for the right device sizes is a vital part of image optimization on the web. Serving a huge 1080x800 image for users with 100x100 device sizes will lead to your users downloading unnecessary bandwidth, which can slow down page loads and hurt performance metrics. The [Responsive Breakpoints Generator](https://responsivebreakpoints.com) tool by Cloudinary is a good tool for generating multiple image file sizes for different screen sizes.

3. **Compress images**

A good rule of thumb for image optimization is to keep your images below 1 Mb. Large file sizes should be reduced to a reasonable threshold without sacrificing image quality. Tools such as [TinyPNG](https://tinypng.com), [Compressor.io](https://compressor.io) are great for image compression.

Once you're done optimizing your images manually, you can now proceed to use the NextJS Image component for maximum image optimization benefits.

## The NextJS image component

The [`<Image />`](https://nextjs.org/docs/api-reference/next/image) component is a batteries-included modern solution for serving images in NextJS applications. It's similar to the native HTML `<img/>` element but has a few differences.

The major difference between the two is the out-of-the-box image optimization, performance benefits that come with the NextJS `<Image/>` component, and several other useful features, which we'll explore in the coming sections. The Image component usage is the same as using any other component in NextJS and can be used and re-used depending on your needs.

## Using the `<Image/>` component

To get started, you'll need to import the `<Image />` component from `next/image` like so:

```tsx
import Image from "next/image";
```

And then use the component as shown below:

```tsx
import Image from "next/image";
import profilePic from "../public/profile.webp";

const Profile = () => {
  return (
    <>
      <h1> User Profile </h1>
      <Image src={profilePic} alt="user profile picture" />
    </>
  );
};
```

What's interesting to note is that `next/image` automatically generates `width`, `height`, and `blurDataURL` values for statically imported images. These values are used to prevent [Cumulative Layout Shift](https://web.dev/cls/) (CLS) before the image is finally loaded. It's also possible to pass these values explicitly.

Alternatively, you can pass a remote image string value to the `src` prop by using either relative or absolute URLs:

```ts
import Image from "next/image";

const Profile = () => {
  return (
    <>
      <h1> User Profile </h1>
      <Image
        // Absolute URL
        src="https://unsplash.com/photos/XV1qykwu82c"
        alt="User profile picture"
        width={300}
        height={300}
      />
    </>
  );
};
```

:::note

You **should** always add the `width` and `height` props in the image component when using remote images because NextJS cannot determine the image's dimension during the build process for proper page rendering to prevent layout shifts.

:::

## The image component properties

The `<Image />` component accepts several properties (props) that enhance its performance. Basically, there are three kinds of properties that can be passed to the component. These include: **required,** **optional**, and **advanced** props. Let's walk through them one by one.

### `next/image` required props

The `<Image />` component requires three kinds of properties in its most basic usage. The `src`, `width`, and `height` props.

### **`src`**

The `src` props accept two types of values: a statically imported local image object or a path string to an external absolute or relative image URL. In the previous examples, we saw how to import local static images from the `public` folder and how to pass an absolute URL string.

For relative external URL strings, e.g. `user.png`, a `domains` configuration is required in `next.config.js` to provide a list of allowed hostnames to which the relative URL will resolve. This is to prevent the abuse of external URLs by malicious users. We'll come to how to configure the `domains` object later in the article.

### **`width` and `height`**

The `width` and `height` props determine how much space an image takes up on a page or how scaled it is about its container.
The `width` and `height` props can represent either the image's _rendered_ or _original_ width, depending on the value of `layout`.

Using `layout="intrinsic"` or `layout="fixed"`, the `width` and `height` props refers to the _rendered_ width and height values in pixels. This will affect how large the image appears.

Using `layout="responsive"` or `layout="fill"`, the `width` and `height` props refer to the image's _original_ dimensions in pixels, so this will affect the aspect ratio (i.e. how scaled the image is about its container).

## `next/image` optional props

In addition to the required props, the `<Image />` component accepts a number of commonly-used optional properties.

### **`layout`**

Accepts a string value that determines how images react to changes in viewport sizes. Defaults to `intrinsic` and its four possible values include:

1. **`intrinsic`** - default value for the `layout` prop. Gives the image enough space to render using its _original_ width and height dimensions. Try out a demo [here](https://image-component.nextjs.gallery/layout-intrinsic).

2. **`fixed`** - sizes the image to fit the exact `width` and `height` props values. Generates a `srcSet` with pixel density descriptors of 1x and 2x. Try it out [here](https://image-component.nextjs.gallery/layout-fixed).

3. **`fill`** - causes an image to expand in _width and height_ to fill its parent element's width and height. Ensure you add `position: relative` to the parent element. This value is usually used with the `objectFit` property and is recommended for images in which you don't know their sizes in advance. Check out a demo [here](https://image-component.nextjs.gallery/layout-fill).

4. **`responsive`** - scales the image to fit the _width_ of its parent container. Ensure you add `display: block` to the parent container. Try out a demo [here](https://image-component.nextjs.gallery/layout-responsive).

### **`loader`**

This is a custom function that resolves external image URLs. It can be passed as a prop or set in the `images` section of `next.config.js`. When used inline as a prop, it supersedes the one defined in `next.config.js`. The function basically resolves the `src`, `width`, and `quality` parameters into a URL string as a path for an external image. An example is shown below:

```ts
import Image from "next/image";

const customLoader = ({ src, width, quality }) => {
  return `https://s3.amazonaws.com/demo/image/${src}?w=${width}&q=${
    quality || 75
  }`;
};

const MyImage = (props) => {
  return (
    <Image
      src="profilePic.webp" // This will resolve into: https://s3.amazonaws.com/demo/image/profilePic.webp?width=300&q=80
      width={300}
      height={300}
      alt="User profile picture"
      quality={80}
      loader={customLoader}
    />
  );
};
```

### **`placeholder`**

Defines a placeholder to use before the original image is fully loaded. Possible values are `blur` or `empty`. Defaults to `empty`.

When `empty`, a space is shown until the original image is fully loaded.

When set to `blur`, the `blurDataURL` value will be used as a placeholder. If `src` is a statically imported image and the image format is any of `.jpg`, `.png`, `.webp`, and `.avf`, an automatically generated image will be passed as a value to the `blurDataURL` prop:

```ts
import Image from "next/image";
import cat from "../public/cat.webp";

<Image
  src={cat}
  alt="A picture of white cats"
  width={500}
  height={450}
  placeholder="blur"
/>;
```

### **`priority`**

This prop is particularly useful for images visible above the fold - i.e, the portion of a web page that is visible without scrolling. Images visible above the fold, such as images on a landing page, should use the `priority` prop for the performance boost. This prop tells the browser to preload the image as it's considered a high priority. Lazy loading will be automatically disabled for images using `priority`. It takes a Boolean value and defaults to false:

```ts
<Image
  src="user.webp"
  alt="User profile photo"
  width={300}
  height={300}
  priority
/>
```

### **`quality`**

An integer that specifies the quality of the optimized image. Its values range between `1` and `100` where `100` is the best quality. Defaults to `75`:

```ts
<Image
  src="user.webp"
  alt="User profile photo"
  width={300}
  height={300}
  quality={80}
/>
```

### **`sizes`**

One effective way to dramatically reduce [Cumulative Layout Shift](https://web.dev/cls/) is by sizing images responsively. This helps the browser to allocate enough space for the image before it's fully loaded, so it doesn't distort the page's layout.

One powerful feature of `next/image` Image component is automatic source set generation. This means NextJS can internally generate different sizes of an image and determine which of the images to download for a specific viewport size.

`next/image` uses the `deviceSizes` and `imageSizes` properties in `next.config.js` to generate a `srcSet` to improve image delivery and performance metrics. You can optionally configure the `deviceSizes` and `imageSizes` properties if you have specific use cases.

The `sizes` prop only works for images with `layout="responsive"` or `layout="fill"`. The `sizes` property lets us define a set of media conditions (e.g., viewport width) and slot width to tell the browser what size of image to download from the automatically-generated source set when a certain media condition is true.
Below is an example from the next/image [docs](https://nextjs.org/docs/api-reference/next/image#sizes) showing how this works.

```ts
import Image from "next/image";

const Example = () => (
  <div>
    <Image
      src="/mock.png"
      layout="fill"
      sizes="(min-width: 60em) 24vw,
 (min-width: 28em) 45vw,
 100vw"
    />
  </div>
);
```

:::tip

You can learn more about the [srcset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) and [sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes) attributes on MDN.

:::

### `next/image` advanced props

There are use cases where you may need to customize the image's behavior. Find below some of the advanced props you can use on the `<Image />` component.

### **`blurDataURL`**

A base64-encoded image [DATA URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) to be used as a placeholder image before the `src` image fully loads. It will be enlarged and blurred, so a very small image of 10px or less is recommended. Only takes effect when combined with `placeholder="blur"`.

```ts
<Image
  src="https://unsplash.com/photos/XV1qykwu82c"
  alt="Cover photo"
  width={700}
  height={500}
  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA..."
  placeholder="blur"
/>
```

:::tip

[Plaiceholder](https://plaiceholder.co/) is a good tool for generating base64-encoded images.

:::

### **`loading`**

Specifies the loading behavior of the image. Accepts two possible values `lazy` and `eager`. Defaults to `lazy`.

When set to `lazy`, loading the image is deferred until it reaches a calculated distance from the viewport. This value should be used for images that are below the fold.

When set to `eager`, load the image immediately as soon as the page is mounted. Beware of using the `eager` prop as it's turned out to hurt performance drastically.

```ts
<Image
  src="/background.webp"
  alt="Page background photo"
  width={800}
  height={750}
  loading="lazy"
/>
```

### **`objectFit`**

Sets how an image should be sized to its parent element when using `layout="fill"`. This value is passed to the [object-fit CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) for the src image. Its possible values are `fill`, `cover`, or `contain`:

```ts
<Image
  src="/user.webp"
  alt="User profile photo"
  width={300}
  height={300}
  objectFit="cover"
/>
```

### **`objectPosition`**

Specifies the alignment of the image contents within the image's box. This value is passed to the [object-position CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) applied to the image. Defaults to `50% 50%`:

```ts
<Image
  src="/user.webp"
  alt="User profile photo"
  width={300}
  height={300}
  objectPosition="right bottom"
/>
```

### **`onLoadingComplete`**

When the original image is fully loaded, the callback function is triggered. The function accepts one parameter, an object with the following properties:

- [`naturalHeight`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalHeight)
- [`naturalWidth`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalWidth)

```ts
const MyProfile = (props) => {
  const handleImageLoad = ({ naturalWidth, naturalHeight }) => {
    console.log(naturalWidth, naturalHeight);
  };

  return (
    <Image
      src="profilePic.webp"
      width={300}
      height={300}
      alt="User profile picture"
      onLoadingComplete={handleImageLoad}
    />
  );
};
```

### **`style`**

Lets you add custom CSS styles to the underlying image element. To enable custom styling on the `<Image />` component, you can also target the image with `className`. Note that styles applied by the `layout` prop will take precedence over the `style` prop. Also, if you modify an image's width using the `style` prop, you must set `height="auto"` or the image will be distorted.

```tsx
<Image
  src="/background.webp"
  alt="Waterfall photo"
  width={800}
  height={800}
  style={{ opacity: 0.5 }}
  className="user_photo"
/>
```

## `next/image` configuration options

To use external images, a configuration is required to protect your application from malicious users. You can do so using the `domains` and `loader` properties in `next.config.js`.

### **`loader`**

You may want to use a cloud provider to optimize images instead of using Next.js' built-in Image Optimization API. You can configure the `loader` and `path` prefix in your `next.config.js` file, which will allow you to use relative URLs (e.g. `"me.webp"`) in the `src` prop. The loader will then transform the relative URLs into absolute URLs. You can configure it like so:

```tsx
module.exports = {
  images: {
    loader: "amazon",
    path: "https://s3.amazonaws.com/demoapp/",
  },
};
```

### **`domains`**

The `domains` configuration can be used to provide a list of allowed hostnames for external images. This helps to protect your application from malicious users. For example, the following configuration will ensure your external images start with `s3.amazonaws.com`. Any other protocol or unmatched hostname will respond with 400 Bad Request.

```ts
module.exports = {
  images: {
    domains: ["s3.amazonaws.com"],
  },
};
```

## Optimization of Image: Advantages

There are tremendous benefits to optimizing images in your Next.js application: This ensures a decent user retention rate, as image optimization improves load time. For all photos on a page, the optimization process does not lead to an increase in bounce rate; it also makes users interact more with the content on the same page. Optimized images give a boost to SEO as Google considers the page load time when ranking, a faster page will rank higher.

This will reduce the bandwidth usage of your images, so users with limited data service will be able to benefit from the image, and at the same time, it saves server costs. Optimized images can also land you high scores on performance measurement tools, such as Google PageSpeed Insights, showing excellent performance.

## Common Pitfalls in Optimizing Images

Developers often screw up in a bid to optimize images. One common mistake is using the wrong image format. File formats, such as BMP or TIFF, are way less efficient than today's formats: WebP or optimized JPEG/PNG. Another pitfall is not resizing images depending on the target display size. Serving large images scaled down by the browser gives room for bandwidth waste and costs in terms of time taken for page rendering. In all cases, always resize images so they're optimized for the display size. Another problem is ignoring compression. Not compressing photos could lead to unnecessarily large files.

Other tools like TinyPNG or Compressor.io, however, compress in quality and just reduce image size. Finally, not using a CDN could result in prolonged load times for images, particularly those farther away geographically from where your server is.

## Compare with Other Image Optimization Techniques

Here are a few benefits of Next.js built-in image optimization over the alternatives: It makes optimization work automatically, with minimum manual changes.
The `<Image />` component is responsive out-of-the-box for images; they will fit the screen size and resolution dynamically.

Only supports modern image formats, like WebP, which has better compression than JPEG and PNG. Implement custom loaders for services like Cloudinary or Imgix in a completely flexible way. For example, you can use a custom loader to specify how images should be loaded:

```tsx
import Image from "next/image";
const customLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const MyImage = () => (
  <Image
    loader={customLoader}
    src="profile.jpg"
    alt="Profile picture"
    width={500}
    height={500}
  />
);
```

## Troubleshooting Ergonomic Problems

Working with image optimization in Next.js may bring about quite a few issues. For example, sometimes the image doesn't load; add all the domains from which external images are loaded into the next.config.js file's configuration key domains.

Also, size can be an issue if you don't do it properly. Always add the width and height for a remote image so there is no layout shift. In case you see images blurry, double-check that the quality prop value is high enough. Here is how you configure domains within next.config.js:

```tsx
module.exports = {
  images: {
    domains: ["example.com"],
  },
};
```

## Commonly Asked Questions About NextJS Image Optimization

Next.js is excellent with handling SVGs, but next/image doesn't offer out-of-the-box optimization with the SVG. Any <img /> tag can host an SVG, allowing it to be inlined directly into the HTML.

Animated images—like GIFs—should be converted to video formats for performance benefits since next/image doesn't optimize them. Next.js supports all modern image formats, such as WebP. Be sure to provide fallbacks for browsers that do not support it.

Always size your images so they don't cause layout shifts. Set the layout="responsive" prop for responsive designs. And remember, next/image works for native image elements, not ones implemented as a background image through CSS. You'll handle those in the usual ways. With these practices in mind and making full use of the built-in features of Next.js, you can effectively optimize images for performance within your web applications.

## Conclusion

Congratulations if you made it this far! In this article, you learned how to use `next/image` to deliver optimized images in NextJS through automatic lazy-loading, preloading of critical images, automatic sizing across devices, automatic support for modern image formats, and how to improve the performance of your application metrics using the `<Image />` component.

We hope this article helps you get started with building amazing developer and user experiences by leveraging the numerous customization options and features of the Image component to score good performance points.
