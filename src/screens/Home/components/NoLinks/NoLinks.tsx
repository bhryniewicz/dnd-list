import Image from "next/image";
import { FC } from "react";

import PlusCircleIcon from "@/assets/plusCircle.svg";
import { Button } from "@/components/Button";

type NoLinksProps = {
  setShowInitialForm: (value: boolean) => void;
};

export const NoLinks: FC<NoLinksProps> = ({ setShowInitialForm }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full border border-solid border-border-noLinks bg-background-secondary mb-8 py-7">
      <h1 className="font-semibold leading-6 text-font-title">
        Menu jest puste
      </h1>
      <p className="text-sm text-font-subtitle mb-6">
        W tym menu nie ma jeszcze żadnych linków.
      </p>
      <Button variant="contained" onClick={() => setShowInitialForm(true)}>
        <Image
          alt="plus cirlce icon"
          width={20}
          height={20}
          src={PlusCircleIcon}
        />
        Dodaj pozycję menu
      </Button>
    </div>
  );
};
