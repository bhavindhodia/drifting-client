import { UseToastOptions, ToastId } from "@chakra-ui/react";

/* Toast Message */
const showToast = (
  toast: (options?: UseToastOptions | undefined) => ToastId | undefined,
  data: any,
  message?: string
) => {
  if (data.errorMessage) {
    toast({
      status: "error",
      isClosable: true,
      description: message ? message : data.errorMessage,
    });
  }

  if (data.success) {
    toast({
      status: "success",
      isClosable: true,
      description: message,
    });
  }
};
/* Toast MyMessage */
const showMyToast = (
  toast: (options?: UseToastOptions | undefined) => ToastId | undefined,
  type: UseToastOptions["status"],
  message: string
) => {
  toast({
    position: "top-right",
    status: type,
    isClosable: true,
    description: message,
  });
};

export { showMyToast };
export default showToast;
