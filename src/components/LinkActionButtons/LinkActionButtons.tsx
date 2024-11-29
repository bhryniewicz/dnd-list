import { FC } from "react";

import { useCurrentFormContext, useLinksContext } from "@/contexts";

import { LinkForm } from "../../screens/Home/components/LinkForm/LinkForm";
import { LinkPreviewProps } from "../LinkPreview";

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
            <LinkForm
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
            <LinkForm parentId={parentId} nestingLevel={nestingLevel} />
          )
        }
      >
        Dodaj pozycję menu
      </button>
    </div>
  );
};
