import React from "react";

export type Example = {
  title: string;
  description: string;
  image: string;
  image2x: string;
  buttons: {
    text: string;
    link: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
  }[];
  source?: string;
  isExternal?: boolean;
};
export type Examples = Example[];
