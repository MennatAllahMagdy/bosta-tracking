import React, { useState } from "react";

import { FiSearch } from "react-icons/fi";
import styles from "./Search.module.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [trackingNum, setTrackingNum] = useState(String);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingNum(e.target.value);
  };
  console.log(trackingNum);

  const searchClick = () => {
    navigate(`/tracking-shipments/?shipment-number=${trackingNum}`);
  };
  return (
    <div className={styles.searchDiv}>
      <h4>Track your shipment</h4>
      <div className={styles.inputSearch}>
        <input
          value={trackingNum}
          onChange={inputHandler}
          placeholder="Tracking No."
          className={styles.inputBar}
        />
        <div className={styles.searchIcon} onClick={searchClick}>
          <FiSearch color="white" size={35} />
        </div>
      </div>
    </div>
  );
};

export default Search;
