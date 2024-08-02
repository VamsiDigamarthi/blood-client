import React from "react";
import "./howwehelp.css";
import { motion } from "framer-motion";
const HowWeHelp = () => {
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
    <div className="how-we-help-main-card">
      <section className="how-we-first-card">
        <img
          src="https://twill-happifiers-cms-uploads.happify.com/cms_uploads/en_US/img/happifiers/hidden-benefits-of-helping-others-1_cbe443c.jpg"
          alt="sd"
        />
        <div className="how-we-first-iiner-card">
          <h1>How We Help</h1>
          <p>Educating the community on blood donation importance</p>
        </div>
      </section>
      <motion.section
        initial="offscreen"
        whileInView={"onscreen"}
        variants={container(0)}
        className="how-we-second-card"
      >
        <h2>How We help?</h2>
        <p>Educating the community on blood donation importance</p>
        <p>
          At NUVHIN BLOOD BANK, we provide essential support to those in need
          through our comprehensive donation services. By facilitating blood,
          plasma, and platelets donation, we contribute to life-saving
          treatments for patients facing various medical conditions, including
          cancer, clothing disorders, and immune deficiencies. Our efforts
          empower individuals to make a meaningful difference in the lives of
          others by providing safe, reliable, and accessible donation
          opportunities. Through our unwavering commitment to excellence and
          compassion, we ensure that patients receive the critical support they
          required for recovery and improved health.
        </p>
        <p>The help we provide favors all those in need, including:</p>
        <ul>
          <li>
            <span>Blood Donation : </span>
            Offering essential support to patients required blood transfusions
            for diverse medical condition
          </li>
          <li>
            <span>Plasma Donation : </span>
            Enabling critical treatments for patients which clotting disorders
            and immune deficiencies.
          </li>
          <li>
            <span>Platelets Donations : </span>
            Assisting in the treatment of cancer patients of cancer patients and
            those with clotting disorders, providing vital support for their
            recovery
          </li>
        </ul>
      </motion.section>
    </div>
  );
};

export default HowWeHelp;
