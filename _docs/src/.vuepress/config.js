const { description } = require("../../../package");

module.exports = {
  base: "/",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "helmut.cloud Software Development Kit",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#0da4d3" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],

  theme: "default-prefers-color-scheme",

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    prefersTheme: "dark",
    repo: "moovit-sp-gmbh",
    editLinks: true,
    docsBranch: "main",
    docsDir: "src",
    editLinkText: "",
    lastUpdated: true,
    nav: [
      {
        text: "MoovIT-SP",
        link: "https://www.moovit-sp.com",
      },
    ],
    locales: {
      "/": {
        selectText: "Languages",
        label: "English",
        ariaLabel: "Languages",
        sidebar: [
          {
            title: "Overview",
            collapsable: false,
            children: ["en/overview","en/api","en/contribution","en/dependencies"],
          },
          {
            title: "Methods",
            collapsable: false,
            children: ["en/methods/getting-started","en/methods/IDP"],
          },
        ],
      },
    },
  },

  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "en-US", // this will be set as the lang attribute on <html>
    },
    // "/de/": {
    //   lang: "de-DE",
    // },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp, lang) => {
          const dayjs = require("dayjs");
          const relativeTime = require("dayjs/plugin/relativeTime");
          require(`dayjs/locale/${lang.slice(0, 2)}`);
          dayjs.extend(relativeTime);
          return dayjs(timestamp).fromNow();
        },
      },
    ],
  ],
};
