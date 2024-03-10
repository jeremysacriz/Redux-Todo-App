import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { complete, submit, remove, edit } from './slice/slice';

export const App = () => {
   const refs = useRef({})
   const [ input, setInput ] = useState("")
   const [ boolean, setBoolean ] = useState(false)
   const [ todoId, setTodoId ] = useState()
   const [ formValid, setFormValid ] = useState(false)
   const todos = useSelector(state => state.todo)

   console.log(todos) // checks todo status

   const dispatch = useDispatch()

   const handleSubmit = (e) => {
      e.preventDefault()

      if (input.length < 2) {
         setFormValid("Input field must not be empty.")
      } else {
         if (boolean === true) {
            dispatch(edit({
               id: todoId,
               todo: input,
            }))
         } else {
            dispatch(submit({
               id: todos.length,
               todo: input,
               complete: false
            }))
         }
   
         setInput("")
         setBoolean(false)
         setFormValid("")
      }
   }

   const handleComplete = (item) => {
      dispatch(complete({
         id: item.id,
         complete: true,
      }))
   }

   const handleEdit = (item) => {
      refs.current['todo'].focus()
      setInput(item.todo)
      setBoolean(true)
      setTodoId(item.id)
      setFormValid("")
      dispatch(complete({
         id: item.id,
         complete: false
      }))
   }

   const handleDelete = (item) => {
      dispatch(remove(item.id))
      setFormValid("")
   }

   return (
      <section id="todo">
         <div className="todo-heading">
            <h1>Todo List</h1>
         </div>
         <form onSubmit={handleSubmit} className="todo-form">
            <input type="text" id="todo-input" name="todo" placeholder={boolean === true ? "Edit task" : "Add a task"} value={input} onChange={(e) => setInput(e.target.value)} ref={(e) => refs.current['todo'] = e} autoComplete='off'/>
            <button className="add-icon" onClick={handleSubmit}>
               <span className="material-symbols-outlined">add_circle</span>
            </button>
            <h1 className="error-msg">{formValid}</h1>
         </form>
         <div className="todo-list">
            {
               todos?.map((item, index) => (
                  <div className={todoId === item.id && boolean === true ? "todo active" : "todo"} key={item.id}>
                     <div className="todo-title">
                        <h1 className="todo-num">{index + 1}.</h1>
                        <h1 className={item.complete === true ? "todo-description active" : "todo-description"}>{item.todo}</h1>
                     </div>
                     <div className="todo-icons">
                        <button className="done" onClick={() => handleComplete(item)}>
                           <span className="material-symbols-outlined">done</span>
                        </button>
                        <button className="edit" onClick={() => handleEdit(item)}>
                           <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button className="delete" onClick={() => handleDelete(item)}>
                           <span className="material-symbols-outlined">delete</span>
                        </button>
                     </div>
                  </div>
               ))
            }
            {
               todos.length === 0 && <h1 className="todo-completed">Nothing to do for today...</h1>
            }
         </div>
      </section>
   )
}

