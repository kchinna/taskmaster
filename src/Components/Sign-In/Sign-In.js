import React from "react";
import "./Sign-In.css";
import img from "../../Images/note-logo.png";

const Signin = (props) => {
  return (
    <div id="sign-in-page">
      <div id="sign-in-card">
        {/* <h1 id="sign-in-title">taskmaster</h1> */}
        <img src={img} alt="TaskMaster logo" id="sign-in-page-logo" /> <br />
        <h1 id="sign-in-title">taskmaster</h1>
        <button onClick={props.signin} id="sign-in-btn">
          sign in
        </button>
      </div>
    </div>
  );
};

export default Signin;
