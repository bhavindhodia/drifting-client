import { useState, ComponentType } from "react";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
  ChangeSet,
  AppointmentModel,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  WeekView,
  AppointmentTooltip,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  ViewSwitcher,
  DayView,
  ConfirmationDialog,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  useGetAppointment,
  usePostAppointment,
  useUpdateAppointment,
  useDeleteAppointment,
} from "hooks";
import { Spinner } from "@chakra-ui/spinner";
import { Center } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import CustomBasicLayout from "./CustomBasicLayout";
import CustomCommandLayout from "./CustomCommandLayout";
import { useToast } from "@chakra-ui/toast";
type CurrentStateType = {
  viewName: string;
  currentDate: Date;
};

const AppointmentLoading: ComponentType<Toolbar.RootProps> = ({
  children,
  ...restProps
}) => {
  return (
    <div style={{ position: "relative" }}>
      <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
      <Progress
        size={"sm"}
        isIndeterminate
        style={{ position: "absolute", width: "100%", bottom: 0, left: 0 }}
      />
    </div>
  );
};
const CustomAppointment: ComponentType<Appointments.AppointmentProps> = ({
  children,
  data,
  ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
    data={data}
    style={{
      backgroundColor: data?.readOnly ? "#d5d5d5" : "#01476B",
      borderRadius: "2px",
    }}
  >
    {children}
  </Appointments.Appointment>
);
const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
});
const toastId = "toastID";
const TeacherAppointments = () => {
  const [currentState, setCurrentState] = useState<CurrentStateType>({
    viewName: "Week",
    currentDate: new Date(),
  });
  const { data, error, isLoading, isFetching } = useGetAppointment(
    currentState.viewName,
    currentState.currentDate
  );

  const createAppointment = usePostAppointment();
  const updateAppointment = useUpdateAppointment();
  const deleteAppointment = useDeleteAppointment();

  const commitChanges = async ({ added, changed, deleted }: ChangeSet) => {
    if (added) {
      /* console.log("ADDED", added); */
      const appointmentData: AppointmentModel = {
        startDate: added.startDate,
        endDate: added.endDate,
        ...added,
      };
      createAppointment.mutate(appointmentData);
    }
    if (changed) {
      const appointmentID = Object.keys(changed).toString();
      const payload = changed[appointmentID];

      console.log("UPDATED", { id: appointmentID, ...payload });

      updateAppointment.mutate({ id: appointmentID, ...payload });
    }
    if (deleted) {
      console.log("deleted", deleted);
      deleteAppointment.mutate(deleted);
    }
  };

  const onDateChange: (currentDate: Date) => void = (currentDate) => {
    /* console.log("currentDate", currentDate); */
    setCurrentState((oldData) => ({ viewName: oldData.viewName, currentDate }));
    //setCurrentState({ viewName: "WEEK", currentDate });
  };
  const setCurrentViewName: (viewName: string) => void = (viewName) => {
    /* console.log("viewName", viewName); */
    setCurrentState((oldData) => ({
      viewName,
      currentDate: oldData.currentDate,
    }));
  };

  return isLoading ? (
    <Center py={6} minH={"80vh"}>
      <Spinner />
    </Center>
  ) : (
    <ThemeProvider theme={theme}>
      <Scheduler data={data.appointmentData} height={560}>
        <ViewState
          defaultCurrentViewName="Week"
          onCurrentDateChange={onDateChange}
          onCurrentViewNameChange={setCurrentViewName}
        />
        <MonthView />
        <WeekView startDayHour={8} endDayHour={13} />
        <DayView startDayHour={8} endDayHour={13} />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <Toolbar
          {...(isFetching || deleteAppointment.isLoading
            ? { rootComponent: AppointmentLoading }
            : null)}
        />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton />
        <Appointments appointmentComponent={CustomAppointment} />

        <AppointmentTooltip
          /*    contentComponent={Content}
        headerComponent={Header} */
          showOpenButton
          showDeleteButton
        />
        <ConfirmationDialog />
        <AppointmentForm
          basicLayoutComponent={CustomBasicLayout}
          commandLayoutComponent={CustomCommandLayout}
          /* basicLayoutComponent={BasicLayout}
        commandLayoutComponent={CommandLayout} */
        />
      </Scheduler>
    </ThemeProvider>
  );
};
export default TeacherAppointments;
