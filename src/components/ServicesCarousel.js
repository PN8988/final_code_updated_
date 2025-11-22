import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const ServicesCarousel = () => {
  const slides = [
    {
      id: 1,
      img: "https://source.unsplash.com/1600x500/?finance,consulting",
      title: "Investment Planning",
      desc: "Optimize your portfolio with expert-led investment strategies.",
    },
    {
      id: 2,
      img: "https://source.unsplash.com/1600x500/?tax,consultant",
      title: "Tax & Compliance",
      desc: "Stay compliant with precise tax filing and advisory services.",
    },
    {
      id: 3,
      img: "https://source.unsplash.com/1600x500/?wealth,growth",
      title: "Wealth Management",
      desc: "Comprehensive wealth planning to maximize returns safely.",
    },
  ];

  return (
    <Carousel fade>
      {slides.map((s) => (
        <Carousel.Item key={s.id}>
          <img
            className="d-block w-100"
            src={s.img}
            alt={s.title}
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ServicesCarousel;
