import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = [];

//export const addCategoria = createAction("ADD_CATEGORIA");

const categorias =  createSlice({
    name: 'categorias',
    initialState: INITIAL_STATE,
    reducers: {
        addCategoria(state, { payload }) {
            return [...state, payload];
        },
        fetchCategoria(state, { payload }) {
            return [...payload];
        }
    }
});

export const { addCategoria, fetchCategoria } = categorias.actions;

export default categorias.reducer;