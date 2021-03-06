import React, { useState, useEffect } from "react";
import { MAX_USERS_PER_PAGE } from "./config";
import UserDetails from "./UserDetails";
import Modal from "./Modal";

let max_range = MAX_USERS_PER_PAGE;
//let min_range = 0;
let curPagination = 1;

function Table({ data }) {
  const [modal, setModal] = useState({ modalShow: false, modalInfo: "" });
  //const [searchedUser, setSearchedUser] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const initailTableData = () => {
      let page = 1;
      console.log(
        "set initail tabledata...",
        data.slice(max_range * page - MAX_USERS_PER_PAGE, max_range * page)
      );

      setTableData(
        data.slice(max_range * page - MAX_USERS_PER_PAGE, max_range * page)
      );
    };
    initailTableData();
  }, [data]);

  const handleModal = (info = "") => {
    setModal({
      modalShow: !modal.modalShow,
      modalInfo: !modal.modalShow ? <UserDetails user={info} /> : "",
    });
  };

  console.log(data);
  const handlePaginationClick = (e, page) => {
    e.preventDefault();
    if (e.target.className !== "pagination_active") {
      document
        .querySelector(".pagination_active")
        .classList.remove("pagination_active");
      e.target.className = "pagination_active";
    }
    curPagination = page;
    setTableData(
      data.slice(max_range * page - MAX_USERS_PER_PAGE, max_range * page)
    );
  };

  const handleSearchChange = (e) => {
    console.log("in handleSearchChange", e.target.value);
    console.log("matchedres...");
    if (e.target.value === "") {
      setTableData(
        data.slice(
          max_range * curPagination - MAX_USERS_PER_PAGE,
          max_range * curPagination
        )
      );
    } else {
      getSearchMatchedData(e.target.value)
        .then((result) => {
          if (result.status === 200) {
            console.log(result);
            setTableData(result.data);
          }
        })
        .catch((e) => {
          alert("Error faced while filtering results");
        });
    }
  };

  const getSearchMatchedData = (query) => {
    return new Promise((resolve, reject) => {
      let temp = [];
      try {
        temp = data
          .slice(
            max_range * curPagination - MAX_USERS_PER_PAGE,
            max_range * curPagination
          )
          .filter((user) => {
            return (
              user["id"]
                .toString()
                ?.toLowerCase()
                ?.includes(query?.toLowerCase()) ||
              user["first_name"]
                ?.toLowerCase()
                ?.includes(query?.toLowerCase()) ||
              user["last_name"]
                ?.toLowerCase()
                ?.includes(query?.toLowerCase()) ||
              user["email"]?.toLowerCase()?.includes(query?.toLowerCase())
            );
          });
        resolve({ data: temp, status: 200 });
      } catch (e) {
        throw new Error(JSON.stringify({ data: temp, status: 500 }));
      }
    });
  };

  return (
    <div className="table">
      <div className="table_search_container">
        <input
          placeholder="search user(id/name/email)..."
          className="table_search"
          onChange={(e) => handleSearchChange(e)}
        ></input>
      </div>
      <div className="table_load">
        <table>
          <tbody>
            {tableData.map((user) => {
              return (
                <tr
                  key={user.id}
                  onClick={() => {
                    console.log("user clicked");
                    handleModal(user);
                  }}
                >
                  <td>
                    <img src={user.avatar} alt="avatar" />
                  </td>
                  <td>
                    <strong>
                      {user["first_name"] + " " + user["last_name"]}
                    </strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <a href="#">&laquo;</a>
        <a
          href="#"
          className="pagination_active"
          onClick={(e) => handlePaginationClick(e, 1)}
        >
          1
        </a>
        <a href="#" onClick={(e) => handlePaginationClick(e, 2)}>
          2
        </a>
        <a href="#" onClick={(e) => handlePaginationClick(e, 3)}>
          3
        </a>
        <a href="#">&raquo;</a>
      </div>
      <Modal
        displayModal={modal.modalShow}
        modalInfo={modal.modalInfo}
        closeModal={handleModal}
      />
    </div>
  );
}

export default Table;
