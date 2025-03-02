import React, { useEffect } from 'react'
import AddTaskForm from '../MyTask/AddTaskForm'
import TaskTable from '../MyTask/TaskTable'
import axios from 'axios'

const Dashboard = () => {

  useEffect(() => {
    
    axios.post("/api/account/authenticate", {username : "8113899206", password :"12345678"})
  }, [])

  return (
    <div style={{overflow : "auto"}} >Dashboard

      
    </div>
  )
}

export default Dashboard