import { configureStore } from "@reduxjs/toolkit";

import categorias from "./ducks/categorias";

export default configureStore({
    reducer: {
        categorias: categorias,
    }
});