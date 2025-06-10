import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../photos/logo.png";

function Navbar() {
  const [active, setActive] = useState("flights");

  return (
    <div className="navbar">
      <img className="navbar-logo" src={logo} alt="logo" />
      <ul className="navbar-items">
        <li className="navbar-item">
          <Link to="/">
            <a
              className={
                active === "flights" ? "navbar-link-active" : "navbar-link"
              }
              onClick={() => setActive("flights")}
              href="#"
            >
              Flights
            </a>
          </Link>
        </li>
        {/* <li className="navbar-item">
          <a className="navbar-link" href="#">
            Flights
          </a>
        </li> */}
        <li className="navbar-item">
          <Link to="/about">
            <a
              className={
                active === "about" ? "navbar-link-active" : "navbar-link"
              }
              onClick={() => setActive("about")}
              href="#"
            >
              About
            </a>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact">
            <a
              className={
                active === "contact" ? "navbar-link-active" : "navbar-link"
              }
              onClick={() => setActive("contact")}
              href="#"
            >
              Contact
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
