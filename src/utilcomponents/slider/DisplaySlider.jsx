import React from "react";
import "./displaySlider.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const DisplaySlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div className="single-slider-div ">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbSJJ8F9Q3Sd8aWx9oRB6pOkisapwOYerWGFA41JC_Mg&s"
          alt=""
          className="single-slider-img"
        />
      </div>
      <div className="single-slider-div">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHFHvqFv0nvVT1Ro3Af-4a6MDUstjkeZu8Vf5wKb0UMw&s"
          alt=""
          className="single-slider-img"
        />
      </div>
      <div className="single-slider-div">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWi5W5eR5BSf_OI_Fg4pPSeshjnyZOAxR9KRpoWhN82w&s"
          alt=""
          className="single-slider-img"
        />
      </div>
    </Slider>
  );
};

export default DisplaySlider;
