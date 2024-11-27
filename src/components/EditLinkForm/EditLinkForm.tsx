import { useLinksContext } from "@/contexts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FormValues, schema } from "../AddLinkForm/schema";
import { Button } from "../Button";

interface EditLinkProps {
  name: string;
  link: string;
  parentId: string | null;
}

export const EditLinkForm: FC<EditLinkProps> = ({ name, link, parentId }) => {
  const { editLink } = useLinksContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      name,
      link,
    },
  });

  const onSubmit = ({ link, name }: FormValues) => {
    editLink(parentId, { link, name });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("name")} />

      <input type="text" {...register("link")} />

      <Button variant="secondary" type="submit">
        Edytuj
      </Button>
    </form>
  );
};
