import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { FC } from "react";

import DndIcon from "@/assets/dnd.svg";
import { Link, LinkParentId } from "@/types";

import { LinkActionButtons } from "../LinkActionButtons/LinkActionButtons";

export type LinkPreviewProps = {
  name: string;
  link: string;
  id: string;
  nestingLevel: number;
  parentId: LinkParentId;
  children: Array<Link>;
};

export const LinkPreview: FC<LinkPreviewProps> = ({
  name,
  link,
  id,
  nestingLevel,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginLeft: `${30 * nestingLevel}px`,
  };

  return (
    <>
      <div
        className={`bg-white px-6 pt-4 border-l-[1px] border-b-[1px] border-border-primary
        ${nestingLevel === 0 ? "rounded-t-lg " : "rounded-b-lg"}`}
        style={{ ...style }}
      >
        <div className="flex gap-3.5 items-center pb-4 bg-white">
          <Image
            width="20"
            height="20"
            src={DndIcon}
            alt="drag and drop icon"
            ref={setNodeRef}
            {...attributes}
            {...listeners}
          />
          <div className="flex flex-col grow gap-1">
            <h3 className="text-font-title text-sm font-semibold leading-5">
              {name}
            </h3>
            <p className="text-font-subtitle text-sm leading-5">{link}</p>
          </div>
          <LinkActionButtons
            name={name}
            link={link}
            parentId={id}
            nestingLevel={nestingLevel}
          />
        </div>
      </div>

      <SortableContext
        items={children ? children.map((child) => child.id) : []}
        strategy={verticalListSortingStrategy}
      >
        <ul className="bg-background-primary">
          {children?.map((link) => (
            <LinkPreview
              key={link.id}
              {...link}
              parentId={link.id}
              nestingLevel={nestingLevel + 1}
            />
          ))}
        </ul>
      </SortableContext>
    </>
  );
};
