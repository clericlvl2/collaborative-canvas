import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

import { IContainerSize } from '../model/dimensions';

interface IUseContainerSizeProps {
    initialWidth?: number;
    initialHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
}

interface UseContainerSizeReturn {
    containerSize: IContainerSize;
    containerRef: RefObject<HTMLDivElement | null>;
}

export const useContainerSize = ({
    initialWidth,
    initialHeight,
    maxWidth,
    maxHeight,
}: IUseContainerSizeProps): UseContainerSizeReturn => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerSize, setContainerSize] = useState({
        width: initialWidth || 0,
        height: initialHeight || 0,
    });

    const updateSize = useCallback(() => {
        if (!containerRef.current) {
            return;
        }

        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        const calculatedWidth = maxWidth
            ? Math.min(containerWidth, maxWidth)
            : containerWidth;

        const calculatedHeight = maxHeight
            ? Math.min(containerHeight, maxHeight)
            : containerHeight;

        setContainerSize({
            width: calculatedWidth,
            height: calculatedHeight,
        });
    }, [maxWidth, maxHeight]);

    useEffect(() => {
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, [updateSize]);

    return { containerSize, containerRef };
};
