import React from 'react'
import { getToken } from './../utils/utils';
import {Navigate} from "react-router-dom"

const PrivateRoute = ({component : Component}) => {
  return (
    getToken() ? Component : <Navigate to="/login" />
  )
}

export default PrivateRoute