import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import airlinelogo from "../photos/air-france-logo.png";
import {
  faAngleRight,
  faBattery4,
  faPlugCircleBolt,
  faUtensils,
  faWifi,
  faforkknife,
} from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
// import { fetchFlightTickets } from "./components/FlightData";
import { Children, useState } from "react";
import { useSelector } from "react-redux";

function Ticket({
  price,
  airline,
  departure,
  arrival,
  stops,
  stopsPlacesNames,
  durationHoure,
  durationMinute,
  link,
}) {
  //   const [flights, setFlights] = useState([]);
  //   const handleFetchFlights = async () => {
  //     const data = await fetchFlightTickets();
  //     setFlights(data);
  //   };
  const comp = useSelector((state) => state.passenger.components);
  const adultNum = comp.map((comp) => comp.adultNum);
  const children = comp.map((comp) => comp.childNum);
  const infant = comp.map((comp) => comp.infantNum);
  const cabinClass = comp.map((comp) => comp.cabinClass);
  const departures = comp.map((comp) => comp.departure);
  const arrives = comp.map((comp) => comp.arrive);

  const fullLink = `https://skyscanner.com${link}`;
  const handleClick = () => {
    window.open(fullLink, "_blank");
  };
  console.log(fullLink);
  return (
    <div className="ticket-one">
      <div className="ticket">
        <div className="ticket-airline-info">
          <div className="ticket-airline-logo">
            <img src={airlinelogo} />
          </div>
          <div className="ticket-airline-name">
            <h1>{airline}</h1>
            <div className="ticket-airline-icons">
              <FontAwesomeIcon icon={faPlugCircleBolt} />
              <FontAwesomeIcon icon={faUtensils} />
              <FontAwesomeIcon icon={faWifi} />
              <FontAwesomeIcon icon={faYoutube} />
            </div>
          </div>
        </div>
        <div className="ticket-transfer-info">
          <div className="ticket-departure">
            <div className="ticket-departure-date">{departure}</div>
            <div className="ticket-departure-airport">{departures}</div>
          </div>

          <div className="ticket-stops">
            <p>
              {` ${durationHoure}h`} {durationMinute > 0 ? durationMinute : ""}
            </p>

            <div className="ticket-stops-line">
              <div className="ticket-stops-dot-start"></div>

              {Array.from({ length: stops }, (_, i) => (
                <div className="ticket-stops-dot-stop"></div>
              ))}

              <div className="ticket-stops-dot-end"></div>
            </div>
            {/* <p>{stops > 1 ? `${stops} stops` : `${stops} stop`} </p> */}
            <p
              className={
                stops >= 1 ? "ticket-stops-city-red" : "ticket-stops-city-green"
              }
            >
              <span>
                {stops > 1
                  ? `${stops} stops`
                  : stops === 0
                  ? "Direct"
                  : `${stops} stop`}{" "}
              </span>{" "}
              {stops >= 1 ? "In" : ""} {stopsPlacesNames.join(", ")}
            </p>
          </div>

          <div className="ticket-arrive">
            <div className="ticket-arrive-date">{arrival}</div>
            <div className="ticket-arrive-airport">{arrives}</div>
          </div>
        </div>
        {/* <div className="ticket-price">
          <p>
            <span>US$</span>1,650
          </p>
          <button>
            Select <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div> */}
      </div>
      <div className="ticket-price">
        <p>
          <span>US$</span>
          {price}
        </p>
        <button onClick={handleClick}>
          Select <FontAwesomeIcon className="btn-icon" icon={faAngleRight} />
        </button>
      </div>
      <ul className="pass-info">
        <li>{adultNum > 1 ? `${adultNum}: Adults` : `${adultNum}: Adult`}</li>
        {children > 0 ? (
          <li>
            {children > 1 ? `${children}: Children` : `${children}: Child`}
          </li>
        ) : (
          ""
        )}
        {infant > 0 ? (
          <li>{infant > 1 ? `${infant}: Infants` : `${infant}: Infant`}</li>
        ) : (
          ""
        )}
        <li>- {cabinClass}</li>
      </ul>
    </div>
  );
}

export default Ticket;
