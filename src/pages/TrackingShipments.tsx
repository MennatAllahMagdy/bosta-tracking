import { Route, Routes } from "react-router-dom";

import Header from "../components/Header";
import React from "react";
import Search from "../components/Search";
import SearchResult from "../components/SearchResult";
import styles from "./TrackingShipments.module.css";

const TrackingShipments = () => {
  return (
    <div className={styles.main}>
      <Header />
      <Search />
      <div className={styles.routeDiv}>
        <Routes>
          <Route path="/tracking-shipments" element={<SearchResult />} />
        </Routes>
      </div>
    </div>
  );
};

export default TrackingShipments;
