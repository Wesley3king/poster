import React, { useState } from "react";
import Barra from "./componentes/Barra";
import Header from "./componentes/Header";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";


export default function Add () {

    const [titulo, setTitulo] = useState("");
    const [slug, setSlug] = useState("");

    const send_form = (e) => {

        e.preventDefault();

        console.log(slug,"  -  ",titulo);

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
                    <input type="text" name="titulo" id="inp" value={titulo} onChange={(e)=> setTitulo(e.target.value)}/>

                    <label htmlFor="titulo">slug: </label>
                    <input type="text" name="titulo" id="inp" value={slug} onChange={(e)=> setSlug(e.target.value)}/>
                    <button className="send" onClick={(e)=> send_form(e)}>cadastrar</button>
                </form>
            </div>
        </div>
    )
}