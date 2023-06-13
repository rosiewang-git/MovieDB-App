import React from "react";
import "./MovieCard.css";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { IMG_SRC_BASE } from "../../constants";
import ClientAPI from "../../apiServices";
import { useSelector, useDispatch } from "react-redux";
import { setFavList } from "../../store/slices/movies-slice";
import MovieModel from "../../models/MovieModel";
import { RootState } from "../../store/store";

export const MovieCard: React.FC<{
    item: MovieModel;
    myRating: number;
    favorite: boolean;
}> = (props) => {
    const { user } = useSelector((state: RootState) => state.user);
    const { item, myRating, favorite } = props;
    const { favList } = useSelector((state: RootState) => state.movies);
    const dispatch = useDispatch();
    const handleToggleFavorite = (id: number) => {
        if (!user) {
            return;
        }
        try {
            const { sessionId, userId } = user;
            ClientAPI.addMovieToFavorite(
                userId,
                id,
                !favList[id],
                sessionId
            ).then(() => {
                dispatch(
                    setFavList({
                        ...favList,
                        [id]: !favList[id],
                    })
                );
            });
        } catch (error: any) {
            console.log(error);
        }
    };
    console.log("favList", favList);

    const renderHeart = () => {
        if (!user) {
            return;
        } else if (user && favorite) {
            return <FavoriteIcon style={{ color: "red" }} />;
        } else {
            return <FavoriteBorderIcon style={{ color: "grey" }} />;
        }
    };

    return (
        <div className="movie-card">
            <Link
                to={`/movies/${item.id}`}
                style={{
                    textDecoration: "none",
                    color: "black",
                }}
                className="movie-title"
            >
                <img
                    src={`${IMG_SRC_BASE}${item.poster_path}`}
                    alt="movie-img"
                />
                <p className="character-limit">{item.original_title} </p>
            </Link>
            <div className="card-score-fav">
                <span>
                    <StarIcon style={{ color: "orange" }} />
                    {user && myRating
                        ? `${item.vote_average} / ${myRating}`
                        : item.vote_average}
                </span>
                <Button onClick={() => handleToggleFavorite(item.id)}>
                    {renderHeart()}
                </Button>
            </div>
        </div>
    );
};
