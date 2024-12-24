import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/SignUp";

function Auth() {
  const [state, setState] = useState("login");
  const [infoMessage, setInfoMessage] = useState(""); // Info message to display on Login page

  return (
    <div className="auth w-full h-screen bg-blue-100 flex items-center justify-center">
      {state === "login" ? (
        <Login
          state={state}
          setState={setState}
          infoMessage={infoMessage}
          clearInfoMessage={() => setInfoMessage("")}
        />
      ) : (
        <Signup
          state={state}
          setState={setState}
          onSuccessfulSignup={() => {
            setInfoMessage("Registration successful! Please log in.");
            setState("login");
          }}
        />
      )}
    </div>
  );
}

export default Auth;
