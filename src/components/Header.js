import Info from "./Info";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { addComp } from "./CounterSlice";
import Ticket from "./Ticket";

function Header() {
  const comp = useSelector((state) => state.passenger.components);
  const dispatch = useDispatch();
  const addComps = () => {
    const newId = comp.length + 1;

    dispatch(addComp({ id: newId, name: `com-${newId}` }));
  };

  return (
    <div className="header">
      <Info />
      <Navbar />

      {/* <SearchBar /> */}
      {/* <Ticket /> */}
    </div>
  );
}

export default Header;
