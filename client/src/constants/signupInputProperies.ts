interface SignupInputProperties {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
}

export const signUpInputPropertiesList: SignupInputProperties[] = [
  {
    name: "userName",
    type: "text",
    label: "Username",
    placeholder: "Enter your username",
    required: true,
  },
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
  },
  {
    name: "phoneNumber",
    type: "tel",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    required: true,
  },
];
