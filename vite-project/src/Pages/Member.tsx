import { Col, ListGroup, Row } from "react-bootstrap";
import { useGetUserDetailsByIdQuery } from "../hooks/userHooks";
import { useParams } from "react-router-dom";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Helmet } from "react-helmet-async";
import {useEffect } from "react";


const Member = () => {
  const params = useParams();
  const { _id } = params;
  const { data: user, isLoading, error } = useGetUserDetailsByIdQuery(_id!);
 
  useEffect(() => {
    window.scroll(0, 0);
  });

  const birthDate = new Date(user?.birthMonthDay).toDateString().split('', 10)
  const graduatedDate = new Date(user?.graduated).toDateString()
  const joinedDate = new Date(user?.joined).toDateString()

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
      ) : !user ? (
        <MessageBox variant="danger">User Not Found</MessageBox>
      ) : (
        <Row className="w-100 d-sm-flex flex-column flex-lg-row  justify-content-center align-items-center ">
          <Col>
            <img src={user.image} className="w-100  py-2 " alt="alt" />
          </Col>
          <Col style={{ backgroundColor: "rgb(245, 245, 220)" }}>
            <ListGroup>
              <Helmet>
                <title>{user.userName}</title>
              </Helmet>
              <div
                className="w-100"
                style={{ backgroundColor: "rgb(255, 222, 173)" }}
              >
                <ListGroup.Item
                  style={{ backgroundColor: "rgb(255, 222, 173)" }}
                >
                  Sur-Name:{" "}
                  <strong>
                    {user.surName[0].toUpperCase() +
                      user.surName.substring(1).toLowerCase()}
                  </strong>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ backgroundColor: "rgb(233, 220, 201)" }}
                >
                  First Name:{" "}
                  <strong>
                    {user.firstName[0].toUpperCase() +
                      user.firstName.substring(1).toLowerCase()}
                  </strong>
                </ListGroup.Item>
                {user.otherName ? (
                  <>
                    <ListGroup.Item
                      style={{ backgroundColor: "rgb(255, 222, 173)" }}
                    >
                      Other Name:{" "}
                      <strong>
                        {user.otherName}
                      </strong>
                    </ListGroup.Item>
                  </>
                ) : (
                  <></>
                )}
                <ListGroup.Item
                  style={{ backgroundColor: "rgb(233, 220, 201)" }}
                >
                  Nick-Name:{" "}
                  <strong>
                    {user.userName[0].toUpperCase() +
                      user.userName.substring(1).toLowerCase()}
                  </strong>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ backgroundColor: "rgb(255, 222, 173)" }}
                >
                  E-Mail: <strong>{user.email}</strong>
                </ListGroup.Item>{" "}
                <ListGroup.Item
                  style={{ backgroundColor: "rgb(233, 220, 201)" }}
                >
                  Phone: <strong>{user.phone}</strong>
                </ListGroup.Item>{" "}
                <ListGroup.Item
                  style={{ backgroundColor: "rgb(255, 222, 173)" }}
                >
                  Gender: <strong>{user.gender}</strong>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ backgroundColor: "rgb(233, 220, 201)" }}
                >
                  Birthday: <strong>{birthDate}</strong>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ backgroundColor: "rgb(255, 222, 173)" }}
                >
                  Voice: <strong>{user.voice}</strong>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ backgroundColor: "rgb(233, 220, 201)" }}
                >
                  Date Joined: <strong>{joinedDate}</strong>
                </ListGroup.Item>
              
                    <ListGroup.Item
                      style={{ backgroundColor: "rgb(255, 222, 173)" }}
                    >
                      Office Holding/Held:{" "}
                      <strong>
                        {user.post}
                      </strong>
                    </ListGroup.Item>
                 
                {user.level ? (
                  <>
                    <ListGroup.Item
                      style={{ backgroundColor: "rgb(255, 222, 173)" }}
                    >
                      Position: <strong>Student</strong>
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{ backgroundColor: "rgb(255, 222, 173)" }}
                    >
                      Level: <strong>{user.level}</strong>
                    </ListGroup.Item>
                  </>
                ) : user.graduated ? (
                  <>
                    <ListGroup.Item
                      style={{ backgroundColor: "rgb(233, 220, 201)" }}
                    >
                      Position: <strong>Alumni</strong>
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{ backgroundColor: "rgb(255, 222, 173)" }}
                    >
                      Date Graduated: <strong>{graduatedDate}</strong>
                    </ListGroup.Item>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Member;
