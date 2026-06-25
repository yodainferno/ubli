import webpack from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

// лоадеры - они описывают как обрабатывать файлы за рамками JS
export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {

    // лоадер для TS
    // уже умеет работать с JSX
    const tsLoader = {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
    };

    const cssLoaders = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev
                ? "style-loader"  // Creates `style` nodes from JS strings
                : MiniCssExtractPlugin.loader, // позволит вынести css как css-файлы а не в js

            // Translates CSS into CommonJS
            {
                loader: "css-loader",
                options: {
                    modules: {
                        auto: (resPath: string) => resPath.includes(".module."),
                        localIdentName: isDev
                            ? '[path]_[name]__[local]'
                            : '[hash:base64:8]',
                    },
                }
            },

            // Compiles Sass to CSS
            "sass-loader",
        ],
    };

    return [ // порядок важен
        tsLoader,
        cssLoaders
    ]
}
