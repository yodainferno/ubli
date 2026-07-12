export const toNumberWithFallBack = (value: string | number, fallBack?: number): number | null => {
    if (!value) return null;

    const formatted = Number(value);
    if (Number.isNaN(formatted)) return fallBack ?? 0;

    return formatted;
};
