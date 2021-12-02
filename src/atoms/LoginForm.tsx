import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  HStack,
  Input,
  Button,
  Link,
  Alert,
  AlertIcon,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as ReactLink, useHistory } from "react-router-dom";
import { useAuth } from "hooks";
import { AuthContext, AuthContextType } from "services/AuthContext";

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(8)
    .required(),
});

export type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { loginUser, authError, authLoading, verifyUser } = useAuth();
  const history = useHistory();
  //const [error, setError] = useState("");
  //const { state, setState } = useContext(AuthContext);

  /* const isAuthenticated = async () => {
    if (await verifyUser()) {
      history.replace("/sd");
    }
  }; */

  /*  useEffect(() => {
    isAuthenticated();
    return () => {
      isAuthenticated();
    };
  }, []); */

  const { register, handleSubmit, formState } = useForm<LoginFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: LoginFormInputs) => {
    loginUser(values);
  };

  return (
    <>
      {authError !== "" && (
        <Alert status="error">
          {" "}
          <AlertIcon />
          {authError}{" "}
        </Alert>
      )}
      <FormControl
        isInvalid={!!formState.errors?.email?.message}
        errortext={formState.errors?.email?.message}
        my="6"
        isRequired
      >
        <FormLabel>Email</FormLabel>
        <Input
          {...register("email")}
          type="email"
          name="email"
          placeholder="Email"
        />
        <FormErrorMessage>{formState.errors?.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={!!formState.errors?.password?.message}
        errortext={formState.errors?.password?.message}
        my="6"
        isRequired
      >
        <FormLabel>Password</FormLabel>
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
          name="password"
        />
        <FormErrorMessage>
          {formState.errors?.password?.message}
        </FormErrorMessage>
      </FormControl>

      <Stack spacing={6} textAlign="right">
        <Link color={"primary.500"}>Forgot password?</Link>
      </Stack>
      <Button
        onClick={handleSubmit(onSubmit)}
        mt="6"
        w="100%"
        colorScheme={"primary"}
        variant={"solid"}
        isLoading={authLoading}
        disabled={!!formState.errors.email || !!formState.errors.password}
      >
        Login
      </Button>

      <HStack justifyContent="center">
        <Text color={"primary.500"}> New user ?</Text>{" "}
        <Link as={ReactLink} to="/signup" color={"primary.700"}>
          {" "}
          Get started here
        </Link>
      </HStack>
    </>
  );
};

export default LoginForm;
