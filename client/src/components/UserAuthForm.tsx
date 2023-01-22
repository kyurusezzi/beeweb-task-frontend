import { FC } from "react";
import { useForm } from "react-hook-form";

import { Button, Typography, Box } from "@mui/material";

import ThemedTextField, { ThemedTextFieldProps } from "./ThemedTextField";

interface Props {
  formTitle: string;
  fieldsConfigs: ThemedTextFieldProps[];
  buttonText: string;
  buttonClickHandler?: (data: any) => void;
}

const UserAuthForm: FC<Props> = ({
  fieldsConfigs,
  formTitle,
  buttonText,
  buttonClickHandler,
}) => {
  const formMethods = useForm();

  const handleSubmit = () => {
    const data: any = formMethods.getValues();
    buttonClickHandler?.(data);
  };

  return (
    <Box
      flexDirection="column"
      alignItems="center"
      sx={{
        mt: 20,
        display: "flex",
      }}
      component="form"
      noValidate
    >
      <Typography variant="h3" component="div">
        {formTitle}
      </Typography>

      {fieldsConfigs.map((fieldConfig) => (
        <ThemedTextField
          {...fieldConfig}
          key={fieldConfig.name}
          register={formMethods.register}
        />
      ))}
      <Button variant="contained" onClick={handleSubmit}>
        {buttonText}
      </Button>
    </Box>
  );
};

export default UserAuthForm;
