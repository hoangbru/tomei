import { Fragment } from "react";
import { Controller } from "react-hook-form";

import { cn } from "@/lib/utils";
import FormError from "./form-error";

const Input = ({
  className,
  control,
  name,
  loading,
  rules,
  error,
  ...inputProps
}: any) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, formState: { errors } }) => {
        return (
          <div className="w-full flex flex-col justify-center items-center gap-2">
            <input
              {...field}
              {...inputProps}
              disabled={loading}
              className={cn(
                `w-[50%] rounded-md bg-neutral-200 px-3 py-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-gray-400`,
                errors[name] &&
                  `focus:ring-red-500`
              )}
            />
            {errors[name] && (
              <FormError error={errors[name]?.message as string} />
            )}
          </div>
        );
      }}
    />
  );
};

export default Input;
