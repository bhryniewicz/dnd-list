import { useCurrentFormContext } from "@/contexts";
import { Button } from "../Button";
import { LinkPreview } from "../LinkPreview";
import { Link } from "@/types";
import { FC } from "react";
import { LinkForm } from "../LinkForm/LinkForm";

type GroupPreviewProps = {
  id: string;
  children: Array<Link>;
};

export const GroupPreview: FC<GroupPreviewProps> = ({ id, children }) => {
  const { currentForm, setCurrentForm } = useCurrentFormContext();

  return (
    <div
      key={id}
      className="rounded-lg mb-9 border-[1px] border-solid shadow-3xl"
    >
      <ul>
        {children.map((link) => (
          <li key={link.id}>
            <LinkPreview {...link} nestingLevel={0} />
          </li>
        ))}
      </ul>

      {children.length > 0 && (
        <>
          {currentForm && (
            <div className="px-6 bg-[#F9FAFB] py-5">{currentForm}</div>
          )}
          <div className="py-5 bg-[#f5f5f5] px-6 rounded-b-lg">
            <Button
              variant="primary"
              onClick={() =>
                setCurrentForm(
                  <LinkForm
                    parentId={children[0].parentId}
                    nestingLevel={children[0].nestingLevel}
                  />
                )
              }
            >
              Dodaj pozycję menu
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
