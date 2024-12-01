"use client";

import React, { createContext, useContext, ReactNode } from "react";

import { useLinks } from "@/hooks/useLinks";
import { editLinkData, Link, LinkParentId, Group } from "@/types/link";
import { DragEndEvent } from "@dnd-kit/core";

type LinksContextType = {
  links: Array<Group>;
  addLink: (parentId: LinkParentId, link: Link) => void;
  deleteLink: (parentId: LinkParentId) => void;
  editLink: (parentId: LinkParentId, linkData: editLinkData) => void;
  createGroup: (groupId: string, firstLink: Link) => void;
  handleDragLink: (event: DragEndEvent) => void;
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
