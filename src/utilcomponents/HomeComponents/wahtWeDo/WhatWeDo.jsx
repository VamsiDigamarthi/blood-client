import React from "react";
import "./whatwedo.css";

import { motion } from "framer-motion";
import { FaLongArrowAltRight } from "react-icons/fa";
const WhatWeDo = () => {
  const container = (delay = 0) => ({
    offscreen: {
      opacity: 0,
      y: 20,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 2,
        delay,
      },
    },
  });
  return (
    <div className="what-we-do">
      <h1>What We Do</h1>
      <motion.div
        initial="offscreen"
        whileInView={"onscreen"}
        variants={container(0)}
        className="waht-inner-card"
      >
        <img
          src="https://www.singlecare.com/blog/wp-content/uploads/2019/12/Blog_010620_Who_Can_Cant_Donate_Blood-600x338.png"
          alt=""
        />
        <section className="what-dosecond-card">
          <h1>Blood Appeal</h1>
          <p>
            Blood is a precious asset that can save lives. At NUHVIN Blood Bank,
            we invite you to consider donating blood. Your contribution might be
            a lifeline for someone in need, providing critical funds for
            life-saving therapies and emergency care. Every drop counts, and
            your contribution can make a significant difference in the lives of
            patients experiencing medical crises.
          </p>
          <div>
            <button>Request Blood</button>
            <FaLongArrowAltRight size={25} />
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default WhatWeDo;
