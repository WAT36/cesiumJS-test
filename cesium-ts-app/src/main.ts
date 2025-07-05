// src/main.ts
import "cesium/Widgets/widgets.css";
import {
  Viewer,
  Ion,
  createWorldTerrainAsync,
  Cartesian3,
  Color,
  Cartesian2,
  VerticalOrigin,
} from "cesium";

// import.meta.env で読み取る
const token = import.meta.env.VITE_CESIUM_ION_ACCESS_TOKEN;
if (!token) {
  throw new Error("VITE_CESIUM_ION_ACCESS_TOKEN is not defined");
}

async function initCesium() {
  // 1. トークン＆ベースURL
  Ion.defaultAccessToken = token || "";
  (window as any).CESIUM_BASE_URL = "./cesium";

  // 2. 非同期で World Terrain プロバイダーを取得
  const terrainProvider = await createWorldTerrainAsync({
    requestVertexNormals: true, // 必要に応じてオプション指定可
  });

  // 3. Viewer を初期化
  const viewer = new Viewer("cesiumContainer", {
    terrainProvider,
    timeline: false,
    animation: false,
  });

  // 4. サンプル：東京駅にピン
  viewer.entities.add({
    name: "東京駅",
    position: Cartesian3.fromDegrees(139.767, 35.681),
    point: { pixelSize: 12, color: Color.ORANGE },
    label: {
      text: "東京駅",
      font: "14px sans-serif",
      verticalOrigin: VerticalOrigin.BOTTOM,
      pixelOffset: new Cartesian2(0, -10),
    },
  });
  viewer.zoomTo(viewer.entities);
}

// 起動
initCesium();
