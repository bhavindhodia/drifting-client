import { ComponentType } from "react";
import { Progress } from "@chakra-ui/progress";
import { Toolbar } from "@devexpress/dx-react-scheduler-material-ui";

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

export default AppointmentLoading;
