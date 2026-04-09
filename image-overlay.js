const map = L.map('map').setView([25.0478, 121.5318], 12);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);


// ──────────────────────────────────────────
// L.imageOverlay(imageUrl, bounds, options)
//   imageUrl  圖片網址或本地路徑
//   bounds    圖片要覆蓋的地理範圍 [[南緯,西經],[北緯,東經]]
//   options:
//     opacity       透明度 0~1
//     interactive   true = 可以點擊觸發事件
//     crossOrigin   跨域圖片設為 true 或 'anonymous'
//
//   常見用途：
//     - 疊加平面圖（室內地圖）
//     - 疊加歷史地圖
//     - 疊加氣象雷達圖、熱力圖圖片
// ──────────────────────────────────────────

// 用 SVG data URL 示範，不依賴任何外部圖片
// 實際使用時換成：本地圖片路徑、衛星影像 URL、氣象雷達圖 URL 等
const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="350" viewBox="0 0 200 350">
  <rect width="200" height="350" fill="#3b82f6" rx="8" opacity="0.85"/>
  <text x="100" y="140" text-anchor="middle" fill="white" font-size="48" font-family="sans-serif">🗺️</text>
  <text x="100" y="200" text-anchor="middle" fill="white" font-size="22" font-family="sans-serif" font-weight="bold">Image Overlay</text>
  <text x="100" y="232" text-anchor="middle" fill="#bfdbfe" font-size="13" font-family="sans-serif">疊加在台灣範圍上</text>
  <text x="100" y="260" text-anchor="middle" fill="#bfdbfe" font-size="11" font-family="sans-serif">可換成平面圖、雷達圖等</text>
</svg>`;
const imageUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgContent);

// 圖片覆蓋的地理範圍（台灣本島大致邊界）
const bounds = L.latLngBounds(
    [21.9, 120.0],   // 西南角
    [25.3, 122.0],   // 東北角
);

const overlay = L.imageOverlay(imageUrl, bounds, {
    opacity: 0.7,
    interactive: true,   // 讓圖片可以被點擊
}).addTo(map);

overlay.bindPopup('L.imageOverlay() 示範<br>實際用途：平面圖、衛星影像、雷達圖');

// 顯示圖片邊界框（輔助確認對齊位置）
L.rectangle(bounds, {
    color: '#e74c3c',
    weight: 1,
    fill: false,
    dashArray: '6 4',
}).addTo(map);

map.fitBounds(bounds, { padding: [20, 20] });


// ──────────────────────────────────────────
// setOpacity(value)   動態調整透明度
// getElement()        取得底層 <img> 元素
// setBounds(bounds)   動態更新覆蓋範圍
// ──────────────────────────────────────────
document.getElementById('opacity').addEventListener('input', (e) => {
    overlay.setOpacity(Number(e.target.value));
});
