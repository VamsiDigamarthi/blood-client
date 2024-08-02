import React, { useState } from "react";
import "./newinitialscreen.css";

import { FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { LogIns } from "../../action/AuthAction";
import { useDispatch } from "react-redux";
const NewInitialScree = () => {
  const [ph, setPh] = useState({
    mobile: "",
  });
  const onHandleInput = (e) => {
    setPh({
      mobile: e.target.value,
    });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onHandleLogin = (e) => {
    e.preventDefault();
    console.log(ph);
    dispatch(LogIns(ph, navigate));
  };
  return (
    <div className="new-initial-screen">
      <div className="new-lohin-form-main-card">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/001/991/652/small_2x/sign-in-page-flat-design-concept-illustration-icon-account-login-user-login-abstract-metaphor-can-use-for-landing-page-mobile-app-ui-posters-banners-free-vector.jpg"
          alt=" "
        />
        <form onSubmit={onHandleLogin} className="new-initial-form-card">
          <h2>Welcome</h2>
          <p>Sign In your Account</p>
          <div>
            <FiPhone color="grey" size={20} />
            <input
              onChange={onHandleInput}
              placeholder="Enter Your Number"
              type="text"
            />
          </div>
          {/* <div>
            <PhoneInput country={"in"} value={ph} onChange={setPh} />
          </div> */}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default NewInitialScree;
