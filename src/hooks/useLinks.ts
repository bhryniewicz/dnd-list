"use client";

import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

import { editLinkData, Link, LinkParentId, Group } from "@/types/link";

export const useLinks = () => {
  const [links, setLinks] = useState<Array<Group>>([]);

  const findLink: any = (
    parentId: LinkParentId,
    links: Array<Group> | Array<Link>
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

  const addLink = (parentId: LinkParentId, newLink: Link) => {
    const parent = findLink(parentId, links);

    parent.children.push(newLink);
    setLinks([...links]);
  };

  const deleteLink = (parentId: LinkParentId) => {
    const parent = findLink(parentId, links);
    const group = findLink(parent.parentId, links);
    const link = findLink(parent.id, links);

    if (parent.parentId.includes("group")) {
      if (group.children.length === 1) {
        const filteredLinks = links.filter((group1) => group1.id !== group.id);
        setLinks([...filteredLinks]);
      } else {
        group.children = group.children.filter((link1: Link) => link1.id !== link.id);
        setLinks([...links]);
      }
    } else {
      group.children = group.children.filter((link1: Link) => link1.id !== link.id);
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
    handleDragEnd,
  };
};
