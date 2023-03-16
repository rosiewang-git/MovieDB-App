import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ClientAPI from "../apiServices";
import useUser from "../hooks/useUser";
import "./Rated.css";
import MovieCard from "./MovieCard";

export default function Rated() {
    const [ratedMovies, setRatedMovies] = useState([]);
    const { favList } = useSelector((state) => state.movies);
    const { user } = useUser();

    useEffect(() => {
        if (!user) {
            return;
        }
        ClientAPI.getRatedMovies(user.userId, user.sessionId).then(
            ({ data }) => {
                const { results } = data;
                setRatedMovies(results);
            }
        );
    }, [user]);

    return (
        <div>
            <h1>Rated List</h1>
            <div className="rated-movie-list">
                {user &&
                    ratedMovies &&
                    ratedMovies.map((movie) => {
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
