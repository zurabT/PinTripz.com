import { createSlice } from "@reduxjs/toolkit";
import { act, useRef } from "react";
import { DateRange } from "react-date-range";
import { fetchFlightTickets } from "./FlightData";
import { v4 as uuidv4 } from "uuid";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./CounterSlice";

const initialState = {
  childNum: 0,
  infantNum: 0,
  cabinClass: "Economy",
  oneWay: false,
  hotels: false,
  multiCity: false,
  isLoading: false,
  flights: [],
  flightsData: [],

  components: [
    {
      id: uuidv4(),
      name: "com-1",
      date: null,
      dateRange: null,
      departure: "",
      arrive: "",
      passengerBar: false,
      passBarClickOutside: false,
      adultNum: 1,
      childNum: 0,
      infantNum: 0,
      cabinClass: "Economy",
    },
    // {
    //   id: 1,
    //   name: "com-1",
    //   date: null,
    //   dateRange: null,
    //   departure: "",
    //   arrive: "",
    //   passengerBar: false,
    // },
  ],
};

const counterSlice = createSlice({
  name: "passenger",
  initialState,

  reducers: {
    setIsLoadingTrue: (state, action) => {
      state.isLoading = true;
    },
    setIsLoadingFalse: (state, action) => {
      state.isLoading = false;
    },

    restart: (state, action) => {
      state.components.forEach((component) => {
        component.departure = "";
        component.arrive = "";
        component.date = null;
        component.dateRange = null;
        component.adultNum = 1;
        component.childNum = 0;
        component.infantNum = 0;
        component.cabinClass = "Economy";
      });
      state.flightsData = [];
    },

    setFlightsData: (state, action) => {
      state.flightsData = action.payload;
    },
    setFlights: (state, action) => {
      state.flights = action.payload;
    },

    setHotelFalse: (state) => {
      state.hotels = false;
    },
    setHotelTrue: (state) => {
      state.hotels = true;
    },
    setArrive: (state, action) => {
      const { id, arrive } = action.payload;
      const component = state.components.find((comp) => comp.id === id);
      if (component) {
        component.arrive = arrive;
      }
    },

    setDeparture: (state, action) => {
      const { id, departure } = action.payload;
      const component = state.components.find((comp) => comp.id === id);
      if (component) {
        component.departure = departure;
      }
    },

    incrementAdultNum: (state, action) => {
      const { id } = action.payload;
      const componentIndex = state.components.findIndex(
        (comp) => comp.id === id
      );
      if (componentIndex !== -1) {
        state.components[componentIndex].adultNum += 1;
      }
    },
    decrementAdultNum: (state, action) => {
      const { id } = action.payload;
      const componentIndex = state.components.findIndex(
        (comp) => comp.id === id
      );
      if (
        componentIndex !== -1 &&
        state.components[componentIndex].adultNum !== 1
      ) {
        state.components[componentIndex].adultNum -= 1;
      }
    },
    incrementChildNum: (state, action) => {
      const { id } = action.payload;
      const componentIndex = state.components.findIndex(
        (comp) => comp.id === id
      );
      if (componentIndex !== -1) {
        state.components[componentIndex].childNum += 1;
      }
    },
    decrementChildNum: (state, action) => {
      const { id } = action.payload;
      const componentIndex = state.components.findIndex(
        (comp) => comp.id === id
      );
      if (componentIndex !== -1) {
        state.components[componentIndex].childNum -= 1;
      }
    },
    incrementInfantdNum: (state, action) => {
      const { id } = action.payload;
      const componentIndex = state.components.findIndex(
        (comp) => comp.id === id
      );
      if (componentIndex !== -1) {
        state.components[componentIndex].infantNum += 1;
      }
    },
    decrementInfantNum: (state, action) => {
      const { id } = action.payload;
      const componentIndex = state.components.findIndex(
        (comp) => comp.id === id
      );
      if (componentIndex !== -1) {
        state.components[componentIndex].infantNum -= 1;
      }
    },
    cabinClassEconomy: (state, action) => {
      const { id } = action.payload;
      const componentIndex = state.components.findIndex(
        (comp) => comp.id === id
      );
      if (componentIndex !== -1) {
        state.components[componentIndex].cabinClass = "Economy";
      }
    },
    cabinClassBusiness: (state, action) => {
      const { id } = action.payload;
      const componentIndex = state.components.findIndex(
        (comp) => comp.id === id
      );
      if (componentIndex !== -1) {
        state.components[componentIndex].cabinClass = "Business";
      }
    },
    cabinClassFirst: (state, action) => {
      const { id } = action.payload;
      const componentIndex = state.components.findIndex(
        (comp) => comp.id === id
      );
      if (componentIndex !== -1) {
        state.components[componentIndex].cabinClass = "First class";
      }
    },
    oneWayTrue: (state) => {
      state.oneWay = true;
    },
    oneWayFalse: (state) => {
      state.oneWay = false;
    },
    multicityTrue: (state) => {
      state.multiCity = true;
      console.log(state.multiCity);
    },
    multicityFalse: (state) => {
      state.multiCity = false;
    },
    togglePassengerBar: (state, action) => {
      const { id } = action.payload;
      const componentIndex = state.components.findIndex(
        (comp) => comp.id === id
      );
      if (componentIndex !== -1) {
        state.components[componentIndex].passengerBar =
          !state.components[componentIndex].passengerBar;
      }
      if (componentIndex !== -1) {
        state.components[componentIndex].passBarClickOutside =
          !state.components[componentIndex].passBarClickOutside;
      }

      // console.log(state.components[componentIndex].passengerBar);
    },
    closePassengerBar: (state, action) => {
      const { id } = action.payload;
      const componentIndex = state.components.findIndex(
        (comp) => comp.id === id
      );
      if (componentIndex !== -1) {
        state.components[componentIndex].passBarClickOutside = false;
      }
      if (
        componentIndex !== -1 &&
        state.components[componentIndex].passengerBar === true
      ) {
        state.components[componentIndex].passengerBar = false;
      }
    },
    setDate: (state, action) => {
      const { id, date } = action.payload;
      const compIndex = state.components.findIndex((comp) => comp.id === id);
      if (compIndex !== -1) {
        state.components[compIndex].date = date || null;
      }
    },
    setDateRange: (state, action) => {
      const { id, dateRange } = action.payload;
      const compIndex = state.components.findIndex((comp) => comp.id === id);
      if (compIndex !== -1) {
        state.components[compIndex].dateRange = dateRange;
      }
    },
    addComp: (state, action) => {
      // state.components.push(action.payload);
      state.components.push({
        id: uuidv4(), // Or any other logic for new ID
        name: `com-${state.components.length + 1}`,
        date: null,
        dateRange: null,
        departure: "",
        arrive: "",
        adultNum: 0,
        childNum: 0,
        infantNum: 0,
        cabinClass: "Economy",
        passengerBar: false,
      });
    },
    removeComp: (state, action) => {
      const idToRemove = action.payload;

      state.components = state.components.filter(
        (comp) => comp.id !== idToRemove
      );
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state
        ignoredPaths: [
          "passenger.components.date",
          "passenger.components.dateRange",
        ],
        // Ignore these action paths
        ignoredActionPaths: ["payload.date", "payload.dateRange"],
        // Ignore specific actions entirely
        ignoredActions: ["passenger/setDate", "passenger/setDateRange"],
      },
    }),
});

export const {
  incrementAdultNum,
  decrementAdultNum,
  incrementChildNum,
  decrementChildNum,
  incrementInfantdNum,
  decrementInfantNum,
  cabinClassBusiness,
  cabinClassEconomy,
  cabinClassFirst,
  oneWayTrue,
  oneWayFalse,
  togglePassengerBar,
  setDate,
  setDateRange,
  addComp,
  removeComp,
  setDeparture,
  setArrive,
  multicityTrue,
  multicityFalse,
  closePassengerBar,
  setHotelFalse,
  setHotelTrue,
  setFlights,
  setFlightsData,
  restart,
  setIsLoadingTrue,
  setIsLoadingFalse,
} = counterSlice.actions;

export default counterSlice.reducer;
