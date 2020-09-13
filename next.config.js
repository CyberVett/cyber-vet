/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

console.log('************************************');
console.log(`Building For: ${process.env.NODE_ENV}`);
console.log('************************************');

const path = require('path');
// Webpack plugins
const webpack = require('webpack');
// const sass = require('@zeit/next-sass');
// const css = require('@zeit/next-css');
// Next Plugins
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  distDir: 'build',
  poweredByHeader: false,
  // Target must be serverless
  target: 'serverless',
  /**
   * Custom webpack configuration for Next
   */
  webpack(config) {
    // Allow Next to resolve Typescript custom paths
    config.resolve.modules.unshift(__dirname);

    // Setup aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      assets: path.resolve(__dirname, 'src/assets/'),
      components: path.resolve(__dirname, 'src/components/'),
      containers: path.resolve(__dirname, 'src/containers/'),
      lib: path.resolve(__dirname, 'src/lib/'),
      styles: path.resolve(__dirname, 'src/assets/styles'),
      utils: path.resolve(__dirname, 'src/lib/utils'),
    };

    // SVG Loader
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });
    // File loader
    config.module.rules.push({
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'static/images',
            publicPath: '/_next/static/images',
            esModule: false,
          },
        },
      ],
    });

    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env),
      );
      
      return config;
    },
}

module.exports = withPlugins([
  [
    {
      cssLoaderOptions: {
        localIdentName: '[local]___[hash:base64:5]',
      },
      cssModules: true,
      sassLoaderOptions: {
        includePaths: [path.resolve('./src/assets/styles')],
      },
    },
  ],
], nextConfig);