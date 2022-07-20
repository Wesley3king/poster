import React from 'react';
import Header from './componentes/Header';
import Barra from './componentes/Barra';
import { MdOutlineLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import './App.css';

function Categorias() {
  
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
      </main>

    </div>
  );
}

export default Categorias;