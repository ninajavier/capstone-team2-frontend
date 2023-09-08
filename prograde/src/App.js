import { Routes, Route } from "react-router-dom";
import "./App.css";
import SubwayAlerts from "./Components/SubwayAlerts";
function App() {
  return (
    <div>
      <div>Hello</div>
      <Routes>
        <Route path="subway-alerts" element={<SubwayAlerts />} />
      </Routes>
    </div>
  );
}

export default App;
