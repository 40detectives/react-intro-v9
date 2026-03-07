import { playwright } from "@vitest/browser-playwright";
import { defineProject, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineProject({
    test: {
      name: "browser",
      include: ["**/*.browser.test.{js,jsx}"],
      browser: {
        enabled: true,
        provider: playwright(), // https://vitest.dev/config/browser/playwright
        instances: [{ browser: "chromium" }], // "chromium", "firefox", webkit
      },
    },
  }),
);
