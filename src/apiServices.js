import axios from "axios";
import { API_KEY, API_SRC_BASE } from "./constants";

const ClientAPI = {
    getMoviesList: async (category, currentPage) => {
        let url = `${API_SRC_BASE}/movie/${category}?api_key=${API_KEY}&page=${currentPage}`;
        return await axios.get(url);
    },
    getMovieDetails: async (movieId) => {
        let url = `${API_SRC_BASE}/movie/${movieId}?api_key=${API_KEY}`;
        return await axios.get(url);
    },
    getRequestToken: async () => {
        let url = `${API_SRC_BASE}/authentication/token/new?api_key=${API_KEY}`;
        return await axios.get(url);
    },
    validateUser: async (username, password, requestToken) => {
        let url = `${API_SRC_BASE}/authentication/token/validate_with_login?api_key=${API_KEY}`;
        return await axios.post(url, {
            username,
            password,
            request_token: requestToken,
        });
    },
    createSession: async (requestToken) => {
        let url = `${API_SRC_BASE}/authentication/session/new?api_key=${API_KEY}`;
        return await axios.post(url, { request_token: requestToken });
    },
    getUserAccount: async (sessionId) => {
        let url = `${API_SRC_BASE}/account?api_key=${API_KEY}`;
        return await axios.get(url, { params: { session_id: sessionId } });
    },
    addMovieToFavorite: async (accountId, movieId, isFavorite, sessionId) => {
        let url = `${API_SRC_BASE}/account/${accountId}/favorite?api_key=${API_KEY}`;
        return await axios.post(
            url,
            {
                media_type: "movie",
                media_id: movieId,
                favorite: isFavorite,
            },
            { params: { session_id: sessionId } }
        );
    },
    rateMovie: async (sessionId, movieId, rateValue) => {
        let url = `${API_SRC_BASE}/movie/${movieId}/rating?api_key=${API_KEY}`;
        return await axios.post(
            url,
            { value: rateValue },
            { params: { session_id: sessionId } }
        );
    },
    getFavoriteMovies: async (accountId, sessionId) => {
        let url = `${API_SRC_BASE}/account/${accountId}/favorite/movies?api_key=${API_KEY}`;
        return await axios.get(url, { params: { session_id: sessionId } });
    },
    getRatedMovies: async (accountId, sessionId) => {
        let url = `${API_SRC_BASE}/account/${accountId}/rated/movies?api_key=${API_KEY}`;
        return await axios.get(url, { params: { session_id: sessionId } });
    },
};

export default ClientAPI;
