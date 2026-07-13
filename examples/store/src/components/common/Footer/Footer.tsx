import React from "react";
import clsx from "clsx";
import { IconRefine } from "@components/icons/icon-refine";
import { IconSocialGithub } from "@components/icons/icon-social-github";
import { IconSocialDiscord } from "@components/icons/icon-social-discord";
import { IconSocialReddit } from "@components/icons/icon-social-reddit";
import { IconSocialTwitter } from "@components/icons/icon-social-twitter";
import { IconSocialLinkedin } from "@components/icons/icon-social-linkedin";

const nav = [
  {
    children: "Home",
    href: "https://refine.dev/",
  },
  {
    children: "Documentation",
    href: "https://refine.dev/docs/",
  },
  {
    children: "Tutorial",
    href: "https://refine.dev/tutorial/",
  },
  {
    children: "Templates",
    href: "https://refine.dev/templates/",
  },
  {
    children: "Blog",
    href: "https://refine.dev/blog/",
  },
];

const social = [
  {
    Icon: IconSocialGithub,
    href: "https://github.com/refinedev/refine",
  },
  {
    Icon: IconSocialDiscord,
    href: "https://discord.gg/refine",
  },
  {
    Icon: IconSocialReddit,
    href: "https://reddit.com/r/refine",
  },
  {
    Icon: IconSocialTwitter,
    href: "https://x.com/refine_dev",
  },
  {
    Icon: IconSocialLinkedin,
    href: "https://linkedin.com/company/refine-dev",
  },
];

export const Footer = () => {
  return (
    <footer
      className={clsx(
        "pt-10",
        "pb-2",
        "border-t",
        "border-t-gray-dark",
        "flex",
        "items-center",
        "flex-col md:flex-row",
      )}
    >
      <div
        className={clsx(
          "w-auto md:w-[120px] lg:w-[200px]",
          "flex-shrink-0",
          "mb-6 md:mb-0",
        )}
      >
        <a href="https://refine.dev" target="_blank" rel="noreferrer">
          <IconRefine className="text-gray-darkest" />
        </a>
      </div>
      <div className={clsx("flex-1")}>
        <nav
          className={clsx(
            "flex",
            "flex-col md:flex-row",
            "items-center",
            "justify-start",
            "gap-2 lg:gap-8",
          )}
        >
          {nav.map((item) => (
            <a
              key={item.children}
              {...item}
              className={clsx("text-gray-darkest", "text-base")}
            />
          ))}
        </nav>
      </div>
      <div className={clsx("flex-shrink-0", "pt-6 md:pt-0")}>
        <div
          className={clsx(
            "flex",
            "items-center",
            "justify-end",
            "gap-4",
            "text-gray-darker",
          )}
        >
          <span className="hidden lg:block">Join us on</span>
          {social.map(({ Icon, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className={clsx()}
            >
              <Icon className={clsx("w-6", "h-6")} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
