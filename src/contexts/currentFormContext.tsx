"use client";

import { useCurrentForm } from "@/hooks/useCurrentForm";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface CurrentFormContextType {
  currentForm: ReactNode;
  setCurrentForm: (value: ReactNode) => void;
}

const CurrentFormContext = createContext<CurrentFormContextType | undefined>(
  undefined
);

export const CurrentFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { currentForm, setCurrentForm } = useCurrentForm();

  return (
    <CurrentFormContext.Provider value={{ currentForm, setCurrentForm }}>
      {children}
    </CurrentFormContext.Provider>
  );
};

export const useCurrentFormContext = (): CurrentFormContextType => {
  const context = useContext(CurrentFormContext);

  if (!context) {
    throw new Error(
      "useCurrentFormContext must be used within a LinksProvider"
    );
  }

  return context;
};
