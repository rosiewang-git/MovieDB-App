export default class MovieModel {
    id: number;
    poster_path: string;
    original_title: string;
    vote_average: number;
    rating?: any;
    constructor(
        id: number,
        poster_path: string,
        original_title: string,
        vote_average: number,
        rating: any
    ) {
        this.id = id;
        this.poster_path = poster_path;
        this.original_title = original_title;
        this.vote_average = vote_average;
        this.rating = rating;
    }
}
