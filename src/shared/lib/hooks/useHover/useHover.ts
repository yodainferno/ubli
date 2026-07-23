import { useCallback, useMemo, useState } from 'react';

interface UseHoverBing {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

type UseHoverResult = [boolean, UseHoverBing]
export const useHover = (): UseHoverResult => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const onMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);
    const onMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    return useMemo(() => [
        isHovered,
        { onMouseEnter, onMouseLeave },
    ], [isHovered, onMouseEnter, onMouseLeave]);
};
