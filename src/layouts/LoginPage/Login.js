import React from "react";
import "./Login.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { TextField } from "@mui/material";

const validationSchema = yup.object({
    username: yup.string().required("please type username"),
    password: yup.string().required("please type password"),
});

export default function Login() {
    const { login } = useUser();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: (values) => {
            const { username, password } = values;
            login(username, password).then(() => {
                navigate("/");
            });
        },
        validationSchema,
    });

    return (
        <form className="login-box" onSubmit={formik.handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
                <TextField
                    id="username"
                    name="username"
                    label="Username"
                    type="text"
                    style={{ width: 400 }}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    error={formik.touched.username && formik.errors.username}
                    helperText={
                        formik.touched.username && formik.errors.username
                    }
                />
            </div>
            <div className="input-box">
                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    style={{ width: 400 }}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.touched.username && formik.errors.username}
                    helperText={
                        formik.touched.username && formik.errors.username
                    }
                />
            </div>
            <button
                type="button"
                class="btn btn-outline-dark custom"
                type="submit"
            >
                SUBMIT
            </button>
        </form>
    );
}
