import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from "./components/Auth"
import TaskMaster from './components/TaskMaster'
import ProtectedRoute from './components/ProtectedRoute'
import UpdateTodo from './components/UpdateTodo'


const App = () => {

  return (
    <Routes>
      <Route index element={<Auth />}/>
      <Route path="taskMaster" element={<ProtectedRoute />}>
        <Route index element={<TaskMaster />}/>
        <Route path=":id" element={<UpdateTodo />}/>
      </Route>
    </Routes>
  )
}

export default App
