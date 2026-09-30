import { Navigate } from 'react-router-dom'

export default function ValidatorRoute({

  children

}) {

  const role =
    localStorage.getItem('role')

  if (role !== 'validator') {

    return <Navigate to='/dashboard' />

  }

  return children

}