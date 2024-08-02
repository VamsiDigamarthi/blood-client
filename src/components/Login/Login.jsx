import React, { useEffect, useState } from "react";
import "./Login.css";
// import { API } from "../../core/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogIns } from "../../action/AuthAction";
// import { generateToken } from "../../firebase/firebase";
const Login = ({ setShowLogin }) => {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onHandleLoginAction = (e) => {
    e.preventDefault();
    console.log("dfghnjmk,.");
    dispatch(LogIns({ phone }, navigate));
    // API.post("/auth/login", { phone })
    //   .then((res) => {
    //     localStorage.setItem("blood-user", JSON.stringify(res.data));
    //     // console.log(res.data);
    //     navigate("/donor", { replace: true });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };

  return (
    <form onSubmit={onHandleLoginAction} className="login-main">
      <input
        onChange={(e) => setPhone(e.target.value)}
        type="text"
        placeholder="Mobile"
      />
      <button type="submit">Submit Your Request</button>
      <span onClick={() => setShowLogin(true)}>
        Don't have an account goto Sign Up
      </span>
    </form>
  );
};

export default Login;
