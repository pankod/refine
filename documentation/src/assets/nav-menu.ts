import type { NavMenu } from "../types/nav-menu";
import {
  AboutUsIcon,
  AwesomeIcon,
  ContributeIcon,
  DocumentsIcon,
  ExamplesIcon,
  ExpertIcon,
  IntegrationsIcon,
  RefineIcon,
  TutorialIcon,
  UseCasesIcon,
} from "./popover-icons";

export const POPOVERMENUS: NavMenu[] = [
  {
    label: "Open-source",
    items: [
      {
        label: "Documents",
        description: "Everything you need to get started",
        link: "/core/docs/",
        icon: DocumentsIcon,
      },
      {
        label: "Integrations",
        description: "Discover the Refine ecosystem",
        link: "/core/integrations/",
        icon: IntegrationsIcon,
      },
      {
        label: "Tutorial",
        description: "Your first Refine application",
        link: "/core/tutorial/essentials/intro/",
        icon: TutorialIcon,
      },
      {
        label: "Templates",
        description: "Ready-made examples for your project",
        link: "/core/templates/",
        icon: ExamplesIcon,
      },
      {
        label: "Awesome Refine",
        description: "Repo of awesome things",
        link: "https://github.com/refinedev/awesome-refine",
        icon: AwesomeIcon,
      },
    ],
    imageLink: "https://github.com/refinedev/refine",
    imageURL:
      "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/landing/popovers/open-source.png",
  },
  {
    label: "Community",
    items: [
      {
        label: "Hire an expert",
        description: "Find a trusted partner",
        link: "/core/become-a-refine-expert/",
        icon: ExpertIcon,
      },
      {
        label: "Contributing",
        description: "Join open-source contributors",
        link: "guides-concepts/contributing/",
        icon: ContributeIcon,
      },
      {
        label: "Use cases",
        description: "Inspiring projects built with Refine",
        link: "/core/use-cases/",
        icon: UseCasesIcon,
      },
    ],
    imageLink: "/examples/",
    imageURL:
      "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/landing/popovers/community.png",
  },
  {
    label: "Company",
    items: [
      {
        label: "About Us",
        description: "Team & company information",
        link: "/core/about/",
        icon: AboutUsIcon,
      },
      {
        label: "Meet Refine",
        description: "Call us for any questions",
        link: "https://form.typeform.com/to/Z9wS06kE",
        icon: RefineIcon,
      },
    ],
    imageLink: "/about/",
    imageURL:
      "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/landing/popovers/company.png",
  },
];
