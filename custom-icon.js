const map = L.map('map').setView([25.0478, 121.5318], 14);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);


// ──────────────────────────────────────────
// L.icon(options)
//   用圖片檔案當作 marker 圖示
//   iconUrl      圖片路徑
//   iconSize     圖片顯示尺寸 [寬, 高]（px）
//   iconAnchor   圖片的「定位點」相對左上角的偏移 [x, y]
//                通常設在圖片底部中央，讓尖端對準座標
//   popupAnchor  Popup 出現的位置（相對 iconAnchor）
// ──────────────────────────────────────────
const redIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.marker([25.0478, 121.5318], { icon: redIcon })
    .addTo(map)
    .bindPopup('L.icon() — 紅色圖釘');


const greenIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.marker([25.0395, 121.5665], { icon: greenIcon })
    .addTo(map)
    .bindPopup('L.icon() — 綠色圖釘');


// ──────────────────────────────────────────
// L.divIcon(options)
//   用 HTML + CSS 自訂圖示，不需要圖片檔案
//   html       任意 HTML 字串
//   className  外層 div 的 class（預設有白色背景，通常設為空字串清除）
//   iconSize   容器尺寸
//   iconAnchor 定位點
// ──────────────────────────────────────────
const emojiIcon = L.divIcon({
    html: '<div style="font-size:28px; line-height:1;">📍</div>',
    className: '',       // 清除預設白色背景
    iconSize: [30, 30],
    iconAnchor: [15, 28],
});

L.marker([25.0600, 121.5200], { icon: emojiIcon })
    .addTo(map)
    .bindPopup('L.divIcon() — Emoji 圖示');


// ──────────────────────────────────────────
// divIcon 搭配自訂樣式：Label 標籤
// ──────────────────────────────────────────
// iconSize: null  → 不讓 Leaflet 固定容器大小，div 隨文字長度自動撐開
// white-space: nowrap → 防止換行（配合 iconSize: null 才能正確顯示）
const labelIcon = L.divIcon({
    html: `<div style="
        background:#3b82f6; color:#fff; padding:4px 8px;
        border-radius:4px; font-size:12px; white-space:nowrap;
        box-shadow:0 1px 4px rgba(0,0,0,.3);
    ">台北 101</div>`,
    className: '',
    iconSize: null,
    iconAnchor: [30, 10],
});

L.marker([25.0330, 121.5645], { icon: labelIcon })
    .addTo(map)
    .bindPopup('L.divIcon() — 文字標籤樣式');
