import React from "react";
import './Post.css';

export default function Post2 (props) {

    const obj = props.obj;
    return (
        <div className="post_area">
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
        </div>
    )
}