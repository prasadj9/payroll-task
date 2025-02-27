import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { publicRequest } from "../services/publicRequest";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    const res = await publicRequest.post("/account/authenticate", data);
    console.log(data, res);
    // Combine them into a string 'username:password'
    const combined = `${data.username}:${data.password}`;

    // Base64 encode the combined string
    const base64Encoded = btoa(combined);
    if(res.data.success)
    localStorage.setItem("token", base64Encoded);
    reset();
  };

  console.log(import.meta.env.VITE_API_BASE_URL + "URL");

  return (
    <Container className={styles.container}>
      <Box className={styles.box}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Mobile"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("username", { required: "username is required" })}
            error={!!errors.username}
            size="medium"
            helperText={errors.username ? errors.username.message : ""}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            size="medium"
            fullWidth
            {...register("password", { required: "Password is required" })}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={styles.button}
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
          >
            {isSubmitting ? "Signing In" : "Sign In"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
