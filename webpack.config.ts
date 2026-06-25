import webpack from 'webpack'
import {buildWebpackConfig} from "./config/build/buildWebpackConfig";
import {BuildMode, BuildPaths} from "./config/build/types/config";
import path from "path";

const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.ts'), // стартовая точка приложения
    build: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, 'public', 'index.html'), // в качестве шаблона html брать index.html из public
}

const mode: BuildMode = 'development'
const isDev = mode === 'development';

const config: webpack.Configuration = buildWebpackConfig({
    mode,
    isDev,
    paths,
})

export default config
