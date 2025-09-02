import { createContext, useEffect, useState, useContext } from "react";
import supabase from "../supabase-client";



const TodoContext = createContext()

export const TodoContextProvider = ({ children }) => {
    const [todo, setTodo] = useState([])
    const [error, setError] = useState(null)

    const fetchAllTodo = async () => {
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

    // fetch completed task
    const fetchCompletedTodo = async () => {
        try {
            const { data, error } = await supabase
            .from("todolist2")
            .select("")
        
            if(error) return setError(error.message)
            setTodo(data)
        } catch (error) {
            setError(error.message)
        }
    }
    // fetch uncompleted task
    // toggle complete
    const toggleCompleted = async (id, isCompleted) => {
        const { data, error } = await supabase
        .from("todolist2")
        .update({isCompleted: !isCompleted})
        .eq("id", id)
        .select()
        .single()

        if(error){
            setError(error)
            return
        }else {
            setTodo(prev => prev.map(todo => todo.id === id ?
                 data : todo ))
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
        fetchAllTodo()
    }, [])

    // console.log("todo", todo)
    // console.log("error", error)
    return (
        <TodoContext.Provider value={{
            todo, error,
            addTodo, deleteTodo,
            editTodo, fetchAllTodo,
            toggleCompleted
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () => useContext(TodoContext)