import { fmt, toCSV } from "./utils.js";
import { renderRatingsChart, renderDailyChart } from "./charts.js";

const cfg = window.APP_CONFIG;

// DOM
const estado = document.getElementById("estado");
const apiInput = document.getElementById("api");
const desde = document.getElementById("desde");
const hasta = document.getElementById("hasta");
const fDisp = document.getElementById("fDispositivo");
const fTexto = document.getElementById("fTexto");
const btnCargar = document.getElementById("btnCargar");
const btnCSV = document.getElementById("btnCSV");
const auto = document.getElementById("auto");

const kpiTotal = document.getElementById("kpiTotal");
const kpiRango = document.getElementById("kpiRango");
const kpiSat = document.getElementById("kpiSat");
const kpiNoSat = document.getElementById("kpiNoSat");
const kpiMotivo = document.getElementById("kpiMotivo");

const tbody = document.querySelector("#tabla tbody");
const lblRangoTabla = document.getElementById("lblRangoTabla");
const lblTotalTabla = document.getElementById("lblTotalTabla");
const lblPagina = document.getElementById("lblPagina");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");

// Estado
let dataAll = [];
let dataFiltered = [];
let page = 1;
let timer = null;
let chartRatings, chartDaily;

// Inicializa fechas (últimos 7 días) y API por defecto
(function initDefaults(){
  const today = new Date();
  const past = new Date(Date.now() - 6*86400000);
  desde.value = past.toISOString().slice(0,10);
  hasta.value = today.toISOString().slice(0,10);
  apiInput.value = cfg.apiBase;
})();

async function fetchData(){
  const api = apiInput.value.replace(/\/+$/,'');
  estado.textContent = "Cargando...";
  try{
    const res = await fetch(`${api}/api/respuestas`);
    if(!res.ok) throw new Error(res.status);
    dataAll = await res.json();
    estado.textContent = "OK";
    applyFilters();
  }catch(e){
    estado.textContent = "Error: " + e.message;
    dataAll = [];
    applyFilters();
  }
}

function applyFilters(){
  const api = apiInput.value.replace(/\/+$/,''); // por si luego lo usamos
  const d0 = desde.value ? new Date(desde.value + "T00:00:00Z") : null;
  const d1 = hasta.value ? new Date(hasta.value + "T23:59:59Z") : null;
  const disp = (fDisp.value || "").trim().toLowerCase();
  const text = (fTexto.value || "").trim().toLowerCase();

  dataFiltered = dataAll.filter(r => {
    const t = new Date(r.created_at);
    if (d0 && t < d0) return false;
    if (d1 && t > d1) return false;
    if (disp && (r.dispositivo_id||"").toLowerCase().indexOf(disp) === -1) return false;
    if (text){
      const blob = `${r.calificacion} ${r.motivo}`.toLowerCase();
      if (blob.indexOf(text) === -1) return false;
    }
    return true;
  });
  page = 1;
  renderAll();
}

function renderAll(){
  renderKPIs();
  renderCharts();
  renderTable();
}

function renderKPIs(){
  const n = dataFiltered.length;
  kpiTotal.textContent = fmt(n);
  kpiRango.textContent = `${desde.value || "—"} a ${hasta.value || "—"}`;

  const counts = {Excelente:0, Bueno:0, Regular:0, Malo:0};
  const motivos = {};
  for (const r of dataFiltered){
    if (counts[r.calificacion] != null) counts[r.calificacion]++;
    motivos[r.motivo] = (motivos[r.motivo]||0) + 1;
  }
  const pos = counts.Excelente + counts.Bueno;
  const neg = counts.Regular + counts.Malo;
  const total = pos + neg || 1;
  kpiSat.textContent = Math.round(pos*100/total) + "%";
  kpiNoSat.textContent = Math.round(neg*100/total) + "%";

  let topMotivo = "—", topCount = 0;
  for (const [m, c] of Object.entries(motivos)){
    if (c > topCount){ topCount = c; topMotivo = m; }
  }
  kpiMotivo.textContent = topMotivo;
}

function renderCharts(){
  // Ratings
  const counts = {Excelente:0, Bueno:0, Regular:0, Malo:0};
  for (const r of dataFiltered){ if(counts[r.calificacion]!=null) counts[r.calificacion]++; }
  const ctx1 = document.getElementById("chartRatings").getContext("2d");
  if (chartRatings) chartRatings.destroy();
  chartRatings = renderRatingsChart(ctx1, counts);

  // Daily stacked
  const byDay = {};
  for (const r of dataFiltered){
    const d = (r.created_at||"").slice(0,10);
    byDay[d] = byDay[d] || {Excelente:0,Bueno:0,Regular:0,Malo:0};
    byDay[d][r.calificacion] = (byDay[d][r.calificacion]||0) + 1;
  }
  const days = Object.keys(byDay).sort();
  const dsEx = days.map(d=>byDay[d].Excelente||0);
  const dsBu = days.map(d=>byDay[d].Bueno||0);
  const dsRe = days.map(d=>byDay[d].Regular||0);
  const dsMa = days.map(d=>byDay[d].Malo||0);
  const ctx2 = document.getElementById("chartDaily").getContext("2d");
  if (chartDaily) chartDaily.destroy();
  chartDaily = renderDailyChart(ctx2, days, dsEx, dsBu, dsRe, dsMa);
}

function renderTable(){
  const total = dataFiltered.length;
  const perPage = cfg.perPage;
  const pages = Math.max(1, Math.ceil(total / perPage));
  page = Math.min(page, pages);
  const start = (page-1)*perPage;
  const end = Math.min(start + perPage, total);

  lblRangoTabla.textContent = total ? `${start+1}–${end}` : "0–0";
  lblTotalTabla.textContent = fmt(total);
  lblPagina.textContent = `Página ${page} / ${pages}`;

  tbody.innerHTML = dataFiltered.slice(start, end).map(r => `
    <tr>
      <td>${r.created_at}</td>
      <td>${r.calificacion}</td>
      <td>${r.motivo}</td>
      <td>${r.dispositivo_id || "-"}</td>
      <td>${r.sede || "-"}</td>
    </tr>
  `).join("");

  btnPrev.disabled = page<=1;
  btnNext.disabled = page>=pages;
}

/* ====== Eventos ====== */
btnCargar.addEventListener("click", fetchData);
btnCSV.addEventListener("click", () => toCSV(dataFiltered));
[desde,hasta,fDisp,fTexto].forEach(el => el.addEventListener("change", applyFilters));
fTexto.addEventListener("keyup", () => applyFilters());
btnPrev.addEventListener("click", ()=>{ page=Math.max(1,page-1); renderTable(); });
btnNext.addEventListener("click", ()=>{ page=page+1; renderTable(); });

auto.addEventListener("change", ()=>{
  if (auto.checked){
    timer = setInterval(fetchData, cfg.autoRefreshMs);
  } else if (timer){
    clearInterval(timer); timer = null;
  }
});

/* ====== Init ====== */
fetchData();
