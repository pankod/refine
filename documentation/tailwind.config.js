const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./docs/**/*.{md,mdx,tsx}",
    "./tutorial/**/*.{md,mdx,tsx}",
  ],
  jit: true,
  theme: {
    extend: {
      borderRadius: {
        "2.5xl": "1.25rem",
      },
      zIndex: {
        popover: 9,
        modal: 100,
        mobileNavbar: 1000,
        "top-announcement": 1000,
      },
      colors: {
        discord: "#5865F2",
        twitter: "#00AAEC",
        refine: {
          red: "#FF4C4D",
          orange: "#FF9933",
          yellow: "#FFBF00",
          green: "#1FAD66",
          "green-alt": "#26D97F",
          "tutorial-green": "#24A866",
          cyan: "#0F8A8A",
          "cyan-alt": "#47EBEB",
          blue: "#0080FF",
          selection: "#6EF7F7",
          "enterprise-purple": "#4D0099",
          "enterprise-purple-2": "#8000ff",
          "enterprise-purple-3": "#E6CCFF",
          "enterprise-purple-4": "#3C216A",
          "enterprise-purple-5": "#BF80FF",
          "blue-alt": "#6EB3F7",
          "blue-2": "#58AFDF",
          "blue-2-light": "#E6F7FF",
          "react-dark-link": "#38BDF8",
          "react-light-link": "#0369A1",
          "react-dark-code": "#09090B",
          "react-light-code": "#FAFAFA",
          indigo: "#3333FF",
          "indigo-alt": "#8080FF",
          purple: "#8000FF",
          "purple-alt": "#B366FF",
          pink: "#ED5EC9",
          bg: "#0A0A29",
          kdb: "#DBDBF0",
          "react-dark-orange": "#FB923C", // orange-400
          "react-dark-purple": "#C084FC", // purple-400
          "react-dark-green": "#4ADE80", // green-400
          "react-dark-green-alt": "#26D97F",
          "react-light-orange": "#C2410C", // orange-700
          "react-light-purple": "#8200db", // purple-700
          "react-light-green": "#15803D", // green-700
          "react-light-green-alt": "#24A866",
          "react-light-orange-bg": "#FEF5E7",
          "react-light-purple-bg": "#F3F4FD",
          "react-light-green-bg": "#F4FBF9",
          "tutorial-dark-bg": "#1D2026",
          "bg-alt": "#262640",
          "link-dark": "#38BDF8",
          "link-light": "#0369A1",
          "landing-tile-icon-border": "#4D4DB2",
          "landing-playground-border": "#4D4DB2",
          "landing-tile-image-border": "#272762",
          "landing-stats-fallback-bg": "#242442",
          "landing-footer-bg": "#0F0F3D",
          "landing-footer-border": "#2E2E78",
          "walkthrough-button-bg": "#4D4DB2",
          "walkthrough-button-alt-bg": "#474E6B",
          "enterprise-table-alt-dark": "#1D1E30",
          "enterprise-table-alt": "#F4F8FB",
        },
        gray: {
          0: "rgb(var(--color-gray-0) / <alpha-value>)",
          50: "rgb(var(--color-gray-50) / <alpha-value>)",
          100: "rgb(var(--color-gray-100) / <alpha-value>)",
          200: "rgb(var(--color-gray-200) / <alpha-value>)",
          300: "rgb(var(--color-gray-300) / <alpha-value>)",
          400: "rgb(var(--color-gray-400) / <alpha-value>)",
          500: "rgb(var(--color-gray-500) / <alpha-value>)",
          600: "rgb(var(--color-gray-600) / <alpha-value>)",
          700: "rgb(var(--color-gray-700) / <alpha-value>)",
          800: "rgb(var(--color-gray-800) / <alpha-value>)",
          900: "rgb(var(--color-gray-900) / <alpha-value>)",
          1000: "rgb(var(--color-gray-1000) / <alpha-value>)",
        },
        "refine-week": {
          supabase: {
            "cover-shadow": "rgba(62, 207, 142, 0.25)",
            "day-indicator-start": "#1FAD66",
            "day-indicator-stop": "#3ECF8E",
          },
          strapi: {
            "cover-shadow": "rgba(73, 69, 255, 0.25)",
            "day-indicator-start": "#4945FF",
            "day-indicator-stop": "#4D88FF",
          },
        },
      },
      fontFamily: {
        sans: ["var(--primary-font-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["Source Code Pro", ...defaultTheme.fontFamily.mono],
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.serif],
        disket: ["Disket Mono", ...defaultTheme.fontFamily.mono],
        inter: ["Inter", ...defaultTheme.fontFamily.serif],
        "jetBrains-mono": [
          "JetBrains Mono",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      dropShadow: {
        "showcase-highlight": [
          "0px 3px 7px rgba(108, 119, 147, 0.141)",

          "0px 13px 13px rgba(108, 119, 147, 0.141)",

          "0px 20px 18px rgba(108, 119, 147, 0.18)",

          "0px 34px 21px rgba(108, 119, 147, 0.2)",
          "0px 54px 23px rgba(108, 119, 147, 0)",
        ],
      },
      boxShadow: {
        modal: "4px 8px 16px rgba(42, 42, 66, 0.25)",
        tile: "6px 8px 16px 0 rgba(42, 42, 66, 0.4)",
        integrationTile: "3px 4px 8px 0 rgba(42, 42, 66, 0.25)",
        tagTile: "3px -2px 8px 0 rgba(42, 42, 66, 0.25)",
        startTiles: "4px 8px 16px rgba(42, 42, 66, 0.25)",
        menuItem: "2px 4px 8px rgba(36, 36, 54, 0.2)",
        "enterprise-modal":
          "0px 0.8px 2px rgba(0, 0, 0, 0.064), 0px 2.7px 6.7px rgba(0, 0, 0, 0.096), 0px 12px 30px rgba(0, 0, 0, 0.16)",
        "menu-dark": "0px 0px 0px 4px rgba(48, 52, 80, 0.25)",
        "menu-light": "0px 0px 0px 4px rgba(222, 229, 237, 0.25)",
        "menu-blog-dark": "0px 0px 0px 4px #4449551A",
        "menu-blog-light": "0px 0px 0px 4px #99A1B31A",
        "landing-sweet-spot-code-dark":
          "0px 2.26915px 2.21381px 0px rgba(0, 0, 0, 0.07), 0px 5.45308px 5.32008px 0px rgba(0, 0, 0, 0.11), 0px 10.26767px 10.01724px 0px rgba(0, 0, 0, 0.13), 0px 18.31577px 17.86905px 0px rgba(0, 0, 0, 0.15), 0px 34.25764px 33.42209px 0px rgba(0, 0, 0, 0.19), 0px 82px 80px 0px rgba(0, 0, 0, 0.26)",
      },
      backgroundColor: {
        "landing-header-bg": "rgba(10, 10, 41, 0.70)",
        "landing-header-border": "rgba(48, 52, 80, 0.70)",
        "common-header-bg-dark": "rgba(29, 30, 48, 0.70)",
        "common-header-bg-light": "rgba(244, 248, 251, 0.85)",
      },
      backdropBlur: {
        "header-blur": "12px",
      },

      backgroundImage: {
        "pricing-card-pro-dark":
          "radial-gradient(100% 124.29% at 100% 0%, rgba(8, 126, 164, 0.5) 0%, rgba(35, 39, 47, 0) 50%) ,radial-gradient(100% 124.29% at 0% 100%, rgba(8, 126, 164, 0.25) 0%, rgba(35, 39, 47, 0) 50%)",
        "pricing-card-pro-light":
          "radial-gradient(146.45% 100% at 100% 100%, rgba(255, 255, 255, 0) 0%, rgba(88, 196, 220, 0.125) 50%, rgba(255, 255, 255, 0) 100%)",
        "landing-noise": [
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp)",
        ],
        noise:
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp)",
        "walkthrough-button-shadow":
          "conic-gradient(from 231deg at 50% 50%, #A3A3F5 0%, #4D4DB2 6%, #4D4DB2 44%, #A3A3F5 50%, #4D4DB2 56%, #4D4DB2 94%, #A3A3F5 100%)",
        "walkthrough-button-alt-shadow":
          "conic-gradient(from 231deg at 50% 50%, #A3A3F5 0%, #474E6B 6%, #474E6B 44%, #A3A3F5 50%, #474E6B 56%, #474E6B 94%, #A3A3F5 100%)",
        "selected-tab-light":
          "linear-gradient(180deg, rgba(110, 179, 247, 0) 50%, rgba(0, 128, 255, 0.25) 100%)",
        "selected-tab-dark":
          "linear-gradient(180deg, rgba(110, 179, 247, 0) 50%, rgba(0, 128, 255, 0.25) 100%)",
        "landing-stars": [
          "linear-gradient(180deg, rgba(10,10,41,0.6) 0%, rgba(10, 10, 41, 0.4) 100%)",
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-stars.webp)",
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp)",
        ],
        "landing-component-divider-dark":
          "linear-gradient(90deg, rgba(48, 52, 80, 0) 0%, #303450 12.5%, #303450 87.5%, rgba(48, 52, 80, 0) 100%)",
        "landing-component-divider":
          "linear-gradient(270deg, rgba(31, 173, 102, 0) 0%, rgba(31, 173, 102, 0.5) 12.5%, rgba(31, 173, 102, 0.5) 87.5%, rgba(31, 173, 102, 0) 100%)",
        "landing-component-badge": [
          "linear-gradient(306deg, #303450 0%, rgba(20, 20, 31, 0.5) 100%)",
          "linear-gradient(168deg, rgba(38, 217, 127, 0.9) 15%, rgba(71, 235, 235, 0) 50%)",
          "linear-gradient(0deg, #303450, #303450)",
        ],
        "landing-component-badge-glow":
          "radial-gradient(50% 50% at 50% 50%, rgba(38, 217, 127, 0.1) 0%, rgba(71, 235, 235, 0) 100%)",
        "landing-text-bg":
          "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.6) 100%)",
        "landing-text-bg-alt":
          "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.4) 80%, rgba(255,255,255,0.4) 100%)",
        "landing-rainbow":
          "conic-gradient(from 180deg at 50% 50%, #3FDCF7 0deg, #1890FF 51.43deg, #6813CB 102.86deg, #FF003D 154.29deg, #FF8A00 205.71deg, #FFD600 257.14deg, #67BE23 308.57deg, #3FDCF7 360deg)",
        "landing-ghost":
          "conic-gradient(from 90deg at 50% 50%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.25) 10%, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.25) 60%, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 0.25) 80%, rgba(255, 255, 255, 0.25) 100%)",
        "landing-hero-video-bg":
          "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/hero-video-bg.webp')",
        "landing-hero-bottom-bg":
          "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/hero-bottom-bg.svg')",
        "landing-hero-mobile-animation-bg":
          "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/hero-mobile-animation.svg')",
        "landing-video-bottom-mobile-bg":
          "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/hero-video-bottom-mobile.svg')",
        "landing-video-bottom-line":
          "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-video-bottom-line.svg')",
        "landing-video-bottom-line-glow":
          "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-video-bottom-line-glow.svg')",
        "landing-linear-spectrum":
          "linear-gradient(90deg, #FFFE00 0%, #FF9933 12.5%, #FF4C4D 25%, #ED5EC9 37.5%, #8000FF 50%, #3333FF 62.5%, #0080FF 75%, #47EBEB 87.5%, #26D97F 100%)",
        "landing-planar-grid":
          "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-planar-grid.svg')",
        "landing-planar-grid-reversed":
          "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-planar-grid-reversed.svg')",
        "landing-planar-grid-mobile":
          "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-planar-grid-mobile.svg')",
        "landing-planar-grid-reversed-mobile":
          "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-planar-grid-reversed-mobile.svg')",
        "landing-tile-image-bg":
          "radial-gradient(50.33% 83.06% at -0.33% 100%, rgba(77, 77, 179, 0.5) 0%, rgba(77, 77, 179, 0) 100%)",
        "landing-tile-tile-bg":
          "radial-gradient(232% 232% at 100% 100%, rgba(77, 77, 179, 0) 0%, rgba(77, 77, 179, 0.05) 33.33%, rgba(77, 77, 179, 0.1) 66.67%, rgba(77, 77, 179, 0.2) 100%)",
        "landing-tile-border-bg":
          "radial-gradient(100% 100% at 0% 0%, #4D4DB3 0%, rgba(77, 77, 179, 0.05) 50%, rgba(77, 77, 179, 0.5) 100%)",
        "landing-tile-grid-bg":
          "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-tile-grid.svg')",
        "landing-tile-grid-mobile-bg":
          "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-tile-grid-mobile.svg')",
        "landing-stats-bg": [
          "radial-gradient(59.21% 56.25% at 0% 0%, #17174F 0%, rgba(23, 23, 79, 0) 100%)",
          "linear-gradient(180deg, rgba(0, 0, 0, 0.33) 0%, rgba(0, 0, 0, 0.165) 100%)",
        ],
        "landing-stats-border-bg":
          "conic-gradient(from -90deg at 50% 50%, rgba(77, 77, 179, 0) 0deg, #4D4DB3 39.37deg, rgba(77, 77, 179, 0) 86.25deg, rgba(77, 77, 179, 0) 198.75deg, #4D4DB3 232.5deg, rgba(77, 77, 179, 0) 275.62deg, rgba(77, 77, 179, 0) 360deg)",
        "landing-stats-text-dark":
          "linear-gradient(180deg, #FFF 25%, rgba(255, 255, 255, 0.25) 100%)",
        "landing-stats-text":
          "linear-gradient(180deg, #14141F 25%, rgba(20, 20, 31, 0.50) 100%)",
        "landing-playground-bg": [
          "linear-gradient(90deg, rgba(23, 23, 79, 0) 0%, #17174F 100%)",
          "linear-gradient(180deg, rgba(0, 0, 0, 0.165) 0%, rgba(0, 0, 0, 0.33) 50%, rgba(0, 0, 0, 0.165) 100%)",
        ],
        "landing-playground-slide-left-bg":
          "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-playground-slide-left.svg')",
        "landing-playground-slide-right-bg":
          "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-playground-slide-right.svg')",
        "ai-landing-hero-dark-md": [
          "radial-gradient(50% 50% at 50% 50%, rgba(38, 217, 126, 0.2) 20%, rgba(38, 217, 126, 0) 100%)",
        ],
        "ai-landing-hero-md": [
          "radial-gradient(50% 50% at 50% 50%, rgba(51, 51, 255, 0.2) 20%, rgba(51, 51, 255, 0) 100%)",
        ],
        "ai-landing-hero-dark": [
          "radial-gradient(100% 249.65% at 0% 47.87%, rgba(38, 217, 126, 0.25) 0%, rgba(38, 217, 126, 0) 100%)",
        ],
        "ai-landing-hero": [
          "radial-gradient(100% 249.65% at 0% 47.87%, rgba(51, 51, 255, 0.25) 0%, rgba(51, 51, 255, 0) 100%)",
        ],
        "ai-landing-packages-dark": [
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp)",
          "radial-gradient(50% 100% at 100% 0%, rgba(38, 217, 127, 0.25) 0%, rgba(38, 217, 127, 0) 100%)",
        ],
        "ai-landing-packages": [
          "radial-gradient(50% 100% at 100% 0%, rgba(51, 51, 255, 0.25) 0%, rgba(51, 51, 255, 0) 100%)",
        ],
        "ai-landing-packages-mobile-dark": [
          "radial-gradient(50% 47.81% at 100% 0%, rgba(38, 217, 127, 0.25) 0%, rgba(38, 217, 127, 0) 100%)",
          "radial-gradient(50% 47.81% at 0% 0%, rgba(38, 217, 127, 0.25) 0%, rgba(38, 217, 127, 0) 100%)",
        ],
        "ai-landing-packages-mobile": [
          "radial-gradient(50% 100% at 100% 0%, rgba(51, 51, 255, 0.25) 0%, rgba(51, 51, 255, 0) 100%)",
          "radial-gradient(50% 100% at 0% 0%, rgba(51, 51, 255, 0.25) 0%, rgba(51, 51, 255, 0) 100%)",
        ],
        "landing-sweet-spot-glow-red-dark":
          "radial-gradient(80% 80% at 100% 0%, rgba(239, 68, 68, 0.25) 0%, rgba(239, 68, 68, 0.15) 25%, rgba(239, 68, 68, 0.08) 40%, rgba(239, 68, 68, 0.04) 60%, rgba(239, 68, 68, 0.01) 80%, rgba(239, 68, 68, 0.00) 100%)",
        "landing-sweet-spot-glow-yellow-dark":
          "radial-gradient(80% 80% at 100% 0%, rgba(234, 179, 8, 0.25) 0%, rgba(234, 179, 8, 0.15) 25%, rgba(234, 179, 8, 0.08) 40%, rgba(234, 179, 8, 0.04) 60%, rgba(234, 179, 8, 0.01) 80%, rgba(234, 179, 8, 0.00) 100%)",
        "landing-sweet-spot-glow-orange-dark":
          "radial-gradient(80% 80% at 100% 0%, rgba(249, 115, 22, 0.25) 0%, rgba(249, 115, 22, 0.15) 25%, rgba(249, 115, 22, 0.08) 40%, rgba(249, 115, 22, 0.04) 60%, rgba(249, 115, 22, 0.01) 80%, rgba(249, 115, 22, 0.00) 100%)",
        "landing-sweet-spot-glow-cyan-dark":
          "radial-gradient(80% 80% at 100% 0%, rgba(6, 182, 212, 0.25) 0%, rgba(6, 182, 212, 0.15) 25%, rgba(6, 182, 212, 0.08) 40%, rgba(6, 182, 212, 0.04) 60%, rgba(6, 182, 212, 0.01) 80%, rgba(6, 182, 212, 0.00) 100%)",
        "landing-sweet-spot-glow-blue-dark":
          "radial-gradient(80% 80% at 100% 0%, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0.15) 25%, rgba(59, 130, 246, 0.08) 40%, rgba(59, 130, 246, 0.04) 60%, rgba(59, 130, 246, 0.01) 80%, rgba(59, 130, 246, 0.00) 100%)",
        "landing-sweet-spot-glow-indigo-dark":
          "radial-gradient(80% 80% at 100% 0%, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.15) 25%, rgba(139, 92, 246, 0.08) 40%, rgba(139, 92, 246, 0.04) 60%, rgba(139, 92, 246, 0.01) 80%, rgba(139, 92, 246, 0.00) 100%)",
        "hackathon-button-bg":
          "linear-gradient(90deg, rgba(255, 76, 166, 0.3) 0%, rgba(128, 0, 255, 0.3) 50%, rgba(0, 128, 255, 0.3) 100%);",
        "refine-week-supabase-timeline-item-bg":
          "linear-gradient(360deg, rgba(62, 207, 142, 0) 0%, rgba(62, 207, 142, 0.25) 50%, rgba(62, 207, 142, 0) 100%)",
        "refine-week-supabase-timeline-item-bg-lg":
          "linear-gradient(256deg, rgba(62, 207, 142, 0.25) 0%, rgba(62, 207, 142, 0) 60%)",
        "refine-week-strapi-timeline-item-bg":
          "linear-gradient(360deg, rgba(73, 69, 255, 0) 0%, rgba(73, 69, 255, 0.25) 50%, rgba(73, 69, 255, 0) 100%)",
        "refine-week-strapi-timeline-item-bg-lg":
          "linear-gradient(256deg, rgba(73, 69, 255, 0.25) 0%, rgba(73, 69, 255, 0) 60%)",
        "week-of-refine-strapi-card":
          "linear-gradient(207deg, rgba(73, 69, 255, 0.25) 0%, rgba(73, 69, 255, 0.00) 100%)",
        "week-of-refine-supabase-card":
          "linear-gradient(207deg, rgba(62, 207, 142, 0.25) 0%, rgba(62, 207, 142, 0.00) 100%)",
        "week-of-refine-strapi-card-light":
          "linear-gradient(207deg, rgba(73, 69, 255, 0.15) 0%, rgba(73, 69, 255, 0.00) 100%)",
        "week-of-refine-supabase-card-light":
          "linear-gradient(207deg, rgba(62, 207, 142, 0.15) 0%, rgba(62, 207, 142, 0.00) 100%)",
        "banner-examples-gray": [
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp)",
          "radial-gradient(70.09% 100% at 50% 0%, #474E6B 0%, #303450 100%)",
        ],
        "banner-examples-purple": [
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp)",
          "radial-gradient(294.84% 141.42% at 100% 100%, #33F 0%, #8000FF 50%, #303450 100%)",
        ],
        "banner-examples-modal-gray": [
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp)",
          "radial-gradient(75.69% 100% at 50% 0%, #474E6B 0%, #303450 100%)",
        ],
        "banner-examples-modal-purple": [
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp)",
          "radial-gradient(152.26% 141.42% at 100% 100%, #33F 0%, #8000FF 50%, #303450 100%)",
        ],
        "banner-examples-sider-gray": [
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp)",
          "radial-gradient(75.69% 100% at 50% 0%, #474E6B 0%, #303450 100%)",
        ],
        "banner-examples-sider-purple": [
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp)",
          "radial-gradient(191.28% 141.42% at 100% 100%, #33F 0%, #8000FF 50%, #303450 100%)",
        ],
        "banner-examples-text":
          "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.50) 100%)",
        "top-announcement-text":
          "linear-gradient(90deg, rgba(31, 63, 72, 0.00) 0%, #1F3F48 10%, #1F3F48 90%, rgba(31, 63, 72, 0.00) 100%)",
        "sidebar-item-shiny-dark":
          "radial-gradient(457.67% 141.42% at 0% 0%, rgba(71, 235, 235, 0.10) 0%, rgba(71, 235, 235, 0.20) 100%)",
        "sidebar-item-shiny-light":
          "radial-gradient(457.67% 141.42% at 0% 0%, rgba(0, 128, 255, 0.20) 0%, rgba(0, 128, 255, 0.10) 100%)",
        "top-announcement-bg-tr":
          "url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/top-announcement-tr.png')",
        "landing-hero-item-name-gradient":
          "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.5) 100%)",
        "landing-hero-item-background":
          "radial-gradient(104% 104% at 0% 0%, rgba(249, 210, 54, 0.10) 0%, rgba(249, 210, 54, 0.00) 100%)",
        "landing-hero-beam-bottom":
          "linear-gradient(90deg, rgba(255,255,255,0), #47EBEB, rgba(255,255,255,0))",
        "landing-hero-xray-dot-center-bg":
          "radial-gradient(100% 100% at 0% 0%, #74FFFF 0%, #0FBDBD 50%, #0FBDBD 100%)",
        "landing-hero-xray-dot-center-bg-light":
          "radial-gradient(100% 100% at 0% 0%, #74FFFF 0%, #0080FF 50%, #0080FF 100%)",
        "landing-hero-beam-bg":
          "conic-gradient(from 280deg, currentColor 6%, transparent 14%, transparent 100%)",
        "footer-landing-dark-bg": [
          "linear-gradient(180deg, rgba(29, 30, 48, 0.5) 0%, #14141F 100%)",
        ],
        "footer-blog-dark-bg": [
          "linear-gradient(180deg, rgba(52, 58, 70, 0) 0%, rgba(52, 58, 70, 0.5) 100%)",
        ],
        "landing-copy-command-hover-bg-dark": [
          "radial-gradient(transparent 30%, rgba(249, 115, 22, 0.10))",
        ],
        "enterprise-copy-command-hover-bg-dark": [
          "radial-gradient(transparent 30%, rgba(128, 0, 255, 0.30))",
        ],
        "enterprise-copy-command-hover-bg-light": [
          "radial-gradient(transparent 30%, rgba(128, 0, 255, 0.1))",
        ],
        "enterprise-cta-dark": [
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp)",
          "radial-gradient(45% 80% at 50% 50%, rgba(71, 235, 235, 0.15) 0%, rgba(71, 235, 235, 0.00) 100%)",
        ],
        "enterprise-cta-dark-md": [
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp)",
          "radial-gradient(30% 100% at 100% 50%, rgba(71, 235, 235, 0.15) 0%, rgba(71, 235, 235, 0.00) 100%)",
        ],
        "enterprise-cta-light":
          "radial-gradient(100% 100% at 50% 50%, rgba(0, 128, 255, 0.15) 0%, rgba(0, 128, 255, 0.00) 100%)",
        "enterprise-cta-light-md":
          "radial-gradient(60% 100% at 100% 50%, rgba(0, 128, 255, 0.15) 0%, rgba(0, 128, 255, 0.00) 100%)",
        "enterprise-data-source-dark":
          "radial-gradient(100% 90% at 120% -12%, rgba(255, 255, 255, 0.50) 45%, rgba(255, 255, 255, 0.00) 100%)",
        "enterprise-frequent-updates-dark": [
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp)",
          "radial-gradient(70% 90% at 50% 100%, rgba(38, 217, 127, 0.10) 0%, rgba(38, 217, 127, 0.00) 100%)",
        ],
        "enterprise-frequent-updates-light":
          "radial-gradient(100% 100% at 50% 100%, rgba(0, 128, 255, 0.25) 0%, rgba(0, 128, 255, 0.00) 100%)",
        "enterprise-frequent-updates-dark-md": [
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp)",
          "radial-gradient(50% 100% at 100% 50%, rgba(38, 217, 127, 0.15) 0%, rgba(38, 217, 127, 0.00) 100%)",
        ],
        "enterprise-frequent-updates-light-md":
          "radial-gradient(120% 100% at 100% 50%, rgba(0, 128, 255, 0.25) 0%, rgba(0, 128, 255, 0.00) 100%)",
        "new-badge-border-dark":
          "conic-gradient(from 45deg at 50% 50%, #194b3a, rgb(38 217 127 / 40%), #194b3a, #194b3a, #194b3a, #26d97f, #194b3a, #194b3a, #194b3a)",
        "new-badge-border-light": `conic-gradient(
                    from 45deg at 50% 50%,
                    #b7dbff,
                    rgb(0 128 255 / 50%),
                    #b7dbff,
                    #b7dbff,
                    #b7dbff,
                    #0080ff,
                    #b7dbff,
                    #b7dbff,
                    #b7dbff
                )`,
        "purple-new-badge-border-dark": `conic-gradient(
                    from 45deg at 50% 50%,
                    #4D0099,
                    #E6CCFF,
                    #4D0099,
                    #4D0099,
                    #4D0099,
                    #E6CCFF,
                    #4D0099,
                    #4D0099,
                    #4D0099
                )`,
        "purple-new-badge-border-light": `conic-gradient(
                    from 45deg at 50% 50%,
                    #E6CCFF,
                    #4D0099,
                    #E6CCFF,
                    #E6CCFF,
                    #E6CCFF,
                    #4D0099,
                    #E6CCFF,
                    #E6CCFF,
                    #E6CCFF
                )`,
        "enterprise-cta-button-bg-light":
          "radial-gradient(100% 375% at 100% 50%, #8000FF 0%, #3333FF 100%)",
        "enterprise-cta-button-bg-dark":
          "radial-gradient(100% 375% at 100% 50%, #26D97F 0%, #47EBEB 100%)",
        "landing-wai-sunshine-dark":
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/wheel-already-invented-sunshine-normal.webp)",
        "landing-wai-grid-dark":
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/wheel-already-invented-grid-unit-normal.png)",

        "refine-ai-page-bg-dark": [
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/refine-ai-page-bg-dark.png)",
          "radial-gradient(46.3% 35.37% at 50% 35.37%, rgba(38, 217, 126, 0.25) 0%, rgba(38, 217, 126, 0) 100%)",
        ],
        "refine-ai-page-bg-light": [
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/refine-ai-page-bg-light.png)",
          "radial-gradient(46.3% 35.37% at 50% 35.37%, rgba(51, 51, 255, 0.15) 0%, rgba(51, 51, 255, 0)100%)",
          "radial-gradient(46.3% 35.37% at 50% 35.37%, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0) 100%)",
        ],
        "blog-hero-bg": [
          "url(https://refine.ams3.cdn.digitaloceanspaces.com/refine-ai/landing/landing-hero-bg-texture.png)",
          "radial-gradient(50% 100% at 50% 0%, #431407 0%, rgba(67, 20, 7, 0) 100%)",
        ],
      },
      backgroundPosition: {
        "wheel-already-invented-position": "center",
      },
      backgroundSize: {
        "landing-wizard-option": "600px 600px, auto",
        "landing-wizard-side-size": "512px 512px",
        "wheel-already-invented-size": "100% 1px",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        beat: "2s ease-in-out 1.5s infinite normal forwards running landing-hero-beat",
        "playground-slide-down": "playground-slide-down 45s linear infinite",
        "playground-slide-down-mobile":
          "playground-slide-down-mobile 45s linear infinite",
        "playground-slide-up": "playground-slide-up 45s linear infinite",
        "playground-slide-up-mobile":
          "playground-slide-up-mobile 45s linear infinite",
        "hackathon-button-bg":
          "hackathon-button-bg 2s ease-in-out infinite alternate",
        "walkthrough-bounce": "walkthrough-bounce 3s ease-in-out infinite",
        "top-announcement-glow":
          "top-announcement-glow 1s ease-in-out infinite alternate",
        "landing-hero-grid-beats":
          "landing-hero-grid-beats 2s ease-in-out infinite",
        "hero-logo-pulse": "hero-logo-pulse 4s ease-in-out infinite",
        "mini-bounce": "mini-bounce 3s ease-in-out infinite",
        "dot-waves": "dot-waves 2.5s linear infinite",
        "landing-packages-left": "landing-packages-left 65s linear infinite",
        "landing-packages-right": "landing-packages-right 65s linear infinite",
        "code-scroll": "code-scroll 25s linear infinite",
        "beam-spin": "beam-spin 3s linear 1 forwards",
        "landing-hero-beam-line":
          "landing-hero-beam-line 7.5s ease-in-out infinite",
        "landing-hero-beam-glow":
          "landing-hero-beam-glow 7.5s ease-in-out infinite",
        "landing-hero-beam-bottom":
          "landing-hero-beam-bottom 7.5s ease-in-out infinite",
        "showcase-bottom-fade-reveal":
          "showcase-bottom-fade-reveal 0.3s ease-in-out forwards",
        "opacity-reveal": "opacity-reveal 1s ease-in-out forwards",
        "wheel-already-invented-reveal":
          "wheel-already-invented-reveal 0.6s cubic-bezier(.23,.95,.64,1.24) forwards",
        "showcase-reveal": "showcase-reveal 0.3s ease-in-out forwards",
        "enterprise-iam-services-left":
          "enterprise-iam-services-left 40s linear infinite",
        "enterprise-iam-services-right":
          "enterprise-iam-services-right 40s linear infinite",
        "enterprise-data-source-left":
          "enterprise-data-source-left 25s linear infinite",
        "enterprise-data-source-right":
          "enterprise-data-source-right 25s linear infinite",
        "enterprise-table-left-to-right":
          "enterprise-table-left-to-right 0.3s ease-in-out forwards",
        "enterprise-table-right-to-left":
          "enterprise-table-right-to-left 0.3s ease-in-out forwards",
        "new-badge-border": "new-badge-border 4s linear infinite",
        reveal: "reveal 0.3s ease-in-out forwards",
        "progress-fill": "progressFill 1s linear 1 forwards",
        "refine-ai-video-play-button":
          "refine-ai-video-play-button 1.8s ease-out infinite",
        "ai-landing-packages-right":
          "ai-landing-packages-right 80s linear infinite",
      },
      keyframes: {
        "refine-ai-video-play-button": {
          from: {
            transform: "scale3d(1, 1, 1)",
          },
          "50%": {
            transform: "scale3d(1.22, 1.22, 1.22)",
          },
          to: {
            transform: "scale3d(1, 1, 1)",
          },
        },
        progressFill: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        reveal: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        "code-scroll": {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-448px)",
          },
        },
        "walkthrough-bounce": {
          "0%": {
            transform: "translateY(4%)",
          },
          "50%": {
            transform: "none",
          },
          "100%": {
            transform: "translateY(4%)",
          },
        },
        "hackathon-button-bg": {
          "0%": {
            backgroundPosition: "0% 0%",
          },
          "100%": {
            backgroundPosition: "100% 0%",
          },
        },
        "landing-hero-beat": {
          "0%": {
            opacity: 0.4,
          },
          "5%": {
            opacity: 0.4,
          },
          "50%": {
            opacity: 1,
          },
          "95%": {
            opacity: 0.4,
          },
          "100%": {
            opacity: 0.4,
          },
        },
        "playground-slide-down-mobile": {
          "0%": {
            transform: "translateY(0px)",
          },
          "99.99%": {
            transform: "translateY(-1655px)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
        "playground-slide-down": {
          "0%": {
            transform: "translateY(0px)",
          },
          "99.99%": {
            transform: "translateY(-3329px)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
        "playground-slide-up-mobile": {
          "0%": {
            transform: "translateY(-1655px)",
          },
          "99.99%": {
            transform: "translateY(0px)",
          },
          "100%": {
            transform: "translateY(-1655px)",
          },
        },
        "playground-slide-up": {
          "0%": {
            transform: "translateY(-3328px)",
          },
          "99.99%": {
            transform: "translateY(0px)",
          },
          "100%": {
            transform: "translateY(-3328px)",
          },
        },
        "top-announcement-glow": {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
        "landing-hero-grid-beats": {
          "0%": {
            fillOpacity: 0,
          },
          "50%": {
            fillOpacity: 0.8,
          },
          "100%": {
            fillOpacity: 0,
          },
        },
        "hero-logo-pulse": {
          "0%": {
            fillOpacity: 1,
          },
          "50%": {
            fillOpacity: 0.75,
          },
          "100%": {
            fillOpacity: 1,
          },
        },
        "mini-bounce": {
          "0%": {
            transform: "translateY(0%)",
          },
          "50%": {
            transform: "translateY(-8%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
        "dot-waves": {
          "0%": {
            transform: "scale(0)",
            opacity: 1,
          },
          "75%": {
            transform: "scale(2)",
            opacity: 0,
          },
          "100%": {
            transform: "scale(0)",
            opacity: 0,
          },
        },
        "landing-packages-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "landing-packages-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(50%)" },
        },
        "beam-spin": {
          "0%": {
            transform:
              "translateX(-45px) translateY(-190px) translateZ(0) rotate(0deg)",
          },
          "100%": {
            transform:
              "translateX(-45px) translateY(-190px) translateZ(0) rotate(-360deg)",
          },
        },
        "landing-hero-beam-line": {
          "0%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.5,
          },
          "100%": {
            opacity: 1,
          },
        },
        "landing-hero-beam-glow": {
          "0%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0.25,
          },
          "100%": {
            opacity: 1,
          },
        },
        "landing-hero-beam-bottom": {
          "0%": {
            opacity: 1,
            transform: "scaleX(1)",
          },
          "50%": {
            opacity: 0.5,
            transform: "scaleX(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "scaleX(1)",
          },
        },
        "showcase-bottom-fade-reveal": {
          "0%": {
            opacity: 0,
            transform: "translateY(96px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "opacity-reveal": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        "wheel-already-invented-reveal": {
          "0%": {},
          "100%": {
            transform: "translateX(0)",
          },
        },
        "showcase-reveal": {
          "0%": {
            // transform: "translateY(-100px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        "enterprise-iam-services-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "enterprise-iam-services-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(50%)" },
        },
        "enterprise-data-source-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "enterprise-data-source-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(50%)" },
        },
        "enterprise-table-left-to-right": {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "enterprise-table-right-to-left": {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "new-badge-border": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "ai-landing-packages-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
    screens: {
      ...defaultTheme.screens,
      "content-sm": "480px",
      "widening-start": "544px",
      "content-md": "656px",
      "content-xm": "768px",
      "content-xl": "792px",
      "content-xl-safe": "1376px",
      "content-2xl": "864px",
      "content-4xl": "1536px",
      "header-sm": "640px",
      "header-md": "1200px",
      "landing-content": "944px",
      "landing-xs": "360px",
      "landing-sm": "720px",
      "landing-md": "960px",
      "landing-lg": "1296px",
      "landing-xl": "1440px",
      "tutorial-sm": "720px",
      "tutorial-md": "960px",
      "tutorial-lg": "1440px",
      "landing-footer": "1264px",
      "blog-sm": "592px",
      "blog-md": "720px",
      "blog-lg": "960px",
      "blog-max": "1296px",
      "blog-xl": "1440px",
      "blog-2xl": "1600px",
      walkthrough: "976px",
      "doc-form-lg": "824px",
      "doc-form-md": "688px",
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    plugin(({ addVariant }) => {
      addVariant("light", `[data-theme="light"] &`);
    }),
  ],
  corePlugins: {
    // preflight: false,
  },
};
