import webpack from 'webpack'

// лоадеры - они описывают как обрабатывать файлы за рамками JS
export function buildLoaders(): webpack.RuleSetRule[] {
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
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
        ],
    };

    return [ // порядок важен
        tsLoader,
        cssLoaders
    ]
}
