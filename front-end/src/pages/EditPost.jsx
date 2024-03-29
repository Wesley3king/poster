import React, { useState, useEffect } from "react";
//import { AiOutlineAppstore } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
import { AiFillHome } from "react-icons/ai";
import Barra from "../componentes/Barra";
import Header from "../componentes/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoria } from "../store/ducks/categorias";
import { fetchPosts } from '../store/ducks/posts';

export default function EditPost () {

    const dispatch = useDispatch();
    const [dados, setDados] = useState({titulo: "", descrição: "", slug: "", conteudo: "", categoria: ""});
    const [deleteStatus,setDeleteStatus] =useState("");

    const categorias = useSelector( state => state.categorias);
    const post = useSelector( state => {
            let data = {};
            let hash = window.location.hash;
            let hashCortado = hash.split("=");
            state.posts.forEach(obj => obj._id === hashCortado[1] && (data = obj));
            console.log(data);
            //setDados(data);
            return data;
    });
    //messages
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
        if (post.length === 0 ) {
            axios.get("http://127.0.0.1:5200/adimin/postagens")
            .then(res => {
                dispatch(fetchPosts(res.data));
            })
            .catch(console.log);
        };
    };

    useEffect(()=> fetchCategoriasService(), []);
    useEffect(()=> {
        console.log(post._id)
        setDados({titulo: post.titulo, slug: post.slug, conteudo: post.conteudo, descrição: post.descrição, categoria :post.categoria._id });
    }, []);

    const send_form = (e) => {

        e.preventDefault();
        if (dados.categoria === "none" || dados.categoria === "") {
            setForm_erros(["categoria selecionada invalida!"]);

            setShowMessageValidate(true);

            setTimeout(()=> setShowMessageValidate(false), 7000);
        }else{

            axios.post("http://127.0.0.1:5200/adimin/postagens/edit",{
                ...dados,
                _id: post._id,
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

    const deletarPost = () => {
        // http://127.0.0.1:5200/adimin/postagens/edit
        axios.post("http://127.0.0.1:5200/adimin/postagens/delete",{
                id: post._id
            })
        .then((resposta)=> {
            console.log("resposta do servidor : ",resposta);
            if (resposta.data) {
                setDeleteStatus("deletado com sucesso!");
            
                setTimeout(()=> window.location.assign("/#/"), 2000);
            }else{
                setDeleteStatus("falha ao deletar o post do servidor!");
                setTimeout(()=> setDeleteStatus(""), 4000);
            }
        })
        .catch((e)=> {
            setDeleteStatus("falha ao deletar o post!");
            console.log("Erro de conexão : ", e);
            setTimeout(()=> setDeleteStatus(""), 4000);
        });
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
            <div className="container"></div>

            <div className="area_postagem">
                <h2>editar postagem</h2>

                {showMessage ? <div className="message_post_added"><p>editado com sucesso!</p></div> : ""}
                {showMessageFail ? <div className="message_post_failde"><p>houve uma falha ao editar!</p></div> : ""}
                {showMessageValidate ? form_erros.map( str => <div className="message_post_failde"><p>{str}</p></div>) : ""}

                { deleteStatus === "" ? "" : ( deleteStatus.indexOf("falha") !== -1 ? <div className="message_post_failde" style={{margin: "0"}}><p>{deleteStatus}</p></div> : <div className="message_post_added" style={{margin: "0"}}><p>{deleteStatus}</p></div>)}

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


                <section className="delete_categoria" onClick={()=> deletarPost()}>
                    <VscTrash />
                    <p>deletar post</p>
                </section>
            </div>

            
        </div>
    )
}