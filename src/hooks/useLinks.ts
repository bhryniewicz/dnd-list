"use client";

import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";

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

    if (!group || !parent) return;

    group.children = group.children.filter(
      (child: Link) => child.id !== parent.id
    );

    if (parent.parentId.includes("group") && group.children.length === 0) {
      setLinks(links.filter((link) => link.id !== group.id));
    } else {
      setLinks([...links]);
    }
  };

  const editLink = (parentId: LinkParentId, { name, link }: editLinkData) => {
    const child = findLink(parentId, links);

    child.name = name;
    child.link = link;

    setLinks([...links]);
  };

  const handleDragLink = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const draggedLink = findLink(active.id, links);
    const oldParent = findLink(draggedLink.parentId, links);

    const newParent = findLink(over.id, links);

    if (!draggedLink) {
      console.error("Dragged item not found.");
      return;
    }

    if (newParent && newParent.id !== draggedLink.parentId) {
      if (oldParent) {
        oldParent.children = oldParent.children.filter(
          (child) => child.id !== active.id
        );
      }

      newParent.children.push({ ...draggedLink, parentId: newParent.id });

      setLinks([...links]);
      return;
    }

    if (oldParent) {
      const oldIndex = oldParent.children.findIndex(
        (child: Link) => child.id === active.id
      );
      const newIndex = oldParent.children.findIndex(
        (child: Link) => child.id === over.id
      );

      const updatedChildren = arrayMove(oldParent.children, oldIndex, newIndex);

      oldParent.children = updatedChildren;

      setLinks([...links]);
    }
  };

  return {
    links,
    addLink,
    deleteLink,
    editLink,
    createGroup,
    handleDragLink,
  };
};
