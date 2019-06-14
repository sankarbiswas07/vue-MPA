const { VueLoaderPlugin } = require(`vue-loader`);
const nodeSassMagicImporter = require(`node-sass-magic-importer`);
const path = require(`path`);

const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const OptimizeCSSAssetsPlugin = require(`optimize-css-assets-webpack-plugin`);
const UglifyJsPlugin = require(`uglifyjs-webpack-plugin`);

const vueConfig = require(`./vue.config`);

const envMod = process.env.NODE_ENV;
const minify = envMod === `production`;
const sourceMap = envMod === `development`;

const chunkNames = {};
const configs = Object.keys(vueConfig.pages);
configs.forEach((key) => {
  chunkNames[vueConfig.pages[key].title] = vueConfig.pages[key].entry;
});

const config = {
  entry: chunkNames,
  mode: envMod,
  output: {
    publicPath: `/`,
  },
  optimization: {
    splitChunks: {
      chunks: `all`,
    },
  },
  devtool: sourceMap ? `cheap-module-eval-source-map` : undefined,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: `vue-loader`,
      },
      {
        test: /\.js$/,
        loader: `babel-loader`,
        include: [path.join(__dirname, `src`)],
      },
      {
        test: /\.scss$/,
        use: [
          `vue-style-loader`,
          {
            loader: `css-loader`,
            options: {
              sourceMap,
            },
          },
          {
            loader: `sass-loader`,
            options: {
              importer: nodeSassMagicImporter(),
              sourceMap,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};

// create a HtmlWebpackPlugin instance per page
Object.keys(chunkNames).forEach((chunk) => {
  const htmlConf = {
    filename: path.join(__dirname, `dist`, `${chunk}.html`),
    template: path.join(__dirname, vueConfig.pages[chunk].template),
    inject: true,
    minify: minify ? {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
    } : false,
  };
  config.plugins.push(new HtmlWebpackPlugin(htmlConf)); // new plugin config per file
});

if (minify) {
  config.optimization.minimizer = [
    new OptimizeCSSAssetsPlugin(),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
    }),
  ];
}

if (envMod !== `development`) {
  config.plugins.push(new MiniCssExtractPlugin());

  const sassLoader = config.module.rules.find(({ test }) => test.test(`.scss`));
  // Replace the `vue-style-loader` with
  // the MiniCssExtractPlugin loader.
  sassLoader.use[0] = MiniCssExtractPlugin.loader;
}

module.exports = config;
