const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./front/Entry.jsx",
  output: {
    path: path.join(__dirname, '/public'),
    filename: "bundle.js"
  },
module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', `react`]
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file'
      },
      {
      test: /\.html$/,
      loader: 'html-loader?attrs[]=video:src'
    }, {
      test: /\.mp4$/,
      loader: 'url?limit=10000&mimetype=video/mp4'
  }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx",".css"]
  }
};
