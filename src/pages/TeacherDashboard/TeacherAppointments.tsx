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
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useGetAppointment, usePostAppointment } from "hooks";
import { Spinner } from "@chakra-ui/spinner";
import { Center } from "@chakra-ui/layout";
import LinearProgress from "@material-ui/core/LinearProgress";
type CurrentStateType = {
  viewName: string;
  currentDate: Date;
};
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

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins",
    },
  });

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
    console.log("currentDate", currentDate);
    setCurrentState((oldData) => ({ viewName: oldData.viewName, currentDate }));
    //setCurrentState({ viewName: "WEEK", currentDate });
  };
  const setCurrentViewName: (viewName: string) => void = (viewName) => {
    console.log("viewName", viewName);
    setCurrentState((oldData) => ({
      viewName,
      currentDate: oldData.currentDate,
    }));
  };

  const AppointmentLoading: ComponentType<Toolbar.RootProps> = ({
    children,
    ...restProps
  }) => {
    return (
      <div style={{ position: "relative" }}>
        <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
        <LinearProgress
          style={{ position: "absolute", width: "100%", bottom: 0, left: 0 }}
        />
      </div>
    );
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
          {...(isFetching ? { rootComponent: AppointmentLoading } : null)}
        />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        {/* <Resources data={resource} /> */}
        <AppointmentTooltip
          /*    contentComponent={Content}
        headerComponent={Header} */
          showOpenButton
          showDeleteButton
        />
        <ConfirmationDialog />
        <AppointmentForm
        /* basicLayoutComponent={BasicLayout}
        commandLayoutComponent={CommandLayout} */
        />
      </Scheduler>
    </ThemeProvider>
  );
};
export default TeacherAppointments;
