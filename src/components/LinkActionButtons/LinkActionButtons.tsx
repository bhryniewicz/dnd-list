import { useCurrentFormContext, useLinksContext } from "@/contexts";
import { EditLinkForm } from "../EditLinkForm/EditLinkForm";
import { AddLinkForm } from "../AddLinkForm";
import { LinkPreviewProps } from "../LinkPreview";
import { FC } from "react";

type LinkActionButtons = Omit<LinkPreviewProps, "children" | "id">;

export const LinkActionButtons: FC<LinkActionButtons> = ({
  parentId,
  link,
  name,
  nestingLevel,
}) => {
  const { setCurrentForm } = useCurrentFormContext();
  const { deleteLink } = useLinksContext();

  return (
    <div className="flex rounded-lg shadow-3xl text-sm text-[#344054] font-semibold border border-solid border-[#D0D5DD] divide-x divide-[#D0D5DD]">
      <button className="py-2 px-4" onClick={() => deleteLink(parentId)}>
        Usuń
      </button>
      <button
        className="py-2 px-4"
        onClick={() =>
          setCurrentForm(
            <EditLinkForm
              parentId={parentId}
              link={link}
              name={name}
              key={parentId}
            />
          )
        }
      >
        Edytuj
      </button>
      <button
        className="py-2 px-4"
        onClick={() =>
          setCurrentForm(
            <AddLinkForm parentId={parentId} nestingLevel={nestingLevel} />
          )
        }
      >
        Dodaj pozycję menu
      </button>
    </div>
  );
};
