import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import "react-calendar/dist/Calendar.css"; // Import the Calendar CSS
import { FloatLabel } from "primereact/floatlabel";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDate, setDateRange } from "./CounterSlice";

const CalendarComponent = memo(({ id }) => {
  const dispatch = useDispatch();
  const oneWay = useSelector((state) => state.passenger.oneWay);

  const [newDateRange, setNewDateRange] = useState(null);

  const date = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id)?.date || null
  );
  const comp = useSelector((state) =>
    state.passenger.components.find((comp) => comp.id === id)
  );

  const dateRange = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id)?.dateRange
  );

  const handleDateChange = (e) => {
    if (!e.value) return;
    if (oneWay) {
      dispatch(setDate({ id, date: e.value }));
    } else {
      dispatch(setDateRange({ id, dateRange: e.value }));
    }
  };
  return (
    <>
      <FloatLabel
        className="calendar-oneWay"
        style={{ width: oneWay ? "60%" : "100%", marginTop: "0rem" }}
      >
        <Calendar
          minDate={new Date()}
          onChange={handleDateChange}
          value={oneWay ? date : dateRange}
          selectionMode={oneWay ? "single" : "range"}
          showIcon
          numberOfMonths={oneWay ? 1 : 2}
          inputId={oneWay ? "Journey date" : "Journey date - Return date"}
          showButtonBar
          readOnlyInput
          hideOnRangeSelection
          dateFormat="yy-mm-dd"
        />

        <label
          className="calendar-text"
          htmlFor={oneWay ? "Journey date" : "Journey date - Return date"}
        >
          {oneWay ? "Journey date" : "Journey date - Return date"}
        </label>
      </FloatLabel>
    </>
  );
});

export default CalendarComponent;
