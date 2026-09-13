import React, { useMemo, useState } from "react";
import "../index.css";
import logoImg from "../assets/logo.svg";

/*
  DashboardPage
  ----------------------------------------------------
  UI dashboard greenhouse dengan struktur data yang siap
  menerima response API/backend di kemudian hari.

  Contoh:
  <DashboardPage
    setPage={setCurrentPage}
    dashboardData={dataFromApi}
  />
*/

const defaultData = {
  greenhouse: {
    name: "Greenhouse Utama Gisting",
    code: "GH-01",
    status: "Online",
    lastUpdated: "Menunggu data sensor",
  },
  actuators: {
    waterPump: false,
    uvLamp: false,
    nutrientPump: false,
  },
  nutrient: {
    tds: null,
    waterTemperature: null,
    ph: null,
  },
  microclimate: {
    windDirection: null,
    windSpeed: null,
    pressure: null,
    roomTemperature: null,
    dhtTemperature: null,
    humidity: null,
    svp: null,
    avp: null,
    vpd: null,
  },
  plantNeeds: {
    waterFlow: null,
    soilMoisture: null,
    weight: null,
  },
  charts: {
    labels: [],
    tds: [],
  },
};

const formatNumber = (value) => {
  if (value === null || value === undefined || value === "") return "--";
  if (typeof value === "number") {
    return new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 2,
    }).format(value);
  }
  return value;
};

function MetricCard({ label, value, unit = "" }) {
  return (
    <article className="pro-metric-card">
      <div className="pro-metric-label">{label}</div>
      <div className="pro-metric-value">
        {formatNumber(value)}
        {value !== null && value !== undefined && value !== "" && (
          <span>{unit}</span>
        )}
      </div>
    </article>
  );
}

function ActuatorCard({ label, active, icon }) {
  return (
    <article className="pro-actuator-card">
      <div className="pro-actuator-top">
        <span className="pro-actuator-icon">{icon}</span>
        <span className={`pro-status ${active ? "is-on" : "is-off"}`}>
          <i />
          {active ? "Aktif" : "Tidak Aktif"}
        </span>
      </div>

      <h3>{label}</h3>

      <div className={`pro-switch-state ${active ? "is-on" : ""}`}>
        {active ? "ON" : "OFF"}
      </div>
    </article>
  );
}

function DashboardTabs({ activeTab, onChange }) {
  const tabs = [
    ["actuator", "Actuator"],
    ["nutrient", "Nutrient Tank"],
    ["microclimate", "Microclimate"],
    ["plant", "Plant Needs"],
    ["download", "Download Data"],
  ];

  return (
    <div className="pro-tabs-scroll">
      <div className="pro-tabs">
        {tabs.map(([id, label]) => (
          <button
            type="button"
            key={id}
            className={activeTab === id ? "active" : ""}
            onClick={() => onChange(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage({
  setPage,
  dashboardData = {},
  onDownloadData,
}) {
  const [activeTab, setActiveTab] = useState("actuator");
  const [period, setPeriod] = useState("1D");

  const data = useMemo(
    () => ({
      ...defaultData,
      ...dashboardData,
      greenhouse: {
        ...defaultData.greenhouse,
        ...(dashboardData.greenhouse || {}),
      },
      actuators: {
        ...defaultData.actuators,
        ...(dashboardData.actuators || {}),
      },
      nutrient: {
        ...defaultData.nutrient,
        ...(dashboardData.nutrient || {}),
      },
      microclimate: {
        ...defaultData.microclimate,
        ...(dashboardData.microclimate || {}),
      },
      plantNeeds: {
        ...defaultData.plantNeeds,
        ...(dashboardData.plantNeeds || {}),
      },
      charts: {
        ...defaultData.charts,
        ...(dashboardData.charts || {}),
      },
    }),
    [dashboardData]
  );

  const goHome = () => setPage("home");
  const goMarketplace = () => setPage("shop");

  return (
    <div className="pro-dashboard">
      <style>{`
        .pro-dashboard,
        .pro-dashboard * {
          box-sizing: border-box;
        }

        .pro-dashboard {
          min-height: 100vh;
          background: #f7f8f6;
          color: #20382a;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          overflow-x: hidden;
        }

        .pro-container {
          width: min(1420px, calc(100% - 56px));
          margin: 0 auto;
        }

        /* Header */
        .pro-header {
          background: #ffffff;
          border-bottom: 1px solid #e4e9e4;
        }

        .pro-header-inner {
          min-height: 82px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .pro-brand {
          border: 0;
          background: transparent;
          padding: 0;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          color: #183b25;
          text-align: left;
        }

        .pro-brand img {
          width: 52px;
          height: 52px;
          object-fit: contain;
          display: block;
        }

        .pro-brand-name {
          font-size: 23px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.035em;
        }

        .pro-brand-name span {
          color: #2f814b;
        }

        .pro-brand-sub {
          margin-top: 5px;
          color: #778279;
          font-size: 11px;
          font-weight: 500;
        }

        .pro-header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pro-nav-button {
          height: 46px;
          padding: 0 22px;
          border: 1px solid #d6e0d7;
          border-radius: 10px;
          background: #ffffff;
          color: #1e3a27;
          font-size: 14px;
          font-weight: 750;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          transition: border-color .18s ease, background .18s ease;
        }

        .pro-nav-button:hover {
          background: #f4f8f4;
          border-color: #b8ccb9;
        }

        .pro-nav-button.market {
          border-color: #176137;
          background: #176137;
          color: #ffffff;
        }

        .pro-nav-button.market:hover {
          background: #12542e;
          border-color: #12542e;
        }

        /* Page intro */
        .pro-intro {
          padding: 34px 0 28px;
        }

        .pro-intro-grid {
          min-height: 190px;
          padding: 30px 34px;
          border: 1px solid #dbe7dc;
          border-radius: 16px;
          background: #eef6ef;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .pro-eyebrow {
          margin-bottom: 9px;
          color: #2f814b;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .pro-intro h1 {
          margin: 0;
          color: #183b25;
          font-size: clamp(32px, 4vw, 48px);
          line-height: 1.05;
          letter-spacing: -.045em;
          font-weight: 800;
        }

        .pro-intro p {
          max-width: 760px;
          margin: 13px 0 0;
          color: #647168;
          font-size: 15px;
          line-height: 1.65;
        }

        .pro-greenhouse-info {
          flex: 0 0 285px;
          padding: 18px 20px;
          border: 1px solid #d8e5da;
          border-radius: 12px;
          background: rgba(255,255,255,.82);
        }

        .pro-greenhouse-name {
          color: #748077;
          font-size: 12px;
          line-height: 1.45;
        }

        .pro-online {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #176137;
          font-size: 15px;
          font-weight: 800;
        }

        .pro-online i {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #39a65d;
          display: block;
        }

        .pro-updated {
          margin-top: 8px;
          color: #7b857e;
          font-size: 11px;
        }

        /* Main */
        .pro-main {
          padding: 0 0 60px;
        }

        .pro-tabs-scroll {
          overflow-x: auto;
          border-bottom: 1px solid #dfe5df;
          scrollbar-width: thin;
        }

        .pro-tabs {
          display: flex;
          min-width: max-content;
          align-items: flex-end;
          gap: 2px;
        }

        .pro-tabs button {
          min-height: 51px;
          padding: 0 22px;
          border: 1px solid transparent;
          border-bottom: 0;
          border-radius: 10px 10px 0 0;
          background: transparent;
          color: #55635a;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        .pro-tabs button:hover {
          color: #176137;
          background: #f1f5f1;
        }

        .pro-tabs button.active {
          color: #176137;
          background: #ffffff;
          border-color: #dfe5df;
          position: relative;
          margin-bottom: -1px;
        }

        .pro-content {
          background: #ffffff;
          border: 1px solid #dfe5df;
          border-top: 0;
          border-radius: 0 12px 12px 12px;
          padding: 28px;
        }

        /* Cards */
        .pro-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .pro-actuator-card {
          min-width: 0;
          min-height: 190px;
          padding: 22px;
          border: 1px solid #d8e4d9;
          border-radius: 14px;
          background: #f8faf8;
        }

        .pro-actuator-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .pro-actuator-icon {
          width: 38px;
          height: 38px;
          border: 1px solid #d9e7da;
          border-radius: 9px;
          background: #edf6ee;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
        }

        .pro-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 9px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 750;
        }

        .pro-status i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: block;
        }

        .pro-status.is-off {
          background: #edf0ed;
          color: #69746c;
        }

        .pro-status.is-off i {
          background: #98a19a;
        }

        .pro-status.is-on {
          background: #e6f4e9;
          color: #176137;
        }

        .pro-status.is-on i {
          background: #37a75a;
        }

        .pro-actuator-card h3 {
          margin: 26px 0 14px;
          color: #2d4834;
          font-size: 22px;
          font-weight: 750;
          letter-spacing: -.02em;
        }

        .pro-switch-state {
          height: 43px;
          border-radius: 9px;
          background: #e7ebe7;
          color: #6d766f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
        }

        .pro-switch-state.is-on {
          background: #dff1e3;
          color: #176137;
        }

        .pro-metric-card {
          min-height: 132px;
          padding: 23px 24px;
          border: 1px solid #dce6dd;
          border-radius: 12px;
          background: #f9fbf9;
        }

        .pro-metric-label {
          color: #647269;
          font-size: 13px;
          font-weight: 650;
        }

        .pro-metric-value {
          margin-top: 12px;
          color: #1e4029;
          font-size: 30px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: -.035em;
        }

        .pro-metric-value span {
          margin-left: 5px;
          color: #738078;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0;
        }

        /* Chart */
        .pro-periods {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin: 24px 0 18px;
        }

        .pro-periods button {
          min-width: 76px;
          height: 38px;
          padding: 0 14px;
          border: 1px solid #d7e1d8;
          border-radius: 8px;
          background: #ffffff;
          color: #516057;
          font-size: 12px;
          font-weight: 750;
          cursor: pointer;
        }

        .pro-periods button.active {
          background: #176137;
          border-color: #176137;
          color: #ffffff;
        }

        .pro-chart {
          min-height: 300px;
          border: 1px solid #e3e9e4;
          border-radius: 12px;
          padding: 22px;
          background: #ffffff;
        }

        .pro-chart-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 15px;
          flex-wrap: wrap;
        }

        .pro-chart-head h2 {
          margin: 0;
          color: #294834;
          font-size: 22px;
          font-weight: 800;
        }

        .pro-chart-head span {
          color: #89918b;
          font-size: 11px;
        }

        .pro-chart-body {
          height: 205px;
          margin-top: 24px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          border-bottom: 1px solid #e5eae6;
        }

        .pro-bars {
          width: 100%;
          height: 100%;
          padding: 0 3%;
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          gap: 8px;
        }

        .pro-bar {
          width: min(38px, 8%);
          min-height: 5px;
          border-radius: 5px 5px 0 0;
          background: #79a982;
        }

        .pro-empty-chart {
          align-self: center;
          max-width: 360px;
          text-align: center;
          color: #89918b;
          font-size: 13px;
          line-height: 1.6;
        }

        .pro-empty-chart strong {
          display: block;
          margin-bottom: 4px;
          color: #405b47;
          font-size: 14px;
        }

        /* Plant */
        .pro-plant-table + .pro-plant-table {
          margin-top: 28px;
        }

        .pro-plant-table h2 {
          margin: 0 0 12px;
          color: #35503c;
          font-size: 18px;
          font-weight: 800;
        }

        /* Download */
        .pro-download {
          min-height: 210px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
          padding: 25px;
          border: 1px solid #dce6dd;
          border-radius: 12px;
          background: #f8faf8;
        }

        .pro-download h2 {
          margin: 4px 0 8px;
          color: #294834;
          font-size: 24px;
        }

        .pro-download p {
          max-width: 700px;
          margin: 0;
          color: #6c786f;
          font-size: 13px;
          line-height: 1.7;
        }

        .pro-download-btn {
          flex-shrink: 0;
          height: 43px;
          padding: 0 18px;
          border: 0;
          border-radius: 9px;
          background: #176137;
          color: #ffffff;
          font-size: 13px;
          font-weight: 750;
          cursor: pointer;
        }


        /* Footer */
        .pro-footer {
          margin-top: 30px;
          background: #173524;
          color: #ffffff;
          border-top: 1px solid #244c32;
        }

        .pro-footer-inner {
          width: min(1420px, calc(100% - 56px));
          margin: 0 auto;
          padding: 42px 0 24px;
        }

        .pro-footer-main {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1.15fr;
          gap: 44px;
          padding-bottom: 34px;
        }

        .pro-footer-brand {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .pro-footer-brand img {
          width: 52px;
          height: 52px;
          object-fit: contain;
          background: #ffffff;
          border-radius: 50%;
          padding: 3px;
        }

        .pro-footer-brand-name {
          font-size: 21px;
          font-weight: 800;
          letter-spacing: -.03em;
        }

        .pro-footer-brand-name span {
          color: #9bd59d;
        }

        .pro-footer-description {
          max-width: 350px;
          margin: 14px 0 0 64px;
          color: #b9c8bc;
          font-size: 12px;
          line-height: 1.7;
        }

        .pro-footer-column h3 {
          margin: 0 0 14px;
          color: #ffffff;
          font-size: 13px;
          font-weight: 800;
        }

        .pro-footer-column button {
          display: block;
          margin: 0 0 9px;
          padding: 0;
          border: 0;
          background: transparent;
          color: #b9c8bc;
          font: inherit;
          font-size: 12px;
          cursor: pointer;
          text-align: left;
        }

        .pro-footer-column button:hover {
          color: #ffffff;
        }

        .pro-footer-contact {
          color: #b9c8bc;
          font-size: 12px;
          line-height: 1.8;
        }

        .pro-footer-bottom {
          border-top: 1px solid rgba(255,255,255,.12);
          padding-top: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          color: #91a498;
          font-size: 11px;
        }

        .pro-footer-bottom span:last-child {
          text-align: right;
        }

        /* Responsive */
        @media (max-width: 1050px) {
          .pro-grid-3 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .pro-intro-grid {
            align-items: flex-start;
            flex-direction: column;
          }

          .pro-greenhouse-info {
            width: 100%;
            flex-basis: auto;
          }
        }

        @media (max-width: 900px) {
          .pro-footer-main {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 30px;
          }
        }

        @media (max-width: 720px) {
          .pro-container {
            width: calc(100% - 28px);
          }

          .pro-header-inner {
            min-height: auto;
            padding: 14px 0;
            align-items: flex-start;
            flex-direction: column;
          }

          .pro-header-actions {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
          }

          .pro-nav-button {
            width: 100%;
            justify-content: center;
          }

          .pro-intro {
            padding-top: 20px;
          }

          .pro-intro-grid {
            padding: 23px 20px;
            border-radius: 13px;
          }

          .pro-intro h1 {
            font-size: 32px;
          }

          .pro-intro p {
            font-size: 13px;
          }

          .pro-content {
            padding: 18px 14px;
            border-radius: 0 10px 10px 10px;
          }

          .pro-grid-3 {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .pro-actuator-card {
            min-height: 165px;
          }

          .pro-metric-card {
            min-height: 112px;
          }

          .pro-metric-value {
            font-size: 27px;
          }

          .pro-chart {
            padding: 16px;
          }

          .pro-download {
            align-items: stretch;
            flex-direction: column;
            padding: 19px;
          }

          .pro-download-btn {
            width: 100%;
          }

          .pro-footer-inner {
            width: calc(100% - 28px);
            padding: 34px 0 20px;
          }

          .pro-footer-main {
            grid-template-columns: 1fr;
            gap: 25px;
            padding-bottom: 26px;
          }

          .pro-footer-description {
            margin-left: 0;
          }

          .pro-footer-bottom {
            align-items: flex-start;
            flex-direction: column;
          }

          .pro-footer-bottom span:last-child {
            text-align: left;
          }
        }

        @media (max-width: 390px) {
          .pro-header-actions {
            grid-template-columns: 1fr;
          }

          .pro-brand-name {
            font-size: 20px;
          }

          .pro-brand img {
            width: 46px;
            height: 46px;
          }

          .pro-intro h1 {
            font-size: 29px;
          }

          .pro-tabs button {
            padding: 0 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pro-nav-button {
            transition: none;
          }
        }
      `}</style>

      {/* HEADER */}
      <header className="pro-header">
        <div className="pro-container pro-header-inner">
          <button
            type="button"
            className="pro-brand"
            onClick={goHome}
            aria-label="Kembali ke Home"
          >
            <img src={logoImg} alt="Agri-ICS" />
            <div>
              <div className="pro-brand-name">
                AGRI-<span>ICS</span>
              </div>
              <div className="pro-brand-sub">
                Solusi sayur segar dan sehat
              </div>
            </div>
          </button>

          <div className="pro-header-actions">
            <button
              type="button"
              className="pro-nav-button"
              onClick={goHome}
            >
              <span>⌂</span>
              Home
            </button>

            <button
              type="button"
              className="pro-nav-button market"
              onClick={goMarketplace}
            >
              <span>🛒</span>
              Marketplace
            </button>
          </div>
        </div>
      </header>

      {/* INTRO */}
      <section className="pro-intro">
        <div className="pro-container">
          <div className="pro-intro-grid">
            <div>
              <div className="pro-eyebrow">Greenhouse Monitoring</div>
              <h1>Dashboard Greenhouse</h1>
              <p>
                Pantau kondisi lingkungan, nutrisi, aktuator, dan kebutuhan
                tanaman dari satu dashboard operasional.
              </p>
            </div>

            <div className="pro-greenhouse-info">
              <div className="pro-greenhouse-name">
                {data.greenhouse.name} · {data.greenhouse.code}
              </div>

              <div className="pro-online">
                <i />
                {data.greenhouse.status}
              </div>

              <div className="pro-updated">
                {data.greenhouse.lastUpdated}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="pro-main">
        <div className="pro-container">
          <DashboardTabs
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          <section className="pro-content">
            {activeTab === "actuator" && (
              <div className="pro-grid-3">
                <ActuatorCard
                  label="Pompa Air"
                  active={data.actuators.waterPump}
                  icon="💧"
                />
                <ActuatorCard
                  label="Lampu UV"
                  active={data.actuators.uvLamp}
                  icon="◉"
                />
                <ActuatorCard
                  label="Pompa Nutrisi"
                  active={data.actuators.nutrientPump}
                  icon="🧪"
                />
              </div>
            )}

            {activeTab === "nutrient" && (
              <>
                <div className="pro-grid-3">
                  <MetricCard
                    label="TDS"
                    value={data.nutrient.tds}
                    unit="mg/L"
                  />
                  <MetricCard
                    label="Water Temperature"
                    value={data.nutrient.waterTemperature}
                    unit="°C"
                  />
                  <MetricCard
                    label="pH"
                    value={data.nutrient.ph}
                  />
                </div>

                <div className="pro-periods">
                  {[
                    ["1D", "1 Day"],
                    ["7D", "7 Day"],
                    ["30D", "30 Day"],
                  ].map(([value, label]) => (
                    <button
                      type="button"
                      key={value}
                      className={period === value ? "active" : ""}
                      onClick={() => setPeriod(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="pro-chart">
                  <div className="pro-chart-head">
                    <h2>Nutrient Chart</h2>
                    <span>Periode {period}</span>
                  </div>

                  <div className="pro-chart-body">
                    {data.charts.tds?.length ? (
                      <div className="pro-bars">
                        {data.charts.tds.map((value, index) => (
                          <div
                            className="pro-bar"
                            key={index}
                            style={{
                              height: `${Math.max(
                                5,
                                Math.min(100, Number(value) || 5)
                              )}%`,
                            }}
                            title={String(value)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="pro-empty-chart">
                        <strong>Belum ada data sensor</strong>
                        Grafik akan terisi otomatis setelah endpoint
                        backend mengirimkan data TDS.
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTab === "microclimate" && (
              <div className="pro-grid-3">
                <MetricCard
                  label="Wind Direction"
                  value={data.microclimate.windDirection}
                />
                <MetricCard
                  label="Wind Speed"
                  value={data.microclimate.windSpeed}
                  unit="m/s"
                />
                <MetricCard
                  label="Barometric Pressure"
                  value={data.microclimate.pressure}
                  unit="hPa"
                />
                <MetricCard
                  label="Room Temperature"
                  value={data.microclimate.roomTemperature}
                  unit="°C"
                />
                <MetricCard
                  label="Temperature DHT"
                  value={data.microclimate.dhtTemperature}
                  unit="°C"
                />
                <MetricCard
                  label="Humidity"
                  value={data.microclimate.humidity}
                  unit="%RH"
                />
                <MetricCard
                  label="SVP"
                  value={data.microclimate.svp}
                  unit="kPa"
                />
                <MetricCard
                  label="AVP"
                  value={data.microclimate.avp}
                  unit="kPa"
                />
                <MetricCard
                  label="VPD"
                  value={data.microclimate.vpd}
                  unit="kPa"
                />
              </div>
            )}

            {activeTab === "plant" && (
              <>
                {[1, 2, 3].map((table) => (
                  <div className="pro-plant-table" key={table}>
                    <h2>Table {table}</h2>

                    <div className="pro-grid-3">
                      <MetricCard
                        label="Water Flow"
                        value={data.plantNeeds.waterFlow}
                        unit="L/H"
                      />
                      <MetricCard
                        label="Soil Moisture"
                        value={data.plantNeeds.soilMoisture}
                        unit="%"
                      />
                      <MetricCard
                        label="Weight"
                        value={data.plantNeeds.weight}
                        unit="kg"
                      />
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === "download" && (
              <div className="pro-download">
                <div>
                  <div className="pro-eyebrow">Data Center</div>
                  <h2>Download Data Sensor</h2>
                  <p>
                    Export data sensor greenhouse untuk analisis, dokumentasi,
                    dan pelaporan. Fungsi ini siap dihubungkan ke endpoint
                    backend saat API sudah tersedia.
                  </p>
                </div>

                <button
                  type="button"
                  className="pro-download-btn"
                  onClick={onDownloadData}
                >
                  ↓ Download Data
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

     {/* =====================================================
          FOOTER
      ===================================================== */}

      <motion.footer
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.7,
        }}
        className="footer"
      >
        <div className="footer-grid">

          {/* BRAND */}

          <motion.div
            className="footer-brand"
            whileHover={{
              y: -2,
            }}
          >
            <motion.div
              className="footer-brand-icon"
              whileHover={{
                scale: 1.04,
              }}
            >
              <img
                src={logoImg}
                alt="Agri-ICS"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </motion.div>

            <div>
              <div className="name">
                Living Smart
              </div>

              <div className="tag">
                Solusi sayur segar dan sehat
              </div>

              <p className="desc">
                Menghubungkan teknologi dan pertanian
                untuk masa depan pangan yang lebih hijau
                dan berkelanjutan.
              </p>
            </div>
          </motion.div>

          {/* QUICK LINKS */}

          <div className="footer-col">
            <h4>Quick links</h4>

            <motion.a
              href="#home"
              whileHover={{
                x: 3,
              }}
              onClick={(e) => {
                e.preventDefault();
                setPage("home");
              }}
            >
              Home
            </motion.a>

            <motion.a
              href="#dashboard"
              whileHover={{
                x: 3,
              }}
              onClick={(e) => {
                e.preventDefault();
                setPage("dashboard");
              }}
            >
              Dashboard
            </motion.a>

            <motion.a
              href="#shop"
              whileHover={{
                x: 3,
              }}
              onClick={(e) => {
                e.preventDefault();
                handleMarketplace();
              }}
            >
              Shop
            </motion.a>
          </div>

          {/* SHOP */}

          <div className="footer-col">
            <h4>Shop</h4>

            <motion.a
              href="#shop"
              whileHover={{
                x: 3,
              }}
              onClick={(e) => {
                e.preventDefault();
                handleMarketplace();
              }}
            >
              All Products
            </motion.a>

            <motion.a
              href="#shop"
              whileHover={{
                x: 3,
              }}
              onClick={(e) => {
                e.preventDefault();
                handleMarketplace();
              }}
            >
              Best Seller
            </motion.a>

            <motion.a
              href="#shop"
              whileHover={{
                x: 3,
              }}
              onClick={(e) => {
                e.preventDefault();
                handleMarketplace();
              }}
            >
              Promo
            </motion.a>
          </div>

          {/* INFORMATION */}

          <div className="footer-col">
            <h4>Information</h4>

            <motion.a
              href="#faq"
              whileHover={{
                x: 3,
              }}
            >
              FAQ
            </motion.a>

            <motion.a
              href="#terms"
              whileHover={{
                x: 3,
              }}
            >
              Terms &amp; Conditions
            </motion.a>

            <motion.a
              href="#privacy"
              whileHover={{
                x: 3,
              }}
            >
              Privacy Policy
            </motion.a>
          </div>

          {/* CONTACT */}

          <div className="footer-col">
            <h4>Contact Us</h4>

            <motion.div
              className="footer-contact-item"
              whileHover={{
                x: 3,
              }}
            >
              📍 Gisting, Tanggamus
            </motion.div>

            <motion.div
              className="footer-contact-item"
              whileHover={{
                x: 3,
              }}
            >
              📞 +62 812 3456 7890
            </motion.div>

            <motion.div
              className="footer-contact-item"
              whileHover={{
                x: 3,
              }}
            >
              ✉️ Livingmart@gmail.com
            </motion.div>
          </div>

        </div>

        <div
          style={{
            marginTop: 32,
            paddingTop: 18,
            borderTop:
              "1px solid rgba(255,255,255,0.08)",
            textAlign: "center",
            color:
              "rgba(255,255,255,0.32)",
            fontSize: 11,
          }}
        >
          Smart Agriculture • IoT • LivingLab
        </div>
      </motion.footer>
      </motion.div>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            style={{
              position: "fixed",
              inset: 0,
              width: "100vw",
              height: "100dvh",
              zIndex: 999999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              background:
                "linear-gradient(135deg, #092B17 0%, #123D22 55%, #17351E 100%)",
            }}
          >
            <motion.div
              animate={{
                opacity: [0.12, 0.27, 0.12],
                scale: [0.84, 1.08, 0.84],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 320,
                height: 320,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: "#B9EE91",
                filter: "blur(100px)",
              }}
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.82,
                y: 12,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: -7,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.035, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  width: 120,
                  height: 120,
                  padding: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background: "#FFFFFF",
                  boxShadow:
                    "0 0 70px rgba(185,238,145,0.22)",
                }}
              >
                <img
                  src={logoImg}
                  alt="Agri-ICS"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.6,
                }}
                style={{
                  marginTop: 22,
                  color: "#FFFFFF",
                  fontSize: 30,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                AGRI
                <span style={{ color: "#B9EE91" }}>
                  -ICS
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.55,
                  duration: 0.6,
                }}
                style={{
                  margin: "7px 0 0",
                  color: "rgba(255,255,255,0.48)",
                  fontSize: 11,
                  letterSpacing: "0.22em",
                }}
              >
                SMART AGRICULTURE • IoT • LIVINGLAB
              </motion.p>

              <motion.div
                initial={{
                  width: 0,
                  opacity: 0,
                }}
                animate={{
                  width: 80,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.8,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
                style={{
                  height: 1,
                  marginTop: 26,
                  background:
                    "rgba(185,238,145,0.5)",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
