import {
  useState,
  useEffect,
  useCallback,
  useContext,
  ComponentType,
} from "react";
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
import axios from "axios";
import { AuthContext } from "services";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { AiFillDelete, AiFillCloseCircle } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import Grid from "@material-ui/core/Grid";
import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { Heading } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";

export type AppointmentType = {
  appointmentData: Array<AppointmentModel>;
};

export type TeachersListType = {
  name: string;
  email: string;
  username: string;
  id: string;
};

const Calender = () => {
  const { auth } = useContext(AuthContext);
  const [errorState, setErrorState] = useState("");
  const [readOnlyState, setReadOnlyState] = useState(false);
  const [teachersList, setTeachersList] = useState([]);
  const [data, setData] = useState<Array<AppointmentModel>>();
  const options = {
    // passing the client secret obtained from the server
    clientSecret:
      "sk_test_51K4FivSGS4s5bT6h0cn5wrprQkBq50hiZ43bMBZ78lzitXt5BBUPPQDv3pbJbVB40pSw38gmiZlh5omFJDrPtgyA00MLAiK6MK",
  };
  /*   console.log("Auth State", auth.userData?.id);
  console.log("Data State", data); */
  const fetchAppointmentData = useCallback(async () => {
    const appointmentUrl = "/appointment/get";
    const teachersListUrl = "/appointment/getTeachersList";
    try {
      /* const response = await axios.get(appointmentUrl, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });   
 */
      const [appointment, teachersListData] = await axios.all([
        axios.get(appointmentUrl, {
          headers: { Authorization: `Bearer ${auth.token}` },
        }),
        axios.get(teachersListUrl, {
          headers: { Authorization: `Bearer ${auth.token}` },
        }),
      ]);

      console.log("appointment", appointment);
      console.log("teachersListData", teachersListData);

      const refactoredData: Array<AppointmentModel> = appointment.data.appointmentData.map(
        (item: AppointmentModel) => {
          /*  console.log(
            "Ap UID",
            auth.userData?.id !== item.userID.id ? true : false
          ); */
          item["startDate"] = new Date(item["startDate"]);
          item["endDate"] = new Date(item["endDate"]);
          item["readOnly"] =
            auth.userData?.id !== item.userID.id ? true : false;
          return item;
        }
      );
      setData(refactoredData);
      setTeachersList(teachersListData.data.teachersList);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        error.response?.status === 400 &&
          setErrorState("Something Went Wrong!");
      }
    }
  }, [setData, data, auth.userData]);

  useEffect(() => {
    if (auth.userData !== undefined) {
      console.log("Fetching User Appointment", auth.userData);
      fetchAppointmentData();
    }
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setErrorState("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setErrorState(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [auth]);
  // console.log("Data", data[0].);

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins",
    },
  });

  const commitChanges = async ({ added, changed, deleted }: ChangeSet) => {
    if (added) {
      const createAppointmentUrl = "/appointment/create";
      console.log("added", added);
      try {
        await axios.post(
          createAppointmentUrl,
          { ...added },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data.message);
        }
      } finally {
        fetchAppointmentData();
      }
    }
  };

  const checkoutRedirect = async () => {
    const checkoutUrl = "/appointment/checkout";
    const response = await axios.post(
      checkoutUrl,
      {},
      { headers: { Authorization: `Bearer ${auth.token}` } }
    );

    console.log("Checkout", response.data);
    if (response.status === 200) {
      window.open(response.data?.session?.url);
    }
  };
  const CommandBtn: ComponentType<AppointmentForm.CommandButtonProps> = ({
    id,
    onExecute,
    ...restProps
  }) => {
    if (id === "saveButton")
      return (
        <Button
          {...restProps}
          type="submit"
          leftIcon={<IoBagCheckOutline size={"1.25rem"} />}
          bg="success"
          mx={2}
          onClick={checkoutRedirect}
        >
          Checkout
        </Button>
      );
    if (id === "deleteButton")
      return (
        <Icon
          w={5}
          h={5}
          mx={2}
          {...restProps}
          onClick={onExecute}
          color="red"
          as={AiFillDelete}
        />
      );
    if (id === "cancelButton")
      return (
        <Icon
          mr={"auto"}
          w={6}
          h={6}
          onClick={onExecute}
          {...restProps}
          as={AiFillCloseCircle}
        />
      );
    return <h1>Error</h1>;
  };
  const BasicLayout: ComponentType<AppointmentForm.BasicLayoutProps> = ({
    appointmentData,
    children,
    ...restProps
  }) => {
    if (appointmentData?.readOnly) {
      setReadOnlyState(true);
      return (
        <Heading mt={6} size={"lg"} textAlign={"center"}>
          Sorry,meet for this time has already been booked by{" "}
          {appointmentData?.userID.name}
        </Heading>
      );
    }
    setReadOnlyState(false);
    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        {...restProps}
      ></AppointmentForm.BasicLayout>
    );
  };

  const CommandLayout: ComponentType<AppointmentForm.CommandLayoutProps> = ({
    children,
    ...restProps
  }) => {
    return (
      <AppointmentForm.CommandLayout
        {...restProps}
        disableSaveButton={false}
        readOnly={readOnlyState}
        commandButtonComponent={CommandBtn}
      ></AppointmentForm.CommandLayout>
    );
  };

  const Content: ComponentType<AppointmentTooltip.ContentProps> = ({
    children,
    appointmentData,
    ...restProps
  }) => (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      <Grid container alignItems="center">
        <Grid item xs={2} style={{ textAlign: "center" }}>
          <Icon as={BsFillCalendarCheckFill} w={5} h={5} />
        </Grid>
        <Grid item xs={10}>
          <span>Booked by {appointmentData?.userID.name}</span>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  );
  const Header: ComponentType<AppointmentTooltip.HeaderProps> = ({
    children,
    appointmentData,
    ...restProps
  }) => (
    <AppointmentTooltip.Header
      {...restProps}
      showOpenButton={!appointmentData?.readOnly}
      showDeleteButton={!appointmentData?.readOnly}
      appointmentData={appointmentData}
    ></AppointmentTooltip.Header>
  );

  return (
    <ThemeProvider theme={theme}>
      {errorState !== "" && (
        <Alert status="error">
          {" "}
          <AlertIcon />
          {errorState}{" "}
        </Alert>
      )}

      <Select>
        {teachersList.map((item: TeachersListType, key: number) => (
          <option key={key} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
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
        {/*         <Resources data={resources} /> */}
        <AppointmentTooltip
          contentComponent={Content}
          headerComponent={Header}
          showOpenButton
          showDeleteButton
        />
        <ConfirmationDialog />
        <AppointmentForm
          basicLayoutComponent={BasicLayout}
          commandLayoutComponent={CommandLayout}
          //commandButtonComponent={CommandBtn}
        />
      </Scheduler>
    </ThemeProvider>
  );
};

export default Calender;
