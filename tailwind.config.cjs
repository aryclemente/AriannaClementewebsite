module.exports = {
  content: ["./index.html", "./**/*.js"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#141414",
          gray: "#808080",
          beige: "#edece7",
          pink: "#f55481",
          teal: "#27a397",
          purple: "#504382",
          lightPink: "#fbbec6",
          lightTeal: "#ddfaf8",
          lavender: "#9fa5c8",
        },
        fontFamily: {
          rubik: [
            "Rubik",
            "system-ui",
            "-apple-system",
            "Segoe UI",
            "Roboto",
            "Helvetica",
            "Arial",
            "sans-serif",
          ],
          mono: [
            "JetBrains Mono",
            "ui-monospace",
            "SFMono-Regular",
            "Menlo",
            "Monaco",
            "monospace",
          ],
        },
      },
    },
  },
  plugins: [],
};
