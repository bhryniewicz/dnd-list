import { useLinksContext } from "@/contexts";
import { Link } from "@/types";
import { FC, SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { FormValues, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import BinIcon from "@/assets/bin.svg";
import Image from "next/image";
import { Button } from "../Button";

interface AddLinkFormProps {
  parentId: string | null;
  nestingLevel: number;
}

export const AddLinkForm: FC<AddLinkFormProps> = ({
  parentId = null,
  nestingLevel,
}) => {
  const { addLink } = useLinksContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = ({ name, link }: FormValues) => {
    addLink(parentId, {
      id: crypto.randomUUID(),
      name,
      link,
      parentId,
      nestingLevel,
      children: [],
    });

    reset();
  };

  return (
    <form
      className="mb-4 flex flex-col px-6 py-5 bg-white rounded-lg border-[1px] border-[#D0D5DD] border-solid"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-4">
        <div className="flex flex-col grow gap-2">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-[#344054] text-sm font-medium leading-5 mb-1.5"
            >
              Nazwa
            </label>
            <input
              {...register("name")}
              id="name"
              placeholder="np. Promocje"
              name="name"
              className="px-3 py-2 rounded-lg border-[1px] border-solid border-[#D0D5DD] text-[#667085] placeholder-[#667085] shadow-3xl
              "
            />
            <p className="text-xs text-[#de3a5b] mt-1">
              {Boolean(errors.name) && errors.name?.message}
            </p>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="link"
              className="text-[#344054] text-sm font-medium leading-5 mb-1.5"
            >
              Link
            </label>
            <input
              {...register("link")}
              id="link"
              placeholder="Wklej lub wyszukaj"
              name="link"
              className="px-3 py-2 rounded-lg border-[1px] border-solid border-[#D0D5DD] text-[#667085] placeholder-[#667085] shadow-3xl"
            />
            <p className="text-xs text-[#de3a5b] mt-1">
              {Boolean(errors.link) && errors.link?.message}
            </p>
          </div>
        </div>
        <Image
          width="15"
          height="15"
          src={BinIcon}
          alt="bin icon"
          className="self-start cursor-pointer"
        />
      </div>

      <div className="flex gap-2 mt-5">
        <Button
          type="reset"
          variant="secondary"
          onClick={() => console.log("anuluj")}
        >
          Anuluj
        </Button>
        <Button type="submit" variant="primary">
          Dodaj
        </Button>
      </div>
    </form>
  );
};
