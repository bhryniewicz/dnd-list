import { FC, useState } from "react";
import { useCurrentFormContext, useLinksContext } from "@/contexts";
import { LinkForm } from "@/screens/Home/components/LinkForm/LinkForm";
import { LinkPreviewProps } from "../LinkPreview";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

type LinkActionButtons = Omit<LinkPreviewProps, "children" | "id">;

export const LinkActionButtons: FC<LinkActionButtons> = ({
  parentId,
  link,
  name,
  nestingLevel,
}) => {
  const { setCurrentForm } = useCurrentFormContext();
  const { deleteLink } = useLinksContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const menuButtonStyles = `
    py-2 px-4 text-left 
    hover:bg-background-accent 
    hover:text-white 
    ${isMenuOpen ? "bg-background-muted" : ""}
  `;

  return (
    <div className="relative">
      <HiOutlineDotsHorizontal
        onClick={toggleMenu}
        className="block md:hidden w-6 h-6 text-font-primary cursor-pointer"
      />
      <div className="hidden md:flex rounded-lg text-sm text-font-primary shadow-link font-semibold border border-solid border-border-primary divide-x divide-border-primary">
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
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-link border border-solid border-border-primary rounded-lg flex flex-col w-40 z-10">
          <button
            className={menuButtonStyles}
            onClick={() => {
              deleteLink(parentId);
              setIsMenuOpen(false);
            }}
          >
            Usuń
          </button>
          <button
            className={menuButtonStyles}
            onClick={() => {
              setCurrentForm(
                <LinkForm
                  parentId={parentId}
                  link={link}
                  name={name}
                  key={parentId}
                />
              );
              setIsMenuOpen(false);
            }}
          >
            Edytuj
          </button>
          <button
            className={menuButtonStyles}
            onClick={() => {
              setCurrentForm(
                <LinkForm parentId={parentId} nestingLevel={nestingLevel} />
              );
              setIsMenuOpen(false);
            }}
          >
            Dodaj pozycję menu
          </button>
          <button
            className="py-2 px-4 text-left"
            onClick={() => setIsMenuOpen(false)}
          >
            Anuluj
          </button>
        </div>
      )}
    </div>
  );
};
