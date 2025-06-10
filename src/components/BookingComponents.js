import {
  faAngleUp,
  faPlaneArrival,
  faPlaneDeparture,
  faPlaneUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CalendarComponent from "./DateRangePicker";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePassengerBar, setArrive, setDeparture } from "./CounterSlice";
import { togglePassengerBar } from "./CounterSlice";
import Passengers from "./Passengers";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const Hotel = ({ id }) => {
  const departure = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id)?.departure
  );
  const dispatch = useDispatch();
  const handleSetDeparture = (e) => {
    dispatch(setDeparture({ id, departure: e.target.value }));
  };
  return (
    <div className="searchbar__from">
      <FontAwesomeIcon
        className="searchbar__from-icon"
        icon={faPlaneDeparture}
      />
      <p>From</p>
      <input value={departure || ""} onChange={handleSetDeparture} />
      <h3>JFK - John F. Kennedy International...</h3>
    </div>
  );
};
export const From = ({ id, filteredData, setSearchedAirport }) => {
  const searchedAirport = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id)?.departure || ""
  );

  const comp = useSelector((state) => state.passenger.components);

  // const searchedAirport = comp.map((comp) => comp.departure);

  const dispatch = useDispatch();

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [airportName, setAirportName] = useState("Airport name...");
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsInputFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="searchbar__from">
      <FontAwesomeIcon
        className="searchbar__from-icon"
        icon={faPlaneDeparture}
      />
      <p>From</p>
      <input
        className="searchbar__from-input"
        type="text"
        value={searchedAirport}
        onChange={(e) =>
          dispatch(setDeparture({ id, departure: String(e.target.value) }))
        }
        onFocus={() => setIsInputFocused(true)}
        // onBlur={() => setIsInputFocused(false)}
      />

      <h3>{searchedAirport === "" ? "Airport name..." : airportName}</h3>
      {isInputFocused && (
        <ul className="searchbar_from-airportlist">
          {filteredData.map((item) => (
            <li
              onClick={() => {
                dispatch(
                  setDeparture({ id, departure: String(item.iata_code) })
                );
                // setSearchedAirport(item.iata_code);
                setAirportName(item.name);
                setIsInputFocused(false);
              }}
              className="airport-name"
              key={item.iata_code}
            >
              <FontAwesomeIcon
                icon={faPlaneUp}
                size="lg"
                style={{ color: "lightslategray" }}
                className="from-airportlist-icon"
              />{" "}
              {item.iata_code} {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const To = ({
  id,
  filteredData,

  setSearchedAirportTo,
}) => {
  const searchedAirportTo = useSelector(
    (state) =>
      state.passenger.components.find((comp) => id === id)?.arrive || ""
  );
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [airportName, setAirportName] = useState("Airport name...");

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsInputFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const arrive = useSelector(
    (state) => state.passenger.components.find((comp) => comp.id === id)?.arrive
  );
  const dispatch = useDispatch();
  const handleSetArrive = (e) => {
    dispatch(setArrive({ id, arrive: e.target.value }));
  };

  return (
    <div ref={containerRef} className="searchbar__to">
      <FontAwesomeIcon className="searchbar__to-icon" icon={faPlaneArrival} />
      <p>To</p>
      <input
        onChange={(e) =>
          dispatch(setArrive({ id, arrive: String(e.target.value) }))
        }
        onFocus={() => setIsInputFocused(true)}
        value={searchedAirportTo}
      />
      <h3 key={id}>
        {searchedAirportTo === "" ? "Airport name..." : airportName}
      </h3>
      {isInputFocused && (
        <ul className="searchbar_from-airportlist">
          {filteredData.map((item) => (
            <li
              onClick={() => {
                dispatch(setArrive({ id, arrive: String(item.iata_code) }));

                setAirportName(item.name);
                setIsInputFocused(false);
              }}
              className="airport-name"
              key={item.iata_code}
            >
              <FontAwesomeIcon
                icon={faPlaneUp}
                size="lg"
                style={{ color: "lightslategray" }}
                className="from-airportlist-icon"
              />{" "}
              {item.iata_code} {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const DatePicker = ({ id }) => {
  const [exportDateStart, setExportDateStart] = useState(null);
  const [exportDateEnd, setExportDateEnd] = useState(null);
  const startDate = exportDateStart;
  const EndDate = exportDateEnd;
  const oneWay = useSelector((state) => state.passenger.oneWay);
  const date = useSelector(
    (state) => state.passenger.components.find((comp) => comp.id === id)?.date
  );
  const dateRange = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id)?.dateRange
  );
  useEffect(() => {
    if (oneWay) {
      // If it's one-way, set the start date
      if (date) {
        setExportDateStart(new Date(date));
      }
    } else {
      // If it's not one-way, set both start and end dates
      if (dateRange && dateRange.length === 2) {
        setExportDateStart(new Date(dateRange[0]));
        setExportDateEnd(new Date(dateRange[1]));
      }
    }
  }, [date, dateRange, oneWay]);

  const formatDayOfWeek = (date) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return date ? daysOfWeek[date.getDay()] : null;
  };
  return (
    <div className="searchbar__date">
      <div className="searchbar__start">
        <div className="searchbar__datepicker">
          <CalendarComponent id={id} />
        </div>
        <div className="searchbar-weekdays">
          {(date || dateRange) && <h3>{formatDayOfWeek(exportDateStart)}</h3>}
          {!oneWay && dateRange && <h3>{formatDayOfWeek(exportDateEnd)}</h3>}
        </div>
      </div>

      <div
        className={oneWay === true ? "searchbar__end-none" : "searchbar__end"}
      >
        {/* <div className="searchbar__datepicker"></div> */}
        {/* <h3>{formatDayOfWeek(exportDateEnd)}</h3> */}
      </div>
    </div>
  );
};

export const PassComponent = ({ id }) => {
  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(closePassengerBar({ id: id }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch, id]);

  const passenger = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id).passengerBar
  );
  const passBarClickOutside = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id)
        .passBarClickOutside
  );
  const adultNum = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id).adultNum
  );
  const childNum = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id).childNum
  );
  const infantNum = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id).infantNum
  );
  const cabinClassBusiness = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id).cabinClass
  );

  const passengersNum = adultNum + childNum + infantNum;

  return (
    <div className="searchbar__passenger" ref={ref}>
      <p className="searchbar__passenger-title">Passenger, class</p>
      <h1
        className="searchbar__passenger-name"
        onClick={() => {
          dispatch(togglePassengerBar({ id: id }));
        }}
      >
        <span>{passengersNum}</span>
        <p>{passengersNum <= 1 ? ` Passenger` : ` Passengers`}</p>
      </h1>
      <FontAwesomeIcon
        onClick={() => {
          dispatch(togglePassengerBar({ id: id }));
        }}
        className={
          passenger && passBarClickOutside
            ? "passenger__icon-active"
            : "passenger__icon"
        }
        icon={faAngleUp}
      />
      <h2 className="searchbar__passenger-classname">{cabinClassBusiness}</h2>

      <Passengers id={id} />
    </div>
  );
};
