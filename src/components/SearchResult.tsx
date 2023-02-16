import React, { useContext, useEffect, useState } from "react";

import { Circles } from "react-loader-spinner";
import { LangContext } from "../store/lang-Context";
import NotFoundOrder from "./NotFoundOrder";
import { TFunction } from "i18next";
import styles from "./SearchResult.module.css";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

interface Event {
  timestamp: Date;
  reason: string;
  state: string;
  hub: string;
}
const SearchResult = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [eventsList, setEventsList] = useState<Array<Event>>([]);
  const [status, setStatus] = useState<String>("");
  const [searchParams] = useSearchParams();
  const shipmentNum = searchParams.get("shipment-number");
  const { t }: { t: TFunction } = useTranslation();
  const ctx = useContext(LangContext);
  useEffect(() => {
    setLoading(true);
    fetch(`https://tracking.bosta.co/shipments/track/${shipmentNum}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("response", response);
        } else {
          return response.json();
        }
        setLoading(false);
      })
      .then((data) => {
        setResult(data);
        setEventsList(data["TransitEvents"]);
        if (data["CurrentStatus"]["state"] === "DELIVERED") {
          setStatus("Delivered");
        } else if (data["CurrentStatus"]["state"] === "DELIVERED_TO_SENDER")
          setStatus("Returned");
        else if (data["CurrentStatus"]["state"] === "TICKET_CREATED")
          setStatus("Preparing for shipment");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [shipmentNum]);

  const getUniqueDates = () => {
    let uniqueDates = eventsList
      .map((item) => new Date(item["timestamp"]).toDateString())
      .filter((d, i, a) => a.indexOf(d) === i)
      .map((d) => new Date(d));
    return uniqueDates;
  };
  const uniqueDates = getUniqueDates();

  const differnceBetwwenDates = () => {
    if (result != null) {
      const dated = new Date(result["CurrentStatus"]["timestamp"]).valueOf();
      const today = new Date().valueOf();
      const diff = Math.round(
        Math.abs((today - dated) / (24 * 60 * 60 * 1000))
      );
      return diff;
    }
  };
  const diffTime = differnceBetwwenDates();
  if (loading) {
    return (
      <div className={styles.loading}>
        <Circles
          ariaLabel="circles-loading"
          color="#0098a5"
          height="50"
          width="50"
          visible={true}
        />
      </div>
    );
  }
  return (
    <div className={ctx.lang === "en" ? styles.en : styles.arab}>
      {result && !loading ? (
        <div className={styles.resultDiv}>
          <div
            className={styles.shipmentDetails}
            style={
              ctx.lang === "en"
                ? { fontFamily: "Lato" }
                : { fontFamily: "Cairo" }
            }
          >
            <div className={styles.shipmentStatus}>
              <p className={styles.shipmentNum}>
                {t("shipment_no")}
                {shipmentNum}
              </p>

              <p className={styles.shipmentStatusText}>
                {status === "Delivered"
                  ? t("delivered")
                  : status === "Returned"
                  ? t("returned")
                  : status === "Preparing for shipment" &&
                    t("preparing-shipment")}
              </p>
            </div>
            <div className={styles.lines}>
              <hr className={styles.darkHr}></hr>
              <hr
                className={
                  status === "Preparing for shipment"
                    ? styles.lightHr
                    : styles.darkHr
                }
              ></hr>
              <hr
                className={
                  status === "Delivered" ? styles.darkHr : styles.lightHr
                }
              ></hr>
            </div>
            <div
              style={
                ctx.lang === "en"
                  ? { fontFamily: "Lato" }
                  : { fontFamily: "Cairo" }
              }
            >
              <div className={styles.orderStatus}>
                {status === "Delivered"
                  ? t("order_delivered")
                  : status === "Returned"
                  ? t("order_returned_shipper")
                  : status === "Preparing for shipment" && t("shipper_pickup")}
                <span>
                  {t("date", {
                    itemDate: new Date(result["CurrentStatus"]["timestamp"]),
                  })}
                </span>
              </div>
              <div className={styles.lastUpdate}>
                <p>{t("last_update", { diffTime })}</p>
              </div>
            </div>
            <div className={styles.seperator}></div>
          </div>

          <div className={styles.activityLog}>
            <p>{t("activity_log")}</p>
            <div
              className={styles.activityDiv}
              style={
                ctx.lang === "en"
                  ? { fontFamily: "Lato" }
                  : { fontFamily: "Cairo" }
              }
            >
              <ul>
                {uniqueDates.map((item) => (
                  <li key={uuidv4()} className={styles.listEvents}>
                    <div className={styles.firstDiv}></div>
                    <div className={styles.secondDiv}></div>
                    <div className={styles.content}>
                      <div>
                        {t("date", { itemDate: item }).substring(
                          0,
                          t("date", { itemDate: item }).length - 4
                        )}
                      </div>
                      {eventsList.map(
                        (eachEvent) =>
                          new Date(eachEvent["timestamp"]).toDateString() ===
                            item.toDateString() && (
                            <div
                              key={uuidv4()}
                              className={styles.contentDetails}
                              style={
                                ctx.lang === "en"
                                  ? { fontFamily: "Lato" }
                                  : { fontFamily: "Cairo" }
                              }
                            >
                              <span>{t(eachEvent["state"])}</span>
                              <span>
                                {eachEvent["hub"] && eachEvent["hub"]}
                              </span>
                              <span>
                                {t("time", {
                                  itemTime: new Date(eachEvent["timestamp"]),
                                })}
                              </span>
                            </div>
                          )
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        !result && <NotFoundOrder shipmentNum={shipmentNum} />
      )}
    </div>
  );
};

export default SearchResult;
