import React from "react";
import "./bloodbankreg.css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { motion } from "framer-motion";

const BloodBankReg = () => {
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
    <div className="donor-bank-ma">
      <motion.div
        initial="offscreen"
        whileInView={"onscreen"}
        variants={container(0)}
        className="donor-bank-reg-main"
      >
        <section className="donor-bank-reginner-card">
          <h1>Blood Donation</h1>
          <p>
            Blood donation is a kind gesture of providing blood to people in
            need of transfusions as a result of medical problems such as
            surgeries, injuries, or blood disorders. It's an important part of
            wellness that saves lives and improves health outcomes.
          </p>
          <div>
            <button>Request as Donor</button>
            <FaLongArrowAltRight size={25} />
          </div>
        </section>
        <img
          src="https://images.boldsky.com/img/2020/06/blooddonation-1592231841.jpg"
          alt="fgh"
        />
      </motion.div>
      <motion.div
        initial="offscreen"
        whileInView={"onscreen"}
        variants={container(0.2)}
        className="donor-bank-reg-main"
      >
        <img
          src="https://media.slidesgo.com/storage/11986228/conversions/0-blood-bank-center-thumb.jpg"
          alt="fgh"
        />
        <section className="donor-bank-reginner-card">
          <h1>Blood Banks</h1>
          <p>
            A blood bank is a vital element facility that collects, preserves,
            and distributes donated blood for medical use. It is critical in
            healthcare because it provides a consistent supply of blood for
            patients who require transfusions as a result of surgeries,
            injuries, or other disorders. Blood banks also test donated blood to
            ensure its safety and compatibility before transfusing it into
            patients.
          </p>
          <div>
            <button>Blood Bank Registration</button>
            <FaLongArrowAltRight size={25} />
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default BloodBankReg;
