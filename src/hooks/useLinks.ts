"use client";

import { Link } from "@/types/link";
import { useEffect, useState } from "react";

export const useLinks = () => {
  const [links, setLinks] = useState<Array<Link>>([]);

  const findLink = (parentId: string, links: Array<Link>) => {
    for (const node of links) {
      if (node.id === parentId) return node;
      if (node.children) {
        const child: any = findLink(parentId, node.children);
        if (child) return child;
      }
    }
  };

  const addLink = (parentId, newLink) => {
    const parent = findLink(parentId, links);

    if (parent) {
      parent.children.push(newLink);
      setLinks([...links]);
    } else {
      setLinks([...links, newLink]);
    }
  };

  return { links, addLink };
};
