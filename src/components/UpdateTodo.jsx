import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import supabase from '../supabase-client'
import { useTodo } from '../context/todoContext'

const UpdateTodo = () => {
    const [newTodo, setNewTodo] = useState({})
    const [error, setError] = useState(null)
    const { id } = useParams()
    const cleanId = parseInt(id.replace(":", ""), 10);  // remove colon if present
    const navigate = useNavigate()
    const { fetchAllTodo } = useTodo()

    const fetchTodoToUpdate = async (num) => {
        
        try {
            const { data, error } = await supabase
            .from("todolist2")
            .select("*")
            .eq("id", num)
            .single()
            
            
            if (error) {
                return setError(error.message);
            }
  
            // console.log(data)
            setNewTodo(data)

        } catch (error) {
            setError(error.message)
        }

    }

    const updateTodoInDb = async (details) => {
        try {
            const { data, error } = await supabase
            .from("todolist2")
            .update({title: details.title, description: details.description})
            .eq("id", details.id)
            .select()

            if (error) {
                console.error("Supabase error:", error.message);
                return setError(error.message);
            }
  
        } catch (error) {
            setError(error.message);
        }
    }


        useEffect(() => {
                fetchTodoToUpdate(cleanId);
        }, []);

  
    const handleSubmit = async (e) => {
      e.preventDefault()
      await updateTodoInDb(newTodo)
      await fetchAllTodo()
       
      navigate("/taskmaster")
    }
  
  return (
    <div className='max-w-[600px] my-0 mx-auto p-3'>
        <h2 className='text-center font-bold text-2xl text-capitalize mb-8'>Update Task</h2>
  
        <form 
          onSubmit={handleSubmit}
          action="" 
          className='mb-3'
        >
          <input
            type="text"
            name='title'
            value={newTodo.title || ""}
            onChange={(e) => setNewTodo(prev => ({...prev, title: e.target.value}))}
            placeholder='Task Title'
            className='w-full mb-2 p-2 border border-[#ccc] rounded-md'
          />
          <textarea 
            name="description"
            value={newTodo.description || ""}
            onChange={(e) => setNewTodo(prev => ({...prev, description: e.target.value}))}
            placeholder='Task Description'
            className='w-full mb-2 p-2 border border-[#ccc] rounded-md'
          />
          <button 
            type='submit'
            className='py-2 px-3'  
          >
            Update Task
          </button>
        </form>
        {error && <p className='text-red'>{error}</p>}
      </div>
  )
}

export default UpdateTodo
