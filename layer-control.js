// ──────────────────────────────────────────
// 底圖（Base Layers）：同時只能選一個
// ──────────────────────────────────────────
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
});

const cartoLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
});

const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
});

// 初始化地圖時帶入預設底圖
const map = L.map('map', { layers: [cartoLayer] }).setView([25.0478, 121.5318], 13);


// ──────────────────────────────────────────
// 疊加圖層（Overlays）：可多選
// ──────────────────────────────────────────
const stationLayer = L.layerGroup([
    L.marker([25.0478, 121.5318]).bindPopup('台北車站'),
    L.marker([25.0299, 121.5165]).bindPopup('板橋車站'),
]);

const landmarkLayer = L.layerGroup([
    L.marker([25.0395, 121.5665]).bindPopup('台北 101'),
    L.marker([25.0600, 121.5200]).bindPopup('士林夜市'),
]);

// 預設顯示車站圖層
stationLayer.addTo(map);


// ──────────────────────────────────────────
// L.control.layers(baseLayers, overlays, options)
//   baseLayers  物件：{ '顯示名稱': tileLayer, ... }  → radio 選一
//   overlays    物件：{ '顯示名稱': layer, ... }      → checkbox 多選
//   options:
//     collapsed  true（預設）= 摺疊成圖示，false = 常駐展開
// ──────────────────────────────────────────
const baseLayers = {
    'CartoDB（預設）': cartoLayer,
    'OpenStreetMap':  osmLayer,
    '深色底圖':        darkLayer,
};

const overlays = {
    '車站': stationLayer,
    '景點': landmarkLayer,
};

L.control.layers(baseLayers, overlays, { collapsed: false }).addTo(map);
