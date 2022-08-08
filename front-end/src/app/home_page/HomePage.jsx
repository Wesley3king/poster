import React, { useEffect, useState} from 'react';
import Header from '../../componentes/Header';
import Barra from '../../componentes/Barra';
import Post from '../../componentes/postagems/Post2';
import { MdOutlineLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { fetchPosts } from '../../store/ducks/posts';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import './index.css';

function HomePage() {

  const dispatch = useDispatch();
  const posts = useSelector( state => state.posts);

  useEffect(()=> {
    axios.get('http://127.0.0.1:5200/postagens')
    .then( res=> {
      dispatch(fetchPosts(res.data));
    }
      )
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
        <section className='postagens_area'>
          <div>
            {posts.map(obj => <Post key={obj._id} obj={obj} />)}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
