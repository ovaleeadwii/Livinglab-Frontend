import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const GREEN = "#176137";

// Grafik "Tren Pertumbuhan Pengguna". data = GROWTH_CHART, periods = GROWTH_PERIODS
export default function GrowthChart({ data, periods = [], defaultPeriod = "3m", onPeriodChange }) {
  const [period, setPeriod] = useState(defaultPeriod);

  const changePeriod = (id) => {
    setPeriod(id);
    onPeriodChange?.(id); // nanti dipakai untuk ambil data API sesuai periode
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Customer Baru",
        data: data.customers,
        borderColor: GREEN,
        borderWidth: 2.5,
        pointRadius: 0,
        tension: 0.35,
        fill: true,
        backgroundColor: (ctx) => {
          const { chart } = ctx;
          if (!chart.chartArea) return "rgba(23,97,55,0.15)";
          const g = chart.ctx.createLinearGradient(0, chart.chartArea.top, 0, chart.chartArea.bottom);
          g.addColorStop(0, "rgba(23,97,55,0.35)");
          g.addColorStop(1, "rgba(23,97,55,0.02)");
          return g;
        },
      },
      {
        label: "Reseller Aktif",
        data: data.resellers,
        borderColor: "#2f814b",
        borderWidth: 2,
        pointRadius: (ctx) => (ctx.dataIndex === data.resellers.length - 1 ? 4 : 0),
        pointBackgroundColor: "#2f814b",
        tension: 0.35,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}k` },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: "monospace", size: 10 }, color: "#64748b" },
      },
      y: { display: false, beginAtZero: true },
    },
  };

  return (
    <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <span className="h-2 w-2 rounded-full bg-[#176137]" />
            Tren Pertumbuhan Pengguna
          </h2>
          <p className="text-xs text-slate-500">
            Korelasi akuisisi Retail Customer terhadap ekspansi Reseller Terverifikasi (Nov 2024 - Apr 2025).
          </p>
        </div>

        <div className="flex rounded-lg border border-slate-200 p-0.5">
          {periods.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => changePeriod(p.id)}
              className={`rounded-md px-3 py-1 font-mono text-[11px] ${
                period === p.id ? "bg-slate-900 font-semibold text-white" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ringkasan angka */}
      <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3 md:grid-cols-4">
        {data.summary.map((s) => (
          <div key={s.label}>
            <div className="font-mono text-[10px] uppercase text-slate-500">{s.label}</div>
            <div className={`mt-0.5 font-mono text-sm font-bold ${s.live ? "text-[#176137]" : "text-slate-800"}`}>
              {s.value} {s.note && <span className="font-normal text-slate-400">{s.note}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-4 h-64">
        <Line data={chartData} options={options} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-600">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#176137]" /> Customer Baru (+18.2%)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#2f814b]" /> Reseller Aktif (+14.0%)
        </span>
      </div>
      <p className="mt-1 font-mono text-[10px] text-slate-400">Sumber: Real-time PostgreSQL Master DB Replication</p>
    </section>
  );
}
