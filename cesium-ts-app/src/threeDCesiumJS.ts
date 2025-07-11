import {
  Viewer,
  Ion,
  createWorldTerrainAsync,
  Cartesian3,
  Math,
  HeadingPitchRoll,
  Transforms,
} from "cesium";

// import.meta.env で読み取る
const token = import.meta.env.VITE_CESIUM_ION_ACCESS_TOKEN;
if (!token) {
  throw new Error("VITE_CESIUM_ION_ACCESS_TOKEN is not defined");
}

async function threeDCesium() {
  // 1. トークン＆ベースURL
  Ion.defaultAccessToken = token || "";
  (window as any).CESIUM_BASE_URL = "./cesium";

  // 2. 非同期で World Terrain プロバイダーを取得
  const terrainProvider = await createWorldTerrainAsync({
    requestVertexNormals: true, // 必要に応じてオプション指定可
  });

  const viewer = new Viewer("cesiumContainer", {
    terrainProvider,
  });

  // 3Dモデルを追加（東京スカイツリー付近）
  const position = Cartesian3.fromDegrees(139.8107, 35.7101, 200);
  const heading = Math.toRadians(135);
  const pitch = 0;
  const roll = 0;
  const hpr = new HeadingPitchRoll(heading, pitch, roll);
  const orientation = Transforms.headingPitchRollQuaternion(position, hpr);

  viewer.entities.add({
    name: "サンプル3Dモデル",
    position: position,
    orientation: orientation,
    model: {
      uri: "https://assets.com/models/CesiumAir/Cesium_Air.glb",
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
  });

  // カメラを3Dモデルに向ける
  viewer.trackedEntity = viewer.entities.values[0];
}

// 起動
threeDCesium();
