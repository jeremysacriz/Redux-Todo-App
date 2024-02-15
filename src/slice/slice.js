import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const todoReducers = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        submit: (state, action) => {
            state.push(action.payload)
        },
        edit: (state, action) => {
            const editState = state.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        id: action.payload.id,
                        todo: action.payload.todo
                    }
                }

                return item
            })

            return editState
        },
        remove: (state, action) => {
            const newState = state.filter(item => item.id !== action.payload)

            return newState
        }
    }
})

const { actions, reducer } = todoReducers
export const { submit, remove, edit } = actions
export default reducer