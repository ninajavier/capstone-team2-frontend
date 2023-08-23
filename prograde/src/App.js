import { Routes, Route } from "react-router-dom";
import "./App.css";
import ServiceAlerts from "./Components/ServiceAlerts";

function App() {
  return (
    <div>
      <div>Hello</div>
      <Routes>
        <Route path="service-alerts" element={<ServiceAlerts />} />
      </Routes>
    </div>
  );
}

export default App;
