import React, {useState} from 'react';
import Header from "../Header";
import Footer from "../Footer";
import Routers from "../../routers/Routers";

const Layout = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
          <Header isOpen={isOpen} setIsOpen={ setIsOpen}/>
            <main className={`main ${isOpen ? 'no-scroll' : ''}`}>
            <Routers />
            </main>
          <Footer/>
        </>
    );
};

export default Layout;