import React, {useEffect, useRef, useState} from 'react';
import Common from "../../components/Common";
import Helmet from "../../layout/Helmet";
import "../../styles/architecture.scss";
import Card from "../../components/Card";

const Architecture = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
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
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Helmet title="Architecture">
           <Common handleScroll={handleScroll}/>
            <div className="projects" style={bgParallaxStyle}>
                <div className="container">
                    <div ref={scrollRef} className="projects__filter">
                        <ul className="projects__list">
                            <li className="projects__sort projects__sort--all">
                                <p className="projects__sort-item">ВСЕ</p>
                            </li>
                            <li className="projects__sort"><p className="projects__sort-item">1-ком</p></li>
                            <li className="projects__sort"><p className="projects__sort-item">2-ком</p></li>
                            <li className="projects__sort"><p className="projects__sort-item">3-ком</p></li>
                            <li className="projects__sort"><p className="projects__sort-item">4-ком</p></li>
                            <li className="projects__sort"><p className="projects__sort-item">5-ком</p></li>
                            <li className="projects__sort"><p className="projects__sort-item">6-ком</p></li>
                        </ul>
                    </div>
                    <Card />
                </div>
            </div>
        </Helmet>
    );
};

export default Architecture;