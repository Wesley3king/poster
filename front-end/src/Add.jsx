import React, { useState } from "react";
import axios from "axios";
import Barra from "./componentes/Barra";
import Header from "./componentes/Header";
import { AiFillHome, AiOutlineAppstore } from "react-icons/ai";

import { Link } from "react-router-dom";


export default function Add () {

    const [titulo, setTitulo] = useState("");
    const [slug, setSlug] = useState("");
    const [showMessage,setShowMessage] = useState(false);
    const [showMessageFail,setShowMessageFail] = useState(false);
    const [showMessageValidate,setShowMessageValidate] = useState(false);
    const [form_erros, setForm_erros] = useState([]);

    const send_form = (e) => {

        e.preventDefault();

        axios.post("http://127.0.0.1:5200/adimin/categorias/add",{
                nome: titulo,
                slug: slug
            })
        .then((resposta)=> {
            console.log("resposta do servidor : ",resposta)
            if (typeof resposta.data === "object") {
                setForm_erros([...resposta.data["err"]]);

                setShowMessageValidate(true);

                setTimeout(()=> setShowMessageValidate(false), 7000);
            }else if (resposta.data) {
                setShowMessage(true);

                setTimeout(()=> setShowMessage(false), 4000);
            }else {
                setShowMessageFail(true);

                setTimeout(()=> setShowMessageFail(false), 4000);
            }
        })
        .catch((e)=> {
            setShowMessageFail(true);

            console.log("Erro de conexão : ", e);

            setTimeout(()=> setShowMessageFail(false), 4000);
        });

    };


    return (
        <div>
            <Barra />
            <Header >
                {/* <Link to="/" className='link_conf'>
                    <AiFillHome />
                </Link> */}
                <Link to="/categorias" className='link_conf'>
                    <AiOutlineAppstore />
                </Link>
            </Header>

            <div className="container"></div>
            <div className="area">

                {showMessage ? <div className="message_post_added"><p>adicionado com sucesso!</p></div> : ""}
                {showMessageFail ? <div className="message_post_failde"><p>houve uma falha ao adicicioar!</p></div> : ""}
                {showMessageValidate ? form_erros.map( str => <div className="message_post_failde"><p>{str}</p></div>) : ""}

                <form className="form">
                  <h2> adicionar categoria</h2>
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