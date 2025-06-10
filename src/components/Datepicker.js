// import { useState } from "react";
// import { DateRange } from "react-date-range";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.module.css";

// function ReactDatepicker({ onChangeDate }) {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleDateChangeStart = (date) => {
//     setSelectedDate(date);
//     onChangeDate(date);
//   };

//   const handleDateChangeEnd = (date) => {
//     setSelectedDate(date);
//     onChangeDate(date);
//   };
//   return (
//     <div>
//       <DatePicker
//         selected={selectedDate}
//         onChange={(handleDateChangeStart, handleDateChangeEnd)}
//         minDate={new Date()}
//         className="datepicker"
//         placeholderText="Select a date"
//         selectionMode="range"
//       />
//     </div>
//   );
// }

// export default ReactDatepicker;
