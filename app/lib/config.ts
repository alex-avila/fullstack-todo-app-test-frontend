export const config = Object.freeze({
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL,
  colors: Object.freeze([
    Object.freeze({ hex: "#FF3B30", name: "red" }),
    Object.freeze({ hex: "#FF9500", name: "orange" }),
    Object.freeze({ hex: "#FFCC00", name: "yellow" }),
    Object.freeze({ hex: "#34C759", name: "green" }),
    Object.freeze({ hex: "#007AFF", name: "blue" }),
    Object.freeze({ hex: "#5856D6", name: "indigo" }),
    Object.freeze({ hex: "#AF52DE", name: "purple" }),
    Object.freeze({ hex: "#FF2D55", name: "pink" }),
    Object.freeze({ hex: "#A2845E", name: "brown" }),
  ]),
});
