// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import Login from "./Login";
import Register from "./Register";
import DashBoard from "../DashBoard";
import { useStore } from "effector-react";
import globalState from "../../effector/src/globalState";

const Auth = ({ authRoute }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useStore(globalState.$store);

  return (
    <>
      {false ? (
        <Loading />
      ) : (
        <>
          {authRoute === "login" && <Login />}
          {authRoute === "register" && <Register />}
        </>
      )}
    </>
  );
};

export default Auth;
