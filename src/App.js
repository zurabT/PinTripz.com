import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Ticket from "./components/Ticket";
import Ticket2Way from "./components/Ticket2Way";
import { fetchFlightTickets } from "./components/FlightData";
import { useState } from "react";
import { useSelector } from "react-redux";
import BasicDemo from "./components/DateRangePicker";
import CalendarComponent from "./components/DateRangePicker";
import Loader from "./components/Loader";
import { Routes, Route, Router } from "react-router-dom";
import Contanct from "./components/Contanct";
import About from "./components/About";

function Home() {
  const flights = useSelector((state) => state.passenger.flights);
  const flightsData = useSelector((state) => state.passenger.flightsData);
  const ticketArr = flightsData.itineraries || [];
  const carriers = flightsData.carriers || [];
  const legs = flightsData.legs || [];
  const adultNum = useSelector((state) => state.passenger.adultNum);
  const stopPlaces = flightsData.places || [];
  const oneWay = useSelector((state) => state.passenger.oneWay);
  const agents = flightsData.agents || {};
  const isLoading = useSelector((state) => state.passenger.isLoading);

  const stopsPlacesNames = legs.map((leg) => {
    if (leg.stop_ids && leg.stop_ids.length > 0) {
      const stopIds = leg.stop_ids.flat();

      const stopPlace = stopPlaces.filter((stop) =>
        // (stop) => stop.id === leg.stop_ids[0][0]
        stopIds.includes(stop.id)
      );

      return stopPlace.map((stop) => stop.display_code);
    } else {
      // Handle cases where leg.stop_ids is undefined or empty
      return [];
    }
  });
  const returnLegs = ticketArr.map((originId) => {
    const returnLeg = legs.find((leg) => leg.id === originId.leg_ids[1]);
    return returnLeg ? returnLeg : "not found";
  });
  const returnStopsPlacesNames = returnLegs.map((leg) => {
    if (leg.stop_ids && leg.stop_ids.length > 0) {
      const stopIds = leg.stop_ids.flat();

      const stopPlace = stopPlaces.filter((stop) =>
        // (stop) => stop.id === leg.stop_ids[0][0]
        stopIds.includes(stop.id)
      );

      return stopPlace.map((stop) => stop.display_code);
    } else {
      // Handle cases where leg.stop_ids is undefined or empty
      return [];
    }
  });
  const sortedTickets = [...ticketArr].sort(
    (a, b) => a.cheapest_price.amount - b.cheapest_price.amount
  );

  const carrierNames = sortedTickets.map((ticket) => {
    const agent = agents.find(
      (agent) => agent.id === ticket.pricing_options[0].agent_ids[0]
    );
    return agent ? agent.name : "Carrier not found";
  });

  const returnCarrierNames = returnLegs?.map((leg) => {
    const carrier = carriers?.find(
      (carrier) => carrier?.id === leg?.operating_carrier_ids?.[0]
    );
    return carrier ? carrier.name : "Carrier not found";
  });
  const departure = ticketArr.map((originId) => {
    const departDate = legs.find((leg) => leg.id === originId.leg_ids[0]);
    return departDate ? departDate.departure : "not found";
  });

  const returnDeparture = ticketArr.map((originId) => {
    const returnDate = legs.find((leg) => leg.id === originId.leg_ids[1]);
    return returnDate ? returnDate.departure : "not found";
  });

  const arrival = ticketArr.map((originId) => {
    const arrivDate = legs.find((leg) => leg.id === originId.leg_ids[0]);
    return arrivDate ? arrivDate.arrival : "not found";
  });

  const returnArrival = ticketArr.map((originId) => {
    const returnDate = legs.find((leg) => leg.id === originId.leg_ids[1]);
    return returnDate ? returnDate.arrival : "not found";
  });
  const departDuration = ticketArr.map((originId) => {
    const duration = legs.find((leg) => leg.id === originId.leg_ids[0]);
    return duration ? duration.duration : "not found";
  });
  const returnDuration = ticketArr.map((originId) => {
    const returnduration = legs.find((leg) => leg.id === originId.leg_ids[1]);
    return returnduration ? returnduration.duration : "not found";
  });
  const departStops = ticketArr.map((originId) => {
    const stops = legs.find((leg) => leg.id === originId.leg_ids[0]);
    return stops ? stops.stop_count : "not found";
  });

  return (
    <div className="home">
      {/* <Header /> */}
      <SearchBar />
      {isLoading && (
        <>
          <Loader />
          <Loader />
        </>
      )}
      {sortedTickets.length > 0 && oneWay === true
        ? sortedTickets.map((ticket, id) => {
            const departureTime = new Date(
              legs[id].departure
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
            const arrivalTime = new Date(legs[id].arrival).toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }
            );
            const duration = legs[id].duration;
            const durationHoure = Math.floor(duration / 60);
            const durationMinute = duration % 60;
            const link = ticket.pricing_options[0].items[0].url;

            return (
              <Ticket
                key={ticket.id}
                price={ticket.cheapest_price.amount}
                airline={carrierNames[id]}
                departure={departureTime}
                arrival={arrivalTime}
                stops={legs[id].stop_count}
                adultNum={adultNum}
                stopsPlacesNames={stopsPlacesNames[id]}
                durationHoure={durationHoure}
                durationMinute={durationMinute}
                link={link}
              />
            );
          })
        : sortedTickets.map((ticket, id) => {
            const departureTime = new Date(departure[id]).toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }
            );

            const arrivalTime = new Date(arrival[id]).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });

            const duration = departDuration[id];
            const durationHoure = Math.floor(duration / 60);
            const durationMinute = duration % 60;
            const returnDurationHoure = Math.floor(returnDuration[id] / 60);
            const returnDurationMinute = returnDuration[id] % 60;

            const link = ticket.pricing_options[0].items[0].url;

            const returnDepartureTime = new Date(
              returnDeparture[id]
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
            const returnArrivalTime = new Date(
              returnArrival[id]
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
            return (
              <Ticket2Way
                key={ticket.id}
                price={ticket.cheapest_price.amount}
                airline={carrierNames[id]}
                returnAirline={returnCarrierNames[id]}
                departure={departureTime}
                returnDeparture={returnDepartureTime}
                arrival={arrivalTime}
                returnArrival={returnArrivalTime}
                stops={departStops[id]}
                returnStops={returnLegs[id].stop_count}
                adultNum={adultNum}
                stopsPlacesNames={stopsPlacesNames[id]}
                returnStopsPlacesNames={returnStopsPlacesNames[id]}
                durationHoure={durationHoure}
                durationMinute={durationMinute}
                returnDurationHoure={returnDurationHoure}
                returnDurationMinute={returnDurationMinute}
                link={link}
              />
            );
          })}
      {/* <Ticket2Way /> */}
    </div>
  );
}
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contanct />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
