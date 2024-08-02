import React, { useEffect } from "react";
import "./otp.css";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, Toaster } from "react-hot-toast";
import { API } from "../../core/utils";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { LogIns } from "../../action/AuthAction";

const OTP = ({ setOpenRegister }) => {
  const [singleClick, setSingleClick] = useState(false);
  const [otp, setOtp] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  // const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("isOtpSent") === "true") {
      setShowOTP(true);
      let phoneNumber = sessionStorage.getItem("phoneNumber");
      setPhoneNumber(phoneNumber);
    }
    if (sessionStorage.getItem("otpVerified") === "true") {
      setOpenRegister(true);
    }
  });

  const CheckPhoneNumberAndSignUp = () => {
    if (PhoneNumber.length >= 10) {
      SignupUser();
      return;
    } else {
      toast.error("Please Enter a Valid Phone Number");
      return false;
    }
  };

  function SignupUser() {
    setLoading(true);
    setSingleClick(true);

    API.post("/auth/send-otp", {
      mobile: PhoneNumber.slice(2),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("OTP sended successfully!");
          setShowOTP(true);
          sessionStorage.setItem("isOtpSent", true);
          sessionStorage.setItem("phoneNumber", PhoneNumber);
          setLoading(false);
          setSingleClick(false);
        } else {
          toast.error("Something went wrong please try again later");
          // console.log(response);
          setLoading(false);
          setSingleClick(false);
        }
      })
      .catch((e) => {
        // console.log(e);
        toast.error("Something went wrong please try again later");
        setLoading(false);
        setSingleClick(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    setSingleClick(true);
    // console.log(otp);

    // console.log(PhoneNumber.slice(2));
    API.post("/auth/verify-otp", {
      mobile: PhoneNumber.slice(2),
      otp: otp,
    })
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          toast.success("OTP Verified successfully!");
          dispatch(
            LogIns(
              { mobile: sessionStorage.getItem("phoneNumber").slice(2) },
              navigate
            )
          );
          sessionStorage.removeItem("isOtpSent");
          sessionStorage.removeItem("phoneNumber");
          sessionStorage.removeItem("otpVerified");
        } else if (response.status === 201) {
          toast.success("OTP Verified successfully!");
          sessionStorage.setItem("otpVerified", true);
        }
      })
      .catch((e) => {
        // console.log(e);/
        toast.error("Invalid OTP. Please try again");
        setLoading(false);
        setSingleClick(false);
      });
  }

  const EditMobileNumber = () => {
    sessionStorage.removeItem("isOtpSent");
    sessionStorage.removeItem("phoneNumber");
    setPhoneNumber(PhoneNumber);
    setShowOTP(false);
    setLoading(false);
    setSingleClick(false);
  };

  // new code
  // const [phone, setPhone] = useState("");

  // const onLogin = () => {
  //   console.log(phone);
  //   dispatch(LogIns({ mobile: phone }, navigate));
  // };

  return (
    <section className="otp-main">
      {/* <div>
        <input onChange={(e) => setPhone(e.target.value)} type="text" />
        <button onClick={onLogin}>Login</button>
      </div> */}
      <div className="otp-second-main">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        <div className="otp-third-card">
          <h1>Welcome to Blood Donor</h1>
          {showOTP ? (
            <>
              <div
                className="otp-second-main-ChangeMobileNumber"
                onClick={EditMobileNumber}
              >
                <IoMdArrowRoundBack size={32} />
              </div>
              <span className="otp-second-main-mobile-number-display">{`OTP has been sent to ${PhoneNumber.slice(
                2
              )}`}</span>
              <label htmlFor="otp" className="">
                Enter your OTP
              </label>
              <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
                className="opt-container "
              ></OtpInput>
              <button onClick={onOTPVerify} className="otp-btn">
                {loading && <CgSpinner size={20} className="animation-spin" />}
                <span>Verify OTP</span>
              </button>
            </>
          ) : (
            <>
              {/* <div className="otp-third-card">
                  <BsTelephoneFill size={30} />
                </div> */}
              <label htmlFor="" className="">
                Verify your phone number
              </label>
              <PhoneInput
                country={"in"}
                value={PhoneNumber}
                onChange={setPhoneNumber}
              />
              <button
                style={{
                  cursor: singleClick && "not-allowed",
                }}
                disabled={singleClick}
                onClick={CheckPhoneNumberAndSignUp}
                className="otp-btn"
              >
                {loading && <CgSpinner size={20} className="animation-spin" />}
                <span>Send code via SMS</span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OTP;
