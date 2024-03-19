import { useContext, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import LoadingBox from "../Components/LoadingBox";
import { useUpdateProfileMutation } from "../hooks/userHooks";
import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import axios from "axios";
import { FaEye, FaRegEyeSlash } from "react-icons/fa6";

import imageCompression from "browser-image-compression";

export default function Profile() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState(userInfo?.firstName);
  const [surName, setSurName] = useState(userInfo?.surName);
  const [otherName, setOtherName] = useState(userInfo?.otherName);
  const [userName, setUserName] = useState(userInfo?.userName);
  const [slug, setSlug] = useState(userInfo?.slug);
  const [voice, setVoice] = useState(userInfo?.voice);
  const [gender, setGender] = useState(userInfo?.gender);
  const [joined, setJoined] = useState(userInfo?.joined);
  const [graduated, setGraduated] = useState(userInfo?.graduated);
  const [level, setLevel] = useState(userInfo?.level);
  const [position, setPosition] = useState(userInfo?.position);
  const [post, setPost] = useState(userInfo?.post);
  const [birthMonthDay, setBirthMonthDay] = useState(userInfo?.birthMonthDay);
  const [phone, setPhone] = useState(userInfo?.phone);
  const [email, setEmail] = useState(userInfo?.email);
  const [image, setImage] = useState<any | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutateAsync: updateProfile, isPending } = useUpdateProfileMutation();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfrimPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
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
      console.log("image", compressedFile);
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.set("file", image);

      await axios.post(
        "http://localhost:4000/api/users/upload",
        // "https://choir-mern-backend.vercel.app/api/users/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      const data = await updateProfile({
        firstName,
        surName,
        otherName,
        userName,
        slug,
        gender,
        voice,
        joined,
        image,
        graduated,
        level,
        position,
        post,
        birthMonthDay,
        email,
        phone,
        password,
      });
      console.log(data);
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User updated successfully");
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  return (
    <Container className="small-container overlay">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      <form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="surName">
          <Form.Label>Sur-Name</Form.Label>
          <Form.Control
            value={surName}
            onChange={(e) => setSurName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="otherName">
          <Form.Label>Other Names</Form.Label>
          <Form.Control
            value={otherName}
            onChange={(e) => setOtherName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Nick Name</Form.Label>
          <Form.Control
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="slug">
          <Form.Label>Briefly Describe Your Self</Form.Label>
          <Form.Control
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Select Gender</Form.Label>
          <select
            className="form-select"
            aria-label="size 3 select example"
            onChange={(e) => setGender(e.target.value)}
            input-focus-border-color="true"
            value={gender}
          >
            <option>Gender</option>
            <option id="male" value="Male">
              Male
            </option>
            <option id="female" value="Female">
              Female
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
        <Form.Group className="mb-3" controlId="voice">
          <Form.Label>Your voice</Form.Label>
          <select
            className="form-select"
            aria-label="size 3 select example"
            onChange={(e) => setVoice(e.target.value)}
            input-focus-border-color="true"
            value={voice}
          >
            <option>Please select your voice</option>
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
            value={joined}
            onChange={(e) => setJoined(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="position">
          <Form.Label>
            {position === "Student" ? "Level" : "Date Graduated"}
          </Form.Label>
          <Form.Control
            value={position === "Alumni" ? graduated : level}
            onChange={(e) => setPosition(e.target.value)}
          />
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
          <></>
        )}
        <Form.Group className="mb-3" controlId="post">
          <Form.Label>Office holding/held</Form.Label>
          <select
            className="form-select"
            aria-label="size 3 select example"
            onChange={(e) => setPost(e.target.value)}
            input-focus-border-color="true"
            value={post}
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
        <Form.Group className="mb-3" controlId="birthMonthDay">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={birthMonthDay}
            onChange={(e) => setBirthMonthDay(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            Update
          </Button>
          {isPending && <LoadingBox />}
        </div>
      </form>
    </Container>
  );
}
