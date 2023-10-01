import React from "react";
import AddTodo from "../components/AddTodo";
import ListTodo from "../components/ListTodo";

const TodosPage: React.FC = () => {
  return (
    <div>
      <AddTodo />
      <ListTodo />
    </div>
  );
};

export default TodosPage;
