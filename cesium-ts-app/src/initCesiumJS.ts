import { Viewer, Ion, createWorldTerrainAsync, Cartesian3, Math } from "cesium";

// import.meta.env で読み取る
const token = import.meta.env.VITE_CESIUM_ION_ACCESS_TOKEN;
if (!token) {
  throw new Error("VITE_CESIUM_ION_ACCESS_TOKEN is not defined");
}

export const initCesium = async () => {
  // トークン＆ベースURL
  Ion.defaultAccessToken = token || "";
  (window as any).CESIUM_BASE_URL = "./cesium";

  // 2. 非同期で World Terrain プロバイダーを取得
  const terrainProvider = await createWorldTerrainAsync({
    requestVertexNormals: true, // 必要に応じてオプション指定可
  });

  // Cesiumビューワーを作成
  const viewer = new Viewer("cesiumContainer", {
    terrainProvider,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    vrButton: false,
  });

  // 初期位置を東京に設定
  viewer.camera.setView({
    destination: Cartesian3.fromDegrees(139.6917, 35.6895, 10000),
    orientation: {
      heading: Math.toRadians(0),
      pitch: Math.toRadians(-90),
      roll: 0,
    },
  });
};

// 起動
initCesium();
