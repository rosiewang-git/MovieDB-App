import React from "react";
import "./MovieCard.css";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { IMG_SRC_BASE } from "../constants";
import useUser from "../hooks/useUser";
import ClientAPI from "../apiServices";
import { useSelector, useDispatch } from "react-redux";
import { setFavList } from "../store/slices/movies-slice";

export default function MovieCard(props) {
    const { user } = useUser();
    const { item, myRating, favorite } = props;
    const { favList } = useSelector((state) => state.movies);
    const dispatch = useDispatch();
    const handleToggleFavorite = (id) => {
        if (!user) {
            return;
        }
        const { sessionId, userId } = user;
        ClientAPI.addMovieToFavorite(userId, id, !favList[id], sessionId).then(
            () => {
                dispatch(
                    setFavList({
                        ...favList,
                        [id]: !favList[id],
                    })
                );
            }
        );
    };

    return (
        <div className="movie-card">
            <img src={`${IMG_SRC_BASE}${item.poster_path}`} alt="movie-img" />
            <Link
                to={`/movies/${item.id}`}
                style={{
                    textDecoration: "none",
                    color: "black",
                }}
                className="movie-title"
            >
                <p>{item.original_title} </p>
            </Link>
            <div className="card-score-fav">
                <span>
                    <StarIcon style={{ color: "orange" }} />
                    {myRating
                        ? `${item.vote_average} / ${myRating}`
                        : item.vote_average}
                </span>
                <Button onClick={() => handleToggleFavorite(item.id)}>
                    {user && favorite ? (
                        <FavoriteIcon style={{ color: "red" }} />
                    ) : (
                        <FavoriteBorderIcon style={{ color: "grey" }} />
                    )}
                </Button>
            </div>
        </div>
    );
}
