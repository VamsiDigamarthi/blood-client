import React, { useEffect, useState } from 'react';
import './bloodbank.css';
import { dangerMessage, registorSucces } from '../tostMessages/tostMessages';

import { API } from '../../core/utils';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { LogIns } from '../../action/AuthAction';
import { useNavigate } from 'react-router-dom';
const BloodBank = ({ saveMobileToRegistor }) => {
  

  useEffect(() => {

    // Check if geolocation is supported
    if (navigator.geolocation) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setBloodBank({
            ...bloodBank,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported.');
    }
  }, []);

  const [bloodBank, setBloodBank] = useState({
    bloodBankName: '',
    mobile: sessionStorage.getItem('phoneNumber')?.slice(2),
    email: '',
    longitude: '',
    latitude: '',
    address: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(saveMobileToRegistor);

  // console.log(bloodBank);

  const onChnageRegisNeedBlood = (e) => {
    setBloodBank({
      ...bloodBank,
      [e.target.name]: e.target.value,
    });
  };

  const [regisNeedBloodError, setRegisNeedBloodError] = useState({});

  const validation = (values) => {
    const name = /^[a-zA-Z\s]*$/;
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const errors = {};

    if (!values.bloodBankName) {
      errors.bloodBankName = 'Blood BankName is required!';
    } else if (!name.test(values.bloodBankName)) {
      errors.bloodBankName = 'Blood BankName shold containe only charaters';
    }

    // mobile
    // if (!values.mobile) {
    //   // console.log(values?.phone.length);
    //   errors.mobile = "phone number is required!";
    // } else if (!/^[0-9]{1,}$/.test(values?.mobile)) {
    //   errors.mobile = "phone number must be numeric characters";
    // } else if (values?.mobile.length !== 10) {
    //   errors.mobile = "phone number must be 10 characters";
    // }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    // email
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'Email is invalid';
    }

    // if (!values.perminateAddress) {
    //   errors.perminateAddress = "Perminate Address is required!";
    // }

    setRegisNeedBloodError(errors);
    return Object.keys(errors).length === 0;
  };

  const changes = (bloodGroup, howMuchQuatity) => {
    // Find the index of the blood group object in the bloodGroups array
    const index = bloodBank.bloodGroups.findIndex(
      (group) => group.bloodGroup === bloodGroup
    );

    // Create a new blood group object
    const newBloodGroup = { bloodGroup, howMuchQuatity };

    if (index !== -1) {
      // If the blood group already exists in the array, update its quantity
      setBloodBank((prevState) => ({
        ...prevState,
        bloodGroups: prevState.bloodGroups.map((group, i) =>
          i === index ? { ...group, howMuchQuatity } : group
        ),
      }));
    } else {
      // If the blood group doesn't exist, add it to the array
      setBloodBank((prevState) => ({
        ...prevState,
        bloodGroups: [...prevState.bloodGroups, newBloodGroup],
      }));
    }
  };
  const onHangleBloodBank = (e) => {
    e.preventDefault();
    if (validation(bloodBank)) {
      API.post('/auth/blood/bank', bloodBank)
        .then((res) => {
          
          registorSucces(res?.data?.message);
          console.log(res.data);
          dispatch(LogIns({ mobile: sessionStorage.getItem('phoneNumber')?.slice(2) }, navigate));
          setBloodBank({
            bloodBankName: '',
            mobile: '',
            email: '',
            longitude: '',
            latitude: '',
            perminateAddress: '',
          });
        })
        .catch((e) => {
          console.log(e);
          dangerMessage(e?.response?.data?.message);
        });
    } else {
      console.log('cvbnm');
    }
  };

  console.log(bloodBank);

  return (
    <form onSubmit={onHangleBloodBank} className="sign-up-form-main">
      <ToastContainer className="tost-class" />
      <div className="sign-up-inner-card">
        <section>
          <label>Blood Bank Name</label>
          {regisNeedBloodError?.bloodBankName && (
            <p>{regisNeedBloodError?.bloodBankName}</p>
          )}
        </section>
        <input
          type="text"
          name="bloodBankName"
          value={bloodBank.bloodBankName}
          placeholder="Blood BankName"
          onChange={onChnageRegisNeedBlood}
          // onChange={(e) => change("A+", e.target.value)}
        />
      </div>
      <div className="sign-up-inner-card">
        <section>
          <label>Email</label>
          {regisNeedBloodError?.email && <p>{regisNeedBloodError?.email}</p>}
        </section>
        <input
          value={bloodBank.email}
          name="email"
          type="text"
          placeholder="email"
          onChange={onChnageRegisNeedBlood}
        />
      </div>
      <div className="sign-up-inner-card">
        <section>
          <label>Address</label>
          {regisNeedBloodError?.address && (
            <p>{regisNeedBloodError?.address}</p>
          )}
        </section>
        <input
          value={bloodBank.address}
          name="address"
          type="text"
          placeholder="Enter Address"
          onChange={onChnageRegisNeedBlood}
        />
      </div>

      {/* <div className="sign-up-inner-card">
        <section>
          <label>A+</label>
        </section>
        <input
          // value={bloodBank.email}
          // name="email"
          type="text"
          placeholder="How Much Quantity"
          // onChange={onChangeBloodBankGroupA}
          onChange={(e) => changes("A+", e.target.value)}
        />
      </div>
      <div className="sign-up-inner-card">
        <section>
          <label>A-</label>
        </section>
        <input
          type="text"
          placeholder="How Much Quantity"
          // onChange={onChangeBloodBankGroupAM}
          onChange={(e) => changes("A-", e.target.value)}
        />
      </div>

      <div className="sign-up-inner-card">
        <section>
          <label>B+</label>
        </section>
        <input
          type="text"
          placeholder="How Much Quantity"
          onChange={(e) => changes("B+", e.target.value)}
        />
      </div>
      <div className="sign-up-inner-card">
        <section>
          <label>B+</label>
        </section>
        <input
          type="text"
          placeholder="How Much Quantity"
          onChange={(e) => changes("B-", e.target.value)}
        />
      </div>

      <div className="sign-up-inner-card">
        <section>
          <label>AB+</label>
        </section>
        <input
          type="text"
          placeholder="How Much Quantity"
          onChange={(e) => changes("AB+", e.target.value)}
        />
      </div>

      <div className="sign-up-inner-card">
        <section>
          <label>AB+</label>
        </section>
        <input
          type="text"
          placeholder="How Much Quantity"
          onChange={(e) => changes("AB-", e.target.value)}
        />
      </div>

      <div className="sign-up-inner-card">
        <section>
          <label>O+</label>
        </section>
        <input
          type="text"
          placeholder="How Much Quantity"
          onChange={(e) => changes("O+", e.target.value)}
        />
      </div>

      <div className="sign-up-inner-card">
        <section>
          <label>O-</label>
        </section>
        <input
          type="text"
          placeholder="How Much Quantity"
          onChange={(e) => changes("O-", e.target.value)}
        />
      </div>

      <div>
        <textarea
          onChange={onChnageRegisNeedBlood}
          name="perminateAddress"
          placeholder="Enter Your Perminate Address"
          rows={3}
          cols={20}
          value={bloodBank.perminateAddress}
        ></textarea>
      </div> */}

      <button type="submit">Submit</button>
    </form>
  );
};

export default BloodBank;
