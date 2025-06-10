const flightTickets = [
  {
    id: 1,
    airline: "Delta Airlines",
    departure: "New York (JFK)",
    arrival: "London (LHR)",
    departureTime: "2024-11-15T08:00:00",
    arrivalTime: "2024-11-15T20:00:00",
    duration: "7h",
    price: 650,
    stops: 0,
    cabinClass: "Economy",
  },
  {
    id: 2,
    airline: "United Airlines",
    departure: "Los Angeles (LAX)",
    arrival: "Tokyo (NRT)",
    departureTime: "2024-11-16T12:00:00",
    arrivalTime: "2024-11-17T16:00:00",
    duration: "11h",
    price: 1200,
    stops: 1,
    cabinClass: "Business",
  },
  {
    id: 3,
    airline: "Air France",
    departure: "Paris (CDG)",
    arrival: "Rome (FCO)",
    departureTime: "2024-11-15T10:00:00",
    arrivalTime: "2024-11-15T12:00:00",
    duration: "2h",
    price: 150,
    stops: 0,
    cabinClass: "Economy",
  },
  {
    id: 4,
    airline: "Emirates",
    departure: "Dubai (DXB)",
    arrival: "Sydney (SYD)",
    departureTime: "2024-11-20T21:00:00",
    arrivalTime: "2024-11-21T07:00:00",
    duration: "14h",
    price: 1800,
    stops: 0,
    cabinClass: "First Class",
  },
  {
    id: 5,
    airline: "Qatar Airways",
    departure: "Doha (DOH)",
    arrival: "New York (JFK)",
    departureTime: "2024-11-18T08:30:00",
    arrivalTime: "2024-11-18T16:30:00",
    duration: "14h",
    price: 950,
    stops: 1,
    cabinClass: "Economy",
  },
];

export const fetchFlightTickets = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(flightTickets);
    }, 1000);
  });
};
