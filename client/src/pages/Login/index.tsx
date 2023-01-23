import { Stack } from "@mui/material";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserAuthForm from "../../components/UserAuthForm";

import { authService } from "../../services/auth.service";
import { LoginRequestDto } from "../../services/interfaces/auth.interface";

const Login: FC = () => {
  const navigate = useNavigate();

  const loginHandler = async (data: LoginRequestDto) => {
    const { success, user } = await authService.login(data);
    if (success) {
      navigate("/workspaces", { state: { user } });
    }
  };

  return (
    <Stack spacing={5} direction="column" alignItems="center">
      <UserAuthForm
        fieldsConfigs={[
          { name: "email", type: "email", isRequired: true, label: "Email" },
          {
            name: "password",
            type: "password",
            isRequired: true,
            label: "Password",
          },
        ]}
        formTitle={"Login"}
        buttonText="LOGIN"
        buttonClickHandler={loginHandler}
      />

      <Link to={"/signup"}>Create an account.</Link>
    </Stack>
  );
};

export default Login;
