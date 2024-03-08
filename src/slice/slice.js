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
        },
        complete: (state, action) => {
            const completeState = state.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        id: action.payload.id,
                        complete: action.payload.complete
                    }
                }

                return item
            })

            return completeState
        }
    }
})

const { actions, reducer } = todoReducers
export const { complete, submit, remove, edit } = actions
export default reducer