export type LinkParentId = string | null;

export type LinksGroup = {
  parentId: null;
  id: string;
  children: Array<Link>;
};

export type Link = {
  id: string;
  name: string;
  link: string;
  nestingLevel: number;
  parentId: LinkParentId;

  children: Array<Link>;
};

export type editLinkData = Pick<Link, "name" | "link">;
