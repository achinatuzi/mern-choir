import { Button, Dropdown, ListGroup, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import { useContext, useState } from "react";
import gvc from "../assets/image/gvc.jpg";

const Header = () => {
  const {
    state: { mode, userInfo },
    dispatch,
  } = useContext(Store);

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/signin";
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  return (
    <header className="w-100">
      <Navbar
        className="d-flex flex-column align-items-stretch"
        bg="dark"
        variant="dark"
      >
        <Link to="/">
          <img
            style={{ width: "100px", height: "100%" }}
            src={gvc}
            alt="GVC SAPCC"
            className="image my-2 position-absolute bg-dark rounded-circle"
          />
        </Link>

        <div className="d-flex w-100 justify-content-between align-items-center">
          <Navbar.Collapse>
            <Nav className="w-100 justify-content-end">
              <Link
                to="#"
                className="nav-link header-link"
                onClick={switchModeHandler}
              >
                <i
                  className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}
                ></i>{" "}
                {mode === "light" ? "Light" : "Dark"}
              </Link>

              {userInfo ? (
                <NavDropdown
                  className="header-link"
                  title={`Hello, ${userInfo.firstName}`}
                  menuVariant="dark"
                  autoClose="outside"
                >
                  <Dropdown.Toggle className="dropdown-item bg-transparent">
                    <Link
                      to="/profile"
                      className="text-decoration-none text-white "
                    >
                      User Profile
                    </Link>
                  </Dropdown.Toggle>

                  <NavDropdown.Divider />
                  <Dropdown.Toggle className="dropdown-item bg-transparent  ">
                    <Link
                      className="text-decoration-none text-white"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      {" "}
                      Sign Out{" "}
                    </Link>
                  </Dropdown.Toggle>
                </NavDropdown>
              ) : (
                <div className="d-flex pt-2 ">
                  <Link
                    to="/signin"
                    className="header-link text-decoration-none"
                  >
                    Hello, Sign in
                  </Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
        <div className="sub-header justify-content-center align-items-center ">
          <div className="d-flex">
            <Link
              to="#"
              className="nav-link header-link p-1 d-lg-none"
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <i className="fas fa-bars"></i> All
            </Link>
            <Link to={"/"} className="nav-link header-link p-1 px-3">
              HOME
            </Link>
          </div>
          <div className=" d-none d-lg-flex">
            <Link
              to="/events"
              className="nav-link header-link p-1 px-2 text-decoration-none"
            >
              EVENTS
            </Link>
            <Link
              to="/performers"
              className="nav-link header-link p-1 px-2 text-decoration-none"
            >
              PERFORMERS
            </Link>
            <Link
              to="/support"
              className="nav-link header-link p-1 px-2 text-decoration-none"
            >
              SUPPORT US
            </Link>
            <Link
              to="/contact"
              className="nav-link header-link p-1 px-2 text-decoration-none"
            >
              CONTACT US
            </Link>

            <Link
              to="/members"
              className="nav-link header-link p-1 px-2 text-decoration-none"
            >
              MEMBERS
            </Link>
            {userInfo?.isAdmin &&(
              <Link
                to="/uploadEvent"
                className="nav-link header-link p-1 px-2 text-decoration-none"
              >
                UPLOAD EVENT
              </Link>
            )}
          </div>
        </div>
        {sidebarIsOpen && (
          <div
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            className="side-navbar-backdrop"
          ></div>
        )}
        <div
          className={
            sidebarIsOpen
              ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
              : "side-navbar d-flex justify-content-between flex-wrap flex-column"
          }
        >
          <ListGroup variant="flush">
            <div className="d-flex justify-content-end bg-dark">
              <Button
                variant={mode}
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fa fa-times" />
              </Button>
            </div>
            <ListGroup.Item action className="side-navbar-user">
              <Link
                to="/events"
                className="nav-link sidebar-drop text-decoration-none"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                EVENTS
              </Link>
            </ListGroup.Item>
            <ListGroup.Item action className="side-navbar-user">
              <Link
                to="/performers"
                className="nav-link sidebar-drop text-decoration-none"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                PERFORMERS
              </Link>
            </ListGroup.Item>
            <ListGroup.Item action className="side-navbar-user">
              <Link
                to="/support"
                className="nav-link sidebar-drop text-decoration-none"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                SUPPORT US
              </Link>
            </ListGroup.Item>
            <ListGroup.Item action className="side-navbar-user">
              <Link
                to="/contact"
                className="nav-link sidebar-drop text-decoration-none"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                CONTACT US
              </Link>
            </ListGroup.Item>
            <ListGroup.Item
              action
              className="side-navbar-user"
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <Link
                to="/members"
                className="nav-link sidebar-drop text-decoration-none"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                MEMBERS
              </Link>
            </ListGroup.Item>
            {userInfo?.isAdmin && (
              <ListGroup.Item
                action
                className="side-navbar-user"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <Link
                  to="/uploadEvent"
                  className="nav-link sidebar-drop text-decoration-none"
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                >
                  UPLOAD EVENT
                </Link>
              </ListGroup.Item>
            )}
          </ListGroup>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
