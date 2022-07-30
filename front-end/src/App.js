import React, { useEffect, useState} from 'react';
import Header from './componentes/Header';
import Barra from './componentes/Barra';
import Post from './componentes/postagems/Post';
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
          {posts.map(obj => <Post key={obj.titulo} obj={obj} />)}
        </section>
      </main>
    </div>
  );
}

export default App;
