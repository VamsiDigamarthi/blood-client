import React from "react";
import "./essential.css";
import { Link } from "react-router-dom";
const Essential = () => {
  return (
    <div className="essential-main-card">
      <section className="essential-left-card">
        <img
          src="https://oncquest-blog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2023/08/01034810/essential-blood-tests-for-everyone.png"
          alt=""
        />
      </section>
      <section className="essential-right-card">
        <h1>Blood is Essential for Life</h1>
        <p>
          Life cannot exist without blood. It transports oxygen and nutrients
          into cells, eliminates waste products, regulates temperature, and
          protects against infections. Without it, the body cannot operate,
          emphasizing its crucial relevance for survival.
        </p>
        <Link to="/explore">
          <button className="explore-button-essential-right-card">
            Explore Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Essential;
