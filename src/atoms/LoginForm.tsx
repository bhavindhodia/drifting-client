import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  HStack,
  Input,
  Button,
  Link,
  Text,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as ReactLink } from "react-router-dom";
import { useLogin } from "hooks";

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
  const loginMutate = useLogin();

  const { register, handleSubmit, formState } = useForm<LoginFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: LoginFormInputs) => {
    loginMutate.mutate(values);
  };

  return (
    <>
      <FormControl
        isInvalid={!!formState.errors?.email?.message}
        //errortext={formState.errors?.email?.message}
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
        //  errortext={formState.errors?.password?.message}
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
      {/* For Demo Login */}
      {/* <Text mt="2" color={"primary.500"}>
        Teachers Email : teacher1@gmail.com
      </Text>
      <Text color={"primary.500"}>Teachers Password : 12345678</Text>
      <Text color={"primary.500"}>Student Login : student1@gmail.com</Text>
      <Text color={"primary.500"}>Student Password : 12345678</Text> */}
      <HStack justifyContent="center">
        <Text color={"primary.500"}> New user ?</Text>{" "}
        <Link as={ReactLink} to="/register" color={"primary.700"}>
          {" "}
          Get started here
        </Link>
      </HStack>
    </>
  );
};

export default LoginForm;
