import * as yup from "yup";

export const userValidationSchema = yup.object({
  email: yup
    .string("organism.formikAndYupSection.form.email.helperText")
    .email("organism.formikAndYupSection.form.email.invalidHelperText")
    .required("organism.formikAndYupSection.form.email.requiredHelperText"),
  password: yup
    .string("organism.formikAndYupSection.form.password.helperText")
    .min(8, "organism.formikAndYupSection.form.password.invalidHelperText")
    .required("organism.formikAndYupSection.form.password.requiredHelperText"),
});
