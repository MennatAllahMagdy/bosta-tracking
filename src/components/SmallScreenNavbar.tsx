import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";

import { FiMenu } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import Popup from "reactjs-popup";
import { TFunction } from "i18next";
import styles from "./SmallScreenNavbar.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SmallScreenNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [trackingNum, setTrackingNum] = useState(String);
  const navigate = useNavigate();
  const { t }: { t: TFunction } = useTranslation();
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingNum(e.target.value);
  };

  const hoverHandler = () => {
    setIsHovered(true);
  };
  const hoverOutHandler = () => {
    setIsHovered(false);
  };
  const changeStyles = () => {
    console.log("done");
  };
  const searchHandler = () => {
    navigate(`/tracking-shipments/?shipment-number=${trackingNum}`);
  };
  return (
    <div className={styles.nav}>
      <Popup
        trigger={
          <div
            className={styles.trackDiv}
            onClick={changeStyles}
            onMouseEnter={hoverHandler}
            onMouseLeave={hoverOutHandler}
          >
            <p>{t("track_Shipment")}</p>
            {isHovered ? (
              <RiArrowDropRightLine
                size={25}
                style={{ marginBottom: "2px", color: "#e30613" }}
              />
            ) : (
              <RiArrowDropDownLine
                size={25}
                style={{ marginBottom: "2px", color: "#e30613" }}
              />
            )}
          </div>
        }
        position="bottom right"
        on="click"
        closeOnDocumentClick
        mouseLeaveDelay={300}
        mouseEnterDelay={0}
        offsetY={-15}
        offsetX={2}
        contentStyle={{
          backgroundColor: "white",
          border: "1px solid #e4e7ec",
          boxShadow: "0px 10px 40px 10px rgb(0 0 0 / 10%)",
          borderRadius: 20,
          padding: 10,
        }}
        arrow={false}
      >
        <div className={styles.menu}>
          <p>{t("track_your_Shipment")}</p>
          <div className={styles.inputSearch}>
            <input
              placeholder={`${t("track_no")}`}
              style={{ border: "1px solid #e4e7ec" }}
              className={styles.inputBar}
              value={trackingNum}
              onChange={inputHandler}
            />
            <div className={styles.searchIcon} onClick={searchHandler}>
              <FiSearch color="white" />
            </div>
          </div>
        </div>
      </Popup>
      <div>
        <FiMenu
          size={30}
          style={{
            margin: "10px",
          }}
        />
      </div>
    </div>
  );
};

export default SmallScreenNavbar;
