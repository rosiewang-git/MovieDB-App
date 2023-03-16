import ClientAPI from "../apiServices";
import { setFavList, setRatedList } from "../store/slices/movies-slice";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import userContext from "../contexts/userContext";

export default function useUser() {
    const { user, setUser } = useContext(userContext);
    const dispatch = useDispatch();
    const loadUserMovies = (userInfo) => {
        ClientAPI.getFavoriteMovies(userInfo.userId, userInfo.sessionId).then(
            ({ data }) => {
                const { results } = data;
                const favList = results.reduce((acc, movie) => {
                    acc[movie.id] = true;
                    return acc;
                }, {});
                dispatch(setFavList(favList));
            }
        );
        ClientAPI.getRatedMovies(userInfo.userId, userInfo.sessionId).then(
            ({ data }) => {
                const { results } = data;
                const ratedList = results.reduce((acc, movie) => {
                    acc[movie.id] = movie.rating;
                    return acc;
                }, {});
                dispatch(setRatedList(ratedList));
            }
        );
    };

    const login = (username, password) => {
        return ClientAPI.getRequestToken().then(({ data }) => {
            const { request_token } = data;
            ClientAPI.validateUser(username, password, request_token).then(
                () => {
                    ClientAPI.createSession(request_token).then(({ data }) => {
                        const { session_id } = data;
                        ClientAPI.getUserAccount(session_id)
                            .then(({ data }) => {
                                const { id, username } = data;
                                const userInfo = {
                                    requestToken: request_token,
                                    sessionId: session_id,
                                    userId: id,
                                    userName: username,
                                };
                                localStorage.setItem(
                                    "user",
                                    JSON.stringify(userInfo)
                                );
                                setUser(userInfo);
                                return userInfo;
                            })
                            .then((userInfo) => {
                                loadUserMovies(userInfo);
                            });
                    });
                }
            );
        });
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    const loadUserData = () => {
        const userDataStr = localStorage.getItem("user");
        if (userDataStr) {
            try {
                const userInfo = JSON.parse(userDataStr);
                setUser(userInfo);
                loadUserMovies(userInfo);
            } catch (e) {
                console.log(e);
            }
        }
    };
    return { user, setUser, login, logout, loadUserData };
}
