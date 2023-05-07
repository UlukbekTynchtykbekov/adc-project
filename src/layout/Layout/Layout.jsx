import React, {useEffect, useState} from 'react';
import Header from "../Header";
import Routers from "../../routers/Routers";
import ScrollTop from "../../helper/ScrollTop";
import {useDispatch} from "react-redux";
import {useLoginMe} from "../../CustomHooks/useAuth";
import {authActions} from "../../features/authenticatedSlice";
const Layout = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch();

    const { data} = useLoginMe();

    useEffect(() => {
        if (data?.data){
            dispatch(authActions.selectIsAuth(data?.data))
        }
    },[data])

    return (
        <>
          <Header isOpen={isOpen} setIsOpen={ setIsOpen}/>
            <ScrollTop/>
            <main className={`main ${isOpen ? 'no-scroll' : ''}`}>
            <Routers />
            </main>
        </>
    );
};
export default Layout;