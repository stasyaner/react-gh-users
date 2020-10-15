import React from "react";
import { useSelector } from "react-redux";
import { selectUserList } from "./userListSlice";
import { Link } from "react-router-dom";

const UserList: React.FC = () => {
    const userList = useSelector(selectUserList);

    return (
        <ul className="list-group text-center">
            {userList?.map(({ id, login, avatar_url }) => (
                <li key={id} className="list-group-item">
                    <Link to={`/user/${login}`}>
                        <img src={avatar_url} height="20" className="mr-1" alt={`${login}'s avatar`} />
                    </Link>
                    {login}
                </li>
            ))}
        </ul>
    );
};

export default UserList;
