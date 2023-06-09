import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./Home.css";
import MovieCard from "../SharedComponenets/MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { setMoviesList, setInfo } from "../../store/slices/movies-slice";
import ClientAPI from "../../apiServices";

export default function Home() {
    const [category, setCategory] = useState("now_playing");
    const [currentPage, setCurrentPage] = useState(1);
    const { moviesList, info, favList } = useSelector((state) => state.movies);
    const dispatch = useDispatch();

    const handlePREV = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        ClientAPI.getMoviesList(category, currentPage)
            .then((resp) => resp.data)
            .then((res) => {
                dispatch(setMoviesList(res.results));
                dispatch(setInfo(res));
            });
    }, [currentPage, category]);
    console.log("favlIST", favList);
    console.log("res", info);
    console.log("moviesList", moviesList);

    return (
        <div className="home">
            <div className="home-top">
                {info && (
                    <div className="pagination-flex">
                        <button
                            type="button"
                            class="btn btn-outline-dark custom"
                            onClick={handlePREV}
                        >
                            PREV
                        </button>
                        <p>{currentPage + "/" + info.total_pages}</p>
                        <button
                            type="button"
                            class="btn btn-outline-dark custom"
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            NEXT
                        </button>
                    </div>
                )}
                <select
                    class="form-select w-25"
                    aria-label="Default select example"
                    value={category}
                    onChange={(e) => (
                        setCategory(e.target.value), setCurrentPage(1)
                    )}
                >
                    <option value="popular">Popular</option>
                    <option value="now_playing">Now Playing</option>
                    <option value="top_rated">Top Rated</option>
                    <option value="upcoming">Upcoming</option>
                </select>
            </div>
            <div className="movie-list">
                {moviesList &&
                    moviesList.map((movie) => {
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
