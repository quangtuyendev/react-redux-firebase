import { useCallback, useEffect } from 'react';

export const useEscKeydown = callback => {
    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            callback();
        }
    }, [callback]);

    useEffect(() => {
        if (callback) {
            document.addEventListener('keydown', escFunction, false);
            return () => {
                document.removeEventListener('keydown', escFunction, false);
            };
        }
    }, [callback, escFunction]);
};
