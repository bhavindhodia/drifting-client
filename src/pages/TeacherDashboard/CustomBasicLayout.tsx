import { ComponentType, useState, useEffect } from "react";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import Select, { ActionMeta } from "react-select";
import makeAnimated from "react-select/animated";
import { useGetStudentList, useUpdateAppointment } from "hooks";
import PermissionDenied from "./PermissionDenied";
const animatedComponents = makeAnimated();

type OptionsType = {
  value: string;
  label: string;
};
/* const SelectCompontnent: ComponentType<AppointmentForm.SelectProps> = ({
  value,
  onValueChange,
  ...restProps
}) => {
  console.log("value", value);
  return <div {...restProps}></div>;
}; */
const CustomBasicLayout: ComponentType<AppointmentForm.BasicLayoutProps> = ({
  appointmentData,
  onFieldChange,
  children,
  ...restProps
}) => {
  //const [cap, setCap] = useState(false);
  const [appointmentDataOption, setAppointmentDataOption] = useState<
    OptionsType[]
  >([]);
  //const { data, isLoading } = useGetStudentList();
  const updateAppointment = useUpdateAppointment();

  useEffect(() => {
    console.log("useEffect", appointmentData);

    if (appointmentData.studentID !== undefined) {
      const filtered = appointmentData?.studentID.map(
        (item: { _id: string; name: string }, key: string) => {
          return { value: item._id, label: item.name };
        }
      );
      setAppointmentDataOption(filtered);
    }

    /*   if (
      appointmentData.meetLimit !== undefined &&
      appointmentData.studentID !== undefined
    ) {
      setCap(
        appointmentData?.studentID.length < appointmentData?.meetLimit
          ? false
          : true
      );
    } */
  }, []);
  //console.log("already selected student", appointmentDataOption);

  /* const handleChange = (newValue: any, actionMeta: ActionMeta<any>) => {
    console.log("actionMeta", actionMeta);
    const meetLimit =
      newValue.length <= appointmentData?.meetLimit ? false : true;
    setCap(meetLimit);
    if (!meetLimit) {
      setAppointmentDataOption(newValue);
      const filtered = newValue.map(
        (item: { value: string; label: string }, key: string) => {
          return { _id: item.value, name: item.label };
        }
      );
      console.log("appointmentData", appointmentData);
      updateAppointment.mutate(appointmentData);
      appointmentData.studentID = filtered;
    }
  }; */
  const onCustomFieldChange = (nextValue: string) => {
    onFieldChange({ meetLimit: parseInt(nextValue) });
  };

  return appointmentData?.readOnly ? (
    <PermissionDenied appointmentData={appointmentData} />
  ) : (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label text="Limit" type="ordinaryLabel" />
      <AppointmentForm.TextEditor
        value={appointmentData?.meetLimit}
        type="numberEditor"
        readOnly={false}
        onValueChange={onCustomFieldChange}
        placeholder="Limit"
      />

      <AppointmentForm.Label
        text="Selected Student"
        style={{ fontStyle: "bold" }}
        type="titleLabel"
      />

      <Select
        //options={data}
        value={appointmentDataOption}
        //isDisabled={cap}

        //onChange={handleChange}
        isMulti
        //isLoading={isLoading}
      />
    </AppointmentForm.BasicLayout>
  );
};

export default CustomBasicLayout;
