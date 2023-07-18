import path from 'path';
import { exit } from 'process';
/* __dirname not available in ES modules workaround */
import { fileURLToPath } from 'url';
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export default (() => {
  if (
    process.env.LAMBDA_PATH === undefined ||
    process.env.LAMBDA_FILE === undefined ||
    process.env.TSCONFIG_FILE === undefined
  ) {
    console.error('Missing environment variable(s): LAMBDA_PATH, LAMBDA_FILE or TSCONFIG_FILE');
    exit(1);
  } else {
    const handlerPath = process.env.LAMBDA_PATH;
    const handlerFilename = process.env.LAMBDA_FILE;

    return {
      mode: 'production',
      entry: `./src/${handlerPath}${handlerFilename}.ts`,
      module: {
        rules: [
          {
            test: /\.ts?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  configFile: process.env.TSCONFIG_FILE,
                },
              },
            ],
          },
        ],
      },
      resolve: {
        alias: {
          '@src': path.resolve(_dirname, './src'),
          '@handlers/*': path.resolve(_dirname, './src/handlers/*'),
          '@utils/*': path.resolve(_dirname, './src/utils/*'),
        },
        extensions: ['.ts', '.js'],
      },
      output: {
        filename: `${handlerFilename}.js`,
        path: path.resolve(_dirname, `build/${handlerPath}`),
        library: '$',
        libraryTarget: 'umd',
      },
      target: 'node18',
    };
  }
})();
