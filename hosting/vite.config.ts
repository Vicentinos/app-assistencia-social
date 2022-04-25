import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "development") {
    return {
      build: { sourcemap: true, target: "esnext", minify: false },
    };
  } else return {};
});
