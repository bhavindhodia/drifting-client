type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Create = "CREATE_APPOINTMENT",
  Delete = "DELETE_APPOINTMENT",
  Update = "UPDATE_APPOINTMENT",
}

// AppointmentType

export type AppointmentType = {
  id?: number;
  title: string;
  teacherID: string;
  studentID: [];
  paymentID: [];
  notes: string;
  allDay: boolean;
  startDate: Date;
  endDate: Date;
  readOnly: boolean;
  price: number;
};

type AppointmentPayload = {
  [Types.Create]: AppointmentType;
  [Types.Delete]: {
    id: number;
  };
};

export type AppointmentActions = ActionMap<AppointmentPayload>[keyof ActionMap<
  AppointmentPayload
>];

export const appointmentReducer = (
  state: AppointmentType[],
  action: AppointmentActions | ShoppingCartActions
) => {
  switch (action.type) {
    case Types.Create:
      return [...state, action.payload];
    case Types.Delete:
      return [...state.filter((product) => product.id !== action.payload.id)];
    default:
      return state;
  }
};

// ShoppingCart

type ShoppingCartPayload = {
  [Types.Update]: undefined;
};

export type ShoppingCartActions = ActionMap<
  ShoppingCartPayload
>[keyof ActionMap<ShoppingCartPayload>];

export const shoppingCartReducer = (
  state: number,
  action: AppointmentActions | ShoppingCartActions
) => {
  switch (action.type) {
    case Types.Update:
      return state + 1;
    default:
      return state;
  }
};
