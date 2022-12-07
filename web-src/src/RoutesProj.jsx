import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./components/App";
import { Menu } from "./components/Menu";

const RoutesProj = () => {
    return(
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<Menu />} />
    </Routes>
    )
}

export default RoutesProj