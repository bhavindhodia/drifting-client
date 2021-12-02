import { useState } from "react";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
  ChangeSet,
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
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { appointments } from "data/appointments";

const Calender = () => {
  /*  const { getUserData } = useAuth();
  const resp = getUserData();
  console.log("re", resp); */
  const [data, setData] = useState(appointments);

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins",
    },
  });

  const commitChanges = ({ added, changed, deleted }: ChangeSet) => {
    if (added) {
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      delete added["allDay"];
      const newData = [
        ...appointments,
        { id: startingAddedId, location: "Room 2", ...added },
      ];
      console.log("oldData", data);
      console.log("newData", newData);
      /* setData((os) => [
        ...os,
        { id: startingAddedId, location: "Room 2", ...added },
      ]); */
      //setData((oldData) => [...oldData, newData]);
      // setData((oldData)=>{});
    }
    if (changed) {
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      console.log("changed", changed);
      //setData((oldData)=> ({...oldData, {id:startingAddedId}}));
    }
    if (deleted) {
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      console.log("deleted", deleted);
      //setData((oldData)=> ({...oldData, {id:startingAddedId}}));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Scheduler data={data} height={560}>
        <ViewState defaultCurrentViewName="Month" />
        <MonthView />
        <WeekView startDayHour={8} endDayHour={13} />
        <DayView startDayHour={8} endDayHour={13} />

        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />

        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm />
      </Scheduler>
    </ThemeProvider>
  );
};

export default Calender;
