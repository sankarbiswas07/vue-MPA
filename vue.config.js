module.exports = {
  pages: {
    index: {
      entry: `./src/pages/index/main.js`,
      template: `./static/index.html`,
      title: `index`,
      chunks: [`chunk-vendors`, `chunk-common`, `index`],
    },
    about: {
      entry: `./src/pages/about/main.js`,
      template: `./static/about.html`,
      title: `about`,
      chunks: [`chunk-vendors`, `chunk-common`, `about`],
    },
  },
};
