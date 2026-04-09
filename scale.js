// ──────────────────────────────────────────
// zoomControl: false  關閉預設左上角 +/- 按鈕
// 之後手動加到右側，示範自訂位置
// ──────────────────────────────────────────
const map = L.map('map', { zoomControl: false }).setView([25.0478, 121.5318], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);


// ──────────────────────────────────────────
// L.control.scale(options)
//   顯示距離比例尺（左下角）
//   options:
//     position   'bottomleft'（預設）/ 'bottomright' / 'topleft' / 'topright'
//     metric     true = 顯示公制（km / m）
//     imperial   true = 顯示英制（mi / ft）
//     maxWidth   比例尺最大寬度（px），Leaflet 會自動取整數刻度
// ──────────────────────────────────────────
L.control.scale({
    position: 'bottomleft',
    metric: true,
    imperial: false,
    maxWidth: 150,
}).addTo(map);


// ──────────────────────────────────────────
// L.control.zoom(options)
//   options:
//     position        控制項位置
//     zoomInText      放大按鈕文字（預設 '+'）
//     zoomOutText     縮小按鈕文字（預設 '−'）
//     zoomInTitle     放大按鈕 hover 提示
//     zoomOutTitle    縮小按鈕 hover 提示
// ──────────────────────────────────────────
L.control.zoom({
    position: 'topright',
    zoomInText: '＋',
    zoomOutText: '－',
}).addTo(map);


// ──────────────────────────────────────────
// 自訂 Control：L.Control.extend()
//   可以完全自訂控制元件的 HTML 和行為
// ──────────────────────────────────────────
const CoordControl = L.Control.extend({
    onAdd(map) {
        const div = L.DomUtil.create('div');
        div.style.cssText = 'background:#fff;padding:6px 10px;border-radius:4px;font-size:12px;font-family:monospace;box-shadow:0 1px 4px rgba(0,0,0,.3)';
        div.textContent = '移動滑鼠';

        map.on('mousemove', (e) => {
            div.textContent = `${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`;
        });

        return div;
    },
});

new CoordControl({ position: 'bottomright' }).addTo(map);
