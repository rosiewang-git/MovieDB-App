import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { TextField } from "@mui/material";

export const Login = () => {
    const { login, displayWarning, setDisplayWarning } = useUser();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [displayValidationError, setDisplayValidationError] = useState(false);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        setDisplayValidationError(false);
        setDisplayWarning(false);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setDisplayValidationError(false);
        setDisplayWarning(false);
    };

    const validateForm = () => {
        if (!username || !password) {
            setDisplayValidationError(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!validateForm()) {
                setUsername("");
                setPassword("");
                return;
            }
            await login(username, password);
            navigate("/");
        } catch (error) {
            console.log("running here");
            setDisplayWarning(true);
            setUsername("");
            setPassword("");
            throw error;
        }
    };

    return (
        <form className="login-box" onSubmit={handleSubmit}>
            <h1>Login</h1>
            {displayWarning && (
                <div className="alert alert-danger" role="alert">
                    Your username and password are not matched!
                </div>
            )}
            {displayValidationError && (
                <div className="alert alert-danger" role="alert">
                    Both username and password are required!
                </div>
            )}
            <div className="input-box">
                <TextField
                    id="username"
                    name="username"
                    label="Username"
                    type="text"
                    style={{ width: 400 }}
                    onChange={handleUsernameChange}
                    value={username}
                />
            </div>
            <div className="input-box">
                <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    style={{ width: 400 }}
                    onChange={handlePasswordChange}
                    value={password}
                />
            </div>
            <button className="btn btn-outline-dark custom" type="submit">
                SUBMIT
            </button>
        </form>
    );
};
