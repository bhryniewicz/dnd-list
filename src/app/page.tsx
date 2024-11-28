"use client";

import { AddGroupForm } from "@/components/AddGroupForm/AddGroupForm";
import { GroupPreview } from "@/components/GroupPreview/GroupPreview";
import { CurrentFormProvider, useLinksContext } from "@/contexts";
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
        <CurrentFormProvider key={id}>
          <GroupPreview id={id} children={children} />
        </CurrentFormProvider>
      ))}
    </div>
  );
}
