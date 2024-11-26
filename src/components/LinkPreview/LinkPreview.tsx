import { FC, ReactNode, useState } from "react";
import { AddLinkForm } from "../AddLinkForm";
import { useLinksContext } from "@/contexts";
import { Link } from "@/types";
import Dnd from "@/assets/dnd.svg";
import Image from "next/image";

interface LinkPreviewProps {
  name: string;
  link: string;
  nestingLevel: number;
  parentId: string | undefined;
  children: Array<Link>;
}

export const LinkPreview: FC<LinkPreviewProps> = ({
  name,
  link,
  nestingLevel,
  parentId,
  children,
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  console.log(nestingLevel, "par");

  const nestingMarginStyle = {
    marginLeft: `${30 * nestingLevel}px`,
  };

  return (
    <li
      className={`border-[1px] border-solid border-[#D0D5DD] rounded-lg mb-9`}
      style={{ ...nestingMarginStyle }}
    >
      <div className="bg-white px-6 pt-4 rounded-t-lg">
        <div className="flex gap-3.5 items-center pb-4 bg-white">
          <Image width="20" height="20" src={Dnd} alt="drag and drop icon" />
          <div className="grow gap-y-2">
            <h3 className="text-[#101828] text-sm font-semibold leading-5">
              {name}
            </h3>
            <p className="text-[#475467] text-sm leading-5">{link}</p>
          </div>
          <div className="flex rounded-lg shadow-3xl py-2.5 px-4 text-sm text-[#344054] font-semibold border border-solid border-[#D0D5DD] divide-x divide-[#D0D5DD]">
            <button className="" onClick={() => console.log("del")}>
              Usuń
            </button>
            <button className="" onClick={() => console.log("edit")}>
              Edytuj
            </button>
            <button className="" onClick={() => console.log("new")}>
              Dodaj pozycję menu
            </button>
          </div>
        </div>
      </div>

      <ul>
        {children?.map((link) => {
          return <LinkPreview key={link.id} {...link} parentId={link.id} />;
        })}
      </ul>
      {showForm && (
        <div className="px-6 bg-[#F9FAFB] py-5 border-[1px] border=[#EAECF0] border-solid">
          <AddLinkForm parentId={parentId} nestingLevel={nestingLevel} />
        </div>
      )}
      <div className="py-5 bg-[#f5f5f5] px-6 rounded-b-lg">
        <button
          className="text-[#344054] text-sm font-semibold shadow-3xl border-[1px] border-solid border-[#D0D5DD] rounded-lg py-2.5 px-3.5 bg-white"
          onClick={() => setShowForm(true)}
        >
          Dodaj pozycję menu
        </button>
      </div>
    </li>
  );
};
