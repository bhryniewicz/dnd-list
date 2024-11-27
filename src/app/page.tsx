"use client";

import { AddLinkForm } from "@/components/AddLinkForm/AddLinkForm";
import { LinkPreview } from "@/components/LinkPreview";
import { NoLinks } from "@/components/NoLinks/NoLinks";
import { useLinksContext } from "@/contexts";
import { useState } from "react";

export default function Home() {
  const [showInitialForm, setShowInitialForm] = useState<boolean>(false);
  const { links } = useLinksContext();

  console.log(links.length);
  return (
    <div>
      <NoLinks setShowInitialForm={setShowInitialForm} />
      {showInitialForm && <AddLinkForm parentId={null} nestingLevel={0} />}
      <ul>
        {links.map((link) => {
          {
            return <LinkPreview key={link.id} {...link} parentId={link.id} />;
          }
        })}
      </ul>
    </div>
  );
}
