import {
  StrapiWithText,
  SupabaseWithText,
} from "@site/src/assets/integration-icons";
import React from "react";
import { FooterDiscordIcon as DiscordIcon } from "../../refine-theme/icons/footer-discord";
import { FooterGithubIcon as GithubIcon } from "../../refine-theme/icons/footer-github";
import { FooterRedditIcon as RedditIcon } from "../../refine-theme/icons/footer-reddit";
import { FooterTwitterIcon as TwitterIcon } from "../../refine-theme/icons/footer-twitter";

// The contents added to the timeline are defined day by day in the data.timeline. All contents are not published at the same time.
// For unpublished contents, the link can be defined as null. If the link is set to null, the timeline item becomes disabled.
// If `publishDate` is defined, a countdown will be displayed for the timeline item.
// The format for `publishDate` is `YYYY-MM-DDTHH:mm+03:00` = `2023-06-20T13:00+03:00`.

const hashtags = "opensource";
const supabaseShareTweetURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
  "https://refine.dev/core/week-of-refine-supabase/",
)}&text=${encodeURIComponent(
  "📚 RefineWeek ft Supabase: A week-long journey of building a complete CRUD app with @refine_dev and @supabase!\n\n",
)}&hashtags=${hashtags}`;

const strapiShareTweetURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
  "https://refine.dev/core/week-of-refine-strapi/",
)}&text=${encodeURIComponent(
  "📚 RefineWeek ft Strapi: A week-long journey of building a complete CRUD app with @refine_dev and @strapijs!\n\n",
)}&hashtags=${hashtags}`;

export const data = {
  supabase: {
    logo: SupabaseWithText,
    cover: "/week-of-refine/supabase-cover.jpg",
    cover2x: "/week-of-refine/supabase-cover-2x.jpg",
    coverAlt: "refine week",
    title: "supabase",
    description:
      "Stay tuned all week and learn the basics of creating a CRUD app via <strong>Refine & Supabase</strong> on a fun project in a week.",
    date: "February 14 - February 20, 2023",
    timeline: [
      {
        date: "February 14, Monday",
        title: "Pilot & Refine architecture",
        description: `Overview about <strong className="font-bold">Refine</strong> and <strong className="font-bold">Supabase</strong> the app we built during the article series.`,
        link: "https://refine.dev/blog/refine-pixels-guide/",
        image: "/week-of-refine/supabase-timeline-1.jpg",
        image2x: "/week-of-refine/supabase-timeline-1-2x.jpg",
      },
      {
        date: "Februrary 15, Tuesday",
        title: "Setting Up the Client App",
        description: `We start with setting up the Pixels client app using create <strong className="font-bold">refine-app</strong> by choosing <strong className="font-bold">Ant Design</strong> as a UI framework and <strong className="font-bold">supabase</strong> as a dataprovider.`,
        link: "https://refine.dev/blog/refine-pixels-guide/#part-2-setting-up-the-client-app",
        image: "/week-of-refine/supabase-timeline-2.jpg",
        image2x: "/week-of-refine/supabase-timeline-2-2x.jpg",
      },
      {
        date: "Februrary 16, Wednesday",
        title: "Adding CRUD Actions & Authentication",
        description: `We start implementing CRUD functionalities like creating, showing a canvas, drawing pixels and user authentication using <strong className="font-bold">supabase</strong>.`,
        link: "https://refine.dev/blog/refine-pixels-guide/#part-3-adding-crud-actions-and-authentication",
        image: "/week-of-refine/supabase-timeline-3.jpg",
        image2x: "/week-of-refine/supabase-timeline-3-2x.jpg",
      },
      {
        date: "Februrary 17, Thursday",
        title: "Adding Realtime Collaboration",
        description: `Adding <strong className="font-bold">supabase</strong> as live provider to the project in order that multiple users drawing on the same canvas can see each other's paintings in real-time.`,
        link: "https://refine.dev/blog/refine-pixels-guide/#part-4-adding-realtime-collaboration",
        image: "/week-of-refine/supabase-timeline-4.jpg",
        image2x: "/week-of-refine/supabase-timeline-4-2x.jpg",
        enabledTime: "2023-06-21 12:30",
      },
      {
        date: "Februrary 18, Friday",
        title: "Initialize and Build Pixels Admin App",
        description: `We'll implement an admin dashboard app and explore how Refine's Ant Design support module is geared to rapidly build CRUD pages for a <strong className="font-bold">Refine</strong> app.`,
        link: "https://refine.dev/blog/refine-pixels-guide/#part-5-creating-an-admin-dashboard-with-refine",
        image: "/week-of-refine/supabase-timeline-5.jpg",
        image2x: "/week-of-refine/supabase-timeline-5-2x.jpg",
      },
      {
        date: "Februrary 19, Saturday",
        title: "Add Role Based Authorization",
        description: `We'll implement Role Based Access Control (RBAC) on our Pixels Admin app.`,
        link: "https://refine.dev/blog/refine-pixels-guide/#part-6-implementing-role-based-access-control",
        image: "/week-of-refine/supabase-timeline-6.jpg",
        image2x: "/week-of-refine/supabase-timeline-6-2x.jpg",
      },
      {
        date: "Februrary 20, Sunday",
        title: "Implementing Audit Logs",
        description: `We'll record each canvas creation and pixel drawings to audit logs table in <strong className="font-bold">supabase</strong>. And then we’ll be able to display this logs on the admin and the client app.`,
        link: "https://refine.dev/blog/refine-pixels-guide/#part-7-audit-log-with-refine",
        image: "/week-of-refine/supabase-timeline-7.jpg",
        image2x: "/week-of-refine/supabase-timeline-7-2x.jpg",
      },
    ],
    shareTweetUrl: supabaseShareTweetURL,
    tweetIDList: [
      "1645507785621209097",
      "1635625661778763776",
      "1640741763408076803",
      "1625488050863353856",
      "1615260152822628352",
      "1621513516036526080",
      "1621932348009861132",
      "1597878371760979970",
      "1616390215068688384",
      "1617841995233529861",
      "1620724625536880641",
      "1618180208414322689",
      "1624015381403955200",
    ],
  },
  strapi: {
    logo: StrapiWithText,
    cover: "/week-of-refine/strapi-cover.png",
    cover2x: "/week-of-refine/strapi-cover-2x.png",
    coverAlt: "Refine week",
    title: "strapi",
    description:
      "Stay tuned all week and learn the basics of creating a CRUD app via <strong>Refine & strapi</strong> on a fun project in a week.",
    date: "April 10 - April 14, 2023",
    timeline: [
      {
        date: "April 10, Monday",
        title: "Pilot & Refine architecture",
        description: `Overview about <strong className="font-bold">Refine</strong> and <strong className="font-bold">Strapi</strong> the app we built during the article series.`,
        link: "https://refine.dev/blog/refine-react-invoice-generator-1/",
        image: "/week-of-refine/strapi-timeline-1.png",
        image2x: "/week-of-refine/strapi-timeline-1-2x.png",
      },
      {
        date: "April 11, Tuesday",
        title: "Setting Up the Invoicer App",
        description: `We start with setting up the Invoicer app using <strong className="font-bold">refine.new</strong> by choosing <strong className="font-bold">Ant Design</strong> as a UI framework and <strong className="font-bold">Strapi</strong> as a dataprovider`,
        link: "https://refine.dev/blog/refine-react-invoice-generator-2/",
        image: "/week-of-refine/strapi-timeline-2.png",
        image2x: "/week-of-refine/strapi-timeline-2-2x.png",
      },
      {
        date: "April 12, Wednesday",
        title: "Adding CRUD Actions & Views",
        description: `We leverage the Strapi dataProvider methods to implement CRUD operations for companies, clients and contacts resources. and user authentication using <strong className="font-bold">Strapi</strong>.`,
        link: "https://refine.dev/blog/refine-react-invoice-generator-3/",
        image: "/week-of-refine/strapi-timeline-3.png",
        image2x: "/week-of-refine/strapi-timeline-3-2x.png",
      },
      {
        date: "April 13, Thursday",
        title: "Creating Mission and Invoices Pages",
        description:
          "We add more CRUD views to the PDF Invoice Generator app we have been building using Refine and Strapi last few days.",
        link: "https://refine.dev/blog/refine-react-invoice-generator-4/",
        image: "/week-of-refine/strapi-timeline-4.png",
        image2x: "/week-of-refine/strapi-timeline-4-2x.png",
      },
      {
        date: "April 14, Friday",
        title: "Adding PDF Renderer",
        description:
          "We come past the Refine features and add a pdf renderer to display our invoices in a PDF screen.",
        link: "https://refine.dev/blog/refine-react-invoice-generator-5/",
        image: "/week-of-refine/strapi-timeline-5.png",
        image2x: "/week-of-refine/strapi-timeline-5-2x.png",
      },
    ],
    shareTweetUrl: strapiShareTweetURL,
    tweetIDList: [
      "1645507785621209097",
      "1635625661778763776",
      "1640741763408076803",
      "1625488050863353856",
      "1615260152822628352",
      "1621513516036526080",
      "1621932348009861132",
      "1597878371760979970",
      "1616390215068688384",
      "1617841995233529861",
      "1620724625536880641",
      "1618180208414322689",
      "1624015381403955200",
    ],
  },
};

export const additionalSources = [
  {
    title: "Join our",
    label: "Discord Server",
    icon: <DiscordIcon color="#5865F2" width="24" height="24" />,
    link: "https://discord.gg/refine",
    color: "#5865F2",
  },
  {
    title: "Visit our",
    label: "GitHub Repo",
    icon: (
      <GithubIcon
        className="text-gray-1000 dark:text-gray-0"
        width="24"
        height="24"
      />
    ),
    link: "https://github.com/refinedev/refine",
    color: "#242436",
  },
  {
    title: "Follow us on",
    label: "Twitter",
    icon: <TwitterIcon color="#00AAEC" width="24" height="24" />,
    link: "https://x.com/refine_dev",
    color: "#00AAEC",
  },
  {
    title: "Follow us on",
    label: "Reddit",
    icon: <RedditIcon color="#FF4500" width="24" height="24" />,
    link: "https://reddit.com/r/refine",
    color: "#FF4500",
  },
];

export type WeekVariants = keyof typeof data;
export type WeekData = (typeof data)[WeekVariants];
