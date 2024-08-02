import React, { useEffect } from "react";
import "./DonorCard.css";
import { API } from "../../core/utils";
import { useSelector } from "react-redux";
const DonorCard = ({ donor }) => {
  const UUU = useSelector((state) => state.authReducer.authData);
  // chat create every time

  // console.log(donor);

  useEffect(() => {
    if (donor) {
      API.post("/chat", {
        senderId: UUU?._id,
        receiverId: donor?._id,
        requiredDate: UUU?.requiredDate,
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(console.log(e));
        });
    }
  }, [donor]);

  return (
    <div className="donors-single-card">
      <span>About Donor Details..</span>
      <span>
        Name : <span>{donor?.firstName}</span>
      </span>
      <span>
        Blood Group : <span>{donor?.bloodGroup}+</span>
      </span>
      <span>
        Location : <span>{donor?.nameOfLocation}</span>
      </span>
    </div>
  );
};

export default DonorCard;
