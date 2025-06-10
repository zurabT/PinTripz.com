import { useSelector, useDispatch } from "react-redux";
import {
  incrementAdultNum,
  decrementAdultNum,
  incrementChildNum,
  decrementChildNum,
  incrementInfantdNum,
  decrementInfantNum,
  cabinClassBusiness,
  cabinClassEconomy,
  cabinClassFirst,
  togglePassengerBar,
  closePassengerBar,
} from "./CounterSlice";
import { useEffect, useRef } from "react";
import { use } from "react";

function Passengers({ id }) {
  const dispatch = useDispatch();
  const ref = useRef();

  const passenger = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id).passengerBar
  );
  const passBarClickOutside = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id)
        .passBarClickOutside
  );
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        closePassengerBar &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        dispatch(closePassengerBar({ id: id }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch, id]);
  const adultNum = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id)?.adultNum
  );

  const childNum = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id).childNum
  );
  const infantNum = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id).infantNum
  );
  const cabinClass = useSelector(
    (state) =>
      state.passenger.components.find((comp) => comp.id === id).cabinClass
  );

  return (
    <div
      // ref={ref}
      className={
        passenger && passBarClickOutside ? "passengers visible" : "passengers"
      }
    >
      <h1 className="passengers__type-title">Passengers</h1>
      <div className="passengers__type">
        <div className="passengers__adult">
          <p>{adultNum}</p>
          <div className="passengers__adult-info">
            <h2>Adult</h2>
            <h3>12+ yrs</h3>
          </div>

          <div className="passengers__btns">
            <button onClick={() => dispatch(incrementAdultNum({ id: id }))}>
              +
            </button>
            <button
              onClick={() =>
                adultNum > 0 ? dispatch(decrementAdultNum({ id: id })) : ""
              }
            >
              -
            </button>
          </div>
        </div>
        <div className="passengers__children">
          <p>{childNum}</p>
          <div className="passengers__children-info">
            <h2>Children</h2>
            <h3>2 - Less than 12 yrs</h3>
          </div>

          <div className="passengers__btns">
            <button onClick={() => dispatch(incrementChildNum({ id: id }))}>
              +
            </button>
            <button
              onClick={() =>
                childNum > 0 ? dispatch(decrementChildNum({ id: id })) : ""
              }
            >
              -
            </button>
          </div>
        </div>

        <div className="passengers__infant">
          <p>{infantNum}</p>
          <div className="passengers__infant-info">
            <h2>Infant</h2>
            <h3>Less than 2 yrs</h3>
          </div>

          <div className="passengers__btns">
            <button onClick={() => dispatch(incrementInfantdNum({ id: id }))}>
              +
            </button>
            <button
              onClick={() =>
                infantNum > 0 ? dispatch(decrementInfantNum({ id: id })) : ""
              }
            >
              -
            </button>
          </div>
        </div>
      </div>
      <div className="passengers__class">
        <h1 className="passengers__class-title">Cabin class</h1>
        <div className="Cabin__classes">
          <p
            className={cabinClass === "Economy" ? "Class__active" : ""}
            onClick={() => dispatch(cabinClassEconomy({ id: id }))}
          >
            Economy
          </p>
          <p
            className={cabinClass === "Business" ? "Class__active" : ""}
            onClick={() => dispatch(cabinClassBusiness({ id: id }))}
          >
            Business
          </p>
          <p
            className={cabinClass === "First class" ? "Class__active" : ""}
            onClick={() => dispatch(cabinClassFirst({ id: id }))}
          >
            First class
          </p>
        </div>
      </div>
    </div>
  );
}

export default Passengers;
