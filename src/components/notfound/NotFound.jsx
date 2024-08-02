import React from "react";
import "./notfound.css";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="not-found-main">
      <div className="first-not-found-card">
        <h1>Ooops .....!</h1>
        <p>Page Not Found </p>
        <p>
          The Page you are looking for doesn't exit or an other error occurred,
          go back to home page
        </p>
        <button>
          <Link className="back-link" to="/donor">
            Back to Home
          </Link>
        </button>
      </div>
      <div className="second-not-found-card">
        <img
          src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1715731200&semt=sph"
          alt="not-found"
        />
      </div>
    </div>
  );
};

export default NotFound;
