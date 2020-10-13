import React from "react";
import {
    useParams,
} from "react-router-dom";

const User: React.FC = () => {
    const { username } = useParams<{ username: string }>();

    return <h3>user</h3>;
};

export default User;
