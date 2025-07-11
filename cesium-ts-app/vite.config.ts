import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(
            __dirname,
            "node_modules/cesium/Build/Cesium/Workers"
          ),
          dest: "cesium",
        },
        {
          src: path.resolve(
            __dirname,
            "node_modules/cesium/Build/Cesium/Assets"
          ),
          dest: "cesium",
        },
        {
          src: path.resolve(
            __dirname,
            "node_modules/cesium/Build/Cesium/Widgets"
          ),
          dest: "cesium",
        },
        {
          src: path.resolve(
            __dirname,
            "node_modules/cesium/Build/Cesium/ThirdParty"
          ),
          dest: "cesium",
        },
        {
          src: path.resolve(
            __dirname,
            "node_modules/cesium/Build/Cesium/Cesium.js"
          ),
          dest: "cesium",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      // `import "cesium"` などがここを参照できるように
      cesium: path.resolve(__dirname, "node_modules/cesium/Build/Cesium"),
    },
  },
  define: {
    // これで Cesium ランタイム中の window.CESIUM_BASE_URL を "/cesium/" に置き換え
    "window.CESIUM_BASE_URL": JSON.stringify("/cesium/"),
  },
});
