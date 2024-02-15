import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './css/index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './slice/slice.js';

const store = configureStore({
  reducer: {
    todo: todoReducer,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  // </Provider>
  // </React.StrictMode>,
)
