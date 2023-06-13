import React, { useEffect, useState } from "react";
import ClientAPI from "../../apiServices";
import "./Rated.css";
import { MovieCard } from "../SharedComponenets/MovieCard";
import { RootState } from "../../store/store";
import { Pagination } from "../SharedComponenets/Pagination";
import { useSelector } from "react-redux";
import SpinnerLoading from "../SharedComponenets/SpinnerLoading";

export default function Rated() {
    const [ratedMovies, setRatedMovies] = useState<any[]>([]);
    const { favList, currentPage } = useSelector(
        (state: RootState) => state.movies
    );
    const { user } = useSelector((state: RootState) => state.user);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!user) {
            return;
        }
        const fetchRatedMovies = async () => {
            try {
                const response = await ClientAPI.getRatedMovies(
                    user.userId,
                    user.sessionId,
                    currentPage
                );
                const { results, total_pages } = response.data;
                setTotalPages(total_pages);
                setRatedMovies(results);
                setError(null);
            } catch (error) {
                setError(
                    "Error fetching rated movies. Please try again later."
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchRatedMovies();
    }, [user]);
    console.log("fetchRated movie", ratedMovies);

    if (error) {
        return <div>{error}</div>;
    }
    if (isLoading) {
        return <SpinnerLoading />;
    }

    return (
        <div>
            <div className="rated-pagination">
                {totalPages > 1 && <Pagination totalPages={totalPages} />}
            </div>
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
