"use client";

import { AddGroupForm } from "@/components/AddGroupForm/AddGroupForm";
import { AddLinkForm } from "@/components/AddLinkForm/AddLinkForm";
import { Button } from "@/components/Button";
import { GroupPreview } from "@/components/GroupPreview/GroupPreview";
import { LinkPreview } from "@/components/LinkPreview";
import { NoLinks } from "@/components/NoLinks/NoLinks";
import { useCurrentFormContext, useLinksContext } from "@/contexts";
import { useState } from "react";

export default function Home() {
  const [showInitialForm, setShowInitialForm] = useState<boolean>(false);
  const { links } = useLinksContext();

  return (
    <div>
      <AddGroupForm />
      {/* <NoLinks setShowInitialForm={setShowInitialForm} /> */}
      {/* {showInitialForm && <AddLinkForm parentId={null} nestingLevel={0} />} */}
      {links.map(({ id, children }) => (
        <GroupPreview id={id} children={children} key={id} />
      ))}
    </div>
  );
}
