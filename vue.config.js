module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/play/" : "/",
  pwa: {
    name: "Play",
    themeColor: "#000000",
    msTileColor: "#000000"
  }
};
