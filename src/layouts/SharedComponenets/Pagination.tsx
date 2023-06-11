import React from "react";
import { setCurrentPage } from "../../store/slices/movies-slice";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";

export const Pagination: React.FC<{
    totalPages: number;
}> = (props) => {
    const dispatch = useDispatch();
    const { currentPage } = useSelector((state: RootState) => state.movies);
    const handlePREV = () => {
        if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
    };
    const handleNEXT = () => {
        if (currentPage < props.totalPages)
            dispatch(setCurrentPage(currentPage + 1));
    };
    return (
        <div className="pagination-flex">
            <button
                type="button"
                className="btn btn-outline-dark custom"
                onClick={handlePREV}
            >
                PREV
            </button>
            <p>{currentPage + "/" + props.totalPages}</p>
            <button
                type="button"
                className="btn btn-outline-dark custom"
                onClick={handleNEXT}
            >
                NEXT
            </button>
        </div>
    );
};
