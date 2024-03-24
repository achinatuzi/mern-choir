import { FormEvent, useContext, useEffect, useState } from "react";
import Slider from "../Components/Slider";
import { IoCall } from "react-icons/io5";
import { ImLocation2 } from "react-icons/im";
import { FcAlarmClock } from "react-icons/fc";
import { Helmet } from "react-helmet-async";
import { Button, Form } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { useUploadEmailMutation } from "../hooks/userHooks";
import { toast } from "react-toastify";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import LoadingBox from "../Components/LoadingBox";
import { Store } from "../Store";

const ContactUs = () => {
   const { state } = useContext(Store);
   const { userInfo } = state;
      const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

     const { mutateAsync: mailUpload, isPending } = useUploadEmailMutation();

  const submitHandler = async (e: FormEvent) => {
  e.preventDefault();

     if (!fullname) {
       toast.error("Please Enter Your Full Name");
       return;
     }
     if (!email) {
       toast.error("Please Enter Your E-Mail Address");
       return;
     }
     if (!text) {
       toast.error("Please, Enter your reason for contacting us");
       return;
     }
    try {
      await mailUpload({
        fullname,
        email,
        text,
      })
      toast.success("Thanks for contacting us, we'll get back to you shortly");
      navigate("/");
    } catch (error) {
       toast.error(getError(error as ApiError));
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="home pt-2 m-0 w-100  ">
      <Helmet>Contact us</Helmet>
      <div className="home_image w-0  ">
        <Slider />{" "}
      </div>
      <div className="d-flex flex-lg-row flex-column-reverse w-100">
        <div className="d-flex flex-column w-100 bg-light justify-content-enter align-itms-center">
          <span style={{ margin: "30px 0px 0px 60px" }}>
            <h4>
              <IoCall style={{ color: "red" }} />
              <strong style={{ padding: "10px" }}>CALL US</strong>
            </h4>
            <p>09039354698, (+234) 916 960 0104</p>
          </span>
          <span style={{ margin: "30px 0px 0px 60px" }}>
            <h4>
              <strong style={{ padding: "10px" }}>
                <ImLocation2 style={{ color: "red" }} />
                LOCATION
              </strong>
            </h4>
            <p>
              Saint Anthony of Padua Catholic Community, Eziobodo Futo Road,
              Owerri-West Imo State, Nigeria
            </p>
          </span>
          <span style={{ margin: "30px 0px 0px 60px" }}>
            <h5>
              <strong style={{ padding: "10px" }}>
                {" "}
                <FcAlarmClock style={{ color: "red" }} />
                TIME FOR REHEARSALS
              </strong>
            </h5>
            <p>MON, WED and SAT - 4:00pm prompt</p>
          </span>
        </div>
        <div
          style={{ background: "rgba(216,216,216)" }}
          className="w-100 justify-content-center align-items-center d-flex  "
        >
          <Form onSubmit={submitHandler} className="w-75">
            <Form.Label style={{ textAlign: "center", display: "block" }}>
              {userInfo?.isAdmin && (
                <Button className="w-75 d-flex" variant="dark" type="button">
                  <Link
                    to="/contactHistory"
                    className="text-decoration-none text-dark text-white "
                  >
                    CONTACTS FOLDER &gt;&gt;&gt;&gt;&gt;&gt;&gt;
                  </Link>
                </Button>
              )}

              <h4 style={{ marginTop: "40px", textAlign: "center" }}>
                <strong>CONTACT US</strong>
              </h4>
            </Form.Label>
            <Form.Group className="mb-3" controlId="fullname">
              <Form.Control
                placeholder="Enter Your Name"
                type="text"
                size="lg"
                onChange={(e) => setFullname(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                placeholder="Enter Your Email"
                type="email"
                size="lg"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="text">
              <Form.Control
                as="textarea"
                rows={5}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
            <div className="mb-3 w-100 align-items-center justify-content-center d-flex ">
              <Button type="submit" disabled={isPending} className="w-75">
                Submit
              </Button>
              {isPending && <LoadingBox />}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
