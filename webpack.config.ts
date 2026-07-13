import type webpack from 'webpack';
import path from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import {
    type BuildEnv,
    type BuildMode,
    type BuildPaths,
} from './config/build/types/config';

export default (env: BuildEnv): webpack.Configuration => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'), // стартовая точка приложения
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'), // в качестве шаблона html брать index.html из public
        src: path.resolve(__dirname, 'src'),
    };

    const mode: BuildMode = env.mode ?? 'development';
    const PORT = env.port ?? 3000;

    return buildWebpackConfig({
        mode,
        isDev: mode === 'development',
        paths,
        port: PORT,
        project: 'frontend',
    });
};
