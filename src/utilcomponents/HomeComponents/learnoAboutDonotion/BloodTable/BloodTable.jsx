import './BloodTable.css';

export default function BloodTable() {
  return (
    <section className="learni-more-donationd-second-card">
      <section className="learni-more-second-first-card">
        <h4>Compatible Blood Type Donors</h4>
      </section>
      <section className="learnig-more-right-table-section">
        <div className="leaning-table-header">
          <span>Blood Type</span>
          <span>Donate Blood To</span>
          <span>Receive Blood Form</span>
        </div>
        <div className="learning-table-body">
          <span>A+</span>
          <span>A+ AB+</span>
          <span>A+ A- O+ O-</span>
        </div>
        <div className="learning-table-body">
          <span>O+</span>
          <span>O+ A+ B+ AB+</span>
          <span>O+ O-</span>
        </div>
        <div className="learning-table-body">
          <span>B+</span>
          <span>B+ AB+</span>
          <span>B+ B- O+ O-</span>
        </div>
        <div className="learning-table-body">
          <span>AB+</span>
          <span>AB+</span>
          <span>EveryOne</span>
        </div>
        <div className="learning-table-body">
          <span>A-</span>
          <span>A+ A- AB+ AB-</span>
          <span>A- O-</span>
        </div>
        <div className="learning-table-body">
          <span>O-</span>
          <span>EveryOne</span>
          <span>O-</span>
        </div>
        <div className="learning-table-body">
          <span>B-</span>
          <span>B+ B- AB+ AB-</span>
          <span>B- O-</span>
        </div>
        <div className="learning-table-body">
          <span>AB-</span>
          <span>AB+ AB-</span>
          <span>AB- A- B- O-</span>
        </div>
      </section>
    </section>
  );
}
