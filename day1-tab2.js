const map = L.map('map').setView([25.0478, 121.5318], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);


// ──────────────────────────────────────────
// map.on('mousemove', fn)
//   e.latlng  → 滑鼠位置的 { lat, lng }
// ──────────────────────────────────────────
const coordsEl = document.getElementById('coords');

map.on('mousemove', (e) => {
    const { lat, lng } = e.latlng;
    coordsEl.textContent = `lat: ${lat.toFixed(5)}  lng: ${lng.toFixed(5)}`;
});


// ──────────────────────────────────────────
// map.on('click', fn)
//   e.latlng  → 點擊位置的 { lat, lng }
//   每次點擊都動態新增一個 marker
// ──────────────────────────────────────────
map.on('click', (e) => {
    const { lat, lng } = e.latlng;

    const marker = L.marker([lat, lng]).addTo(map);

    marker.bindPopup(`
        <b>你點擊的位置</b><br>
        lat: ${lat.toFixed(5)}<br>
        lng: ${lng.toFixed(5)}
    `).openPopup();
});


// ──────────────────────────────────────────
// 進階：右鍵點擊清除所有動態 marker
// map.on('contextmenu', fn)
// ──────────────────────────────────────────
const markers = [];  // 記錄所有動態加入的 marker

map.on('click', (e) => {
    markers.push(L.marker(e.latlng).addTo(map));
});

map.on('contextmenu', () => {
    markers.forEach(m => m.remove());
    markers.length = 0;  // 清空陣列
});
