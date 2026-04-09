// ──────────────────────────────────────────
// setView([lat, lng], zoom)
//   lat  = 緯度（南北），lng = 經度（東西）
//   zoom = 1（世界）~ 18（街道）
// ──────────────────────────────────────────
const map = L.map('map').setView([25.0478, 121.5318], 14);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);


// ──────────────────────────────────────────
// L.marker([lat, lng])  — 最簡單的標記
// ──────────────────────────────────────────
const m1 = L.marker([25.0478, 121.5318]).addTo(map);

// bindPopup(html)  — 綁定點擊後的彈出框
m1.bindPopup('<b>台北車站</b><br>點我看彈出框');

// openPopup()  — 頁面載入後自動打開
m1.openPopup();


// ──────────────────────────────────────────
// marker options
//   title   = 滑鼠 hover 的提示文字
//   opacity = 透明度 0~1
// ──────────────────────────────────────────
const m2 = L.marker([25.0330, 121.5654], {
    title: '信義區（hover 提示）',
    opacity: 0.7,
}).addTo(map);

// bindPopup 可以鏈式呼叫
m2.bindPopup('<b>信義區</b><br>opacity: 0.7');


// ──────────────────────────────────────────
// bindTooltip(text, options)
//   permanent: true  → 一直顯示，不用點擊
// ──────────────────────────────────────────
const m3 = L.marker([25.0600, 121.5200]).addTo(map);
m3.bindTooltip('士林（常駐 tooltip）', { permanent: true });
m3.bindPopup('士林夜市');


// ──────────────────────────────────────────
// marker.on('click', fn)  — marker 自己的事件
// 點 m2 後地圖自動 fly 過去
// ──────────────────────────────────────────
m2.on('click', () => {
    map.flyTo([25.0330, 121.5654], 16);  // flyTo 有動畫效果
});
