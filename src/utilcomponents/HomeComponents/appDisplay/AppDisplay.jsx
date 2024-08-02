import React from "react";
import "./appdisplay.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};
const AppDisplay = () => {
  return (
    <div className="app-display-main">
      <section className="app-display-left">
        <h2>Nuhvin Blood Bank App</h2>
        <p>Put the power to save in the palm of your hand</p>
        <section className="app-display-btn-card">
          <button>IOS App</button>
          <button>Andriod App</button>
        </section>
      </section>
      <section className="app-display-right">
        <Slider {...settings}>
          <div className="slider-app">
            <img
              src="https://i.ytimg.com/vi/eJj8F6w_Pns/maxresdefault.jpg"
              alt=""
            />
          </div>
          <div className="slider-app">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlKmOc8PZDVE8f1p2r90LbncWpQo8aqIlqAZJCkI7D5w&s"
              alt=""
            />
          </div>
        </Slider>
      </section>
    </div>
  );
};

export default AppDisplay;
