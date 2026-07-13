export type IntegrationsType = {
  [key: string]: Integration[];
};

export type Integration = {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  url?: string;
  status: string;
  contributors?: contributor[];
};

export type contributor = {
  name: string;
  url: string;
};

export enum TemplateEdition {
  All = "All",
  Enterprise = "Enterprise",
  Community = "Community",
}
