const map = L.map('map').setView([25.0478, 121.5318], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);


// ──────────────────────────────────────────
// GeoJSON 資料（內嵌，不需要 server）
//   GeoJSON 支援三種 geometry：
//     Point      → 點
//     LineString → 線
//     Polygon    → 面
//   每個 feature 可以有任意 properties
// ──────────────────────────────────────────
const geojsonData = {
    type: 'FeatureCollection',
    features: [
        // ── Point ──
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [121.5318, 25.0478] },
            properties: { name: '台北車站', category: 'station' },
        },
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [121.5665, 25.0395] },
            properties: { name: '台北 101', category: 'landmark' },
        },
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [121.5198, 25.0600] },
            properties: { name: '士林夜市', category: 'food' },
        },
        // ── LineString ──
        {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [
                    [121.5318, 25.0478],
                    [121.5665, 25.0395],
                ],
            },
            properties: { name: '車站 → 101', category: 'route' },
        },
        // ── Polygon ──
        {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [121.505, 25.075],
                    [121.575, 25.075],
                    [121.575, 25.025],
                    [121.505, 25.025],
                    [121.505, 25.075],  // 最後一點要閉合（等於第一點）
                ]],
            },
            properties: { name: '台北市區', category: 'area' },
        },
    ],
};


// ──────────────────────────────────────────
// L.geoJSON(data, options)
//
// options 三個重要 callback：
//
//   style(feature)
//     → 只作用在 Polygon / LineString
//     → 回傳樣式物件 { color, weight, fillOpacity, ... }
//
//   onEachFeature(feature, layer)
//     → 每個 feature 都會呼叫一次
//     → 常用來加 popup、綁定事件
//     → layer 就是這個 feature 對應的 Leaflet 圖層
//
//   pointToLayer(feature, latlng)
//     → 只作用在 Point
//     → 決定 Point 要用什麼圖層呈現（預設是 marker）
//     → 必須 return 一個 Leaflet layer
// ──────────────────────────────────────────

// 顏色對應表
const COLOR = {
    station:  '#e74c3c',
    landmark: '#9b59b6',
    food:     '#f39c12',
    route:    '#3498db',
    area:     '#2ecc71',
};

L.geoJSON(geojsonData, {

    // ① style — 針對 Polygon / LineString 設定樣式
    style(feature) {
        const color = COLOR[feature.properties.category] ?? '#999';
        return {
            color,
            weight: 2,
            fillColor: color,
            fillOpacity: 0.15,
        };
    },

    // ② onEachFeature — 每個 feature 都執行
    onEachFeature(feature, layer) {
        const { name, category } = feature.properties;

        // 加 Popup
        layer.bindPopup(`<b>${name}</b><br>類型：${category}`);

        // 加 Tooltip（hover 顯示名稱）
        layer.bindTooltip(name);

        // 可以在這裡綁更多事件，例如 highlight
        layer.on('mouseover', () => layer.openTooltip());
        layer.on('mouseout',  () => layer.closeTooltip());
    },

    // ③ pointToLayer — Point 轉成自訂圖層
    //    這裡改用 circleMarker 取代預設的圖釘 icon
    pointToLayer(feature, latlng) {
        const color = COLOR[feature.properties.category] ?? '#999';
        return L.circleMarker(latlng, {
            radius: 10,
            color: '#fff',
            weight: 2,
            fillColor: color,
            fillOpacity: 0.9,
        });
    },

}).addTo(map);
