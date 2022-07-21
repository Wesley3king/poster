import React from "react";
import "../../App.css"

export default function Categoria (props) {

    console.log(props.texto)
    return (
        <div className="categoria_item">
            <p>nome : {props.texto}</p>
            <p> slug : {props.slug}</p>
        </div>
    )
}