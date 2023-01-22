import { Stack } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import UserAuthForm from "../../components/UserAuthForm";
import { authService } from "../../services/auth.service";
import { SignUpRequestDto } from "../../services/interfaces/auth.interface";

const SignUp: FC = () => {
  return (
    <Stack spacing={5} direction="column" alignItems="center">
      <UserAuthForm
        fieldsConfigs={[
          { name: "fullName", isRequired: true, label: "Full Name" },
          { name: "email", type: "email", isRequired: true, label: "Email" },
          {
            name: "password",
            type: "password",
            isRequired: true,
            label: "Password",
          },
        ]}
        formTitle={"Sign Up"}
        buttonText="SIGN UP"
        buttonClickHandler={(data: SignUpRequestDto) => {
          authService.signUp(data);
        }}
      />
      <Link to={"/login"}>Already have an account?</Link>
    </Stack>
  );
};

export default SignUp;
