import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

const SearchResult = () => {
  const [result, setResult] = useState({});
  const [searchParams] = useSearchParams();
  const shipmentNum = searchParams.get("shipment-number");

  useEffect(() => {
    fetch(`https://tracking.bosta.co/shipments/track/${shipmentNum}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setResult(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [shipmentNum]);

  return <div></div>;
};

export default SearchResult;
