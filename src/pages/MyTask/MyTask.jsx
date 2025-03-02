import TaskTable from './TaskTable'
import AddTaskForm from './AddTaskForm'
import { useEffect } from 'react'
import toast from 'react-hot-toast'


const MyTask = () => {
  useEffect(() => {
    toast.success("Hello")
  }, [])
    
  
  return (
    <div style={{width : "100%"}} >MyTask
        {/* <TaskTable/> */}
        <AddTaskForm/>
    </div>
  )
}

export default MyTask