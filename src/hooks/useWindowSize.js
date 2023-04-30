import { useState, useEffect } from "react";
import { MAX, MIDDLE, MOBILE } from "../utils/constants"

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [sizeMode, setSizeMode] = useState({})

    useEffect(() => {
        const handleWindowResize = () => {
          setWindowSize(window.innerWidth);
          handleSize();
        };
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, [windowSize]);

    const handleSize = () => {
        if (windowSize > 1000) {
            setSizeMode(MAX);
        }
        else if (windowSize <= 1000 && windowSize > 760) {
            setSizeMode(MIDDLE)
        } else {
            setSizeMode(MOBILE)
        }
    }

    return {sizeMode, handleSize}
}