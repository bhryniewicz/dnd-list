import { useLinksContext } from "@/contexts";
import { Link } from "@/types";
import { FC, SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { FormValues, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddLinkFormProps {
  parentId?: string | null;
  onAdd: (value: Link) => void;
}

export const AddLinkForm: FC<AddLinkFormProps> = ({ parentId, onAdd }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    onAdd(parentId, {
      id: crypto.randomUUID(),
      name: data.name,
      link: data.link,
      parentId: parentId,
      children: [],
    });
  };

  return (
    <form className="mb-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor="name">Nazwa</label>
        <input
          {...register("name")}
          id="name"
          placeholder="np. Promocje"
          name="name"
          className="px-3 py-2 rounded-lg"
        />
        {Boolean(errors.name) && errors.name?.message}
      </div>
      <div className="flex flex-col">
        <label htmlFor="link">Nazwa</label>
        <input
          {...register("link")}
          id="link"
          placeholder="Wklej lub wyszukaj"
          name="link"
        />
        <p>{Boolean(errors.link) && errors.link?.message}</p>
      </div>
      <div>
        <button type="reset" className="px-4">
          anuluj
        </button>
        <button type="submit">dodaj</button>
      </div>
    </form>
  );
};
