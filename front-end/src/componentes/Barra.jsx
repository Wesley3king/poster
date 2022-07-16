import React from "react";
import { AiOutlineClose, AiFillHome } from "react-icons/ai";
import { VscAdd } from "react-icons/vsc";
import { Link } from "react-router-dom";


export default function Barra () {

    return (
        <div className="barra">
            <div className="two_barra">
                <div className="close_barra" onClick={() => window.document.querySelector(".barra").classList.toggle("on")}>
                    <AiOutlineClose />
                </div>
                <div className="header_element barra_h1">
                    <h1>poster</h1>
                </div>
            </div>
            <Link to="/" className='link_conf'>
                <div className="barra_item">
                    <AiFillHome />
                    <div>
                        <p>home</p>
                    </div>
                </div>
            </Link>
            <Link to="/add" className='link_conf'>
                <div className="barra_item">
                    <VscAdd />
                    <div>
                        <p>add new</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}