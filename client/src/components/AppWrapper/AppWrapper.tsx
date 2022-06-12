import React from "react";
import { Outlet } from "react-router-dom";
import Sidenav from "../Sidenav/Sidenav";

const AppWrapper: React.FC = () => {
    return (
        <div>
            <Sidenav></Sidenav>
            <Outlet></Outlet>
        </div>
    );
};

export default AppWrapper;
