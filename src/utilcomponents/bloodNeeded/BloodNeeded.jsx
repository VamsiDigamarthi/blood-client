import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { dangerMessage, registorSucces } from "../tostMessages/tostMessages";
import { API } from "../../core/utils";
import { bloodGroup } from "../../data/bloodGoup";
import "./bloodNeeded.css";
const BloodNeeded = ({ setShowLogin }) => {
  const [regisNeedBlood, setRegisNeddBlood] = useState({
    patientFirstName: "",
    patientLastName: "",
    attendeeFirstName: "",
    attendeeLastName: "",
    attendeeMobile: "",
    bloodGroup: "",
    requestType: "",
    quantity: "",
    requiredDate: "",
    address: "",
    longitude: "",
    latitude: "",
    perminateAddress: "",
  });

  const [regisNeedBloodError, setRegisNeedBloodError] = useState({});

  const onChnageRegisNeedBlood = (e) => {
    setRegisNeddBlood({
      ...regisNeedBlood,
      [e.target.name]: e.target.value,
    });
  };

  const bloodNeedDonorValidation = (values) => {
    const name = /^[a-zA-Z\s]*$/;
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const errors = {};

    if (!values.patientFirstName) {
      errors.patientFirstName = "Patient FirstName is required!";
    } else if (!name.test(values.patientFirstName)) {
      errors.patientFirstName =
        "Patient FirstName shold containe only charaters";
    }
    // patient last name
    if (!values.patientLastName) {
      errors.patientLastName = "Patient LastName is required!";
    } else if (!name.test(values.patientLastName)) {
      errors.patientLastName = "Patient LastName shold containe only charaters";
    }

    // attendee FirstName
    if (!values.attendeeFirstName) {
      errors.attendeeFirstName = "Attendee FirstName is required!";
    } else if (!name.test(values.attendeeFirstName)) {
      errors.attendeeFirstName =
        "Attendee FirstName shold containe only charaters";
    }

    // attendee LastName
    if (!values.attendeeLastName) {
      errors.attendeeLastName = "Attendee LastName is required!";
    } else if (!name.test(values.attendeeLastName)) {
      errors.attendeeLastName =
        "Attendee LastName shold containe only charaters";
    }

    // mobile
    if (!values.attendeeMobile) {
      // console.log(values?.phone.length);
      errors.attendeeMobile = "phone number is required!";
    } else if (!/^[0-9]{1,}$/.test(values?.attendeeMobile)) {
      errors.attendeeMobile = "phone number must be numeric characters";
    } else if (values?.attendeeMobile.length !== 10) {
      errors.attendeeMobile = "phone number must be 10 characters";
    }

    // requestType
    if (!values.requestType) {
      errors.requestType = "RequestType is required!";
    }

    // blood group
    if (!values.bloodGroup) {
      errors.bloodGroup = "Blood Group is required!";
    }

    // date of birth
    if (!values.requiredDate) {
      errors.requiredDate = "Date of birth is required!";
    }
    // location
    if (!values.quantity) {
      errors.quantity = "quantity is required!";
    }

    if (!values.perminateAddress) {
      errors.perminateAddress = "Perminate Address is required!";
    }

    setRegisNeedBloodError(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    // Check if geolocation is supported
    if (navigator.geolocation) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setRegisNeddBlood({
            ...regisNeedBlood,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported.");
    }
  }, []);

  const onHandleFindBloodDonorReg = (e) => {
    e.preventDefault();
    if (bloodNeedDonorValidation(regisNeedBlood)) {
      API.post("/auth/registor/blood/need/user", "newData")
        .then((res) => {
          registorSucces(res?.data?.message);
          // console.log(res.data);
          setRegisNeddBlood({
            patientFirstName: "",
            patientLastName: "",
            attendeeFirstName: "",
            attendeeLastName: "",
            attendeeMobile: "",
            bloodGroup: "",
            requestType: "",
            quantity: "",
            requiredDate: "",
            address: "",
            longitude: "",
            latitude: "",
            perminateAddress: "",
          });
        })
        .catch((e) => {
          dangerMessage(e?.response?.data?.message);
          console.log(e?.response?.data?.message);
        });
    }
  };

  return (
    <form onSubmit={onHandleFindBloodDonorReg} className="signup-main">
      <ToastContainer />
      <div>
        <div className="input-card-new">
          {" "}
          {regisNeedBloodError?.patientFirstName && (
            <p>{regisNeedBloodError?.patientFirstName}</p>
          )}
          <input
            type="text"
            name="patientFirstName"
            value={regisNeedBlood.patientFirstName}
            placeholder="Patient First Name"
            onChange={onChnageRegisNeedBlood}
          />
        </div>
        <div className="input-card-new">
          {" "}
          {regisNeedBloodError?.patientLastName && (
            <p>{regisNeedBloodError?.patientLastName}</p>
          )}
          <input
            type="text"
            name="patientLastName"
            value={regisNeedBlood.patientLastName}
            placeholder="Patient LastName"
            onChange={onChnageRegisNeedBlood}
          />
        </div>
      </div>
      <div>
        <div className="input-card-new">
          {regisNeedBloodError?.attendeeFirstName && (
            <p>{regisNeedBloodError?.attendeeFirstName}</p>
          )}
          <input
            type="text"
            name="attendeeFirstName"
            value={regisNeedBlood.attendeeFirstName}
            placeholder="Attendee First Name"
            onChange={onChnageRegisNeedBlood}
          />
        </div>
        <div className="input-card-new">
          {regisNeedBloodError?.attendeeLastName && (
            <p>{regisNeedBloodError?.attendeeLastName}</p>
          )}
          <input
            type="text"
            name="attendeeLastName"
            value={regisNeedBlood.attendeeLastName}
            placeholder="Attendee Last Name"
            onChange={onChnageRegisNeedBlood}
          />
        </div>
      </div>
      <div>
        {/* <div className="input-card-new">
          {" "}
          {regisNeedBloodError?.attendeeMobile && (
            <p>{regisNeedBloodError?.attendeeMobile}</p>
          )}
          <input
            name="attendeeMobile"
            type="text"
            value={regisNeedBlood.attendeeMobile}
            placeholder="Attendee Mobile"
            onChange={onChnageRegisNeedBlood}
          />
        </div> */}
        <div className="input-card-new">
          {regisNeedBloodError?.bloodGroup && (
            <p>{regisNeedBloodError?.bloodGroup}</p>
          )}
          <select
            name="bloodGroup"
            value={regisNeedBlood.bloodGroup}
            onChange={onChnageRegisNeedBlood}
          >
            <option disabled hidden selected>
              Blood group
            </option>
            {bloodGroup?.map((each, key) => (
              <option key={key} value={each}>
                {each}
              </option>
            ))}
          </select>
        </div>
        <div className="input-card-new">
          {regisNeedBloodError?.requestType && (
            <p>{regisNeedBloodError?.requestType}</p>
          )}
          <select
            value={regisNeedBlood.requestType}
            name="requestType"
            onChange={onChnageRegisNeedBlood}
          >
            <option disabled hidden selected>
              Request Type
            </option>
            <option>Blood</option>
            <option>Platelets</option>
          </select>
        </div>
      </div>

      <div>
        <div className="input-card-new">
          {regisNeedBloodError?.quantity && (
            <p>{regisNeedBloodError?.quantity}</p>
          )}
          <input
            value={regisNeedBlood.quantity}
            name="quantity"
            type="text"
            placeholder="Quantity"
            onChange={onChnageRegisNeedBlood}
          />
        </div>
        <div className="input-card-new">
          {regisNeedBloodError?.requiredDate && (
            <p>{regisNeedBloodError?.requiredDate}</p>
          )}
          <div className="date-input">
            <input
              value={regisNeedBlood.requiredDate}
              name="requiredDate"
              type="date"
              placeholder="Required Date"
              onChange={onChnageRegisNeedBlood}
            />
            {regisNeedBlood?.requiredDate === "" && <span>Required Date</span>}
          </div>
        </div>
      </div>
      <div>
        <div className="mal-fem-main-card">
          {regisNeedBloodError.gender && <p>{regisNeedBloodError.gender}</p>}
          <div className="mal-femail-cards">
            <div>
              <label htmlFor="male">Male</label>
              <input
                onChange={onChnageRegisNeedBlood}
                name="gender"
                id="male"
                type="radio"
              />
            </div>
            <div>
              <label htmlFor="female">Female</label>
              <input
                onChange={onChnageRegisNeedBlood}
                name="gender"
                id="female"
                type="radio"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <textarea
          onChange={onChnageRegisNeedBlood}
          name="perminateAddress"
          placeholder="Enter Your Perminate Address"
          rows={3}
          cols={20}
          value={regisNeedBlood.perminateAddress}
        ></textarea>
      </div>

      <button>Submit Your Request</button>
      <span onClick={() => setShowLogin(false)}>
        Already have an account goto Sign In
      </span>
    </form>
  );
};

export default BloodNeeded;
