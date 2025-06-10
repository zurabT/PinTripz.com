import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import airfrance from "../photos/air-france-logo.png";
import lufthansa from "../photos/lufthansa.png";

import {
  faAngleRight,
  faBattery4,
  faPlugCircleBolt,
  faUtensils,
  faWifi,
  faforkknife,
} from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";

function Ticket2Way({
  price,
  airline,
  returnAirline,
  departure,
  arrival,
  stops,
  returnStops,
  stopsPlacesNames,
  returnStopsPlacesNames,
  durationHoure,
  durationMinute,
  returnDurationHoure,
  returnDurationMinute,
  link,
  returnDeparture,
  returnArrival,
}) {
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

  return (
    <div className="tickets">
      <div className="ticket-two">
        <div className="ticket-1">
          <div className="ticket-airline-info">
            <div className="ticket-airline-logo">
              <img src={airfrance} />
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
                {` ${durationHoure}h`}{" "}
                {durationMinute > 0 ? durationMinute : ""}
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
                  stops >= 1
                    ? "ticket-stops-city-red"
                    : "ticket-stops-city-green"
                }
              >
                <span>
                  {stops > 1
                    ? `${stops} stops`
                    : stops === 0
                    ? "Direct"
                    : `${stops} stop`}{" "}
                </span>{" "}
                {stops >= 1 ? "In" : ""} {stopsPlacesNames}
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
        <div className="tickets-divider"></div>
        <div className="ticket-2">
          <div className="ticket-airline-info">
            <div className="ticket-airline-logo">
              <img src={lufthansa} />
            </div>
            <div className="ticket-airline-name">
              <h1>{returnAirline}</h1>
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
              <div className="ticket-departure-date">{returnDeparture}</div>
              <div className="ticket-departure-airport">{arrives}</div>
            </div>

            <div className="ticket-stops">
              <p>
                {` ${returnDurationHoure}h`}{" "}
                {returnDurationMinute > 0 ? returnDurationMinute : ""}
              </p>
              <div className="ticket-stops-line">
                <div className="ticket-stops-dot-start"></div>

                {Array.from({ length: returnStops }, (_, i) => (
                  <div className="ticket-stops-dot-stop"></div>
                ))}

                <div className="ticket-stops-dot-end"></div>
              </div>
              <p
                className={
                  returnStops >= 1
                    ? "ticket-stops-city-red"
                    : "ticket-stops-city-green"
                }
              >
                <span>
                  {returnStops > 1
                    ? `${returnStops} stops`
                    : returnStops === 0
                    ? "Direct"
                    : `${returnStops} stop`}{" "}
                </span>{" "}
                {returnStops >= 1 ? "In" : ""}{" "}
                {returnStopsPlacesNames.join(", ")}
              </p>
            </div>

            <div className="ticket-arrive">
              <div className="ticket-arrive-date">{returnArrival}</div>
              <div className="ticket-arrive-airport">{departures}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="ticket-price2">
        <p>
          <span>US$</span>
          {price}
        </p>
        <button onClick={handleClick}>
          Select <FontAwesomeIcon icon={faAngleRight} className="btn-icon" />
        </button>
      </div>
    </div>
  );
}

export default Ticket2Way;
