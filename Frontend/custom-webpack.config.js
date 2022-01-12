const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        BackendAPIHost: JSON.stringify(process.env.BACKEND_API_HOST),
        BackendAPIPort: JSON.stringify(process.env.BACKEND_API_PORT)
      }
    })
  ]
};
