import React from "react";

const Signin = (props) => {
  return (
    <div>
      <h1>Task Master</h1>
      <button onClick={props.signin}>Sign In</button>
      {/* <button onClick={firebaseSignOut}>Sign Out</button> */}
    </div>
  );
};

export default Signin;
