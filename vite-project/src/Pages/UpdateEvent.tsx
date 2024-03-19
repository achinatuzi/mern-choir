import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import {
  useGetEventDetailsByIdQuery,
  useUpdateEventMutation,
} from "../hooks/eventHooks";
import LoadingBox from "../Components/LoadingBox";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateEvent = () => {
  const params = useParams();
  const { _id } = params;
  const { data: event } = useGetEventDetailsByIdQuery(_id!);

  const navigate = useNavigate();

  const { mutateAsync: updateEvent, isPending } = useUpdateEventMutation(_id!);

  const [theme, setTheme] = useState(event?.theme);
  const [venue, setVenue] = useState(event?.venue);
  const [date, setDate] = useState(event?.date);
  const [time, setTime] = useState(event?.time);
  const [description, setDescription] = useState(event?.description);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await updateEvent({
        theme,
        venue,
        date,
        time,
        description,
      });
      toast.success("Event updated successfully");
      navigate("/events");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="small-container overlay">
      <Helmet>
        <title>Update Events</title>
      </Helmet>
      <h1 className="my-3">UPDATE</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="theme">
          <Form.Label>Event Theme</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setTheme(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="venue">
          <Form.Label>Event Venue</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setVenue(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Describe Event</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Event Date</Form.Label>
          <Form.Control type="date" onChange={(e) => setDate(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="time">
          <Form.Label>Event Time</Form.Label>
          <Form.Control type="text" onChange={(e) => setTime(e.target.value)} />
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

export default UpdateEvent;
