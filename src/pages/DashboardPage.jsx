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
import {
  
Power,
  
Droplets,
  
CloudSun,
  
Sprout,
  
Download,
  
Lightbulb,
  
FlaskConical,
  
Thermometer,
  
Waves,
  
Gauge,
  
Wind,
  
Sun,
  
CloudRain,
  
Mail,
  
ShieldCheck,
  
KeyRound,
  
CheckCircle2,
  
Lock,
} from "lucide-react";
import "../index.css";
import logoImg from "../assets/logo.svg";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);
/*
  
DashboardPage
  
----------------------------------------------------
  
Data live dari backend Agri-ICS (tabel gisting_data):
  - 
GET {API}/gisting/latest              -> kartu, tiap 1 detik
  - 
GET {API}/gisting/chart?period=1D|7D|30D -> grafik, tiap 1 menit
  - 
GET {API}/gisting/download?period=... -> CSV
  
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
const COLORS = ["#1f7a43", "#e08a00"];
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
function MetricCard({ label, value, unit = "", icon }) {
  
return (
    
<article className="pro-metric-card">
      
<div className="pro-metric-label">
        
{icon && <span className="pro-metric-icon">{icon}</span>}
        
{label}
      
</div>
      
<div className="pro-metric-value">
        
{formatNumber(value)}
        
{value !== null && value !== undefined && value !== "" && (
          
<span>{unit}</span>
        
)}
      
</div>
    
</article>
  
);
}
function ActuatorCard({ label, desc, icon, warna }) {
  
// Belum ada data aktuator dari perangkat, jadi semua nilai masih "--"
  
return (
    
<article className="act-card">
      
<div className="act-head">
        
<span className="act-icon" style={{ background: warna.bg, color: warna.fg }}>{icon}</span>
        
<div className="act-title">
          
<h3>{label}</h3>
          
<p>{desc}</p>
        
</div>
      
</div>
      
<div className="act-switch-row">
        
<div>
          
<small>Status</small>
          
<b>Belum terhubung</b>
        
</div>
        
<span className="act-switch" aria-disabled="true" title="Belum terhubung ke perangkat">
          
<i />
        
</span>
      
</div>
      
<div className="act-info">
        
<div><small>Mode</small><b>--</b></div>
        
<div><small>Jadwal</small><b>--</b></div>
        
<div><small>Terakhir aktif</small><b>--</b></div>
      
</div>
    
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
    
["actuator", "Actuator", <Power size={17} />],
    
["nutrient", "Nutrient Tank", <Droplets size={17} />],
    
["microclimate", "Microclimate", <CloudSun size={17} />],
    
["plant", "Plant Needs", <Sprout size={17} />],
    
["download", "Download Data", <Download size={17} />],
  
];
  
return (
    
<div className="dash-tabs-scroll">
      
<div className="dash-tabs">
        
{tabs.map(([id, label, icon]) => (
          
<button
            
type="button"
            
key={id}
            
className={activeTab === id ? "active" : ""}
            
onClick={() => onChange(id)}
          
>
            
{icon}
            
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
// Ringkasan angka untuk satu garis grafik
const hitungRingkasan = (values) => {
  
const angka = values.filter((v) => typeof v === "number" && !Number.isNaN(v));
  
if (angka.length === 0) return null;
  
const total = angka.reduce((a, b) => a + b, 0);
  
return {
    
terakhir: angka[angka.length - 1],
    
min: Math.min(...angka),
    
rata: total / angka.length,
    
maks: Math.max(...angka),
  
};
};
// Warna gradasi di bawah garis grafik
const gradasi = (warna) => (ctx) => {
  
const { chart } = ctx;
  
const area = chart.chartArea;
  
if (!area) return `${warna}22`;
  
const g = chart.ctx.createLinearGradient(0, area.top, 0, area.bottom);
  
g.addColorStop(0, `${warna}55`);
  
g.addColorStop(1, `${warna}00`);
  
return g;
};
// Grafik area untuk satu besaran; series = [{ label, column }]
function ChartPanel({ title, metrics, seriesFor, chart, period, onPeriodChange }) {
  
const [metricKey, setMetricKey] = useState(metrics[0].key);
  
const metric = metrics.find((m) => m.key === metricKey) || metrics[0];
  
const rows = chart.data?.result || [];
  
const series = seriesFor(metric.key);
  
const chartData = {
    
labels: rows.map((r) => formatTime(r.timestamp, period !== "1D")),
    
datasets: series.map((s, i) => {
      
const warna = COLORS[i % COLORS.length];
      
return {
        
label: s.label,
        
data: rows.map((r) => r[s.column]),
        
borderColor: warna,
        
backgroundColor: gradasi(warna),
        
fill: series.length === 1 ? "origin" : false,
        
borderWidth: 2.5,
        
pointRadius: 0,
        
pointHoverRadius: 5,
        
pointHoverBackgroundColor: "#ffffff",
        
pointHoverBorderColor: warna,
        
pointHoverBorderWidth: 2,
        
tension: 0.35,
        
spanGaps: false,
      
};
    
}),
  
};
  
const hasData = series.some((s) => rows.some((r) => r[s.column] !== null && r[s.column] !== undefined));
  
const ringkasan = series.map((s) => ({
    
label: s.label,
    
warna: COLORS[series.indexOf(s) % COLORS.length],
    
nilai: hitungRingkasan(rows.map((r) => r[s.column])),
  
}));
  
const options = {
    
responsive: true,
    
maintainAspectRatio: false,
    
animation: false,
    
interaction: { mode: "index", intersect: false },
    
plugins: {
      
legend: {
        
display: series.length > 1,
        
position: "top",
        
align: "end",
        
labels: { usePointStyle: true, pointStyle: "circle", boxWidth: 8, boxHeight: 8, color: "#55635a", font: { weight: 600 } },
      
},
      
tooltip: {
        
backgroundColor: "#173524",
        
titleColor: "#b9c8bc",
        
bodyColor: "#ffffff",
        
padding: 12,
        
cornerRadius: 10,
        
displayColors: series.length > 1,
        
usePointStyle: true,
        
callbacks: {
          
label: (ctx) =>
            
` ${ctx.dataset.label}: ${formatNumber(ctx.parsed.y)} ${metric.unit}`,
        
},
      
},
    
},
    
scales: {
      
x: {
        
ticks: { maxTicksLimit: 7, maxRotation: 0, color: "#8a958d", font: { size: 11 } },
        
grid: { display: false },
        
border: { display: false },
      
},
      
y: {
        
ticks: { color: "#8a958d", font: { size: 11 }, maxTicksLimit: 6 },
        
grid: { color: "#eef1ee" },
        
border: { display: false },
        
title: { display: !!metric.unit, text: metric.unit, color: "#8a958d" },
      
},
    
},
  
};
  
return (
    
<div className="chart-card">
      
<div className="chart-card-head">
        
<div>
          
<h2>{title}</h2>
          
<span>
            
{metric.label}
            
{metric.unit ? ` (${metric.unit})` : ""} · rata-rata per{" "}
            
{Math.round((chart.data?.bucket_seconds || 0) / 60)} menit
          
</span>
        
</div>
        
<PeriodButtons period={period} onChange={onPeriodChange} />
      
</div>
      
{metrics.length > 1 && (
        
<div className="chart-pills">
          
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
      
)}
      
{hasData && (
        
<div className="chart-stats">
          
{ringkasan.map((r) => (
            
<div className="chart-stat-row" key={r.label}>
              
{series.length > 1 && (
                
<span className="chart-stat-name">
                  
<i style={{ background: r.warna }} />
                  
{r.label}
                
</span>
              
)}
              
{[
                
["Terakhir", r.nilai?.terakhir],
                
["Minimum", r.nilai?.min],
                
["Rata-rata", r.nilai?.rata],
                
["Maksimum", r.nilai?.maks],
              
].map(([judul, nilai]) => (
                
<div className="chart-stat" key={judul}>
                  
<small>{judul}</small>
                  
<b>
                    
{formatNumber(nilai ?? null)}
                    
{nilai !== undefined && metric.unit && <span> {metric.unit}</span>}
                  
</b>
                
</div>
              
))}
            
</div>
          
))}
        
</div>
      
)}
      
<div className="chart-body">
        
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
/*
  
Download data harus verifikasi email dulu:
  1. 
POST {API}/download/request-otp  { name, email, purpose } -> server kirim kode 6 angka ke email
  2. 
POST {API}/download/verify-otp   { email, code }          -> { token, expires_in }
  3. 
GET  {API}/gisting/download?period=1D&token=...            -> CSV (server cek token)
  
Selama server belum punya endpoint ini, di localhost (npm run dev) otomatis pakai mode uji.
*/
const DOWNLOAD_TOKEN_KEY = "agriDownloadAccess";
const bacaAksesDownload = () => {
  
try {
    
const akses = JSON.parse(sessionStorage.getItem(DOWNLOAD_TOKEN_KEY));
    
if (akses && akses.expiresAt > Date.now()) return akses;
  
} catch {
    
// abaikan data rusak
  
}
  
return null;
};
const postJson = async (url, body) => {
  
const res = await fetch(url, {
    
method: "POST",
    
headers: { "Content-Type": "application/json", Accept: "application/json" },
    
body: JSON.stringify(body),
  
});
  
const data = await res.json().catch(() => ({}));
  
return { res, data };
};
function DownloadPanel({ period, onPeriodChange }) {
  
const [akses, setAkses] = useState(bacaAksesDownload);
  
const [langkah, setLangkah] = useState(() => (bacaAksesDownload() ? "siap" : "form"));
  
const [nama, setNama] = useState("");
  
const [email, setEmail] = useState("");
  
const [keperluan, setKeperluan] = useState("");
  
const [kode, setKode] = useState("");
  
const [kodeUji, setKodeUji] = useState("");
  
const [error, setError] = useState("");
  
const [loading, setLoading] = useState(false);
  
const [tungguKirimUlang, setTungguKirimUlang] = useState(0);
  
useEffect(() => {
    
if (tungguKirimUlang <= 0) return;
    
const t = setTimeout(() => setTungguKirimUlang((n) => n - 1), 1000);
    
return () => clearTimeout(t);
  
}, [tungguKirimUlang]);
  
const kirimKode = async (e) => {
    
e?.preventDefault();
    
setError("");
    
if (!nama.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      
setError("Isi nama dan email yang benar dulu ya.");
      
return;
    
}
    
setLoading(true);
    
try {
      
const { res, data } = await postJson(`${API_BASE}/download/request-otp`, {
        
name: nama.trim(),
        
email: email.trim(),
        
purpose: keperluan.trim(),
      
});
      
if (res.ok) {
        
setKodeUji("");
      
} else if (res.status === 404 && import.meta.env.DEV) {
        
// Server belum punya fitur ini: mode uji khusus localhost
        
setKodeUji(String(Math.floor(100000 + Math.random() * 900000)));
      
} else {
        
throw new Error(data.message || `Gagal mengirim kode (HTTP ${res.status}).`);
      
}
      
setKode("");
      
setLangkah("kode");
      
setTungguKirimUlang(60);
    
} catch (err) {
      
setError(err.message || "Tidak dapat terhubung ke server.");
    
} finally {
      
setLoading(false);
    
}
  
};
  
const cekKode = async (e) => {
    
e.preventDefault();
    
setError("");
    
if (!/^\d{6}$/.test(kode)) {
      
setError("Kode terdiri dari 6 angka.");
      
return;
    
}
    
setLoading(true);
    
try {
      
let token;
      
let berlakuDetik = 30 * 60;
      
if (kodeUji) {
        
if (kode !== kodeUji) throw new Error("Kode salah. Cek lagi email kamu.");
        
token = "mode-uji";
      
} else {
        
const { res, data } = await postJson(`${API_BASE}/download/verify-otp`, {
          
email: email.trim(),
          
code: kode,
        
});
        
if (!res.ok) throw new Error(data.message || "Kode salah atau sudah kedaluwarsa.");
        
token = data.token;
        
berlakuDetik = data.expires_in || berlakuDetik;
      
}
      
const baru = { token, email: email.trim(), expiresAt: Date.now() + berlakuDetik * 1000 };
      
sessionStorage.setItem(DOWNLOAD_TOKEN_KEY, JSON.stringify(baru));
      
setAkses(baru);
      
setLangkah("siap");
    
} catch (err) {
      
setError(err.message);
    
} finally {
      
setLoading(false);
    
}
  
};
  
const gantiEmail = () => {
    
sessionStorage.removeItem(DOWNLOAD_TOKEN_KEY);
    
setAkses(null);
    
setKode("");
    
setLangkah("form");
  
};
  
const downloadUrl = akses
    
? `${API_BASE}/gisting/download?period=${period}&token=${encodeURIComponent(akses.token)}`
    
: "#";
  
const sisaMenit = akses ? Math.max(1, Math.round((akses.expiresAt - Date.now()) / 60000)) : 0;
  
return (
    
<div className="dl-wrap">
      
<div className="dl-intro">
        
<div className="pro-eyebrow">Data Center</div>
        
<h2>Download Data Sensor</h2>
        
<p>
          
Export data sensor greenhouse dalam format CSV (jam WIB). Data dirata-rata per 1 menit
          
untuk 1 hari, per 10 menit untuk 7 hari, dan per 1 jam untuk 30 hari.
        
</p>
        
<ol className="dl-steps">
          
<li className={langkah === "form" ? "aktif" : "selesai"}>
            
<span>{langkah === "form" ? "1" : <CheckCircle2 size={16} />}</span> Isi nama &amp; email
          
</li>
          
<li className={langkah === "kode" ? "aktif" : langkah === "siap" ? "selesai" : ""}>
            
<span>{langkah === "siap" ? <CheckCircle2 size={16} /> : "2"}</span> Masukkan kode dari email
          
</li>
          
<li className={langkah === "siap" ? "aktif" : ""}>
            
<span>3</span> Download CSV
          
</li>
        
</ol>
      
</div>
      
<div className="dl-box">
        
{langkah === "form" && (
          
<form onSubmit={kirimKode}>
            
<div className="dl-box-head">
              
<span className="dl-box-icon"><Lock size={20} /></span>
              
<div>
                
<h3>Verifikasi dulu sebelum download</h3>
                
<p>Kami kirim kode 6 angka ke email kamu.</p>
              
</div>
            
</div>
            
<label>
              
Nama lengkap
              
<input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama kamu" />
            
</label>
            
<label>
              
Email
              
<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@email.com" />
            
</label>
            
<label>
              
<span>Keperluan <small>(opsional)</small></span>
              
<input value={keperluan} onChange={(e) => setKeperluan(e.target.value)} placeholder="Contoh: penelitian skripsi" />
            
</label>
            
{error && <div className="dl-error">{error}</div>}
            
<button type="submit" className="dl-btn" disabled={loading}>
              
<Mail size={17} /> {loading ? "Mengirim..." : "Kirim Kode ke Email"}
            
</button>
          
</form>
        
)}
        
{langkah === "kode" && (
          
<form onSubmit={cekKode}>
            
<div className="dl-box-head">
              
<span className="dl-box-icon"><KeyRound size={20} /></span>
              
<div>
                
<h3>Masukkan kode verifikasi</h3>
                
<p>Kode dikirim ke <b>{email}</b></p>
              
</div>
            
</div>
            
{kodeUji && (
              
<div className="dl-uji">
                
Mode uji (server belum punya fitur kirim email). Kodenya: <b>{kodeUji}</b>
              
</div>
            
)}
            
<input
              
className="dl-kode"
              
inputMode="numeric"
              
maxLength={6}
              
value={kode}
              
onChange={(e) => setKode(e.target.value.replace(/\D/g, ""))}
              
placeholder="••••••"
              
autoFocus
            
/>
            
{error && <div className="dl-error">{error}</div>}
            
<button type="submit" className="dl-btn" disabled={loading}>
              
<ShieldCheck size={17} /> {loading ? "Mengecek..." : "Verifikasi"}
            
</button>
            
<div className="dl-links">
              
<button type="button" onClick={() => setLangkah("form")}>Ganti email</button>
              
<button type="button" disabled={tungguKirimUlang > 0 || loading} onClick={kirimKode}>
                
{tungguKirimUlang > 0 ? `Kirim ulang (${tungguKirimUlang})` : "Kirim ulang kode"}
              
</button>
            
</div>
          
</form>
        
)}
        
{langkah === "siap" && akses && (
          
<div>
            
<div className="dl-box-head">
              
<span className="dl-box-icon ok"><CheckCircle2 size={20} /></span>
              
<div>
                
<h3>Email terverifikasi</h3>
                
<p>{akses.email} · akses berlaku ±{sisaMenit} menit</p>
              
</div>
            
</div>
            
<div className="dl-label">Pilih periode</div>
            
<PeriodButtons period={period} onChange={onPeriodChange} />
            
<a className="dl-btn" href={downloadUrl} download>
              
<Download size={17} /> Download CSV {period}
            
</a>
            
<div className="dl-links">
              
<button type="button" onClick={gantiEmail}>Pakai email lain</button>
            
</div>
          
</div>
        
)}
      
</div>
    
</div>
  
);
}
export default function DashboardPage({ setPage, user }) {
  
const [activeTab, setActiveTab] = useState("nutrient");
  // Menu samping (sama seperti di Shop)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
        
.hdr-menu-btn {
  position: relative;
  height: 46px;
  padding: 0 16px 0 13px;
  border: none;
  border-radius: 12px;
  background: #165c35;
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(22, 92, 53, 0.22);
  transition: .2s ease;
  flex-shrink: 0;
}
.hdr-menu-btn:hover { background: #124d2b; transform: translateY(-1px); }
.hdr-menu-badge {
  position: absolute;
  top: -7px;
  right: -7px;
  min-width: 21px;
  height: 21px;
  padding: 0 5px;
  border-radius: 999px;
  background: #e08a00;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
}
.shop-menu-btn.hdr-akun { background: #f4faf5; border-color: #d7e8da; }
.shop-menu-btn.hdr-akun span:first-child { width: 40px; height: 40px; border-radius: 50%; overflow: hidden; font-size: 18px; }
.shop-menu-btn.hdr-akun img { width: 100%; height: 100%; object-fit: cover; }
.shop-menu-btn.hdr-akun span:last-child { display: flex; flex-direction: column; min-width: 0; }
.shop-menu-btn.hdr-akun strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.shop-menu-btn.hdr-akun small { color: #6d7b72; font-size: 12px; font-weight: 500; }
@media (max-width: 640px) {
  .hdr-menu-btn span { display: none; }
  .hdr-menu-btn { width: 46px; padding: 0; justify-content: center; }
}
.shop-menu-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 15px;
  border: 1px solid #e6eee7;
  border-radius: 12px;
  background: #fff;
  color: #173524;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  transition: .2s ease;
}
.shop-menu-btn:hover { background: #eff8f1; border-color: #cfe3d2; transform: translateX(-2px); }
.shop-menu-btn.aktif { border-color: #1f7a43; background: #eff8f1; }
.shop-menu-btn span:first-child {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: #eef7f0;
  color: #176137;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
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
            
align-items: center;
            
flex-direction: row;
          
}
          
.pro-header-actions {
            
width: auto;
            
display: flex;
          
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
        
/* ===== Menu tab baru (pil dengan ikon) ===== */
        
.dash-tabs-scroll {
          
overflow-x: auto;
          
scrollbar-width: none;
          
margin-bottom: 18px;
        
}
        
.dash-tabs-scroll::-webkit-scrollbar { display: none; }
        
.dash-tabs {
          
display: inline-flex;
          
min-width: max-content;
          
gap: 6px;
          
padding: 6px;
          
background: #ffffff;
          
border: 1px solid #e1e8e2;
          
border-radius: 16px;
          
box-shadow: 0 6px 18px rgba(20, 60, 35, 0.05);
        
}
        
.dash-tabs button {
          
display: inline-flex;
          
align-items: center;
          
gap: 8px;
          
min-height: 44px;
          
padding: 0 18px;
          
border: 0;
          
border-radius: 11px;
          
background: transparent;
          
color: #55635a;
          
font-size: 14px;
          
font-weight: 700;
          
cursor: pointer;
          
white-space: nowrap;
          
transition: background .2s, color .2s;
        
}
        
.dash-tabs button:hover { background: #f1f6f2; color: #176137; }
        
.dash-tabs button.active {
          
background: #176137;
          
color: #ffffff;
          
box-shadow: 0 6px 14px rgba(23, 97, 55, 0.25);
        
}
        
.pro-content {
          
border-top: 1px solid #dfe5df;
          
border-radius: 18px;
        
}
        
/* Ikon kecil di kartu angka */
        
.pro-metric-label {
          
display: flex;
          
align-items: center;
          
gap: 8px;
        
}
        
.pro-metric-icon {
          
width: 30px;
          
height: 30px;
          
border-radius: 9px;
          
background: #e7f5ea;
          
color: #1f7a43;
          
display: inline-flex;
          
align-items: center;
          
justify-content: center;
          
flex-shrink: 0;
        
}
        
/* ===== Actuator baru ===== */
        
.act-summary {
          
display: flex;
          
justify-content: space-between;
          
align-items: center;
          
gap: 16px;
          
flex-wrap: wrap;
          
margin-bottom: 14px;
        
}
        
.act-summary h2 { margin: 0; font-size: 20px; font-weight: 800; color: #183b25; }
        
.act-summary p { margin: 4px 0 0; color: #6d7b72; font-size: 13px; }
        
.act-summary-stats { display: flex; gap: 10px; }
        
.act-summary-stats div {
          
min-width: 92px;
          
background: #f5f8f5;
          
border: 1px solid #e3ebe5;
          
border-radius: 12px;
          
padding: 8px 14px;
          
text-align: center;
        
}
        
.act-summary-stats b { display: block; font-size: 20px; color: #183b25; }
        
.act-summary-stats small { color: #6d7b72; font-size: 12px; }
        
.act-card {
          
min-width: 0;
          
background: #ffffff;
          
border: 1px solid #e3ebe5;
          
border-radius: 18px;
          
padding: 20px;
          
display: flex;
          
flex-direction: column;
          
gap: 16px;
          
box-shadow: 0 8px 22px rgba(20, 60, 35, 0.05);
        
}
        
.act-head { display: flex; align-items: center; gap: 14px; }
        
.act-icon {
          
width: 52px;
          
height: 52px;
          
border-radius: 15px;
          
display: flex;
          
align-items: center;
          
justify-content: center;
          
flex-shrink: 0;
        
}
        
.act-title { min-width: 0; }
        
.act-title h3 { margin: 0; font-size: 17px; font-weight: 800; color: #183b25; }
        
.act-title p { margin: 3px 0 0; color: #6d7b72; font-size: 13px; }
        
.act-switch-row {
          
display: flex;
          
justify-content: space-between;
          
align-items: center;
          
background: #f6f8f6;
          
border-radius: 14px;
          
padding: 12px 14px;
        
}
        
.act-switch-row small { display: block; color: #6d7b72; font-size: 12px; }
        
.act-switch-row b { color: #8a6d1f; font-size: 14px; }
        
.act-switch {
          
width: 52px;
          
height: 30px;
          
border-radius: 999px;
          
background: #d5dcd7;
          
position: relative;
          
cursor: not-allowed;
          
flex-shrink: 0;
        
}
        
.act-switch i {
          
position: absolute;
          
top: 4px;
          
left: 4px;
          
width: 22px;
          
height: 22px;
          
border-radius: 50%;
          
background: #ffffff;
          
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
        
}
        
.act-info {
          
display: grid;
          
grid-template-columns: repeat(3, minmax(0, 1fr));
          
gap: 8px;
        
}
        
.act-info div {
          
border: 1px dashed #dfe5df;
          
border-radius: 10px;
          
padding: 8px 10px;
          
min-width: 0;
        
}
        
.act-info small { display: block; color: #8a958d; font-size: 11px; }
        
.act-info b { font-size: 14px; color: #33413a; }
        
/* ===== Grafik baru ===== */
        
.chart-card {
          
margin-top: 26px;
          
background: #ffffff;
          
border: 1px solid #e3ebe5;
          
border-radius: 18px;
          
padding: 22px;
          
box-shadow: 0 8px 22px rgba(20, 60, 35, 0.05);
        
}
        
.chart-card-head {
          
display: flex;
          
justify-content: space-between;
          
align-items: flex-start;
          
gap: 14px;
          
flex-wrap: wrap;
          
margin-bottom: 14px;
        
}
        
.chart-card-head h2 { margin: 0; font-size: 19px; font-weight: 800; color: #183b25; }
        
.chart-card-head span { display: block; margin-top: 4px; color: #6d7b72; font-size: 13px; }
        
.chart-card-head .pro-periods { margin: 0; }
        
.chart-pills {
          
display: flex;
          
gap: 8px;
          
overflow-x: auto;
          
scrollbar-width: none;
          
margin-bottom: 14px;
        
}
        
.chart-pills::-webkit-scrollbar { display: none; }
        
.chart-pills button {
          
border: 1px solid #dfe5df;
          
background: #ffffff;
          
color: #55635a;
          
border-radius: 999px;
          
padding: 7px 14px;
          
font-size: 13px;
          
font-weight: 700;
          
cursor: pointer;
          
white-space: nowrap;
        
}
        
.chart-pills button.active { background: #e7f5ea; border-color: #1f7a43; color: #176137; }
        
.chart-stats { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
        
.chart-stat-row {
          
display: grid;
          
grid-template-columns: repeat(4, minmax(0, 1fr));
          
gap: 8px;
          
align-items: stretch;
        
}
        
.chart-stat-row:has(.chart-stat-name) { grid-template-columns: 110px repeat(4, minmax(0, 1fr)); }
        
.chart-stat-name {
          
display: flex;
          
align-items: center;
          
gap: 7px;
          
font-size: 13px;
          
font-weight: 700;
          
color: #33413a;
        
}
        
.chart-stat-name i { width: 10px; height: 10px; border-radius: 50%; }
        
.chart-stat {
          
background: #f6f8f6;
          
border-radius: 12px;
          
padding: 9px 12px;
          
min-width: 0;
        
}
        
.chart-stat small { display: block; color: #8a958d; font-size: 11px; }
        
.chart-stat b { font-size: 16px; color: #183b25; }
        
.chart-stat b span { font-size: 11px; color: #8a958d; font-weight: 600; }
        
.chart-body { height: 320px; }
        
/* ===== Download dengan verifikasi email ===== */
        
.dl-wrap {
          
display: grid;
          
grid-template-columns: 1fr minmax(320px, 420px);
          
gap: 32px;
          
align-items: start;
        
}
        
.dl-intro h2 { margin: 6px 0 10px; font-size: 26px; font-weight: 800; color: #183b25; }
        
.dl-intro p { margin: 0 0 18px; color: #55635a; font-size: 14px; line-height: 1.7; }
        
.dl-steps { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        
.dl-steps li { display: flex; align-items: center; gap: 10px; color: #8a958d; font-size: 14px; font-weight: 600; }
        
.dl-steps li span {
          
width: 30px;
          
height: 30px;
          
border-radius: 50%;
          
background: #eef1ee;
          
display: flex;
          
align-items: center;
          
justify-content: center;
          
font-size: 13px;
          
font-weight: 800;
        
}
        
.dl-steps li.aktif { color: #183b25; }
        
.dl-steps li.aktif span { background: #176137; color: #ffffff; }
        
.dl-steps li.selesai { color: #1f7a43; }
        
.dl-steps li.selesai span { background: #e7f5ea; color: #1f7a43; }
        
.dl-box {
          
background: #ffffff;
          
border: 1px solid #e3ebe5;
          
border-radius: 18px;
          
padding: 22px;
          
box-shadow: 0 10px 28px rgba(20, 60, 35, 0.07);
        
}
        
.dl-box form,
        
.dl-box > div { display: flex; flex-direction: column; gap: 12px; }
        
.dl-box-head { display: flex; gap: 12px; align-items: center; margin-bottom: 4px; }
        
.dl-box-icon {
          
width: 42px;
          
height: 42px;
          
border-radius: 12px;
          
background: #fff4dd;
          
color: #b7791f;
          
display: flex;
          
align-items: center;
          
justify-content: center;
          
flex-shrink: 0;
        
}
        
.dl-box-icon.ok { background: #e7f5ea; color: #1f7a43; }
        
.dl-box-head h3 { margin: 0; font-size: 16px; font-weight: 800; color: #183b25; }
        
.dl-box-head p { margin: 2px 0 0; color: #6d7b72; font-size: 13px; overflow-wrap: anywhere; }
        
.dl-box label { display: flex; flex-direction: column; gap: 6px; font-size: 13px; font-weight: 700; color: #33413a; }
        
.dl-box label small { color: #8a958d; font-weight: 500; }
        
.dl-box input {
          
height: 44px;
          
border: 1px solid #dbe5dc;
          
border-radius: 11px;
          
padding: 0 12px;
          
font-size: 14px;
          
font-family: inherit;
          
color: #183b25;
          
background: #fbfcfb;
          
outline: none;
        
}
        
.dl-box input:focus { border-color: #1f7a43; box-shadow: 0 0 0 3px rgba(31, 122, 67, 0.12); }
        
.dl-box input.dl-kode {
          
height: 56px;
          
text-align: center;
          
font-size: 26px;
          
font-weight: 800;
          
letter-spacing: 0.4em;
        
}
        
.dl-btn {
          
height: 48px;
          
border: 0;
          
border-radius: 12px;
          
background: #176137;
          
color: #ffffff;
          
font-size: 15px;
          
font-weight: 800;
          
display: flex;
          
align-items: center;
          
justify-content: center;
          
gap: 8px;
          
cursor: pointer;
          
text-decoration: none;
        
}
        
.dl-btn:hover { background: #124d2b; }
        
.dl-btn:disabled { opacity: 0.6; cursor: wait; }
        
.dl-error {
          
background: #fdecea;
          
color: #b4372b;
          
border-radius: 10px;
          
padding: 9px 12px;
          
font-size: 13px;
        
}
        
.dl-uji {
          
background: #fbf8ee;
          
border: 1px solid #ece3c8;
          
color: #6f6440;
          
border-radius: 10px;
          
padding: 9px 12px;
          
font-size: 13px;
        
}
        
.dl-links { display: flex; justify-content: space-between; gap: 10px; }
        
.dl-links button {
          
border: 0;
          
background: none;
          
color: #176137;
          
font-size: 13px;
          
font-weight: 700;
          
cursor: pointer;
          
padding: 0;
        
}
        
.dl-links button:disabled { color: #9aa59d; cursor: default; }
        
.dl-label { font-size: 13px; font-weight: 700; color: #33413a; }
        
.dl-box .pro-periods { margin: 0; }
        
@media (max-width: 900px) {
          
.dl-wrap { grid-template-columns: 1fr; }
        
}
        
@media (max-width: 720px) {
          
.dash-tabs button { padding: 0 14px; min-height: 40px; font-size: 13px; }
          
.act-info { grid-template-columns: 1fr 1fr 1fr; }
          
.chart-card { padding: 16px; }
          
.chart-card-head .pro-periods { width: 100%; }
          
.chart-stat-row,
          
.chart-stat-row:has(.chart-stat-name) { grid-template-columns: 1fr 1fr; }
          
.chart-stat-name { grid-column: 1 / -1; }
          
.chart-body { height: 260px; }
          
.dl-intro h2 { font-size: 22px; }
          
.dl-box { padding: 16px; }
        
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
              className="hdr-menu-btn"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Buka menu"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              <span>Menu</span>
            </button>
          </div>
        
</div>
      
</header>

      {/* MENU SAMPING (sama seperti di Shop) */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(15, 35, 23, 0.32)" }}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "min(360px, 88vw)",
              height: "100%",
              background: "#fff",
              boxShadow: "-12px 0 35px rgba(0,0,0,.15)",
              padding: 24,
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 12, color: "#6d7b72" }}>AGRI-ICS</div>
                <h3 style={{ margin: "3px 0 0", color: "#173524", fontSize: 22 }}>Menu</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "1px solid #e1e8e2",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: 22,
                  color: "#526158",
                }}
              >
                ×
              </button>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <button className="shop-menu-btn hdr-akun" onClick={() => setPage(user ? "profile" : "auth")}>
                <span>{user && user.avatar ? <img src={user.avatar} alt="" /> : "👤"}</span>
                <span>
                  <strong>{user ? user.name : "Masuk / Daftar"}</strong>
                  <small>{user ? "Lihat profil saya" : "Masuk untuk belanja"}</small>
                </span>
              </button>
              <button className="shop-menu-btn" onClick={goHome}>
                <span>⌂</span><span>Home</span>
              </button>
              <button className="shop-menu-btn aktif" onClick={() => setIsMenuOpen(false)}>
                <span>▦</span><span>Dashboard</span>
              </button>
              <button className="shop-menu-btn" onClick={goMarketplace}>
                <span>🛒</span><span>Marketplace</span>
              </button>
            </div>
          </aside>
        </div>
      )}
      
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
                
<div className="act-summary">
                  
<div>
                    
<h2>Kontrol Aktuator</h2>
                    
<p>Pompa dan lampu di Greenhouse Utama Gisting.</p>
                  
</div>
                  
<div className="act-summary-stats">
                    
<div><b>3</b><small>Aktuator</small></div>
                    
<div><b>0</b><small>Terhubung</small></div>
                  
</div>
                
</div>
                
<p className="pro-note">
                  
Status aktuator belum dikirim oleh perangkat di greenhouse, jadi
                  
kartu di bawah belum menampilkan kondisi sebenarnya dan belum bisa dinyalakan dari sini.
                
</p>
                
<div className="pro-grid-3">
                  
<ActuatorCard
                    
label="Pompa Air"
                    
desc="Mengalirkan air ke pipa tanam"
                    
icon={<Droplets size={24} />}
                    
warna={{ bg: "#e6f1fb", fg: "#1d6fb8" }}
                  
/>
                  
<ActuatorCard
                    
label="Lampu UV"
                    
desc="Penerangan tambahan untuk tanaman"
                    
icon={<Lightbulb size={24} />}
                    
warna={{ bg: "#fff4dd", fg: "#b7791f" }}
                  
/>
                  
<ActuatorCard
                    
label="Pompa Nutrisi"
                    
desc="Menambah larutan AB Mix ke toren"
                    
icon={<FlaskConical size={24} />}
                    
warna={{ bg: "#e7f5ea", fg: "#1f7a43" }}
                  
/>
                
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
                        
<MetricCard label="TDS" value={t.tds} unit="ppm" icon={<FlaskConical size={16} />} />
                        
<MetricCard label="pH" value={t.ph} icon={<Gauge size={16} />} />
                        
<MetricCard label="Suhu Air" value={t.water_temperature} unit="°C" icon={<Thermometer size={16} />} />
                        
<MetricCard label="Jarak Muka Air" value={t.distance} unit="cm" icon={<Waves size={16} />} />
                      
</div>
                    
</div>
                  
);
                
})}
                
<ChartPanel
                  
title="Nutrient Chart"
                  
metrics={NUTRIENT_METRICS}
                  
seriesFor={nutrientSeries}
                  
chart={chart}
                  
period={period}
                  
onPeriodChange={setPeriod}
                
/>
              
</>
            
)}
            
{activeTab === "microclimate" && (
              
<>
                
<div className="pro-grid-3">
                  
<MetricCard label="Suhu Udara" value={d.air_temperature} unit="°C" icon={<Thermometer size={16} />} />
                  
<MetricCard label="Kelembapan" value={d.humidity} unit="%RH" icon={<Droplets size={16} />} />
                  
<MetricCard label="Tekanan Udara" value={d.pressure} unit="hPa" icon={<Gauge size={16} />} />
                  
<MetricCard label="CO₂" value={d.co2} unit="ppm" icon={<CloudSun size={16} />} />
                  
<MetricCard label="Kecepatan Angin" value={d.wind_speed} unit="m/s" icon={<Wind size={16} />} />
                  
<MetricCard label="Radiasi Matahari" value={d.solar_radiation} unit="W/m²" icon={<Sun size={16} />} />
                  
<MetricCard label="Curah Hujan (total)" value={d.rainfall_total} unit="mm" icon={<CloudRain size={16} />} />
                  
<MetricCard label="SVP" value={d.svp} unit="kPa" />
                  
<MetricCard label="AVP" value={d.avp} unit="kPa" />
                  
<MetricCard label="VPD" value={d.vpd} unit="kPa" />
                
</div>
                
<ChartPanel
                  
title="Microclimate Chart"
                  
metrics={MICRO_METRICS}
                  
seriesFor={microSeries}
                  
chart={chart}
                  
period={period}
                  
onPeriodChange={setPeriod}
                
/>
              
</>
            
)}
            
{activeTab === "plant" && (
              
<>
                
<div className="pro-grid-3">
                  
<MetricCard label="Waterflow 1" value={d.waterflow_1} unit="pulse/s" icon={<Waves size={16} />} />
                  
<MetricCard label="Waterflow 2" value={d.waterflow_2} unit="pulse/s" icon={<Waves size={16} />} />
                
</div>
                
<ChartPanel
                  
title="Waterflow Chart"
                  
metrics={PLANT_METRICS}
                  
seriesFor={plantSeries}
                  
chart={chart}
                  
period={period}
                  
onPeriodChange={setPeriod}
                
/>
              
</>
            
)}
            
{activeTab === "download" && (
              
<DownloadPanel period={downloadPeriod} onPeriodChange={setDownloadPeriod} />
            
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