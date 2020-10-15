import React from "react";
import {
    useParams,
    useHistory,
} from "react-router-dom";

const User: React.FC = () => {
    const history = useHistory();
    const { username } = useParams<{ username: string }>();

    return (
        <>
            <button
                className="btn btn-link px-0"
                onClick={(): void => { history.goBack(); }}
            >
                Go back
            </button>
            <h3>Hi, {username} !</h3>
        </>
    );
};

export default User;
