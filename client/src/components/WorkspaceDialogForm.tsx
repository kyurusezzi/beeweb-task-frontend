import React, { FC } from "react";
import { useForm } from "react-hook-form";

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import ThemedTextField, { ThemedTextFieldProps } from "./ThemedTextField";

interface Props {
  formTitle: string;
  fieldsConfigs: ThemedTextFieldProps[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText: string;
  buttonClickHandler?: (data: any) => void;
  changeHandler?: (event: any) => void;
  suggestedSubdomains?: string[];
}

const WorkspaceDialogForm: FC<Props> = ({
  fieldsConfigs,
  formTitle,
  buttonText,
  buttonClickHandler,
  isOpen,
  setIsOpen,
  changeHandler,
  suggestedSubdomains,
}) => {
  const formMethods = useForm();

  const handleSubmit = () => {
    const data: any = formMethods.getValues();
    buttonClickHandler?.(data);
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle textAlign="center">{formTitle}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {fieldsConfigs.map((fieldConfig) => {
            if (fieldConfig.name === "subdomain")
              return (
                <Box
                  key={fieldConfig.name}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <ThemedTextField
                    {...fieldConfig}
                    register={formMethods.register}
                    changeHandler={changeHandler}
                  />
                  {suggestedSubdomains?.map((subdomain) => (
                    <Chip key={subdomain} label={subdomain} sx={{ mt: 1 }} />
                  ))}
                </Box>
              );
            return (
              <ThemedTextField
                {...fieldConfig}
                key={fieldConfig.name}
                register={formMethods.register}
              />
            );
          })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            !formMethods.getValues().subdomain || suggestedSubdomains?.length
              ? true
              : false
          }
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkspaceDialogForm;
