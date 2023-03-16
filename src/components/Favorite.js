import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ClientAPI from "../apiServices";
import useUser from "../hooks/useUser";
import "./Favorite.css";
import MovieCard from "./MovieCard";

export default function Favorite() {
    const [favMovies, setFavMovies] = useState([]);
    const { favList } = useSelector((state) => state.movies);
    const { user } = useUser();

    useEffect(() => {
        if (!user) {
            return;
        }
        ClientAPI.getFavoriteMovies(user.userId, user.sessionId).then(
            ({ data }) => {
                const { results } = data;
                setFavMovies(results);
            }
        );
    }, [user]);

    console.log("favMovies in Favorite:", favMovies);
    return (
        <div>
            <h1>Favorite List</h1>
            <div className="fav-movie-list">
                {favMovies &&
                    favMovies.map((movie) => {
                        return (
                            <li key={movie.id}>
                                <MovieCard
                                    item={movie}
                                    myRating={movie.rating}
                                    favorite={Boolean(favList[movie.id])}
                                />
                            </li>
                        );
                    })}
            </div>
        </div>
    );
}
