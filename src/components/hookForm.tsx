import React, { forwardRef, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { string, z } from "zod";

const InputSchema = z.object({
  login: z.string(),
  password: z.string(),
  age: z.number(),
  metadata: z.object({
    shoeNumber: z.number(),
    hairColor: z.string(),
  }),
});

type FormInputs = z.infer<typeof InputSchema>;

export default function HookFormula() {
  const { register, control, handleSubmit } = useForm<FormInputs>({
    resolver: zodResolver(InputSchema),
    defaultValues: {
      age: 0,
      login: "",
      metadata: {
        hairColor: "",
        shoeNumber: 0,
      },
      password: "",
    },
  });
  const divElement = useRef<HTMLDivElement>(null);
  return (
    <form onSubmit={handleSubmit(console.log)} className="flex flex-col">
      <input
        className="input input-bordered"
        type={"text"}
        {...register("login")}
      />
      <input
        className="input input-bordered"
        type="password"
        {...register("password")}
      />
      <div ref={divElement}>
        {/* <MetadataInput /> */}
        <Controller
          control={control}
          name="metadata"
          render={({ field }) => (
            <MetadataInput
              value={field.value}
              ref={field.ref}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <button className="btn btn-primary">Wyślij</button>
    </form>
  );
}

interface MetadataProps {
  onChange?: (value: Exclude<MetadataProps["value"], undefined>) => void;
  value?: {
    shoeNumber: number;
    hairColor: string;
  };
  name?: string;
}

const MetadataInput = forwardRef<HTMLDivElement, MetadataProps>(
  function MetadataInputRender(props, ref) {
    const defaultValues = {
      hairColor: "red",
      shoeNumber: 32,
    };
    const [values, setValues] = useState<
      Exclude<typeof props["value"], undefined>
    >(props.value ? props.value : defaultValues);
    const externalCallback = props.onChange ? props.onChange : () => {};

    const onChangeInputs = () => {
      console.log("change", values);
      externalCallback(values);
    };

    useEffect(() => {
      onChangeInputs();
    }, [values]);

    return (
      <div ref={ref}>
        <input
          className="input input-bordered"
          type={"text"}
          value={values.hairColor}
          onChange={(event) =>
            setValues((state) => ({
              ...state,
              hairColor: event.currentTarget.value,
            }))
          }
        />
        <input
          className="input input-bordered"
          type={"number"}
          value={values.shoeNumber}
          onChange={(event) =>
            setValues((state) => ({
              ...state,
              shoeNumber: +event.currentTarget.value,
            }))
          }
        />
      </div>
    );
  }
);
