// vite.config.ts
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";

export default defineConfig({
  root: ".", // プロジェクトルート
  base: "./", // 相対パスで出力
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
      // Cesium のローダーが参照するパスを、ビルド後の /cesium 配下にマッピング
      cesium: path.resolve(__dirname, "node_modules/cesium/Build/Cesium"),
    },
  },
});
