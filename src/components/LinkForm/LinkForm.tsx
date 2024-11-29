import { FC } from "react";

import { useLinksContext } from "@/contexts";
import { LinkParentId } from "@/types";

import { Form } from "../Form/Form";
import { FormValues } from "../Form/schema";

type LinkFormProps = {
  name?: string;
  link?: string;
  parentId: LinkParentId;
  nestingLevel?: number;
};

export const LinkForm: FC<LinkFormProps> = ({
  name = "",
  link = "",
  parentId,
  nestingLevel = 0,
}) => {
  const { addLink, editLink } = useLinksContext();

  const formValues = {
    name,
    link,
  };

  const onSubmit = ({ name, link }: FormValues) => {
    formValues.name === "" && formValues.link === ""
      ? addLink(parentId, {
          id: crypto.randomUUID(),
          name,
          link,
          parentId,
          nestingLevel,
          children: [],
        })
      : editLink(parentId, { link, name });
  };

  return <Form onSubmit={onSubmit} formValues={formValues} />;
};
