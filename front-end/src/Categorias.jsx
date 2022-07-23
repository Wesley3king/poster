import React, { useState, useEffect } from 'react';
import Header from './componentes/Header';
import Barra from './componentes/Barra';
import Categoria from './componentes/Categorias';
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoria } from './store/ducks/categorias';
import { MdOutlineLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from 'axios';
import './App.css';

function Categorias() {
  
  
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  const categorias = useSelector(state => state.categorias);

  const fetchData = async () => {
    let data = await axios.get("http://127.0.0.1:5200/adimin/categorias/get")
    .then(res => res.data)
    .catch(console.log);

    setReady(true);
    dispatch(fetchCategoria(data))
  };

  const buildCategorias = () => {
    console.log(categorias);

    if (categorias.length === 0) {
      return <p>nenhuma categoria existente</p>;
    };
    return categorias.map( obj => <Categoria key={obj["_id"]} id ={obj["_id"]} texto={obj.nome} slug={obj.slug} />)
  }
  
  useEffect(() => {fetchData()},[]);
  return (
    <div>
      <Barra />
      <Header>
         <Link to="/add" className='link_conf'>
           <MdOutlineLibraryAdd />
         </Link>
      </Header>

      <div className="container"></div>
      <main className='main_categorias'>
        <h2> categorias !</h2>

        <section>
            {ready ? buildCategorias() : ''}
        </section>
      </main>

    </div>
  );
}

export default Categorias;