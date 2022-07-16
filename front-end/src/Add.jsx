import React from "react";
import Barra from "./componentes/Barra";
import Header from "./componentes/Header";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";


export default function Add () {

const send_form = (e) => {
e.preventDefault();
}
    return (
        <div>
            <Barra />
            <Header >
                <Link to="/" className='link_conf'>
                    <AiFillHome />
                </Link>
            </Header>

            <div className="container"></div>
            <div className="area">

                <form className="form">
                    <label htmlFor="titulo">titulo: </label>
                    <input type="text" name="titulo" id="inp" />

                    <label htmlFor="titulo">slug: </label>
                    <input type="text" name="titulo" id="inp" />
                </form>
            </div>
        </div>
    )
}