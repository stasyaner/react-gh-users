import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// TODO: revisit when the decision on whether to use iterator or just request is made
/* import { Octokit } from "@octokit/core";
import { paginateRest } from "@octokit/plugin-paginate-rest"; */
// ------------------
import { request as ghRestRequest } from "@octokit/request";
import { UsersListResponseData } from "@octokit/types";

// TODO: revisit when the decision on whether to use iterator or just request is made
/* const myOctokit = Octokit.plugin(paginateRest);
const { paginate: { iterator: ghRequest } } = new myOctokit(); */

const Home: React.FC = () => {
    const [users, setUsers] = useState<UsersListResponseData>();
    useEffect(() => {
        void (async function(): Promise<void> {
            try {
                setUsers((await ghRestRequest("GET /users?per_page=10")).data);
                // TODO: revisit when the decision on whether to use iterator or just request is made
                /* let i = 0;
                for await (const res of ghRequest("GET /users")) {
                    console.log(res.data);
                    i += res.data.length;
                    if (i > 100) break;
                } */
            } catch (e) {
                console.log(e.message);
            }
        })();
    }, []);

    return (
        <>
            <ul className="list-group text-center">
                {users?.map(({ id, login, avatar_url }) => (
                    <li key={id} className="list-group-item">
                        <img src={avatar_url} height="20" className="mr-1" alt={`${login}'s avatar`} />
                        <Link to={`/user/${login}`}>{login}</Link>
                    </li>
                ))}
            </ul>
            <nav
                className="d-flex justify-content-center mt-2"
                aria-label="Page navigation example"
            >
                <ul className="pagination text-center">
                    <li className="page-item">
                        <button className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </button>
                    </li>
                    <li className="page-item"><a className="page-link" href="/1">1</a></li>
                    <li className="page-item"><a className="page-link" href="/2">2</a></li>
                    <li className="page-item"><a className="page-link" href="/3">3</a></li>
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
};

export default Home;
