import React, { useEffect } from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";
import {
    useParams,
    useHistory,
} from "react-router-dom";
import {
    fetchUserDetails,
    selectUserDetails
} from "./features/userDetails/userDetails";

const User: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { username } = useParams<{ username: string }>();
    const details = useSelector(selectUserDetails);

    useEffect(() => {
        dispatch(fetchUserDetails(username));
    }, [dispatch, username]);

    return (
        <>
            <button
                className="btn btn-link px-0"
                onClick={(): void => { history.goBack(); }}
            >
                Go back
            </button>
            {details ? (
                <ul className="mt-2">
                    {Object.entries(details).map(e => <li key={e[0]}>{e[0]}: {e[1]}</li>)}
                </ul>
            ) : ""}
        </>
    );
};

export default User;
