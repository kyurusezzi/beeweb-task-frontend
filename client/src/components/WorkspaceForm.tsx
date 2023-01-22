import React, { FC } from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import ThemedTextField, { ThemedTextFieldProps } from "./ThemedTextField";

interface Props {
  formTitle: string;
  fieldsConfigs: ThemedTextFieldProps[];
  buttonText: string;
  buttonClickHandler?: (data: any) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkspaceForm: FC<Props> = ({
  fieldsConfigs,
  formTitle,
  buttonText,
  buttonClickHandler,
  isOpen,
  setIsOpen,
}) => {
  const formMethods = useForm();

  const handleSubmit = () => {
    const data: any = formMethods.getValues();
    buttonClickHandler?.(data);
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>{formTitle}</DialogTitle>
      <DialogContent>
        {fieldsConfigs.map((fieldConfig) => (
          <ThemedTextField
            {...fieldConfig}
            key={fieldConfig.name}
            register={formMethods.register}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>{buttonText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkspaceForm;
