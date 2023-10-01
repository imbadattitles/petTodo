import React, { useEffect, useState } from "react";
import {
  IStep,
  ITodo,
  changeTodoAction,
  fetchTodosAction,
} from "../Redux/todoReducer";
import s from "../Styles/ListTodo.module.sass";
import { useAppDispatch, useAppSelector } from "../Redux";
import { deleteTodo } from "../lib/DeleteTodo";
import { changeStatusTodo } from "../lib/changeStatusTodo";
import TodoStep from "./TodoStep";
import TodoOnChange from "./TodoOnChange";

const ListTodo: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();
  const [onChange, setOnChange] = useState<null | string>(null);
  const [OnChangeTitle, setOnChangeTitle] = useState<string>("");
  const [OnChangeDescription, setOnChangeDescription] = useState<string>("");
  const [OnChangeSteps, setOnChangeSteps] = useState<IStep[]>([]);
  const [onChangeTodo, setOnChangeTodo] = useState<ITodo | null>(null);
  const [deleteVisible, setDeleteVisible] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTodosAction());
  }, []);

  const changeTodo = (todo: ITodo) => {
    setOnChange(todo.id);
    setOnChangeTitle(todo.title);
    setOnChangeDescription(todo.description);
    setOnChangeSteps(todo.steps);
    setOnChangeTodo(todo);
  };

  const saveTodo = (id: string) => {
    if (onChangeTodo) {
      const newTodo: ITodo = {
        ...onChangeTodo,
        title: OnChangeTitle,
        description: OnChangeDescription,
        steps: OnChangeSteps,
      };
      dispatch(changeTodoAction({ id, newTodo }));
      setOnChange(null);
    }
  };

  return (
    <div className={s.ListTodo}>
      {todos.length ? (
        <div style={{ width: "100%", margin: "auto" }}>
          {todos.map((todo) => (
            <div
              className={s.Todo}
              style={todo.status ? {} : { opacity: "50%" }}
              key={todo.id}
            >
              {todo.id === onChange ? (
                <TodoOnChange
                  OnChangeSteps={OnChangeSteps}
                  todo={todo}
                  saveTodo={saveTodo}
                  OnChangeTitle={OnChangeTitle}
                  setOnChangeTitle={setOnChangeTitle}
                  OnChangeDescription={OnChangeDescription}
                  setOnChangeDescription={setOnChangeDescription}
                />
              ) : (
                <div>
                  <h3 className={s.title}>{todo.title}</h3>
                  <p>{todo.description}</p>
                  {todo.status && (
                    <>
                      {todo.steps.length ? (
                        <div className={s.status}>
                          <span className={s.statusText}>
                            {todo.stepsDone} %
                          </span>
                          <span
                            className={s.statusWidth}
                            style={{ width: `${todo.stepsDone}%` }}
                          >
                            <span className={s.statusWidthAnim}></span>
                            <span className={s.statusWidthAnim2}></span>
                            <span className={s.statusWidthAnim}></span>
                            <span className={s.statusWidthAnim3}></span>
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div>
                        {todo.steps.length ? (
                          todo.steps.map((step, index) => (
                            <TodoStep step={step} todo={todo} index={index} />
                          ))
                        ) : (
                          <div className={s.NoSteps}>Подзадач нет</div>
                        )}
                      </div>
                      <div className={s.stepDates}>
                        <div className={s.stepDate}>
                          <span className={s.aboutDate}>Дата начала</span>
                          <span className={s.startDate}>{todo.startDate}</span>
                        </div>
                        <div className={s.stepDate}>
                          <span className={s.id}>{todo.id}</span>
                        </div>
                        <div className={s.stepDate}>
                          <span className={s.aboutDate}>Дата окончания</span>
                          <span className={s.endDate}>
                            {todo.endDate ? todo.endDate : "дата не выбрана"}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  <div className={s.todoBtns}>
                    <button
                      className={s.deleteBtn}
                      onClick={() => setDeleteVisible(todo.id)}
                    >
                      Удалить запись
                    </button>
                    {todo.status && (
                      <button
                        className={s.changeBtn}
                        onClick={() => changeTodo(todo)}
                      >
                        Изменить запись
                      </button>
                    )}
                    <button
                      className={s.statusBtn}
                      onClick={() => changeStatusTodo(dispatch, todo.id, todo)}
                    >
                      {" "}
                      {todo.status ? "На паузу" : "Снять с паузы"}
                    </button>
                  </div>
                  {deleteVisible === todo.id ? (
                    <div className={s.deleteBg}>
                      <div className={s.deleteModal}>
                        <span className={s.todoText}>
                          Вы действительно хотите удалить запись '{todo.title}'
                          ?
                        </span>
                        <p
                          className={s.stepText}
                          style={{ marginTop: "-10px", marginBottom: "20px" }}
                        >
                          Данные сохраняются в корзину и память браузера
                        </p>
                        <div>
                          <button
                            className={s.deleteBtnModal}
                            onClick={() => deleteTodo(dispatch, todo.id, todo)}
                          >
                            Удалить запись
                          </button>
                          <button
                            className={s.noDeleteBtn}
                            onClick={() => setDeleteVisible(null)}
                          >
                            Отмена
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={s.notTodos}>Записи отсутствуют</div>
      )}
    </div>
  );
};

export default ListTodo;
