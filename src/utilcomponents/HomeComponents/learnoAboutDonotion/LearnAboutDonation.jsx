import React from 'react';
import './learnaaboutdonation.css';
import { MdBloodtype } from 'react-icons/md';
import BloodTable from './BloodTable/BloodTable';
const LearnAboutDonation = () => {
  return (
    <div className="learnabout-donation-main">
      <h1>LEARN ABOUT DONATION</h1>
      <section className="learni-more-donation-inner-card">
        <section className="learni-more-donationd-first-card">
          <img src="images/table-blood.jpg" alt="blood-tab" />
          <section>
            <p>
              After donating blood the body works to replenish the blood loss.
              This stimulates the production of new blood cells and in turn,
              helps in maintaining good health.
            </p>
            <div>
              <MdBloodtype size={25} />
              <button>Donate Now</button>
            </div>
          </section>
        </section>
        <section className="BloodTableContainer">
          <BloodTable />
        </section>
      </section>
    </div>
  );
};

export default LearnAboutDonation;
