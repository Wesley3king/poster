import React from "react";
import { RiPencilFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import './Post.css';

export default function Post (props) {

    const obj = props.obj;
    return (<div className="postagem">
    <div className='tit_post'>
      <h4>{obj.titulo}</h4>
      <p>{obj.categoria.nome}</p>
    </div>
    <div className='info_post'>
      <p className='margin_desc_post'>{obj.descrição}</p>
      <div className='post_line'>
      <p className='margin_data_post'><small>{obj.slug}</small></p>
        <small><div className='data_omit'>{obj.data}</div></small>
    </div>
    </div>

    <p className='conteudo_post'>{obj.conteudo}</p>

    <div className="edit_post"><Link to={`/postagem/edit?id=${obj._id}`} style={{color: "whitesmoke"}}>
      <RiPencilFill />
    </Link></div>
  </div>)
}