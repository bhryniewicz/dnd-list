"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { Link } from "@/types/link";
import { useLinks } from "@/hooks/useLinks";

interface LinksContextType {
  links: Array<Link>;
  addLink: (link: Link) => void;
}

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
