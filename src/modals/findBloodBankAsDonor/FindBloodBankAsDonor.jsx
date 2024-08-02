import React, { useEffect, useState } from "react";
import "./findbloodbankasdonor.css";
import { RxCross1 } from "react-icons/rx";
import { API } from "../../core/utils";
import { useSelector } from "react-redux";
const FindBloodBankAsDonor = ({ setShowModalAsBloodBanks }) => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [bloodBankDistance, setBloodBankDistance] = useState(5);
  const fetchBloodBanks = (distance = 5) => {
    API.get(
      `/blood/needed/find/blood/bank/longitude/${UUU?.location?.coordinates[0]}/latitude/${UUU?.location?.coordinates[1]}/distance/${distance}`
    )
      .then((res) => {
        console.log(res.data);
        setBloodBanks(res.data);
      })
      .catch((e) => {
        console.log(e?.response);
      });
  };

  useEffect(() => {
    fetchBloodBanks();
  }, []);

  const onIncrementHandleBloodBank = () => {
    if (bloodBankDistance < 100) {
      setBloodBankDistance((prev) => prev + 5);
      fetchBloodBanks(bloodBankDistance + 5);
    }
  };

  const onDecrementHandleBloodBank = () => {
    if (bloodBankDistance > 5) {
      setBloodBankDistance((prev) => prev - 5);
      fetchBloodBanks(bloodBankDistance - 5);
    }
  };

  return (
    <div className="all-modal-main">
      <div className="main-modal-card">
        <div className="cross-card">
          <span>Blood Banks</span>
          <RxCross1 onClick={() => setShowModalAsBloodBanks(false)} />
        </div>
        <div className="distance-increase-card-main">
          <h4>SELECT DISTANCE</h4>
          <div>
            <span onClick={onDecrementHandleBloodBank}>-</span>
            <span>{bloodBankDistance}</span>
            <span onClick={onIncrementHandleBloodBank}>+</span>
          </div>
        </div>
        <div className="blood-bank-details-main">
          {bloodBanks?.map((each, key) => (
            <div key={key} className="single-card-blood-bank-modal">
              <span>{each.bloodBankName}</span>
              <span>{each.email}</span>
              <span>{each.mobile}</span>
              <span>{each.nameOfLocation}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindBloodBankAsDonor;
