import React from 'react'
import { useTodo } from '../context/todoContext'
import { Link } from 'react-router-dom'

const TodoItem = ({item}) => {
  const {deleteTodo, toggleCompleted} = useTodo()
  
  return (
    <li
              style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "1rem",
              marginBottom: "0.5rem"
            }}
          >
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div>
                <button
                  onClick={() => toggleCompleted(item.id, item.isCompleted)}
                >
                  {item.isCompleted ? "undo task" : "complete task"}
                </button>
                <Link
                  to={`:${item.id}`} 
                  style={{padding: "0.5rem 1rem", marginRight: "0.5rem"}}
                >
                  Edit
                </Link>
                
                <button 
                  style={{padding: "0.5rem 1rem"}}
                  onClick={() => deleteTodo(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
  )
}

export default TodoItem
