import React from "react";
import { RiPencilFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "../../App.css"

export default function Categoria (props) {

    console.log(props.texto)
    return (
        <div className="categoria_item">
            <p>nome : {props.texto}</p>
            <p> slug : {props.slug}</p>
            <Link to={`/categorias/edit?id=${props.id}`} style={{color: "white"}}>
                <div className="edit_pencil_div">
                    <RiPencilFill />
                </div>
            </Link>
        </div>
    )
}