import {useEffect, useRef, useState} from "react";

function useParallax  ()  {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const scrollRef = useRef(null);

    function handleScroll() {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const bgParallaxStyle = {
        transform: `translateY(-${scrollPosition * 0.5}px)`,
    };

    useEffect(() => {
        function handleScroll() {
            setScrollPosition(window.scrollY);
            if (window.scrollY > 0) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return {handleScroll, bgParallaxStyle, isVisible, scrollRef}
}

export default useParallax;