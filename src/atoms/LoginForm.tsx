import { useContext } from "react";
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
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as ReactLink } from "react-router-dom";
import { useAuth, useLogin } from "hooks";
import { AuthContext } from "services/AuthContext";

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
  //const { loginUser, authError, authLoading } = useAuth();
  const loginMutate = useLogin();
  /*   const { auth } = useContext(AuthContext);
  console.log("Auth", auth); */

  const { register, handleSubmit, formState } = useForm<LoginFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: LoginFormInputs) => {
    loginMutate.mutate(values);
  };

  return (
    <>
      {/*  {loginMutate.isError !== "" && (
        <Alert status="error">
          {" "}
          <AlertIcon />
          {login}{" "}
        </Alert>
      )} */}
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
        isLoading={loginMutate.isLoading}
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
