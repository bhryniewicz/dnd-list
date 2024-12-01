import { useState } from "react";

import { CurrentFormProvider, useLinksContext } from "@/contexts";
import { GroupForm } from "@/screens/Home/components/GroupForm";
import { GroupPreview } from "@/screens/Home/components/GroupPreview/GroupPreview";
import { NoLinks } from "@/screens/Home/components/NoLinks";

export const Home = () => {
  const [showInitialForm, setShowInitialForm] = useState<boolean>(false);
  const { links } = useLinksContext();

  return (
    <>
      <NoLinks setShowInitialForm={setShowInitialForm} showInitialForm={showInitialForm} />
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
    </>
  );
};
