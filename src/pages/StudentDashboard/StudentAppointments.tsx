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
import { useGetAppointment, usePostAppointment, useUserData } from "hooks";
import { Spinner } from "@chakra-ui/spinner";
import { Center } from "@chakra-ui/layout";
import CustomBasicLayout from "./CustomBasicLayout";
import AppointmentLoading from "./AppointmentLoading";

type CurrentStateType = {
  viewName: string;
  currentDate: Date;
};

const TimeTableCell: ComponentType<WeekView.TimeTableCellProps> = ({
  ...restProps
}) => {
  return <WeekView.TimeTableCell {...restProps} onDoubleClick={undefined} />;
};

const Appointment: ComponentType<Appointments.AppointmentProps> = ({
  children,
  data,
  ...restProps
}) => {
  const { data: userData } = useUserData();
  const readOnly = data?.studentID.find(
    (item: { name: string; _id: string }) => item._id === userData?.user.id
  );
  console.log("data", data);
  let appointmentColor = "#01476B";
  if (data?.readOnly) {
    appointmentColor = "#d5d5d5";
  }
  if (readOnly !== undefined) {
    appointmentColor = "#34BE82";
  }
  return (
    <Appointments.Appointment
      {...restProps}
      data={data}
      style={{
        backgroundColor: appointmentColor,
        borderRadius: "2px",
      }}
    >
      {children}
    </Appointments.Appointment>
  );
};

const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
});
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
      console.log("UPDATED");
    }
    if (deleted) {
      console.log("deleted", deleted);
    }
  };

  const onDateChange: (currentDate: Date) => void = (currentDate) => {
    /* console.log("currentDate", currentDate); */
    setCurrentState((oldData) => ({ viewName: oldData.viewName, currentDate }));
  };
  const setCurrentViewName: (viewName: string) => void = (viewName) => {
    console.log("viewName", viewName);
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
        <WeekView
          startDayHour={8}
          endDayHour={13}
          timeTableCellComponent={TimeTableCell}
        />
        <DayView startDayHour={8} endDayHour={13} />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <Toolbar
          {...(isFetching ? { rootComponent: AppointmentLoading } : null)}
        />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton />
        <Appointments appointmentComponent={Appointment} />

        <AppointmentTooltip showOpenButton />
        <ConfirmationDialog />
        <AppointmentForm
          readOnly
          basicLayoutComponent={CustomBasicLayout}

          /* basicLayoutComponent={BasicLayout}
        commandLayoutComponent={CommandLayout} */
        />
      </Scheduler>
    </ThemeProvider>
  );
};
export default TeacherAppointments;
