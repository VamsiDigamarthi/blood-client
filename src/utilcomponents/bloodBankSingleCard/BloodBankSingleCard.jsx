import React, { useEffect } from "react";
import "./bloodBankSingleCard.css";
import { API } from "../../core/utils";
const BloodBankSingleCard = ({ bloodBank }) => {
  useEffect(() => {
    API.post("/auth/product/getbill/", { userEmail: bloodBank.email })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="bloodbanksingle-card-main">
      <h3>{bloodBank?.bloodBankName}</h3>
      <span>ph : {bloodBank?.mobile}</span>
      <span>{bloodBank?.nameOfLocation}</span>
    </div>
  );
};

export default BloodBankSingleCard;
