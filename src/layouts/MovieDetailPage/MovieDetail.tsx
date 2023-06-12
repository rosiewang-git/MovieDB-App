import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetail.css";
import StarIcon from "@mui/icons-material/Star";
import ClientAPI from "../../apiServices";
import { IMG_SRC_BASE } from "../../constants";
import { setRatedList } from "../../store/slices/movies-slice";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { RootState } from "../../store/store";
import {
    RATING_NOT_YET,
    LOGIN_TO_SEE_RATING,
    DISPLAY_WARNING_RATE,
    DISPLAY_SUCCESS_RATE,
} from "../../constants";

interface Genre {
    name: string;
}

interface ProductionCompany {
    logo_path: string;
    name: string;
}

interface MovieDetail {
    title: string;
    release_date: string;
    overview: string;
    genres: Genre[];
    vote_average: number;
    id: number;
    poster_path: string;
    production_companies: ProductionCompany[];
}

export default function MovieDetail() {
    const [score, setScore] = useState<number>(1);
    const { movieId } = useParams();
    const [detail, setDetail] = useState<MovieDetail | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { ratedList } = useSelector((state: RootState) => state.movies);
    const { user } = useSelector((state: RootState) => state.user);
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const dispatch = useDispatch();
    const newMovieId = Number(movieId);

    const handleRate = (id: number, rating: number) => {
        if (user) {
            ClientAPI.rateMovie(user.sessionId, id, rating)
                .then(() => {
                    dispatch(
                        setRatedList({
                            ...ratedList,
                            [id]: rating,
                        })
                    );
                    setDisplaySuccess(true);
                    setDisplayWarning(false);
                })
                .catch((error) => {
                    console.error("Error rating movie:", error);
                });
        } else {
            setDisplaySuccess(false);
            setDisplayWarning(true);
        }
    };

    const handleChangeScore = (e: React.ChangeEvent<{ value: string }>) => {
        setScore(Number(e.target.value));
    };

    const renderRating = () => {
        if (detail) {
            if (user && ratedList[detail.id]) {
                return <p>{ratedList[detail.id]}</p>;
            } else if (user) {
                return <p> {RATING_NOT_YET}</p>;
            } else return <p>{LOGIN_TO_SEE_RATING}</p>;
        }
    };

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await ClientAPI.getMovieDetails(newMovieId);
                const movieDetails: MovieDetail = response.data;
                setDetail(movieDetails);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                setError("Failed to fetch movie details.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    if (error) {
        return <div>{error}</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="detail-container">
            {detail && (
                <>
                    <img
                        src={`${IMG_SRC_BASE}${detail.poster_path}`}
                        alt="movie-img"
                    />
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
                        {renderRating()}
                        <span className="rating-flex">
                            <select
                                className="form-select"
                                style={{ width: "100px" }}
                                aria-label="Default select example"
                                value={score}
                                onChange={handleChangeScore}
                            >
                                {_.range(1, 11).map((num: number) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                className="btn btn-outline-dark custom"
                                onClick={() => handleRate(detail.id, score)}
                            >
                                RATE IT!
                            </button>
                            {displayWarning && (
                                <p
                                    className="alert alert-danger w-auto p-2"
                                    role="alert"
                                >
                                    {DISPLAY_WARNING_RATE}
                                </p>
                            )}
                            {displaySuccess && (
                                <p
                                    className="alert alert-success w-auto p-2"
                                    role="alert"
                                >
                                    {DISPLAY_SUCCESS_RATE}
                                </p>
                            )}
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
                </>
            )}
        </div>
    );
}
