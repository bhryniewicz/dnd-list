"use client";

import { editLinkData, Link, LinkParentId, LinksGroup } from "@/types/link";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

export const useLinks = () => {
  const [links, setLinks] = useState<Array<LinksGroup>>([]);

  const findLink = (
    parentId: LinkParentId,
    links: Array<LinksGroup> | Array<Link>
  ) => {
    for (const group of links) {
      if (group.id === parentId) return group;

      if (group.children) {
        for (const node of group.children) {
          if (node.id === parentId) return node;

          if (node.children) {
            const child = findLink(parentId, node.children);
            if (child) return child;
          }
        }
      }
    }
  };

  const createGroup = (groupId: string, firstLink: Link) => {
    const newGroup = {
      id: groupId,
      parentId: null,
      children: [{ ...firstLink }],
    };

    setLinks([...links, newGroup]);
  };

  const addLink = (parentId: any, newLink: any) => {
    const parent = findLink(parentId, links);

    if (parent) {
      parent.children.push(newLink);
      setLinks([...links]);
    } else {
      setLinks([...links, newLink]);
    }
  };

  const deleteLink = (parentId: LinkParentId) => {
    const child = findLink(parentId, links);

    if (child.parentId.includes("group")) {
      const filteredLinks = links.filter((link) => link.id !== child.parentId);
      setLinks([...filteredLinks]);
    } else {
      const parent = findLink(child.parentId, links);
      const filteredLinks = parent.children.filter(
        (link: Link) => link.id !== parentId
      );

      parent.children = filteredLinks;
      setLinks([...links]);
    }
  };

  const editLink = (parentId: LinkParentId, { name, link }: editLinkData) => {
    const child = findLink(parentId, links);

    child.name = name;
    child.link = link;

    setLinks([...links]);
  };

  useEffect(() => {
    console.log(links);
  }, [links]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const linkToDrag = findLink(over.id, links);
    const activeParentList = findLink(linkToDrag.parentId, links);

    if (!linkToDrag) {
      console.error("Active item doesn't have a valid parent.");
      return;
    }

    const oldIndex = activeParentList.children.findIndex(
      (child: Link) => child.id === active.id
    );
    const newIndex = activeParentList.children.findIndex(
      (child: Link) => child.id === over.id
    );

    console.log(oldIndex, "old");
    console.log(newIndex, "new");

    const updatedChildren = arrayMove(
      activeParentList.children,
      oldIndex,
      newIndex
    );

    activeParentList.children = updatedChildren;

    setLinks([...links]);
  };

  return {
    links,
    addLink,
    deleteLink,
    editLink,
    createGroup,
    setLinks,
    handleDragEnd,
  };
};
