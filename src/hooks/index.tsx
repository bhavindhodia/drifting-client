import useAuth from "./useAuth";
import useFindUser from "./useFindUser";

import {
  useGetAppointment,
  usePostAppointment,
  useGetStudentList,
  useUpdateAppointment,
  useDeleteAppointment,
} from "./useTeachersAppointment";
import { useGetPayments, useSingleRefund } from "./usePayments";
import {
  useLogin,
  useIsAuthenticated,
  useUserData,
  useLogout,
  useProfileUpdate,
  useResetPassword,
} from "./useAuth2";

import { usePaymentIntent } from "./usePayment";
import { useGetMeet } from "./useMeetings";
import { useAppointmentStats } from "./useStats";
export {
  useAuth,
  useFindUser,
  useGetAppointment,
  usePostAppointment,
  useGetStudentList,
  useUpdateAppointment,
  useDeleteAppointment,
};
export { useGetPayments, useSingleRefund };
export {
  useLogin,
  useIsAuthenticated,
  useUserData,
  useLogout,
  useProfileUpdate,
  useResetPassword,
};

export { usePaymentIntent };
export { useGetMeet };
export { useAppointmentStats };
