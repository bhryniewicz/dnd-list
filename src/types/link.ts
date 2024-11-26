export type Link = {
  id: string;
  name: string;
  link: string;
  parentId: string | null;

  children: Array<Link>;
};
