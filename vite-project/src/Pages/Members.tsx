import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../hooks/userHooks";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Helmet } from "react-helmet-async";

const Members = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  useEffect(() => {
    window.scroll(0, 0);
  });

  return isLoading ? (
    <div className="d-flex w-100 justify-content-center align-items-center mt-5 pt-5">
      <LoadingBox />
    </div>
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : (
    <Row style={{ backgroundColor: "rgba(220, 220, 220, 0.5)" }}>
      <Helmet>
        <title>Members</title>
      </Helmet>
      {users?.map((user, _id) => (
        <Col key={user._id} sm={6} md={4} lg={3}>
          <Card
            className="align-items-center w-100"
            style={{
              width: "290px",
              height: "460px",
              margin: "10px 0px 5px",
              backgroundColor: "rgb(220,220,222)",
            }}
          >
            <Link to={`/member/${user._id}`}>
              <img
                src={user?.image}
                style={{ width: "290px", height: "360px" }}
                className="card-img-6op w-100"
                alt={user?.firstName}
              />
            </Link>
            <Card.Body>
              <Link
                to={`/member/${user._id}`}
                className="text-decoration-none text-center text-dark "
              >
                <Card.Title>
                  {user.surName}
                  {""} {user.firstName} {""}
                  {user.otherName} {""}
                  {`(${user.voice})`}
                </Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Members;
