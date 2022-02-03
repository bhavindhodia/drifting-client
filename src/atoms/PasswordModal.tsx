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
import { useProfileUpdate, useResetPassword } from "hooks";
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
export type PasswordFormInputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(8, "Must be 8 characters or more")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  newPassword: yup
    .string()
    .min(8, "Must be 8 characters or more")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const PasswordModal = ({ userData, isOpen, onClose }: ProfileModalType) => {
  const profileMutate = useProfileUpdate();
  const passwordMutate = useResetPassword();
  const { register, handleSubmit, formState } = useForm<PasswordFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: PasswordFormInputs) => {
    passwordMutate.mutate(values);
    console.log("val", values);
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
            isInvalid={!!formState.errors?.currentPassword?.message}
            errortext={formState.errors?.currentPassword?.message}
            my="6"
            isRequired
          >
            <FormLabel>Current password</FormLabel>
            <Input
              {...register("currentPassword")}
              type="password"
              name="currentPassword"
              placeholder="Current Password"
            />
            <FormErrorMessage>
              {formState.errors?.currentPassword?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!formState.errors?.newPassword?.message}
            errortext={formState.errors?.newPassword?.message}
            my="6"
            isRequired
          >
            <FormLabel>New password</FormLabel>
            <Input
              {...register("newPassword")}
              type="password"
              name="newPassword"
              placeholder="New Password"
            />
            <FormErrorMessage>
              {formState.errors?.newPassword?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!formState.errors?.confirmPassword?.message}
            errortext={formState.errors?.confirmPassword?.message}
            my="6"
            isRequired
          >
            <FormLabel>Confirm password</FormLabel>
            <Input
              {...register("confirmPassword")}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            <FormErrorMessage>
              {formState.errors?.confirmPassword?.message}
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
              !!formState.errors.currentPassword ||
              !!formState.errors.newPassword ||
              !!formState.errors.confirmPassword
            }
          >
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PasswordModal;
