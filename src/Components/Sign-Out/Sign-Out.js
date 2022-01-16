import React from "react";
import "./Sign-Out.css";

const SignOut = (props) => {
  return (
    <div>
      <div className="add-button" onClick={props.signout}>
        Sign Out
      </div>
    </div>
  );
};

export default SignOut;
