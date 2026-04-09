const map = L.map('map').setView([25.0478, 121.5318], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);


// ──────────────────────────────────────────
// L.layerGroup(layers?)
//   把多個圖層打包成一組，方便一次 addTo / remove
//   適合：同類型圖層的開關控制
// ──────────────────────────────────────────
const stationGroup = L.layerGroup([
    L.marker([25.0478, 121.5318]).bindPopup('台北車站'),
    L.marker([25.0299, 121.5165]).bindPopup('板橋車站'),
    L.marker([25.0122, 121.4655]).bindPopup('樹林車站'),
]).addTo(map);


// ──────────────────────────────────────────
// L.featureGroup(layers?)
//   功能同 layerGroup，額外提供：
//   - getBounds()  取得包含所有圖層的邊界框
//   - 事件會冒泡到 featureGroup（可統一監聽）
//   適合：需要 fitBounds 或統一事件處理
// ──────────────────────────────────────────
const landmarkGroup = L.featureGroup([
    L.marker([25.0395, 121.5665]).bindPopup('台北 101'),
    L.marker([25.0600, 121.5200]).bindPopup('士林夜市'),
    L.marker([25.0800, 121.5800]).bindPopup('故宮博物院'),
]).addTo(map);

// featureGroup 統一監聽 click 事件
landmarkGroup.on('click', (e) => {
    console.log('點擊景點：', e.layer.getPopup().getContent());
});


// ──────────────────────────────────────────
// 按鈕：toggle stationGroup 顯示/隱藏
// ──────────────────────────────────────────
let stationVisible = true;
document.getElementById('btn-toggle').addEventListener('click', (e) => {
    if (stationVisible) {
        map.removeLayer(stationGroup);
        e.target.textContent = '顯示車站群組';
    } else {
        map.addLayer(stationGroup);
        e.target.textContent = '隱藏車站群組';
    }
    stationVisible = !stationVisible;
});


// ──────────────────────────────────────────
// 按鈕：map.fitBounds(featureGroup.getBounds())
//   自動縮放讓景點群組全部在畫面內
// ──────────────────────────────────────────
document.getElementById('btn-fit').addEventListener('click', () => {
    map.fitBounds(landmarkGroup.getBounds(), { padding: [40, 40] });
});
