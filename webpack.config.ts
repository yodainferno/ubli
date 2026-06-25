import path from 'path' // чтобы не хардкодить пути и не привязываться к ОС
import HTMLWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

const config: webpack.Configuration = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src', 'index.ts'), // стартовая точка приложения
    },
    output: {
        filename: "[name].[contenthash].js", // в кв скобках - спец прееменные. name - берется из entry key (у нас сейчас не объект, поэтому по дефолту - main), contenthash - соль рандомная чтобы браузер подтягивал новую сборку а не из кэша
        path: path.resolve(__dirname, "build"),
        clean: true, // чистить outputDir перед сборкой
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'), // в качетсве шаблона html брать index.html из publick
        }), // сделает html и через defer подключит все etry скрипты
        new webpack.ProgressPlugin(), // плагин показывает % сборки
    ],
    module: {
        rules: [ // лоадеры - они описывают как обрабатывать файлы за рамками JS
            { // лоадер для TS
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: { // файлы при импорте не надо указывать расширения
        extensions: [".tsx", ".ts", ".js"],
    },
}

export default config
