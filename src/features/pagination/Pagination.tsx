import React, { useEffect } from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
    loadNextPage,
    loadPage,
    selectCurrPage,
    selectPages,
    setPage,
} from "./paginationSlice";

const Pagination: React.FC = () => {
    const { pageNum: pageNumStr } = useParams<{ pageNum: string }>();
    const currPage = useSelector(selectCurrPage);
    const pages = useSelector(selectPages);
    const dispatch = useDispatch();

    useEffect(() => {
        const pageNum = parseInt(pageNumStr, 10);
        if (pageNum) {
            dispatch(setPage(pageNum));

            if (pages.indexOf(pageNum) > 0) {
                dispatch(loadPage(pageNum));
            } else {
                dispatch(loadNextPage());
                dispatch(pushPage());
            }
        } else {
            dispatch(setPage(1));
            dispatch(loadNextPage());
            dispatch(pushPage());
        }
    }, [pageNumStr]);

    return (
        <nav
            className="d-flex justify-content-center mt-2"
            aria-label="Page navigation example"
        >
            <ul className="pagination text-center">
                {/* prev */}
                <li className={`page-item ${currPage - 1 === 0 ? "disabled" : ""}`}>
                    <Link
                        className="page-link"
                        aria-label="Next"
                        to={`/page/${currPage - 1}`}
                    >
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </Link>
                </li>
                {/* 2nd before current */}
                {currPage - 2 > 0 &&
                    <li className="page-item">
                        <Link
                            className="page-link"
                            to={`/page/${currPage - 2}`}
                        >
                            {currPage - 2}
                        </Link>
                    </li>
                }
                {/* 1st before current */}
                {currPage - 1 > 0 &&
                    <li className="page-item">
                        <Link
                            className="page-link"
                            to={`/page/${currPage - 1}`}
                        >
                            {currPage - 1}
                        </Link>
                    </li>
                }
                {/* current */}
                <li className="page-item active">
                    <span className="page-link">{currPage}</span>
                </li>
                {/* 1st after current */}
                <li className={`page-item ${!pages[currPage] ? "disabled" : ""}`}>
                    <Link
                        className="page-link"
                        aria-label="Next"
                        to={`/page/${currPage + 1}`}
                    >
                        {currPage + 1}
                    </Link>
                </li>
                {/* 2nd after current */}
                {currPage + 1 <= pages.length &&
                    <li className="page-item">
                        <Link
                            className="page-link"
                            aria-label="Next"
                            to={`/page/${currPage + 2}`}
                        >
                            {currPage + 2}
                        </Link>
                    </li>
                }
                {/* next */}
                {/* TODO: change disability condition */}
                <li className={`page-item ${false ? "disabled" : ""}`}>
                    <Link
                        className="page-link"
                        aria-label="Next"
                        to={`/page/${currPage + 1}`}
                    >
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
