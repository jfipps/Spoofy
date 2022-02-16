import React, { useContext } from "react";
import "../CSS/Dashboard.css";
import { SpoofyContext } from "../context";

export default function DashTimePeriod() {
  const { activeTab, setActiveTab } = useContext(SpoofyContext);

  return (
    <section className="DashTime">
      <div className="TimeButtons">
        <button
          onClick={() => setActiveTab("oneMonth")}
          id={activeTab === "oneMonth" && "active"}
        >
          One Month
        </button>
        <button
          onClick={() => setActiveTab("sixMonths")}
          id={activeTab === "sixMonths" && "active"}
        >
          Six Months
        </button>
        <button
          onClick={() => setActiveTab("oneYear")}
          id={activeTab === "oneYear" && "active"}
        >
          One Year
        </button>
      </div>
    </section>
  );
}
