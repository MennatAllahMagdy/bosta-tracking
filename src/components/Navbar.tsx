import React, { useContext, useEffect, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";

import { LangContext } from "../store/lang-Context";
import Popup from "reactjs-popup";
import i18n from "../locales/i18n";
import styles from "./Navbar.module.css";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  const ctx = useContext(LangContext);

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
  return (
    <div className={styles.nav}>
      <Popup
        trigger={
          <div
            className={styles.trackDiv}
            onMouseEnter={hoverHandler}
            onMouseLeave={hoverOutHandler}
          >
            <p
              className={isHovered ? styles.hoveredText : styles.unhoveredText}
            >
              {t("en")}
            </p>
            {isHovered ? (
              <RiArrowDropRightLine size={30} style={{ color: "#e30613" }} />
            ) : (
              <RiArrowDropDownLine size={30} style={{ color: "#a6a5a4" }} />
            )}
          </div>
        }
        position="bottom left"
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

export default Navbar;
