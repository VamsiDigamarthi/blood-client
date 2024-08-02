import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer-main">
      <h2>
        We are continuously working to improve our services and save more lives.
      </h2>
      <img
        src="https://cdn.apollohospitals.com/health-library-prod/2019/06/jj.jpg"
        alt="footer-img"
      />

      <div className="foorter-second-card">
        <span>@2024 Nuhvin, All Rights Reserved.</span>
        <div>
          <Link className="link-router" to="temsconditions">
            Terms and Conditions
          </Link>
          <Link className="link-router" to="/policy">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;