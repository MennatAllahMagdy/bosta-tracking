import React, { useEffect, useState } from "react";

import Bostalogo from "../assets/bosta.png";
import Navbar from "./Navbar";
import SmallScreenNavbar from "./SmallScreenNavbar";
import styles from "./Header.module.css";

const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeWindowSize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWindowSize);
    return () => window.removeEventListener("resize", changeWindowSize);
  }, []);

  return (
    <div className={styles.header}>
      <img src={Bostalogo} alt="logo" className={styles.logo} />
      {width > 1200 ? <Navbar /> : <SmallScreenNavbar />}
    </div>
  );
};

export default Header;
