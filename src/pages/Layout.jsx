// import React from "react";
import MyAppBar from "../components/MyAppBar";
import { Outlet } from "react-router-dom";

const Layout = () =>{
    return (
        <div>
            <MyAppBar />
            <Outlet />
        </div>
    )
}
export default Layout;