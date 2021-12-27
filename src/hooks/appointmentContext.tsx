import React, { createContext, useReducer, Dispatch } from "react";
import {
  appointmentReducer,
  shoppingCartReducer,
  AppointmentActions,
  ShoppingCartActions,
  AppointmentType,
} from "./appointmentReducer";

type InitialStateType = {
  appointments: AppointmentType[];
  shoppingCart: number;
};

const initialState = {
  appointments: [],
  shoppingCart: 0,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<AppointmentActions | ShoppingCartActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { appointments, shoppingCart }: InitialStateType,
  action: AppointmentActions | ShoppingCartActions
) => ({
  appointments: appointmentReducer(appointments, action),
  shoppingCart: shoppingCartReducer(shoppingCart, action),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
