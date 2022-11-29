import * as yup from "yup";

export const schema = yup.object({
    firstName: yup.string().required("first name required!!!"),
    lastName: yup.string().required("last name required!!!"),
    address: yup.string().required("address required!!!"),
    isGraduate: yup.boolean(),
    favourites: yup.array(),
    email: yup.string().matches(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "email validate").required("email required!!!"),
    school: yup.string().required("school required!!!"),
    dateOfBirth: yup.date().required("date of birth required!!!"),
    gender: yup.string().required("gender required!!!"),
    phone: yup.string().required("phone required!!!").matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9 ]{4,6}$/, "phone validate!!!"),
}).required();