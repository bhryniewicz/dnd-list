import { ReactNode, useState } from "react";

export const useCurrentForm = () => {
  const [currentForm, setCurrentForm] = useState<ReactNode>(null);

  return { currentForm, setCurrentForm };
};
