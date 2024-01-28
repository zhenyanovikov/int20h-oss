import { Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { userValidationSchema } from "../../../constants/validation";
import Section from "../../molecules/Section/Section";

function FormikAndYupSection({ onSubmit }) {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userValidationSchema,
    onSubmit,
  });

  return (
    <Section title={t("organism.formikAndYupSection.title")}>
      <Stack alignItems="center">
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <TextField
                id="email"
                name="email"
                label={t("organism.formikAndYupSection.form.email.label")}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && t(formik.errors.email)}
              />
              <TextField
                id="password"
                name="password"
                label={t("organism.formikAndYupSection.form.password.label")}
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && !!formik.errors.password}
                helperText={
                  formik.touched.password && t(formik.errors.password)
                }
              />
            </Stack>
            <Button variant="contained" type="submit">
              {t("organism.formikAndYupSection.form.button.submit")}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Section>
  );
}

export default FormikAndYupSection;
