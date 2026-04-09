const map = L.map('map').setView([25.0478, 121.5318], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);


// ──────────────────────────────────────────
// L.polygon([ [lat,lng], ... ], options)
//   座標陣列：順時針或逆時針都可以
//   常用 options:
//     color       邊框顏色
//     weight      邊框寬度（px）
//     fillColor   填充顏色（預設同 color）
//     fillOpacity 填充透明度 0~1
// ──────────────────────────────────────────
const polygon = L.polygon([
    [25.075, 121.505],
    [25.075, 121.575],
    [25.025, 121.575],
    [25.025, 121.505],
], {
    color: '#e74c3c',
    weight: 2,
    fillColor: '#e74c3c',
    fillOpacity: 0.15,
}).addTo(map);

polygon.bindPopup('<b>台北市大致範圍</b><br>L.polygon()');


// ──────────────────────────────────────────
// L.circle([lat, lng], options)
//   radius 單位是「公尺」
// ──────────────────────────────────────────
const circle = L.circle([25.0478, 121.5318], {
    radius: 800,          // 800 公尺
    color: '#3498db',
    weight: 2,
    fillOpacity: 0.25,
}).addTo(map);

circle.bindPopup('<b>台北車站周圍 800m</b><br>L.circle()');


// ──────────────────────────────────────────
// L.polyline([ [lat,lng], ... ], options)
//   畫一條折線（沒有封閉、沒有填充）
// ──────────────────────────────────────────
const polyline = L.polyline([
    [25.0478, 121.5318],  // 台北車站
    [25.0395, 121.5665],  // 台北 101
    [25.0167, 121.5380],  // 公館
], {
    color: '#2ecc71',
    weight: 4,
    dashArray: '8 4',     // 虛線：線段長 8px、間距 4px
}).addTo(map);

polyline.bindPopup('L.polyline() 折線');
