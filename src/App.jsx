import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submit, remove, edit } from './slice/slice';

export const App = () => {
   const refs = useRef({})
   const [input, setInput] = useState("")
   const [boolean, setBoolean] = useState(false)
   const [todoId, setTodoId] = useState()
   const todos = useSelector(state => state.todo)

   const dispatch = useDispatch()

   const handleSubmit = (e) => {
      e.preventDefault()

      if (boolean === true) {
         dispatch(edit({
            id: todoId,
            todo: input
         }))
      } else {
         dispatch(submit({
            id: todos.length,
            todo: input,
         }))
      }

      setInput("")
      setBoolean(false)
      // refs.current['todo'].blur()
   }

   const handleEdit = (item) => {
      refs.current['todo'].focus()
      setInput(item.todo)
      setBoolean(true)
      setTodoId(item.id)
   }

   const handleDelete = (item) => {
      dispatch(remove(item.id))
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
         </form>
         <div className="todo-list">
            {
               todos?.map((item, index) => (
                  <div className={todoId === item.id && boolean === true ? "todo active" : "todo"} key={item.id}>
                     <div className="todo-title">
                        <h1 className="todo-num">{index + 1}.</h1>
                        <h1>{item.todo}</h1>
                     </div>
                     <div className="todo-icons">
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

