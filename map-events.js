const map = L.map('map').setView([25.0478, 121.5318], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);

const sLat    = document.getElementById('s-lat');
const sLng    = document.getElementById('s-lng');
const sZoom   = document.getElementById('s-zoom');
const logList = document.getElementById('log-list');

// 更新右側狀態區
function updateState() {
    const c = map.getCenter();
    sLat.textContent  = c.lat.toFixed(5);
    sLng.textContent  = c.lng.toFixed(5);
    sZoom.textContent = map.getZoom();
}

// 新增一筆事件紀錄（最新的在最上面）
function addLog(text, highlight = false) {
    const now  = new Date().toLocaleTimeString('zh-TW', { hour12: false });
    const item = document.createElement('div');
    item.className = 'log-item' + (highlight ? ' highlight' : '');
    item.innerHTML = `<span class="time">${now}</span>${text}`;
    logList.prepend(item);
}

// 初始狀態
updateState();


// ──────────────────────────────────────────
// map.on('load')
//   地圖第一次完成載入時觸發（只觸發一次）
// ──────────────────────────────────────────
map.on('load', () => addLog('load — 載入完成'));


// ──────────────────────────────────────────
// map.on('moveend')
//   拖曳或 panTo / flyTo 停止後觸發
//   map.getCenter() → 取得目前中心座標
// ──────────────────────────────────────────
map.on('moveend', () => {
    updateState();
    const c = map.getCenter();
    addLog(`moveend — ${c.lat.toFixed(4)}, ${c.lng.toFixed(4)}`);
});


// ──────────────────────────────────────────
// map.on('zoomend')
//   縮放結束後觸發
//   map.getZoom() → 取得目前縮放層級
// ──────────────────────────────────────────
map.on('zoomend', () => {
    updateState();
    addLog(`zoomend — zoom: ${map.getZoom()}`);
});


// ──────────────────────────────────────────
// map.on('layeradd') / map.on('layerremove')
// ──────────────────────────────────────────
map.on('layeradd',    (e) => addLog(`layeradd — ${e.layer.constructor.name}`, true));
map.on('layerremove', (e) => addLog(`layerremove — ${e.layer.constructor.name}`, true));


// ──────────────────────────────────────────
// 常用地圖狀態查詢 API
//   map.getCenter()   → LatLng 中心點
//   map.getZoom()     → number 縮放層級
//   map.getBounds()   → LatLngBounds 目前可視範圍
//   map.getSize()     → Point 地圖容器像素尺寸
// ──────────────────────────────────────────
L.marker([25.0478, 121.5318])
    .addTo(map)
    .bindPopup('拖曳或縮放地圖，觀察右側面板');
