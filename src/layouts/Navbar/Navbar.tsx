import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import logo from "./../../images/logo.svg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { Menu, MenuItem } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setCurrentPage } from "../../store/slices/movies-slice";

export default function Navbar() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);
    const [tab, setTab] = useState<string>("home");
    const { logout } = useUser();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const routes = [{ to: "/", title: "Home" }];
    const protectedRoutes = [
        { to: "/", title: "Home" },
        { to: "/favorite", title: "Favorite" },
        { to: "/rated", title: "Rated" },
    ];
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
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
                    // value={tab}
                    onChange={() => setTab(tab)}
                    // textcolor="white"
                    // indicatorColor="none"
                    aria-label="secondary tabs example"
                >
                    {(user ? protectedRoutes : routes).map((route, index) => {
                        return (
                            <Link
                                key={index}
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
                                    onClick={() => dispatch(setCurrentPage(1))}
                                />
                            </Link>
                        );
                    })}
                </Tabs>
            </Box>
            {user ? (
                <>
                    <Box onClick={handleClick} className="username">
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
                <Link to="/login" className="login">
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
