import {
  Viewer,
  Ion,
  Math,
  ScreenSpaceEventHandler,
  defined,
  Cartographic,
  Color,
  Cartesian2,
  ScreenSpaceEventType,
} from "cesium";

// import.meta.env で読み取る
const token = import.meta.env.VITE_CESIUM_ION_ACCESS_TOKEN;
if (!token) {
  throw new Error("VITE_CESIUM_ION_ACCESS_TOKEN is not defined");
}

export const interactiveCesium = async () => {
  // トークン＆ベースURL
  Ion.defaultAccessToken = token || "";
  (window as any).CESIUM_BASE_URL = "./cesium";

  const viewer = new Viewer("cesiumContainer");

  // クリックイベントハンドラー
  viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(
    (event: ScreenSpaceEventHandler.PositionedEvent) => {
      const pickedObject = viewer.scene.pick(event.position);

      if (defined(pickedObject)) {
        console.log("オブジェクトがクリックされました:", pickedObject.id);
      } else {
        // 地面がクリックされた場合、その位置にマーカーを追加
        const cartesian = viewer.camera.pickEllipsoid(
          event.position,
          viewer.scene.globe.ellipsoid
        );
        if (cartesian) {
          const cartographic = Cartographic.fromCartesian(cartesian);
          const longitude = Math.toDegrees(cartographic.longitude);
          const latitude = Math.toDegrees(cartographic.latitude);

          viewer.entities.add({
            position: cartesian,
            point: {
              pixelSize: 10,
              color: Color.YELLOW,
              outlineColor: Color.BLACK,
              outlineWidth: 2,
            },
            label: {
              text: `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`,
              font: "12pt monospace",
              pixelOffset: new Cartesian2(0, -40),
            },
          });
        }
      }
    },
    ScreenSpaceEventType.LEFT_CLICK
  );

  // マウスオーバーイベント
  viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(
    (event: ScreenSpaceEventHandler.MotionEvent) => {
      const pickedObject = viewer.scene.pick(event.endPosition);

      if (defined(pickedObject)) {
        document.body.style.cursor = "pointer";
      } else {
        document.body.style.cursor = "default";
      }
    },
    ScreenSpaceEventType.MOUSE_MOVE
  );
};

// 起動
interactiveCesium();
