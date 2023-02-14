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
      <Routes>
        <Route path="/tracking-shipments" element={<SearchResult />} />
      </Routes>
    </div>
  );
};

export default TrackingShipments;
