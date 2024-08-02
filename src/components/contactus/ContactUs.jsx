import React from 'react';
import './contactus.css';
// import { FaPhoneAlt } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { MdEmail } from "react-icons/md";
const ContactUs = () => {
  return (
    <div className="contact-us-main">
      {/* <section className="how-we-first-card">
        <img
          src="https://twill-happifiers-cms-uploads.happify.com/cms_uploads/en_US/img/happifiers/hidden-benefits-of-helping-others-1_cbe443c.jpg"
          alt="sd"
        />
        <div className="how-we-first-iiner-card">
          <h1>How We Help</h1>
          <p>Educating the community on blood donation importance</p>
        </div>
      </section> */}
      {/* <section className="contact-second-main">
        <section className="contact-second-first-main">
          <section>
            <FaLocationDot size={30} />
            <h3>Address</h3>
            <p>2-2982 cjis kij9as lkjiajs</p>
          </section>
          <section>
            <FaPhoneAlt size={30} />
            <h3>Phone</h3>
            <p>1234567890</p>
            <p>0987654321</p>
          </section>
          <section>
            <MdEmail size={30} />
            <h3>Email</h3>
            <p>sddnjh@gmail.com</p>
            <p>skjhghjkj@gmail.com</p>
          </section>
        </section> */}

      <form className="contact-second-second-main">
        <h2>Send us a message</h2>
        <p>
          If you have any blood-related questions, please message us. We're glad
          to assist.
        </p>
        <input type="text" placeholder="Enter your Name" />
        <input type="text" placeholder="Enter your Email" />
        <textarea
          rows={5}
          cols={10}
          placeholder="Enter your Message"
        ></textarea>
        <button>Send Now</button>
      </form>
    </div>
  );
};

export default ContactUs;
