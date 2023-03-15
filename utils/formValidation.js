import * as yup from "yup";
const studentFormValidation = yup.object({
  className: yup.string().required("Please select a class name"),
  studentId: yup.string().required("Please enter stuent id"),
  name: yup
    .string()
    .required("Please enter a name")
    .min(3, "Name must be at least 3 characters long")
    .max(16, "Name can't be more than 16 characters long"),
  email: yup
    .string()
    .nullable()
    .notRequired()
    .when("emailAddress", {
      is: (value) => value?.length,
      then: (rule) => {
        rule.email("Please enter a valid email address");
      },
    }),
  phone: yup
    .string()
    .nullable()
    .notRequired()
    .when("phoneNumber", {
      is: (value) => value?.length,
      then: (rule) => {
        rule
          .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Please enter a valid phone number"
          )
          .min(11, "Phone number must be at least 11 characters long")
          .max(11, "Phone number can't be more than 11 characters long");
      },
    }),
  dob: yup.string().required("DOB is Required"),
  gender: yup.string().required("Gender is Required"),
  address: yup
    .string()
    .required("Please enter your address")
    .max(188, "Address can't be more than 180 characters long"),
  fatherName: yup
    .string()
    .required("Please enter a name")
    .min(3, "Name must be at least 3 characters long")
    .max(16, "Name can't be more than 16 characters long"),
  motherName: yup
    .string()
    .required("Please enter a name")
    .min(3, "Name must be at least 3 characters long")
    .max(16, "Name can't be more than 16 characters long"),
  guardianContactNumber: yup
    .string()
    .required("Please enter a phone number")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please enter a valid phone number"
    )
    .min(11, "Phone number must be at least 11 characters long"),
  password: yup
    .string()
    .nullable()
    .notRequired()
    .when("hasPass", {
      is: (value) => value?.length,
      then: (rule) => {
        rule
          .required("Please choice a new password")
          .min(6, "Password must be at least 6 characters long")
          .max(16, "Password can't be more than 16 characters long");
      },
    }),
});

const teacherFormValidation = yup.object({
  name: yup
    .string()
    .required("Please enter a name")
    .matches(/^[aA-zZ\s]+$/, "Input allowed only alphabetic characters")
    .min(3, "Name must be at least 3 characters long")
    .max(16, "Name can't be more than 16 characters long"),
  teacherInitial: yup
    .string()
    .required("Please create teacher initial")
    .matches(/^[aA-zZ\s]+$/, "Input allowed only alphabetic characters")
    .min(2, "Teacher initial must be at least 3 characters long")
    .max(6, "Teacher initial can't be more than 10 characters long"),
  email: yup
    .string()
    .required("Please enter a email address")
    .email("Please enter a valid email address"),
  phone: yup
    .string()
    .required("Please enter a phone number")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please enter a valid phone number"
    )
    .min(11, "Phone number must be at least 11 characters long"),
  gender: yup.string().required("Gender is Required"),
  address: yup
    .string()
    .required("Please give address")
    .max(30, "Address can't be more than 30 characters long"),
  education: yup
    .string()
    .required("Please enter aducation")
    .matches(/^[aA-zZ\s]+$/, "Input allowed only alphabetic characters")
    .min(3, "Education at least 3 characters long")
    .max(30, "Education can't be more than 30 characters long"),
  designation: yup
    .string()
    .required("Please enter designation")
    .matches(/^[aA-zZ\s]+$/, "Input allowed only alphabetic characters")
    .min(3, "Designation at least 3 characters long")
    .max(30, "Designation can't be more than 30 characters long"),
  groupName: yup.string().required("Please select group name"),
  password: yup
    .string()
    .nullable()
    .notRequired()
    .when("hasPass", {
      is: (value) => value?.length,
      then: (rule) => {
        rule
          .required("Please choice a new password")
          .min(6, "Password must be at least 6 characters long")
          .max(16, "Password can't be more than 16 characters long");
      },
    }),
});

const userFormValidation = yup.object({
  name: yup
    .string()
    .required("Please enter a name")
    .matches(/^[aA-zZ\s]+$/, "Input allowed only alphabetic characters")
    .min(3, "Name must be at least 3 characters long")
    .max(16, "Name can't be more than 16 characters long"),
  role: yup.string().required("Please select a name"),
  email: yup
    .string()
    .required("Please enter a email")
    .email("Please enter a valid email address"),
  phone: yup
    .string()
    .required("Please enter a phone number")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please enter a valid phone number"
    )
    .min(11, "Phone number must be at least 11 characters long"),
  gender: yup.string().required("Please select a gender"),
  password: yup
    .string()
    .nullable()
    .notRequired()
    .when("hasPass", {
      is: (value) => value?.length,
      then: (rule) => {
        rule
          .required("Please choice a new password")
          .min(6, "Password must be at least 6 characters long")
          .max(16, "Password can't be more than 16 characters long");
      },
    }),
});

export { studentFormValidation, teacherFormValidation, userFormValidation };
