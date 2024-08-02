import React, { useEffect, useState } from 'react';
import './donorregistor.css';
import { ToastContainer } from 'react-toastify';
import { dangerMessage, registorSucces } from '../tostMessages/tostMessages';
import { API } from '../../core/utils';
import 'react-toastify/dist/ReactToastify.css';
import { bloodGroup } from '../../data/bloodGoup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogIns } from './../../action/AuthAction.js';

const DonorRegistor = () => {
  const [locationAllowed, setLocationAllowed] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setRegisDonor((prev) => ({
            ...prev,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          }));
          setLocationAllowed(true);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationAllowed(false);
          dangerMessage(
            'Please allow location access to proceed with registration.'
          );
        }
      );
    } else {
      console.error('Geolocation is not supported.');
      setLocationAllowed(false);
    }
  }, []);

  const dispatch = useDispatch();

  const [regisDonor, setRegisDonor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: sessionStorage.getItem('phoneNumber')?.slice(2),
    bloodGroup: '',
    dateOfBirth: '',
    longitude: '',
    latitude: '',
    locations: '',
    gender: '',
  });

  const navigate = useNavigate();
  const [errorsRegisDonor, setErrorsRegisDonor] = useState({});

  const onChangeRegisDonor = (e) => {
    setRegisDonor({ ...regisDonor, [e.target.name]: e.target.value });
  };

  const validate = (values) => {
    const errors = {};

    const name = /^[a-zA-Z\s]*$/;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.firstName) {
      errors.firstName = 'First Name is required!';
    } else if (!name.test(values.firstName)) {
      errors.firstName = 'First Name shold containe only charaters';
    }
    // last name
    if (!values.lastName) {
      errors.lastName = 'Last Name is required!';
    } else if (!name.test(values.lastName)) {
      errors.lastName = 'Last Name shold containe only charaters';
    }

    // mobile
    if (!values.mobile) {
      // console.log(values?.phone.length);
      errors.mobile = 'phone number is required!';
    } else if (!/^[0-9]{1,}$/.test(values?.mobile)) {
      errors.mobile = 'phone number must be numeric characters';
    } else if (values?.mobile.length !== 10) {
      errors.mobile = 'phone number must be 10 characters';
    }

    // email
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'Email is invalid';
    }

    // blood group
    if (!values.bloodGroup) {
      errors.bloodGroup = 'Blood Group is required!';
    }

    // date of birth
    if (!values.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required!';
    }

    if (!values.gender) {
      errors.gender = 'Gender is required!';
    }
    if (!values.locations) {
      errors.locations = 'Permanent Address is required!';
    }

    setErrorsRegisDonor(errors);
    return Object.keys(errors).length === 0;
  };

  const onDonorRegistor = (e) => {
    e.preventDefault();
    if (!locationAllowed) {
      dangerMessage(
        'Please allow location access to proceed with registration.'
      );
      return;
    }

    if (validate(regisDonor)) {
      API.post('auth/donor', regisDonor)
        .then((res) => {
          registorSucces(res?.data?.message);
          dispatch(
            LogIns(
              { mobile: sessionStorage.getItem('phoneNumber').slice(2) },
              navigate
            )
          );
          setRegisDonor({
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            bloodGroup: '',
            dateOfBirth: '',
            location: '',
            locations: '',
            longitude: '',
            latitude: '',
            gender: '',
          });
          sessionStorage.removeItem('isOtpSent');
          sessionStorage.removeItem('phoneNumber');
          sessionStorage.removeItem('otpVerified');
        })
        .catch((e) => {
          dangerMessage(e?.response?.data?.message);
          console.log(e?.response?.data?.message);
        });
    } else {
      console.log('error present');
    }
  };

  // console.log(errorsRegisDonor);

  return (
    <form onSubmit={onDonorRegistor} className="sign-up-form-main">
      <ToastContainer className="tost-class" />
      <div className="sign-up-inner-card">
        <section>
          <label>First Name</label>
          {errorsRegisDonor.firstName && (
            <p className="error-msg">{errorsRegisDonor.firstName}</p>
          )}
        </section>
        <input
          type="text"
          name="firstName"
          value={regisDonor.firstName}
          onChange={onChangeRegisDonor}
          placeholder="First Name"
        />
      </div>
      <div className="sign-up-inner-card">
        <section>
          <label>Last Name</label>
          {errorsRegisDonor.lastName && (
            <p className="error-msg">{errorsRegisDonor.lastName}</p>
          )}
        </section>

        <input
          type="text"
          name="lastName"
          value={regisDonor.lastName}
          onChange={onChangeRegisDonor}
          placeholder="Last Name"
        />
      </div>
      <div className="sign-up-inner-card">
        <section>
          <label>Blood Group</label>
          {errorsRegisDonor.bloodGroup && (
            <p className="error-msg">{errorsRegisDonor.bloodGroup}</p>
          )}
        </section>
        <select name="bloodGroup" onChange={onChangeRegisDonor}>
          {bloodGroup?.map((each, key) => (
            <option key={key} value={each}>
              {each}
            </option>
          ))}
        </select>
      </div>
      <div className="sign-up-inner-card">
        <section>
          <label>Date Of Birth</label>
          {errorsRegisDonor.dateOfBirth && (
            <p className="error-msg">{errorsRegisDonor.dateOfBirth}</p>
          )}
        </section>
        <input
          name="dateOfBirth"
          type="date"
          value={regisDonor.dateOfBirth}
          onChange={onChangeRegisDonor}
          placeholder="Date Of Birth"
        />
      </div>

      <div className="sign-up-inner-card">
        <section>
          <label>Gender</label>
          {errorsRegisDonor.gender && (
            <p className="error-msg">{errorsRegisDonor.gender}</p>
          )}
        </section>

        <div className="rdios-main">
          <div>
            <input
              name="gender"
              onChange={onChangeRegisDonor}
              type="radio"
              value="Male"
            />
            <label>Male</label>
          </div>
          <div>
            <input
              name="gender"
              onChange={onChangeRegisDonor}
              type="radio"
              value="Female"
            />
            <label>Female</label>
          </div>
          <div>
            <input
              name="gender"
              onChange={onChangeRegisDonor}
              type="radio"
              value="Others"
            />
            <label>Other</label>
          </div>
        </div>
      </div>

      <div className="sign-up-inner-card">
        <section>
          <label>Email</label>
          {errorsRegisDonor.email && (
            <p className="error-msg">{errorsRegisDonor.email}</p>
          )}
        </section>

        <input
          type="text"
          name="email"
          value={regisDonor.email}
          onChange={onChangeRegisDonor}
          placeholder="Email"
        />
      </div>

      <div>
        <section>
          <label>Permanent Address</label>
          {errorsRegisDonor.locations && (
            <p className="error-msg">{errorsRegisDonor.locations}</p>
          )}
        </section>
        <textarea
          onChange={onChangeRegisDonor}
          name="locations"
          placeholder="Enter Your Permanent Address"
          rows={2}
          cols={20}
          value={regisDonor.locations}
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DonorRegistor;
