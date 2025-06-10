import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function About() {
  const [isActiveAboutUs, setIsActiveAboutUs] = useState(false);
  const [isActiveChoose, setIsActiveChoose] = useState(false);

  return (
    <div className="about">
      <div className="about-us">
        <h1 onClick={() => setIsActiveAboutUs(!isActiveAboutUs)}>
          About Us
          <FontAwesomeIcon
            className={
              isActiveAboutUs ? "about-us-icon" : "about-us-icon-rotate"
            }
            icon={faCaretUp}
            style={{ color: "#a7a8a9" }}
          />
        </h1>

        <p
          className={
            isActiveAboutUs === true ? "about-us-text-active" : "about-us-text"
          }
        >
          At [Your Company Name], we make flight searching simple, fast, and
          stress-free. Our platform is designed to help travelers find the best
          flight deals, compare airlines, and book tickets with confidence. With
          access to a vast network of airlines and travel agencies, we ensure
          you get real-time prices, flexible options, and transparent booking
          experiences. Whether you're planning a quick getaway, a business trip,
          or a long vacation, our smart search technology helps you find the
          perfect flight at the lowest price.
        </p>
      </div>
      <div className="why-choose">
        <h1 onClick={() => setIsActiveChoose(!isActiveChoose)}>
          Why Choose Us?
          <FontAwesomeIcon
            className={isActiveChoose ? "choose-icon" : "choose-icon-rotate"}
            icon={faCaretUp}
            style={{ color: "#a7a8a9" }}
          />
        </h1>
        <ul
          className={
            isActiveChoose === true ? "about_list-active" : "about_list"
          }
        >
          <li className="about_list-item">
            Best Deals-
            <span>
              We compare hundreds of airlines and travel agencies to get you the
              best fares.
            </span>
          </li>

          <li className="about_list-item">
            Fast & Easy Search –
            <span>
              Our intuitive interface lets you find flights in seconds.
            </span>
          </li>
          <li className="about_list-item">
            Flexible Options-
            <span>
              Need a one-way, round-trip, or multi-city flight? We've got you
              covered.
            </span>
          </li>
          <li className="about_list-item">
            Real-Time Updates-
            <span>Get live price changes and availability alerts.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default About;
