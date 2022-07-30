import React, { useState, useEffect } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
import { AiFillHome } from "react-icons/ai";
import Barra from "../componentes/Barra";
import Header from "../componentes/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoria } from "../store/ducks/categorias";

export default function EditPost () {
    const dispatch = useDispatch();
    const [dados, setDados] = useState({titulo: "", descrição: "", slug: "", conteudo: "", categoria: ""});
    const categorias = useSelector( state => state.categorias)
    const [showMessage,setShowMessage] = useState(false);
    const [showMessageFail,setShowMessageFail] = useState(false);
    const [showMessageValidate,setShowMessageValidate] = useState(false);
    const [form_erros, setForm_erros] = useState([]);

    console.log(dados);
    const fetchCategoriasService = () => {
        if (categorias.length === 0 ) {
            axios.get("http://127.0.0.1:5200/adimin/categorias/get")
            .then(res => dispatch(fetchCategoria(res.data)))
            .catch(console.log);
        };
    };

    useEffect(()=> fetchCategoriasService(), []);

    const send_form = (e) => {

        e.preventDefault();
        if (dados.categoria === "none" || dados.categoria === "") {
            setForm_erros(["categoria selecionada invalida!"]);

            setShowMessageValidate(true);

            setTimeout(()=> setShowMessageValidate(false), 7000);
        }else{

            axios.post("http://127.0.0.1:5200/adimin/postagens/add",{
                ...dados
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
        }
    };


    return (
        <div>
            <Barra />
            <Header >
                <Link to="/" className='link_conf'>
                    <AiFillHome />
                </Link>
            </Header>

            <div className="container"></div>
            <div className="container"></div>

            <div className="area_postagem">
                <h2>editar postagem</h2>

                {showMessage ? <div className="message_post_added"><p>editado com sucesso!</p></div> : ""}
                {showMessageFail ? <div className="message_post_failde"><p>houve uma falha ao editar!</p></div> : ""}
                {showMessageValidate ? form_erros.map( str => <div className="message_post_failde"><p>{str}</p></div>) : ""}

                <form className="form_postagem">
                    <label htmlFor="titulo">titulo: </label>
                    <input type="text" name="titulo" id="inp" value={dados.titulo} onChange={(e)=> setDados({...dados,titulo: e.target.value})} required/>

                    <label htmlFor="titulo">descrição: </label>
                    <input type="text" name="titulo" id="inp" value={dados.descrição} onChange={(e)=> setDados({...dados,descrição: e.target.value})} required/>

                    <label htmlFor="categoria">categoria: </label>
                    <select name="categoria" id="categoria" value={dados.categoria} onChange={(e)=> setDados({...dados, categoria: e.target.value})} required>
                        <option value="none">select (not valid)</option>
                        {categorias.map( categoria => <option value={categoria._id}>{categoria.nome}</option>)}
                    </select>

                    <label htmlFor="slug">slug: </label>
                    <input type="text" name="slug" id="inp" value={dados.slug} onChange={(e)=> setDados({...dados,slug: e.target.value})} required/>

                    <label htmlFor="conteudo">conteudo: </label>
                    <textarea name="conteudo" id="conteudo" cols="30" rows="10" value={dados.conteudo} onChange={(e)=> setDados({...dados,conteudo: e.target.value})} required>
                    </textarea>
                    <button className="send" onClick={(e)=> send_form(e)}>postar</button>
                </form>
            </div>
        </div>
    )
}