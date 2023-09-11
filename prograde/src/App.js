import { Routes, Route } from "react-router-dom";
import "./App.css";
import SubwayAlerts from "./Components/SubwayAlerts";
import FilterDropdown from "./Components/FilterDropdown";
function App() {
  return (
    <div>
      <div>Hello</div>
      <Routes>
        <Route path="subway-alerts" element={<SubwayAlerts />} />
        <Route path="dropdown" element={<FilterDropdown />} />
      </Routes>
    </div>
  );
}

export default App;
