import ClientAPI from "../apiServices";
import { setFavList, setRatedList } from "../store/slices/movies-slice";
import { setUser } from "../store/slices/user-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function useUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                                dispatch(setUser(userInfo));
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
        dispatch(setUser(null));
        navigate("/");
    };

    const loadUserData = () => {
        const userDataStr = localStorage.getItem("user");
        if (userDataStr) {
            try {
                const userInfo = JSON.parse(userDataStr);
                dispatch(setUser(userInfo));
                loadUserMovies(userInfo);
            } catch (e) {
                console.log(e);
            }
        }
    };
    return { login, logout, loadUserData };
}