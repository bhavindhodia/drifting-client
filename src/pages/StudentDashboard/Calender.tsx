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
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import { AuthContext } from "services";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { AiFillDelete, AiFillCloseCircle } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { GiTeacher } from "react-icons/gi";
import Grid from "@material-ui/core/Grid";
import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icon";
import { AiOutlineClose } from "react-icons/ai";
import { Heading, Box, Flex, Text } from "@chakra-ui/layout";
import { useHistory } from "react-router-dom";

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
  const [isAdding, setIsAdding] = useState(false);
  const [data, setData] = useState<Array<AppointmentModel>>();

  const history = useHistory();

  const fetchAppointmentData = useCallback(async () => {
    const appointmentUrl = "/appointment/";
    const teachersListUrl = "/appointment/getTeachersList";
    try {
      const [appointment, teachersListData] = await axios.all([
        axios.get(appointmentUrl),
        axios.get(teachersListUrl),
      ]);

      const refactoredData: Array<AppointmentModel> = appointment.data.appointmentData.map(
        (item: AppointmentModel) => {
          item["startDate"] = new Date(item["startDate"]);
          item["endDate"] = new Date(item["endDate"]);
          item["readOnly"] =
            auth.userData?.id !== item.studentID.id ? true : false;
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
      /* console.log("Fetching User Appointment", auth.userData); */
      fetchAppointmentData();
    }
  }, [auth]);
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins",
    },
  });

  type UpdateAppointmentProps = {
    appointmentID: string;
    changedObj: {
      [key: string]: any;
    };
  };

  const updateAppointment = async ({
    appointmentID,
    changedObj,
  }: UpdateAppointmentProps) => {
    const response = await axios.patch(
      `/appointment/${appointmentID}`,
      changedObj
    );
    if (response.status === 200 && response.data.success) {
      fetchAppointmentData();
    }
  };
  const commitChanges = async ({ added, changed, deleted }: ChangeSet) => {
    if (added) {
      console.log("ADDED", added);
      setIsAdding(true);
      localStorage.setItem("newAppointment", JSON.stringify(added));
      history.push("/studentDashboard/checkout");
    }
    if (changed) {
      console.log("UPDATED");
      setIsAdding(false);

      const appointmentID = Object.entries(changed)[0][0];
      const changedObj = Object.entries(changed)[0][1];
      updateAppointment({ appointmentID, changedObj });
      localStorage.setItem("newAppointment", JSON.stringify(changed));
    }
    if (deleted) {
      console.log("deleted", deleted);
      const deleteUrl = `/appointment/${deleted}`;
      const response = await axios.delete(deleteUrl);
      console.log("response", response);
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
          onClick={onExecute}
        >
          {isAdding ? "Checkout" : "Save"}
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
        <Box textAlign="center" py={10} px={6}>
          <Box display="inline-block">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bg={"red.500"}
              rounded={"50px"}
              w={"55px"}
              h={"55px"}
              textAlign="center"
            >
              <Icon as={AiOutlineClose} color={"white"} w={8} h={8} />
            </Flex>
          </Box>
          <Heading as="h2" size="xl" mt={6} mb={2}>
            Permission denied
          </Heading>
          <Text color={"gray.700"}>
            Sorry,meet for this time with {appointmentData?.teacherID.name} has
            already been booked by {appointmentData?.studentID.name}
          </Text>
        </Box>
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
  }) => {
    return (
      <AppointmentTooltip.Content
        {...restProps}
        appointmentData={appointmentData}
      >
        <Grid container alignItems="center">
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <Icon as={BsFillCalendarCheckFill} w={5} h={5} />
          </Grid>
          <Grid item xs={10}>
            <span>Booked by {appointmentData?.studentID.name}</span>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item xs={2} style={{ textAlign: "center" }}>
            <Icon as={GiTeacher} w={5} h={5} />
          </Grid>
          <Grid item xs={10}>
            <span>With {appointmentData?.teacherID.name}</span>
          </Grid>
        </Grid>
      </AppointmentTooltip.Content>
    );
  };
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

  const resource = [
    {
      fieldName: "teacherID",
      title: "Teacher",
      required: true,
      instances: teachersList?.map((item: TeachersListType, key: number) => ({
        id: item.id,
        text: item.name,
      })),
    },
  ];
  console.log("teachersList", teachersList);
  const Appointment: ComponentType<Appointments.AppointmentProps> = ({
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
  return (
    <ThemeProvider theme={theme}>
      <Scheduler data={data} height={560}>
        <ViewState defaultCurrentViewName="Week" />
        <MonthView />
        <WeekView startDayHour={8} endDayHour={13} />
        <DayView startDayHour={8} endDayHour={13} />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton />
        <Appointments appointmentComponent={Appointment} />
        <Resources data={resource} />
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
        />
      </Scheduler>
    </ThemeProvider>
  );
};

export default Calender;
