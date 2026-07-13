import type { CardProps } from "@site/src/pages/core/week-of-refine";
import { StrapiWithText, SupabaseWithText } from "../integration-icons";

export const weekOfRefineCards: CardProps[] = [
  {
    title: "Invoicer",
    imgURL:
      "https://refine.ams3.cdn.digitaloceanspaces.com/week-of-refine/week-of-refine-invoicer.png",
    dateRange: "April 10 - April 14, 2023",
    description:
      "We'll be building an Invoice generator internal tool via Refine & Strapi in a week.",
    logo: StrapiWithText,
    bgLinearGradient:
      "bg-week-of-refine-strapi-card-light dark:bg-week-of-refine-strapi-card",
    link: "/core/week-of-refine-strapi",
  },
  {
    title: "Pixels!",
    imgURL:
      "https://refine.ams3.cdn.digitaloceanspaces.com/week-of-refine/week-of-refine-pixels.png",
    dateRange: "February 14 - February 20, 2023",
    description:
      "Stay tuned all week and learn the basics of creating a CRUD app via Refine & Supabase on a fun project in a week.",
    logo: SupabaseWithText,
    bgLinearGradient:
      "bg-week-of-refine-supabase-card-light dark:bg-week-of-refine-supabase-card",
    link: "/core/week-of-refine-supabase",
  },
];
