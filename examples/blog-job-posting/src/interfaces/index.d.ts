export interface ICompany {
  id: string;
  name: string;
  location: string;
  isActive: boolean;
  web?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  github?: string;
}

export interface IJob {
  id: string;
  title: string;
  location?: string;
  content?: string;
  isActive: boolean;
  company: ICompany;
}
