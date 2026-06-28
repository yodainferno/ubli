type Mods = Record<string, boolean | string | undefined>

type AdditionalClass = string | undefined

function isString(value: AdditionalClass): value is string {
    return Boolean(value);
}

export function classNames(
    cls: string,
    mods: Mods | undefined = {},
    additional: AdditionalClass[] | undefined = [],
): string {
    return [
        cls,
        ...additional.filter(isString),
        ...Object.entries(mods)
            .filter(([, v]) => (Boolean(v)))
            .map(([cls]) => cls),
    ].join(' ');
}
