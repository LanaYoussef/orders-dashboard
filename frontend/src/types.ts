export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  age: number;
  gender: string;
};

export type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  gender: string;
};

export const emptyForm: UserForm = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dob: "",
  gender: "",
};
export type Weather = {
  city: string;
  temp: number;
  humidity: number;
  wind: number;
};
