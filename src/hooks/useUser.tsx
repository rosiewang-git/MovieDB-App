import React, { useState, useEffect } from "react";
import ClientAPI from "../apiServices";
import { setFavList, setRatedList } from "../store/slices/movies-slice";
import { setUser } from "../store/slices/user-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export interface UserInfo {
    requestToken: string;
    sessionId: string;
    userId: number;
    userName: string;
}

export default function useUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [displayWarning, setDisplayWarning] = useState(false);

    const loadUserMovies = async (userInfo: UserInfo) => {
        try {
            let currentPageFav = 1;
            let favList: { [key: number]: boolean } = {};
            let currentPageRate = 1;
            let ratedList: { [key: number]: number } = {};
            while (true) {
                const {
                    data,
                }: { data: { results: any[]; total_pages: number } } =
                    await ClientAPI.getFavoriteMoviesPage(
                        userInfo.userId,
                        userInfo.sessionId,
                        currentPageFav
                    );
                const { results, total_pages } = data;
                // Add movie IDs to the favList object
                results.forEach((movie) => {
                    favList[movie.id] = true;
                });
                // Check if there are more pages to fetch
                if (currentPageFav >= total_pages) {
                    break;
                }
                // Move to the next page
                currentPageFav++;
            }
            dispatch(setFavList(favList));

            while (true) {
                const {
                    data,
                }: { data: { results: any[]; total_pages: number } } =
                    await ClientAPI.getRatedMovies(
                        userInfo.userId,
                        userInfo.sessionId,
                        currentPageRate
                    );
                const { results, total_pages } = data;
                // Add movie IDs to the ratedList object
                results.forEach((movie) => {
                    ratedList[movie.id] = movie.rating;
                });
                // Check if there are more pages to fetch
                if (currentPageRate >= total_pages) {
                    break;
                }
                // Move to the next page
                currentPageRate++;
            }
            dispatch(setRatedList(ratedList));
        } catch (error) {
            console.log(error);
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const { data } = await ClientAPI.getRequestToken();
            const { request_token } = data;
            await ClientAPI.validateUser(username, password, request_token);
            const { data: sessionData } = await ClientAPI.createSession(
                request_token
            );
            const { session_id } = sessionData;
            const { data: userData } = await ClientAPI.getUserAccount(
                session_id
            );
            const { id, username: userName } = userData;
            const userInfo: UserInfo = {
                requestToken: request_token,
                sessionId: session_id,
                userId: id,
                userName: userName,
            };
            localStorage.setItem("user", JSON.stringify(userInfo));
            dispatch(setUser(userInfo));
            loadUserMovies(userInfo);
        } catch (error: any) {
            setDisplayWarning(true); // Handle the error for invalid username or password
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        dispatch(setUser(null));
        navigate("/");
    };

    const loadUserData = () => {
        const userDataStr = localStorage.getItem("user");
        if (userDataStr) {
            try {
                const userInfo: UserInfo = JSON.parse(userDataStr);
                dispatch(setUser(userInfo));
                loadUserMovies(userInfo);
            } catch (error) {
                console.log(error);
            }
        }
    };
    return { login, logout, loadUserData, displayWarning, setDisplayWarning };
}
