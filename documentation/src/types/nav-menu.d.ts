export type NavMenu = {
  label: string;
  items: {
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    link: string;
    description: string;
  }[];
  imageURL: string;
  imageLink: string;
};
