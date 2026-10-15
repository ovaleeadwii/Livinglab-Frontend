import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "../index.css";
import logoImg from "../assets/logo.svg";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

/*
  DashboardPage
  ----------------------------------------------------
  Data live dari backend Agri-ICS (tabel gisting_data):
  - GET {API}/gisting/latest              -> kartu, tiap 1 detik
  - GET {API}/gisting/chart?period=1D|7D|30D -> grafik, tiap 1 menit
  - GET {API}/gisting/download?period=... -> CSV
  Di produksi {API} = /api (diteruskan nginx ke backend).
*/

const API_BASE = (import.meta.env.VITE_API_BASE || "/api").replace(/\/$/, "");
const LIVE_INTERVAL_MS = 1000;
const CHART_INTERVAL_MS = 60000;

const PERIODS = [
  ["1D", "1 Day"],
  ["7D", "7 Day"],
  ["30D", "30 Day"],
];

const NUTRIENT_METRICS = [
  { key: "tds", label: "TDS", unit: "ppm" },
  { key: "ph", label: "pH", unit: "" },
  { key: "water_temperature", label: "Suhu Air", unit: "°C" },
  { key: "distance", label: "Jarak Muka Air", unit: "cm" },
];

const MICRO_METRICS = [
  { key: "air_temperature", label: "Suhu Udara", unit: "°C" },
  { key: "humidity", label: "Kelembapan", unit: "%RH" },
  { key: "vpd", label: "VPD", unit: "kPa" },
  { key: "co2", label: "CO₂", unit: "ppm" },
  { key: "pressure", label: "Tekanan", unit: "hPa" },
  { key: "solar_radiation", label: "Radiasi Matahari", unit: "W/m²" },
  { key: "wind_speed", label: "Kecepatan Angin", unit: "m/s" },
];

const PLANT_METRICS = [
  { key: "waterflow", label: "Waterflow", unit: "pulse/s" },
];

const COLORS = ["#176137", "#d97706"];

const formatNumber = (value) => {
  if (value === null || value === undefined || value === "") return "--";
  if (typeof value === "number") {
    return new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 2,
    }).format(value);
  }
  return value;
};

const formatTime = (iso, withDate) => {
  if (!iso) return "";
  return new Date(iso).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    ...(withDate ? { day: "2-digit", month: "short" } : {}),
    hour: "2-digit",
    minute: "2-digit",
    second: withDate ? undefined : "2-digit",
  });
};

const formatAge = (seconds) => {
  if (seconds === null || seconds === undefined) return "";
  if (seconds < 60) return `${seconds} detik lalu`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} menit lalu`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} jam lalu`;
  return `${Math.floor(seconds / 86400)} hari lalu`;
};

// Ambil data berkala; berhenti saat tab browser tidak terlihat.
function usePolling(url, intervalMs) {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  const busy = useRef(false);

  const load = useCallback(async () => {
    if (busy.current || document.hidden) return;
    busy.current = true;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setState({ data, error: null, loading: false });
    } catch (err) {
      setState((prev) => ({ ...prev, error: err.message, loading: false }));
    } finally {
      busy.current = false;
    }
  }, [url]);

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    load();
    const timer = setInterval(load, intervalMs);
    const onVisible = () => !document.hidden && load();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [load, intervalMs]);

  return state;
}

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

function ActuatorCard({ label, icon }) {
  return (
    <article className="pro-actuator-card">
      <div className="pro-actuator-top">
        <span className="pro-actuator-icon">{icon}</span>
        <span className="pro-status is-off">
          <i />
          Belum terhubung
        </span>
      </div>

      <h3>{label}</h3>

      <div className="pro-switch-state">--</div>
    </article>
  );
}

function OnlineBadge({ online, label }) {
  return (
    <span className={`pro-status ${online ? "is-on" : "is-off"}`}>
      <i />
      {label || (online ? "Online" : "Offline")}
    </span>
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

function PeriodButtons({ period, onChange }) {
  return (
    <div className="pro-periods">
      {PERIODS.map(([value, label]) => (
        <button
          type="button"
          key={value}
          className={period === value ? "active" : ""}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// Grafik garis untuk satu besaran; series = [{ label, column }]
function ChartPanel({ title, metrics, seriesFor, chart, period }) {
  const [metricKey, setMetricKey] = useState(metrics[0].key);
  const metric = metrics.find((m) => m.key === metricKey) || metrics[0];
  const rows = chart.data?.result || [];
  const series = seriesFor(metric.key);

  const chartData = {
      labels: rows.map((r) => formatTime(r.timestamp, period !== "1D")),
      datasets: series.map((s, i) => ({
        label: s.label,
        data: rows.map((r) => r[s.column]),
        borderColor: COLORS[i % COLORS.length],
        backgroundColor: COLORS[i % COLORS.length],
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.25,
        spanGaps: false,
      })),
  };

  const hasData = series.some((s) => rows.some((r) => r[s.column] !== null));

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: series.length > 1, position: "bottom" },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: ${formatNumber(ctx.parsed.y)} ${metric.unit}`,
        },
      },
    },
    scales: {
      x: { ticks: { maxTicksLimit: 8, maxRotation: 0 }, grid: { display: false } },
      y: { title: { display: !!metric.unit, text: metric.unit } },
    },
  };

  return (
    <div className="pro-chart">
      <div className="pro-chart-head">
        <h2>{title}</h2>
        <span>
          Periode {period} · rata-rata per {Math.round((chart.data?.bucket_seconds || 0) / 60)} menit
        </span>
      </div>

      <div className="pro-metric-pills">
        {metrics.map((m) => (
          <button
            type="button"
            key={m.key}
            className={m.key === metric.key ? "active" : ""}
            onClick={() => setMetricKey(m.key)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="pro-chart-body">
        {hasData ? (
          <div className="pro-chart-canvas">
            <Line data={chartData} options={options} />
          </div>
        ) : (
          <div className="pro-empty-chart">
            <strong>{chart.loading ? "Memuat grafik..." : "Belum ada data"}</strong>
            {chart.error
              ? `Gagal mengambil data grafik (${chart.error}).`
              : `Belum ada data ${metric.label} pada periode ini.`}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage({ setPage }) {
  const [activeTab, setActiveTab] = useState("nutrient");
  const [period, setPeriod] = useState("1D");
  const [downloadPeriod, setDownloadPeriod] = useState("1D");

  const live = usePolling(`${API_BASE}/gisting/latest`, LIVE_INTERVAL_MS);
  const chart = usePolling(`${API_BASE}/gisting/chart?period=${period}`, CHART_INTERVAL_MS);

  const d = live.data?.data || {};
  const online = !!live.data?.online && !live.error;
  const statusText = live.error
    ? "Server tidak terjangkau"
    : live.loading && !live.data
      ? "Menghubungkan..."
      : online
        ? "Online"
        : live.data?.data
          ? "Offline"
          : "Belum ada data";
  const updatedText = d.timestamp
    ? `Terakhir update ${formatTime(d.timestamp)} WIB (${formatAge(live.data?.age_seconds)})`
    : "Menunggu data sensor";

  const toren = (n) => ({
    online: online && !!d[`toren${n}_online`],
    tds: d[`toren${n}_tds`],
    ph: d[`toren${n}_ph`],
    water_temperature: d[`toren${n}_water_temperature`],
    distance: d[`toren${n}_distance`],
  });

  const nutrientSeries = (key) => [
    { label: "Toren 1", column: `toren1_${key}` },
    { label: "Toren 2", column: `toren2_${key}` },
  ];
  const microSeries = (key) => [{ label: MICRO_METRICS.find((m) => m.key === key)?.label, column: key }];
  const plantSeries = () => [
    { label: "Waterflow 1", column: "waterflow_1" },
    { label: "Waterflow 2", column: "waterflow_2" },
  ];

  const downloadUrl = `${API_BASE}/gisting/download?period=${downloadPeriod}`;

  const goHome = () => setPage("home");
  const goMarketplace = () => setPage("shop");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="pro-dashboard"
    >
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
        .footer {
          margin-top: 30px;
          background: #173524;
          color: #ffffff;
          border-top: 1px solid #244c32;
        }

        .footer-grid {
          width: min(1420px, calc(100% - 56px));
          margin: 0 auto;
          padding: 42px 0 24px;
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1.15fr;
          gap: 44px;
        }

        .footer-brand {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .footer-brand-icon {
          width: 52px;
          height: 52px;
          background: #ffffff;
          border-radius: 50%;
          padding: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-brand .name {
          font-size: 21px;
          font-weight: 800;
          letter-spacing: -.03em;
        }

        .footer-brand .name span {
          color: #9bd59d;
        }

        .footer-brand .tag {
          font-size: 12px;
          color: #b9c8bc;
          margin-top: 2px;
        }

        .footer-brand .desc {
          max-width: 350px;
          margin: 14px 0 0;
          color: #b9c8bc;
          font-size: 12px;
          line-height: 1.7;
        }

        .footer-col h4 {
          margin: 0 0 14px;
          color: #ffffff;
          font-size: 13px;
          font-weight: 800;
        }

        .footer-col a,
        .footer-col div {
          display: block;
          margin: 0 0 9px;
          color: #b9c8bc;
          font-size: 12px;
          text-decoration: none;
          cursor: pointer;
        }

        .footer-col a:hover {
          color: #ffffff;
        }

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
          .footer-grid {
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
          .pro-grid-3 {
            grid-template-columns: 1fr;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }
        }

        /* Live data */
        .pro-online.is-offline {
          color: #8a5a12;
        }

        .pro-online.is-offline i {
          background: #d0942b;
        }

        .pro-section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin: 0 0 12px;
        }

        .pro-section-head h2 {
          margin: 0;
          color: #35503c;
          font-size: 18px;
          font-weight: 800;
        }

        .pro-section + .pro-section {
          margin-top: 26px;
        }

        .pro-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .pro-metric-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 14px;
        }

        .pro-metric-pills button {
          height: 30px;
          padding: 0 12px;
          border: 1px solid #d7e1d8;
          border-radius: 999px;
          background: #ffffff;
          color: #516057;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .pro-metric-pills button.active {
          background: #e6f4e9;
          border-color: #9cc9a7;
          color: #176137;
        }

        .pro-chart-body {
          height: 300px;
        }

        .pro-chart-canvas {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .pro-note {
          margin: 0 0 18px;
          padding: 12px 14px;
          border: 1px solid #ece3c8;
          border-radius: 10px;
          background: #fbf8ee;
          color: #6f6440;
          font-size: 13px;
        }

        .pro-download-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }

        .pro-download-actions .pro-periods {
          margin: 0;
        }

        a.pro-download-btn {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }

        @media (max-width: 1050px) {
          .pro-grid-4 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 720px) {
          .pro-grid-4 {
            grid-template-columns: 1fr 1fr;
          }
          .pro-download {
            flex-direction: column;
            align-items: flex-start;
          }
          .pro-download-actions {
            align-items: flex-start;
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
                Greenhouse Utama Gisting · GH-01
              </div>

              <div className={`pro-online ${online ? "" : "is-offline"}`}>
                <i />
                {statusText}
              </div>

              <div className="pro-updated">
                {updatedText}
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
              <>
                <p className="pro-note">
                  Status aktuator belum dikirim oleh perangkat di greenhouse, jadi
                  kartu di bawah belum menampilkan kondisi sebenarnya.
                </p>
                <div className="pro-grid-3">
                  <ActuatorCard label="Pompa Air" icon="💧" />
                  <ActuatorCard label="Lampu UV" icon="◉" />
                  <ActuatorCard label="Pompa Nutrisi" icon="🧪" />
                </div>
              </>
            )}

            {activeTab === "nutrient" && (
              <>
                {[1, 2].map((n) => {
                  const t = toren(n);
                  return (
                    <div className="pro-section" key={n}>
                      <div className="pro-section-head">
                        <h2>Toren {n}</h2>
                        <OnlineBadge online={t.online} />
                      </div>
                      <div className="pro-grid-4">
                        <MetricCard label="TDS" value={t.tds} unit="ppm" />
                        <MetricCard label="pH" value={t.ph} />
                        <MetricCard label="Suhu Air" value={t.water_temperature} unit="°C" />
                        <MetricCard label="Jarak Muka Air" value={t.distance} unit="cm" />
                      </div>
                    </div>
                  );
                })}

                <PeriodButtons period={period} onChange={setPeriod} />
                <ChartPanel
                  title="Nutrient Chart"
                  metrics={NUTRIENT_METRICS}
                  seriesFor={nutrientSeries}
                  chart={chart}
                  period={period}
                />
              </>
            )}

            {activeTab === "microclimate" && (
              <>
                <div className="pro-grid-3">
                  <MetricCard label="Suhu Udara" value={d.air_temperature} unit="°C" />
                  <MetricCard label="Kelembapan" value={d.humidity} unit="%RH" />
                  <MetricCard label="Tekanan Udara" value={d.pressure} unit="hPa" />
                  <MetricCard label="CO₂" value={d.co2} unit="ppm" />
                  <MetricCard label="Kecepatan Angin" value={d.wind_speed} unit="m/s" />
                  <MetricCard label="Radiasi Matahari" value={d.solar_radiation} unit="W/m²" />
                  <MetricCard label="Curah Hujan (total)" value={d.rainfall_total} unit="mm" />
                  <MetricCard label="SVP" value={d.svp} unit="kPa" />
                  <MetricCard label="AVP" value={d.avp} unit="kPa" />
                  <MetricCard label="VPD" value={d.vpd} unit="kPa" />
                </div>

                <PeriodButtons period={period} onChange={setPeriod} />
                <ChartPanel
                  title="Microclimate Chart"
                  metrics={MICRO_METRICS}
                  seriesFor={microSeries}
                  chart={chart}
                  period={period}
                />
              </>
            )}

            {activeTab === "plant" && (
              <>
                <div className="pro-grid-3">
                  <MetricCard label="Waterflow 1" value={d.waterflow_1} unit="pulse/s" />
                  <MetricCard label="Waterflow 2" value={d.waterflow_2} unit="pulse/s" />
                </div>

                <PeriodButtons period={period} onChange={setPeriod} />
                <ChartPanel
                  title="Waterflow Chart"
                  metrics={PLANT_METRICS}
                  seriesFor={plantSeries}
                  chart={chart}
                  period={period}
                />
              </>
            )}

            {activeTab === "download" && (
              <div className="pro-download">
                <div>
                  <div className="pro-eyebrow">Data Center</div>
                  <h2>Download Data Sensor</h2>
                  <p>
                    Export data sensor greenhouse dalam format CSV (jam WIB).
                    Data dirata-rata per 1 menit untuk 1 hari, per 10 menit
                    untuk 7 hari, dan per 1 jam untuk 30 hari.
                  </p>
                </div>

                <div className="pro-download-actions">
                  <div className="pro-periods">
                    {PERIODS.map(([value, label]) => (
                      <button
                        type="button"
                        key={value}
                        className={downloadPeriod === value ? "active" : ""}
                        onClick={() => setDownloadPeriod(value)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <a className="pro-download-btn" href={downloadUrl} download>
                    ↓ Download CSV {downloadPeriod}
                  </a>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="footer"
      >
        <div className="footer-grid">
          <motion.div className="footer-brand" whileHover={{ y: -2 }}>
            <motion.div className="footer-brand-icon" whileHover={{ scale: 1.04 }}>
              <img
                src={logoImg}
                alt="Agri-ICS"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </motion.div>
            <div>
              <div className="name">
                Living <span>Smart</span>
              </div>
              <div className="tag">Solusi sayur segar dan sehat</div>
              <p className="desc">
                Menghubungkan teknologi dan pertanian untuk masa depan pangan yang lebih hijau dan berkelanjutan.
              </p>
            </div>
          </motion.div>

          <div className="footer-col">
            <h4>Quick links</h4>
            <motion.a href="#home" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); setPage("home"); }}>Home</motion.a>
            <motion.a href="#dashboard" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); setPage("dashboard"); }}>Dashboard</motion.a>
            <motion.a href="#shop" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); goMarketplace(); }}>Shop</motion.a>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <motion.a href="#shop" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); goMarketplace(); }}>All Products</motion.a>
            <motion.a href="#shop" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); goMarketplace(); }}>Best Seller</motion.a>
            <motion.a href="#shop" whileHover={{ x: 3 }} onClick={(e) => { e.preventDefault(); goMarketplace(); }}>Promo</motion.a>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">📍 Gisting, Tanggamus</div>
            <div className="footer-contact-item">📞 +62 812 3456 7890</div>
            <div className="footer-contact-item">✉️ Livingmart@gmail.com</div>
          </div>
        </div>

        <div
          style={{
            marginTop: 32,
            paddingTop: 18,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            textAlign: "center",
            color: "rgba(255,255,255,0.32)",
            fontSize: 11,
          }}
        >
          Smart Agriculture • IoT • LivingLab
        </div>
      </motion.footer>
    </motion.div>
  );
}