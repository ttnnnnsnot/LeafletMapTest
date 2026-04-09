# Leaflet 練習地圖

用 [Leaflet.js](https://leafletjs.com/) 從零學習互動地圖的範例集，每個主題獨立一頁，方便對照學習。

## 線上展示

部署後可在以下網址查看（替換為你的 GitHub 帳號）：

```
https://<your-username>.github.io/<repo-name>/
```

---

## 目錄結構

```
├── index.html          # 導覽頁
├── day1-tab1.html/js   # setView / marker / bindPopup
├── day1-tab2.html/js   # map.on('click')
├── day2-tab1.html/js   # polygon / circle / polyline
├── day2-tab2.html/js   # L.geoJSON() 三個 callback
└── .github/workflows/
    └── deploy.yml      # GitHub Actions 自動部署
```

---

## 本地執行

直接用瀏覽器開啟 `index.html` 即可（使用 CartoDB tile，無 Referer 限制）。

或用 VS Code 安裝 **Live Server** 擴充套件後右鍵 → Open with Live Server。

---

## 上傳到 GitHub Pages 步驟

### 1. 建立 GitHub Repository

在 GitHub 新增一個 repository，建議設為 **Public**（Pages 免費方案需要 Public）。

### 2. 推上去

```bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

### 3. 開啟 Pages 設定

GitHub repo 頁面 → **Settings** → **Pages**

- Source 選 **GitHub Actions**
- 儲存後 push 到 main 就會自動觸發部署

### 4. 查看部署狀態

GitHub repo 頁面 → **Actions** tab，可以看到每次 push 的部署紀錄。

---

## 學習內容

### setView / marker / bindPopup

| API | 說明 |
|-----|------|
| `L.map('id').setView([lat, lng], zoom)` | 初始化地圖，設定中心點與縮放層級 |
| `L.marker([lat, lng]).addTo(map)` | 在指定座標放一個圖釘 |
| `marker.bindPopup('html')` | 綁定點擊後的彈出框 |
| `marker.openPopup()` | 程式碼主動打開 Popup |
| `marker.bindTooltip('text', options)` | 綁定 hover 提示（`permanent: true` 常駐顯示） |
| `map.flyTo([lat, lng], zoom)` | 帶動畫效果移動地圖視角 |

### map.on('click')

| API | 說明 |
|-----|------|
| `map.on('click', fn)` | 點擊地圖觸發，`e.latlng` 取得座標 |
| `map.on('mousemove', fn)` | 滑鼠移動觸發，即時顯示座標 |
| `map.on('contextmenu', fn)` | 右鍵觸發 |
| `layer.remove()` | 從地圖移除圖層 |

### polygon / circle / polyline

| API | 說明 |
|-----|------|
| `L.polygon([[lat,lng], ...], options)` | 多邊形，座標陣列自動封閉 |
| `L.circle([lat, lng], { radius })` | 圓形，`radius` 單位是**公尺** |
| `L.polyline([[lat,lng], ...], options)` | 折線，不封閉、無填充 |

常用 options：`color`、`weight`、`fillColor`、`fillOpacity`、`dashArray`

### L.geoJSON() 三個 callback

```js
L.geoJSON(data, {

    // ① 只作用在 Polygon / LineString
    //    回傳樣式物件
    style(feature) {
        return { color: '#e74c3c', fillOpacity: 0.2 };
    },

    // ② 每個 feature 都執行一次
    //    layer 是對應的 Leaflet 圖層
    onEachFeature(feature, layer) {
        layer.bindPopup(feature.properties.name);
    },

    // ③ 只作用在 Point
    //    必須 return 一個 Leaflet layer
    pointToLayer(feature, latlng) {
        return L.circleMarker(latlng, { radius: 10 });
    },

})
```

GeoJSON 支援的 geometry 類型：`Point`、`LineString`、`Polygon`（及其 Multi 版本）

---

## 參考資料

- [Leaflet 官方文件](https://leafletjs.com/reference.html)
- [GeoJSON 規格說明](https://geojson.org/)
- [CartoDB Basemaps](https://github.com/CartoDB/basemap-styles)
