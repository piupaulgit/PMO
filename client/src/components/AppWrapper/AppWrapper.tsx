import React from "react";
import { Outlet } from "react-router-dom";
import Sidenav from "../Sidenav/Sidenav";
import "./AppWrapper.scss";

const AppWrapper: React.FC = () => {
    return (
        <div className="d-flex">
            <Sidenav></Sidenav>
            <main className="main">
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default AppWrapper;
