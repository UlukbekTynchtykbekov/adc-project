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
import Favorite from "../pages/Favorite";
import Construction from "../pages/Construction";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProjectDetail from "../pages/ProjectDetail";
import ProjectList from "../Admin/ProjectList";
import ProtectedRoute from "./ProtectedRoute";
import Company from "../Admin/Company";
import NewProject from "../Admin/NewProject";
import Architect from "../Admin/Architector";
import NewArchitect from "../Admin/NewArchitect";
import Categories from "../Admin/Categories";
import NewCategory from "../Admin/NewCategory";
import ProjectInfo from "../Admin/ProjectInfo";
import NewProjectInfo from "../Admin/NewProjectInfo";
import Square from "../Admin/Square";
import NewSquare from "../Admin/NewSquare";
import Room from "../Admin/Room";
import NewRoom from "../Admin/NewRoom";

const Routers = () => {
    return <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/architecture" element={<Architecture/>}/>
        <Route path="/design" element={<Design/>}/>
        <Route path="/construction" element={<Construction/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/consultation" element={<Consultation/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
        <Route path="/projects/interior" element={<Interior/>}/>
        <Route path="/projects/exterior" element={<Exterior/>}/>
        <Route path="/projects/:projectId" element={<ProjectDetail/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/favorite" element={<Favorite/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route exact path='/' element={<ProtectedRoute role={"ADMIN"}/>}>
            <Route exact path='/admin/projects' element={<ProjectList/>}/>
            <Route exact path='/admin/company' element={<Company/>}/>
            <Route exact path='/admin/projects/new' element={<NewProject/>}/>
            <Route exact path='/admin/projects/:id' element={<NewProject/>}/>
            <Route exact path='/admin/architect' element={<Architect/>}/>
            <Route exact path='/admin/architect/new' element={<NewArchitect/>}/>
            <Route exact path='/admin/architect/:id' element={<NewArchitect/>}/>
            <Route exact path='/admin/categories' element={<Categories/>}/>
            <Route exact path='/admin/categories/new' element={<NewCategory/>}/>
            <Route exact path='/admin/categories/:id' element={<NewCategory/>}/>
            <Route exact path='/admin/project-info' element={<ProjectInfo/>}/>
            <Route exact path='/admin/project-info/new' element={<NewProjectInfo/>}/>
            <Route exact path='/admin/project-info/:id' element={<NewProjectInfo/>}/>
            <Route exact path='/admin/square' element={<Square/>}/>
            <Route exact path='/admin/square/new' element={<NewSquare/>}/>
            <Route exact path='/admin/square/:id' element={<NewSquare/>}/>
            <Route exact path='/admin/rooms' element={<Room/>}/>
            <Route exact path='/admin/rooms/new' element={<NewRoom/>}/>
            <Route exact path='/admin/rooms/:id' element={<NewRoom/>}/>
        </Route>
    </Routes>
};

export default Routers;