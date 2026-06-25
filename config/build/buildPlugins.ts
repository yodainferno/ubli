import HTMLWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import {BuildOptions} from "./types/config";

export function buildPlugins({paths}: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        new HTMLWebpackPlugin({
            template: paths.html,
        }), // сделает html и через defer подключит все entry скрипты
        new webpack.ProgressPlugin(), // плагин показывает % сборки
    ];
}
