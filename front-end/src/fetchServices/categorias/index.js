import axios from "axios";
import { addCategoria } from "../../store/ducks/categorias";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategorias = async () => {
    return axios.get("http://127.0.0.1:5200/adimin/categorias/get")
    .then(res => res.data)
    .catch(console.log);
}