import { ToastContainer } from "react-toastify";
import { Button, Container, ListGroup } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { Store } from "./Store";
import { useContext, useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {

  const {
    state: { mode, userInfo },
  } = useContext(Store);

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    useEffect(() => {
      window.scroll(0, 0);
    });

  return (
    <div className="overlays">
      <ToastContainer
        position="top-right"
        limit={1}
        autoClose={4000}
        theme="light"
        hideProgressBar={true}
        closeOnClick
        draggable
      />
      <div className="d-flex sticky-top z-3 ">
        <Header />
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
          <ListGroup.Item action className="side-navbar-user">
            <Link
              to={userInfo ? `/profile` : `/signin`}
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <span>
                {userInfo ? `Hello, ${userInfo.firstName}` : `Hello, sign in`}
              </span>
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-flex justify-content-between align-items-center">
              <strong>Categories</strong>
              <Button
                variant={mode}
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fa fa-times" />
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
