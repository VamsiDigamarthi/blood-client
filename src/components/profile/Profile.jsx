import React, { useEffect, useState } from "react";
import "./profile.css";
import { API, serverUrl } from "../../core/utils";
import { ToastContainer } from "react-toastify";
// import { dangerMessage, registorSucces } from "../tostMessages/tostMessages";
import "react-toastify/dist/ReactToastify.css";
import { RxCross1 } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../action/AuthAction";
import { bloodGroup } from "../../data/bloodGoup";
import { MdOutlineCameraAlt } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import {
  dangerMessage,
  registorSucces,
} from "../../utilcomponents/tostMessages/tostMessages";
const Profile = () => {
  const UUU = useSelector((state) => state.authReducer.authData);

  // console.log(UUU);
  const [user, setUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUser = () => {
    API.get("/auth/getUser", {
      headers: {
        Authorization: `Bearer ${UUU?.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
        setEditUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const getCurrentDay = () => {
    const today = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[today.getDay()];
    return dayName;
  };

  const onHandleInputChange = (e) => {
    // console.log(e.target.checked);

    API.patch(
      "/auth/update/user/available",
      {
        isActive: e.target.checked,
      },
      {
        headers: {
          Authorization: `Bearer ${UUU?.token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        // console.log(res.data);
        getUser();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // isAvailable;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // Do something with the selected image file
    setImageUrl(file);
    const formData = new FormData();
    formData.append("image", file);
    API.patch("/auth/edit/pic", formData, {
      headers: {
        Authorization: `Bearer ${UUU?.token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res.data);
        setImageUrl(null);
        getUser();
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("Selected image file:", file?.name);
  };

  // console.log(imageUrl);

  const logoutFun = () => {
    sessionStorage.removeItem("isOtpSent");
    sessionStorage.removeItem("phoneNumber");
    sessionStorage.removeItem("otpVerified");
    dispatch(logout());
  };

  // console.log(user);

  const onEditCha = (e) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
  };

  const onEditUserFun = (e) => {
    e.preventDefault();
    API.patch("/auth/edit/profile", editUser, {
      headers: {
        Authorization: `Bearer ${UUU?.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(res.data?.message);
        getUser();
        registorSucces(res.data?.message);
      })
      .catch((e) => {
        console.log(e);
        dangerMessage("something went wrong");
      });
    // console.log(editUser);
  };

  // console.log(editUser);
  return (
    <div className="profile-main">
      <ToastContainer className="tost-class" />

      <div className="v2-profile-card">
        <div className="v2-profile-inner-first-sbns">
          <h3>Profile Section</h3>
          <div className="v2-profile-inner-card">
            <div className="v2-profile-left-card">
              {user?.employeeType === "BloodBank" ? (
                <div className="v2-profile-input-lable-card">
                  <lable>BLOOD BANK NAME</lable>
                  <input
                    type="text"
                    name="bloodBankName"
                    value={editUser?.bloodBankName}
                    className="v2-profile-input"
                    onChange={onEditCha}
                  />
                </div>
              ) : (
                <div className="v2-profile-input-lable-card">
                  <lable>FIRST NAME</lable>
                  <input
                    type="text"
                    value={editUser?.firstName}
                    name="firstName"
                    onChange={onEditCha}
                    className="v2-profile-input"
                  />
                </div>
              )}

              {user?.employeeType !== "BloodBank" && (
                <div className="v2-profile-input-lable-card">
                  <lable>LAST NAME</lable>
                  <input
                    type="text"
                    value={editUser?.lastName}
                    name="lastName"
                    onChange={onEditCha}
                    className="v2-profile-input"
                  />
                </div>
              )}
              {/*  */}
              {/* {user?.employeeType !== "BloodBank" && (
              <div className="v2-profile-input-lable-card">
                <lable>BLOOD GROUP</lable>
                <input
                  type="text"
                  value={user?.bloodGroup}
                  className="v2-profile-input"
                />
              </div>
            )} */}
              {/* email */}
              <div className="v2-profile-input-lable-card">
                <lable>EMAIL</lable>
                <input
                  type="text"
                  value={editUser?.email}
                  name="email"
                  onChange={onEditCha}
                  className="v2-profile-input"
                />
              </div>
              {/* phone */}
              <div className="v2-profile-input-lable-card">
                <lable>PHONE</lable>
                <input
                  type="text"
                  value={editUser?.mobile}
                  className="v2-profile-input"
                />
              </div>
              <div className="v2-profile-input-lable-card">
                <lable>ADDRESS</lable>
                <input
                  value={editUser?.address}
                  type="text"
                  name="address"
                  onChange={onEditCha}
                  className="v2-profile-input"
                />
              </div>
              <div className="v2-both-logout-login-btn-card">
                <button onClick={onEditUserFun} className="v2-edit-btn">
                  Edit
                </button>
                <button onClick={logoutFun} className="v2-logout-btn">
                  Logout
                </button>
              </div>
            </div>
            <div className="v2-profile-right-card">
              <div className="v2-profile-icons-asdfdz">
                <img
                  className="v2-profile-right-card-img"
                  src={
                    imageUrl
                      ? URL.createObjectURL(imageUrl)
                      : user?.profile
                      ? `${serverUrl}/${user.profile}`
                      : "https://cdn-icons-png.flaticon.com/512/5951/5951752.png"
                  }
                  alt=""
                />
                <section className="profile-eift-icons">
                  <input
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    id="input-img"
                    type="file"
                  />

                  <label htmlFor="input-img">
                    <MdOutlineCameraAlt size={30} />
                  </label>
                </section>
                {/* <MdOutlineDelete size={30} className="v2-profile-delete-icons" /> */}
              </div>

              {user?.employeeType === "BloodBank" ? (
                <>
                  <div className="profile-availble-details-container">
                    <div className="profile-availble-day">
                      {getCurrentDay()}{" "}
                    </div>
                    <div className="profile-availble-timmings">
                      {(user?.bloodBankTimming?.[getCurrentDay()]?.isClosed && (
                        <span className="profile-availble-timmings-holder">
                          Closed Today
                        </span>
                      )) ||
                        (user?.bloodBankTimming?.[getCurrentDay()]
                          ?.is24Hours && (
                          <span className="profile-availble-timmings-holder">
                            24Hours Open
                          </span>
                        )) || (
                          <div className="profile-availble-timmings-container">
                            <div className="profile-availble-timmings-holder">
                              <div>Open Time </div>
                              <div>
                                {
                                  user?.bloodBankTimming?.[getCurrentDay()]
                                    ?.timming[0]
                                }
                              </div>
                            </div>
                            <div className="profile-availble-timmings-holder">
                              <div>Close Time </div>
                              <div>
                                {
                                  user?.bloodBankTimming?.[getCurrentDay()]
                                    ?.timming[1]
                                }
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="v2-available-card">
                  <lable>Are You Available</lable>
                  <input
                    onChange={onHandleInputChange}
                    checked={user?.isAvailable}
                    type="checkbox"
                    id="isAvailable"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// onEditUserFun
