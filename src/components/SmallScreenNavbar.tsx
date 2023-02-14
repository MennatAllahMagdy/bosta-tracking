import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";

import { FiMenu } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import Popup from "reactjs-popup";
import styles from "./SmallScreenNavbar.module.css";

const SmallScreenNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverHandler = () => {
    setIsHovered(true);
  };
  const hoverOutHandler = () => {
    setIsHovered(false);
  };
  const changeStyles = () => {
    console.log("done");
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
            <p>Track Shipment</p>
            {isHovered ? (
              <RiArrowDropRightLine size={30} style={{ color: "#e30613" }} />
            ) : (
              <RiArrowDropDownLine size={30} style={{ color: "#e30613" }} />
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
          <p>Track your shipment</p>
          <div className={styles.inputSearch}>
            <input
              placeholder="Tracking No."
              style={{ border: "1px solid #e4e7ec" }}
              className={styles.inputBar}
            />
            <div className={styles.searchIcon}>
              <FiSearch color="white" />
            </div>
          </div>
        </div>
      </Popup>
      <div>
        <FiMenu size={30} style={{ paddingLeft: "20px" }} />
      </div>
    </div>
  );
};

export default SmallScreenNavbar;
