const map = L.map('map').setView([25.0478, 121.5318], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);

const statusEl = document.getElementById('status');
let locationMarker = null;
let accuracyCircle = null;


// ──────────────────────────────────────────
// map.locate(options)
//   呼叫瀏覽器 Geolocation API
//   options:
//     setView        true = 自動移動地圖到定位位置
//     maxZoom        自動移動時的最大 zoom
//     watch          true = 持續追蹤位置（GPS 導航模式）
//     enableHighAccuracy  true = 要求高精度（耗電較多）
//     timeout        等待逾時毫秒數
// ──────────────────────────────────────────
document.getElementById('btn-locate').addEventListener('click', () => {
    statusEl.textContent = '定位中...';
    map.locate({
        setView: true,
        maxZoom: 16,
        enableHighAccuracy: true,
    });
});


// ──────────────────────────────────────────
// map.on('locationfound', fn)
//   定位成功後觸發
//   e.latlng    位置座標
//   e.accuracy  精度（公尺），數字越小越精確
//   e.bounds    以精度為半徑的邊界框
// ──────────────────────────────────────────
map.on('locationfound', (e) => {
    statusEl.textContent = `定位成功 — 精度約 ${Math.round(e.accuracy)} 公尺`;

    // 移除上一次的標記
    if (locationMarker) locationMarker.remove();
    if (accuracyCircle) accuracyCircle.remove();

    // 畫出位置標記
    locationMarker = L.marker(e.latlng)
        .addTo(map)
        .bindPopup(`你在這裡<br>精度：${Math.round(e.accuracy)} m`)
        .openPopup();

    // 畫出精度範圍圓
    accuracyCircle = L.circle(e.latlng, {
        radius: e.accuracy,
        color: '#3b82f6',
        fillOpacity: 0.1,
        weight: 1,
    }).addTo(map);
});


// ──────────────────────────────────────────
// map.on('locationerror', fn)
//   定位失敗（拒絕權限、逾時等）
//   e.message  錯誤訊息
// ──────────────────────────────────────────
map.on('locationerror', (e) => {
    statusEl.textContent = `定位失敗：${e.message}`;
});
