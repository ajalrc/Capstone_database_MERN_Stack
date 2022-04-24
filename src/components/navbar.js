import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <img
            alt="Drake University"
            src="https://images.squarespace-cdn.com/content/v1/57961f422994cace5cc0e6a2/1599877840153-OSQYFX9GFVU4BI1IVQP0/Drake+University+Logo+copy.png"
          ></img>
        </NavLink>

        <div className="header">
          Department of Computer Science and Mathematics
        </div>

        <button
          className="navbar-toggler "
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-right">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/create">
                Capstone Record
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
