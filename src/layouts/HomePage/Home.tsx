import React, { useState, useEffect } from "react";
import "./Home.css";
import { MovieCard } from "../SharedComponenets/MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { setMoviesList, setCurrentPage } from "../../store/slices/movies-slice";
import ClientAPI from "../../apiServices";
import { RootState } from "../../store/store";
import { Pagination } from "../SharedComponenets/Pagination";
import SpinnerLoading from "../SharedComponenets/SpinnerLoading";

export const Home = () => {
    const [category, setCategory] = useState<string>("now_playing");
    const [totalPages, setTotalPages] = useState<number>(0);
    const { moviesList, favList, currentPage } = useSelector(
        (state: RootState) => state.movies
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await ClientAPI.getMoviesList(
                    category,
                    currentPage
                );
                const res = resp.data;
                dispatch(setMoviesList(res.results));
                setTotalPages(res.total_pages);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [currentPage, category]);

    if (error) {
        return (
            <div>
                <p>{error} </p>
            </div>
        );
    }
    if (isLoading) {
        return <SpinnerLoading />;
    }
    console.log("movielist", moviesList);
    return (
        <div className="home">
            <div className="home-top">
                {totalPages > 1 && <Pagination totalPages={totalPages} />}
                <select
                    className="form-select w-25"
                    aria-label="Default select example"
                    value={category}
                    onChange={(e) => (
                        setCategory(e.target.value), dispatch(setCurrentPage(1))
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
};
