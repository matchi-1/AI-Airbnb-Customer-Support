import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/header.css";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navbar bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link to="#">
          <img
            className="site-logo"
            src="/assets/images/logo.png"
            alt="Website Logo"
          />
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
          <i className="bi bi-person-circle account-icon"></i>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              <img
                className="site-logo"
                src="/assets/images/logo.png"
                alt="Website Logo"
              />
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
              {currentPath !== "/" && (
                <li className="nav-item">
                  <Link to="/" className="nav-link" aria-current="page">
                    Login
                  </Link>
                </li>
              )}
              {currentPath !== "/signup" && (
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Signup
                  </Link>
                </li>
              )}
              {currentPath !== "/chat" && (
                <li className="nav-item">
                  <Link to="/chat" className="nav-link">
                    Chat
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
