import React, { useEffect, useState } from "react";
import "./home.css";
import ThreeSlide from "../../utilcomponents/HomeComponents/threeSlide/ThreeSlide";
import Essential from "../../utilcomponents/HomeComponents/essential/Essential";
import LearnAboutDonation from "../../utilcomponents/HomeComponents/learnoAboutDonotion/LearnAboutDonation";
import WhatWeDo from "../../utilcomponents/HomeComponents/wahtWeDo/WhatWeDo";
import BloodBankReg from "../../utilcomponents/HomeComponents/bloodBankReg/BloodBankReg";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../core/utils";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
// import Cookies from "js-cookie";
const Home = () => {
  const transition = { type: "spring", duration: 1 };

  // const jwtToken = Cookies.get("jwt_token");
  const UUU = useSelector((state) => state.authReducer.authData);

  const [user, setUser] = useState({});

  useEffect(() => {
    API.get("/auth/getUser", {
      headers: {
        Authorization: `Bearer ${UUU?.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
        setUser({});
      });
  }, []);
  console.log(user);

  return (
    <div className="main-page">
      <div className="hero-main">
        <div className="hero-first-card">
          <motion.h1
            initial={{ x: -300 }}
            whileInView={{ x: 0 }}
            transition={{ ...transition, duration: 2 }}
          >
            Donate Your <span>Blood</span> to Us,
          </motion.h1>
          <motion.h1
            initial={{ x: -300 }}
            whileInView={{ x: 0 }}
            transition={{ ...transition, duration: 4 }}
          >
            <span>Save</span> More Lives Together
          </motion.h1>
          {Object.keys(user).length > 0 ? (
            <>
              <div className="hero-button-card">
                {user?.employeeType === "Donor" && (
                  <>
                    <button>
                      <Link className="link" to="/patient">
                        Request Blood
                      </Link>
                    </button>
                    <button>
                      <Link className="link" to="/patient">
                        Request as Donor
                      </Link>
                    </button>
                  </>
                )}
              </div>
              <div className="hero-button-card" id="new-btns-card">
                {user?.employeeType === "BloodBank" && (
                  <button>
                    <Link className="link" to="/bloodbank">
                      My Blood Bank
                    </Link>
                  </button>
                )}
                {/* <button>Find Donors</button> */}
              </div>
            </>
          ) : (
            <div className="hero-button-card" id="new-btns-card">
              {user?.employeeType !== "Donor" && (
                <button>
                  <Link className="link" to="/registor">
                    Register for Saving Life
                  </Link>
                </button>
              )}
              {/* <button>Find Donors</button> */}
            </div>
          )}
        </div>
        <div className="hero-second-card">
          <img
            src="https://www.careinsurance.com/upload_master/media/posts/June2020/IQKrrYI3nqo0i9PNqO7W.jpg"
            alt="hero"
          />
        </div>
      </div>

      <ThreeSlide />
      {/* <AppDisplay /> */}
      <Essential />
      <LearnAboutDonation />
      {/* <DonorCount /> */}
      <WhatWeDo />
      <BloodBankReg />
    </div>
  );
};

export default Home;
