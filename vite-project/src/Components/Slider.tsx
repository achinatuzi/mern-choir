import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import banner from "../assets/image/banner5.jpg";

function Slider() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item interval={3500}>
        <Link to="#">
          <img
            src={banner}
            alt="first slide"
            style={{ width: "100%", height: "100%" }}
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item interval={3500}>
        <Link to="#">
          <img
            src={banner}
            alt="first slide"
            style={{ width: "100%", height: "100%" }}
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item interval={3500}>
        <Link to="#">
          <img
            src={banner}
            alt="first slide"
            style={{ width: "100%", height: "100%" }}
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <Link to="#">
          <img
            src={banner}
            alt="first slide"
            style={{ width: "100%", height: "100%" }}
          />
        </Link>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <Link to="#">
          <img
            src={banner}
            alt="first slide"
            style={{ width: "100%", height: "100%" }}
          />
        </Link>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
