import React, { useContext, useState } from "react";

import { FiSearch } from "react-icons/fi";
import { LangContext } from "../store/lang-Context";
import { TFunction } from "i18next";
import styles from "./Search.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Search = () => {
  const [trackingNum, setTrackingNum] = useState(String);
  const { t }: { t: TFunction } = useTranslation();
  const ctx = useContext(LangContext);
  const navigate = useNavigate();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingNum(e.target.value);
  };

  const searchClick = () => {
    navigate(`/tracking-shipments/?shipment-number=${trackingNum}`);
  };
  return (
    <div className={styles.searchDiv}>
      <h4>{t("track_your_Shipment")}</h4>
      <div className={styles.inputSearch}>
        <input
          value={trackingNum}
          onChange={inputHandler}
          placeholder={`${t("track_no")}`}
          className={
            ctx.lang === "ar" ? styles.rightInputBar : styles.leftInputBar
          }
        />
        <div
          className={
            ctx.lang === "ar" ? styles.rightSearchIcon : styles.leftSearchIcon
          }
          onClick={searchClick}
        >
          <FiSearch color="white" size={35} />
        </div>
      </div>
    </div>
  );
};

export default Search;
