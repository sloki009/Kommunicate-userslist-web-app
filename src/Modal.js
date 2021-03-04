import React from "react";
import "./modal.css";

function Modal(props) {
  function displayInfo() {
    return <div className="modal-info">{props.modalInfo}</div>;
  }

  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
  }

  const divStyle = {
    display: props.displayModal ? "block" : "none",
  };
  return (
    <div className="modal" onClick={closeModal} style={divStyle}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={closeModal}>
          &times;
        </span>

        <div className="modal-flex">{displayInfo()}</div>
      </div>
    </div>
  );
}

export default Modal;
