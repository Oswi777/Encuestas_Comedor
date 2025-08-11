// Defaults globales Chart.js (look corporativo)
Chart.defaults.color = "#eaf0f7";
Chart.defaults.font.family = "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";
Chart.defaults.borderColor = "rgba(255,255,255,.08)";

export function renderRatingsChart(ctx, counts) {
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Excelente","Bueno","Regular","Malo"],
      datasets: [{
        data: [counts.Excelente, counts.Bueno, counts.Regular, counts.Malo],
        backgroundColor: ["#27ae60","#2d9cdb","#f2c94c","#eb5757"],
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,.12)"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 150,
      scales: {
        y: { beginAtZero: true, grid:{color:"rgba(255,255,255,.1)"} },
        x: { grid: { display:false } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(7,12,20,.95)",
          borderColor: "rgba(255,255,255,.08)",
          borderWidth: 1,
          padding: 10,
          titleColor: "#eaf0f7",
          bodyColor: "#cfe3ff"
        }
      }
    }
  });
}

export function renderDailyChart(ctx, days, dsEx, dsBu, dsRe, dsMa) {
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: days,
      datasets: [
        { label:"Excelente", data: dsEx, backgroundColor:"#27ae60", stack:"s", borderRadius:6, borderWidth:1, borderColor:"rgba(255,255,255,.12)" },
        { label:"Bueno",     data: dsBu, backgroundColor:"#2d9cdb", stack:"s", borderRadius:6, borderWidth:1, borderColor:"rgba(255,255,255,.12)" },
        { label:"Regular",   data: dsRe, backgroundColor:"#f2c94c", stack:"s", borderRadius:6, borderWidth:1, borderColor:"rgba(255,255,255,.12)" },
        { label:"Malo",      data: dsMa, backgroundColor:"#eb5757", stack:"s", borderRadius:6, borderWidth:1, borderColor:"rgba(255,255,255,.12)" }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 150,
      scales: {
        x: { stacked:true, grid:{display:false} },
        y: { stacked:true, beginAtZero:true, grid:{color:"rgba(255,255,255,.1)"} }
      },
      plugins: {
        legend: { labels:{ color:"#eaf0f7" } },
        tooltip: {
          backgroundColor: "rgba(7,12,20,.95)",
          borderColor: "rgba(255,255,255,.08)",
          borderWidth: 1,
          padding: 10,
          titleColor: "#eaf0f7",
          bodyColor: "#cfe3ff"
        }
      }
    }
  });
}
