import React, {useState} from 'react';
import Header from "../Header";
import Footer from "../Footer";
import Routers from "../../routers/Routers";
import ScrollTop from "../../helper/ScrollTop";
import {useDispatch} from "react-redux";
import {useLoginMe} from "../../CustomHooks/useAuth";
import {authActions} from "../../features/authenticatedSlice";
const Layout = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch();

    const successAuthMe = (data) => {
        dispatch(authActions.selectIsAuth(data?.data))
    }

    useLoginMe(successAuthMe);

    return (
        <>
          <Header isOpen={isOpen} setIsOpen={ setIsOpen}/>
            <ScrollTop/>
            <main className={`main ${isOpen ? 'no-scroll' : ''}`}>
            <Routers />
            </main>
          <Footer/>
        </>
    );
};
export default Layout;