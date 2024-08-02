import React, { useEffect, useState } from "react";
import "./DonotList.css";
// import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { API } from "../../core/utils";
import { useSelector } from "react-redux";
import DonorCard from "../DonorCard/DonorCard";
import BloodBankSingleCard from "../../utilcomponents/bloodBankSingleCard/BloodBankSingleCard";
const DonorList = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  // console.log(UUU);
  const [switchContent, setSwitchContent] = useState(true);
  const [donorList, setDonorList] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);

  const [distance, setDistance] = useState(5);
  const [bloodBankDistance, setBloodBankDistance] = useState(5);

  const fetchDonorData = (distance = 5) => {
    console.log(distance);
    API.get(
      `/blood/needed/find/donor/longitude/${UUU?.location?.coordinates[0]}/latitude/${UUU?.location?.coordinates[1]}/distance/${distance}/${UUU?.bloodGroup}`
    )
      .then((res) => {
        // console.log(res.data);
        setDonorList(res.data);
      })
      .catch((e) => {
        console.log(e?.response);
      });
  };

  const fetchBloodBanks = (distance = 5) => {
    API.get(
      `/blood/needed/find/blood/bank/longitude/${UUU?.location?.coordinates[0]}/latitude/${UUU?.location?.coordinates[1]}/distance/${distance}`
    )
      .then((res) => {
        // console.log(res.data);
        setBloodBanks(res.data);
      })
      .catch((e) => {
        console.log(e?.response);
      });
  };

  useEffect(() => {
    fetchDonorData();
    fetchBloodBanks();
  }, []);

  const onIncrementHandle = () => {
    if (distance <= 100) {
      setDistance((prev) => prev + 5);
      fetchDonorData(distance + 5);
    }
  };

  const onDecrementHandle = () => {
    if (distance >= 5) {
      setDistance((prev) => prev - 5);
      fetchDonorData(distance - 5);
    }
  };

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
    <div className="newly-added-main-donorlist">
      <div className="selected-donor-or-blood-bank">
        <span
          onClick={() => setSwitchContent(true)}
          style={{
            textDecoration: switchContent && "underline",
          }}
        >
          {" "}
          DONORS
        </span>
        <span
          onClick={() => setSwitchContent(false)}
          style={{
            textDecoration: !switchContent && "underline",
          }}
        >
          BLOOD BANKS
        </span>
      </div>
      {switchContent ? (
        <div className="donorlist-main">
          <div className="donorlist-first-card">
            <div className="select-radius-value">
              <h2>Increase Radius</h2>

              <div className="incre-decre-main">
                <span onClick={onIncrementHandle}>+</span>
                <span>{distance} Km</span>
                <span onClick={onDecrementHandle}>-</span>
              </div>
            </div>
            <div>
              <h3>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "var(--main-text-color)",
                  }}
                  to="/chat"
                >
                  Go to Chat
                </Link>
              </h3>
            </div>
          </div>
          <div>
            {donorList?.length > 0 ? (
              <div className="donor-single-card-main">
                {donorList?.map((donor, key) => (
                  <DonorCard donor={donor} key={key} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "40vh",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2>Donor Not found this location</h2>
                <p>Please increse distance to find donors</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2>Increase Radius</h2>
          <div className="select-radius-value">
            <div className="incre-decre-main">
              <span onClick={onIncrementHandleBloodBank}>+</span>
              <span>{bloodBankDistance} Km</span>
              <span onClick={onDecrementHandleBloodBank}>-</span>
            </div>
          </div>
          <div className="blood-bank-list">
            {bloodBanks?.map((each, key) => (
              <BloodBankSingleCard key={key} bloodBank={each} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorList;
