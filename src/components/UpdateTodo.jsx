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
    const { fetchTodo } = useTodo()

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
  
            console.log(data)
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
      await fetchTodo()
       
      navigate("/taskmaster")
    }
  
  return (
    <div style={{maxWidth: "600px", margin: "0 auto", padding: "1rem"}}>
        <h2>Task Title</h2>
  
        <form 
          onSubmit={handleSubmit}
          action="" 
          style={{ marginBottom: "1rem"}}
        >
          <input
            type="text"
            name='title'
            value={newTodo.title || ""}
            onChange={(e) => setNewTodo(prev => ({...prev, title: e.target.value}))}
            placeholder='Task Title'
            style={{width: "100%", marginBottom: "0.5rem", padding: "0.5rem"}}
          />
          <textarea 
            name="description"
            value={newTodo.description || ""}
            onChange={(e) => setNewTodo(prev => ({...prev, description: e.target.value}))}
            placeholder='Task Description'
            style={{width: "100%", marginBottom: "0.5rem", padding: "0.5rem"}}
          />
          <button 
            type='submit'
            style={{padding: "0.5rem 1rem"}}  
          >
            Update Task
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
  )
}

export default UpdateTodo
