import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faPlaneDeparture,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import Passengers from "./Passengers";

import { useDispatch, useSelector } from "react-redux";
import {
  oneWayTrue,
  oneWayFalse,
  removeComp,
  multicityFalse,
  multicityTrue,
  setHotelFalse,
  setHotelTrue,
  setFlights,
  setFlightsData,
  setDeparture,
  restart,
  setIsLoadingFalse,
  setIsLoadingTrue,
} from "./CounterSlice";
import { addComp } from "./CounterSlice";
import { DatePicker, From, PassComponent, To } from "./BookingComponents";
import Ticket from "./Ticket";
import { fetchFlightTickets } from "./FlightData";
import axios from "axios";
import supabase from "./supabaseClient";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
const cache = new Map();

function SearchBar({ jsonData }) {
  const comp = useSelector((state) => state.passenger.components);

  const searchedAirport = comp.map((comp) => comp.departure || "");
  const searchedAirportString = searchedAirport.join("");

  const searchedAirportTo = comp.map((comp) => comp.arrive || "");
  const searchedAirportToString = searchedAirportTo.join("");

  const [airportsData, setAirportsData] = useState([]);
  const [fetchedAll, setFetchedAll] = useState(false);

  const [filteredDataFrom, setFilteredDataFrom] = useState([]);
  const [filteredDataTo, setFilteredDataTo] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [isSearchDisabled2, setIsSearchDisabled2] = useState(true);
  const [isSearchDisabled3, setIsSearchDisabled3] = useState(true);

  const [showAlert, setShowAlert] = useState(false);
  const [showAlertArrive, setShowAlertArrive] = useState(false);
  const [showAlertDate, setShowAlertDate] = useState(false);
  const [limitedAirportsData, setLimitedAirportsData] = useState([]);
  // useEffect(() => {
  //   const isValid = comp.every((c) => c.departure && c.arrive && c.date);
  //   setIsSearchDisabled(!isValid);
  // }, [comp]);

  useEffect(() => {
    const isValid = comp.every((c) => c.departure);
    setIsSearchDisabled(!isValid);
    setShowAlert(false);
  }, [comp]);

  useEffect(() => {
    const isValid = comp.every((c) => c.arrive);
    setIsSearchDisabled2(!isValid);
    setShowAlertArrive(false);
  }, [comp]);
  useEffect(() => {
    const isValid = comp.every((c) => c.date);
    setIsSearchDisabled3(!isValid);
    setShowAlertDate(false);
  }, [comp]);

  const fetchLimitedAirports = async () => {
    // Supabase fetch limit
    // let offset = 0;
    // let allAirports = [];
    // let hasMore = true;

    try {
      const { data, error } = await supabase
        .from("airportsData")
        .select("name,iata_code")
        .neq("iata_code", null)
        .limit(10); // Fetch records in batches

      if (error) {
        console.error("Error fetching limited airports data:", error);
        return;
      }
      if (data) {
        setLimitedAirportsData(data);
      }

      // hasMore = false;
      // } else {
      //   // allAirports = [...allAirports, ...data];
      //   // hasMore = data.length === limit; // If less than limit, we've fetched all
      //   // offset += limit;
      // }

      // setAirportsData(allAirports);
      // console.log("Total records fetched:", allAirports.length);
    } catch (error) {
      console.error("Error fetching airports data:", error);
    } finally {
    }
  };
  useEffect(() => {
    fetchLimitedAirports();
  }, []);

  const fetchAllAirports = async (searchTerm) => {
    if (!searchTerm) return;

    if (cache.has(searchTerm)) {
      setAirportsData(cache.get(searchTerm));
      return;
    }
    setIsFetching(true);
    try {
      const { data, error } = await supabase
        .from("airportsData")
        .select("name,iata_code")
        .ilike("name", `%${searchTerm}%`)
        .neq("iata_code", null)
        .limit(20);

      if (error) throw error;

      setAirportsData(data);

      cache.set(searchTerm, data);
    } catch (error) {
      console.error("Error fetching airports:", error);
    } finally {
      setFetchedAll(true);
    }
  };

  // const fetchAllAirports = async () => {
  //   if (fetchedAll) return;
  //   // Supabase fetch limit
  //   let offset = 0;
  //   let allAirports = [];
  //   const limit = 1000;
  //   let hasMore = true;

  //   try {
  //     while (hasMore) {
  //       const { data, error } = await supabase
  //         .from("airportsData")
  //         .select("name,iata_code")
  //         .neq("iata_code", null)
  //         .range(offset, offset + limit - 1); // Fetch records in batches

  //       if (error) {
  //         console.error("Error fetching airports data:", error);
  //         hasMore = false;
  //       } else if (data && data.length > 0) {
  //         allAirports = [...allAirports, ...data];
  //         hasMore = data.length === limit; // If less than limit, we've fetched all
  //         offset += limit;
  //       } else {
  //         hasMore = false;
  //       }
  //     }

  //     setAirportsData(allAirports);
  //     setFetchedAll(true);
  //     // console.log("Total records fetched:", allAirports.length);
  //   } catch (error) {
  //     console.error("Error fetching airports data:", error);
  //   } finally {
  //   }
  // };
  const debouncedFetchAllAirports = useCallback(
    debounce((searchTerm) => fetchAllAirports(searchTerm), 200),
    [fetchAllAirports]
  );
  useEffect(() => {
    if (searchedAirportString.trim() !== "") {
      debouncedFetchAllAirports(searchedAirportString);
    }
  }, [searchedAirportString]);
  useEffect(() => {
    if (searchedAirportToString.trim() !== "") {
      debouncedFetchAllAirports(searchedAirportToString);
    }
  }, [searchedAirportToString]);

  // useEffect(() => {
  //   const searchedAirportString = searchedAirport.join("");

  //   if (searchedAirportString.trim() === "") {
  //     if (!fetchedAll) {
  //       fetchLimitedAirports();
  //     }
  //   } else if (!fetchedAll) {
  //     fetchAllAirports();
  //   }
  // }, [searchedAirport, fetchedAll]);

  // useEffect(() => {
  //   const searchedAirportToString = searchedAirportTo.join("");

  //   if (searchedAirportToString.trim() === "") {
  //     if (!fetchedAll) {
  //       fetchLimitedAirports();
  //     }
  //   } else if (!fetchedAll) {
  //     fetchAllAirports();
  //   }
  // }, [searchedAirportTo, fetchedAll]);

  useEffect(() => {
    if (searchedAirportString.trim() === "") {
      setFilteredDataFrom(limitedAirportsData);
    } else {
      setFilteredDataFrom(
        airportsData.filter((item) =>
          searchedAirport.some((departure) =>
            item.name.toLowerCase().includes(departure.toLowerCase())
          )
        )
      );
    }
  }, [airportsData, searchedAirportString, limitedAirportsData]);

  useEffect(() => {
    if (searchedAirportToString.trim() === "") {
      setFilteredDataTo(limitedAirportsData);
    } else {
      setFilteredDataTo(
        airportsData.filter((item) =>
          searchedAirportTo.some((arrive) =>
            item.name.toLowerCase().includes(arrive.toLowerCase())
          )
        )
      );
    }
  }, [airportsData, limitedAirportsData]);

  const flightsData = useSelector((state) => state.passenger.flightsData);

  // const handleFlightsSearch = async () => {
  //   if (!isFetching) return; // Prevent duplicate fetches
  //   setIsFetching(true);

  //   try {
  //     if (!comp || comp.length === 0) {
  //       console.error("No components available for search");
  //       return;
  //     }

  //     for (const component of comp) {
  //       const componentDate = component.date;
  //       const componentDateRange = component.dateRange;
  //       const adultNum = component.adultNum;
  //       const cabinClass = component.cabinClass;
  //       // const oneWay = component.oneWay;

  //       if (!componentDate && !componentDateRange) {
  //         console.error(
  //           `Date is missing for component with ID: ${component.id}`
  //         );
  //         continue;
  //       }

  //       const formattedDateOneWay = formatDateForAPI(componentDate);
  //       const formattedDateRound = formatDateForAPI(componentDateRange[0]);
  //       console.log("ok");
  //       console.log(formattedDateRound);
  //       const apiUrl = `https://api.flightapi.io/onewaytrip/67c3094178f4c2a8cd7f0c8f/${searchedAirportString}/${searchedAirportToString}/${
  //         oneWay ? formattedDateOneWay : formattedDateRound
  //       }/${adultNum}/0/0/${cabinClass}/USD`;

  //       try {
  //         const response = await axios.get(apiUrl);
  //         console.log(`Data for component ID ${component.id}:`, response.data);

  //         // Dispatch data to Redux or handle it as needed
  //         dispatch(setFlightsData(response.data));
  //       } catch (error) {
  //         console.error(
  //           `Error fetching flight data for component ID ${component.id}:`,
  //           error
  //         );
  //       }
  //     }
  //   } finally {
  //     setIsFetching(false);

  //     // Reset fetching state after all API calls
  //   }
  // };

  const handleFlightsSearch = async () => {
    if (!isFetching) return; // Prevent duplicate fetches
    setIsFetching(true);
    dispatch(setIsLoadingTrue());

    try {
      if (!comp || comp.length === 0) {
        console.error("No components available for search");
        return;
      }

      for (const component of comp) {
        const componentDate = component.date;
        const componentDateRange = component.dateRange || [];
        const adultNum = component.adultNum;
        const cabinClass = component.cabinClass;
        // const oneWay = component.oneWay;

        if (!componentDate && !componentDateRange) {
          console.error(
            `Date is missing for component with ID: ${component.id}`
          );
          continue;
        }

        const formattedDateOneWay = formatDateForAPI(componentDate);
        const formattedDateStart = formatDateForAPI(componentDateRange[0]);
        const formattedDateEnd = formatDateForAPI(componentDateRange[1]);
        console.log("ok");
        console.log(formattedDateStart, formattedDateEnd);
        const apiUrl = `https://api.flightapi.io/${
          oneWay ? "onewaytrip" : "roundtrip"
        }/6845c6da0891e629cface0b2/${searchedAirportString}/${searchedAirportToString}/${
          oneWay
            ? formattedDateOneWay
            : `${formattedDateStart}/${formattedDateEnd}`
        }/${adultNum}/0/0/${cabinClass}/USD`;

        try {
          const response = await axios.get(apiUrl);
          console.log(`Data for component ID ${component.id}:`, response.data);

          // Dispatch data to Redux or handle it as needed
          dispatch(setFlightsData(response.data));
        } catch (error) {
          console.error(
            `Error fetching flight data for component ID ${component.id}:`,
            error
          );
        }
      }
    } finally {
      setIsFetching(false);
      dispatch(setIsLoadingFalse());

      // Reset fetching state after all API calls
    }
  };

  const debouncedFlightsSearch = debounce(() => {
    handleFlightsSearch();
  }, 500); // Wait for 500ms before executing
  const flights = useSelector((state) => state.passenger.flights);

  const handleSearch = async () => {
    const data = await fetchFlightTickets();
    dispatch(setFlights(data));
  };

  const oneWay = useSelector((state) => state.passenger.oneWay);
  const multiCity = useSelector((state) => state.passenger.multiCity);
  const hotel = useSelector((state) => state.passenger.hotels);
  const dateRange = useSelector((state) => state.passenger.dateRange);
  const date = useSelector((state) => state.passenger.date || null);

  const dispatch = useDispatch();

  const addComps = () => {
    const newId = comp.length + 1;

    dispatch(addComp({ id: newId, name: `com-${newId}` }));
  };
  const formatDateForAPI = (date) => {
    const year = date?.getFullYear();
    const month = String(date?.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date?.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // const formattedDate = formatDateForAPI(date);

  const handleDate = () => {
    if (oneWay) {
      comp.forEach((component) => {
        const formattedDate = formatDateForAPI(component.date);
        console.log(formattedDate); // Ensure date exists in each component
      });
    } else {
      comp.forEach((component) => {
        const formattedDateStart = formatDateForAPI(component.dateRange[0]);
        const formattedDateEnd = formatDateForAPI(component.dateRange[1]);

        console.log("start: ", formattedDateStart, "end: ", formattedDateEnd); // Ensure date exists in each component
      });
    }
    console.log(searchedAirportString);
    console.log(searchedAirportToString);
  };
  // const removeComps = () => {
  //   if (comp.length > 1) {
  //     dispatch(removeComp(comp.id));
  //   }
  // };
  const [searchAttempted, setSearchAttempted] = useState(false);

  return (
    <div className="searchbar">
      <button
        onClick={() => {
          dispatch(oneWayTrue());
          dispatch(restart());
        }}
        className={oneWay ? "searchbar__oneway active" : "searchbar__oneway"}
      >
        One Way
      </button>
      <button
        onClick={() => {
          dispatch(oneWayFalse());
          dispatch(restart());
        }}
        className={
          oneWay === false
            ? "searchbar__roundtrip active"
            : "searchbar__roundtrip"
        }
      >
        Roundtrip
      </button>

      {/* <button
        onClick={() => dispatch(multicityTrue())}
        className={
          multiCity ? "searchbar__multicity active" : "searchbar__multicity"
        }
      >
        multiCity
      </button> */}

      <button onClick={() => dispatch(setHotelFalse())} className="flights-btn">
        {" "}
        <FontAwesomeIcon
          className="flights-btn-icon"
          icon={faPlaneDeparture}
        />{" "}
        Flights
      </button>
      {/* <button onClick={() => dispatch(setHotelTrue())} className="hotels-btn">
        <FontAwesomeIcon className="hotels-btn-icon" icon={faHotel} /> Hotels
      </button> */}
      {Array.isArray(comp) &&
        comp.map((comps, id) => (
          <div
            key={comps.id}
            name={comps.name}
            className="searchbar__container"
          >
            {!hotel && (
              <>
                <From
                  id={comps.id}
                  filteredData={filteredDataFrom}
                  setSearchedAirport={setDeparture}
                />
                {isSearchDisabled && showAlert && (
                  <div className="searchbar__from-alert">
                    <div className="alert-top"></div>
                    <p>Choose Departure</p>
                  </div>
                )}

                <div className="searchbar__mid-icon">
                  <FontAwesomeIcon className="repeat-icon" icon={faRepeat} />
                </div>
                <div></div>

                <To
                  id={comps.id}
                  filteredData={filteredDataTo}
                  // searchedAirportTo={searchedAirportTo}
                  // setSearchedAirportTo={setSearchedAirportTo}
                />
                {isSearchDisabled2 && showAlertArrive && (
                  <div className="searchbar__to-alert">
                    <div className="alert-to-top"></div>
                    <p>Choose Arrive</p>
                  </div>
                )}
              </>
            )}

            <DatePicker id={comps.id} />
            {isSearchDisabled3 && showAlertDate && (
              <div className="searchbar__date-alert">
                <div className="alert-date-top"></div>
                <p>Choose Date</p>
              </div>
            )}
            <PassComponent id={comps.id} />
            {id === comp.length - 1 && (
              <button
                className="add-btn"
                onClick={() => {
                  addComps();
                }}
              >
                Add Flight
              </button>
            )}
            {comps.id > 1 && (
              <button
                className="remove-btn"
                onClick={() => dispatch(removeComp(comps.id))}
              >
                Remove flight
              </button>
            )}
            {/* <Passengers id={comps.id} /> */}
          </div>
        ))}
      <button
        onClick={(e) => {
          // setShowAlertArrive(true);

          e.preventDefault();
          debouncedFlightsSearch();
          // handleFlightsSearch();
          handleDate();

          // if (!isSearchDisabled && !isSearchDisabled2 && !isSearchDisabled3) {
          //   debouncedFlightsSearch();
          //   handleDate();
          // }
          if (isSearchDisabled) {
            setShowAlert(true);
          }

          if (isSearchDisabled2) {
            setShowAlertArrive(true);
          }
          if (isSearchDisabled3) {
            setShowAlertDate(true);
          }
        }}
        className="searchbar__button"
        // disabled={isSearchDisabled}
        // disabled={isFetching}
      >
        Search
      </button>
      {/* <Passengers /> */}
    </div>
  );
}

export default SearchBar;
