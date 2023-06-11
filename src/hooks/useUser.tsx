import React, { useState, useEffect } from "react";
import ClientAPI from "../apiServices";
import { setFavList, setRatedList } from "../store/slices/movies-slice";
import { setUser } from "../store/slices/user-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface UserInfo {
    requestToken: string;
    sessionId: string;
    userId: number;
    userName: string;
}

export default function useUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [displayWarning, setDisplayWarning] = useState(false);
    const { currentPage } = useSelector((state: RootState) => state.movies);
    const loadUserMovies = (userInfo: UserInfo) => {
        ClientAPI.getFavoriteMovies(
            userInfo.userId,
            userInfo.sessionId,
            currentPage
        ).then(({ data }: { data: { results: any[] } }) => {
            const { results } = data;
            const favList = results.reduce((acc, movie) => {
                acc[movie.id] = true;
                return acc;
            }, {});
            dispatch(setFavList(favList));
        });
        ClientAPI.getRatedMovies(
            userInfo.userId,
            userInfo.sessionId,
            currentPage
        ).then(({ data }: { data: { results: any[] } }) => {
            const { results } = data;
            const ratedList = results.reduce((acc, movie) => {
                acc[movie.id] = movie.rating;
                return acc;
            }, {});
            dispatch(setRatedList(ratedList));
        });
    };
    useEffect(() => {
        console.log("displayWarning:", displayWarning);
    }, [displayWarning]);

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
        } catch (error) {
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
            } catch (e) {
                console.log(e);
            }
        }
    };
    return { login, logout, loadUserData, displayWarning, setDisplayWarning };
}
