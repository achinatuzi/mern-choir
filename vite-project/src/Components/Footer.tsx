 import {
   FaXTwitter,
   FaInstagram,
   FaFacebook,
   FaSquareYoutube,
   FaWhatsapp,
 } from "react-icons/fa6";
 import gvc from "../assets/image/gvc3.jpg";

import { Button, Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div
      className="d-flex flex-column p-lg-5 justify-content-center col-md-2 align-items-center w-100"
      style={{ color: "#9f9f9f", backgroundColor: "rgba(0,0,0,0.9)" }}
    >
      <Row className="align-items-center d-flex flex-column w-100 justify-content-center">
        <Col className="d-flex  w-100 me-lg-5 flex-column flex-lg-row   ">
          <div className="w-100 d-flex flex-column">
            <span className="d-flex align-items-center me-5 ">
              <img
                alt="gvc"
                src={gvc}
                className="m-0 p-0"
                style={{ width: "100px", height: "100%", borderRadius: "40%" }}
              />
              <span
                style={{
                  fontFamily: "Brush Script MT, cursive",
                  fontWeight: "bolder",
                  fontSize: "20px",
                  color: "#C5C5C5",
                  marginLeft: "10px",
                }}
              >
                <p>GLORIOUS</p>
                <p
                  style={{
                    margin: "-30px -10px",
                    position: "absolute",
                    display: "flex",
                  }}
                >
                  VOICES
                </p>
                <h4
                  style={{
                    fontFamily: "Garamond, serif",
                    marginLeft: "10px",
                    fontSize: "15px",
                  }}
                >
                  CHOIR
                </h4>
              </span>
            </span>
            <span className="w-100 d-inline">
              <span
                style={{
                  fontFamily: "Courier New monospace",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                <p style={{ padding: "0px", margin: "0px" }}>
                  Saint Anthony of Padua
                </p>
                <p style={{ padding: "0px", margin: "0px" }}>
                  Catholic Community,
                </p>
                <p style={{ padding: "0px", margin: "0px" }}>
                  Eziobodo, Futo Road.
                </p>
                <p style={{ padding: "0px", margin: "0px" }}>
                  Owerri West, Imo State, Nigeria.
                </p>
                <p style={{ padding: "0px", marginTop: "0px" }}>
                  <strong>PHONE: +234-9039354698</strong>
                </p>
              </span>
            </span>
            <span>
              {" "}
              <p style={{ padding: "0px", marginBottom: "0px" }}>
                To foster excellent singing and
              </p>
              <p style={{ padding: "0px", margin: "0px" }}>
                impactful storytelling while
              </p>
              <p style={{ padding: "0px", margin: "0px" }}>
                engaging communities in the{" "}
              </p>
              <p style={{ padding: "0px", marginTop: "0px" }}>
                vibrancy of the choral art
              </p>
            </span>
            <span>
              <p>About Glorious Voices Choir</p>
            </span>
          </div>

          <div className="w-100 d-flex flex-column p-0 m-lg-5">
            <span
              style={{
                fontFamily: "Garamond, serif",
                fontWeight: "bolder",
                fontSize: "17px",
                color: "#C5C5C5",
              }}
            >
              EVENTS
            </span>
            <span>
              {" "}
              <p style={{ padding: "0px", marginBottom: "0px" }}>
                2020-2024 Season
              </p>
              <p style={{ padding: "0px", margin: "0px" }}>Concerts</p>
              <p style={{ padding: "0px", margin: "0px" }}>Recordings</p>
              <p style={{ padding: "0px", marginTop: "0px" }}>Videos</p>
            </span>
            <span
              style={{
                fontFamily: "Garamond, serif",
                fontWeight: "bolder",
                fontSize: "17px",
                color: "#C5C5C5",
              }}
            >
              PERFORMANCES
            </span>
            <span>
              {" "}
              <p style={{ padding: "0px", marginBottom: "0px" }}>
                2020-2024 Season
              </p>
              <p style={{ padding: "0px", margin: "0px" }}>Concerts</p>
              <p style={{ padding: "0px", margin: "0px" }}>Recordings</p>
              <p style={{ padding: "0px", marginTop: "0px" }}>Videos</p>
            </span>
          </div>

          <div className="w-100 align-items-centr d-flex flex-column p-0 m-lg-5">
            <span
              style={{
                fontFamily: "Garamond, serif",
                fontWeight: "bolder",
                fontSize: "17px",
                color: "#C5C5C5",
              }}
            >
              VOICE YOUR SUPPORT
            </span>
            <span>
              {" "}
              <p style={{ padding: "0px", marginBottom: "0px" }}>Support Us</p>
              <p style={{ padding: "0px", margin: "0px" }}>Partnership</p>
              <p style={{ padding: "0px", margin: "0px" }}>Special Events</p>
              <p style={{ padding: "0px", marginTop: "0px" }}>Shop & Support</p>
            </span>
            <span
              style={{
                fontFamily: "Garamond, serif",
                fontWeight: "bolder",
                fontSize: "15px",
                color: "#C5C5C5",
              }}
            >
              ABOUT GLORIOUS VOICES CHOIR
            </span>
            <span>
              {" "}
              <p style={{ padding: "0px", marginBottom: "0px" }}>News</p>
              <p style={{ padding: "0px", marginTop: "0px" }}>Jobs</p>
            </span>
          </div>

          <div className="w-100 d-flex flex-column p-0 me-lg-5 ">
            <span
              style={{
                fontFamily: "Garamond, serif",
                fontWeight: "bolder",
                fontSize: "17px",
                color: "#C5C5C5",
              }}
            >
              FOLLOW US ON
            </span>
            <span
              style={{ fontSize: "35px" }}
              className="d-flex justify-content-around align-items-center w-75 m-0 p-0 "
            >
              <Link
                to="#"
                style={{
                  color: "white",
                  margin: "10px",
                }}
              >
                <FaXTwitter />
              </Link>
              <Link
                to="#"
                style={{
                  color: "white",
                  margin: "10px",
                }}
              >
                <FaSquareYoutube />
              </Link>
              <Link
                to="#"
                style={{
                  color: "white",
                  margin: "10px",
                }}
              >
                <FaFacebook />
              </Link>
              <Link
                to="#"
                style={{
                  color: "white",
                  margin: "10px",
                }}
              >
                <FaInstagram />
              </Link>
              <Link
                to="#"
                style={{
                  color: "white",
                  margin: "10px",
                }}
              >
                <FaWhatsapp />
              </Link>
            </span>
            <span>
              <span className="d-flex flex-column w-100">
                <Button className="w-75 ">BUY TICKETS</Button>
                <Button className="w-75">DONATE</Button>
              </span>
              <span></span>
            </span>
          </div>
        </Col>
      </Row>

      <hr></hr>
      <div
        style={{ fontSize: "15px" }}
        className="d-flex justify-content-center align-items-center flex-column m-0 p-0 w-100"
      >
        <p className="w-100 m-0 "> &copy; 2024 Glorious Voices Choir </p>
        <p>
          <Link to="#" className="header-link w-100 m-0 text-decoration-none ">
            Privacy Policy | Terms & Conditions
          </Link>
        </p>
      </div>
      <span className="d-flex w-100 justify-content-end ">
        <p style={{ fontFamily: "Brush Script MT, cursive" }}>
          Created by Aldrian
        </p>
      </span>
    </div>
  );
};

export default Footer;
