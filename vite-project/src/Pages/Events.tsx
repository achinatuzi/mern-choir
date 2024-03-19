import { useContext, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetEventsQuery } from "../hooks/eventHooks";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Helmet } from "react-helmet-async";
import Expandable from "../Components/Expandable";
import gvc from "../assets/image/gvc.jpg";
import { Store } from "../Store";


const Events = () => {
  const { data: events, isLoading, error } = useGetEventsQuery();

    const { state } = useContext(Store);
    const { userInfo } = state;

  useEffect(() => {
    window.scroll(0, 0);
  });
  return (
    <>
      {isLoading ? (
        <div className="d-flex w-100 justify-content-center align-items-center mt-5 pt-5">
          <LoadingBox />
        </div>
      ) : error ? (
        <MessageBox variant="danger">
          {getError(error as unknown as ApiError)}
        </MessageBox>
      ) : (
        <>
          <Helmet>
            <title>Events</title>
          </Helmet>

          <div
            style={{
              textAlign: "center",
              fontSize: "20px",
              backgroundColor: "rgba(220, 220, 220, 0.9)",
            }}
          >
            <div className="d-flex w-100 justify-content-center align-items-center">
              <Link to="/">
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    marginTop: "30px",
                    borderRadius: "30px",
                  }}
                  alt="event"
                  src={gvc}
                />
              </Link>
            </div>
            <div>
              <Row className="d-flex flex-column w-100 justify-content-center">
                <Col className="w-100">
                  <p
                    style={{
                      fontSize: "1.1em",
                      fontWeight: "bold",
                      textAlign: "start",
                      margin: "30px 0px 0px 10px",
                    }}
                  >
                    UPCOMING EVENTS
                  </p>
                  {events?.map((event, _id) => (
                    <div key={event._id}>
                      <hr></hr>
                      <div className="d-lg-flex">
                        <div className="w-100">
                          <p>
                            <strong>
                              {new Date(event.date).toDateString()}
                            </strong>
                          </p>
                        </div>
                        <div className="w-100 d-flex flex-column">
                          <p>
                            <strong>{event?.theme}</strong>
                          </p>
                          <span
                            style={{
                              textAlign: "center",
                              marginBottom: "-5px",
                              opacity: "0.8",
                            }}
                          >
                            <strong>
                              <Expandable maxChats={200}>
                                {event.description}
                              </Expandable>
                            </strong>
                          </span>
                        </div>
                        <div className="w-100 d-fex fle-column">
                          <span style={{ textAlign: "end" }}>
                            <p>
                              <strong>{event.time}</strong>
                            </p>
                            <p>{event.venue}</p>
                          </span>
                          {userInfo?.isAdmin && (
                            <Button>
                              <Link
                                to={`/updateEvent/${event._id}`}
                                className="nav-link"
                              >
                                Update Event
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <hr></hr>
                </Col>
              </Row>
            </div>
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: "20px",
              backgroundColor: "rgba(220, 220, 220, 0.7)",
            }}
          >
            <div>
              <Row className="d-flex flex-column w-100 justify-content-center">
                <Col className="w-100">
                  <p
                    style={{
                      fontSize: "1.1em",
                      fontWeight: "bold",
                      textAlign: "start",
                      margin: "30px 0px 0px 10px",
                    }}
                  >
                    PAST EVENTS
                  </p>
                  <hr></hr>
                  <div className="d-lg-flex">
                    <div className="w-100">
                      <p>
                        <strong>Wed, Jan 10</strong>
                      </p>
                    </div>
                    <div className="w-100 d-flex flex-column">
                      <p>
                        <strong>Spring 2024 Open Auditions</strong>
                      </p>
                      <p
                        style={{
                          textAlign: "justify",
                          marginBottom: "-5px",
                          opacity: "0.9",
                        }}
                      >
                        {" "}
                        <strong>
                          Lorem Ipsum is simply dummy text of the printing.
                          <br></br>
                          the typesetting industry. Lorem Ipsum has been the
                          industry's...
                        </strong>
                      </p>
                      <Link
                        to="#"
                        className="text-decoration-none nav-link text-success"
                      >
                        +more
                      </Link>
                    </div>
                    <div className="w-100 d-fex fle-column">
                      <span style={{ textAlign: "end" }}>
                        <p>
                          <strong>7:00pm - 9:00pm</strong>
                        </p>
                        <p>
                          First Presbyterian Church of<br></br> Bethlehem
                        </p>
                      </span>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="d-lg-flex">
                    <div className="w-100">
                      <p>
                        <strong>Wed, Jan 10</strong>
                      </p>
                    </div>
                    <div className="w-100 d-flex flex-column">
                      <p>
                        <strong>Spring 2024 Open Auditions</strong>
                      </p>
                      <p
                        style={{
                          textAlign: "justify",
                          marginBottom: "-5px",
                          opacity: "0.",
                        }}
                      >
                        <strong>
                          Lorem Ipsum is simply dummy text of the printing.
                          <br></br>
                          the typesetting industry. Lorem Ipsum has been the
                          industry's...
                        </strong>{" "}
                      </p>
                      <Link
                        to="#"
                        className="text-decoration-none nav-link text-success"
                      >
                        +more
                      </Link>
                    </div>

                    <div className="w-100 d-fex fle-column">
                      <span style={{ textAlign: "end" }}>
                        <p>
                          <strong>7:00pm - 9:00pm</strong>
                        </p>
                        <p>
                          First Presbyterian Church of<br></br> Bethlehem
                        </p>
                      </span>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="d-lg-flex">
                    <div className="w-100">
                      <p>
                        <strong>Wed, Jan 10</strong>
                      </p>
                    </div>
                    <div className="w-100 d-flex flex-column">
                      <p>
                        <strong>Spring 2024 Open Auditions</strong>
                      </p>
                      <p
                        style={{
                          textAlign: "justify",
                          marginBottom: "-5px",
                          opacity: "0.9",
                        }}
                      >
                        {" "}
                        <strong>
                          Lorem Ipsum is simply dummy text of the printing.
                          <br></br>
                          the typesetting industry. Lorem Ipsum has been the
                          industry's...
                        </strong>
                      </p>
                      <Link
                        to="#"
                        className="text-decoration-none nav-link text-success"
                      >
                        +more
                      </Link>
                    </div>

                    <div className="w-100 d-fex fle-column">
                      <span style={{ textAlign: "end" }}>
                        <p>
                          <strong>7:00pm - 9:00pm</strong>
                        </p>
                        <p>
                          First Presbyterian Church of<br></br> Bethlehem
                        </p>
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Events;
