import React, { useState, useEffect } from "react";
import { LIST_USERS_API } from "./api";
import Table from "./Table";
import "./home.css";

let page = 1;

function Home() {
  const [usersList, setUsersList] = useState([]);

  const fetchUsers = async () => {
    console.log(page);
    const response = await fetch(`${LIST_USERS_API}?page=${page}`);
    const json = await response.json();
    page = page === 1 ? 2 : 2;
    setUsersList([...usersList, ...json.data]);
  };
  useEffect(() => {
    console.log("in useeffect...");
    fetchUsers(page);
  }, [page]);
  return (
    <div className="container">
      <div className="table_container">
        <Table data={usersList} />
      </div>
    </div>
  );
}

export default Home;
