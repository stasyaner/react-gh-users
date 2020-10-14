import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserList, selectUserList } from "./userListSlice";
import { Link } from "react-router-dom";

const UserList: React.FC = () => {
    const userList = useSelector(selectUserList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserList());
    }, [dispatch]);

    return (
        <ul className="list-group text-center">
            {userList?.map(({ id, login, avatar_url }) => (
                <li key={id} className="list-group-item">
                    <img src={avatar_url} height="20" className="mr-1" alt={`${login}'s avatar`} />
                    <Link to={`/user/${login}`}>{login}</Link>
                </li>
            ))}
        </ul>
    );
};

export default UserList;
