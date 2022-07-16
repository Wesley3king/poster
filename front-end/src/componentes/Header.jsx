import React from "react";
import { BiMenu } from "react-icons/bi";

export default function Header (props) {

    return (
        <div className="header">
            <div className="header_element_icon" onClick={() => window.document.querySelector(".barra").classList.toggle("on")}>
                <BiMenu />
            </div>
            <div className="header_element">
                <h1>poster</h1>
            </div>
            <div className="header_element_icon">
                {props.children}
            </div>
        </div>
    );
};