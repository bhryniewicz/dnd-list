export type Link = {
  id: string;
  name: string;
  link: string;
  nestingLevel: number;
  parentId: string | null;

  children: Array<Link>;
};
