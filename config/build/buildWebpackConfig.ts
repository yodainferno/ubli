import type webpack from 'webpack';
import { type BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(option: BuildOptions): webpack.Configuration {
    const { mode, paths, isDev } = option;

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash:8].js', // в кв скобках - спец прееменные. name - берется из entry key (у нас сейчас не объект, поэтому по дефолту - main), contenthash - соль рандомная чтобы браузер подтягивал новую сборку а не из кэша
            path: paths.build,
            clean: true, // чистить outputDir перед сборкой
        },
        plugins: buildPlugins(option),
        module: {
            rules: buildLoaders(option),
        },
        resolve: buildResolvers(option),

        // чтобы понять где ошибка - так как при сборке всё сжимается в 1 js-файл,
        // не показывать для prod сборки
        devtool: isDev ? 'inline-source-map' : undefined,

        devServer: isDev ? buildDevServer(option) : undefined,
    };
}
