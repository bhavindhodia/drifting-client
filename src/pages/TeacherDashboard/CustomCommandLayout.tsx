import { ComponentType } from "react";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";

const CustomCommandLayout: ComponentType<AppointmentForm.CommandLayoutProps & {
  readOnlyState?: boolean;
}> = ({ children, readOnlyState, ...restProps }) => {
  return (
    <AppointmentForm.CommandLayout
      {...restProps}
      disableSaveButton={false}
      //r\eadOnly={readOnlyState ? true : false}
    ></AppointmentForm.CommandLayout>
  );
};

export default CustomCommandLayout;
