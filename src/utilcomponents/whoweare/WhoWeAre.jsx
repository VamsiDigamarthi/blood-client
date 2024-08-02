import React from "react";
import "./whoweare.css";
import { motion } from "framer-motion";

const WhoWeAre = () => {
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
    <div className="whoweare-main">
      <section className="how-we-first-card">
        <img
          src="https://twill-happifiers-cms-uploads.happify.com/cms_uploads/en_US/img/happifiers/hidden-benefits-of-helping-others-1_cbe443c.jpg"
          alt="sd"
        />
        <div className="how-we-first-iiner-card">
          <h1>Who We are</h1>
          <p>NBB offers crucial blood donation services.</p>
        </div>
      </section>
      <motion.section
        initial="offscreen"
        whileInView={"onscreen"}
        variants={container(0)}
        className="passionte-card"
      >
        <h2>Passionate about Protecting Life</h2>
        <p>
          NUHVIN BLOOD BANK is commitied to protecting life. Our dedicated team
          is dedicated to making every donation count by delivering crucial
          blood supplies to patients in need. We believe in the power of
          community and the benefits of philanthropy. Your decision to donate
          not only saves, but it also gives hope and strength to families
          suffering mediacal emergencies. Join us our journey to make a
          difference and save the lives of those who need it most.
        </p>
      </motion.section>
      <motion.section
        initial="offscreen"
        whileInView={"onscreen"}
        variants={container(0.2)}
        className="nbb-mission-card"
      >
        <section className="nbb-mission-inner-card">
          <h3>NBB MISSION : </h3>
          <p>Life-saving | Experties | Commitment</p>
          <p>
            At NUHVIN BLOOD BANK, our commission is to save lives throught the
            provision safe and reliable blood donation services. We are
            dedicated to meeting the needs of patients by ensuring a sufficient
            supply of blood products, while upholding the highest standards of
            quality, safety, and professionalism. Throught our commitment to
            excellence and innovation we aim to make a meaningful difference in
            the lives of individual and communities we serve.
          </p>
          <ul>
            Our mission is driven by three core principles:
            <li>
              Saving lives through blood donation, serving as a lifeline for
              those in need.
            </li>
            <li>
              Leveraging our experties to ensure the safety the efficacy of
              every donation.
            </li>
            <li>
              Demonstrating unwaveing commitment to our donors, patients, and
              community, fostering culture of care and compassion.
            </li>
          </ul>
        </section>
        <img src="./images/Mission.jpg" alt="Mission.jpg" />
      </motion.section>
      <motion.section
        initial="offscreen"
        whileInView={"onscreen"}
        variants={container(0.2)}
        className="nbb-mission-card"
      >
        <section className="nbb-mission-inner-card">
          <h3>NBB Values : </h3>
          <p>Empathetic | Skilled | High-caliber</p>
          <p>
            At NUHVIN BLOOD BANK, our values shape our culture and guide our
            actions. Compassion is at the heart of everthing we do, driving us
            to provide care and support to donors and recipients alike. We
            uphold integrity as a core principle, maintaining honesty,
            transparency, and ethical conduct in all our intercations.
            Excellence is our benchmark, as we strive for the highest standards
            of quality and professionalism in every aspect of our work.These
            values unite in our shared commitment to making a positive impact on
            the lives of those we serve.
          </p>
          <ul>
            Our three key beliefs underpin all we do and inspire to be the best:
            <li>
              We strive to be empathetic, understanding the nedds of donors and
              patients alike
            </li>
            <li>
              We aim to be skilled professionals, proficient in every aspect of
              our work
            </li>
            <li>
              We are committed to maintaining a high-caliber standard, ensuring
              excellence in all our endeavors.
            </li>
          </ul>
        </section>
        <img src="./images/Values.jpg" alt="Values.jpg" />
      </motion.section>

      <motion.section
        initial="offscreen"
        whileInView={"onscreen"}
        variants={container(0.2)}
        className="nbb-mission-card"
      >
        <section className="nbb-mission-inner-card">
          <h3>NBB Responsibilities : </h3>
          <p>Proactivity | Thoroghness | Consistency</p>
          <p>
            At NUHVIN BLOOD BANK, our responsibilities are paramount. We are
            entrusted with the vital task of saving lives by providing secure
            and dependable blood donation service. We prioritize meeting the
            urgent needs of patients by guaranteeing an ample supply of blood
            products, all while maintaining uncompromising standard of quality,
            safety, and professionalism. Through our unwavering commitment to
            excellence and we-being of individuals and the communities we serve.
          </p>
          <ul>
            Our responsibility is rooted in three foundational principle:
            <li>Proactivity drives our forward-thinking approch,</li>
            <li>Throughness ensures meticulous attention to detail,</li>
            <li>Consistency underpins our reliability in every action.</li>
          </ul>
        </section>
        <img src="./images/Responsibilities.jpg" alt="Responsibilities.jpg" />
      </motion.section>
      <section className="whowe-last-sec">
        <h3>NBB Transparency : </h3>
        <p>Visibility | Cardor | Reliability</p>
        <p>
          At NUHVIN BLOOD BANK, transparency is foundational to our
          responsibilities. We believe in clear and honest communication,
          providing donors and patients with comprehensive information about our
          blood donation service. By fostering transparency, we build trust and
          confidence in our operations, ensuring the safety and
        </p>
        <ul>
          Our transparency exemplified by three guiding principles :
          <li>Visibility ensure clarity in our actions,</li>
          <li>Candor fosters open and honest communication,</li>
          <li>Reliability ensures consistency and trust worthiness</li>
        </ul>
      </section>
    </div>
  );
};

export default WhoWeAre;
