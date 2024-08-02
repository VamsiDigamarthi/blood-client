import React, { useState } from "react";
import "./Registor.css";
import Login from "../Login/Login";
import DisplaySlider from "../../utilcomponents/slider/DisplaySlider";
import DonorRegistor from "../../utilcomponents/donorregistor/DonorRegistor";
import BloodNeeded from "../../utilcomponents/bloodNeeded/BloodNeeded";
import BloodBank from "../../utilcomponents/bloodbank/BloodBank";
import { useLocation } from "react-router-dom";
const Registor = () => {
  const [displayDonorFormOrFindBoold, setDisplayDonorFormOrFindBoold] =
    useState(0);

  const [showLogin, setShowLogin] = useState(true);
  const location = useLocation();
  console.log(location.state?.key?.phon);
  const data = location.state?.data;
  console.log(data);

  return (
    <div className="registor-main">
      <div className="registor-slider-main">
        <DisplaySlider />
      </div>
      {showLogin ? (
        <div className="register-right-card">
          <div className="register-right-first-card">
            <div>
              <span
                style={{
                  borderBottom:
                    displayDonorFormOrFindBoold === 0 &&
                    "2px solid var(--main-text-color)",
                }}
                onClick={() => setDisplayDonorFormOrFindBoold(0)}
              >
                Registor as Donor
              </span>
            </div>
            <div>
              <span
                style={{
                  borderBottom:
                    displayDonorFormOrFindBoold === 1 &&
                    "2px solid var(--main-text-color)",
                }}
                onClick={() => setDisplayDonorFormOrFindBoold(1)}
              >
                Blood Black
              </span>
            </div>
            <div>
              <span
                style={{
                  borderBottom:
                    displayDonorFormOrFindBoold === 2 &&
                    "2px solid var(--main-text-color)",
                }}
                onClick={() => setDisplayDonorFormOrFindBoold(2)}
              >
                Find Blood Donor
              </span>
            </div>
          </div>
          <div className="tab-card">
            {displayDonorFormOrFindBoold === 0 ? (
              <>
                <DonorRegistor setShowLogin={setShowLogin} />
              </>
            ) : (
              <>
                {displayDonorFormOrFindBoold === 1 ? (
                  <>
                    <BloodBank setShowLogin={setShowLogin} />
                  </>
                ) : (
                  <BloodNeeded setShowLogin={setShowLogin} />
                )}
              </>
            )}
          </div>
          {/* <div className="tab-card">
          {showLogin ? (
            <>
              {displayDonorFormOrFindBoold ? (
                <DonorRegistor setShowLogin={setShowLogin} />
              ) : (
                <BloodNeeded setShowLogin={setShowLogin} />
              )}
            </>
          ) : (
            <Login setShowLogin={setShowLogin} />
          )}
        </div> */}
        </div>
      ) : (
        <>
          <Login setShowLogin={setShowLogin} />
        </>
      )}
    </div>
  );
};

export default Registor;
