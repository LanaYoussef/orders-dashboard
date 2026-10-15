
export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  age: number;
  gender: string;
  orderCount?: number;
};