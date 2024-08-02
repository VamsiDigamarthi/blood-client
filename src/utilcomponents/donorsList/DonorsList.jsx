import React, { useEffect, useState } from "react";
import { CiChat1 } from "react-icons/ci";
import "./donorslist.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { API, serverUrl } from "../../core/utils";
import { useSelector } from "react-redux";
const DonorsListS = ({ currentUser, online, each }) => {
  console.log(currentUser);
  console.log(online);
  const UUU = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState(null);
  const navigation = useNavigate();
  const [chatModelOpen, setChatModelOpen] = useState(false);
  useEffect(() => {
    API.get("/auth/getUser", {
      headers: {
        Authorization: `Bearer ${UUU?.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // console.log(user?._id);

  useEffect(() => {
    if (each) {
      API.post("/chat", {
        senderId: user?._id,
        receiverId: each?._id,
        requiredDate: user?.requiredDate,
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(console.log(e));
        });
    }
  }, [each, user]);
  console.log(each);

  // profile

  const onChatCreatedAndNavigateToMessagePage = () => {
    setChatModelOpen(true);
    API.post("/chat", { senderId: currentUser, receiverId: each?._id })
      .then((res) => {
        console.log(res.data);
        // const data = {
        //   key: res.data,
        // };

        // navigation("/conversation", {
        //   replace: true,
        //   state: { data: res.data, user: user },
        // });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="donor-image-card">
        <img
          src={
            each.profile
              ? `${serverUrl}/${each.profile}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4eMoz7DH8l_Q-iCzSc1xyu_C2iryWh2O9_FcDBpY04w&s"
          }
          alt=""
        />
        {online && <div className="online-out"></div>}
      </div>
      <div>
        <h3>{each.firstName.slice(0, 14)}</h3>
        <span>{each.bloodGroup}</span>
        <span>{parseFloat(each.distance.toFixed(2))} km distance</span>
      </div>
      <div
        onClick={onChatCreatedAndNavigateToMessagePage}
        className="add-patinet-icons-card"
      >
        <CiChat1 size={25} />
      </div>
    </>
  );
};

export default DonorsListS;
