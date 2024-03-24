import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import { getError } from "../utils";
import { useGetContactHistoryQuery } from "../hooks/contactHooks";
import { ApiError } from "../types/ApiError";
import { useEffect } from "react";

export const ContactHistory = () => {
  const navigate = useNavigate();
  const { data: contacts, isLoading, error } = useGetContactHistoryQuery();

  useEffect(() => {
window.scroll(0, 0)
  })
  return (
    <div
      style={{
        textAlign: "center",
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
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>NAME</th>
              <th>E-MAIL</th>
              <th>RESPONDED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {contacts?.map((contact) => (
              <tr key={contact._id}>
                <td>{contact._id}</td>
                <td>{contact.createdAt.substring(0, 10)}</td>
                <td>{contact.fullname}</td>
                <td>{contact.email}</td>
                <td>
                  {contact.isResponded
                    ? contact.deliveredAt.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/contacts/${contact._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
