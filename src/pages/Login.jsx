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
import { useNavigate } from 'react-router-dom';
import { PATH } from './../utils/pagePath';
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {      
      const res = await publicRequest.post("/account/authenticate", data);
      if(res.data.success) {
        // Combine them into a string 'username:password'
        const combined = `${data.username}:${data.password}`;
  
        // Base64 encode the combined string
      const base64Encoded = btoa(combined);
      localStorage.setItem("token", base64Encoded);
      localStorage.setItem("userId", res.data.userId);
      toast.success("LoggedIn successfully")
      navigate(PATH.DASHBOARD)
    }
    reset();
  } catch (error) {
    toast.error("Failed To login")
  }
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
