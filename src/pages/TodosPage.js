import React from 'react'
import AddTodo from '../components/AddTodo'
import ListTodo from '../components/ListTodo'
import { Link } from 'react-router-dom'

const TodosPage = () => {
  return (
    <div>
        <AddTodo/>
        <ListTodo/>
    </div>
  )
}

export default TodosPage