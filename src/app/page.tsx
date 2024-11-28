"use client";

import { AddGroupForm } from "@/components/AddGroupForm/AddGroupForm";
import { AddLinkForm } from "@/components/AddLinkForm/AddLinkForm";
import { Button } from "@/components/Button";
import { LinkPreview } from "@/components/LinkPreview";
import { NoLinks } from "@/components/NoLinks/NoLinks";
import { useCurrentFormContext, useLinksContext } from "@/contexts";
import { useState } from "react";

export default function Home() {
  const [showInitialForm, setShowInitialForm] = useState<boolean>(false);
  const { links } = useLinksContext();
  const { currentForm, setCurrentForm } = useCurrentFormContext();

  return (
    <div>
      <AddGroupForm />
      {/* <NoLinks setShowInitialForm={setShowInitialForm} /> */}
      {/* {showInitialForm && <AddLinkForm parentId={null} nestingLevel={0} />} */}
      {links.map((group) => (
        <div
          key={group.id}
          className="rounded-lg mb-9 border-[1px] border-solid shadow-3xl"
        >
          <ul>
            {group.children.map((link) => (
              <li key={link.id}>
                <LinkPreview
                  {...link}
                  parentId={link.parentId}
                  nestingLevel={0}
                />
              </li>
            ))}
          </ul>

          {group.children.length > 0 && (
            <>
              <div className="px-6 bg-[#F9FAFB] py-5">{currentForm}</div>
              <div className="py-5 bg-[#f5f5f5] px-6 rounded-b-lg">
                <Button
                  variant="primary"
                  onClick={() =>
                    setCurrentForm(
                      <AddLinkForm
                        parentId={group.children[0].parentId} // Use the first link for properties
                        nestingLevel={group.children[0].nestingLevel} // Adjust as needed
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
      ))}
    </div>
  );
}
