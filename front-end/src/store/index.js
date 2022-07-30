import { configureStore } from "@reduxjs/toolkit";

import categorias from "./ducks/categorias";
import posts from './ducks/posts'

export default configureStore({
    reducer: {
        categorias: categorias,
        posts: posts,
    }
});