const map = L.map('map').setView([25.0478, 121.5318], 13);

// CartoDB 作為預設底圖
const baseLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);


// ──────────────────────────────────────────
// WMTS（預先切片）
//   L.tileLayer(urlTemplate, options)
//   和一般 tile 用法完全一樣，只是 URL 來自政府伺服器
//
//   國土測繪中心 WMTS URL 規則：
//   https://wmts.nlsc.gov.tw/wmts/{圖層名}/default/GoogleMapsCompatible/{z}/{y}/{x}
//   注意：y 和 x 的順序和 OpenStreetMap 相反（{y}/{x} 不是 {x}/{y}）
// ──────────────────────────────────────────

// 電子地圖（街道圖）
const wmtsEmap = L.tileLayer(
    'https://wmts.nlsc.gov.tw/wmts/EMAP5/default/GoogleMapsCompatible/{z}/{y}/{x}',
    {
        attribution: '© 國土測繪中心',
        maxZoom: 20,
        opacity: 1,
    }
);

// 正射影像（空拍衛星圖）
const wmtsPhoto = L.tileLayer(
    'https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}',
    {
        attribution: '© 國土測繪中心',
        maxZoom: 20,
        opacity: 1,
    }
);


// ──────────────────────────────────────────
// WMS（即時渲染）
//   L.tileLayer.wms(url, options)
//   必要 options：
//     layers   圖層名稱（向伺服器查詢得知，或看服務文件）
//     format   回傳圖片格式，通常 'image/png'
//     transparent  true = 背景透明，可疊在其他圖層上
//     version  WMS 版本，通常 '1.1.1' 或 '1.3.0'
//
//   WMS 和 WMTS 的差別：
//     WMTS → URL 有 {z}/{y}/{x}，速度快（取快取圖）
//     WMS  → URL 固定，Leaflet 自動帶 BBOX 參數，速度較慢但可查詢
// ──────────────────────────────────────────
const wmsEmap = L.tileLayer.wms(
    'https://wms.nlsc.gov.tw/wms',
    {
        layers: 'EMAP',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        attribution: '© 國土測繪中心',
    }
);


// ──────────────────────────────────────────
// 按鈕切換圖層
// ──────────────────────────────────────────
let currentLayer = wmtsEmap;
wmtsEmap.addTo(map);

const layerMap = {
    'emap':     wmtsEmap,
    'photo':    wmtsPhoto,
    'wms-emap': wmsEmap,
};

document.querySelectorAll('.layer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.dataset.layer;
        if (layerMap[key] === currentLayer) return;

        map.removeLayer(currentLayer);
        currentLayer = layerMap[key];
        currentLayer.addTo(map);

        document.querySelectorAll('.layer-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});
