import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { FC } from "react";
import { useForm } from "react-hook-form";

import BinIcon from "@/assets/bin.svg";
import { useCurrentFormContext } from "@/contexts";

import { Button } from "../Button";
import { FormValues, schema } from "./schema";

type FormProps = {
  onSubmit: ({ link, name }: FormValues) => void;
  formValues?: {
    link: string;
    name: string;
  };
};

export const Form: FC<FormProps> = ({
  onSubmit,
  formValues = { link: "", name: "" },
}) => {
  const { setCurrentForm } = useCurrentFormContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: formValues,
  });

  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data);
    reset();
    setCurrentForm(null);
  };

  return (
    <form
      className="flex flex-col px-6 py-5 bg-white rounded-lg border-[1px] border-[#D0D5DD] border-solid"
      onSubmit={handleSubmit(handleFormSubmit)}
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
              autoComplete="off"
              name="name"
              className="px-3 py-2 rounded-lg border-[1px] border-solid border-[#D0D5DD] text-[#667085] placeholder-[#667085] outline-none shadow-3xl"
              value={watch("name")}
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
              autoComplete="off"
              placeholder="Wklej lub wyszukaj"
              name="link"
              className="px-3 py-2 rounded-lg border-[1px] border-solid border-[#D0D5DD] text-[#667085] outline-none placeholder-[#667085] shadow-3xl"
              value={watch("link")}
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
          onClick={() => setCurrentForm(null)}
        />
      </div>

      <div className="flex gap-2 mt-5">
        <Button
          type="reset"
          variant="primary"
          onClick={() => {
            setCurrentForm(null);
            reset();
          }}
        >
          Anuluj
        </Button>
        <Button type="submit" variant="secondary">
          {formValues.name ? "Edytuj" : "Dodaj"}
        </Button>
      </div>
    </form>
  );
};
