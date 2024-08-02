import React, { useEffect, useState } from 'react';
import './initialscreen.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import OTP from '../otp/OTP';
import Cookies from 'js-cookie';
import Footer from '../footer/Footer';
import { bloodGroup } from '../../data/bloodGoup';
import DonorRegistor from '../../utilcomponents/donorregistor/DonorRegistor';
import { API } from '../../core/utils';
import { useNavigate } from 'react-router-dom';
import { LogIns } from '../../action/AuthAction';
import { useDispatch } from 'react-redux';
import BloodBank from '../../utilcomponents/bloodbank/BloodBank';
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};
const InitialScreen = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [displayDonorFormOrFindBoold, setDisplayDonorFormOrFindBoold] =
    useState(0);

  //
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phoneL, setPhoneL] = useState('');

  const onSub = () => {
    dispatch(LogIns({ mobile: phoneL }, navigate));
  };

  const ImagesForSlider = [
    {
      url: './images/RegisterImage1.jpg',
      alt: 'RegisterImage1',
    },
    {
      url: './images/RegisterImage2.jpg',
      alt: 'RegisterImage2',
    },
    {
      url: './images/RegisterImage3.jpg',
      alt: 'RegisterImage3',
    },
    {
      url: './images/RegisterImage4.jpg',
      alt: 'RegisterImage4',
    },
  ];

  const RegisterUserCardHeadingData = [
    'Register Donor',
    'Register Request Blood',
  ];

  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);

  const [RegisterUserCardHeading, setRegisterUserCardHeading] = useState(
    RegisterUserCardHeadingData[currentHeadingIndex]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIndex(
        (prevIndex) => (prevIndex + 1) % RegisterUserCardHeadingData.length
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setRegisterUserCardHeading(
      RegisterUserCardHeadingData[currentHeadingIndex]
    );
  }, [currentHeadingIndex, RegisterUserCardHeadingData]);

  return (
    <div className="initial-screen-main">
      <div className="initial-screen-second-card">
        <div className="initial-left-side-card">
          <Slider className="single-slider" {...settings}>
            {ImagesForSlider.map((image, index) => (
              <div key={index}>
                <img src={image.url} alt={image.alt} />
              </div>
            ))}
          </Slider>
        </div>
        {/* <div>
          <input onChange={(e) => setPhoneL(e.target.value)} type="text" />
          <button onClick={onSub}>submit</button>
        </div> */}
        <div className="initail-right-side-card">
          {openRegister ? (
            <div className="initial-registor-main-screen">
              <div className="initial-singup-tabs-cards">
                <span
                  className={
                    displayDonorFormOrFindBoold === 0
                      ? 'RegisterUser active'
                      : 'RegisterUser'
                  }
                  onClick={() => setDisplayDonorFormOrFindBoold(0)}
                >
                  {RegisterUserCardHeading}
                </span>
                <span
                  className={
                    displayDonorFormOrFindBoold === 1
                      ? 'RegisterBloodBank active'
                      : 'RegisterBloodBank'
                  }
                  onClick={() => setDisplayDonorFormOrFindBoold(1)}
                >
                  Register Blood Bank
                </span>
                
              </div>

              <div className="main-form-main-card">
                {displayDonorFormOrFindBoold === 0 ? (
                  <DonorRegistor />
                ) : (
                  <BloodBank />
                )}
              </div>
            </div>
          ) : (
            <OTP setOpenRegister={setOpenRegister} />
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default InitialScreen;
