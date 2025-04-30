import { useEffect, useRef } from 'react';

const useIdleLogout = (onLogout: () => void, idleTime: number = 300000): void => {
    const timeoutRef = useRef<number | undefined>(undefined);

    const resetTimer = () => {
        if (timeoutRef.current !== undefined) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(onLogout, idleTime);
    };

    useEffect(() => {
        const events: (keyof DocumentEventMap)[] = [
            'mousemove',
            'keydown',
            'click',
            'scroll',
            'touchstart',
        ];

        const handleActivity = () => resetTimer();

        events.forEach((event) =>
            window.addEventListener(event, handleActivity)
        );

        resetTimer();

        return () => {
            if (timeoutRef.current !== undefined) {
                clearTimeout(timeoutRef.current);
            }
            events.forEach((event) =>
                window.removeEventListener(event, handleActivity)
            );
        };
    }, [onLogout, idleTime]);
};

export default useIdleLogout;
