import React, { useState, useEffect } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
import Barra from "../componentes/Barra";
import Header from "../componentes/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function EditCategoria () {
    
    const [titulo, setTitulo] = useState("");
    const [slug, setSlug] = useState("");
    const [showMessage,setShowMessage] = useState(false);
    const [showMessageFail,setShowMessageFail] = useState(false);
    const [showMessageValidate,setShowMessageValidate] = useState(false);
    const [form_erros, setForm_erros] = useState([]);
    const [deleteStatus, setDeleteStatus] = useState('');

    const edit_categoria_data = useSelector(state => {
        let data = {};
        let hash = window.location.hash;
        let hashCortado = hash.split("=");
        state.categorias.forEach(obj => obj._id === hashCortado[1] && (data = obj));
        console.log(data);
        return data;
    });

    useEffect(()=> {
        setTitulo(edit_categoria_data.nome);
        setSlug(edit_categoria_data.slug);

    }, [ edit_categoria_data ]);
    const send_form = (e) => {
        e.preventDefault();

        axios.post("http://127.0.0.1:5200/adimin/categorias/edit",{
                nome: titulo,
                slug: slug,
                id: edit_categoria_data._id
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

    const deletarCategoria = () => {
        axios.post("http://127.0.0.1:5200/adimin/categorias/delete",{
                id: edit_categoria_data._id
            })
        .then((resposta)=> {
            console.log("resposta do servidor : ",resposta);
            if (resposta.data) {
                setDeleteStatus("deletado com sucesso!");
            
                setTimeout(()=> window.location.assign("/#/categorias/"), 2000);
            }else{
                setDeleteStatus("falha ao deletar a categoria do servidor!");
                setTimeout(()=> setDeleteStatus(""), 4000);
            }
        })
        .catch((e)=> {
            setDeleteStatus("falha ao deletar a categoria!");
            console.log("Erro de conexão : ", e);
            setTimeout(()=> setDeleteStatus(""), 4000);
        });
    }
    return (
        <>
         <Barra />
            <Header >
                <Link to="/categorias" className='link_conf'>
                    <AiOutlineAppstore />
                </Link>
            </Header>

            <div className="container"></div>
            <div className="area">
                <section className="editar_categoria_title">
                    <h2>editar categoria</h2>
                </section>

                {showMessage ? <div className="message_post_added"><p>alterado com sucesso!</p></div> : ""}
                {showMessageFail ? <div className="message_post_failde"><p>houve uma falha ao alterar!</p></div> : ""}
                {showMessageValidate ? form_erros.map( str => <div className="message_post_failde"><p>{str}</p></div>) : ""}

                { deleteStatus === "" ? "" : ( deleteStatus.indexOf("falha") !== -1 ? <div className="message_post_failde" style={{margin: "0"}}><p>{deleteStatus}</p></div> : <div className="message_post_added" style={{margin: "0"}}><p>{deleteStatus}</p></div>)}

                <form className="form">
                    <label htmlFor="titulo">titulo: </label>
                    <input type="text" name="titulo" id="inp" value={titulo} onChange={(e)=> setTitulo(e.target.value)}/>

                    <label htmlFor="titulo">slug: </label>
                    <input type="text" name="titulo" id="inp" value={slug} onChange={(e)=> setSlug(e.target.value)}/>
                    <button className="send" onClick={(e)=> send_form(e)}>cadastrar</button>
                </form>

                <section className="delete_categoria" onClick={()=> deletarCategoria()}>
                    <VscTrash />
                    <p>deletar categoria</p>
                </section>
            </div>
        </>
    )
}