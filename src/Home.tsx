import React from "react";
import { Link } from "react-router-dom";
import UserList from "./features/userList/UserList";

const Home: React.FC = () => (
    <>
        <UserList />
        <nav
            className="d-flex justify-content-center mt-2"
            aria-label="Page navigation example"
        >
            <ul className="pagination text-center">
                <li className="page-item disabled">
                    <button className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </button>
                </li>
                <li className="page-item">
                    <Link className="page-link" to="/page/1">1</Link>
                </li>
                <li className="page-item">
                    <button
                        className="page-link"
                        aria-label="Next"
                    >
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </button>
                </li>
            </ul>
        </nav>
    </>
);

export default Home;
