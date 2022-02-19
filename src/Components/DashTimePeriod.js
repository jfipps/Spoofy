import React, { useContext } from "react";
import "../CSS/Dashboard.css";
import { SpoofyContext } from "../context";

export default function DashTimePeriod() {
  const { activeTab, setActiveTab } = useContext(SpoofyContext);

  return (
    <section className="DashTime">
      <div className="TimeButtons">
        <button
          onClick={() => setActiveTab("short_term")}
          id={activeTab === "short_term" && "active"}
        >
          One Month
        </button>
        <button
          onClick={() => setActiveTab("medium_term")}
          id={activeTab === "medium_term" && "active"}
        >
          Six Months
        </button>
        <button
          onClick={() => setActiveTab("long_term")}
          id={activeTab === "long_term" && "active"}
        >
          One Year
        </button>
      </div>
    </section>
  );
}
