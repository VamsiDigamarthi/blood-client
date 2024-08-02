import React from "react";
import "./threeslide.css";
import { motion } from "framer-motion";
const ThreeSlide = () => {
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
    <div className="three-slider-main">
      <motion.div
        initial="offscreen"
        whileInView={"onscreen"}
        variants={container(0)}
        className="single-three-slider"
      >
        <img
          src="https://i0.wp.com/www.mmumullana.org/wp-content/uploads/2021/06/Blood-Donation-2.jpg?fit=802%2C602&ssl=1"
          alt="blood"
        />
        <div className="single-card-inner">
          <h3>Become a Donote</h3>
          <p>
            "Become a Donote" epitomizes the opportunity to make a profound
            impact. Your Commitment to blood donation is a testament to your
            compassion and generosity embrace .....
          </p>
        </div>
        <button>Read More</button>
      </motion.div>
      <motion.div
        initial="offscreen"
        whileInView={"onscreen"}
        variants={container(0.5)}
        className="single-three-slider"
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScR5Ck1kXkSq_wHgFs-squiuQRk_1TLYbn08dYqALEMA&s"
          alt="blood"
        />
        <div className="single-card-inner">
          <h3>Why give blood</h3>
          <p>
            Giving blood is an act of compassion with far-reaching effects. Your
            donations can provide crucial support to patients in need, offering
            hope and healing during theri most challenging .....
          </p>
        </div>
        <button>Read More</button>
      </motion.div>
      <motion.div
        initial="offscreen"
        whileInView={"onscreen"}
        variants={container(0.9)}
        className="single-three-slider"
      >
        <img
          src="https://blooddonation.in/wp-content/uploads/2023/08/Blood-Donation-Logo.png"
          alt="blood"
        />
        <div className="single-card-inner">
          <h3>How Donations Help?</h3>
          <p>
            Donations provide crucial support to those in need, offering hope
            and assistance during challenging times.Whether it's donation blood,
            plasma, platelets, every contribution makes .....
          </p>
        </div>
        <button>Read More</button>
      </motion.div>
    </div>
  );
};

export default ThreeSlide;
