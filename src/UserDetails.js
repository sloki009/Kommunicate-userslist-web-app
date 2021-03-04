import React from "react";
import styled from "styled-components";

const CustomHrTag = styled.hr`
  margin: 5px 0 5px 0;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
`;

function UserDetails({ user }) {
  return (
    <div className="userdetails_container">
      <div className="poster">
        <div className="userintro">
          <strong>{user["first_name"] + " " + user["last_name"]}</strong>
        </div>
        <img src={user.avatar} alt="user avatar" />
      </div>
      <CustomHrTag />
      <div className="extras">
        <div className="contact">
          <div style={{ height: "100%", color: "#8a2be2" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
            </svg>
          </div>
          <div>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
