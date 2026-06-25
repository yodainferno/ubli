import webpack from "webpack";
import {BuildOptions} from "./types/config";
import {buildPlugins} from "./buildPlugins";
import {buildLoaders} from "./buildLoaders";
import {buildResolvers} from "./buildResolvers";

export function buildWebpackConfig(option: BuildOptions): webpack.Configuration {
    const {mode, paths} = option

    return {
        mode: mode,
        entry: paths.entry,
        output: {
            filename: "[name].[contenthash].js", // в кв скобках - спец прееменные. name - берется из entry key (у нас сейчас не объект, поэтому по дефолту - main), contenthash - соль рандомная чтобы браузер подтягивал новую сборку а не из кэша
            path: paths.build,
            clean: true, // чистить outputDir перед сборкой
        },
        plugins: buildPlugins(option),
        module: {
            rules: buildLoaders(),
        },
        resolve: buildResolvers()
    }
}
