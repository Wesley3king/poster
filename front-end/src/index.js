import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Add from './Add';
import AddPostagem from './pages/AddPostagem';
import Categorias from './Categorias';
import { Provider } from 'react-redux';
import EditCategoria from './pages/EditCategoria';
import EditPost from './pages/EditPost';
import store from './store';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/postagem/add' element={<AddPostagem />} />
          <Route path='/add' element={<Add />} />
          <Route path='/categorias' element={<Categorias />} />
          <Route path='/categorias/edit' element={<EditCategoria />} />
          <Route path='/postagem/edit' element={<EditPost />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
