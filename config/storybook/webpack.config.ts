import webpack from 'webpack';
import type { RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

type RuleSetRules = NonNullable<webpack.ModuleOptions['rules']>;
type RuleSetRuleItem = RuleSetRules[number];

const isRuleSetRule = (rule: RuleSetRuleItem): rule is RuleSetRule => (
    Boolean(rule)
    && rule !== '...'
    && typeof rule === 'object'
    && !Array.isArray(rule)
);

export default ({ config }: {config: webpack.Configuration}) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };

    config.resolve!.modules!.unshift(paths.src);
    config.resolve!.extensions!.push('.ts', '.tsx');

    // eslint-disable-next-line no-param-reassign
    config.module!.rules = config.module!.rules!.map((rule) => {
        if (
            isRuleSetRule(rule)
            && rule.test instanceof RegExp
            && rule.test.test('.svg')
        ) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });

    config.module!.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });
    config.module!.rules.push(buildCssLoader(true));

    config.plugins!.push(
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(true),
            __PROJECT__: JSON.stringify('storybook'),
        }),
    );

    return config;
};
