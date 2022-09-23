import { useState, useEffect } from 'react';

const useWindowSize = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        const updateSize = () => {
            let sw = window.screen.width, sh = window.screen.height;
            setWindowWidth(sw);
            setWindowHeight(sh);
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
      }, [window.screen.width]);

    return { windowWidth, windowHeight };
}

export default useWindowSize;