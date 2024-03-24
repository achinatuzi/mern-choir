import { Button, Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import { getError } from "../utils";
import { useGetContactHistoryQuery } from "../hooks/contactHooks";
import { ApiError } from "../types/ApiError";
import { useEffect } from "react";

export const ContactHistory = () => {
  const { data: contacts, isLoading, error } = useGetContactHistoryQuery();

  useEffect(() => {
    window.scroll(0, 0);
  });
  return (
    <div
      style={{
        backgroundColor: "rgba(220, 220, 220, 0.9)",
      }}
    >
      <Helmet>
        <title>Contacts History</title>
      </Helmet>

      <h1>Contacts History</h1>

      {isLoading ? (
        <div className="d-flex w-100 justify-content-center align-items-center mt-5 pt-5">
          <LoadingBox />
        </div>
      ) : error ? (
        <MessageBox variant="danger">
          {getError(error as unknown as ApiError)}
        </MessageBox>
      ) : (
        <Row className="d-flex flex-column w-100">
          <Col className="w-100">
            {contacts?.map((contact) => (
              <>
                <hr></hr>
                <div className="d-lg-flex px-4 ">
                  <div className="w-100">
                    <p>
                      <strong>ID: </strong>
                      {contact?._id}
                    </p>
                    <p>
                      <strong>NAME: </strong>
                      {contact?.fullname}
                    </p>
                    <p>
                      <strong>E-MAIL: </strong>
                      {contact?.email}
                    </p>
                    <p>
                      <strong>REQUEST: </strong>
                      {contact?.text}
                    </p>
                    <p>
                      <strong>DATE: </strong>
                      {contact.createdAt.substring(0, 10)}
                    </p>
                    <p>
                      <strong>RESPONDED: </strong>
                      {contact.isResponded
                        ? contact.deliveredAt.substring(0, 10)
                        : "No"}
                    </p>
                    <Button type="button" variant="light" onClick={() => {}}>
                      Respond
                    </Button>
                  </div>
                </div>
              </>
            ))}
            <hr></hr>
          </Col>
        </Row>
      )}
    </div>
  );
};
