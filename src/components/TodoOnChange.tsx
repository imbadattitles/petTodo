import React from "react";
import sAdd from "../Styles/AddTodo.module.sass";
import { IStep, ITodo } from "../Redux/todoReducer";

interface ITodoOnChange {
  OnChangeSteps: IStep[];
  todo: ITodo;
  saveTodo: (id: string) => void;
  OnChangeTitle: string;
  setOnChangeTitle: any;
  OnChangeDescription: string;
  setOnChangeDescription: any;
}

const TodoOnChange: React.FC<ITodoOnChange> = ({
  todo,
  OnChangeSteps,
  saveTodo,
  OnChangeTitle,
  setOnChangeTitle,
  OnChangeDescription,
  setOnChangeDescription,
}) => {
  return (
    <div>
      <input
        className={sAdd.mainInput}
        value={OnChangeTitle}
        placeholder="Название"
        onChange={(e) => setOnChangeTitle(e.target.value)}
      />
      <input
        className={sAdd.mainInput}
        value={OnChangeDescription}
        placeholder="Описание"
        onChange={(e) => setOnChangeDescription(e.target.value)}
      />
      {OnChangeSteps.map((obj, index) => (
        <input
          className={sAdd.secondInput}
          placeholder={obj.value}
          onChange={(e) => {
            obj.value = e.target.value;
          }}
        />
      ))}
      <button className={sAdd.goInput} onClick={() => saveTodo(todo.id)}>
        Закрыть
      </button>
    </div>
  );
};

export default TodoOnChange;
