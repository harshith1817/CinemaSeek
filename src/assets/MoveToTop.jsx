import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MoveToTop = () => {
    const path = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 50);

        return () => clearTimeout(timer);
    }, [path]);

    return null;
}

export default MoveToTop;