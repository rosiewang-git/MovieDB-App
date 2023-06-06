import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
                        <Button variant="outlined" onClick={handlePREV}>
                            PREV
                        </Button>
                        <p>{currentPage + "/" + info.total_pages}</p>
                        <Button
                            variant="outlined"
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            NEXT
                        </Button>
                    </div>
                )}
                <Box sx={{ width: 200, paddingRight: "32px" }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Category
                        </InputLabel>
                        <Select
                            label="Category"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            onChange={(e) => (
                                setCategory(e.target.value), setCurrentPage(1)
                            )}
                        >
                            <MenuItem value={"popular"}>Popular</MenuItem>
                            <MenuItem value={"now_playing"}>
                                Now Playing
                            </MenuItem>
                            <MenuItem value={"top_rated"}>Top Rated</MenuItem>
                            <MenuItem value={"upcoming"}>Upcoming</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
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
