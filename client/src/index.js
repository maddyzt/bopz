import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import About from "./components/About";
import LoginPage from "./components/LoginPage";
import RequireAuth from "./components/RequireAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="profile/:id"
        element={
          <RequireAuth>
            {" "}
            <Profile />{" "}
          </RequireAuth>
        }
      />
      <Route
        path="about"
        element={
          // <RequireAuth>
 
            <About />
          // </RequireAuth>
        }
      />
      <Route path="loginpage" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
