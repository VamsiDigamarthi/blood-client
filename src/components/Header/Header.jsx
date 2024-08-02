import React, { useEffect, useState } from "react";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { API } from "../../core/utils";
import { logout } from "../../action/AuthAction";
const Header = () => {
  const dispatch = useDispatch();

  const UUU = useSelector((state) => state.authReducer.authData);
  const [showMenuItems, setShowMenuItems] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname; // Get the current pathname from the location object
  const parts = path.split("/"); // Split the pathname by '/'
  const users = parts[1];
  const jwtToken = Cookies.get("jwt_token");
  const [user, setUser] = useState({});
  // console.log(jwtToken);
  // console.log(users);

  const onLogoClick = () => {
    navigate("/", { replace: true });
  };
  // console.log(userId);

  useEffect(() => {
    API.get("/auth/getUser", {
      headers: {
        Authorization: `Bearer ${UUU?.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
        setUser({});
      });
  }, []);

  // useEffect(() => {
  //   console.log("UUU state updated: ", UUU);
  // }, [UUU]);
  // console.log(user);

  const logoutFun = () => {
    sessionStorage.removeItem("isOtpSent");
    sessionStorage.removeItem("phoneNumber");
    sessionStorage.removeItem("otpVerified");
    dispatch(logout(navigate));
    window.location.reload();
  };

  console.log(user);

  return (
    <div className="header_main">
      <img
        onClick={() => {
          setShowMenuItems(false);
          onLogoClick();
        }}
        src="./images/logo.png"
        alt="Logo"
        className="header_logo"
      />
      <div className="nuhvin-card">
        <div className="header-inside-card">
          <span>
            <NavLink className="link" to="/">
              Home
            </NavLink>
          </span>

          {user?.employeeType !== "Donor" && (
            <span>
              <NavLink className="link" to="/bloodbank">
                My Blood Bank
              </NavLink>
            </span>
          )}

          <span>
            <NavLink className="link" to="/whoweare">
              Who We are
            </NavLink>
          </span>
          <span>
            <NavLink className="link" to="/howwehelp">
              How We help
            </NavLink>
          </span>
          {/* <span>Gallery</span>
            <span>IOS App</span>
            <span>Android App</span> */}
          {Object.keys(user).length > 0 && (
            <span
              style={{
                color: users === "contact" && "var(--main-text-color)",
              }}
            >
              <NavLink className="link" to="/contact">
                Contact US
              </NavLink>
            </span>
          )}
          {Object.keys(user).length > 0 ? (
            <>
              {/* <NavLink className="link-change" to="/profile">
                <FaUser size={22} />
              </NavLink> */}
              <span className="nav-item">
                <FaUser size={22} />
                <ul className="dropdown">
                  <li>
                    <NavLink className="link-change" to="/profile">
                      Profile-section
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={logoutFun} className="log-out-btn">
                      Log-out
                    </button>
                  </li>
                </ul>
              </span>
            </>
          ) : (
            <span
              style={{
                color: users === "contact" && "var(--main-text-color)",
              }}
            >
              <NavLink className="link" to="/registor">
                Login
              </NavLink>
            </span>
          )}
        </div>
      </div>

      {/* Mobile view */}
      <div className="mobile-header-card">
        <div className="mobile-header-container-card">
          {showMenuItems ? (
            <RxCross1 size={24} onClick={() => setShowMenuItems(false)} />
          ) : (
            <RxHamburgerMenu size={24} onClick={() => setShowMenuItems(true)} />
          )}

          {showMenuItems && (
            <div className="mobile-links-card">
              <span>
                <NavLink
                  className="link"
                  to="/"
                  onClick={() => setShowMenuItems(false)}
                >
                  Home
                </NavLink>
              </span>
              <span>
                <NavLink
                  className="link"
                  to="/whoweare"
                  onClick={() => setShowMenuItems(false)}
                >
                  {" "}
                  Who We are
                </NavLink>
              </span>
              <span>
                <NavLink
                  className="link"
                  to="/howwehelp"
                  onClick={() => setShowMenuItems(false)}
                >
                  How We help
                </NavLink>
              </span>

              {/* <span>Gallery</span>
                <span>IOS App</span>
                <span>Android App</span> */}
              {Object.keys(user).length > 0 && (
                <span>
                  <NavLink
                    className="link"
                    to="/contact"
                    onClick={() => setShowMenuItems(false)}
                  >
                    Contact US
                  </NavLink>
                </span>
              )}

              {Object.keys(user).length > 0 ? (
                <>
                  <span className="nav-item">
                    <FaUser size={22} />
                    <ul className="dropdown">
                      <li>
                        <NavLink className="link-change" to="/profile">
                          Profile-section
                        </NavLink>
                      </li>
                      <li>
                        <button onClick={logoutFun} className="log-out-btn">
                          Log-out
                        </button>
                      </li>
                    </ul>
                  </span>
                </>
              ) : (
                <span
                  style={{
                    color: users === "contact" && "var(--main-text-color)",
                  }}
                >
                  <NavLink className="link" to="/registor">
                    Login
                  </NavLink>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
