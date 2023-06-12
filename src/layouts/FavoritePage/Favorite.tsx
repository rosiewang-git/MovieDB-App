import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClientAPI from "../../apiServices";
import "./Favorite.css";
import { MovieCard } from "../SharedComponenets/MovieCard";
import { RootState } from "../../store/store";
import { Pagination } from "../SharedComponenets/Pagination";

export default function Favorite() {
    const [favMovies, setFavMovies] = useState<any[]>([]);
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
        const fetchFavoriteMovies = async () => {
            try {
                const response = await ClientAPI.getFavoriteMovies(
                    user.userId,
                    user.sessionId,
                    currentPage
                );
                const { results, total_pages } = response.data;
                setTotalPages(total_pages);
                setFavMovies(results);
                setError(null);
            } catch (error) {
                setError(
                    "Error fetching favorite movies. Please try again later."
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchFavoriteMovies();
    }, [user, currentPage, favList]);

    if (error) {
        return <div>{error}</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="fav-pagination">
                {totalPages > 1 && <Pagination totalPages={totalPages} />}
            </div>
            <div className="fav-movie-list">
                {user &&
                    favMovies &&
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
