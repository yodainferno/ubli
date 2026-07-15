import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Code } from './Code';

export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

const codeData = 'import { memo, ReactNode } from \'react\';\n'
        + 'import { classNames } from \'shared/lib/classNames/classNames\';\n'
        + 'import { useTranslation } from \'react-i18next\';\n'
        + 'import cls from \'./Code.module.scss\';\n'
        + '\n'
        + 'interface CodeProps {\n'
        + '    className?: string;\n'
        + '    children?: ReactNode;\n'
        + '}\n'
        + '\n'
        + 'export const Code = memo(({ className, children }: CodeProps) => {\n'
        + '    const { t } = useTranslation();\n'
        + '\n'
        + '    return (\n'
        + '        <code className={classNames(cls.Code, {}, [className])}>\n'
        + '            {children}\n'
        + '        </code>\n'
        + '    );\n'
        + '});\n';

export const Normal = Template.bind({});
Normal.args = {
    text: codeData,
};
Normal.decorators = [];

export const Dark = Template.bind({});
Dark.args = {
    text: codeData,
};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
];
