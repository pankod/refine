export interface ILanguage {
  id: number;
  title: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  language: number;
}
