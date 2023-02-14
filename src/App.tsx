import { Route, Routes } from "react-router-dom";

import TrackingShipments from "./pages/TrackingShipments";

function App() {
  //tracking-shipments/?shipment-number=:shipment-number

  return (
    <div>
      <Routes>
        <Route path="/*" element={<TrackingShipments />} />
      </Routes>
    </div>
  );
}

export default App;
