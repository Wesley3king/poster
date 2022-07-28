import React, { useEffect, useState} from 'react';
import Header from './componentes/Header';
import Barra from './componentes/Barra';
import { MdOutlineLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(()=> {
    axios.get('http://127.0.0.1:5200/adimin/postagens')
    .then( res=> setPosts(res.data))
    .catch(console.log);
  },[]);
  console.log(posts);
  return (
    <div>
      <Barra />
      <Header>
         <Link to="/postagem/add" className='link_conf'>
           <MdOutlineLibraryAdd />
         </Link>
      </Header>
      <div className='container'></div>
      <main>
        <section>
          {posts.map(obj => <div key={obj.titulo} className="postagem">
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
          </div>)}
        </section>
      </main>
    </div>
  );
}

export default App;
