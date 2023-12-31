import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const SCRIPT_NAMES = {
  Checkbox: 'checkbox',
  Popover: 'popover',
  FilterPanel: 'filter-panel',
  InitPage: 'init-page',
  Notification: 'notification',
  Table: 'table',
};

const config: webpack.Configuration = {
  mode: 'production',
  entry: {
    server: './server.ts',
    style: './src/style.scss', // не собирает файлы css в dist без этого
    [SCRIPT_NAMES.Checkbox]: './src/scripts/checkbox.ts',
    [SCRIPT_NAMES.Popover]: './src/scripts/popover.ts',
    [SCRIPT_NAMES.FilterPanel]: './src/scripts/filter-panel.ts',
    [SCRIPT_NAMES.InitPage]: './src/scripts/init-page.ts',
    [SCRIPT_NAMES.Notification]: './src/scripts/notification.ts',
    [SCRIPT_NAMES.Table]: './src/scripts/table.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: '[name].bundle.js',
    filename: (pathData, assetInfo) => {
      const isGroupScripts = Object.values(SCRIPT_NAMES).includes(
        pathData.runtime as string
      );
      if (isGroupScripts) {
        return 'scripts/[name].js';
      }
      return '[name].bundle.js';
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },

          // Creates `style` nodes from JS strings
          // 'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
          // {
          //   loader: 'file-loader',
          //   options: {
          //     outputPath: path.resolve(__dirname, 'dist'),
          //     name: '[name].css',
          //   },
          // }, // устарел, с 5 версии
        ],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
    ],
  },
  target: 'node', // падает куча ошибок без этого
  externals: {
    express: 'express', // одно предупреждение непонятное, видимо необхожимо указать движок?
  },
  plugins: [new MiniCssExtractPlugin()],
  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.js', // чтобы webpack видел путь
    },
    extensions: ['.ts', '.js'],
  },
};

export default config;
