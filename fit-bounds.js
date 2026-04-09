const map = L.map('map').setView([25.0478, 121.5318], 8);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);


// ──────────────────────────────────────────
// 準備兩組標記
// ──────────────────────────────────────────
const allMarkers = L.featureGroup([
    L.marker([25.0478, 121.5318]).bindPopup('台北'),
    L.marker([24.1477, 120.6736]).bindPopup('台中'),
    L.marker([22.9998, 120.2269]).bindPopup('台南'),
    L.marker([22.6273, 120.3014]).bindPopup('高雄'),
]).addTo(map);

const northMarkers = L.featureGroup([
    L.marker([25.0478, 121.5318]).bindPopup('台北'),
    L.marker([25.1276, 121.7392]).bindPopup('基隆'),
    L.marker([24.8138, 121.0177]).bindPopup('桃園'),
]).addTo(map);


// ──────────────────────────────────────────
// map.fitBounds(bounds, options?)
//   bounds  可以是：
//     - featureGroup.getBounds()  → 自動算出群組的邊界
//     - L.latLngBounds([[s,w],[n,e]])  → 手動指定西南、東北角
//   options:
//     padding      [上下px, 左右px]  邊界留白
//     maxZoom      最大縮放層級上限
//     animate      是否有動畫（預設 true）
// ──────────────────────────────────────────

document.getElementById('btn-all').addEventListener('click', () => {
    // featureGroup.getBounds() 自動計算包含所有圖層的邊界
    map.fitBounds(allMarkers.getBounds(), { padding: [40, 40] });
});

document.getElementById('btn-north').addEventListener('click', () => {
    map.fitBounds(northMarkers.getBounds(), { padding: [60, 60], maxZoom: 12 });
});

document.getElementById('btn-manual').addEventListener('click', () => {
    // L.latLngBounds([[南緯, 西經], [北緯, 東經]])
    const bounds = L.latLngBounds(
        [21.9, 120.0],   // 西南角（台灣南端）
        [25.3, 122.0],   // 東北角（台灣北端）
    );
    map.fitBounds(bounds);
});
