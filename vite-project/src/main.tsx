import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StoreProvider } from "./Store";

import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Events from "./Pages/Events";
import Members from "./Pages/Members";
import Profile from "./Pages/Profile";
import Member from "./Pages/Member";
import Performers from "./Pages/Performers";
import ContactUs from "./Pages/ContactUs";
import SupportUs from "./Pages/SupportUs";
import UpdateEvent from "./Pages/UpdateEvent";
import UploadEvent from "./Pages/UploadEvent";
import { ContactHistory } from "./Pages/ContactHistory";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/signin" element={<Signin />} />
      <Route path="/events" element={<Events />} />
      <Route path="/performers" element={<Performers />} />
      <Route path="/members" element={<Members />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="member/:_id" element={<Member />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="support" element={<SupportUs />} />
      <Route path="uploadEvent" element={<UploadEvent />} />
      <Route path="/updateEvent/:_id" element={<UpdateEvent />} />
      <Route path="/contactHistory" element={<ContactHistory />} />
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
