import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Favorite from "./components/Favorite";
import Login from "./components/Login";
import Rated from "./components/Rated";
import Header from "./components/Header";
import MovieDetail from "./components/MovieDetail";
import useUser from "./hooks/useUser";

function App() {
    const { loadUserData } = useUser();
    useEffect(() => {
        loadUserData();
    }, []);
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route static path="/MovieDB-App/" element={<Home />} />
                <Route path="/MovieDB-App/login" element={<Login />} />
                <Route path="/MovieDB-App/favorite" element={<Favorite />} />
                <Route path="/MovieDB-App/rated" element={<Rated />} />
                <Route
                    path="/MovieDB-App/movies/:movieId"
                    element={<MovieDetail />}
                />
            </Routes>
        </div>
    );
}

export default App;
