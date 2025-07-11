import {
  Viewer,
  Ion,
  createWorldTerrainAsync,
  Cartesian3,
  Color,
  LabelStyle,
  VerticalOrigin,
  Cartesian2,
} from "cesium";

// import.meta.env で読み取る
const token = import.meta.env.VITE_CESIUM_ION_ACCESS_TOKEN;
if (!token) {
  throw new Error("VITE_CESIUM_ION_ACCESS_TOKEN is not defined");
}

async function markCesium() {
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

  // 東京の位置にマーカーを追加
  viewer.entities.add({
    position: Cartesian3.fromDegrees(139.6917, 35.6895),
    point: {
      pixelSize: 10,
      color: Color.YELLOW,
      outlineColor: Color.BLACK,
      outlineWidth: 2,
    },
    label: {
      text: "東京",
      font: "14pt monospace",
      style: LabelStyle.FILL_AND_OUTLINE,
      outlineWidth: 2,
      verticalOrigin: VerticalOrigin.BOTTOM,
      pixelOffset: new Cartesian2(0, -9),
    },
  });

  // 横浜の位置にビルボードを追加
  viewer.entities.add({
    position: Cartesian3.fromDegrees(139.6226, 35.466),
    billboard: {
      image:
        "https://com/downloads/cesiumjs/releases/1.108/Build/Cesium/Widgets/Images/NavigationHelp/TouchHold.svg",
      width: 50,
      height: 50,
    },
    point: {
      pixelSize: 10,
      color: Color.YELLOW,
      outlineColor: Color.BLACK,
      outlineWidth: 2,
    },
    label: {
      text: "横浜",
      font: "14pt monospace",
      pixelOffset: new Cartesian2(0, -50),
    },
  });

  // 東京-横浜間にポリラインを追加
  viewer.entities.add({
    polyline: {
      positions: Cartesian3.fromDegreesArray([
        139.6917, 35.6895, 139.6226, 35.466,
      ]),
      width: 5,
      clampToGround: true,
      material: Color.RED,
    },
  });

  // 関東地方にポリゴンを追加
  viewer.entities.add({
    polygon: {
      hierarchy: Cartesian3.fromDegreesArray([
        139.0, 35.0, 140.0, 35.0, 140.0, 36.0, 139.0, 36.0,
      ]),
      material: Color.BLUE.withAlpha(0.3),
      outline: true,
      outlineColor: Color.BLUE,
    },
  });

  // カメラを東京に向ける
  viewer.camera.setView({
    destination: Cartesian3.fromDegrees(139.6917, 35.6895, 50000),
  });
}

// 起動
markCesium();
