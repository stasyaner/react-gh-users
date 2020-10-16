import React, { useEffect } from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import {
    Link,
    useHistory,
} from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    fetchNextPage,
    fetchRandomPage,
    loadPage,
    selectCurrPage,
    selectPages,
    setPage,
} from "./paginationSlice";

const Pagination: React.FC = () => {
    const history = useHistory();
    const { pageNum: pageNumStr } = useParams<{ pageNum: string }>();
    const currPage = useSelector(selectCurrPage);
    const pages = useSelector(selectPages);
    const dispatch = useDispatch();

    useEffect(() => {
        const pageNum = parseInt(pageNumStr, 10);
        if (pageNum) {
            // just going through loaded pages
            if (pages.indexOf(pageNum) >= 0) {
                dispatch(setPage(pageNum));
                dispatch(loadPage(pageNum));
            }
            // it's just a next page or page 1 refresh
            else if (pageNum === 1 || pages[pages.length - 1] === pageNum - 1) {
                dispatch(setPage(pageNum));
                dispatch(fetchNextPage());
            }
            // this page is not loaded
            else {
                toast.info((
                    <div>
                        This page is not loaded yet. It might take a while. <br />
                        Do you want to load?
                        <div className="btn-group btn-group-sm ml-2" role="group" aria-label="Decide:">
                            <button
                                className="btn btn-outline-light"
                                onClick={(): void => { dispatch(fetchRandomPage(pageNum)); }}
                            >
                                yes
                            </button>
                            <button
                                className="btn btn-outline-light"
                                onClick={(): void => { history.push("/"); }}
                            >
                                no
                            </button>
                        </div>
                    </div>
                ), { autoClose: false });
            }
        } else {
            dispatch(setPage(1));
            dispatch(fetchNextPage());
        }
    // we need the page to re-render only on pageNumStr update
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                {currPage + 1 <= pages.length &&
                    <li className="page-item">
                        <Link
                            className="page-link"
                            aria-label="Next"
                            to={`/page/${currPage + 1}`}
                        >
                            {currPage + 1}
                        </Link>
                    </li>
                }
                {/* 2nd after current */}
                {currPage + 2 <= pages.length &&
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
                <li className="page-item">
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
