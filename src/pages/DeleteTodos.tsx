import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchDeletedTodoAction } from "../Redux/todoReducer";
import s from "../Styles/ListTodo.module.sass";
import sAdd from "../Styles/AddTodo.module.sass";
import { useAppDispatch, useAppSelector } from "../Redux";

const DeleteTodos: React.FC = () => {
  const deletedTodos = useAppSelector((action) => action.todos.deletedTodos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDeletedTodoAction());
  }, []);

  return (
    <div>
      <p className={sAdd.link}>
        <Link to="/TodosPage">Вернуться</Link>
      </p>
      {deletedTodos.length ? (
        <div className={s.Todo}>
          {deletedTodos.map((todo) => (
            <div key={todo.id} style={{ margin: "80px" }}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <div
                style={{
                  fontSize: "12px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                }}
              >
                <span>{todo.startDate}</span>
                <span>{todo.id}</span>
                <span>{todo.endDate ? todo.endDate : "дата не выбрана"}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DeleteTodos;
