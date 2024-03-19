import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { videos } from "../assets/videos/videos";

const Performers = () => {
  useEffect(() => {
    window.scroll(0, 0);
  });
  return (
    <Row
      style={{ backgroundColor: "rgba(220, 220, 220, 0.5)" }}
      className="align-items-center d-flex w-100"
    >
      {videos?.map((video, index) => (
        <Col
          key={index}
          sm={6}
          md={4}
          lg={3}
          className="align-items-center justify-content-center d-flex "
        >
          <Card
            className="align-items-center justify-content-center"
            style={{
              width: "260px",
              height: "200px",
              margin: "10px 0px 5px",
              backgroundColor: "rgb(220,220,222)",
            }}
          >
            <div>
              <iframe
                src={video.media}
                width="250"
                height="150px"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen={true}
                // allowTransparency={true}
                style={{ border: "0px" }}
              ></iframe>
            </div>
            <p>
              <strong>{video.description}</strong>
            </p>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Performers;
