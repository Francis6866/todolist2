import React, { useEffect } from 'react'
import { useState } from 'react'
import { useTodo } from '../context/todoContext'
import { useAuth } from '../context/authcontext'
import TodoItem from './TodoItem'

const TaskMaster = () => {
    const [newtask, setNewTask] = useState({ title: "", description: "" })
    const { todo, addTodo} = useTodo()

   
  
    const handleSubmit = (e) => {
      e.preventDefault()
      addTodo(newtask)
      // console.log(newtask)
      setNewTask({ title: "", description: "" })
    }

    // useEffect(() => {
    //   fetchTodo()
    // }, []) fetch recent todo on mount, doing this already in the update page
  
    return (
      <div style={{maxWidth: "600px", margin: "0 auto", padding: "1rem"}}>
        <h2>Task Master CRUD</h2>
  
        <form 
          onSubmit={handleSubmit}
          action="" 
          style={{ marginBottom: "1rem"}}
        >
          <input
            type="text"
            name='title'
            value={newtask.title}
            onChange={(e) => setNewTask(prev => ({...prev, title: e.target.value}))}
            placeholder='Task Title'
            style={{width: "100%", marginBottom: "0.5rem", padding: "0.5rem"}}
          />
          <textarea 
            name="description"
            value={newtask.description}
            onChange={(e) => setNewTask(prev => ({...prev, description: e.target.value}))}
            placeholder='Task Description'
            style={{width: "100%", marginBottom: "0.5rem", padding: "0.5rem"}}
          />
          <button 
            type='submit'
            style={{padding: "0.5rem 1rem"}}  
          >
            Add Task
          </button>
        </form>
  
        {/* list of task */}
        <ul style={{listStyle: "none", padding: 0}}>
            {
              todo && todo.length > 0 
              ? todo.map(item => (
                <TodoItem item={item} key={item.id} />
              ))
              : <p>No task to display</p>
            }
        </ul>
      </div>
  )
}

export default TaskMaster
