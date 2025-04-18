import { Box, Button, FormHelperText, Grid2, IconButton, InputAdornment } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useState } from "react";
import { FormikCustomInput } from "../../components";

function FormLogin() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault()!;
    };

    const onSubmit = async (values: any, { setErrors, setStatus, setSubmitting, resetForm }: any) => {
        try {
            navigate("/dashboard")
        } catch (err: any) {

        }
    };
    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
                submit: null
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string().max(255).required('The account is not empty'),
                password: Yup.string().max(255).required('The password is not empty'),
            })}
            onSubmit={onSubmit}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                        <Grid2 size={12}>
                            <FormikCustomInput
                                name="username"
                                type="text"
                                label={"Username"}
                                value={values.username}
                                onChange={(e: any) => setFieldValue("username", e.target.value)}
                                onBlur={handleBlur}
                                touched={touched.username}
                                errors={errors.username}
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <FormikCustomInput
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                label={"Password"}
                                value={values.password}
                                onChange={(e: any) => setFieldValue("password", e.target.value)}
                                onBlur={handleBlur}
                                touched={touched.password}
                                errors={errors.password}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <Button variant="contained" color="secondary" size="large" disabled={isSubmitting} fullWidth type="submit">
                                {"Login"}
                            </Button>
                        </Grid2>
                    </Grid2>
                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit.toString()}</FormHelperText>
                        </Box>
                    )}
                </form>
            )}
        </Formik >
    );
}

export default FormLogin;