import webpack from 'webpack'

// лоадеры - они описывают как обрабатывать файлы за рамками JS
export function buildLoaders(): webpack.RuleSetRule[] {
    // лоадер для TS
    const tsLoader = {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
    };

    return [ // порядок важен
        tsLoader
    ]
}
