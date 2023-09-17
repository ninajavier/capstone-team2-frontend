import { Routes, Route } from "react-router-dom";
import SubwayAlerts from "./Components/SubwayAlerts";
import FilterDropdown from "./Components/FilterDropdown";
import DateFilter from "./Components/DateFilter";

function App() {
  return (
    <div>
      <div>Hello</div>
      <Routes>
        <Route path="subway-alerts" element={<SubwayAlerts />} />
        <Route path="dropdown" element={<FilterDropdown />} />
        <Route path="date" element={<DateFilter />} />
      </Routes>
    </div>
  );
}

export default App;
