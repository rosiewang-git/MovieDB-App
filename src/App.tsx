import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import { Home } from "./layouts/HomePage/Home";
import Favorite from "./layouts/FavoritePage/Favorite";
import { Login } from "./layouts/LoginPage/Login";
import Rated from "./layouts/RatedPage/Rated";
import MovieDetail from "./layouts/MovieDetailPage/MovieDetail";
import useUser from "./hooks/useUser";
import Navbar from "./layouts/Navbar/Navbar";

export const App = () => {
    const { loadUserData } = useUser();
    useEffect(() => {
        loadUserData();
    }, []);
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/rated" element={<Rated />} />
                <Route path="/movies/:movieId" element={<MovieDetail />} />
            </Routes>
        </div>
    );
};
