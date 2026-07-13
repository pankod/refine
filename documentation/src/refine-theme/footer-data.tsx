import React from "react";
import { FooterDiscordIcon } from "./icons/footer-discord";
import { FooterGithubIcon } from "./icons/footer-github";
import { FooterLinkedinIcon } from "./icons/footer-linkedin";
import { FooterRedditIcon } from "./icons/footer-reddit";
import { FooterTwitterIcon } from "./icons/footer-twitter";
import { NewBadgeIcon } from "./icons/popover";

export const menuItems = [
  {
    label: "Resources",
    items: [
      {
        label: "Documentation",
        href: "/core/docs/getting-started/quickstart/",
      },
      {
        label: "Tutorials",
        href: "/core/tutorial/essentials/intro/",
      },
      {
        label: "Blog",
        href: "/blog/",
      },
    ],
  },
  {
    label: "Product",
    items: [
      {
        label: "Templates",
        href: "/core/templates/",
        icon: null,
      },
      {
        label: "Integrations",
        href: "/core/integrations/",
        icon: null,
      },
    ],
  },

  {
    label: "Company",
    items: [
      {
        label: "About",
        href: "/about/",
      },
      {
        label: "Contact Us",
        href: "https://form.typeform.com/to/H54hLD9r",
      },
    ],
  },
];

export const secondaryMenuItems = [
  {
    label: "Terms & Conditions",
    href: "/terms-and-conditions/",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy/",
  },
  {
    label: "License",
    href: "https://github.com/refinedev/refine/blob/main/LICENSE",
  },
];

export const footerDescription =
  "Refine is a React-based framework for the rapid development of web applications. It eliminates the repetitive tasks demanded by CRUD operations and provides industry standard solutions.";

export const socialLinks = [
  {
    icon: FooterGithubIcon,
    href: "https://github.com/refinedev/refine",
  },
  {
    icon: FooterDiscordIcon,
    href: "https://discord.gg/refine",
  },
  {
    icon: FooterRedditIcon,
    href: "https://www.reddit.com/r/refine/",
  },
  {
    icon: FooterTwitterIcon,
    href: "https://x.com/refine_dev",
  },
  {
    icon: FooterLinkedinIcon,
    href: "https://www.linkedin.com/company/refine-dev",
  },
];
