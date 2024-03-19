import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSigninMutation } from "../hooks/userHooks";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import LoadingBox from "../Components/LoadingBox";
import { Helmet } from "react-helmet-async";

const Signin = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { mutateAsync: signin, isPending } = useSigninMutation();

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!userName) {
      toast.error("Please Enter Your Nick-Name");
      return;
    }
    if (!email) {
      toast.error("Please Enter Your Valid E-mail Address");
      return;
    }
    if (!password) {
      toast.error("Please Enter Password");
      return;
    }
    try {
      const data = await signin({
        userName,
        email,
        password,
      });
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container overlay">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>A.K.A (Nick name)</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={isPending} type="submit">
            Sign In
          </Button>
          {isPending && <LoadingBox />}
        </div>
        <div className="mb-3">
          New Member?{" "}
          <Link
            to={`/signup?redirect=${redirect}`}
            className="text-decoration-none"
          >
            Create your account
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default Signin;
