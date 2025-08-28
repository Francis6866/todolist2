import { createContext, useEffect, useState, useContext } from "react";
import supabase from "../supabase-client";



const TodoContext = createContext()

export const TodoContextProvider = ({ children }) => {
    const [todo, setTodo] = useState([])
    const [error, setError] = useState(null)

    const fetchTodo = async () => {
        try {
            const { data, error } = await supabase
            .from("todolist2")
            .select("*")
        
            if(error) return setError(error.message)
            setTodo(data)
        } catch (error) {
            setError(error.message)
        }
    }

    const addTodo = async (task) => {
        try {
            const { data, error } = await supabase
            .from("todolist2")
            .insert(task)
            .select()
            .single()

            if(error) return setError(error.message)

            setTodo(prev => ([...prev, data]))
        } catch (error) {
            setError(error.message)
        }
    }

    const deleteTodo = async (id) => {
        try {
            const { data, error } = await supabase
            .from("todolist2")
            .delete()
            .eq("id", id)
            .select()
            
            if(error) return setError(error.message)

            setTodo(prev => prev.filter(todo => todo.id !== id))
        } catch (error) {
            setError(error.message)
        }
    }

    const editTodo = async (id, task) => {
        try {
        } catch (error) {
        }
    }

   

    useEffect(() => {
        fetchTodo()
    }, [])

    // console.log("todo", todo)
    // console.log("error", error)
    return (
        <TodoContext.Provider value={{
            todo, error,
            addTodo, deleteTodo,
            editTodo, fetchTodo
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => useContext(TodoContext)