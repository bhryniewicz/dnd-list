import { FC, ReactNode, useState } from "react";
import { AddLinkForm } from "../AddLinkForm";
import { useLinksContext } from "@/contexts";
import { Link } from "@/types";

interface LinkPreviewProps {
  name: string;
  link: string;
  parentId: string | undefined;
  children: Array<Link>;
  onAdd: (value: Link) => void;
}

export const LinkPreview: FC<LinkPreviewProps> = ({
  name,
  link,
  parentId,
  onAdd,
  children,
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <li className="border-white border-2 border-solid mb-8">
      <p>
        Name: <strong>{name}</strong>
      </p>
      <p>
        Link: <strong>{link}</strong>
      </p>

      <ul>
        {children?.map((link) => {
          return (
            <LinkPreview
              key={link.id}
              {...link}
              parentId={link.id}
              onAdd={onAdd}
            />
          );
        })}
      </ul>
      <button onClick={() => setShowForm(true)}>Dodaj pozycję menu</button>
      {showForm && <AddLinkForm parentId={parentId} onAdd={onAdd} />}
    </li>
  );
};
