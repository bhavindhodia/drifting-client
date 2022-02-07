import React, { ComponentType } from "react";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import PermissionDenied from "./PermissionDenied";
import { Tag, TagLabel } from "@chakra-ui/tag";
import { Avatar } from "@chakra-ui/avatar";

const CustomTag = ({ name }: { name: string }) => (
  <Tag size="lg" mx={1} colorScheme={"green"} borderRadius="full">
    <Avatar size="xs" name={name} ml={-1} mr={2} />
    <TagLabel>{name}</TagLabel>
  </Tag>
);

const CustomBasicLayout: ComponentType<AppointmentForm.BasicLayoutProps> = ({
  appointmentData,
  onFieldChange,
  children,
  ...restProps
}) => {
  const onCustomFieldChange = (nextValue: string) => {
    onFieldChange({ meetLimit: parseInt(nextValue) });
  };

  console.log("appointmentData", appointmentData);
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
        text="Students"
        style={{ fontStyle: "bold" }}
        type="titleLabel"
      />

      {appointmentData.stundentID !== undefined ? (
        appointmentData.studentID.map((item: { _id: string; name: string }) => (
          <CustomTag key={item._id} name={item.name} />
        ))
      ) : (
        <CustomTag key={0} name={"No stundent"} />
      )}
    </AppointmentForm.BasicLayout>
  );
};

export default CustomBasicLayout;
