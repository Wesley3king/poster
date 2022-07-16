import React from 'react';
import Header from './componentes/Header';
import Barra from './componentes/Barra';
import { MdOutlineLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import './App.css';

function App() {
  
  return (
    <div>
      <Barra />
      <Header>
         <Link to="/add" className='link_conf'>
           <MdOutlineLibraryAdd />
         </Link>
      </Header>

    </div>
  );
}

export default App;
