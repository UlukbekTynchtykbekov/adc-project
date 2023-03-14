import React from 'react';
import {Route, Routes} from "react-router-dom";
import Projects from "../pages/Projects";
import Services from "../pages/Services";
import Consultation from "../pages/Consultation";
import About from "../pages/About";
import Contacts from "../pages/Contacts";
import Home from "../pages/Home";
import Architecture from "../pages/Architecture";
import Interior from "../pages/Interior";
import Exterior from "../pages/Exterior";
import Design from "../pages/Design";
import Construction from "../pages/Construction";

const Routers = () => {
    return <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="architecture" element={<Architecture/>}/>
        <Route path="design" element={<Design/>}/>
        <Route path="construction" element={<Construction/>}/>
        <Route path="projects" element={<Projects/>}/>
        <Route path="services" element={<Services/>}/>
        <Route path="consultation" element={<Consultation/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="contacts" element={<Contacts/>}/>
        <Route path="projects/interior" element={<Interior/>}/>
        <Route path="projects/exterior" element={<Exterior/>}/>
    </Routes>
};

export default Routers;