import { extendTheme } from "@chakra-ui/react";
import { theme as chakraTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/ButtonStyles";
export default extendTheme({
  colors: {
    //primary: "#01476B",
    primary: {
      100: "#346c89",
      200: "#1a597a",
      300: "#01476b",
      400: "#01476b",
      500: "#014060",
      600: "#013956",
      700: "#01324b",
      800: "#012b40",
      900: "#012436",
    },
    secondary: "#268036",
    highlight: "#00C9A7",
    warning: "#FFC75F",
    danger: "#C34A36",
    success: "#38ef7d",
  },
  fonts: {
    ...chakraTheme.fonts,
    heading: "Poppins",
    body: "Poppins",
  },
  components: {
    Button, // Has to match to the name of the component
  },
});
