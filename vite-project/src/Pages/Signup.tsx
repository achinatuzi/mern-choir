import { FormEvent, useContext, useEffect, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../hooks/userHooks";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Helmet } from "react-helmet-async";

import imageCompression from "browser-image-compression";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import LoadingBox from "../Components/LoadingBox";

const Signup = () => {
  const GVCsecret = "gvc";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSecretCode, setShowSecretCode] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [userName, setUserName] = useState("");
  const [slug, setSlug] = useState("");
  const [voice, setVoice] = useState("");
  const [gender, setGender] = useState("");
  const [joined, setJoined] = useState("");
  const [graduated, setGraduated] = useState("");
  const [level, setLevel] = useState("");
  const [position, setPosition] = useState("");
  const [post, setPost] = useState("");
  const [birthMonthDay, setBirthMonthDay] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState<any | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const { mutateAsync: signup, isPending } = useSignupMutation();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfrimPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleShowSecretCode = () => {
    setShowSecretCode(!showSecretCode);
  };

  useEffect(() => {
    window.scroll(0, 0);
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      if (compressedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = (event: any) => {
          setImage(event.target.result);
        };
      }
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.set("file", image);

     await axios.post(
       //  "http://localhost:4000/api/users/upload",
       "https://mern-choir.vercel.app/api/users/upload",
       formData,
       {
         headers: { "Content-Type": "multipart/form-data" },
       }
     );
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!secretCode) {
      toast.error("Please Enter GVC Secret Code");
      return;
    }
    if (secretCode !== GVCsecret) {
      toast.error("Invalid secret code, contact GVC president for access code");
      return;
    }
    if (!firstName) {
      toast.error("Please Enter Your First Name");

      return;
    }
    if (firstName.length <= 2) {
      toast.error("First Name should be more than 3 characters");
      return;
    }
    if (firstName.length >= 30) {
      toast.error("First Name cannot exceed 30 characters");
      return;
    }
    if (!surName) {
      toast.error("Please Enter Your Sur-Name");
      return;
    }
    if (surName.length <= 2) {
      toast.error("Sur-Name should be more than 3 characters");
      return;
    }
    if (surName.length >= 30) {
      toast.error("Sur-Name cannot exceed 30 characters");
      return;
    }
    if (!userName) {
      toast.error("Please Enter Your Nick-Name");
      return;
    }
    if (userName.length <= 2) {
      toast.error("Nick-Name should be more than 3 characters");
      return;
    }
    if (userName.length >= 30) {
      toast.error("Nick-Name cannot exceed 30 characters");
      return;
    }
    if (!birthMonthDay) {
      toast.error("Please, Select Your Date of Birth");
      return;
    }
    if (!gender) {
      toast.error("Please Select Your Gender");
      return;
    }
    if (!email) {
      toast.error("Please Enter Your Valid E-mail Address");
      return;
    }
    if (!phone) {
      toast.error("Please Enter Your Valid Mobile Number");
      return;
    }
    if (!voice) {
      toast.error("Please Select Your Voice");
      return;
    }
    if (!joined) {
      toast.error("Please Select Date Joined");
      return;
    }
    if (!position) {
      toast.error("Please, Select Your Status In The Choir(Alumni/Student)");
      return;
    }
    if (!slug) {
      toast.error("Please, Briefly Describe Your Self");
      return;
    }
    if (!password) {
      toast.error("Please, Enter Your Password");
      return;
    }
    if (!confirmPassword) {
      toast.error("Please, Confirm Your Password");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const data = await signup({
        firstName,
        surName,
        otherName,
        userName,
        slug,
        gender,
        image,
        voice,
        joined,
        graduated,
        level,
        position,
        post,
        birthMonthDay,
        email,
        phone,
        password,
      });
      dispatch({ type: "USER_SIGNIN", payload: data });
      toast.success("Registration successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

  return (
    <Container className="small-container overlay">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="secretCode">
          <Form.Label>Secret code</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type={showSecretCode ? "text" : "password"}
              placeholder="Secret code"
              aria-describedby="addon-wrapping"
              onChange={(e) => setSecretCode(e.target.value)}
            />
            <Button
              variant="outline-primary"
              id="button3"
              onClick={handleShowSecretCode}
            >
              {showSecretCode ? <FaEye /> : <FaRegEyeSlash />}
            </Button>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="surName">
          <Form.Label>Surname</Form.Label>
          <Form.Control onChange={(e) => setSurName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="otherName">
          <Form.Label>Other name</Form.Label>
          <Form.Control onChange={(e) => setOtherName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>A.K.A (Nick name)</Form.Label>
          <Form.Control onChange={(e) => setUserName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="birthMonthDay">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setBirthMonthDay(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender</Form.Label>
          <select
            className="form-select"
            aria-label="size 3 select example"
            onChange={(e) => setGender(e.target.value)}
            input-focus-border-color="true"
          >
            <option defaultValue="">Select Gender</option>
            <option id="male" value="Male">
              Male
            </option>
            <option id="female" value="Female">
              Female
            </option>
          </select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="voice">
          <Form.Label>Your voice</Form.Label>
          <select
            className="form-select"
            aria-label="size 3 select example"
            onChange={(e) => setVoice(e.target.value)}
            input-focus-border-color="true"
          >
            <option defaultValue="">Please select your voice</option>
            <option id="soprano" value="Soprano">
              Soprano
            </option>
            <option id="auto" value="Auto">
              Auto
            </option>
            <option id="tenor" value="Tenor">
              Tenor
            </option>
            <option id="bass" value="Bass">
              Bass
            </option>
          </select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="joined">
          <Form.Label>Date Joined</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setJoined(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="post">
          <Form.Label>Office holding/held</Form.Label>
          <select
            className="form-select"
            aria-label="size 3 select example"
            onChange={(e) => setPost(e.target.value)}
            input-focus-border-color="true"
          >
            <option defaultValue="">Please, Select Office</option>
            <option id="choirMaster" value="Choir Master">
              Choir Master
            </option>
            <option id="president" value="President">
              President
            </option>
            <option id="vicePresident" value="Vice President">
              Vice President
            </option>
            <option id="secGen" value="General Secretary">
              General Secretary
            </option>
            <option id="finSec" value="Financial Secretary">
              Financial Secretary
            </option>
            <option id="treasury" value="Treasury">
              Treasury
            </option>
            <option id="welfare" value="Welfare Officer">
              Welfare
            </option>
            <option id="pro" value="Public Relation Officer">
              Public Relation
            </option>
            <option id="provost" value="Provost">
              Provost
            </option>
            <option id="none" value="None">
              None
            </option>
          </select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Upload Image</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Button
              variant="outline-primary"
              id="button6"
              onClick={handleUpload}
            >
              Upload
            </Button>
          </InputGroup>
        </Form.Group>
        <Form.Label>Choir Status </Form.Label> <br></br>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="Alumni"
            value="Alumni"
            checked={position === "Alumni"}
            onChange={(e) => setPosition(e.target.value)}
          />
          <label className="form-check-label">Alummni</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="Student"
            value="Student"
            checked={position === "Student"}
            onChange={(e) => setPosition(e.target.value)}
          />
          <label className="form-check-label">Student</label>
        </div>
        {position === "Alumni" ? (
          <Form.Group className="mb-3" controlId="graduated">
            <Form.Label>Date Graduated</Form.Label>
            <Form.Control
              onChange={(e) => setGraduated(e.target.value)}
              type="date"
            />
          </Form.Group>
        ) : position === "Student" ? (
          <Form.Group className="mb-3" controlId="level">
            <Form.Label>Level</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setLevel(e.target.value)}
            />
          </Form.Group>
        ) : (
          <div></div>
        )}
        <br></br>
        <Form.Group className="mb-3" controlId="slug">
          <Form.Label>Briefly Describe Your Self</Form.Label>
          <Form.Control
            onChange={(e) => setSlug(e.target.value)}
            placeholder="briefly describe yourself"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="outline-primary"
              id="button1"
              onClick={handleShowPassword}
            >
              {showPassword ? <FaEye /> : <FaRegEyeSlash />}
            </Button>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              variant="outline-primary"
              id="button2"
              onClick={handleShowConfrimPassword}
            >
              {showConfirmPassword ? <FaEye /> : <FaRegEyeSlash />}
            </Button>
          </InputGroup>
        </Form.Group>
        <div className="mb-3">
          <Button disabled={isPending} type="submit">
            Sign Up
          </Button>
          {isPending && <LoadingBox />}
        </div>
        <div className="mb-3">
          Already have an account?{" "}
          <Link
            to={`/signin?redirect=${redirect}`}
            className="text-decoration-none"
          >
            Sign In
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default Signup;
