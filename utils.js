export function fmt(n) {
  return (n ?? 0).toLocaleString("es-MX");
}

export function toCSV(rows) {
  const headers = ["created_at","calificacion","motivo","dispositivo_id","sede"];
  const lines = [headers.join(",")];
  for (const r of rows){
    const row = headers.map(h => `"${(r[h] ?? "").toString().replace(/"/g,'""')}"`).join(",");
    lines.push(row);
  }
  const blob = new Blob([lines.join("\n")], {type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "reporte_encuesta.csv"; a.click();
  URL.revokeObjectURL(url);
}
