import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../Components/LoadingBox";
import { useUploadEventMutation } from "../hooks/eventHooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UploadEvent = () => {

  const navigate = useNavigate();

  const { mutateAsync: upload, isPending } = useUploadEventMutation();

  const [theme, setTheme] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
    try {
    await upload({
        theme,
        date,
        description,
        venue,
        time,
      });
      
      toast.success("Event uploaded successfully");
      navigate('/events');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="small-container overlay">
      <Helmet>
        <title>Upload Events</title>
      </Helmet>
      <h1 className="my-3">UPLOAD</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="theme">
          <Form.Label>Event Theme</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setTheme(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="venue">
          <Form.Label>Event Venue</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setVenue(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Describe Event</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Event Date</Form.Label>
          <Form.Control
            type="date"
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="time">
          <Form.Label>Event Time</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setTime(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={isPending} type="submit">
            Upload
          </Button>
          {isPending && <LoadingBox />}
        </div>
      </Form>
    </Container>
  );
};

export default UploadEvent;
