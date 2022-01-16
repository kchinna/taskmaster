import "./App.css";
// import { db } from "./firebase";
// import { uid } from "uid";
// import { set, ref, onValue, remove, update } from "firebase/database";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./Components/Sign-In/Sign-In";
import SignOut from "./Components/Sign-Out/Sign-Out";
import Dashboard from "./Components/Dashboard/Dashboard";
import { auth } from "./firebase.js";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [uid, setUID] = useState("");
  const [userName, setUserName] = useState("");

  const firebaseSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((re) => {
        console.log(re);
        console.log(re.user.displayName);
        setUID(re.user.uid);
        setUserName(re.user.displayName.split(" ")[0]);
        setSignedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const firebaseSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        setSignedIn(false);
        setUID("");
      })
      .catch((error) => {
        console.log("sign out failed");
        console.log(error);
      });
  };

  if (signedIn) {
    return (
      <>
        <Router>
          <div className="header">
            <div className="header-content">
              <p className="welcome">Welcome {userName},</p>

              {/* <div className="menu-items"> */}
              <div className="signout-button" onClick={firebaseSignOut}>
                sign out
              </div>
              {/* </div> */}
            </div>
          </div>
          <Routes>
            <Route
              exact
              path="/"
              element={<Dashboard username={userName} uid={uid} />}
            />
          </Routes>
        </Router>
      </>
    );
  } else {
    return (
      <>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={<Signin signin={firebaseSignIn} />}
            />
          </Routes>
        </Router>
        {/* <Signin /> */}
      </>
    );
  }
}

export default App;
