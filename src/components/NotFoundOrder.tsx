import { BiError } from "react-icons/bi";
import React from "react";
import { TFunction } from "i18next";
import styles from "./NotFoundOrder.module.css";
import { useTranslation } from "react-i18next";

const NotFoundOrder = ({ shipmentNum }: any) => {
  const { t }: { t: TFunction } = useTranslation();
  return (
    <div className={styles.notFound}>
      <p className={styles.shipmentNum}>
        {t("shipment_no")} {shipmentNum}
      </p>
      <div className={styles.notFoundBox}>
        <BiError size={30} color={"red"} />
        <p>{t("not_found")}</p>
      </div>
    </div>
  );
};

export default NotFoundOrder;
