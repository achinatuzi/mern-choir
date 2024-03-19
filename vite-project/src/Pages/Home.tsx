import { Col, Row } from "react-bootstrap";
import Expandable from "../Components/Expandable";
import { useEffect } from "react";
import gvcVideo from '../assets/videos/gvcVideo.mp4'
import chi1 from "../assets/image/chi6.jpg";
import chi2 from "../assets/image/chi3.jpg";
import chi3 from "../assets/image/chi5.jpg";

const Home = () => {
  useEffect(() => {
    window.scroll(0, 0);
  });

  // const getImage = async() => {
  //   const data = await axios.get("http://localhost:4000/api/image/");
  //   console.log(data.data)
  // }

  // useEffect(() => {
  //   getImage();
  // })
  return (
    <div className="home pt-2 m-0 w-100  ">
      {/* <div className="home_image w-0  "></div> */}
      {/* <Slider /> */}
      <div className="w-100 content">
        <video src={gvcVideo} autoPlay loop muted />
        <div className="videoOverlay">
        </div>
      </div>

      <Row style={{ marginTop: "480px" }}>
        <Col>
          <div
            style={{ backgroundColor: "rgba(250, 250, 250,0.9)" }}
            className="d-flex w-100 flex-column p-lg- m-0 border-end-0  justify-content-center align-items-center"
          >
            <h3 style={{ color: "dark", fontSize: "1.5em" }}>
              <strong>Our Mission</strong>
            </h3>
            <p
              style={{ color: "gray", fontSize: "1.1em", textAlign: "center" }}
            >
              <strong>
                {" "}
                To foster excellent singing and impactful storytelling while
                engaging communities in the vibrancy of the choral art To foster
                excellent singing and impactful storytelling while engaging
                communities in the vibrancy of the choral art
              </strong>
            </p>
          </div>
        </Col>
      </Row>
      <Row
        className="pt-4"
        style={{
          backgroundColor: "rgba(200, 200, 200, 0.9)",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "1.3em",
              fontWeight: "bold",
            }}
          >
            ABOUT
          </p>
        </div>
        <hr></hr>
        <Col>
          <div className="d-flex flex-column flex-lg-row">
            <div
              className="d-flex flex-column px-lg-5 w-100 justify-content-center align-items-center"
              style={{
                textAlign: "center",
                fontSize: "17px",
                backgroundColor: "rgba(110, 120, 120, 0.06)",
                borderRadius: "50px",
              }}
            >
              <img
                src={chi1}
                style={{ width: "260px", height: "320px" }}
                className="rounded-circle"
              />
              <h4>First Chiormaster</h4>
              <Expandable maxChats={200}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Expandable>
            </div>
            <div
              className="d-flex flex-column px-lg-5 w-100 justify-content-center align-items-center"
              style={{
                textAlign: "center",
                backgroundColor: "rgb(110, 120, 120, 0.06)",
                borderRadius: "50px",
                fontSize: "17px",
              }}
            >
              <img
                src={chi2}
                className="rounded-circle"
                style={{ width: "250px", height: "320px" }}
              />
              <h4>First President</h4>
              <Expandable maxChats={200}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Expandable>
            </div>
            <div
              className="d-flex flex-column px-lg-5 w-100 justify-content-center align-items-center "
              style={{
                textAlign: "center",
                backgroundColor: "rgb(110, 120, 120, 0.06)",
                borderRadius: "50px",
                fontSize: "17px",
              }}
            >
              <img
                src={chi3}
                className="rounded-circle"
                style={{ width: "250px", height: "320px" }}
              />
              <h4>Spiritual Director</h4>
              <Expandable maxChats={200}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Expandable>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
