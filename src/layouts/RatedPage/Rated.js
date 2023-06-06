import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ClientAPI from "../../apiServices";
import "./Rated.css";
import MovieCard from "../SharedComponenets/MovieCard";

export default function Rated() {
    const [ratedMovies, setRatedMovies] = useState([]);
    const { favList } = useSelector((state) => state.movies);
    const { user } = useSelector((state) => state.user);

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
    console.log("rated movies in rated", ratedMovies);

    return (
        <div>
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
