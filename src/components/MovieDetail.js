import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetail.css";
import StarIcon from "@mui/icons-material/Star";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import ClientAPI from "../apiServices";
import { IMG_SRC_BASE } from "../constants";
import { setRatedList } from "../store/slices/movies-slice";
import { useSelector, useDispatch } from "react-redux";
import useUser from "../hooks/useUser";
import _ from "lodash";

export default function MovieDetail() {
    const [score, setScore] = useState(1);
    const { movieId } = useParams();
    const [detail, setDetail] = useState({});
    const { ratedList } = useSelector((state) => state.movies);
    const { user } = useUser();
    const dispatch = useDispatch();

    const handleRate = (id, rating) => {
        ClientAPI.rateMovie(user.sessionId, id, rating).then(() => {
            dispatch(
                setRatedList({
                    ...ratedList,
                    [id]: rating,
                })
            );
        });
    };

    useEffect(() => {
        ClientAPI.getMovieDetails(movieId)
            .then((resp) => resp.data)
            .then((res) => {
                setDetail(res);
            });
    }, []);

    return (
        <div className="detail-container">
            <img src={`${IMG_SRC_BASE}${detail.poster_path}`} alt="movie-img" />
            <div>
                <h1>{detail.title} </h1>
                <p>Release date:</p>
                <p>{detail.release_date} </p>
                <p>Overview: </p>
                <p>{detail.overview} </p>
                <p>Genres: </p>
                <div className="genres-flex">
                    {detail.genres &&
                        detail.genres.map((ele) => {
                            return <p>{ele.name} </p>;
                        })}
                </div>
                <p>Average Rating: </p>
                <span>
                    <StarIcon
                        style={{ color: "orange", marginRight: "10px" }}
                    />
                    {detail.vote_average}
                </span>
                <p>Your Rating: </p>
                {user && ratedList[detail.id] ? (
                    <p>{ratedList[detail.id]}</p>
                ) : (
                    <p> Not yet</p>
                )}
                <span className="rating-flex">
                    <Select
                        className="rating-box"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                    >
                        {_.range(1, 11).map((num) => (
                            <MenuItem key={num} value={num}>
                                {num}
                            </MenuItem>
                        ))}
                    </Select>
                    <Button
                        variant="outlined"
                        onClick={() => handleRate(detail.id, score)}
                    >
                        RATE IT!
                    </Button>
                </span>
                <p>Production Companies: </p>
                <span className="production-flex">
                    {detail.production_companies &&
                        detail.production_companies.map((ele) => {
                            return (
                                <div>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${ele.logo_path}`}
                                        alt="company-img"
                                    />
                                    <p>{ele.name}</p>
                                </div>
                            );
                        })}
                </span>
            </div>
        </div>
    );
}
