import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
} from "@chakra-ui/modal";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useProfileUpdate } from "hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserDataType } from "hooks/useAuth2";

type ProfileModalType = {
  userData:
    | {
        success: boolean;
        user: UserDataType;
      }
    | undefined;
  isOpen: boolean;
  onClose: () => void;
};
export type ProfileFormInputs = {
  email: string;
  username: string;
  name: string;
};

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
});

const ProfileModal = ({ userData, isOpen, onClose }: ProfileModalType) => {
  const profileMutate = useProfileUpdate();
  const { register, handleSubmit, formState } = useForm<ProfileFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      name: userData !== undefined ? userData.user.name : "bvn",
      email: userData?.user.email,
      username: userData?.user.username,
    },
  });

  const onSubmit = async (values: ProfileFormInputs) => {
    profileMutate.mutate(values);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
            <FormErrorMessage>
              {formState.errors?.name?.message}
            </FormErrorMessage>
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
            <FormErrorMessage>
              {formState.errors?.email?.message}
            </FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button mr={2} variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            colorScheme="blue"
            mr={3}
            disabled={
              !!formState.errors.name ||
              !!formState.errors.username ||
              !!formState.errors.email
            }
          >
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
