// const DateFilter = () => {
//   const today = new Date();

//   console.log(today);
//   //default filter out alerts that
//   return (
//     <div>
//       <h1>date filter</h1>
//     </div>
//   );
// };

// export default DateFilter;
// DateFilter.js

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function DateFilter() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label="Pick a Date" fullWidth={true} />
    </LocalizationProvider>
  );
}

export default DateFilter;
