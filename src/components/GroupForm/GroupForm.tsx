import { useLinksContext } from "@/contexts";
import { Form } from "../Form/Form";
import { FormValues } from "../Form/schema";

export const GroupForm = () => {
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

  return <Form onSubmit={onSubmit} />;
};
