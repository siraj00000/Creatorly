type LoginInputProperties = {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
}

export const loginInputPropertiesList: LoginInputProperties[] = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email address",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    required: true,
  }
];
