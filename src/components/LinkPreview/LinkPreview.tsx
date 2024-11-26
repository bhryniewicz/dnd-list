import { FC, useState } from "react";
import { AddLinkForm } from "../AddLinkForm";
import { Link } from "@/types";
import Dnd from "@/assets/dnd.svg";
import Image from "next/image";
import { useLinksContext } from "@/contexts";

interface LinkPreviewProps {
  name: string;
  link: string;
  id: string;
  nestingLevel: number;
  parentId: string | null;
  children: Array<Link>;
}

export const LinkPreview: FC<LinkPreviewProps> = ({
  name,
  link,
  nestingLevel,
  parentId,
  children,
}) => {
  const { deleteLink } = useLinksContext();

  const [showParentForm, setShowParentForm] = useState<boolean>(false);
  const [showChildForm, setShowChildForm] = useState<boolean>(false);

  const nestingMarginStyle = {
    marginLeft: `${30 * nestingLevel}px`,
  };

  return (
    <li
      className={` border-[#D0D5DD] ${
        nestingLevel === 0
          ? "rounded-lg mb-9 border-[1px] border-solid"
          : "rounded-bl-lg border-b-[1px] border-l-[1px]"
      }`}
      style={nestingMarginStyle}
    >
      <div className="bg-white px-6 pt-4 rounded-t-lg border-b-[1px] border-[#D0D5DD]">
        <div className="flex gap-3.5 items-center pb-4 bg-white">
          <Image width="20" height="20" src={Dnd} alt="drag and drop icon" />
          <div className="grow gap-y-2">
            <h3 className="text-[#101828] text-sm font-semibold leading-5">
              {name}
            </h3>
            <p className="text-[#475467] text-sm leading-5">{link}</p>
          </div>
          <div className="flex rounded-lg shadow-3xl text-sm text-[#344054] font-semibold border border-solid border-[#D0D5DD] divide-x divide-[#D0D5DD]">
            <button className="py-2 px-4" onClick={() => deleteLink(parentId)}>
              Usuń
            </button>
            <button className="py-2 px-4" onClick={() => console.log("edit")}>
              Edytuj
            </button>
            <button
              className="py-2 px-4"
              onClick={() => setShowChildForm(true)}
            >
              Dodaj pozycję menu
            </button>
          </div>
        </div>
      </div>

      <ul className="bg-[#F9FAFB]">
        {children?.map((link) => (
          <LinkPreview
            key={link.id}
            {...link}
            parentId={link.id}
            nestingLevel={nestingLevel + 1}
          />
        ))}
      </ul>
      {showParentForm && (
        <div className="px-6 bg-[#F9FAFB] py-5">
          <AddLinkForm parentId={null} nestingLevel={nestingLevel} />
        </div>
      )}
      {showChildForm && (
        <div className="px-6 bg-[#F9FAFB] py-5">
          <AddLinkForm parentId={parentId} nestingLevel={nestingLevel} />
        </div>
      )}
      {nestingLevel === 0 && (
        <div className="py-5 bg-[#f5f5f5] px-6 rounded-b-lg">
          <button
            className="text-[#344054] text-sm font-semibold shadow-3xl border-[1px] border-solid border-[#D0D5DD] rounded-lg py-2.5 px-3.5 bg-white"
            onClick={() => setShowParentForm(true)}
          >
            Dodaj pozycję menu
          </button>
        </div>
      )}
    </li>
  );
};
