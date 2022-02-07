import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Button,
  Link,
  Text,
  HStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as ReactLink } from "react-router-dom";

import { useRegister } from "hooks/useAuth";
const schema = yup.object().shape({
  name: yup
    .string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  username: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Required"),
  password: yup
    .string()
    .min(8, "Must be 8 characters or more")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export type SignupFormInputs = {
  email: string;
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export default ({ title }: { title: string }) => {
  const { register, handleSubmit, formState } = useForm<SignupFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");
  const registerMutate = useRegister();

  const onSubmit = async (values: SignupFormInputs) => {
    registerMutate.mutate(values);
  };

  return (
    <>
      {error !== "" && (
        <Alert status="error">
          {" "}
          <AlertIcon />
          {error}{" "}
        </Alert>
      )}
      <Heading fontSize={"2xl"}>{title}</Heading>

      <FormControl
        isInvalid={!!formState.errors?.name?.message}
        errortext={formState.errors?.name?.message}
        my="6"
        isRequired
      >
        <FormLabel>Full Name</FormLabel>
        <Input
          {...register("name")}
          type="name"
          name="name"
          placeholder="Full Name"
        />
        <FormErrorMessage>{formState.errors?.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={!!formState.errors?.username?.message}
        errortext={formState.errors?.username?.message}
        my="6"
        isRequired
      >
        <FormLabel>Username</FormLabel>
        <Input
          {...register("username")}
          type="username"
          name="username"
          placeholder="Username"
        />
        <FormErrorMessage>
          {formState.errors?.username?.message}
        </FormErrorMessage>
      </FormControl>
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
      <FormControl
        isInvalid={!!formState.errors?.confirmPassword?.message}
        errortext={formState.errors?.confirmPassword?.message}
        my="6"
        isRequired
      >
        <FormLabel>Confirm Password</FormLabel>
        <Input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
        />
        <FormErrorMessage>
          {formState.errors?.confirmPassword?.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        onClick={handleSubmit(onSubmit)}
        mt="6"
        w="100%"
        colorScheme={"primary"}
        variant={"solid"}
        isLoading={registerMutate.isLoading}
        disabled={
          !!formState.errors.name ||
          !!formState.errors.username ||
          !!formState.errors.password ||
          !!formState.errors.password
          // registerMutate.isLoading
        }
      >
        Signup
      </Button>

      <HStack mt="4" spacing={2} textAlign="right">
        <Text color={"primary.500"}> Already a user ?</Text>{" "}
        <Link as={ReactLink} to="/login" color={"primary.700"}>
          {" "}
          Login Here
        </Link>
      </HStack>
    </>
  );
};
