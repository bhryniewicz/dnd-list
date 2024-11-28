"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { Link, LinkParentId } from "@/types/link";
import { useLinks } from "@/hooks/useLinks";

type LinksContextType = {
  links: Array<Link>;
  addLink: (parentId: LinkParentId, link: Link) => void;
  deleteLink: (parentId: LinkParentId) => void;
  editLink: (parentId: LinkParentId, link: Link) => void;
  createGroup: (groupId: LinkParentId, firstLink: Link) => void;
};

const LinksContext = createContext<LinksContextType | undefined>(undefined);

export const LinksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const linksData = useLinks();

  return (
    <LinksContext.Provider value={linksData}>{children}</LinksContext.Provider>
  );
};

export const useLinksContext = (): LinksContextType => {
  const context = useContext(LinksContext);

  if (!context) {
    throw new Error("useLinksContext must be used within a LinksProvider");
  }

  return context;
};
