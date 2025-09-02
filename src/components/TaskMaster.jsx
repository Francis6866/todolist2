import React, { useEffect, useMemo } from 'react'
import { useState } from 'react'
import { useTodo } from '../context/todoContext'
import { useAuth } from '../context/authcontext'
import TodoItem from './TodoItem'

const TaskMaster = () => {
    const [newtask, setNewTask] = useState({ title: "", description: "" })
    const { todo, addTodo } = useTodo()
    const [filter, setFilter] = useState("all");

    const filteredTodos = useMemo(() => {
        return todo.filter(t => {
          if (filter === "active") return !t.isCompleted;
          if (filter === "completed") return t.isCompleted;
          return true; // all
        });
      }, [todo, filter]);
  
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
      <div  className='max-w-[600px] my-0 mx-auto p-3'>
        <h2 className='text-center font-bold text-2xl text-capitalize mb-8'>Task Master CRUD</h2>
  
        <form 
          onSubmit={handleSubmit}
          action="" 
          className='mb-3'
        >
          <input
            type="text"
            name='title'
            value={newtask.title}
            onChange={(e) => setNewTask(prev => ({...prev, title: e.target.value}))}
            placeholder='Task Title'
            className='w-full mb-2 p-2 border border-[#ccc] rounded-md'
          />
          <textarea 
            name="description"
            value={newtask.description}
            onChange={(e) => setNewTask(prev => ({...prev, description: e.target.value}))}
            placeholder='Task Description'
            className='w-full mb-2 p-2 border border-[#ccc] rounded-md'
          />
          <button 
            type='submit'
            className='py-2 px-3 w-full'
          >
            Add Task
          </button>
        </form>
        <div className='flex justify-center items-center my-4 gap-4'>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>
  
        {/* list of task */}
        <ul style={{listStyle: "none", padding: 0}}>
            {
              filteredTodos && filteredTodos.length > 0 
              ? filteredTodos.map(item => (
                <TodoItem item={item} key={item.id} />
              ))
              : <p>No task to display</p>
            }
        </ul>
      </div>
  )
}

export default TaskMaster
