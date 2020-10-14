import React from "react";
import Pagination from "./features/pagination/Pagination";
import UserList from "./features/userList/UserList";

const Home: React.FC = () => (
    <>
        <UserList />
        <Pagination />
    </>
);

export default Home;
