// Generado automáticamente desde public/temas/pc1/pc1_revision.html
// No editar a mano. Regenerar con build_revision_html.py + script de embed.

export const PC1_REVISION_HTML = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Revisión PC1 · Sección A701</title>
<style>
  :root {
    --bg: #ffffff;
    --text: #1a1a1a;
    --muted: #666;
    --border: #d5d5d5;
    --shaded: #fafaf8;
    --accent: #1e3a5f;
    --good: #d6f5d6;
    --good-fg: #14532d;
    --low: #fff8dc;
    --low-fg: #8a6508;
    --neg: #fde2e2;
    --neg-fg: #7f1d1d;
    --tot-good: #1e6f3a;
    --tot-mid: #b45309;
    --tot-bad: #b91c1c;
    --tot-na: #94a3b8;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: var(--text);
    background: var(--bg);
    font-size: 13px;
    line-height: 1.5;
  }
  .wrap { max-width: 1500px; margin: 0 auto; padding: 32px 24px 64px; }
  h1 { margin: 0 0 6px; font-size: 24px; }
  .subtitle { color: var(--muted); font-size: 13px; }
  /* ─── Stat cards (estilo dashboard editorial) ─── */
  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(168px, 1fr));
    gap: 14px;
    margin: 28px 0 18px;
  }
  .stat {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 18px 20px 16px;
  }
  .stat .label {
    font-size: 10.5px;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 1.4px;
    font-weight: 700;
    margin-bottom: 12px;
  }
  .stat .value {
    font-size: 30px;
    font-weight: 700;
    line-height: 1;
    color: #0f172a;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.5px;
  }
  .stat .pct {
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    margin-left: 8px;
    letter-spacing: 0;
  }
  .stat .delta {
    margin-top: 10px;
    font-size: 11px;
    color: #6b7280;
    font-weight: 500;
  }
  .stat.good .value { color: #166534; }
  .stat.good .pct { color: #16a34a; }
  .stat.bad .value { color: #991b1b; }
  .stat.bad .pct { color: #dc2626; }
  .stat.accent .value { color: #3730a3; }

  /* ─── Distribution bar ─── */
  .distribution {
    margin: 4px 0 32px;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 16px 20px 18px;
  }
  .distribution .dist-title {
    font-size: 10.5px;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 1.4px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .progress-bar {
    height: 10px;
    background: #f3f4f6;
    border-radius: 999px;
    overflow: hidden;
    display: flex;
  }
  .progress-bar .seg {
    height: 100%;
    transition: width 0.3s;
  }
  .progress-bar .seg.aprobados { background: #16a34a; }
  .progress-bar .seg.desaprobados { background: #dc2626; }
  .progress-bar .seg.no-rind { background: #cbd5e1; }
  .legend {
    display: flex;
    gap: 22px;
    margin-top: 12px;
    flex-wrap: wrap;
    font-size: 12px;
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #374151;
    font-weight: 500;
  }
  .legend-item .dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    display: inline-block;
  }
  .legend-item.aprobados .dot { background: #16a34a; }
  .legend-item.desaprobados .dot { background: #dc2626; }
  .legend-item.no-rind .dot { background: #cbd5e1; }
  .legend-item .count {
    color: #6b7280;
    font-weight: 600;
    margin-left: 2px;
  }
  .toolbar {
    display: flex;
    gap: 8px;
    margin: 16px 0 12px;
    align-items: center;
    flex-wrap: wrap;
  }
  .toolbar input[type="search"] {
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 4px;
    font-family: inherit;
    font-size: 13px;
    width: 240px;
  }
  .toolbar button {
    padding: 5px 10px;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: var(--shaded);
    color: var(--text);
    font-size: 12px;
    cursor: pointer;
    font-family: inherit;
  }
  .toolbar button.active {
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);
  }
  .legend {
    color: var(--muted);
    font-size: 11.5px;
    margin-left: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }
  thead th {
    position: sticky;
    top: 0;
    background: #fff;
    border-bottom: 2px solid var(--text);
    padding: 10px 6px;
    text-align: left;
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--text);
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
  }
  thead th:hover { background: var(--shaded); }
  tbody td {
    padding: 6px 6px;
    border-bottom: 1px solid var(--border);
    vertical-align: middle;
  }
  tbody tr:hover { background: #f9f9f7; }
  tbody tr.not-delivered { opacity: 0.6; }
  .na-msg {
    text-align: center;
    color: var(--muted);
    font-style: italic;
  }
  td.pc { font-family: ui-monospace, monospace; font-weight: 700; color: var(--accent); }
  td.code { font-family: ui-monospace, monospace; font-size: 11px; color: var(--muted); }
  td.name { font-weight: 600; min-width: 220px; }
  .badge-delegado {
    display: inline-block;
    background: linear-gradient(135deg, #1e3a5f 0%, #4338ca 100%);
    color: #fff;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 2px 7px;
    border-radius: 3px;
    margin-left: 8px;
    vertical-align: middle;
  }
  .badge-presente {
    display: inline-block;
    background: #dc2626;
    color: #fff;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 2px 7px;
    border-radius: 3px;
    margin-left: 8px;
    vertical-align: middle;
  }
  tr.presente-sin-entrega {
    background: #fef2f2;
  }
  td.comp { text-align: center; font-family: ui-monospace, monospace; }
  td.num {
    text-align: center;
    font-family: ui-monospace, monospace;
    font-weight: 600;
    width: 48px;
  }
  td.num.good { background: var(--good); color: var(--good-fg); }
  td.num.low { background: var(--low); color: var(--low-fg); }
  td.num.neg { background: var(--neg); color: var(--neg-fg); }
  td.teoria {
    background: #ede9fe;
    color: #5b21b6;
    border-left: 2px solid var(--border);
  }
  td.practica {
    background: #f1f5f9;
    color: var(--text);
    border-left: 2px solid var(--border);
    font-weight: 700;
  }
  td.total {
    text-align: center;
    font-family: ui-monospace, monospace;
    font-weight: 700;
    font-size: 14px;
    border-left: 2px solid var(--text);
  }
  td.total20 {
    background: #f3e8ff;
    color: #6b21a8;
  }
  td.total.tot-good { color: var(--tot-good); }
  td.total.tot-mid { color: var(--tot-mid); }
  td.total.tot-bad { color: var(--tot-bad); }
  td.total.tot-na { color: var(--tot-na); }
  td.bd { font-family: ui-monospace, monospace; font-size: 11px; color: var(--muted); }
  td.check { text-align: center; font-weight: 700; }
  td.check:has-text("✓") { color: var(--tot-good); }
  td.dim { color: var(--muted); text-align: center; }
  .ver {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 3px;
    font-weight: 700;
    font-size: 11px;
    font-family: ui-monospace, monospace;
  }
  .ver-a { background: #dbeafe; color: #1e40af; }
  .ver-b { background: #fef3c7; color: #92400e; }
  .ver-q { background: #f3e8ff; color: #6b21a8; }
</style>
</head>
<body>
<div class="wrap">
  <h1>Revisión PC1 — Sección A701</h1>
  <div class="subtitle">Arquitectura de Aplicaciones Web · ASI0705 · UPC 2026-10 · Prof. Elio Navarrete</div>

  <div class="stats">
    <div class="stat muted">
      <div class="label">Total matriculados</div>
      <div class="value">40</div>
      <div class="delta">37 rindieron · 3 ausentes</div>
    </div>
    <div class="stat good">
      <div class="label">Aprobados</div>
      <div class="value">23<span class="pct">62%</span></div>
      <div class="delta">de 37 que rindieron · ≥ 13/20</div>
    </div>
    <div class="stat bad">
      <div class="label">Desaprobados</div>
      <div class="value">14<span class="pct">38%</span></div>
      <div class="delta">de 37 que rindieron · &lt; 13/20</div>
    </div>
    <div class="stat bad">
      <div class="label">No rindieron</div>
      <div class="value">3<span class="pct">8%</span></div>
      <div class="delta">del roster total</div>
    </div>
    <div class="stat accent">
      <div class="label">Promedio</div>
      <div class="value">13.1<span class="pct">/20</span></div>
      <div class="delta">solo entre los que rindieron</div>
    </div>
    <div class="stat">
      <div class="label">Versiones</div>
      <div class="value">21<span class="pct">A</span> &nbsp; 15<span class="pct">B</span></div>
      <div class="delta">distribución de versiones</div>
    </div>
  </div>

  <div class="distribution">
    <div class="dist-title">Distribución sobre los 40 matriculados</div>
    <div class="progress-bar">
      <div class="seg aprobados" style="width: 57.50%" title="Aprobados"></div>
      <div class="seg desaprobados" style="width: 35.00%" title="Desaprobados"></div>
      <div class="seg no-rind" style="width: 7.50%" title="No rindieron"></div>
    </div>
    <div class="legend">
      <div class="legend-item aprobados"><span class="dot"></span>Aprobados <span class="count">23 · 58%</span></div>
      <div class="legend-item desaprobados"><span class="dot"></span>Desaprobados <span class="count">14 · 35%</span></div>
      <div class="legend-item no-rind"><span class="dot"></span>No rindieron <span class="count">3 · 8%</span></div>
    </div>
  </div>

  <div class="toolbar">
    <input type="search" id="filter" placeholder="Filtrar por nombre, código...">
    <button data-filter="all" class="active">Todos</button>
    <button data-filter="A">Solo A</button>
    <button data-filter="B">Solo B</button>
    <button data-filter="delivered">Rindieron</button>
    <button data-filter="not-delivered">No rindieron</button>
    <button data-filter="aprobados">Aprobados (≥13)</button>
    <button data-filter="desaprobados">Desaprobados (&lt;13)</button>
    <span class="legend">Click en el header para ordenar · verde = bien · amarillo = regular · rojo = mal</span>
  </div>

  <table id="grid">
    <thead>
      <tr>
        <th data-sort="num">PC#</th>
        <th>Código</th>
        <th>Estudiante</th>
        <th data-sort="num">Comp.</th>
        <th>Ver</th>
        <th data-sort="num" title="30 preguntas de opción múltiple">Teoría<br>/5</th>
        <th data-sort="num" title="Actualizar pedido/propaganda">HUB01<br>(2)</th>
        <th data-sort="num" title="Get by ID con not-found">HUB02<br>(2)</th>
        <th data-sort="num" title="Query fecha+hora">HUB03<br>(3)</th>
        <th data-sort="num" title="Count agregación">HUB04<br>(3)</th>
        <th data-sort="num" title="Code Organization">C01<br>(±1)</th>
        <th data-sort="num" title="Naming">C02<br>(3/-5)</th>
        <th data-sort="num" title="Originalidad — revisar manual">C03<br>(0/-3)</th>
        <th data-sort="num" title="Código limpio — revisar manual">C04<br>(1/-3)</th>
        <th data-sort="num">Práctica<br>/15</th>
        <th data-sort="num" title="Suma cruda de teoría + práctica">Total<br>/20</th>
        <th data-sort="num" title="Nota final redondeada al 0.5 más cercano · aprueba ≥13">Nota<br>final</th>
        <th>BD detectada</th>
        <th title="Usa DTO en controllers">DTO</th>
        <th title="Usa @Tag/@Operation">SW</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="pc">39</td>
        <td class="code">202217518</td>
        <td class="name">Jhair Joseph Alarcon Choque</td>
        <td class="comp">39</td>
        <td><span class="ver ver-b">B</span></td>
        <td class="num teoria good" title="28/30 correctas">4.67</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num neg">-1</td>
        <td class="num ">2</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">12</td>
        <td class="total total20">16.67</td>
        <td class="total tot-good">17.0</td>
        <td class="bd"></td>
        <td class="check">✓</td>
        <td class="check">✓</td>
    </tr>
<tr class="not-delivered">
            <td>—</td><td>202019907</td><td>Carlos Andre Alcantara Quispe</td><td>—</td><td>—</td>
            <td colspan="11" class="na-msg">No rindió</td>
            <td class="total tot-na">0</td>
            <td class="total tot-na">0</td>
            <td class="dim">—</td><td class="dim">—</td><td class="dim">—</td>
        </tr>
<tr>
        <td class="pc">18</td>
        <td class="code">20171F413</td>
        <td class="name">Sofia Beatriz Allca Urbano</td>
        <td class="comp">18</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria " title="23/30 correctas">3.83</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num good">1</td>
        <td class="num ">2</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">10</td>
        <td class="total total20">13.83</td>
        <td class="total tot-good">14.0</td>
        <td class="bd">sbauBDPC1</td>
        <td class="check">✓</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">38</td>
        <td class="code">202015066</td>
        <td class="name">Cristian Martin Arias Saldaña</td>
        <td class="comp">38</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria " title="15/30 correctas">2.5</td>
        <td class="num low">0</td>
        <td class="num good">2</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num good">1</td>
        <td class="num ">1</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">5</td>
        <td class="total total20">7.5</td>
        <td class="total tot-mid">7.5</td>
        <td class="bd">cmasBDPC1</td>
        <td class="check">✓</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">14</td>
        <td class="code">202311965</td>
        <td class="name">Lorenzo Balicco Espinoza</td>
        <td class="comp">14</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria " title="22/30 correctas">3.67</td>
        <td class="num low">0</td>
        <td class="num good">2</td>
        <td class="num low">0</td>
        <td class="num good">3</td>
        <td class="num neg">-1</td>
        <td class="num ">2</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">9.0</td>
        <td class="total total20">12.67</td>
        <td class="total tot-good">13.0</td>
        <td class="bd">LBEPC01</td>
        <td class="check">·</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">32</td>
        <td class="code">202312118</td>
        <td class="name">Masiel Alejandra Callañaupa Aguilar</td>
        <td class="comp">32</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria " title="23/30 correctas">3.83</td>
        <td class="num low">0</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num low">0</td>
        <td class="num neg">-1</td>
        <td class="num ">1</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">6</td>
        <td class="total total20">9.83</td>
        <td class="total tot-mid">10.0</td>
        <td class="bd">macaBDPC1</td>
        <td class="check">·</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">21</td>
        <td class="code">202223894</td>
        <td class="name">Alexandra Belen Casas Melgar</td>
        <td class="comp">21</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria " title="17/30 correctas">2.83</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num neg">-1</td>
        <td class="num neg">-1</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">6.0</td>
        <td class="total total20">8.83</td>
        <td class="total tot-mid">9.0</td>
        <td class="bd"></td>
        <td class="check">·</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">04</td>
        <td class="code">202012268</td>
        <td class="name">Josue Alfonso Cavero Peña</td>
        <td class="comp">04</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria good" title="27/30 correctas">4.5</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num good">1</td>
        <td class="num ">2.5</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">8.5</td>
        <td class="total total20">13.0</td>
        <td class="total tot-good">13.0</td>
        <td class="bd">jacpBDPC1</td>
        <td class="check">✓</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">11</td>
        <td class="code">20211G109</td>
        <td class="name">Fabrizio Michell Caysedo Salvador</td>
        <td class="comp">11</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria good" title="29/30 correctas">4.83</td>
        <td class="num low">0</td>
        <td class="num good">2</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num good">1</td>
        <td class="num ">1</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">5</td>
        <td class="total total20">9.83</td>
        <td class="total tot-mid">10.0</td>
        <td class="bd">fmcsBDPC1</td>
        <td class="check">✓</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">10</td>
        <td class="code">20241E898</td>
        <td class="name">Jheanpiere Alejandro Cerdan Sigüeñas</td>
        <td class="comp">10</td>
        <td><span class="ver ver-b">B</span></td>
        <td class="num teoria good" title="28/30 correctas">4.67</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num low">0</td>
        <td class="num neg">-1</td>
        <td class="num neg">-1</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">8.0</td>
        <td class="total total20">12.67</td>
        <td class="total tot-good">13.0</td>
        <td class="bd">jacsBDPC1</td>
        <td class="check">✓</td>
        <td class="check">✓</td>
    </tr>
<tr>
        <td class="pc">20</td>
        <td class="code">20211B774</td>
        <td class="name">Samir Arlik Chavez Hernandez</td>
        <td class="comp">20</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria " title="18/30 correctas">3.0</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num good">3</td>
        <td class="num low">0</td>
        <td class="num good">1</td>
        <td class="num low">0</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">5</td>
        <td class="total total20">8.0</td>
        <td class="total tot-mid">8.0</td>
        <td class="bd"></td>
        <td class="check">✓</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">01</td>
        <td class="code">201919914</td>
        <td class="name">Kenneth Pedro Chipana Zambrano</td>
        <td class="comp">01</td>
        <td><span class="ver ver-b">B</span></td>
        <td class="num teoria good" title="28/30 correctas">4.67</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num good">1</td>
        <td class="num ">1</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">13</td>
        <td class="total total20">17.67</td>
        <td class="total tot-good">18.0</td>
        <td class="bd">kpchzBDPC1</td>
        <td class="check">✓</td>
        <td class="check">✓</td>
    </tr>
<tr>
        <td class="pc">13</td>
        <td class="code">202210372</td>
        <td class="name">Ariana Olenka Eche Caballero</td>
        <td class="comp">13</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria " title="21/30 correctas">3.5</td>
        <td class="num low">0</td>
        <td class="num good">2</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num good">1</td>
        <td class="num ">2.5</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">6.5</td>
        <td class="total total20">10.0</td>
        <td class="total tot-mid">10.0</td>
        <td class="bd">aoecBDPC1</td>
        <td class="check">✓</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">34</td>
        <td class="code">202318333</td>
        <td class="name">Jhanpier Carlos Fabian Joaquin</td>
        <td class="comp">34</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria good" title="30/30 correctas">5.0</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num good">1</td>
        <td class="num low">0</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">12</td>
        <td class="total total20">17.0</td>
        <td class="total tot-good">17.0</td>
        <td class="bd">jfBDPC1</td>
        <td class="check">✓</td>
        <td class="check">✓</td>
    </tr>
<tr>
        <td class="pc">33</td>
        <td class="code">202316121</td>
        <td class="name">José David Falcón Alzamora</td>
        <td class="comp">33</td>
        <td><span class="ver ver-b">B</span></td>
        <td class="num teoria good" title="27/30 correctas">4.5</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num good">1</td>
        <td class="num ">2.5</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">14.5</td>
        <td class="total total20">19.0</td>
        <td class="total tot-good">19.0</td>
        <td class="bd">jdfaBDPC1</td>
        <td class="check">✓</td>
        <td class="check">✓</td>
    </tr>
<tr class="not-delivered">
            <td>—</td><td>201822245</td><td>Gustavo Eduardo Flores Apaza</td><td>—</td><td>—</td>
            <td colspan="11" class="na-msg">No rindió</td>
            <td class="total tot-na">0</td>
            <td class="total tot-na">0</td>
            <td class="dim">—</td><td class="dim">—</td><td class="dim">—</td>
        </tr>
<tr>
        <td class="pc">02</td>
        <td class="code">202319425</td>
        <td class="name">Cesar Fabrizzio Gamboa Vives</td>
        <td class="comp">02</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria " title="22/30 correctas">3.67</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num good">1</td>
        <td class="num ">1</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">13</td>
        <td class="total total20">16.67</td>
        <td class="total tot-good">17.0</td>
        <td class="bd">cfgvBDPC1</td>
        <td class="check">✓</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">07</td>
        <td class="code">202312361</td>
        <td class="name">Flavio Roberto Ganiko Bardalez</td>
        <td class="comp">07</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria good" title="28/30 correctas">4.67</td>
        <td class="num low">0</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num low">0</td>
        <td class="num good">1</td>
        <td class="num ">2</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">9</td>
        <td class="total total20">13.67</td>
        <td class="total tot-good">14.0</td>
        <td class="bd">frgbBDPC1</td>
        <td class="check">·</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">30</td>
        <td class="code">20231C956</td>
        <td class="name">Isaac Bequer Garay Obregón</td>
        <td class="comp">30</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria good" title="28/30 correctas">4.67</td>
        <td class="num good">2</td>
        <td class="num low">0</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num good">1</td>
        <td class="num ">2.5</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">12.5</td>
        <td class="total total20">17.17</td>
        <td class="total tot-good">17.5</td>
        <td class="bd">ibgoBDPC1</td>
        <td class="check">·</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">26</td>
        <td class="code">202010188</td>
        <td class="name">Gabriel Andre Gutierrez Sanchez</td>
        <td class="comp">26</td>
        <td><span class="ver ver-b">B</span></td>
        <td class="num teoria " title="23/30 correctas">3.83</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num good">1</td>
        <td class="num ">1</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">3</td>
        <td class="total total20">6.83</td>
        <td class="total tot-mid">7.0</td>
        <td class="bd">gagsBDPC1</td>
        <td class="check">·</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">17</td>
        <td class="code">201922070</td>
        <td class="name">Briggitte Teresa Esther Huangal Sanchez</td>
        <td class="comp">17</td>
        <td><span class="ver ver-b">B</span></td>
        <td class="num teoria " title="22/30 correctas">3.67</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num good">1</td>
        <td class="num ">1</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">13</td>
        <td class="total total20">16.67</td>
        <td class="total tot-good">17.0</td>
        <td class="bd">btehsBDPC1</td>
        <td class="check">·</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">24</td>
        <td class="code">202318072</td>
        <td class="name">Lucia Belen Jimenez Pinto</td>
        <td class="comp">24</td>
        <td><span class="ver ver-b">B</span></td>
        <td class="num teoria " title="24/30 correctas">4.0</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num good">1</td>
        <td class="num ">2</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">14</td>
        <td class="total total20">18.0</td>
        <td class="total tot-good">18.0</td>
        <td class="bd">lbjpBDPC1</td>
        <td class="check">·</td>
        <td class="check">✓</td>
    </tr>
<tr>
        <td class="pc">06</td>
        <td class="code">202218480</td>
        <td class="name">Fernando Gabriel Limaymanta Ore</td>
        <td class="comp">06</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria good" title="28/30 correctas">4.67</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num neg">-1</td>
        <td class="num ">1</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">11</td>
        <td class="total total20">15.67</td>
        <td class="total tot-good">16.0</td>
        <td class="bd">fgloBDPC1</td>
        <td class="check">✓</td>
        <td class="check">✓</td>
    </tr>
<tr>
        <td class="pc">28</td>
        <td class="code">202322205</td>
        <td class="name">Jair Alonso Mauricio Pezo</td>
        <td class="comp">28</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria good" title="30/30 correctas">5.0</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num good">1</td>
        <td class="num ">2</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">14</td>
        <td class="total total20">19.0</td>
        <td class="total tot-good">19.0</td>
        <td class="bd">jampBDPC1</td>
        <td class="check">·</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">36</td>
        <td class="code">202321121</td>
        <td class="name">Sebastian Jose Medina Mayo</td>
        <td class="comp">36</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria good" title="30/30 correctas">5.0</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num good">1</td>
        <td class="num ">2.5</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">14.5</td>
        <td class="total total20">19.5</td>
        <td class="total tot-good">19.5</td>
        <td class="bd">sjmmBDPC1</td>
        <td class="check">✓</td>
        <td class="check">✓</td>
    </tr>
<tr>
        <td class="pc">12</td>
        <td class="code">202210865</td>
        <td class="name">Miguel Nicolás Mendoza Guzmán</td>
        <td class="comp">12</td>
        <td><span class="ver ver-b">B</span></td>
        <td class="num teoria good" title="30/30 correctas">5.0</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num good">1</td>
        <td class="num ">2.5</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">14.5</td>
        <td class="total total20">19.5</td>
        <td class="total tot-good">19.5</td>
        <td class="bd">mnmgBDPC1</td>
        <td class="check">✓</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">03</td>
        <td class="code">202318726</td>
        <td class="name">Katherine Naomi Meza Tupayachi</td>
        <td class="comp">03</td>
        <td><span class="ver ver-b">B</span></td>
        <td class="num teoria " title="24/30 correctas">4.0</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num good">3</td>
        <td class="num neg">-1</td>
        <td class="num ">2</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">8.0</td>
        <td class="total total20">12.0</td>
        <td class="total tot-mid">12.0</td>
        <td class="bd">knmtBDPC1</td>
        <td class="check">·</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">19</td>
        <td class="code">202211202</td>
        <td class="name">Dan Nakamura Shimabukuro</td>
        <td class="comp">19</td>
        <td><span class="ver ver-b">B</span></td>
        <td class="num teoria " title="13/30 correctas">2.17</td>
        <td class="num low">0</td>
        <td class="num ">1.5</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num good">1</td>
        <td class="num neg">-3</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">2.0</td>
        <td class="total total20">4.17</td>
        <td class="total tot-bad">4.5</td>
        <td class="bd"></td>
        <td class="check">✓</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">15</td>
        <td class="code">201925834</td>
        <td class="name">Jorge Luis Ocrospoma Mori</td>
        <td class="comp">15</td>
        <td><span class="ver ver-b">B</span></td>
        <td class="num teoria good" title="29/30 correctas">4.83</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num neg">-1</td>
        <td class="num neg">-1</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">0.5</td>
        <td class="total total20">5.33</td>
        <td class="total tot-bad">5.5</td>
        <td class="bd">jlomBDPC1</td>
        <td class="check">·</td>
        <td class="check">·</td>
    </tr>
<tr class="presente-sin-entrega">
            <td>—</td><td>202323910</td><td>Mathias Andree Ore Julca <span class="badge-presente" title="Estuvo presente. Guardó archivo en disco local, no en carpeta compartida del laboratorio.">PRESENTE · SIN ENTREGA</span></td><td>—</td><td>—</td>
            <td colspan="11" class="na-msg">Estuvo presente pero no dejó entrega válida en la carpeta compartida</td>
            <td class="total tot-bad">0</td>
            <td class="total tot-bad">0</td>
            <td class="dim">—</td><td class="dim">—</td><td class="dim">—</td>
        </tr>
<tr>
        <td class="pc">31</td>
        <td class="code">20231D360</td>
        <td class="name">Stefany Alexandra Peña Castro</td>
        <td class="comp">31</td>
        <td><span class="ver ver-b">B</span></td>
        <td class="num teoria good" title="29/30 correctas">4.83</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num good">1</td>
        <td class="num good">3</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">15</td>
        <td class="total total20">19.83</td>
        <td class="total tot-good">20.0</td>
        <td class="bd">sapcBDPC1</td>
        <td class="check">✓</td>
        <td class="check">✓</td>
    </tr>
<tr>
        <td class="pc">16</td>
        <td class="code">20231B927</td>
        <td class="name">Ayrton Jhonny Quiroz Sucno</td>
        <td class="comp">16</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria good" title="28/30 correctas">4.67</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num good">1</td>
        <td class="num neg">-3</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">-1</td>
        <td class="total total20">3.67</td>
        <td class="total tot-bad">4.0</td>
        <td class="bd">qsajBDPC1</td>
        <td class="check">·</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">05</td>
        <td class="code">202210500</td>
        <td class="name">Augusto Sebastián Ríos Márquez</td>
        <td class="comp">05</td>
        <td><span class="ver ver-b">B</span></td>
        <td class="num teoria good" title="30/30 correctas">5.0</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num good">1</td>
        <td class="num neg">-1</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">11</td>
        <td class="total total20">16.0</td>
        <td class="total tot-good">16.0</td>
        <td class="bd">srmBDPC1</td>
        <td class="check">✓</td>
        <td class="check">✓</td>
    </tr>
<tr>
        <td class="pc">25</td>
        <td class="code">202319709</td>
        <td class="name">Omar Alonzo Rodrigo Calderon</td>
        <td class="comp">25</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria " title="20/30 correctas">3.33</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num neg">-1</td>
        <td class="num low">0</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">1.5</td>
        <td class="total total20">4.83</td>
        <td class="total tot-bad">5.0</td>
        <td class="bd">oarcBDPC1</td>
        <td class="check">·</td>
        <td class="check">✓</td>
    </tr>
<tr>
        <td class="pc">09</td>
        <td class="code">202218940</td>
        <td class="name">Ryann Percy Santillana Llerena <span class="badge-delegado" title="Delegado del aula">DELEGADO</span></td>
        <td class="comp">09</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria " title="17/30 correctas">2.83</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num good">1</td>
        <td class="num ">1</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">13</td>
        <td class="total total20">15.83</td>
        <td class="total tot-good">16.0</td>
        <td class="bd"></td>
        <td class="check">·</td>
        <td class="check">·</td>
    </tr>
<tr>
        <td class="pc">29</td>
        <td class="code">20231B990</td>
        <td class="name">William Alexander Shicshe Conde</td>
        <td class="comp">29</td>
        <td><span class="ver ver-b">B</span></td>
        <td class="num teoria good" title="28/30 correctas">4.67</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num neg">-1</td>
        <td class="num ">2</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">12</td>
        <td class="total total20">16.67</td>
        <td class="total tot-good">17.0</td>
        <td class="bd">wascBDPC1</td>
        <td class="check">✓</td>
        <td class="check">·</td>
    </tr>
<tr class="not-delivered">
            <td>—</td><td>20211C030</td><td>Jose Daniel Shuan Saavedra</td><td>—</td><td>—</td>
            <td colspan="11" class="na-msg">No rindió</td>
            <td class="total tot-na">0</td>
            <td class="total tot-na">0</td>
            <td class="dim">—</td><td class="dim">—</td><td class="dim">—</td>
        </tr>
<tr>
        <td class="pc">08</td>
        <td class="code">20221C546</td>
        <td class="name">Leguer Alvaro Silva Zamora</td>
        <td class="comp">08</td>
        <td><span class="ver ver-b">B</span></td>
        <td class="num teoria " title="22/30 correctas">3.67</td>
        <td class="num low">0</td>
        <td class="num ">1.5</td>
        <td class="num good">3</td>
        <td class="num low">0</td>
        <td class="num good">1</td>
        <td class="num ">2.5</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">9.0</td>
        <td class="total total20">12.67</td>
        <td class="total tot-good">13.0</td>
        <td class="bd">laszBDPC1</td>
        <td class="check">·</td>
        <td class="check">✓</td>
    </tr>
<tr>
        <td class="pc">40</td>
        <td class="code">202313130</td>
        <td class="name">Bryan Jimmy Tuesta Gutierrez</td>
        <td class="comp">40</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria good" title="30/30 correctas">5.0</td>
        <td class="num good">2</td>
        <td class="num good">2</td>
        <td class="num good">3</td>
        <td class="num good">3</td>
        <td class="num good">1</td>
        <td class="num ">2</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">14</td>
        <td class="total total20">19.0</td>
        <td class="total tot-good">19.0</td>
        <td class="bd">bjtgBDPC1</td>
        <td class="check">✓</td>
        <td class="check">✓</td>
    </tr>
<tr>
        <td class="pc">27</td>
        <td class="code">202213792</td>
        <td class="name">Alan Joaquin Yauri Alcahuaman</td>
        <td class="comp">27</td>
        <td><span class="ver ver-a">A</span></td>
        <td class="num teoria " title="22/30 correctas">3.67</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num low">0</td>
        <td class="num good">1</td>
        <td class="num ">2.5</td>
        <td class="num ">0</td>
        <td class="num good">1</td>
        <td class="num practica">6.0</td>
        <td class="total total20">9.67</td>
        <td class="total tot-mid">10.0</td>
        <td class="bd">ajyaBDPC1</td>
        <td class="check">✓</td>
        <td class="check">·</td>
    </tr>
    </tbody>
  </table>
</div>

<script>
(function() {
  const filterInput = document.getElementById('filter');
  const buttons = document.querySelectorAll('.toolbar button[data-filter]');
  const tbody = document.querySelector('#grid tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  function applyFilters() {
    const text = filterInput.value.trim().toLowerCase();
    const active = document.querySelector('.toolbar button.active').dataset.filter;
    rows.forEach(tr => {
      const isNotDelivered = tr.classList.contains('not-delivered');
      const verCell = tr.children[4];
      const ver = verCell ? verCell.textContent.trim() : '';
      const totalCells = tr.querySelectorAll('td.total');
      const total = parseFloat((totalCells[totalCells.length - 1] || {}).textContent || '0');
      const matchText = !text || tr.textContent.toLowerCase().includes(text);
      let matchFilter = true;
      if (active === 'A') matchFilter = ver === 'A';
      else if (active === 'B') matchFilter = ver === 'B';
      else if (active === 'delivered') matchFilter = !isNotDelivered;
      else if (active === 'not-delivered') matchFilter = isNotDelivered;
      else if (active === 'aprobados') matchFilter = !isNotDelivered && total >= 13;
      else if (active === 'desaprobados') matchFilter = !isNotDelivered && total < 13;
      else if (active === 'neg') matchFilter = !isNotDelivered && total < 0;
      tr.style.display = (matchText && matchFilter) ? '' : 'none';
    });
  }

  filterInput.addEventListener('input', applyFilters);
  buttons.forEach(b => b.addEventListener('click', () => {
    buttons.forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    applyFilters();
  }));

  // Ordenamiento por columna
  const headers = document.querySelectorAll('thead th');
  headers.forEach((th, i) => {
    th.addEventListener('click', () => {
      const isNum = th.dataset.sort === 'num';
      const dir = th.dataset.dir === 'asc' ? 'desc' : 'asc';
      headers.forEach(h => h.dataset.dir = '');
      th.dataset.dir = dir;
      const sorted = rows.slice().sort((a, b) => {
        const av = a.children[i].textContent.trim();
        const bv = b.children[i].textContent.trim();
        if (isNum) {
          const an = parseFloat(av) || -Infinity;
          const bn = parseFloat(bv) || -Infinity;
          return dir === 'asc' ? an - bn : bn - an;
        }
        return dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
      sorted.forEach(r => tbody.appendChild(r));
    });
  });
})();
</script>
</body>
</html>
`;
