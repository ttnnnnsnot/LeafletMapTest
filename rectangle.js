const map = L.map('map').setView([25.0478, 121.5318], 12);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);


// ──────────────────────────────────────────
// L.rectangle(bounds, options)
//   bounds  [[南緯, 西經], [北緯, 東經]]
//           或 L.latLngBounds(...)
//   options 同 polygon：color / weight / fillColor / fillOpacity
//
//   和 polygon 的差別：
//     rectangle 只需要兩個角座標（自動補全四個頂點）
//     polygon   需要逐一指定所有頂點
// ──────────────────────────────────────────
const rect1 = L.rectangle(
    [[25.06, 121.50], [25.03, 121.56]],
    {
        color: '#3b82f6',
        weight: 2,
        fillOpacity: 0.15,
    }
).addTo(map);

rect1.bindPopup('基本矩形<br>兩個角座標：西南 + 東北');


// ──────────────────────────────────────────
// setBounds(bounds)  動態更新矩形範圍
// getBounds()        取得目前的邊界框
// ──────────────────────────────────────────
const rect2 = L.rectangle(
    [[25.02, 121.53], [24.98, 121.59]],
    { color: '#e74c3c', weight: 2, fillOpacity: 0.15 }
).addTo(map);

rect2.bindPopup('點擊後範圍放大');
rect2.on('click', () => {
    rect2.setBounds([[25.03, 121.52], [24.97, 121.60]]);
});


// ──────────────────────────────────────────
// 從 map.getBounds() 取得目前可視範圍
// 並畫出來（展示動態用法）
// ──────────────────────────────────────────
const viewRect = L.rectangle(map.getBounds(), {
    color: '#2ecc71',
    weight: 1,
    fillOpacity: 0.05,
    dashArray: '6 4',
}).addTo(map);

viewRect.bindTooltip('目前地圖可視範圍（拖曳後不更新，僅示範）', { permanent: true });
