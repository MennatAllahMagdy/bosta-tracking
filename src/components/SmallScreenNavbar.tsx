import React, { useContext, useEffect, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";

import { FiMenu } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { LangContext } from "../store/lang-Context";
import Popup from "reactjs-popup";
import { TFunction } from "i18next";
import i18n from "../locales/i18n";
import styles from "./SmallScreenNavbar.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SmallScreenNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [trackingNum, setTrackingNum] = useState(String);
  const ctx = useContext(LangContext);
  const navigate = useNavigate();
  const { t }: { t: TFunction } = useTranslation();

  const handleOnclick = (lang: string) => {
    if (lang === "en") {
      ctx.setLang("en");
      i18n.changeLanguage("en");
    } else if (lang === "ar") {
      ctx.setLang("ar");
      i18n.changeLanguage("arab");
    }
  };
  const hoverHandler = () => {
    setIsHovered(true);
  };
  const hoverOutHandler = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (ctx.lang == "en") document.body.dir = "ltr";
    else if (ctx.lang == "ar") document.body.dir = "rtl";
  }, [ctx.lang]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingNum(e.target.value);
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
        position={ctx.lang === "en" ? "bottom right" : "bottom left"}
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
              className={
                ctx.lang === "ar" ? styles.rightInputBar : styles.leftInputBar
              }
              value={trackingNum}
              onChange={inputHandler}
            />
            <div
              className={
                ctx.lang === "ar"
                  ? styles.rightSearchIcon
                  : styles.leftSearchIcon
              }
              onClick={searchHandler}
            >
              <FiSearch color="white" />
            </div>
          </div>
        </div>
      </Popup>

      <Popup
        trigger={
          <div className={styles.trackDiv}>
            <FiMenu
              size={30}
              style={{
                margin: "10px",
              }}
            />
          </div>
        }
        position={ctx.lang === "en" ? "bottom right" : "bottom left"}
        on="click"
        closeOnDocumentClick
        mouseLeaveDelay={300}
        mouseEnterDelay={0}
        offsetY={-15}
        contentStyle={{
          backgroundColor: "white",
          border: "1px solid #e4e7ec",
          boxShadow:
            "0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)",
          borderRadius: 6,
          width: 80,
          textAlign: "center",
          padding: "0px 6px 0px 6px",
        }}
        arrow={false}
      >
        <div className={styles.menu}>
          <p onClick={() => handleOnclick("en")}>{t("english")}</p>
          <p onClick={() => handleOnclick("ar")}>{t("arabic")}</p>
        </div>
      </Popup>
    </div>
  );
};

export default SmallScreenNavbar;
