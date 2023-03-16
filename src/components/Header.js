import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import logo from "./../logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import { Menu, MenuItem } from "@material-ui/core";

export default function Header() {
    const [tab, setTab] = useState("home");
    const { user, logout } = useUser();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    const routes = [
        { to: "/", title: "Home" },
        { to: "/favorite", title: "Favorite" },
        { to: "/rated", title: "Rated" },
    ];
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleLogout = () => {
        logout();
        setAnchorEl(null);
    };
    return (
        <div className="header-box">
            <img src={logo} className="logo" alt="web-logo-img" />
            <Box sx={{ width: "100%" }}>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    textcolor="white"
                    indicatorColor="none"
                    aria-label="secondary tabs example"
                >
                    {routes.map((route) => {
                        return (
                            <Link
                                to={route.to}
                                style={{
                                    textDecoration: "none",
                                    padding: "20px",
                                }}
                            >
                                <Tab
                                    label={route.title}
                                    style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "25px",
                                    }}
                                />
                            </Link>
                        );
                    })}
                </Tabs>
            </Box>
            {user ? (
                <>
                    <Box
                        onClick={handleClick}
                        style={{
                            paddingRight: "30px",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "30px",
                        }}
                    >
                        {user.userName}{" "}
                    </Box>
                    <Menu
                        id="user-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem
                            onClick={handleLogout}
                            style={{ width: "130px" }}
                        >
                            Logout
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <Box
                        style={{
                            paddingRight: "40px",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "30px",
                        }}
                    >
                        Login
                    </Box>
                </Link>
            )}
        </div>
    );
}
