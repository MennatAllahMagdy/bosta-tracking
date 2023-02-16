import React, { useContext } from "react";

import Bostalogo from "../assets/bosta.png";
import BostalogoAr from "../assets/bosta-ar.png";
import { LangContext } from "../store/lang-Context";
import Navbar from "./Navbar";
import SmallScreenNavbar from "./SmallScreenNavbar";
import styles from "./Header.module.css";
import { useWidthHook } from "../hooks/useWidthHook";

const Header = () => {
  const ctx = useContext(LangContext);
  const width = useWidthHook();

  return (
    <div className={styles.header}>
      <img
        src={ctx.lang === "en" ? Bostalogo : BostalogoAr}
        alt="logo"
        className={styles.logo}
      />
      {width > 1200 ? <Navbar /> : <SmallScreenNavbar />}
    </div>
  );
};

export default Header;
