import { TextField } from "@mui/material";
import { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export interface ThemedTextFieldProps {
  name: string;
  type?: string;
  isRequired?: boolean;
  label?: string;
  register?: UseFormRegister<FieldValues>;
  changeHandler?: (event: any) => void;
}

const ThemedTextField: FC<ThemedTextFieldProps> = ({
  name,
  type = "text",
  isRequired = false,
  label,
  register,
  changeHandler,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      required={isRequired}
      sx={{
        width: 250,
        m: 2,
      }}
      autoComplete="off"
      {...register?.(name, { onChange: changeHandler })}
    />
  );
};

export default ThemedTextField;
