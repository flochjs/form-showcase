import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Icon,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import Logo from "@mui/icons-material/CloudQueue";

const FIELDS = {
  email: "email",
  password: "password",
} as const;

const initialValues = {
  [FIELDS.email]: "",
  [FIELDS.password]: "",
};

const validationSchema = yup.object({
  [FIELDS.email]: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  [FIELDS.password]: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function Login(): JSX.Element {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordView = (): void => setShowPassword(!showPassword);

  return (
    <Card
      sx={{
        textAlign: "center",
        padding: "2em",
        width: 300,
      }}
    >
      <Icon component={Logo} fontSize="large" />
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <TextField
            sx={{ display: "block" }}
            fullWidth
            required
            variant="standard"
            margin="normal"
            type="email"
            name={FIELDS.email}
            label="email"
            value={formik.values[FIELDS.email]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched[FIELDS.email] &&
              Boolean(formik.errors[FIELDS.email])
            }
            helperText={
              formik.touched[FIELDS.email] && formik.errors[FIELDS.email]
            }
          />
          <TextField
            sx={{ display: "block" }}
            fullWidth
            InputProps={{
              endAdornment: formik.values.password && (
                <InputAdornment
                  sx={{ padding: "1em .5em" }}
                  component={Button}
                  onClick={togglePasswordView}
                  position="end"
                >
                  <Typography sx={{ textTransform: "none" }} variant="caption">
                    {showPassword ? "hide" : "show"}
                  </Typography>
                </InputAdornment>
              ),
            }}
            required
            variant="standard"
            margin="normal"
            type={showPassword ? "text" : "password"}
            name={FIELDS.password}
            label="password"
            value={formik.values[FIELDS.password]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched[FIELDS.password] &&
              Boolean(formik.errors[FIELDS.password])
            }
            helperText={
              formik.touched[FIELDS.password] && formik.errors[FIELDS.password]
            }
          />
        </CardContent>
        <CardActions>
          <Button
            sx={{ textTransform: "none" }}
            disabled={!(formik.isValid && formik.dirty)}
            variant="contained"
            fullWidth
            type="submit"
          >
            Log in
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
