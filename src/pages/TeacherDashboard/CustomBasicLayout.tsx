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
  const onLimitChange = (nextValue: string) => {
    onFieldChange({ meetLimit: parseInt(nextValue) });
  };
  const onPriceChange = (nextValue: string) => {
    onFieldChange({ price: parseInt(nextValue) });
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
        onValueChange={onLimitChange}
        placeholder="Limit"
      />
      <AppointmentForm.Label text="Price" type="ordinaryLabel" />
      <AppointmentForm.TextEditor
        value={appointmentData?.price}
        type="numberEditor"
        readOnly={false}
        onValueChange={onPriceChange}
        placeholder="Price"
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
