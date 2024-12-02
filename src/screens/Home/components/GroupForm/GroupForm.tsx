import { FC } from "react";

import { Form, FormValues } from "@/components/Form";
import { useLinksContext } from "@/contexts";

type GroupFormProps = {
  setShowInitialForm: (value: boolean) => void;
};

export const GroupForm: FC<GroupFormProps> = ({ setShowInitialForm }) => {
  const { createGroup } = useLinksContext();

  const onSubmit = ({ link, name }: FormValues) => {
    const parentId = `group-${crypto.randomUUID()}`;
    createGroup(parentId, {
      id: crypto.randomUUID(),
      name,
      link,
      parentId,
      nestingLevel: 0,
      children: [],
    });
  };

  return <Form onSubmit={onSubmit} setShowInitialForm={setShowInitialForm} />;
};
