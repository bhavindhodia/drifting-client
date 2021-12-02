import { useState, useContext } from "react";
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
import { AuthContext, AuthContextType } from "services/AuthContext";

import axios from "axios";
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
});

export type SignupFormInputs = {
  email: string;
  username: string;
  name: string;
  password: string;
};

export default ({ title }: { title: string }) => {
  const { register, handleSubmit, formState } = useForm<SignupFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const onSubmit = async (values: SignupFormInputs) => {
    console.log(values);
    setLoading(true);
    const singupURL = "/auth/signup/";

    try {
      const res = await axios.post(singupURL, values);

      setAuth((i: AuthContextType) => {
        return { ...i, token: res.data.token };
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        error.response?.status === 400
          ? setError("Please fill all the fields correctly!")
          : setError("Invalid email and password combination.");
      }
    } finally {
      setLoading(false);
    }
  };
  console.log("res", auth);
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

      <Button
        onClick={handleSubmit(onSubmit)}
        mt="6"
        w="100%"
        colorScheme={"primary"}
        variant={"solid"}
        disabled={
          !!formState.errors.name ||
          !!formState.errors.username ||
          !!formState.errors.password ||
          !!formState.errors.password
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
