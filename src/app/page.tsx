"use client";

import { GroupForm } from "@/components/GroupForm";
import { GroupPreview } from "@/components/GroupPreview/GroupPreview";
import { NoLinks } from "@/components/NoLinks";
import { CurrentFormProvider, useLinksContext } from "@/contexts";
import { useState } from "react";

export default function Home() {
  const [showInitialForm, setShowInitialForm] = useState<boolean>(false);
  const { links } = useLinksContext();

  return (
    <div>
      <NoLinks setShowInitialForm={setShowInitialForm} />
      {showInitialForm && (
        <CurrentFormProvider>
          <GroupForm />
        </CurrentFormProvider>
      )}
      <div className="mt-4">
        {links.map(({ id, children }) => (
          <CurrentFormProvider key={id}>
            <GroupPreview id={id} children={children} />
          </CurrentFormProvider>
        ))}
      </div>
    </div>
  );
}
