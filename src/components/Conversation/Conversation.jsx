import React, { useEffect, useState } from "react";
import "./conversation.css";
import { API } from "../../core/utils";
import { CiBellOn } from "react-icons/ci";
import { CiBellOff } from "react-icons/ci";
import { useSelector } from "react-redux";
const Conversation = ({ UUU, data, currentUser, online, notifications }) => {
  // const UUU = useSelector((state) => state.authReducer.authData);
  //   console.log(data);

  const [userData, setUserData] = useState(null);

  // console.log("login user" + currentUser);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        API.get(`/auth/getuser/${userId}`)
          .then((res) => {
            // console.log(res.data);
            setUserData(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
        // const { data } = await getUser(userId);
        // setUserData(data);
        // dispatch({ type: "SAVE_USER", data: data });
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  // console.log(UUU);

  return (
    <div className="main-convertion">
      <div className="convertion-first-card">
        {UUU?.employeeType === "Donor" && userData?.firstName[0]?.toUpperCase()}
      </div>
      <div>
        <h4>{UUU?.employeeType === "Donor" && userData?.firstName}</h4>
        <span className="online-text">{online ? "Online" : "Offline"}</span>
        <span className="notifications">
          <CiBellOn size={25} />
          {notifications && <span className="inner-span-notification"></span>}
          {/* {notifications ? <CiBellOn /> : <CiBellOff />} */}
        </span>
      </div>
    </div>
  );
};

export default Conversation;
