import React from "react";
import "../css/header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link to={"#"}>
          <img src="/assets/images/logo.png" alt="Website Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              <img src="/assets/images/logo.png" alt="Website Logo" />
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link
                  to={"/login"}
                  className="nav-link active"
                  aria-current="page"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/signup"} className="nav-link" href="#">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/"} className="nav-link" href="#">
                  Chat
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
