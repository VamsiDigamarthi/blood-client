import React, { useEffect, useState } from 'react';
import './donorCount.css';
import { API } from '../../../core/utils';

import NumberCounter from 'number-counter';
const DonorCount = () => {
  useEffect(() => {
    API.get('/auth/bloodbank/count').then((res) => {
      setBloodBanksCount(res.data.bloodBankCount);
    });
    API.get('/auth/donors/count').then((res) => {
      setDonorsCount(res.data.donorsCount);
    });
  }, []);
  const [BloodBanksCount, setBloodBanksCount] = useState(0);
  const [DonorsCount, setDonorsCount] = useState(0);
  return (
    <div className="donor-count-main">
      <img
        src="https://as2.ftcdn.net/v2/jpg/03/52/88/75/1000_F_352887514_tjIDVwFWlvTwLONpPLvc44TDEeJdHFO1.jpg"
        alt="number"
      />
      <section className="number-count-inner-card">
        <div>
          <div className="single-number-card">
            <h1>
              <NumberCounter
                end={BloodBanksCount}
                start={0}
                delay="2"
                postFix="+"
              />
            </h1>
            <h3>Blood Banks Registered</h3>
          </div>
          <div className="single-number-card">
            <h1>
              <NumberCounter
                end={DonorsCount}
                start={0}
                delay="2"
                postFix="+"
              />
            </h1>
            <h3>Request Blood Units</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonorCount;
