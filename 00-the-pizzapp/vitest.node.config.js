import { defineProject, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineProject({
    test: {
      include: ["**/*.node.test.{js,jsx}"],
      name: "happy-dom",
      environment: "happy-dom",
    },
  }),
);
