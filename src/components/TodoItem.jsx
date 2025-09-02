import React from 'react'
import { useTodo } from '../context/todoContext'
import { Link } from 'react-router-dom'
import { GoHeart, GoHeartFill } from "react-icons/go";



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
              <h3 className='font-bold mb-2'>Title: {item.title}</h3>
              <p className='mb-4'><span>Description: </span>{item.description}</p>
              <div className='flex gap-4 items-center'>
                <div
                  onClick={() => toggleCompleted(item.id, item.isCompleted)}
                  data-tooltip="Toggle completed task"
                  title="Toggle completed task"
                  aria-labelledby='button'
                >
                  {item.isCompleted ? <GoHeartFill color="red" size={25}/> : <GoHeart size={25}/>}
                </div>
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
