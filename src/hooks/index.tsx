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
} from "./useAuth2";

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
export { useLogin, useIsAuthenticated, useUserData, useLogout };
