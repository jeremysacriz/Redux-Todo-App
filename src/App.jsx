import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submit, remove } from './reducers/reducers';

export const App = () => {
   const [input, setInput] = useState("")
   const todos = useSelector(state => state.todo)

   const dispatch = useDispatch()

   const handleSubmit = (e) => {
      e.preventDefault()

      dispatch(submit({
         id: todos.length,
         todo: input
      }))

      setInput("")
   }

   const handleEdit = (item) => {
      console.log(item.todo)
   }

   const handleDelete = (item) => {
      dispatch(remove(item.id))
   }

   return (
      <section id="todo">
         <form onSubmit={handleSubmit} className="todo-form">
            <input type="text" id="todo-input" name="todo" placeholder="Add todo" value={input} onChange={(e) => setInput(e.target.value)} />
            <button className="add-icon" onClick={handleSubmit}>
               <span className="material-symbols-outlined">add_circle</span>
            </button>
         </form>
         <div className="todo-list">
            {
               todos?.map(item => (
                  <div className="todo" key={item.id}>
                     <div className="todo-title">
                        <h1 className="todo-num">{item.id + 1}.</h1>
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
         </div>
      </section>
   )
}

