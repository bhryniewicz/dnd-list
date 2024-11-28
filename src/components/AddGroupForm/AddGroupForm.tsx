import { useLinksContext } from "@/contexts";
import { FormValues, schema } from "../AddLinkForm/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const AddGroupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("name")} id="name" />
      <input type="text" {...register("link")} id="link" />
      <button type="submit">dddd</button>
    </form>
  );
};
